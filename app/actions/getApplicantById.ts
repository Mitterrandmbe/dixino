import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export interface IParams {
    applicantId?: string;
    listingId?: string;
}

export default async function getApplicantById(
    params: IParams
) {
    try {
        const { applicantId, listingId } = params;

        if (!applicantId) {
            return null
        };

        if (!listingId) {
            return null;
        }

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            }
        })

        const applicant = await prisma.service.findUnique({
            where: {
                id: listingId,
                category: listing?.category
            },
        });

        return {
            applicant
        }

    } catch (error: any) {
        console.log("error ", error)
        throw new Error(error)
    }
}