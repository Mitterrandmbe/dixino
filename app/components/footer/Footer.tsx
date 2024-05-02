
import Logo from '../navbar/Logo';

import { AiOutlineInstagram, AiFillFacebook } from "react-icons/ai";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaBloggerB } from "react-icons/fa";
import CalendarInput from '../inputs/CalendarInput';
import Link from 'next/link';
import { routes, singleLevelNestedRoutes } from '@/app/libs/routes';
import { categories } from '@/app/libs/data';


const Footer = () => {
    
  return (
    <div
        className='
            p-8
            grid
            grid-cols-1
            lg:grid-cols-5
            gap-8
        '
    >
        
        <div className='w-[50px] text-center lg:text-left mx-auto'>
            <Logo />
        </div>
        <div
            className='span-col-1 text-center lg:text-left'
        >
            <h3 className='text-md font-semibold pb-4'>Services</h3>
            {categories && (
                categories.map((category, key) => (
                    <p
                        key={category.label}
                        className='text-sm font-light text-neutral-700 cursor-pointer hover:text-primary pb-2'
                    >
                        <Link href={`/${category.label}`}>{category.label}</Link>
                        
                    </p>

                ))
            )}
            {/* <p className='text-sm font-light text-neutral-700 cursor-pointer hover:text-primary'>Réparation</p>
            <p className='text-sm font-light text-neutral-700 cursor-pointer hover:text-primary'>Nettoyage</p> */}
        </div>
        <div
            className='span-col-1 text-center lg:text-left'
        >
            <h3 className='text-md font-semibold pb-4'>Pour les professionnels</h3>
            <p className='text-sm font-light text-neutral-700 cursor-pointer hover:text-primary pb-2'>Devenir partenaire</p>
            <p className='text-sm font-light text-neutral-700 cursor-pointer hover:text-primary pb-2'>Etudiants</p>
            <p className='text-sm font-light text-neutral-700 cursor-pointer hover:text-primary pb-2'>Avantages</p>
            <p className='text-sm font-light text-neutral-700 cursor-pointer hover:text-primary pb-2'><Link href={routes.terms}>Conditions</Link></p>
            <p className='text-sm font-light text-neutral-700 cursor-pointer hover:text-primary pb-2'><Link href={routes.legal}>Mentions légales</Link></p>
            <p className='text-sm font-light text-neutral-700 cursor-pointer hover:text-primary pb-2'><Link href={routes.cookies}>Cookies</Link></p>
        </div>
        <div
            className='span-col-1 text-center lg:text-left'
        >
            <h3 className='text-md font-semibold pb-4'>Aide</h3>
            <p 
                
                className='text-sm font-light text-neutral-700 cursor-pointer hover:text-primary pb-2'
            >
                <Link href={routes.contact}>Contact</Link>
                
            </p>
            <p className='text-sm font-light text-neutral-700 cursor-pointer hover:text-primary pb-2'>FAQ</p>
            
        </div>
        <div
            className='span-col-1 text-center lg:text-left'
        >
            <h3 className='text-md font-semibold pb-4'>Suivez-nous</h3>
            <div className='flex flex-row gap-2'>
                <div className='bg-primary p-2 rounded-md text-white cursor-pointer hover:bg-primaryDark transition'>
                <AiOutlineInstagram size={20}/>
                </div>
                <div className='bg-primary p-2 rounded-md text-white cursor-pointer hover:bg-primaryDark transition'>
                <SlSocialLinkedin size={20}/>
                </div>
                <div className='bg-primary p-2 rounded-md text-white cursor-pointer hover:bg-primaryDark transition'>
                <AiFillFacebook size={20}/>
                </div>
                <div className='bg-primary p-2 rounded-md text-white cursor-pointer hover:bg-primaryDark transition'>
                <FaBloggerB size={20}/>
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default Footer