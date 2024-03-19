import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request
) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        image,
        bio,
        phoneNumber,
        countryValue,
        city,
        addressNumber,
        street,
        zipCode,
        idCard,

    } = body;

    try {
        const profile = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image: image,
                bio: bio,
                phoneNumber: phoneNumber,
                countryValue: countryValue.value,
                city: city,
                addressNumber: addressNumber,
                street: street,
                zipCode: zipCode,
                idCard: idCard

            }
        });

        return NextResponse.json(profile);
    } catch(error) {
        return NextResponse.error();

    }
}