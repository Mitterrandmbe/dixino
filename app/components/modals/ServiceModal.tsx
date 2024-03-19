'use client';

import { useMemo, useState } from "react";
import useServiceModal from "@/app/hooks/useServiceModal";
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
    PRICING = 1,
}

const ServiceModal = () => {
    
    const router = useRouter();
    const serviceModal = useServiceModal();
    const [isLoading, setIsLoading] = useState(false);

    const [step, setStep] = useState(STEPS.CATEGORY);

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
            category: "",
            price: 0
        }
    });

    const category = watch("category");
    

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    };

    const onBack = () => {
        setStep((value) => value - 1)
    };

    const onNext = () => {
        setStep((value) => value + 1)
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICING) {
            return onNext();
        };

        setIsLoading(true);

        axios.post("/api/services-client", data)
        .then(() => {
            toast.success("🙌 Service créé avec succès");
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            serviceModal.onClose();
        })
        .catch(() => {
            toast.error("Oups 😞! Une erreur est survenue.");
        })
        .finally(() => {
            setIsLoading(false);
        })
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICING) {
            return "Valider"
        }

        return "Continuer"
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        return "Précédent";
    }, [step]);


    // BODY CONTENT

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Quel service voudriez-vous offrir?"
                subtitle="Sélectionnez un service"
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

    if (step === STEPS.PRICING) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Quel est votre tarif à l'heure?"
                    subtitle="Indiquez votre prix par heure"
                />
                <Input 
                    id="price"
                    label="Prix"
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    
                />
            </div>
        )
    }

    return (
    <Modal 
        isOpen={serviceModal.isOpen}
        onClose={serviceModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        disabled={isLoading}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        secondaryActionLabel={secondaryActionLabel}
        title="Créer une nouvelle prestation"
        body={bodyContent}
    />
  )
}

export default ServiceModal