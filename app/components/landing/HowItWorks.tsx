import Image from 'next/image'
import React from 'react'

const HowItWorks = () => {
  return (
    <div className='flex flex-col py-20 items-center'>
        <div className='flex flex-col items-center gap-2'>
            <h2 className='text-lg font-light text-neutral-700'>Comment ça marche ?</h2>
            <h3 className='text-4xl font-semibold'>Un nettoyage sans tracas</h3>
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
                <div className='flex flex-col w-full'>
                    <div
                        className='
                            aspect-square
                            w-full
                            relative
                            overflow-hidden
                        '
                    >
                        <Image 
                            fill
                            className='
                                object-cover
                                h-full
                                w-full
                            '
                            src="/images/Femme-joyeuse.png"
                            alt='Nettoyage sans tracas'
                        />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='font-semibold'>Postez une offre</h3>
                        <p className='text-neutral-700 text-sm'>
                            Dites-nous le service dont vous avez besoin. Où et quand vous aimeriez que nos professionnels interviennent.
                        </p>

                    </div>
                </div>

            </div>
            <div 
                className='
                    col-span-1
                '
            >
                <div className='flex flex-col w-full'>
                    <div
                        className='
                            aspect-square
                            w-full
                            relative
                            overflow-hidden
                        '
                    >
                        <Image 
                            fill
                            className='
                                object-cover
                                h-full
                                w-full
                            '
                            src="/images/Men-calendrier.png"
                            alt='Homme débarrassée des tâches ménagères'
                        />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='font-semibold'>Choisissez la meilleure offre</h3>
                        <p className='text-neutral-700 text-sm'>
                            Nous nous chargeons de vous trouver les meilleurs prestataires parmi nos professionnels. Sélectionnez l'offre qui vous convient le mieux.
                        </p>

                    </div>
                </div>

            </div>
            <div 
                className='
                    col-span-1
                '
            >
                <div className='flex flex-col w-full'>
                    <div
                        className='
                            aspect-square
                            w-full
                            relative
                            overflow-hidden
                        '
                    >
                        <Image 
                            fill
                            className='
                                object-cover
                                h-full
                                w-full
                            '
                            src="/images/Femme-fusee.png"
                            alt="Femme qui profite de son temps"
                        />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='font-semibold'>Profitez de votre temps</h3>
                        <p className='text-neutral-700 text-sm'>
                            Relaxez-vous et profitez de votre temps libre. Nos professionnels s'occupent de tout selon votre votre demande. 
                        </p>

                    </div>
                </div>

            </div>
            

        </div>
    </div>
  )
}

export default HowItWorks