'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  
    const router = useRouter();
    
    return (
    <Image 
        alt="Dixino logo"
        src={"/images/Dixino-logo.png"}
        height={100}
        width={100}
        onClick={() => router.push("/")}
        className="cursor-pointer"
    />
  )
}

export default Logo