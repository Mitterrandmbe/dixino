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



interface ListingsProps {
    searchParams: IListingsParams,
    listingId: IParams
    
}

export default async function ListingsPage({searchParams, listingId}: ListingsProps ) {

    const listings = await getListings(searchParams);
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
    

    const firstListing = listings[0];
    

    
    const {applicants, services} = await getApplicants(searchParams)
    
    
    return (
        <div className="bg-neutral-100 h-screen overflow-auto">
            <Container>
                {listings.map((listing: any) => {
                    return (
                            <Listings 
                                currentUser={currentUser}
                                key={listing.id}
                                listing={listing}
                                applicants={applicants}
                                services={services}
                                firstListing={firstListing}
                            />
                    )
                })}
            </Container>
        </div>
    )
}