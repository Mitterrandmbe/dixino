'use client';

import { useRouter } from "next/navigation";
import Heading from "../Heading";
import Button from "../Button";
import useOfferModal from "@/app/hooks/useOfferModal";
import useLoginModal from "@/app/hooks/useLoginModal";


interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    onClick?: () => void;
    actionLabel?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "😞 Aucun résultat trouvé",
    subtitle = "Essayez de modifier les filtres",
    showReset,
    onClick,
    actionLabel
}) => {
    
    const router = useRouter();
    const offerModal = useOfferModal();
    const loginModal = useLoginModal();

  
    return (
    <div
        className="
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
        "
    >
        <Heading 
            title={title}
            subtitle={subtitle}
            center
        />
        <div className="w-60 mt-4">
            {showReset && (
                <Button 
                    label="Revenir à la page d'accueil"
                    onClick={() => router.push("/")}
                    actionLevel="outline"
                />
            )}
        </div>
        <div className="w-60 mt-4">
            {actionLabel === "onOffer" && (
                <Button 
                    label="Créer une offre"
                    onClick={offerModal.onOpen}
                    actionLevel="primary"
                />
            )}
            {actionLabel === "onLogin" && (
                <Button 
                    label="Se connecter"
                    onClick={loginModal.onOpen}
                    actionLevel="primary"
                />
            )}
        </div>
    </div>
  )
}

export default EmptyState