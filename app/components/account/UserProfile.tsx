'use client';

import { useCallback, useState } from "react";
import { SafeService, SafeUser } from "@/app/types";

import { LuUserCircle } from "react-icons/lu";
import { RiLockFill } from "react-icons/ri";
import { PiPaintBrushBroadFill } from "react-icons/pi";
import { BiHome } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { MdLocalPhone } from "react-icons/md";
import { LiaIdCard } from "react-icons/lia";


import ImageUpload from "../inputs/ImageUpload";

import axios from "axios";
import toast from "react-hot-toast";

import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import Input from "../inputs/Input";
import CountrySelect from "../inputs/CountrySelect";
import MultilineInput from "../inputs/MultilineInput";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { accountTabs } from "@/app/libs/data";
import ServicesClient from "./ServicesClient";

import useServiceModal from "@/app/hooks/useServiceModal";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";

interface UserProfileProps {
    currentUser: SafeUser | null;
    services: SafeService[]
};

const UserProfile: React.FC<UserProfileProps> = ({
    currentUser,
    services
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [selected, setSelected] = useState("Profil");

    const serviceModal = useServiceModal();

    const onCreateService = useCallback(() => {
        serviceModal.onOpen();
    }, [serviceModal])

    const handleSelect = (value: string) => {
        setSelected(value)
    } ;

    // CURRENT USER DATA
    const { getByValue } = useCountries();
    
    const currentLocationValue = getByValue(currentUser?.countryValue || "")

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            image: currentUser?.image,
            bio: currentUser?.bio,
            phoneNumber: currentUser?.phoneNumber,
            countryValue: currentLocationValue,
            city: currentUser?.city,
            addressNumber: currentUser?.addressNumber,
            street: currentUser?.street,
            zipCode: currentUser?.zipCode,
            idCard: currentUser?.idCard,

        }
    });

    const image = watch('image');
    const countryValue = watch('countryValue');
    const idCard = watch('idCard');

    const idCardEmpty = !currentUser?.id

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/profile", data)
        .then(() => {
            toast.success("🙌 Profil mis à jour!");
            router.refresh();
            
        })
        .catch((error) => {
            toast.error("😞 Oups, une erreur est survenue");
        })
        .finally(() => {
            setIsLoading(false);
        })
    };


  
    return (
    <div className="flex flex-col gap-8">

        <div className="flex flex-row gap-8 border-b">
              {accountTabs.map((item) => (
                <div
                  onClick={() => handleSelect(item.label)}
                  className={`
                    flex
                    flex-row
                    gap-2
                    justify-center
                    items-center
                    text-sm
                    font-semibold
                    cursor-pointer
                    hover:text-black
                    h-fit
                    p-4
                    border-b
                    ${selected === item.label ? "border-black" : "border-transparent"}
                    ${selected === item.label ? "text-black" : "text-neutral-500"}
                    `}
                >
                  {item.label}

                </div>
              ))}
        </div>
{/* 

        <div className="flex flex-row gap-2 items-center text-secondary border-b pb-4">
            <div className="text-xl font-semibold">Profil</div>
        </div> */}
        {selected === "Profil" && (
            <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-4 text-xl text-black font-semibold">
                    <LuUserCircle size={24} />
                    <div>
                        Informations personnelles
                    </div>
                </div>
                <div className="flex flex-row gap-4 items-center rounded-md">
                    <div className="w-2/5 md:w-1/6">
                        <div className="aspect-square">
                                <ImageUpload 
                                    value={image}
                                    onChange={(value) => setCustomValue("image", value)}
                                />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-semibold">
                            Photo de profil
                        </div>
                        <div className="text-neutral-500 text-sm">
                            Min 200x200px .PNG ou .JPG
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="text-sm text-neutral-500">Nom</div>
                        <div className="flex flex-row justify-between font-semibold border border-neutral-200 p-4 ">
                            <div>
                                {currentUser?.lastName}
                            </div>
                            <RiLockFill size={24} className="text-neutral-500" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm text-neutral-500">Prénom</div>
                        <div className="flex flex-row justify-between font-semibold border border-neutral-200 p-4 ">
                            <div>
                                {currentUser?.firstName}
                            </div>
                            <RiLockFill size={24} className="text-neutral-500" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm text-neutral-500">Email</div>
                        <div className="flex flex-row justify-between font-semibold border border-neutral-200 p-4 ">
                            <div>
                                {currentUser?.email}
                            </div>
                            <RiLockFill size={24} className="text-neutral-500" />
                        </div>
                    </div>

                    <MultilineInput 
                            id="bio"
                            label=""
                            disabled={isLoading}
                            errors={errors}
                            register={register}
                            placeholder="Quelques mots à propos de moi..."
                        />

                    <div className="flex flex-row gap-4 text-xl text-black font-semibold border-b border-neutral-200 pb-4">
                        <MdLocalPhone size={24} />
                        <div>
                            Numéro de téléphone
                        </div>                       
                    </div>
                    <Input 
                        id="phoneNumber"
                        label="Téléphone"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                    />

                    <div className="flex flex-row gap-4 text-xl text-black font-semibold border-b border-neutral-200 pb-4">
                        <BiHome size={24} />
                        <div>
                            Adresse postale
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            <div className="col-span-1 lg:col-span-3">
                                <Input 
                                    id="city"
                                    label="Ville"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <Input 
                                    id="addressNumber"
                                    label="Numéro"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </div>

                        </div>
                        <Input 
                            id="street"
                            label="Rue"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input 
                            id="zipCode"
                            label="Code postal"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        /> 
                        <CountrySelect 
                            value={countryValue}
                            onChange={(value) => setCustomValue("countryValue", value)}
                            required
                        />

                        
                    

                </div>

            </div>


)}


        {selected === "Prestations" && (
            <div className="flex flex-col gap-8">
                <div className="flex flex-row justify-between gap-4 text-xl text-black font-semibold">
                    <div className="flex flex-row gap-4">
                        <PiPaintBrushBroadFill size={24} />
                        <div>
                            Mes prestations
                        </div>
                    </div>
                    <div className="w-1/4 text-sm font-light">
                        <Button 
                            label="prestation"
                            icon={FiPlus}
                            onClick={onCreateService}
                            actionLevel="secondary"
                            
                        />
                    </div>
                </div>
                <ServicesClient 
                    currentUser={currentUser}
                    services={services}
                />
            </div>
        )}

        {selected === "Identité" && (
            <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-4 text-xl text-black font-semibold">
                    <LiaIdCard size={24} />
                    <div>
                        Carte d'identité
                    </div>
                </div>
                
                <div className="flex flex-row gap-4 items-center rounded-md">
                    <div className="w-full h-2/3">
                        <div className="aspect-video">
                                <ImageUpload 
                                    value={idCard}
                                    onChange={(value) => setCustomValue("idCard", value)}
                                />
                        </div>
                    </div>
                </div>
                
                {/* <div
                    className="w-full h-2/3 aspect-video"
                >
                    <Image
                        src={currentUser?.idCard || ""}
                        width={800}
                        height={800}
                        alt="Carte d'identité"
                    />

                </div> */}
                
            </div>
        )}

        <Button 
            label="Enregistrer"
            onClick={handleSubmit(onSubmit)}
            actionLevel="primary"
            disabled={isLoading}
        />

    </div>
  )
}

export default UserProfile