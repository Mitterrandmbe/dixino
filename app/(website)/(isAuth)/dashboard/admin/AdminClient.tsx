'use client';

import { Reservation } from "@prisma/client";


import { SafeApplicant, SafeListing, SafeService, SafeUser } from "@/app/types";
import ListingCard from "@/app/components/listings/ListingCard";
import { useSearchParams } from "next/navigation";
import ListingInfo from "@/app/components/listings/ListingInfo";

import useListingInfoModal from "@/app/hooks/useListingInfoModal";
import ApplicationModal from "@/app/components/modals/ApplicationModal";
import { useParams } from "next/navigation";
import HireModal from "@/app/components/modals/HireModal";
import ArchiveListingModal from "@/app/components/modals/ArchiveListingModal";





interface AdminClientProps {
    listing: SafeListing;
    reservation?: Reservation
    applicants?: SafeApplicant[]
    onAction?: (id: string) =>  void;
    disabled?: boolean; 
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    services?: SafeService[]
}

const AdminClient: React.FC<AdminClientProps> = ({
    listing,
    reservation,
    applicants,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
    services
}) => {
    
    const searchParams = useSearchParams();
    const listingId = searchParams?.get("listingId");
    const params = useParams();
    const applicantsListing = listing.applicantIds;
    
    if (!currentUser) {
        return null;
    }

    
    return (
    <>
        <ApplicationModal listing={listing} />
        <ArchiveListingModal 
            listing={listing}
            currentUser={currentUser}
            key={listing.id}
        />
    <div
        className="
        pt-8
        grid
        grid-flow-col
        lg:grid-cols-7
        gap-4
        "
    >
        <div
            className="
                col-span-3
                flex
                flex-col
                gap-4
                w-full
                overflow-y-vertical
            "
        >
            <ListingCard 
                currentUser={currentUser}
                key={params?.listingId && typeof params?.listingId === "string" ? params?.listingId : null}
                data={listing}
            />
            

        </div>
        {listing.id === listingId && (
      
            <div 
                className="
                    hidden
                    col-span-4
                    lg:block
                    whitespace-pre-line
                    w-full
                "
            >
                <div 
                    className="
                        absolute
                        bg-white
                        top-32
                        w-2/4
                        px-4
                        h-screen
                        lg:h-[80vh]
                        overflow-y-auto
                    "
                >
                    <div className="text-neutral-700 text-lg">

                        <ListingInfo 
                            key={listing.id}
                            listing={listing}
                            currentUser={currentUser}
                            applicants={applicants}
                            services={services}
                            
                        />
                    </div>

                </div>
                        
            </div>


        )}
        
        

    </div>
    </>
  )
}

export default AdminClient