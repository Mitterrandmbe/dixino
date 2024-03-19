'use client';

import Register from "@/app/components/auth/Register";
import Logo from "@/app/components/navbar/Logo";
import ToasterProvider from "@/app/providers/ToasterProvider";
import Image from "next/image";
import styles from "@/app/styles/styles.module.css";

import { FaCheck } from "react-icons/fa6";

const Signup = () => {
  return (
    
    <div 
      className="
        grid
        grid-cols-4
        items-center
        
        h-screen
        bg-softGrey
      "
    >
      <ToasterProvider />
      
      <div className="col-span-4 lg:col-span-2">
        <div className="flex flex-col items-center">
          <div className="mt-8 mb-12">
            <Logo />
          </div>
          <Register />
        </div>
        
      </div>
      
      {/* <div 
            className={`
              
              ${styles.authImageWrapper}
              w-1/2
              hidden
              xl:block
            `}
          >
            <div className="fixed bottom-2/4">
              <h2 className="text-white text-3xl pl-4">
                <span className="text-rose">{'"'}</span>Trouvez un professionnel pour des travaux ou pour faire le ménage chez vous.<span className="text-rose">{'"'}</span>
              </h2>
            </div>
      </div> */}

      <div className="hidden bg-primaryLight h-full col-span-2 lg:flex flex-row items-center justify-center">
        <div
          className="
            flex
            flex-col 
            gap-16
            p-4
          "
        >
          <div className="flex flex-col gap-8">
            <h1 className="text-primaryDark text-2xl lg:text-4xl xl:text-5xl font-bold">Bienvenue sur Dixino</h1>
            <div className="flex flex-col gap-4 text-neutral-600">
              <div className="flex flex-row gap-4">
                <FaCheck size={18} />
                <p>Recevez des offres d{"’"}emploi de façon automatique.</p>
              </div>
              <div className="flex flex-row gap-4">
                <FaCheck size={18} />
                <p>Acceptez ou décliner une offre d{"’"}emploi.</p>
              </div>
              <div className="flex flex-row gap-4">
                <FaCheck size={18} />
                <p>Soyez payé pour vos prestations</p>
              </div>
            </div>
          </div>
          <div className="">
            <Image 
              src={'/images/workers.png'}
              alt="Professionnels"
              width={677}
              height={328}
            />

          </div>
          
        </div>

      </div>

        

      
      
    </div>
    
    
  )
}

export default Signup