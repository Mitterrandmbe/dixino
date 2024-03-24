import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    listingId?: string;
    applicantId?: string;
}

export async function getListings(
    params: IListingsParams
) {
    try {
        const { userId, listingId, applicantId } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        };

        if (listingId) {
            query.listingId = listingId;
        }
        
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                serviceDate: "asc"
            }
        });

        return listings;

    } catch (error: any) {
        console.log("Error: ", error);
        throw new Error(error);
    }
} 