'use client';

import { Reservation } from "@prisma/client";
import { SafeApplicant, SafeListing, SafeService, SafeUser } from "@/app/types";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import ListingCard from "./ListingCard";
import ListingHeader from "./ListingHeader";
import Heading from "../Heading";
import ListingTabs from "./ListingTabs";
import { listingTabs } from "@/app/libs/data";
import { useEffect, useMemo, useState } from "react";

import { IoChevronBackOutline } from "react-icons/io5";
import ApplicantsClient from "../account/ApplicantsClient";
import HireModal from "../modals/HireModal";
import EmptyState from "../states/EmptyState";

interface ListingInfoProps {
    listing: SafeListing;
    currentUser?: SafeUser | null;
    applicants?: SafeApplicant[];
    key?: string;
    services?: SafeService[]
}



const ListingInfo: React.FC<ListingInfoProps> = ({
    listing,
    currentUser,
    applicants,
    key,
    services
}) => {
    
    const params = useParams();
    const router = useRouter();

    const getTab = useMemo(() => {

        if (!currentUser) {
            return null;
        }

        if(currentUser?.id !== listing.userId) {
            return listingTabs[0].label
        }

        return listingTabs.map((item) => item.label)
        
      }, [listingTabs, currentUser, listing])
    
      const [selected, isSelected] = useState("Description");
    
      const handleSelect = (value: string) => {
        isSelected(value)
      };

      const filteredServices = useMemo(() => {
        return services?.map((service) => service )
      }, [services]);

      const applicantIdIndex = useMemo(() => {
        return applicants?.map((applicant) => applicant.id)
      }, [applicants]);

      if (!applicants) {
        return null
      }


    return (
    <div className="flex flex-col gap-4 relative max-w-full mx-auto">
        {currentUser?.id === listing.userId || currentUser?.role === "ADMIN" ? (
            <div>

                <div className=" z-[5] bg-white sticky top-0 w-full">
                <div className="flex flex-col">
                    {params?.listingId && (
                        <div 
                            onClick={() => router.back()}
                            className="flex flex-row gap-1 items-center text-neutral-500 cursor-pointer hover:text-black p-2"
                        >
                            <IoChevronBackOutline size={18} />
                            <div>Retour</div>
                        </div>
                    )}
                    <div className="flex flex-row gap-8 border-b">
                      {listingTabs.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(item.label)}
                            className={`
                                flex
                                flex-row
                                gap-2
                                justify-center
                                items-center
                                text-sm
                                cursor-pointer
                                hover:text-black
                                h-fit
                                p-4
                                border-b
                                ${selected === item.label ? "border-black" : "border-transparent"}
                                ${selected === item.label ? "text-black" : "text-neutral-500"}
                            `}
                        >
                          <item.icon />
                          {item.label}
        
                        </div>
                      ))}
                    </div>
        
              
        
            </div>
        
                </div>
                
                {selected === "Description" && (
                    <div>
                        <ListingHeader
                            data={listing}
                            currentUser={currentUser}
                        />
                        <div className="flex flex-col gap-4">
                            <Heading 
                                title="A propos de cette offre"
                            />
        
                            <div className="whitespace-pre-line">
                                {listing.description}
                            </div>
        
                        </div>
        
                    </div>
                )}
        
                
                {selected === "Candidats" && (
                    <div className="mt-4">
                        
                        
                        <Heading 
                            title="Ils ont postulé pour cette offre"
                            subtitle="Sélectionner le candidat qui vous convient le mieux. "
                        />
                    {applicants?.length >= 1 ? (
                        applicants?.map((applicant) => (
                            <div key={applicant.id}>
                                <ApplicantsClient 
                                    key={applicant.id}
                                    applicant={applicant} 
                                    services={filteredServices}
                                    currentUser={currentUser}
                                    listing={listing}
                                />
                            </div>
        
                            
                        ))
                    ) : (
                        <div className="flex flex-col gap-2">
                            <EmptyState 
                                title="Aucun candidat 🤷‍♂️"
                                subtitle="Il n'y a actuellement aucune candidature pour le moment"
                            />
                        </div>
                    )}
        
                            
        
                        </div>
                    )}
                
            </div>
            
        ) : (

            <div>

                <div className=" z-[5] bg-white sticky top-0 w-full">
                <div className="flex flex-col">
                    {params?.listingId && (
                        <div 
                            onClick={() => router.back()}
                            className="flex flex-row gap-1 items-center text-neutral-500 cursor-pointer hover:text-black p-2"
                        >
                            <IoChevronBackOutline size={18} />
                            <div>Retour</div>
                        </div>
                    )}
                    
        
            </div>
        
                </div>
                
                {selected === "Description" && (
                    <div>
                        <ListingHeader
                            data={listing}
                            currentUser={currentUser}
                        />
                        <div className="flex flex-col gap-4">
                            <Heading 
                                title="A propos de cette offre"
                            />
        
                            <div className="whitespace-pre-line">
                                {listing.description}
                            </div>
        
                        </div>
        
                    </div>
                )}
        
                
                
            </div>
        )}
       


    </div>
  )
}

export default ListingInfo