import prisma from "@/app/libs/prismadb";

export interface IParams {
    category: string
}


export async function getListingByCategory(params: IParams) {
    try {
        
        const listings = await prisma.listing.findMany({
            orderBy: {
                serviceDate: "asc"
            },
            where: {
                category: params.category,
                serviceDate: {
                    gte: new Date()
                }
            }
        });

        return listings;

    } catch (error: any) {
        
        throw new Error(error);
    }
} 