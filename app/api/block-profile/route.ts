import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(
    request: Request
){
    const currentUser = await getCurrentUser();

    try {
        if (!currentUser || currentUser.role !=="ADMIN") {
            return null
        };

        const body = await request.json();

        const { userId } = body;

        const selectedUser = await prisma.user.findUnique({
            where: {
                id: userId
            },
        });

        // BLOCK & UNBLOCK USER
        if (selectedUser?.isBlocked === false) {
            await prisma.user.update({
                where: {
                    id: selectedUser.id
                },
                data: {
                    isBlocked: true
                }
            })
        } else {
            await prisma.user.update({
                where: {
                    id: selectedUser.id
                },
                data: {
                    isBlocked: false
                }
            })
        }

        return NextResponse.json(selectedUser)


    } catch(error) {
        console.log("Error: ", error)
        NextResponse.error()
    }
}