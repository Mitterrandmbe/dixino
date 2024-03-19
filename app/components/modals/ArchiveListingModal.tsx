'use client';

import useArchiveListingModal from "@/app/hooks/useArchiveListingModal";
import ActionModal from "./ActionModal";
import { SafeListing, SafeUser } from "@/app/types";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../Heading";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface ArchiveListingModalProps {
    listing: SafeListing;
    currentUser?: SafeUser;
    key?: string;
}

const ArchiveListingModal: React.FC<ArchiveListingModalProps> = ({
    listing,
    currentUser,
    key
}) => {

  
  const archiveListingModal = useArchiveListingModal();
  const searchParams = useSearchParams();
  const listingId = searchParams?.get("listingId")
  

  const [isLoading, setIsLoading] = useState(false);

  const onArchive = useCallback(() => {
    setIsLoading(true);

    try {
      axios.post("/api/archive-listing", {
        listingId: listingId
      });

      toast.success("🗑️ Offre supprimée!")
    } catch (error) {
      toast.error("Oups une erreur est survenue");
      setIsLoading(false);

    } finally {
      setIsLoading(false);
    }
  }, [listing, currentUser])

  const bodyContent = (
    <div className="flex flex-col gap-8">
        <Heading 
            title="Voulez-vous définitivement supprimer cette offre ?"
            subtitle="Vous êtes sur le point de supprimer cette offre"
        />
        <div>Une fois supprimée, cette offre ne sera plus visible aux candidats.</div>
    </div>
  )
  

  return (
    <ActionModal
        isOpen={archiveListingModal.isOpen}
        onClose={archiveListingModal.onClose}
        onSubmit={onArchive}
        actionLabel="Supprimer cette offre"
        disabled={isLoading}
        title="⛔️ Zone de danger"
        body={bodyContent}
    />
  )
}

export default ArchiveListingModal