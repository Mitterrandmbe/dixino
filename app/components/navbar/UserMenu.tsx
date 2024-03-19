'use client';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';

import { AiOutlineMenu } from 'react-icons/ai';
import { RxDashboard } from "react-icons/rx";
import { PiPaintBrushBroadFill } from "react-icons/pi"
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoIosHelpBuoy } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { IoCubeOutline } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";

import { ReactHTMLElement, useCallback, useEffect, useRef, useState } from 'react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { SafeListing, SafeUser } from '@/app/types';
import useOfferModal from '@/app/hooks/useOfferModal';
import { usePathname, useRouter } from 'next/navigation';

import { routes, singleLevelNestedRoutes } from "@/app/libs/routes";

interface UserMenuProps {
    currentUser?: SafeUser | null;
    listing?: SafeListing;
    allListings?: SafeListing
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
    listing,
    allListings
}) => {
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const offerModal = useOfferModal();
    
    const pathName = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen(isOpen => !isOpen)
    }, []);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, []);

    const onCreateOffer = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        offerModal.onOpen();

    }, [currentUser, loginModal, offerModal])
  
    return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
                onClick={onCreateOffer}
                className="
                    text-sm
                    text-white
                    whitespace-nowrap
                    py-3
                    px-4
                    rounded
                    bg-primary
                    cursor-pointer
                    hover:bg-primaryDark
                    transition
                "
            >
                Poster une offre
            </div>
            <div
                onClick={toggleOpen}
                className={`
                    p-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded
                    cursor-pointer
                    hover:shadow-md
                    transition
                    max-h-11
                    ${!currentUser ? "border-transparent" : "border-neutral-200"}
                `}
            >
                <div className="md-block aspect-square overflow-hidden w-8 h-8">
                    {currentUser?.image && (
                        <Avatar 
                            imageSrc={currentUser.image}
                        />

                    )}
                </div>
                <AiOutlineMenu />
            </div>
        </div>
        {isOpen && (
            <div
                ref={dropdownRef}
                className='
                    absolute
                    rounded
                    shadow-md
                    w-[60vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                '
            >
                <div className='flex flex-col cursor-pointer'>
                    <div className='bg-primary m-2 text-white rounded text-center hover:text-black'>
                    <MenuItem 
                        onClick={onCreateOffer}
                        label="Poster une offre"
                        />
                    </div>
                    {currentUser ? (
                        <>
                            <div
                                className={`
                                ${pathName === routes.dashboard ? "text-primary" : "text-black"}
                                `}
                            >
                                <MenuItem 
                                    onClick={() => router.push("/dashboard")}
                                    label="Tableau de bord"
                                    icon={RxDashboard}
                                />
                            </div>

                            <div
                                className={`
                                ${pathName === singleLevelNestedRoutes.dashboard.listings ? "text-primary" : "text-black"}
                                `}
                            >
                                <MenuItem 
                                    onClick={() => router.push(singleLevelNestedRoutes.dashboard.listings + `?listingId=${listing?.id}`)}
                                    label="Offres"
                                    icon={PiPaintBrushBroadFill}
                                />
                            </div>

                            <div
                                className={`
                                ${pathName === singleLevelNestedRoutes.dashboard.offers ? "text-primary" : "text-black"}
                                `}
                            >
                                <MenuItem 
                                    onClick={() => router.push(singleLevelNestedRoutes.dashboard.offers + `?listingId=${listing?.id}`)}
                                    label="Demandes"
                                    icon={IoCubeOutline}
                                />
                            </div>

                            <div
                                className={`
                                ${pathName === singleLevelNestedRoutes.dashboard.admin ? "text-primary" : "text-black"}
                                `}
                            >
                                {currentUser.role === "ADMIN" && (
                                    <MenuItem 
                                        onClick={() => router.push(singleLevelNestedRoutes.dashboard.admin + `?listingId=${allListings?.id}`)}
                                        label="Gerant"
                                        icon={GrUserAdmin}
                                    />
                                )}
                            </div>

                            <div
                                className={`
                                ${pathName === routes.account ? "text-primary" : "text-black"}
                                `}
                            >
                                <MenuItem 
                                    onClick={() => router.push(routes.account)}
                                    label="Mon compte"
                                    icon={AiOutlineUser}
                                />
                            </div>

                            <div
                                className={`
                                ${pathName === routes.admin ? "text-primary" : "text-black"}
                                `}
                            >
                                {currentUser.role === "ADMIN" && (
                                    <MenuItem 
                                        onClick={() => router.push(routes.admin + "?tab=0")}
                                        label="Admin"
                                        icon={MdOutlineAdminPanelSettings}
                                    />
                                )}
                            </div>
                            <hr />
                            <MenuItem 
                                onClick={() => signOut()}
                                label="Déconnexion"
                            />

                        </>
                    ) : (
                        
                        <>
                        <MenuItem 
                            onClick={loginModal.onOpen}
                            label="Se connecter"
                            />
                        <MenuItem 
                            onClick={registerModal.onOpen}
                            label="S'inscrire"
                            />
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu