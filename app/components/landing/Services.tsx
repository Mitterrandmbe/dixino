import Image from 'next/image'
import React from 'react'

const Services = () => {
  return (
    <div className='flex flex-col py-20 items-center bg-secondary w-screen'>
        <div className='flex flex-col items-center gap-2'>
            <h2 className='text-lg font-light text-neutral-300'>Sélectionner une catégorie</h2>
            <h3 className='text-4xl font-semibold text-white'>Services</h3>
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
            <div 
                className='
                    col-span-1
                '
            >
                <div className='flex flex-col items-center gap-6 w-full'>
                    <div
                        className='
                            aspect-square
                            relative
                            overflow-hidden
                        '
                    >
                        <Image 
                            height={80}
                            width={80}
                            src="/images/nettoyage.png"
                            alt='Seau et brosse'
                        />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='font-semibold text-white text-xl'>Nettoyage</h3>
                        <p className='text-neutral-300 text-sm'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae 
                        </p>

                    </div>
                </div>

            </div>
            <div 
                className='
                    col-span-1
                '
            >
                <div className='flex flex-col items-center gap-6 w-full'>
                    <div
                        className='
                            aspect-square
                            relative
                            overflow-hidden
                        '
                    >
                        <Image 
                            height={80}
                            width={80}
                            src="/images/plomberie.png"
                            alt='Pince de plombier'
                        />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='font-semibold text-white text-xl'>Réparations</h3>
                        <p className='text-neutral-300 text-sm'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae 
                        </p>

                    </div>
                </div>

            </div>
            <div 
                className='
                    col-span-1
                '
            >
                <div className='flex flex-col items-center gap-6 w-full'>
                    <div
                        className='
                        aspect-square
                        relative
                        overflow-hidden
                        '
                    >
                        <Image 
                            height={80}
                            width={80}
                            src="/images/soins.png"
                            alt="Mortier pharmaceutique"
                        />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='font-semibold text-white text-xl'>Soins</h3>
                        <p className='text-neutral-300 text-sm'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae 
                        </p>

                    </div>
                </div>

            </div>
            

        </div>
    </div>
  )
}

export default Services