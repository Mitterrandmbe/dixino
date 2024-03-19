import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import ListingInfo from "@/app/components/listings/ListingInfo";
import EmptyState from "@/app/components/states/EmptyState";

import getListingsById from "@/app/actions/getListingById";
import { getApplicants } from "@/app/actions/getApplicants";
import { IListingsParams } from "@/app/actions/getAdminListings";

interface IParams {
  listingId?: string;
}

export default async function OffersPage({ params }: { params: IParams }) {
  
  const currentUser = await getCurrentUser();
  const listing = await getListingsById(params);
  const { applicants, services } = await getApplicants(params);
  
  if (!services) {
    return "Services introuvables"
  }

  if (!listing) {
    return (
      <EmptyState
        title="Vous n'avez pas encore d'offre."
        subtitle="Créer votre offre en 1 click"
        actionLabel="onOffer"
      />
    );
  };

  return (
    <div className="bg-neutral-100 h-screen overflow-auto">
      <Container>
        <div className="bg-white w-fit p-4 lg:p-8 mx-auto mt-8 rounded-md">
          <ListingInfo 
            listing={listing} 
            currentUser={currentUser} 
            applicants={applicants}
            services={services}
          />
        </div>
      </Container>
    </div>
  );
}
