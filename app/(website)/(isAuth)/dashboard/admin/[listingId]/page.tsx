import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import ListingInfo from "@/app/components/listings/ListingInfo";
import EmptyState from "@/app/components/states/EmptyState";

import getListingsById from "@/app/actions/getListingById";
import { getApplicants } from "@/app/actions/getApplicants";

interface IParams {
  listingId?: string;
}

export default async function ListingsPage({ params }: { params: IParams }) {
  
  const currentUser = await getCurrentUser();
  const listing = await getListingsById(params);
  const { applicants } = await getApplicants(params)

  if (!listing) {
    return null;
  }

  return (
    <div className="bg-neutral-100 h-screen overflow-auto">
      <Container>
        <div className="bg-white max-w-screen-lg p-8 mx-auto mt-8 rounded-md">
          <ListingInfo listing={listing} currentUser={currentUser} applicants={applicants} />
        </div>
      </Container>
    </div>
  );
}
