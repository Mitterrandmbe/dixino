import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import { Resend } from 'resend';
import crypto from "crypto";

import { routes } from "@/app/libs/routes";
import ResetPasswordEmail from "@/app/components/emails/ResetPassword";

export async function POST(
    request: Request
) {
    
    const body = await request.json();
    

    const {
        email
    } = body

    // Check if Email exists in database
    const currentUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (currentUser === null) {
        return new NextResponse("This email doesn't exist in the database", { status: 404 });
    }

    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    
    const passwordResetExpires = new Date(Date.now() + 3600000);

    const updatedCurrentUser = await prisma.user.update({
        where: {
          email: email
        },
        data: {
          resetToken: passwordResetToken,
          resetTokenExpiry: passwordResetExpires,
        }
    });

    currentUser.resetToken = passwordResetToken;
    currentUser.resetTokenExpiry = passwordResetExpires;
    const resetUrl = process.env.NEXT_PUBLIC_APP_URL + routes.resetPassword + `/${resetToken}`;

    // Send Email to User
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailToSend = await resend.emails.create({
        from: "noreply@dixino.be",
        to: currentUser.email!,
        subject: "Votre demande de réinitialiser votre mot de passe",
        react: ResetPasswordEmail({ 
            username: currentUser.firstName, 
            updatedDate: new Date(),
            resetUrl: resetUrl
        }),
        
    })
    
    console.log( "URL: ", resetUrl);
    return NextResponse.json(currentUser);
    
    
    
    
}