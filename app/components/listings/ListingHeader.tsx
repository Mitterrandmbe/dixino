'use client';

import { Reservation } from "@prisma/client"

import { SafeApplicant, SafeListing, SafeReservation, SafeUser } from "@/app/types";

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

import { singleLevelNestedRoutes } from "@/app/libs/routes";

import useLoginModal from "@/app/hooks/useLoginModal";
import useApplicationModal from "@/app/hooks/useApplicationModal";
import useArchiveListingModal from "@/app/hooks/useArchiveListingModal";

import axios from "axios";
import toast from "react-hot-toast";


interface ListingHeaderProps {
    data: SafeListing;
    reservation?: SafeReservation
    applicant?: SafeApplicant
    onAction?: (id: string) =>  void;
    disabled?: boolean; 
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    onSelect?: boolean;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
    data,
    reservation,
    applicant,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
    onSelect
}) => {
  
    const router = useRouter();
    const params = useParams();
    const loginModal = useLoginModal();

    const applicationModal = useApplicationModal();
    const archiveListingModal = useArchiveListingModal();

    const [isLoading, setIsLoading] = useState(false);
    
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);
    const searchParams = useSearchParams();
    const listingId = searchParams?.get("listingId");
    const pathName = usePathname();

    const isHiredNotEmpty = !data.isHiredId

    // // Get current URL
    // useEffect(() => {
    //     pathName = usePathname() 
    // }, [pathName])

    if(!currentUser) {
        return null;
    } 

    // const [isSelected, setIsSelected] = useState(data.id);
    
    
    // HANDLE URL AND ROUTES
    
    
    const handleSelect = useCallback(() => {
        const [isSelected, setIsSelected] = useState(data.id);
        
        router.push(singleLevelNestedRoutes.dashboard.listings + `/${data.id}`);

        if (params) {
            setIsSelected(data.id);
        }


        onSelect=true
    }, [data, onSelect, router])
    
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

    
    
    //Apply for this offer
    const onApply = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        };

        setIsLoading(true);

        if (listingId) {
            router.replace(pathName +"?listingId=" + listingId)
        };



        return applicationModal.onOpen();
        
        // axios.post("/api/applicants", {
        //     listingId: data.id,
        //     userId: currentUser.id,
        // });

    }, [applicationModal, loginModal, currentUser, router, listingId]);

    // Archive this offer
    const onArchive = useCallback(() => {
        
        return archiveListingModal.onOpen();

    }, [archiveListingModal, currentUser]);

    // Approve this offer
    const onApprove = useCallback(() => {
        setIsLoading(true);

        try {
            axios.post("/api/approve-listing", {
                listingId: data.id
            });

            toast.success("Offre approuvée")
        } catch (error) {
            toast.error("Oups, une erreur est survenue");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }

    }, [data, currentUser]);

    // Approve this offer
    const onDecline = useCallback(() => {
        setIsLoading(true);

        try {
            axios.post("/api/decline-listing", {
                listingId: data.id
            });

            toast.success("Offre rejetée");
        } catch (error) {
            toast.error("Oups, une erreur est survenue");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }

    }, [data, currentUser])

    
    
    return (
    
    <div 
        className={`
            flex
            flex-col
            gap-8
            p-4
        `}
        >
        <div
            className="
                grid
                grid-cols-5
                gap-8
            "
        >
            <div className="col-span-1 text-2xl my-auto w-full aspect-square">
                <div className="bg-neutral-100 w-full h-full flex flex-col justify-center items-center text-4xl 2xl:text-6xl rounded-full">
                    {category && <category.icon />} 
                </div>
                   
            </div>
            
            <div className="col-span-4 flex flex-col justify-center gap-4 min-h-[120px] ">
                <div className="font-semibold text-xl flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between">
                    {category?.label}
                    <div className="flex flex-row gap-2">
                        {data.userId !== currentUser?.id && (
                            <Button
                                label={data.isHiredId === currentUser?.id ? "Candidature en cours" : "Postuler"}
                                small
                                actionLevel={data.isHiredId === currentUser?.id ? "outline" : "secondary"}
                                onClick={onApply}
                                disabled={data.isHiredId === currentUser?.id || !isHiredNotEmpty || data.serviceDate < new Date() || data.applicantIds.includes(currentUser.id) ? true : isLoading}
                            />
                        )}
                        {data.userId === currentUser?.id && (
                            <Button
                                label="Archiver"
                                small
                                actionLevel="outline"
                                onClick={onArchive}
                                disabled={data.status==="DECLINED" || !isHiredNotEmpty ? true : isLoading}
                            />
                        )}
                        {currentUser?.role === "ADMIN" && (
                            <div className="flex flex-row gap-2">
                                <Button
                                    label="Approuver"
                                    small
                                    actionLevel="secondary"
                                    onClick={onApprove}
                                />
                                <Button
                                    label="Rejeter"
                                    small
                                    actionLevel="outline"
                                    onClick={onDecline}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-row justify-between gap-8 ">
                    <div className="flex flex-row items-center gap-2 text-neutral-700 text-xs">
                        <div className="hidden md:block p-2 bg-yellow rounded-full">
                            <LuMapPin size={16} className="text-white"/>
                        </div>
                        {data.city} {location?.flag}
                    </div>
                    <div className="flex flex-row items-center gap-2 text-neutral-700 text-xs">
                        <div className="hidden md:block p-2 bg-secondary rounded-full">
                            <IoCalendarOutline size={16} className="text-white"/>
                        </div>
                        {date}
                    </div>
                    <div className="flex flex-row items-center gap-2 text-neutral-700 text-xs">
                        <div className="hidden md:block p-2 bg-primary rounded-full">
                            <WiTime9 size={16} className="text-white"/>
                        </div>
                        {hour}:{minute}
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-row justify-between border-t border-dashed pt-4 text-neutral-500">
            <div className="hidden md:flex flex-row items-center gap-2 font-semibold">
                <div className="flex flex-row bg-neutral-100 p-2 rounded-full">
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
        
    </div>
    
  )
}

export default ListingHeader