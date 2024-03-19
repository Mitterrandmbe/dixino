import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    try {
        if(!currentUser) {
            return null;
        }

        const body = await request.json();

        const { listingId } = body

        const listing = await prisma.listing.update({
            where: {
                id: listingId
            },
            data: {
                status: "APPROVED"
            }
        })

        return NextResponse.json(listing)

    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }
}