import prisma from "@/app/libs/prismadb";


export async function getAllListings() {
    try {
        
        const listings = await prisma.listing.findMany({
            orderBy: {
                serviceDate: "asc"
            },
        });

        return listings;

    } catch (error: any) {
        
        throw new Error(error);
    }
} 