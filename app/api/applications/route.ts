import { NextResponse } from "next/server";
import { Resend } from 'resend';
import { routes } from "@/app/libs/routes";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ApplicationSubmitted from "@/app/components/emails/ApplicationSubmitted";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    };

    const body = await request.json();

    const {
        listingId,
    } = body;

    if (!listingId) {
        return NextResponse.error();
    };

    const listingAndApplication = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            applicantIds: {
                push: currentUser.id
            }
        }
    });

    const listingUrl = process.env.NEXT_PUBLIC_APP_URL + routes.services + `/${listingId}`

    // Send email
    const resend = new Resend(process.env.RESEND_API_KEY);
    const sendMail = await resend.emails.send({
        from: "noreply@dixino.be",
        to: currentUser.email!,
        subject: "Candidature",
        react: ApplicationSubmitted({
            username: currentUser.firstName, 
            updatedDate: new Date(),
            listingUrl: listingUrl
        })
    })

    return NextResponse.json(listingAndApplication);

}