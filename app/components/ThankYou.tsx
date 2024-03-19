'use client';

import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { singleLevelNestedRoutes } from "../libs/routes";

const ThankYou = () => {
    const router = useRouter();
  
    return (
    <div className='flex flex-col gap-4 lg:items-center'>
        <div
            className="hidden lg:block aspect-square"
        >
            <Image 
                src="/images/thank-you.png"
                alt="Réservation confirmée"
                width={400}
                height={400}
            />
        </div>
        <div className="text-xl lg:text-4xl font-semibold">Réservation confirmée</div>
        <div className="text-md text-center">Merci de nous avoir fait confiance</div>
        <Button 
            label="Aller vers les offres"
            onClick={() => router.push(singleLevelNestedRoutes.dashboard.listings)}
            actionLevel="outline"
        />
    </div>
  )
}

export default ThankYou