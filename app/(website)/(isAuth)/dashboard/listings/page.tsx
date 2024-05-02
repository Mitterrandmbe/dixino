import getCurrentUser from "@/app/actions/getCurrentUser";
import { IListingsParams, getListings } from "@/app/actions/getListings";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import ListingInfo from "@/app/components/listings/ListingInfo";
import EmptyState from "@/app/components/states/EmptyState";

import Listings from "@/app/components/listings/Listings";

import { getApplicants } from "@/app/actions/getApplicants";
import {IParams} from "@/app/actions/getListingById";
import { SafeService } from "@/app/types";

import { getAllListings } from "@/app/actions/getAllListings";



export default async function ListingsPage() {


    const currentUser = await getCurrentUser();
    // const listings = await getListings(params.listingId);
    const listings = await getAllListings()
    
    

    if (!currentUser) {
        return (
            <EmptyState 
                title="Accès non-autorisé."
                subtitle="Veuillez vous connecter."
                actionLabel="onLogin"
            />
        )
    }
    
    if (!listings) {
        return (
            <EmptyState 
                title="Offre introuvable"
                subtitle="Aucune offre trouvée pour le moment"
                actionLabel="onLogin"
            />
        )
    }

    const filteredListings = listings.filter((listing) => listing.serviceDate >= new Date());
    
    
    
    return (
        <div className="bg-neutral-100 h-screen">
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
                pt-12
            "
        >
                {filteredListings.map((listing: any) => {
                    return (
                            // <Listings 
                            //     currentUser={currentUser}
                            //     key={listing.id}
                            //     listing={listing}
                                
                                
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
        </div>
    )
}