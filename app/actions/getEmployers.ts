import prisma from "@/app/libs/prismadb";

import getListingsById, { IParams } from "./getListingById";

export async function getEmployers(
    params: IParams
) {
  try {
    
    const listing = await getListingsById({
        listingId: params.listingId
    });

    // if (!listing) {
    //   throw new Error("Offre introuvable ");
    // }

  

    const employers = await prisma.user.findMany({
        where: {
            id: listing?.userId
        }
    });


    

    const services = await prisma.service.findMany({
      where: {
        category: listing?.category
      }
    });

    const safeServiceAndEmployers = services.map((service) => ({
      ...service,
      // ...applicants,
      createdAt: service.createdAt.toISOString(),
    }));

    const safeEmployers = employers.map((employer) => ({
      ...employer,
      ...services,
      createdAt: employer.createdAt.toISOString(),
      
    }));

    return {
        listing,
        employers: safeEmployers,
        services: safeServiceAndEmployers
    }
  } catch (error) {
    console.error("Error retrieving applicants:", error);
    throw error;
  }
}
