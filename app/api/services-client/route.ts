import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();
    const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    if (!currentUser) {
        return NextResponse.error();
    };

    const body = await request.json();

    const {
        category,
        price
    } = body

    try {
        
        const priceStripe = await stripe.prices.create({
            currency: 'eur',
            unit_amount: (price * 100) * 1.18,
            product_data: {
              name: category,
            },

        });
        
        const service = await prisma.service.create({
            data: {
                userId: currentUser.id,
                category,
                price: parseInt(price, 10),
                stripePriceId: priceStripe.id
            }
        });

        

        

        return NextResponse.json({service, priceStripe});

    } catch(error) {
        console.log("Error: ", error)
        return NextResponse.error();
    }
}