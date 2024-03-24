'use client';

import { Listing, Reservation } from "@prisma/client"

import { SafeEmployer, SafeListing, SafeReservation, SafeUser } from "@/app/types";

import useCountries from "@/app/hooks/useCountries";
import { format, getHours } from "date-fns";

import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/app/libs/data";

import { LuMapPin, LuCalendarOff, LuUsers2, LuArchive } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { WiTime9 } from "react-icons/wi";
import { IoMdCheckmark } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { BsHourglassSplit } from "react-icons/bs";

import { IconType } from "react-icons";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "../Button";

import useListingInfoModal from "@/app/hooks/useListingInfoModal";
import { singleLevelNestedRoutes } from "@/app/libs/routes";
import Image from "next/image";
import Avatar from "../Avatar";
import EmptyState from "../states/EmptyState";



interface ReservationCardProps {
    data: SafeListing;
    reservation?: SafeReservation
    onAction?: (id: string) =>  void;
    disabled?: boolean; 
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    onSelect?: boolean;
    employers: SafeEmployer[]
}

const ReservationCard: React.FC<ReservationCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
    onSelect,
    employers
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
        
        router.push(singleLevelNestedRoutes.dashboard.listings + `/${data.id}`);
        
    }, [data, router]);

    const showOfferDetail = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (pathname === "/dashboard/listings") {
            router.push(singleLevelNestedRoutes.dashboard.listings + `/${data.id}`)
        }

        if (pathname === "/dashboard/offers") {
            router.push(singleLevelNestedRoutes.dashboard.offers + `/${data.id}`)
        }

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
        month: 'short',

    });

    const hour = data.serviceDate.getHours().toString().padStart(2, '0');
    const minute = data.serviceDate.getMinutes().toString().padStart(2, '0');

    const expirationDate = new Date(data.serviceDate);
    expirationDate.setDate(expirationDate.getDate() + 1);

    const formattedExpirationDate = expirationDate.toLocaleDateString("fr-FR", {
        day: 'numeric',
        month: "short",
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

    // Employer
    const imgSrc = employers[0].image;
    const employerFName = employers[0].firstName;
    const employerLName = employers[0].lastName;

    
    return (
    
    <div 
        onClick={handleSelect}
        className={`
            grid
            grid-cols-1
            xl:grid-cols-7
            gap-8 
            bg-white
            border-2
            mt-8
            p-4
            rounded-md
            shadow-none
            hover:shadow-lg
            transition-all
            cursor-pointer
            ${isSelected === id ? "border-secondary" : "border-white"}
        `}
        >
        <div
            className="
                col-span-7
                pb-4
                xl:pb-0
                xl:col-span-2
                border-b-2
                xl:border-b-0
                xl:border-r-2 
                xl:border-neutral-300
            "
        >
            <div className="col-span-1 flex flex-row xl:flex-col justify-between text-2xl my-auto w-full h-full">
                <div className="font-semibold text-lg md:text-xl lg:text-2xl">
                    {date}
                </div>
                <div className="flex flex-row items-center gap-2 text-neutral-700 text-lg">
                        <div>
                            <WiTime9 size={20}/>
                        </div>
                        {hour}:{minute}
                </div>

                <div className="flex flex-row items-center gap-2 text-neutral-700 text-lg">
                        <div>
                            <BsHourglassSplit size={18}/>
                        </div>
                        {data.duration} h
                </div>

                
            </div>
        </div>
        
        <div
            className="
                col-span-7 
                lg:col-span-5
                flex 
                flex-col 
                lg:flex-row 
                justify-between
                items-center
            "
        >        
            
        <div className="col-span-3 flex flex-col justify-between min-h-[120px] ">
            <div className="font-semibold text-xl">
                {category?.label}
            </div>
            <div
                className="text-sm text-neutral-600"
            >
                {employerFName} {employerLName}
            </div>
            
            <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-row items-center gap-2 text-neutral-600 text-xs">
                    <div className="hidden md:block">
                        <LuMapPin size={16}/>
                    </div>
                    {data.city} {location?.flag}
                </div>
                
            </div>
        </div>

        <div className="aspect-square w-[8rem] h-[8rem] p-2 order-first lg:order-last">
            {imgSrc && (
                <Avatar imageSrc={imgSrc} />
            )}
        </div>

        </div>
            
        
    </div>
    
  )
}

export default ReservationCard