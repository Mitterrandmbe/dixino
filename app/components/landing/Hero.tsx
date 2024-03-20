'use client';

import Image from "next/image";
import Container from "../Container"
import { useTypewriter, Cursor } from "react-simple-typewriter"
import Search from "../navbar/Search";


const Hero = () => {
  
  const [typeEffect] = useTypewriter({
    words: ['plombier', 'infirmier', 'aide-ménager'],
    loop: false,
    typeSpeed: 120,
    deleteSpeed: 40
  })
  
  return (
    <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            pt-8
          "
        >
          {/* RIGHT */}
            <div
              className="
                flex
                flex-col
                justify-between
                mx-auto
                lg:mx-0
                pb-10
                lg:pb-0
                gap-12
              "
            >
              <h1
                className="text-center lg:text-left text-5xl lg:text-6xl font-semibold leading-tight"
              >
                Besoin d{"'"}un <br /><span className="text-primary">{typeEffect}</span> ?
              </h1>

              <div>
                <h2 className="text-center lg:text-left text-3xl font-light text-neutral-700">Déjà <span className="font-semibold">+180</span> ménages sauvés.</h2>
                <h2 className="text-center lg:text-left text-xl font-light text-neutral-700">+8000 heures épargnées.</h2>
              </div>

              <div>
                <div className="text-center lg:text-left text-sm pb-2 text-neutral-500">
                  Trouvez un professionnel pour vos tâches ménagères
                </div>
                <Search />
              </div>

            </div>

            {/* RIGHT */}
            <div 
              className="
                bg-cover
                bg-center
                relative 
                overflow-hidden
                mx-auto
              "
            >
              <Image 
                alt="Travailleurs indépendants"
                src="/images/Dixino-hero-illustration.png"
                width={600}
                height={600}
                
              />
            </div>
        </div>
  )
}

export default Hero