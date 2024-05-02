import Container from "@/app/components/Container";
import Dashboard from "@/app/components/dashboard/Dashboard";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import { getListings } from "@/app/actions/getAdminListings";

import EmptyState from "@/app/components/states/EmptyState";
import { IListingsParams } from "@/app/actions/getListings";
import { IParams } from "@/app/actions/getListingById";
import { getApplicants } from "@/app/actions/getApplicants";
import { getEmployers } from "@/app/actions/getEmployers";

import { getAllListings } from "@/app/actions/getAllListings";


interface DashboardProps {
    searchParams: IListingsParams;
}

export default async function DashboardPage({ searchParams }: DashboardProps) {
    
    // if (!params || !params.listingId) {
    //     return (
    //         <EmptyState
    //             title="Oups!"
    //             subtitle="Offre non-disponible"
    //         />
    //     )
    // }


    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return (
            <EmptyState
                title="⛔️ Accès interdit"
                subtitle="Veuillez vous connecter"
                actionLabel="onLogin"
            />
        )
    };

    const listings = await getListings({userId:  currentUser.id});
    if(!listings) {
        return (
            <EmptyState 
                title="Vous n'avez pas encore d'offre."
                subtitle="Créer votre offre en 1 click"
                actionLabel="onOffer"
            />
        )
    };

    const { applicants, services } = await getApplicants(searchParams);
    const { employers } = await getEmployers(searchParams);


    const reservations = await getReservations({ userId: currentUser.id });

    const allListings = await getAllListings();
    const filteredListings = listings.filter((listing) => listing.serviceDate >= new Date());
    
    
    return (
        <>
        <div className="h-screen">
        <Container>
            <div className="flex flex-col gap-8 p-12">
                <div className="text-4xl font-semibold pt-8">
                    Tableau de bord
                </div>
                <Dashboard
                    currentUser={currentUser}
                    listings={listings}
                    services={services}
                    reservations={reservations}
                    employers={employers}
                    applicants={applicants}
                    allListings={filteredListings}
                />
            </div>
        </Container>
        </div>
        </>
    )
}