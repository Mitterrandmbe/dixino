"use client";

import useListingInfoModal from "@/app/hooks/useListingInfoModal";
import Modal from "./Modal";
import { useState } from "react";

import { Applicant, Listing, Reservation } from "@prisma/client";

import { SafeUser } from "@/app/types";
import { useSearchParams } from "next/navigation";

interface ListingInfoModalProps {
    data: Listing;
    currentUser?: SafeUser | null;
    key: string;
}

const ListingInfoModal: React.FC<ListingInfoModalProps> = ({
    data,
    currentUser,
    key
}) => {
  const searchParams = useSearchParams();
  const listingInfoModal = useListingInfoModal();

  const [isLoading, setIsloading] = useState(false);

  const bodyContent = (
    <div>
        {data.category}
    </div>
  )
  
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
  )
}

export default ListingInfoModal