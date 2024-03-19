import { SafeApplicant, SafeService } from "@/app/types"

import ActionModal from "./ActionModal";
import useApplicantInfoModal from "@/app/hooks/useApplicantInfoModal";
import { useState } from "react";
import Avatar from "../Avatar";


interface ApplicantInfoModalProps {
    applicant: SafeApplicant;
    services?: SafeService[]
}

const ApplicantInfoModal: React.FC<ApplicantInfoModalProps> = ({
    applicant,
    services
}) => {
  
    const applicantInfoModal = useApplicantInfoModal();
    const [isLoading, setIsLoading] = useState(false);

    const bodyContent = (
        <div>
          {applicant.firstName}
        </div>
    )
  
    return (
    <ActionModal 
        isOpen={applicantInfoModal.isOpen}
        onSubmit={() => {}}
        title="User"
        onClose={applicantInfoModal.onClose}
        body={bodyContent}
        disabled={isLoading}
        actionLabel="Retenir ce candidat"

    />
  )
}

export default ApplicantInfoModal