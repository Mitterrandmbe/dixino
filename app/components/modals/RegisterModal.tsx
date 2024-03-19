'use client';

import axios from "axios";

import { useCallback, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Link from "next/link";
import { routes } from "@/app/libs/routes";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsloading] = useState(false);

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [])

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);

    axios.post("api/register", data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Oups! Une erreur s'est produite.")
      })
      .finally(() => {
        setIsloading(false);
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Bienvenue sur Dixino"
        subtitle="Vous n'êtes plus qu'à un clic de votre prochaine prestation ou de trouver une professionnel."
      />
      <div className="flex flex-col md:flex-row gap-4">
        <Input 
          id="lastName"
          label="Nom"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input 
          id="firstName"
          label="Prénom"
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
        type="password"
        label="Mot de passe"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

<p>En vous inscrivant, vous acceptez nos <Link href={routes.terms} className='linksStandard'>
          termes et conditions
            </Link>{", "}
            <Link href={routes.privacy} className='linksStandard'>
          notre politique de confidentialité
            </Link>
            <span> ainsi que les termes et conditions de notre partenaire de paiement <a href={"https://stripe.com/en-be/legal/connect-account/recipient"} target='_blank' rel='noopener noreferrer' className='underline hover:text-green'>Stripe</a></span> 
      .</p>
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="flex flex-row justify-center items-center gap-2 text-neutral-500">
        <div>
          Déjà membre?
        </div>
        <div 
          onClick={onToggle}
          className="text-neutral-800 cursor-pointer hover:text-primary hover:underline transition"
        >
          Se connecter
        </div>
        
      </div>

    </div>
  )
  
  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="S'inscrire"
      actionLabel="Continuer"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal