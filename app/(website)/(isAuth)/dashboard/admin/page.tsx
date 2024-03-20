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



interface AdminPageProps {
    searchParams: IListingsParams;
    listingId: IParams
    
}

const AdminPage: React.FC<AdminPageProps> = async ({
    searchParams
 }: AdminPageProps) => {

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

    const listings = await getListings({});

    
    if (listings.length === 0) {
        return (
            <EmptyState 
                title="Vous n'avez pas encore d'offre."
                subtitle="Créer votre offre en 1 click"
                actionLabel="onOffer"
            />
        )
    };

    // if(!listing) {
    //     return null;
    // }

    const listingIds = listings.map((listing) => listing.id);

    // const { listing, applicants } = await getApplicants(searchParams.listingId as IParams);
    const {applicants, services} = await getApplicants(searchParams);

    const allListings = await getAllListings()


    
    return (
        <div className="bg-neutral-100 h-screen overflow-auto">
            <Container>
                {allListings.map((listing: any) => {
                    return (
                            <AdminClient 
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
};

export default AdminPage