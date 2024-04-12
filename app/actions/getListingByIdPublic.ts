import prisma  from "@/app/libs/prismadb";

export interface IParams {
    listingId?: string;
};

export default async function getListingsByIdPublic(
    params: IParams
) {
    try {
        const { listingId } = params;

        if (!listingId) {
            return null
        }

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            
        });

        if (!listing) {
            return null;
        };

        

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            
        }
    } catch (error: any) {
        throw new Error(error)
    }
    
}