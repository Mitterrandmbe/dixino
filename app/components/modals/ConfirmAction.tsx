import useConfirmActionModal from "@/app/hooks/useConfirmActionModal"
import ActionModal from "./ActionModal"
import { useState } from "react";
import { SafeListing, SafeUser } from "@/app/types";
import Heading from "../Heading";

interface ConfirmActionProps {
    data: any;
    currentUser: SafeUser | null;
    onClick: () => void;
    bodyContent: React.ReactElement
    isLoading: boolean;
    actionLabel: string;
    title: string;
}


const ConfirmAction: React.FC<ConfirmActionProps> = ({
  data,
  currentUser,
  onClick,
  bodyContent,
  isLoading,
  actionLabel,
  title
}) => {
  const confirmActionModal = useConfirmActionModal();
  

  // const bodyContent = (
  //   <div>
  //       <Heading 
  //           title="Attention!"
  //           subtitle="Vous êtes sur le point d'annuler votre prestation"
  //       />

  //   </div>
  // )


  return (
    <ActionModal 
        isOpen={confirmActionModal.isOpen}
        onSubmit={onClick}
        title={title}
        onClose={confirmActionModal.onClose}
        body={bodyContent}
        disabled={isLoading}
        actionLabel={actionLabel}


    />
  )
}

export default ConfirmAction