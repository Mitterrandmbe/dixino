'use client';
import { useMemo, useState } from "react";
import useOfferModal from "@/app/hooks/useOfferModal";
import { categories } from "@/app/libs/data";

import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Input from "../inputs/Input";
import MultilineInput from "../inputs/MultilineInput";
import CalendarInput from "../inputs/CalendarInput";
import Counter from "../inputs/Counter";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    DESCRIPTION = 3,
}



const OfferModal = () => {
  
    const router = useRouter()
    const offerModal = useOfferModal();
    const [isLoading, setIsLoading] = useState(false);

    const [step, setStep] = useState(STEPS.CATEGORY);

      // DATE TIME MANAGEMENT
      const [dateTime, setDateTime] = useState<Date>(new Date());

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
            category: '',
            serviceDate: Date,
            duration: 1,
            location: null,
            city: '',
            addressNumber: '',
            street: '',
            zipCode: '',
            additionalInfo: '',
            status: "PENDING",
            description: '',
        }
    });

    const category = watch('category');
    const location = watch('location');
    const serviceDate = watch('serviceDate');
    const duration = watch('duration');
    // const description = watch('description');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    };

    const onNext = () => {
        setStep((value) => value + 1)
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.DESCRIPTION) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success("Offre créee avec succès 🙌 !");
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            offerModal.onClose(); 
        })
        .catch(() => {
            toast.error("Oups 😞! Une erreur est survenue.")
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.DESCRIPTION) {
            return "Soumettre"
        }

        return "Continuer"
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        };

        return "Précédent"

    }, [step]);


  

    
    // BODY CONTENT
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Qu'est-ce qui correspond le mieux à votre offre ?"
                subtitle="Sélectionnez une catégorie"
            />

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                "
            >
                {categories.map((item) => (
                    <div
                        key={item.label}
                        className="col-span-1"
                    >
                        
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                            description={item.description}
                            color={item.color}
                        />
                    </div>
                ))}

            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Où est-ce que la prestation aura lieu ?"
                    subtitle="Aidez nos professionnels à trouver facilement le lieu de prestation"
                />

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
                    value={location}
                    onChange={(value) => setCustomValue("location", value)}
                    required
                />

                <MultilineInput 
                    id="additionalInfo"
                    label=""
                    disabled={isLoading}
                    errors={errors}
                    register={register}
                    placeholder="Informations supplémentaires..."
                />
            </div>
        )
    };

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8 w-full">
                <Heading 
                    title="Quelle est la date et l'heure de la prestation?"
                    subtitle="Sélectionnez une date et une heure pour la prestation"
                />
                <div className="">
                    <CalendarInput
                        value={dateTime}
                        onChange={(value) => {
                            const selectedDate = new Date(value);
                            setDateTime(selectedDate);
                            setCustomValue("serviceDate", selectedDate)
                        }}
                        onClick={(serviceDate) => setCustomValue("serviceDate", serviceDate)}
                    />
                </div>
                {category === "Nettoyage" && (
                    <hr />
                )}

                {category === "Nettoyage" && (
                    <div>
                        <Counter 
                            title="Durée de la prestation"
                            subtitle="Sélectionnez la durée de la prestation"
                            value={duration}
                            onChange={(value) => setCustomValue("duration", value)}
                        />

                    </div>
                )}
            </div>
         )
    };

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Qu'attendez-vous de cette prestation?"
                    subtitle="Donner plus d'informations sur votre offre pour aider nos professionels à mieux vous servir."
                />

                <MultilineInput 
                    id="description"
                    label="Description de l'offre"
                    disabled={isLoading}
                    errors={errors}
                    register={register}
                    placeholder="Informations supplémentaires..."
                />


            </div>
        )
    };
    
    return (
    <Modal
        isOpen={offerModal.isOpen}
        onClose={offerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        disabled={isLoading}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Créer une offre"
        body={bodyContent}

    />
  )
}

export default OfferModal