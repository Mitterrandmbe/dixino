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
import { getAllListings } from "@/app/actions/getAllListings";



export default async function OffersPage() {

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

    // const listings = await getListings({ userId: currentUser.id });
    const listings = await getAllListings()
    const filteredListings = listings.filter((listing) => listing.userId === currentUser.id);
    
    if (filteredListings.length === 0) {
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
    
    
    // const {applicants, services} = await getApplicants(params.searchParams)


    return (
        
        <Container>
            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-2
                    xl:grid-cols-3
                    2xl:grid-cols-3
                    gap-8
                    mt-12
                "
            >
                {filteredListings.map((listing: any) => {
                    return (
                            // <OffersClient 
                            //     currentUser={currentUser}
                            //     key={listing.id}
                            //     listing={listing}
                            //     applicants={applicants}
                            //     services={services}
                            // />
                            <ListingCard 
                                currentUser={currentUser}
                                key={listing.id}
                                data={listing}
                            />
                            
                    )
                })}

            </div>
        </Container>
        
    )
}