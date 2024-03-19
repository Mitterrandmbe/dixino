"use client";

import Link from "next/link";
import { User } from "@prisma/client";

import { RxDashboard } from "react-icons/rx";
import { PiPaintBrushBroadFill } from "react-icons/pi"
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoIosHelpBuoy } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { IoCubeOutline } from "react-icons/io5";

import LinkItem from "../LinkItem";
import { SafeListing, SafeUser } from "@/app/types";

import { routes, singleLevelNestedRoutes } from "@/app/libs/routes";
import { usePathname, useRouter } from "next/navigation";

import { GrUserAdmin } from "react-icons/gr";

interface NavLinksProps {
    currentUser?: SafeUser| null;
    listing?: SafeListing
    allListings?: SafeListing
}

const NavLinks: React.FC<NavLinksProps> = ({
    currentUser,
    listing,
    allListings

}) => {
  
    const router = useRouter();
    const pathName = usePathname();


    return (

    <div className="hidden lg:block">
        <div
            className="
                flex
                flex-row
                text-sm
                gap-6
                hover:cursor-pointer

            "
        >
            {currentUser ? (
                <>
                    <div 
                        className={`
                        ${pathName === routes.dashboard ? "text-primary" : "text-black"}
                        `}
                    >
                        <LinkItem 
                            href="/dashboard"
                            label="Tableau de bord"
                            icon={RxDashboard}
                        />
                    </div>

                    <div
                        className={`
                        ${pathName === singleLevelNestedRoutes.dashboard.listings ? "text-primary" : "text-black"}
                        `}
                    >
                        <LinkItem 
                            href="/dashboard/listings"
                            label="Offres"
                            icon={PiPaintBrushBroadFill}
                        />
                    </div>

                    <div
                        className={`
                        ${pathName === singleLevelNestedRoutes.dashboard.offers ? "text-primary" : "text-black"}
                        `}
                    >
                        <LinkItem 
                            href={!listing ? singleLevelNestedRoutes.dashboard.offers : singleLevelNestedRoutes.dashboard.offers+ `?listingId=${listing?.id}`}
                            label="Demandes"
                            icon={IoCubeOutline}
                            
                        />
                    </div>

                    {currentUser.role === "ADMIN" && (
                        <div
                            className={`
                            ${pathName === singleLevelNestedRoutes.dashboard.admin ? "text-primary" : "text-black"}
                            `}
                        >
                                <LinkItem 
                                    href={singleLevelNestedRoutes.dashboard.admin + `?listingId=${allListings?.id}`}
                                    label="Gerant"
                                    icon={GrUserAdmin}
                                />
                        </div>
                     )}

                    <div
                        className={`
                        ${pathName === routes.account ? "text-primary" : "text-black"}
                        `}
                    >
                        <LinkItem 
                            href={routes.account}
                            label="Mon compte"
                            icon={AiOutlineUser}
                        />
                    </div>

                    {currentUser.role === "ADMIN" && (
                        <div
                            className={`
                            ${pathName === routes.admin ? "text-primary" : "text-black"}
                            `}
                        >
                                <LinkItem 
                                    href={routes.admin + "?tab=0"}
                                    label="Admin"
                                    icon={MdOutlineAdminPanelSettings}
                                />

                        </div>
                    )}
                </>

            ) : (
                <>
                <Link 
                    href={"/"} 
                    className={`
                        text-black 
                        hover:text-primary
                        ${pathName === routes.home ? "text-primary" : "text-black"}
                    `}
                >
                    Accueil
                </Link>
                <Link href={"/"} className="text-black hover:text-primary">
                    Comment ça marche?
                </Link>
                <Link href={"/"} className="text-black hover:text-primary">
                    Services
                </Link>
                <Link href={"/"} className="text-black hover:text-primary">
                    Tarifs
                </Link>
                <Link href={"/"} className="text-black hover:text-primary">
                    Devenir partenaire
                </Link>
                <Link href={"/"} className="text-black hover:text-primary">
                    Contact
                </Link>
                </>

            )}
        </div>

    </div>
  )
}

export default NavLinks