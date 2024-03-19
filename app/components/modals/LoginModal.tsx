'use client';

import axios from "axios";

import { signIn } from 'next-auth/react';

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
import { useRouter } from "next/navigation";

import useForgotPasswordModal from "@/app/hooks/useForgotPasswordModal";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const forgotPasswordModal = useForgotPasswordModal();

  const [isLoading, setIsloading] = useState(false);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsloading(false);

      if (callback?.ok) {
        toast.success("Connexion réussie!");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    })
  };

  const showForgotPassword = useCallback(() => {
    loginModal.onClose();
    forgotPasswordModal.onOpen();
  }, [loginModal, forgotPasswordModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Ravi de vous revoir sur Dixino!"
        subtitle="Se connecter à votre compte."
      />
      <div className="flex flex-col md:flex-row gap-4">
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

      <div
        onClick={showForgotPassword}
        className="font-light text-right text-neutral-700 hover:underline hover:text-rose cursor-pointer"
      >
        <p>Mot de passe oublié?</p>
      </div>
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="flex flex-row justify-center items-center gap-2 text-neutral-500">
        <div>
          Pas encore membre?
        </div>
        <div 
          onClick={onToggle}
          className="text-neutral-800 cursor-pointer hover:text-primary hover:underline transition"
        >
          Créer un compte
        </div>
        
      </div>

    </div>
  )
  
  return (
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Se connecter"
      actionLabel="Continuer"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal