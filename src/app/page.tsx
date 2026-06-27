import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBadges } from "@/components/TrustBadges";
import { ExperienceShare } from "@/components/ExperienceShare";
import { About } from "@/components/About";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Membership } from "@/components/Membership";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <ExperienceShare />
        <About />
        <ProductShowcase />
        <Membership />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
