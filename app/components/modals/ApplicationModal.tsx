"use client";

import useListingInfoModal from "@/app/hooks/useListingInfoModal";
import Modal from "./Modal";
import { useCallback, useState } from "react";

import { Listing, Reservation } from "@prisma/client";

import { SafeListing, SafeUser } from "@/app/types";
import { usePathname, useSearchParams } from "next/navigation";
import ListingInfo from "../listings/ListingInfo";
import useApplicationModal from "@/app/hooks/useApplicationModal";
import Heading from "../Heading";
import ActionModal from "./ActionModal";
import axios from "axios";

interface ApplicationModalProps {
  listing: SafeListing;
  currentUser?: SafeUser | null;
  key?: string;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  listing,
  currentUser,
  key,
  
}) => {
  

  const applicationModal = useApplicationModal();

  const [isLoading, setIsloading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const listingId = searchParams?.get("listingId");

  const onApplyNow = useCallback(() => {
    setIsloading(true);

    try {
      axios.post("/api/applications", {
        listingId: listingId,
      });
      
      setMessage("🙌 Votre candidature a été soumise avec succès!");
      setIsSuccess(true);
    } catch (error) {
      console.log("Error", error);

      setMessage("Oups, une erreur est survenue");
      setIsSuccess(false);

    } finally {
      setIsloading(false);

    }
    


  }, [listing, currentUser, message, isSuccess])

  const bodyContent = (
    <div className="flex flex-col gap-8">
      {!message ? (
        <Heading 
          title="Cette offre vous intéresse ?"
          subtitle="Vous êtes sur le point de postuler pour cette offre"
        />
      ): (
        <Heading 
          title={message}
          subtitle="Veuillez consulter régulièrement votre compte pour suivre votre candidature"
        />
      )}
    </div>
  );

  

  return (
    <ActionModal 
      isOpen={applicationModal.isOpen}
      onClose={applicationModal.onClose}
      onSubmit={onApplyNow}
      actionLabel={"Postuler"} 
      disabled={isLoading}
      title="Candidature"
      body={bodyContent} 
      success={isSuccess}
    />
  );
};

export default ApplicationModal;
