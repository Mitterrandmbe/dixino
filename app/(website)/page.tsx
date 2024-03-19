import Container from "../components/Container";

import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Usp from "../components/landing/Usp";
import Services from "../components/landing/Services";
import Faq from "../components/landing/Faq";
import Footer from "../components/footer/Footer";



export default function Home() {
  return (
    <Container>
      <div className="flex flex-col items-center -z-99">
        <Hero />
        <Usp />
        <HowItWorks />
        <Services />
        <Faq />
        <Footer />

      </div>
    </Container>
  )
}
