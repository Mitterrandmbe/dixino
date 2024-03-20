"use client";

import { SafeApplicant, SafeListing, SafeService, SafeUser } from "@/app/types"
import Button from "../Button";

import { FiPlus } from "react-icons/fi";
import { categories } from "@/app/libs/data";
import Avatar from "../Avatar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IconType } from "react-icons";
import { LuMapPin, LuEye } from "react-icons/lu";
import { MdCheckCircleOutline } from "react-icons/md";

import React from "react";
import EmptyState from "../states/EmptyState";
import ApplicationModal from "../modals/ApplicationModal";
import ApplicantInfoModal from "../modals/ApplicantInfoModal";
import useApplicantInfoModal from "@/app/hooks/useApplicantInfoModal";
import useHiredModal from "@/app/hooks/useHireModal";

import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { singleLevelNestedRoutes } from "@/app/libs/routes";

import queryString from "query-string";
import HireModal from "../modals/HireModal";


interface ApplicantsClientProps {
    applicant: SafeApplicant | null;
    services?: SafeService[];
    currentUser?: SafeUser | null;
    listing: SafeListing
}

const ApplicantsClient: React.FC<ApplicantsClientProps> = ({
    applicant,
    services,
    currentUser,
    listing
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Retenir");
  const [currentApplicantId, setCurrentApplicantId] = useState("");
  
  
  const applicantInfoModal = useApplicantInfoModal();
  const hireModal = useHiredModal();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const applicantId = searchParams?.get("applicantId");
  const selectedApplicantFName = searchParams?.get("fName");
  const selectedApplicantLName = searchParams?.get("lName");
  const selectedApplicantPrice = searchParams?.get("price");

  const [fName, setFName] = useState(searchParams?.get("fName"));
  
  const listingId = searchParams?.get("listingId");
  const url = singleLevelNestedRoutes.dashboard.offers + `${listing.id}`;

  const isHiredNotEmpty = !listing.isHiredId

  const filteredServices = useMemo(() => {
    if (!services) {
      return null;
    }
    
    return services?.filter((service) => service.userId === applicantId )
    
  }, [services, applicantId]);  

  const [ModalbodyContent, setModalBodyContent] = useState<React.ReactElement>(
    <div className="">
      Choisir <span className="font-semibold">{fName} {selectedApplicantLName}</span> comme prestataire ?
      {filteredServices?.map((service) => service.price)}

      
    </div>);

    useEffect(() => {
      const firstName = searchParams?.get("fName");
      
    }, [searchParams])
  

   const toggleInfo = useCallback((applicant: SafeApplicant) => {
    

    if (!services) {
      return null;
    }

    const applicantPriceId = services
      .filter((service) => service.userId === applicant.id)
      .map((service) => service.stripePriceId );
    
      const applicantPrice = services
      .filter((service) => service.userId === applicant.id)
      .map((service) => service.price );

      if (pathName === `/dashboard/offers/${listing?.id}`) {
        return setShowInfo(prev => !prev)
      } else if (pathName === `/dashboard/admin/${listing?.id}` || pathName === `/dashboard/admin` ) {
        router.replace(singleLevelNestedRoutes.dashboard.admin + `?listingId=${listingId}&applicantId=${applicant?.id}&fName=${applicant.firstName}&lName=${applicant.lastName}&price=${applicantPrice}&priceId=${applicantPriceId}`);

      } else {
        router.replace(singleLevelNestedRoutes.dashboard.offers + `?listingId=${listingId}&applicantId=${applicant?.id}&fName=${applicant.firstName}&lName=${applicant.lastName}&price=${applicantPrice}&priceId=${applicantPriceId}`);

      }

      // router.replace(singleLevelNestedRoutes.dashboard.offers + `?listingId=${listingId}&applicantId=${applicant?.id}&fName=${applicant.firstName}&lName=${applicant.lastName}&price=${applicantPrice}&priceId=${applicantPriceId}`);

    setShowInfo(prev => !prev);

    
   }, [router, applicant, services, listingId, ModalbodyContent, listing.id, pathName])
      

  const onHire = useCallback((applicant: SafeApplicant, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!currentUser) {
      return null;
    };
    
    if(!services) {
      return null;
    };

    setFName(searchParams?.get("fName"))
    const applicantPriceId = services
      .filter((service) => service.userId === applicant.id)
      .map((service) => service.stripePriceId );
    
      const applicantPrice = services
      .filter((service) => service.userId === applicant.id)
      .map((service) => service.price );

      if (pathName === `/dashboard/offers/${listing.id}`) {
        router.replace(singleLevelNestedRoutes.dashboard.offers + `/${listing.id}?listingId=${listing.id}&applicantId=${applicant?.id}&fName=${applicant.firstName}&lName=${applicant.lastName}&price=${applicantPrice}&priceId=${applicantPriceId}`)


        setModalBodyContent(
          <div>
            {searchParams?.get("lName")}
          </div>
    
        );

        return hireModal.onOpen();
      } else if(pathName === `/dashboard/admin/${listing.id}` || pathName === `/dashboard/admin`) {
        router.replace(singleLevelNestedRoutes.dashboard.admin + `?listingId=${listingId}&applicantId=${applicant?.id}&fName=${applicant.firstName}&lName=${applicant.lastName}&price=${applicantPrice}&priceId=${applicantPriceId}`);

        setModalBodyContent(
          <div>
            {searchParams?.get("lName")}
          </div>
    
        )
      } else {
        router.replace(singleLevelNestedRoutes.dashboard.offers + `?listingId=${listingId}&applicantId=${applicant?.id}&fName=${applicant.firstName}&lName=${applicant.lastName}&price=${applicantPrice}&priceId=${applicantPriceId}`);

        setModalBodyContent(
          <div>
            {searchParams?.get("lName")}
          </div>
    
        )
      }

      // router.replace(singleLevelNestedRoutes.dashboard.offers + `?listingId=${listingId}&applicantId=${applicant?.id}&fName=${applicant.firstName}&lName=${applicant.lastName}&price=${applicantPrice}&priceId=${applicantPriceId}`);

  
    hireModal.onOpen();
    
  }, [currentUser, hireModal, applicant, router, listingId, ModalbodyContent, listing.id, pathName, searchParams, services]);

  
   

  if(!applicant) {
    return (
      <EmptyState 
        title="0 candidature"
        subtitle="Cette offre n'a actuellement reçu aucune candidature."
      />
    )
  };

 

  return (
    <>
    
    <div 
      className={`
        grid
        grid-cols
        gap-8
        border-2
        rounded-xl
        mt-8
        p-2
        lg:p-4
        hover:shadow-xl
        hover:cursor-pointer
        transition-all
        hover:bg-primaryLight
        ${applicant.id === listing.isHiredId ? "bg-secondary" : "bg-white"}
        ${applicant.id === listing.isHiredId ? "hover:bg-secondaryDark" : "bg-white"}
      `}
    >
      <div 
        onClick={() => toggleInfo(applicant)}
        className="flex flex-row justify-between"
      >
        {/* LEFT */}
        <div 
          className="flex flex-row gap-4"
        >
          <div className="w-14 h-14 lg:w-24 lg:h-24">
            {applicant?.image && (
                <Avatar imageSrc={applicant.image} />
             )}
          </div>
          <div
            className="flex flex-col justify-between font-semibold text-sm lg:text-lg"
          >
            <div className={`flex flex-row gap-2 ${applicant.id === listing.isHiredId ? "text-white" : "text-neutral-600"}`}>
              <div>{applicant.firstName}</div>
              <div>{applicant.lastName}</div>
            </div>
              {services && services
                .filter((service) => service.userId === applicant.id)
                .map((service) => (
                  <>
                  
                  <div className="flex flex-row gap-1 text-primary">
                    <div>{service.price}€</div>
                    <div className={`text-sm text-neutral-600 font-light ${applicant.id === listing.isHiredId ? "text-white" : "text-neutral-600"}`}>/{" "}heure</div>
                  </div>
                
                  {/* Show modal */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Add propagation  */}
                    <HireModal 
                      listing={listing}
                      services={service}
                      applicant={applicant}
                    />
                  </div>
                </>
                ))
              }
          </div>
        </div>
        
        {/* RIGHT */}
        <div className="flex flex-col justify-between">
          {/* <div className="flex flex-row gap-2">
            <LuEye size={18} className="text-neutral-500"/>
            <div className="text-sm">{"Bio"}</div>
          </div> */}
          
          <Button 
            label={applicant.id === listing.isHiredId ? "✔ Sélectionné(e)" : buttonLabel}
            onClick={(e) => onHire(applicant, e)}
            small
            disabled={ !isHiredNotEmpty ? true : isLoading}
            actionLevel="primary"
          />
        </div>
      </div>
      {showInfo && (
        <div 
          className={`
              text-lg
              whitespace-pre-wrap
              transition-all
              ${applicant.id === listing.isHiredId ? "text-white font-light" : "text-neutral-600"}
            `}
        >
          {applicant.bio}
        </div>
      )}
      
    </div>

  </>
  )
}

export default ApplicantsClient