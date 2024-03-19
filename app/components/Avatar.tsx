'use client';
import Image from "next/image";

interface AvatarProps {
  imageSrc: string;
}

const Avatar: React.FC<AvatarProps> = ({
  imageSrc,
}) => {
  return (
    <div
      className="
        relative
        flex
        flex-col
        justify-center
        items-center
        gap-4
        w-full
        h-full
        text-neutral-600
        cursor-pointer
        rounded-md
        transition
      "
    >
      <Image 
          alt="Photo de profil"
          src={imageSrc}
          fill
          className="rounded-full"
          objectFit="cover"
      />

    </div>
  )
}

export default Avatar