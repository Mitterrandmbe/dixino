"use client";

import useListingInfoModal from "@/app/hooks/useListingInfoModal";
import Modal from "./Modal";
import { useState } from "react";

import { Listing, Reservation } from "@prisma/client";

import { SafeListing, SafeUser } from "@/app/types";
import { useSearchParams } from "next/navigation";
import ListingInfo from "../listings/ListingInfo";

interface ListingInfoModalProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
  key: string;
}

const ListingInfoModal: React.FC<ListingInfoModalProps> = ({
  data,
  currentUser,
  key,
}) => {
  

  const listingInfoModal = useListingInfoModal();

  const [isLoading, setIsloading] = useState(false);

  const bodyContent = (
    <div className="flex flex-col gap-8 h-screen">
        <ListingInfo key={data.id} listing={data} currentUser={currentUser} />
    </div>
  );

  return (
    <Modal
      isOpen={listingInfoModal.isOpen}
      disabled={isLoading}
      title="Listing title"
      actionLabel="Postuler"
      onSubmit={() => {}}
      secondaryActionLabel="Modifier"
      secondaryAction={() => {}}
      onClose={listingInfoModal.onClose}
      body={bodyContent}
    />
  );
};

export default ListingInfoModal;
