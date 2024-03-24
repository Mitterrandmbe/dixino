"use client";

import { SafeApplicant, SafeEmployer, SafeListing, SafeReservation, SafeService, SafeUser } from "@/app/types";
import { adminTabs } from "@/app/libs/data";
import { ReactHTML, useCallback, useEffect, useMemo, useState } from "react";
import Avatar from "@/app/components/Avatar";
import { ProfileClient } from "@/app/components/ProfileClient";
import useProfileClientModal from "@/app/hooks/useProfileClientModal";
import ProfileClientModal from "@/app/components/modals/ProfileClientModal";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AdminDashboard from "@/app/components/dashboard/AdminDashboard";
import Heading from "@/app/components/Heading";


interface AdminManagerProps {
    currentUser: SafeUser | null;
    allUsers: SafeUser[] | null;
    allListings: SafeListing[];
    reservations: SafeReservation[];
    employers: SafeEmployer[];
    applicants: SafeApplicant[];
    services: SafeService[]
    
}

const AdminManager: React.FC<AdminManagerProps> = ({
    currentUser,
    allUsers,
    allListings,
    reservations,
    employers,
    applicants,
    services
}) => {

      
    const searchParams = useSearchParams();
    const tabIndex: any = searchParams?.get("tab");
    const tabIndexToNumber = parseInt(tabIndex, 10)
    const [selected, setIsSelected] = useState(tabIndexToNumber);
    const [isLoading, setIsLoading ] = useState(false);
    const pathName = usePathname();


    const router = useRouter();

    const onSelectTab = useCallback((tabIndex: number) => {
        setIsSelected(tabIndex);
        router.replace(pathName + "?tab=" + tabIndex)
    }, [router, pathName])
    

    const profileClientModal = useProfileClientModal();
    
    const handleSelect = (value: number) => {
        setIsSelected(value)
    };
    
    const onBlockUser = (userId: string) => {
        
        setIsLoading(true),

        axios.post("/api/block-profile", {
            userId: userId
        })
        .then(() => {
            toast.success("Profil bloqué")
            router.refresh()         
        })
        .catch(() => {
            toast.error("Oups, une erreur est survenue!")
            
        })
        .finally(() => {
            setIsLoading(false);
        })

    }

    
    return (
    <div className="flex flex-col gap-4 relative w-full">
        <div
            className="
                flex
                flex-row 
                gap-8
                border-b
            "
        >
            {adminTabs.map((item) => (
                <div
                key={item.index}
                onClick={() => onSelectTab(item.index)}
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
                  ${selected === item.index ? "border-black" : "border-transparent"}
                  ${selected === item.index ? "text-black" : "text-neutral-500"}
                  `}
                >
                    <item.icon />
                    {item.label}
                </div>


            ))}
        </div>

        {selected === 0 && (
            <div>
                <AdminDashboard 
                    currentUser={currentUser}
                    allListings={allListings}
                    reservations={reservations}
                    employers={employers}
                    applicants={applicants}
                    services={services}

                />
            </div>
        )}


        {selected === 1 && (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                    h-full
                "
            >
                {allUsers?.map((user, index) => (
                    <div
                        key={user.id}
                        
                    >
                        {user && (
                            <ProfileClient 
                                user={user}
                                key={user.id}
                                onClick={() => onBlockUser(user.id)}
                            />

                        )}
                        

                    </div>
                ))}
            </div>
        )}


        {selected === 2 && (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading 
                    title="A venir 🏃‍♂️"
                    subtitle="Encore un peu de patience..."
                />
            </div>
        )}
        
    </div>
  )
}

export default AdminManager