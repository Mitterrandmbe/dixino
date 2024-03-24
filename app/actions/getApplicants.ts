import prisma from "@/app/libs/prismadb";

import getListingsById, { IParams } from "./getListingById";

export async function getApplicants(
    params: IParams
) {
  try {
    
    const listing = await getListingsById({
        listingId: params.listingId
    });

   

    


    const applicants = await prisma.user.findMany({
        where: {
            id: {
                in:[...(listing?.applicantIds || [])]
            }
        }
    });


    

    const services = await prisma.service.findMany({
      where: {
        category: listing?.category
      }
    });

    const safeServiceAndApplicants = services.map((service) => ({
      ...service,
      // ...applicants,
      createdAt: service.createdAt.toISOString(),
    }));

    const safeApplicants = applicants.map((applicant) => ({
      ...applicant,
      ...services,
      createdAt: applicant.createdAt.toISOString(),
      
    }));

    return {
        listing,
        applicants: safeApplicants,
        services: safeServiceAndApplicants
    }
  } catch (error) {
    
    throw error;
  }
}
