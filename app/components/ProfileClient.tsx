"use client";

import { useCallback, useState } from "react";
import { SafeUser } from "../types";
import Avatar from "./Avatar";
import Button from "./Button";

import ProfileClientModal from "./modals/ProfileClientModal";
import useProfileClientModal from "../hooks/useProfileClientModal";
import useCountries from "../hooks/useCountries";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProfileClientProps {
  user: SafeUser;
  key: any;
  onClick: (userId: string) => void;
}

export const ProfileClient: React.FC<ProfileClientProps> = ({ user, key, onClick }) => {
    
    const [showInfo, setShowInfo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {getByValue} = useCountries();
    const countryName = getByValue(user?.countryValue || "")


    const showUserInfo = useCallback(() => {
        setShowInfo(prev => !prev);
    }, []);

    // const onBlockUser = useCallback(() => {
    //     setIsLoading(true),

    //     axios.post("/api/blocked-profile", {
    //         userId: user.id
    //     })
    //     .then(() => {
    //         toast.success("Profil bloqué")
    //         router.refresh
            
            
    //     })
    //     .catch(() => {
    //         toast.error("Oups, une erreur est survenue!")
            
    //     })
    //     .finally(() => {
    //         setIsLoading(false);
    //     })

    // }, [user.id])
  
    return (
    <>
    <ProfileClientModal
        user={user}
        key={key} 
    />
    <div 
        className="
            flex
            flex-col
            gap-8
            border-2
            rounded-md
            shadow
            p-8
            cursor-pointer
            hover:shadow-lg    
        "
    >
        <div
            onClick={showUserInfo}
            className="
                grid
                grid-cols-6
                gap-16
            "
        >
        {user.image && (
            <div className="col-span-1 w-14 h-14 lg:w-24 lg:h-24">
            <Avatar imageSrc={user.image} />
            </div>
        )}

        <div className="col-span-3 flex flex-col gap-2">
            <div className="flex flex-row gap-2 font-semibold text-lg">
            {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-neutral-600">{user.email}</div>
            
        </div>
        <div
            className="col-span-2"
        >
            {user.id && (
                <Button 
                    label={user.isBlocked ? "✅ Débloquer" : "⛔️ Bloquer"} 
                    onClick={() => onClick(user.id)} 
                    actionLevel="outline" 
                    disabled={isLoading}
                />

            )}
        </div>

        </div>
        {showInfo && (
            <div
                className="flex flex-col gap-8 border-t-2 border-neutral-100 pt-8"
            >
                    <div className="flex flex-col gap-4">
                        <div className="font-semibold text-xl text-primary">Bio</div>
                        {user.bio ? (
                            <div>
                            <div className="text-neutral-600 whitespace-pre-line">{user.bio}</div>

                            </div>
                        ) : (
                            <div className="text-warning">Bio non fournie par l{"'"}utilisateur</div>
                        )}
                    </div>
                <div className="flex flex-col gap-4">
                    <div className="font-semibold text-xl text-primary">Contact</div>
                    {user.phoneNumber ? (
                        <div className="text-neutral-600 whitespace-pre-line">{user.phoneNumber}</div>
                    ): (
                        <div className="text-warning">Numéro de téléphone non fourni par l{"'"}utilisateur</div>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <div className="font-semibold text-xl text-primary">Adresses</div>
                    {user.addressNumber || user.street || user.city || user.countryValue ? (
                        <div className="text-neutral-600 whitespace-pre-line">{user.addressNumber} {user.street} {user.city}{","} {countryName?.translations}</div>

                    ) : (
                        <div className="text-warning">Adresse non fournie par l{"'"}utilisateur</div>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <div className="font-semibold text-xl text-primary">Carte d{"'"}identité</div>
                    {user.idCard ? (
                        <div className="w-full h-2/3">
                            <div className="aspect-video">
                                <Image 
                                    src={user.idCard}
                                    alt="Carte d'identité"
                                    width={600}
                                    height={400}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="text-warning">Carte d{"'"}identité non fournie par l{"'"}utilisateur</div>
                    )}

                </div>
            </div>

        )}

    </div>
    </>
  );
};
