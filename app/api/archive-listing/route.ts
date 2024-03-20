import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    try {
        if(!currentUser) {
            return NextResponse.error();
        }

        const body = await request.json();

        const { listingId } = body

        const listing = await prisma.listing.update({
            where: {
                id: listingId
            },
            data: {
                status: "CANCELLED"
            }
        })

        return NextResponse.json(listing)

    } catch (error) {
        
        return NextResponse.error()
    }
}