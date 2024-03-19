"use client";

import useHiredModal from "@/app/hooks/useHireModal"

import { SafeUser, SafeListing, SafeApplicant, SafeService } from "@/app/types";

import axios from "axios";
import toast from "react-hot-toast";
import ActionModal from "./ActionModal";
import { useCallback, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Checkout from "../checkout/Checkout";
import Counter from "../inputs/Counter";
import Image from "next/image";

import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

interface HiredModalProps {
    listing: SafeListing;
    currentUser?: SafeUser | null;
    services?: SafeService
    bodyContent?: React.ReactElement | undefined
    applicant: SafeApplicant;
}

const HireModal: React.FC<HiredModalProps> = ({
    listing,
    currentUser,
    services,
    bodyContent,
    applicant
}) => {
  
    const hireModal = useHiredModal();
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();

    const firstName = searchParams?.get("fName");
    const lastName = searchParams?.get("lName");
    const applicantId = searchParams?.get("applicantId");
    const listingId = searchParams?.get("listingId");
    const stripePriceId = searchParams?.get("priceId");
    const price: any = searchParams?.get("price");

    
    
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            duration: 1,
            totalPrice: price
        }
    });

    const duration = watch("duration");
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    };
    
    const applicationFees = Math.round((price * duration) * 0.05);
    const commission = Math.round((price * duration) * 0.13);
    const totalAmountToPay = (price * duration) + applicationFees + commission

    const bodycontent = (
        <div className="flex flex-col gap-8 font-normal cursor-auto">
            <div>
                {"Vous avez sélectionné "}<span className="font-semibold">{firstName} {lastName}</span>{` comme prestataire`}
            </div>

            <Counter 
                title="Durée de la prestation"
                subtitle="Sélectionner un nombre d'heures"
                value={duration}
                onChange={(value) => setCustomValue('duration', value)}
            />

            <div className="flex flex-row justify-between font-semibold">
                
                <div>Tarif à l'heure</div>
                <div>{price}€/h</div>
            </div>

            
            <div
                className="flex flex-row justify-between text-neutral-600"
            >
                <div>{"Frais de dossier (5%)"}</div>
                <div>{applicationFees}€</div>
            </div>
            <div
                className="flex flex-row justify-between text-neutral-600"
            >
                <div>{"Commission (13%)"}</div>
                <div>{commission}€</div>
            </div>

            <hr />

            <div
                className="
                    flex 
                    flex-row 
                    justify-between 
                    font-semibold
                    text-xl
                "
            >
                <div>Total</div>
                
                <div>{totalAmountToPay}€</div>
            </div>
            
        </div>
    );

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/checkout-sessions", {
            listingId: listingId,
            applicantId: applicantId,
            duration: duration,
            stripePriceId: stripePriceId,
            totalPrice: totalAmountToPay
        })
        .then((response) => {
            const redirectUrl = response.data.session.url
            router.push(redirectUrl)
            hireModal.onClose();
        })
        .catch((error) => {
            toast.error("Oups, une erreur est survenue");
        })
        .finally(() => {
            setIsLoading(false);
        })
    }
    
    // const onSubmit = useCallback(() => {
    //     setIsLoading(true);

    //     axios.post("/api/checkout-sessions", {
    //         listingId: listingId,
    //         applicantId: applicantId,
    //         duration: duration,
    //         stripePriceId: stripePriceId
    //     })
    //     .then((response) => {
    //         const redirectUrl = response.data.session.url
    //         router.push(redirectUrl)
    //         hireModal.onClose();
    //     })
    //     .catch((error) => {
    //         toast.error("Oups, une erreur est survenue");
    //     })
    //     .finally(() => {
    //         setIsLoading(false);
    //     })
    // }, [listingId, applicantId, hireModal])
  
    return (
    <ActionModal
        isOpen={hireModal.isOpen}
        onClose={hireModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={`Continuer avec ${firstName}`}
        disabled={isLoading}
        title="Choisir un candidat"
        body={bodycontent}
        
    />
  )
}

export default HireModal