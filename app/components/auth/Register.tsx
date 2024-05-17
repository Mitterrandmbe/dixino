'use client';

import axios from "axios";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

import { AiFillFacebook, AiFillGoogleSquare, AiFillLinkedin } from 'react-icons/ai';
import { accountType } from "@/app/libs/data";


const Register = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const userType = accountType.find((type) => type.enum)
    const [selectedAccountType, setSelectedAccountType] = useState(userType?.label || "");

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            type: ""
        }
    });

    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
  };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/register", data)
            .then(() => {
                registerModal.onClose();
                router.push("/")
            })
            .catch((error) => {
                toast.error("Oups! Une erreur s'est produite.")
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
    <>
        <div className="relative p-6 flex-auto">

        
      {/* BODY */}
            <div className='flex flex-col gap-4'>
                <Heading 
                  title='Trouvez un professionnel en 1 clic'
                  subtitle='Créer un compte.'
                />

                <div className='flex flex-wrap gap-4 sm:flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap'>
                  <Input 
                    id="firstName"
                    label="Prénom"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                  <Input 
                    id="lastName"
                    label="Nom"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />

                </div>
                <Input 
                  id="email"
                  label="Email"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <Input 
                  id="password"
                  label="Mot de passe"
                  type='password'
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />

                {/* Type of account */}
                <div className="flex flex-col gap-2">
                        <div className="text-sm text-neutral-500">Profil du compte</div>
                        <Select
                            value={selectedAccountType}
                            onValueChange={(value) => {
                                setSelectedAccountType(value);
                                const selectedType = accountType.find(type => type.label === value);

                                if (selectedType) {
                                    setCustomValue("type", selectedType.enum)
                                }
                            }}
                        >
                            <SelectTrigger className="w-full bg-white py-8 border-2 border-neutral-300">
                                <SelectValue 
                                    placeholder={userType 
                                        ? userType.label
                                        : "Sectionner profile du compte"
                                    } 
                                />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectGroup>
                                    <SelectLabel>Profil du compte</SelectLabel>
                                    {accountType.map((type) => (
                                        <SelectItem 
                                            key={type.label} 
                                            value={type.label}
                                            className="cursor-pointer hover:bg-neutral-100 text-md"
                                            
                                        >
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                    </div>

                <p>En vous inscrivant, vous acceptez nos <Link href={"/"} className='linksStandard'>
                    termes et conditions
                      </Link>
                .</p>

                <div className="mb-3">
                  <Button 
                    label="Continuer"
                    onClick={handleSubmit(onSubmit)}
                    actionLevel="primary"
                  />
                </div>

            </div>

            {/* FOOTER  */}

            <div className='flex-col gap-4 mt-3 hidden'>
                <hr />
                <Button 
                  actionLevel="outline"
                  label='Continuer avec Google'
                  icon={AiFillGoogleSquare}
                  onClick={() => {}}
                />
                <Button 
                  actionLevel="outline"
                  label='Continuer avec LinkedIn'
                  icon={AiFillLinkedin}
                  onClick={() => {}}
                />
                <div 
                className='
                  text-neutral-500
                  text-center
                  mt-4
                  font-light
                '

                >
                  <div className='justify-center flex flex-col items-center gap-2'>
                    <div>
                      Déjà un compte ?
                    </div>
                    <div 
                      onClick={registerModal.onClose}
                      className='links'
                    >
                      Se connecter
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register