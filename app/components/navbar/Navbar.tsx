'use client';

import Container from "../Container";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import { SafeUser, SafeListing } from "@/app/types";

import useWordCounter from "@/app/hooks/useWordCounter";
import Link from "next/link";

interface NavbarProps {
    currentUser?: SafeUser | null;
    listing?: SafeListing;
    allListings?: SafeListing
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser,
    listing,
    allListings
}) => {
   
    return (
    <div className="fixed w-full bg-white shadow-sm z-40">
        <div 
            className="
                py-4
                border-b-[1px]
            "
        >
            <Container>
                <div
                    className="
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                    "
                >
                    <Logo />
                    <NavLinks currentUser={currentUser} listing={listing} allListings={allListings} />
                    <UserMenu currentUser={currentUser} listing={listing} allListings={allListings} />
                </div>
            </Container>

        </div>
        {currentUser && (
           <div>
               {!currentUser?.image && !currentUser?.bio && !currentUser?.addressNumber && !currentUser?.street && !currentUser?.city && !currentUser?.countryValue && !currentUser?.phoneNumber || !currentUser?.idCard && (
                   <div className="bg-warning text-white text-center">
                       Veuillez compléter votre{" "}<Link href={"/account"} className="underline cursor-pointer">profil</Link>
                   </div>
               )}

           </div> 
        )}
    </div>
  )
}

export default Navbar