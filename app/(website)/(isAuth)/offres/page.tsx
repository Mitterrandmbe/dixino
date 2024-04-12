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



export default async function ServicesPage() {


    const currentUser = await getCurrentUser();
    // const listings = await getListings(params.listingId);
    const listings = await getAllListings()
    
    if (!listings || listings.length === 0) {
        return (
            <EmptyState 
                title="Offre introuvable"
                subtitle="Aucune offre trouvée pour le moment"
            />
        )
    }

    // const firstListing = listings[0];
    
    
    
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
                {listings.map((listing: any) => {
                    return (
                            // <Listings 
                            //     currentUser={currentUser}
                            //     key={listing.id}
                            //     listing={listing}
                                
                                
                            // />

                            <ListingCard 
                                key={listing.id}
                                data={listing}
                            />
                    )
                })}
        </div>
        </Container>
    )
}