import { NextResponse } from "next/server";
import { Resend } from 'resend';
import { routes } from "@/app/libs/routes";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import CancelApplicationEmail from "@/app/components/emails/CancelApplication";


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

    if(!listingId) {
        return NextResponse.error();
    };

    const currentListing = await prisma.listing.findUnique({
        where: {
            id: listingId
        }
    })

    const updatedApplicantIds = currentListing?.applicantIds.filter(id => id !== currentUser.id)


    await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            isHiredId: null,
            applicantIds: updatedApplicantIds,
            
        }
    });

    const listingUrl = process.env.NEXT_PUBLIC_APP_URL + routes.services

     // Send email
     const resend = new Resend(process.env.RESEND_API_KEY);
     const sendMail = await resend.emails.send({
         from: "onboarding@resend.dev",
         to: 'ulrich_00132@hotmail.com',
         subject: "Annulation",
         react: CancelApplicationEmail({
             username: "ulrich_00132@hotmail.com", 
             updatedDate: new Date(),
             listingUrl: listingUrl
         })
     })

    return NextResponse.json(currentListing)
}
