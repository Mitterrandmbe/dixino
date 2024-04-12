import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import ListingInfoPublic from "@/app/components/listings/ListingInfoPublic";
import EmptyState from "@/app/components/states/EmptyState";

import getListingsByIdPublic from "@/app/actions/getListingByIdPublic";
import { getListings } from "@/app/actions/getListings";
import { getApplicants } from "@/app/actions/getApplicants";
import { SafeListing } from "@/app/types";

interface IParams {
  listingId?: string;
}

export default async function OffrePage({ params }: { params: IParams }) {
  
  const currentUser = await getCurrentUser();
  const listing = await getListingsByIdPublic(params);
  // const listing = await getListings(params);
//   const { applicants } = await getApplicants(params)

 

  return (
    <div className="bg-neutral-100 h-screen overflow-auto">
      <Container>
        <div className="bg-white w-full p-8 mx-auto mt-8 rounded-md">
          <ListingInfoPublic listing={listing as SafeListing}/>
        </div>
      </Container>
    </div>
  );
}
