import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

import { Resend } from "resend";


export async function POST(req: Request) {
    const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = Stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

    } catch(error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400})
    };

    const session = event.data.object as Stripe.Checkout.Session
    if(!session) {
        return new NextResponse("Session introuvable");
    };

    if (event.type === "checkout.session.completed") {
        const line_items = await stripe.checkout.sessions.listLineItems(
            event.data.object.id
        );

        const sessionMetadata = session?.metadata
        if (!sessionMetadata) {
            return new NextResponse("Sesson Metadata not found");
        }
        const applicantId = sessionMetadata.applicantId;
        const totalPrice = parseInt(sessionMetadata.totalPrice);
        const duration = parseInt(sessionMetadata.duration);
        

        const updatedListing = await prisma.listing.update({
            where: {
                id: session?.metadata?.listingId
            },
            data: {
                isHiredId: session?.metadata?.applicantId,
                isPaid: true,
                reservations: {
                    create: {
                        userId: applicantId,
                        totalPrice: totalPrice,
                        duration: duration,
                        
                    }
                }
            }
        });

        // Service Date
        const serviceDate = new Date(updatedListing.serviceDate);

        // Applicant
        const applicantUser = await prisma.user.findUnique({
            where: {
                id: applicantId
            }
        });

        // Employer
        const employerUser = await prisma.user.findUnique({
            where: {
                id: updatedListing.userId
            }
        });
        

        // SEND EMAIL TO EMPLOYER
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: employerUser?.email!,
            subject: "Votre réservation",
            html: `<p>Vous avez réservé un professionnel pour une séance ${updatedListing.category} pour ce ${updatedListing.serviceDate}</p>`
        });

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: applicantUser?.email!,
            subject: "Une nouvelle réservation",
            html: `<p>Votre candidature a été retenue pour une séance ${updatedListing.category} pour ce ${updatedListing.serviceDate}</p>`
        });
    }

    

    return new NextResponse(null, { status: 200 })
}