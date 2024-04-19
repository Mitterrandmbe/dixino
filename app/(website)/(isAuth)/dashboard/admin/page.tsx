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

import OffersClient from "./AdminClient";
import AdminClient from "./AdminClient";

import { getAllListings } from "@/app/actions/getAllListings";



const AdminPage = async () => {

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


    // const { listing, applicants } = await getApplicants(searchParams.listingId as IParams);
    // const {applicants, services} = await getApplicants(params.searchParams);

    const listings = await getAllListings()

    if (listings.length === 0) {
        return (
            <EmptyState 
                title="Vous n'avez pas encore d'offre."
                subtitle="Créer votre offre en 1 click"
                actionLabel="onOffer"
            />
        )
    };


    
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
                    mt-12
                "
            
            >
                    {listings.map((listing: any) => {
                        return (
                                <ListingCard 
                                    key={listing.id}
                                    data={listing}
                                />
                        )
                    })}
    
            </div>
        </Container>
        </div>
    )
};

export default AdminPage