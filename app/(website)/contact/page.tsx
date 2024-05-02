import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";

import { IoMail } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";

const ContactPage = () => {
  return (
    <div className="bg-neutral-100 h-screen">
        <Container>
            <section className="pt-12">
                <div className="flex flex-col items-center justify-center gap-8">
                    <Heading 
                        title="Contactez-nous"
                        subtitle="Nous répondons dans les 24h ouvrables 😎"
                        center
                    />
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex flex-col gap-2 items-center justify-center p-12 border-2 border-b-8 border-secondaryLight rounded-lg">
                            <div className="w-[80px] h-[80px] bg-secondaryLight flex items-center justify-center rounded-full">
                                <IoMail size={32} />
                            </div>
                            <p>contact@dixino.be</p>
                        </div>

                        <div className="flex flex-col gap-2 items-center justify-center p-12 border-2 border-b-8 border-primary rounded-lg">
                            <div className="w-[80px] h-[80px] bg-primary flex items-center justify-center rounded-full">
                                <IoLogoWhatsapp size={32} />
                            </div>
                            <p>{"(+32)0460 21 41 28"}</p>
                        </div>
                    </div>
                    

                </div>
            </section>

        </Container>
    </div>
  )
}

export default ContactPage