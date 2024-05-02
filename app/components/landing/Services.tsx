import Image from 'next/image';
import React from 'react';

import { categories } from '@/app/libs/data';
import Link from 'next/link';

const Services = () => {
  return (
    <div className='flex flex-col py-20 items-center bg-primaryLight w-screen'>
        <div className='flex flex-col items-center gap-2'>
            <h2 className='text-lg font-light text-neutral-700'>Sélectionner une catégorie</h2>
            <h3 className='text-4xl font-semibold text-black'>Services</h3>
        </div>

        <div
            className='
                mt-8
                grid
                grid-cols-1
                lg:grid-cols-3
                gap-12
                lg:gap-20
                text-center
                max-w-xs
                lg:max-w-4xl
            '
        >
            { categories && (
                categories.map((category, key) => (
                    <Link
                        href={`/${category.label}`}
                        rel='noopener noreferrer'
                    >
                        <div 
                            className='
                                bg-primary
                                col-span-1
                                p-4
                                rounded-lg
                                cursor-pointer
                                hover:bg-primaryDark
                            '
                            key={category.label}
                        >

                            <div className='flex flex-col items-center gap-6 w-full'>
                                <div
                                    className='
                                        aspect-square
                                        relative
                                        overflow-hidden
                                    '
                                >
                                    <category.icon size={32} color="white" />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <h3 className='font-semibold text-white text-xl'>{category.label}</h3>
                                    <p className='text-white text-sm'>{category.description}</p>

                                </div>
                            </div>

                        </div>
                    </Link>

                ))
            ) }

        </div>
    </div>
  )
}

export default Services