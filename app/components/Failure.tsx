'use client';

import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { singleLevelNestedRoutes } from "../libs/routes";

const Failure = () => {
    const router = useRouter();
  
    return (
    <div className='flex flex-col gap-4 lg:items-center'>
        <div
            className="hidden lg:block aspect-square"
        >
            <Image
                src="/images/failure.png"
                alt="Echec du paiement"
                width={400}
                height={400}
            />
        </div>
        <div className="text-xl lg:text-4xl font-semibold">Echec lors du paiement</div>
        <div className="text-md text-center">Veillez réesayer</div>
        <Button 
            label="Aller vers les offres"
            onClick={() => router.push(singleLevelNestedRoutes.dashboard.listings)}
            actionLevel="outline"
        />
    </div>
  )
}

export default Failure