import getCurrentUser from "@/app/actions/getCurrentUser";
import { IListingsParams, getListings } from "@/app/actions/getListings";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import ListingInfo from "@/app/components/listings/ListingInfo";
import EmptyState from "@/app/components/states/EmptyState";

import Listings from "@/app/components/listings/Listings";

import { getApplicants } from "@/app/actions/getApplicants";
import getListingsById, {IParams} from "@/app/actions/getListingById";
import { SafeService } from "@/app/types";

import getApplicantById from "@/app/actions/getApplicantById";
import OffersClient from "./OffersClient";
import HireModal from "@/app/components/modals/HireModal";




interface OffersProps {
    searchParams: IListingsParams,
    listingId: IParams
    
}

export default async function OffersPage({searchParams, listingId}: OffersProps ) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState 
                title="Accès non-autorisé."
                subtitle="Veuillez vous connecter."
                actionLabel="onLogin"
            />
        )
    }

    const listings = await getListings({ userId: currentUser.id });

    
    if (listings.length === 0) {
        return (
            <EmptyState 
                title="Vous n'avez pas encore d'offre."
                subtitle="Créer votre offre en 1 click"
                actionLabel="onOffer"
            />
        )
    };

    const firstListing = listings[0]

    const listingIds = listings.map((listing) => listing.id);

    // const { listing, applicants } = await getApplicants(searchParams.listingId as IParams);
    const {applicants, services} = await getApplicants(searchParams)

    
    return (
        <div className="bg-neutral-100 h-screen overflow-auto">
            <Container>
                {listings.map((listing: any) => {
                    return (
                            <OffersClient 
                                currentUser={currentUser}
                                key={listing.id}
                                listing={listing}
                                applicants={applicants}
                                services={services}
                            />
                            
                    )
                })}
            </Container>
        </div>
    )
}