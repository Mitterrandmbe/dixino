import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

import Stripe from "stripe";

import { Resend } from "resend";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        listingId,
        applicantId,
        duration,
        stripePriceId,
        totalPrice
    } = body;

    if (!listingId) {
        return NextResponse.error();
    };


    // const checkoutSession = await prisma.listing.update({
    //     where: {
    //         id: listingId
    //     },
    //     data: {
    //         isHiredId: applicantId,
    //         reservations: {
    //             create: {
    //                 userId: applicantId,
    //                 totalPrice: parseInt(totalPrice, 10),
    //                 duration: duration,
                    
    //             }
    //         }
    //     },
    // });


    // Checkout
    const stripe = require('stripe') (process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: stripePriceId,
                quantity: duration,
            
            }
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}` + "/checkout/thank-you",
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}` + "/checkout/failure",
        metadata: {
            listingId: listingId,
            applicantId: applicantId,
            duration: parseInt(duration, 10),
            totalPrice: parseInt(totalPrice, 10)
        }
        
    });

    // Send Email to applicants and hirer 
    const resend = new Resend(process.env.RESEND_API_KEY);


    const responseData = {
        // checkoutSession,
        session
    };

    
    return NextResponse.json(responseData)
}