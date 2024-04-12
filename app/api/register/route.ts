import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

import { EmailTemplate } from '@/app/components/emails/EmailTemplate';
import { Resend } from 'resend';

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        firstName,
        lastName,
        password
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            hashedPassword
        }
    });

    // Send email
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Hello World",
        html: "<p>Bienvenue sur Dixino</p>"
    });

    return NextResponse.json(user);

}