import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

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

    return NextResponse.json(listingAndApplication);

}