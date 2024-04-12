'use client';

import { Listing, Reservation } from "@prisma/client"

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import useCountries from "@/app/hooks/useCountries";
import { format } from "date-fns";

import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/app/libs/data";

import { LuMapPin, LuCalendarOff, LuUsers2, LuArchive } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { WiTime9 } from "react-icons/wi";
import { IoMdCheckmark } from "react-icons/io";
import { MdEdit } from "react-icons/md";

import { IconType } from "react-icons";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "../Button";

import useListingInfoModal from "@/app/hooks/useListingInfoModal";
import { routes, singleLevelNestedRoutes } from "@/app/libs/routes";



interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation
    onAction?: (id: string) =>  void;
    disabled?: boolean; 
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    onSelect?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
    onSelect
}) => {
  
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();
    const id = searchParams?.get("listingId");

    const listingInfoModal = useListingInfoModal();

    console.log("URL ", pathname)
    
    
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    // HANDLE URL AND ROUTES

    const [isSelected, setIsSelected] = useState(data.id);

    const handleSelect = useCallback(() => {
        
        // router.push(singleLevelNestedRoutes.dashboard.listings + `/${data.id}`);
        if (pathname === "/dashboard/listings") {
            router.push(singleLevelNestedRoutes.dashboard.listings + `/${data.id}`);
        };

        if (pathname === "/dashboard/offers") {
            router.push(singleLevelNestedRoutes.dashboard.offers + `/${data.id}`);
        };

        if (pathname === "/dashboard/admin") {
            router.push(singleLevelNestedRoutes.dashboard.admin + `/${data.id}`);
        }

        if (pathname === "/offres") {
            router.push(routes.services + `/${data.id}`);
        }

        
    }, [data, router]);

    const showOfferDetail = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (pathname === "/dashboard/listings") {
            router.push(singleLevelNestedRoutes.dashboard.listings + `/${data.id}`)
        };

        if (pathname === "/dashboard/offers") {
            router.push(singleLevelNestedRoutes.dashboard.offers + `/${data.id}`)
        };

        if (pathname === "/dashboard/admin") {
            router.push(singleLevelNestedRoutes.dashboard.admin + `/${data.id}`)
        };

        if (params) {
            setIsSelected(data.id);
        }
        
        

    }, [data, onSelect, router]);
    
    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId)
    }, [onAction, actionId, disabled]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice
        };

        return undefined;
    }, [reservation]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        };

        const when = new Date(data.serviceDate);

        return `${format(when, 'PP')} à ${format(when, "HH")}`
    }, [reservation])

    
    // CATEGORIES

    const category = useMemo(() => {
        return categories.find((cat) => cat.label === data.category)
    }, [categories, data])

    // DATE TIME
    const date = data.serviceDate.toLocaleDateString("fr-FR", {
        day: 'numeric',
        month: 'long',

    });

    const hour = data.serviceDate.getHours().toString().padStart(2, '0');
    const minute = data.serviceDate.getMinutes().toString().padStart(2, '0');

    const expirationDate = new Date(data.serviceDate);
    expirationDate.setDate(expirationDate.getDate() + 1);

    const formattedExpirationDate = expirationDate.toLocaleDateString("fr-FR", {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    // DESCRIPTION
    const shortDescription = data.description.slice(0, 60);

    // APPLICANTS
    const applicantCount = useMemo(() => {
        
        const count = data.applicantIds.length
        
        if (count <= 1) {
            return count + " candidat";
        }

        return count + " candidats"

    }, [data.applicantIds]);

    
    
    // STATUS
    const currentStatus = useMemo(() => {
        if (data.status === "PENDING") {
            return {
                status: "Validation en cours",
                icon: IoMdCheckmark
            }
        };

        if (data.status === "CANCELLED") {
            return {
                status: "Archivée",
                icon: LuArchive
            }
        };

        if (data.status === "APPROVED") {
            return {
                status: "Offre validée",
                icon: IoMdCheckmark
            }
        };

        if (data.status === "DECLINED") {
            return {
                status: "Rejetée",
                icon: LuArchive
            }
        };

        if (data.status === "MODIFICATION") {
            return {
                status: "A modifier",
                icon: MdEdit
            }
        };
    }, [data.status]);

    
    
    return (
    
    <div 
        onClick={handleSelect}
        className={`
            col-span-1
            cursor-pointer
            shadow-sm
            bg-white
            p-4
            border
            border-neutral-200
            rounded-md
            gap-8
            hover:shadow-xl
        `}
        >
            <div className="grid grid-cols gap-4 w-full">
                <div className="col-span-1 text-2xl my-auto w-full">
                    <div className="bg-neutral-100 w-[60px] h-[60px] flex flex-row justify-center items-center text-4xl 2xl:text-6xl rounded-lg">
                        {category && <category.icon size={32}/>} 
                    </div>
                </div>
                <div className="col-span-4 flex flex-col justify-between min-h-[120px] ">
                <div className="font-semibold text-xl">
                    {category?.label}
                </div>
                

                <div className="flex flex-row justify-between gap-8">
                    <div className="flex flex-row items-center gap-2 text-primaryDark text-xs bg-primaryLight p-1 rounded">
                        <div className="hidden md:block">
                            <LuMapPin size={16}/>
                        </div>
                        {data.city} {location?.flag}
                    </div>
                    <div className="flex flex-row items-center gap-2 text-primaryDark text-xs bg-primaryLight p-1 rounded">
                        <div className="hidden md:block">
                            <IoCalendarOutline size={16}/>
                        </div>
                        {date}
                    </div>
                    <div className="flex flex-row items-center gap-2 text-primaryDark text-xs bg-primaryLight p-1 rounded">
                        <div>
                            <WiTime9 size={16}/>
                        </div>
                        {hour}:{minute}
                    </div>
                </div>

                <div className="text-neutral-500 text-sm py-4">
                    {shortDescription}...
                </div>

                {/* {data.userId === currentUser?.id && (
                    <div className="flex flex-row justify-between border-t border-dashed pt-4 text-neutral-500">
                        <div className="hidden md:flex flex-row items-center gap-2 font-semibold">
                            <div className="flex-row bg-neutral-100 p-2 rounded-full">
                                <LuCalendarOff size={16} />
                            </div>
                            <div className="text-xs">Expire le {formattedExpirationDate}</div>
                    
                        </div>
                    
                        <div className="flex flex-row items-center gap-2 font-semibold">
                            <div className="flex flex-row bg-neutral-100 p-2 rounded-full">
                                <LuUsers2 size={16} />
                            </div>
                            <div className="text-xs">{applicantCount}</div>
                        </div>
                    
                        <div className="flex flex-row items-center gap-2 font-semibold">
                            <div className="flex flex-row bg-neutral-100 p-2 rounded-full">
                                {currentStatus && <currentStatus.icon />}
                            </div>
                            <div className="text-xs">{currentStatus?.status}</div>
                        </div>
                    
                    </div>

                )} */}

            </div>
                
            </div>

                    
        
        
    </div>
    
  )
}

export default ListingCard