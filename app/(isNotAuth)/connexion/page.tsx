'use client';

import Image from "next/image";
import Logo from "@/app/components/navbar/Logo";
import styles from "@/app/styles/styles.module.css";


import { signIn } from "next-auth/react";
import axios from "axios";

import Link from "next/link";

import { useCallback, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";

import Input from "@/app/components/inputs/Input";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";


import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import ToasterProvider from "@/app/providers/ToasterProvider";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { routes } from "@/app/libs/routes";
import useForgotPasswordModal from "@/app/hooks/useForgotPasswordModal";
import ForgotPasswordModal from "@/app/components/modals/ForgotPasswordModal";

const Login = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const forgotPassword = useForgotPasswordModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Connexion réussie!");
        router.push('/');
        
      }

      if(callback?.error) {
        toast.error(callback.error);
      }
    })
  };

  const onForgotPassword = useCallback(() => {
    forgotPassword.onOpen();

  }, [forgotPassword])

  
  return (
    <div 
      className="
        h-screen
        flex
        flex-row
        items-center
        justify-center
        bg-white
        md:bg-softGrey
      "
    >
      <ToasterProvider />
      <ForgotPasswordModal />
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          bg-white
          border-0
          md:border-4
          md:border-primary
          rounded-xl
          p-8
        "
      >
        <div className="mb-16">
          <Logo />
        </div>
        <div className='flex flex-col gap-4'>
          <Heading 
            title='Bienvenue sur Dixino'
            subtitle='Se connecter à votre compte'
          />

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

          <Button
            actionLevel="primary"
            label="Continuer"
            onClick={handleSubmit(onSubmit)}
          />
          
          <div className="flex flex-col mt-4">
            <div 
              onClick={onForgotPassword}
              className="font-medium text-green cursor-pointer hover:text-primary"
            >
                Mot de passe oublié ?
            </div>
            <div className="font-light text-black mt-2 hover:text-rose">
              <Link href={routes.signup}>
                Pas encore membre? Créer un compte.
              </Link>
            </div>

          </div>
        </div>
        

      </div>
      

    </div>
  )
}

export default Login