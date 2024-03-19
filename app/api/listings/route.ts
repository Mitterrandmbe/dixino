import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        category,
        serviceDate,
        duration,
        location,
        city,
        addressNumber,
        street,
        zipCode,
        additionalInfo,
        status,
        description
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data: {
            category,
            serviceDate,
            duration,
            locationValue: location.value,
            city,
            addressNumber,
            street,
            zipCode,
            additionalInfo,
            status: "PENDING",
            description,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);

}