import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

import { EmailTemplate } from '@/app/components/emails/EmailTemplate';
import { Resend } from 'resend';
import { teamEmail } from "@/app/libs/teamContact";

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        firstName,
        lastName,
        password,
        type
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            hashedPassword,
            type
        }
    });

    // Send email
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
        from: "noreply@dixino.be",
        to: email,
        subject: "Bienvenue sur Dixino",
        html: "<p>Bienvenue sur Dixino</p>"
    });

    // Send Email to Dixino Team
    await resend.emails.send({
        from: "noreply@dixino.be",
        to: teamEmail.generalEmail,
        subject: "Nouvelle inscription",
        html: "<p>Une nouvelle inscription sur Dixino</p>"
    });

    return NextResponse.json(user);

}