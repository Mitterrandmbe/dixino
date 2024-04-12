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

interface ListingInfoPublicProps {
    listing: SafeListing;
    key?: string;
    services?: SafeService[]
}



const ListingInfoPublic: React.FC<ListingInfoPublicProps> = ({
    listing,
    key,
    services
}) => {
    
    const params = useParams();
    const router = useRouter();

    if (!listing) {
        return (
            <div>
                <EmptyState 
                    title="Oups!"
                    subtitle="Listing introuvable"
                />
            </div>
        )
    }

    const getTab = useMemo(() => {

        return listingTabs.map((item) => item.label)
        
      }, [listingTabs, listing])
    
      const [selected, isSelected] = useState("Description");
    
      const handleSelect = (value: string) => {
        isSelected(value)
      };

    //   const filteredServices = useMemo(() => {
    //     return services?.map((service) => service )
    //   }, [services]);


    return (
    <div className="flex flex-col gap-4 relative max-w-full mx-auto">
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
                
                    <div>
                        <ListingHeader
                            data={listing}
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
                
        
                
                
            </div>

    </div>
  )
}

export default ListingInfoPublic