'use client';

import { SafeUser } from "@/app/types"
import Modal from "./Modal"
import useProfileClientModal from "@/app/hooks/useProfileClientModal"
import { useState } from "react";

interface ProfileClientModalProps {
    user: SafeUser,
    key: string,
}

const ProfileClientModal: React.FC<ProfileClientModalProps> = ({
    user,
    key
}) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const profileClientModal = useProfileClientModal();

    const bodyContent = (
        <div
            className="flex flex-col gap-8"
            key={key}
        >
            {user.firstName}
            {key}
            {user.id}

        </div>
    )

  return (
    <Modal 
        isOpen={profileClientModal.isOpen}
        onClose={profileClientModal.onClose}
        onSubmit={() => {}}
        actionLabel="Fermer"
        disabled={isLoading}
        title="Centre d'information"
        body={bodyContent}
    />
  )
}

export default ProfileClientModal