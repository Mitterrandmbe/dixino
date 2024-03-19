import prisma from "@/app/libs/prismadb";

export interface IServicesParams {
    userId?: string;
    listingId?: string;
}


export default async function getServicesClient(params: IServicesParams) {
    try {
        const { userId, listingId } = params;
        
        let query: any = {};
        
        if (userId) {
            query.userId = userId
        };

        if (listingId) {
            query.listingId = listingId
        }

        const services = await prisma.service.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            },
            
        });

        

        const safeService = services.map((service) => ({
            ...service,
            createdAt: service.createdAt.toISOString(),
            
        }));

        return safeService

    } catch(error: any) {
        
        throw new Error()
    }
}