'use client';

import { CldUploadWidget } from "next-cloudinary";

import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

import Image from "next/image";

declare global {
    var cloudinary: any;
};

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
  
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange])
  
    return (
    <CldUploadWidget 
        onUpload={handleUpload}
        uploadPreset="ljgpyedo"
        options={{
            maxFiles: 1
        }}
    >
        {({ open }) => {
            return (
                <div
                    onClick={() => open?.()}
                    className="
                        relative
                        border-dashed
                        border-2
                        flex
                        flex-col
                        justify-center
                        items-center
                        gap-4
                        w-full
                        h-full
                        text-neutral-600
                        cursor-pointer
                        hover:shadow-xl
                        rounded-md
                        transition
                        
                    "
                >
                    <TbPhotoPlus size={32} />
                    <div className="hidden lg:block font-semibold text-xs">
                        Ajoutez une photo
                    </div>
                    {value && (
                        <div
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image 
                                alt="Photo de profil"
                                fill
                                style={{ objectFit: 'cover' }}
                                src={value}
                            />
                        </div>
                    )}

                </div>
            )
        }}

    </CldUploadWidget>
  )
}

export default ImageUpload;