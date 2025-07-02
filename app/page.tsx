import GuidesSection from "@/components/GuidesSection";
import HeroSection from "../components/HeroSection";
import NewsletterSection from "../components/NewsletterSection";
import BenefitsSection from "../components/BenefitsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import HowItWorksSection from "../components/HowItWorksSection";
import PartnersSection from "../components/PartnersSection";
import { Suspense } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Page() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<LoadingOverlay />}>
        <GuidesSection isPopular />
      </Suspense>
      <BenefitsSection />
      <HowItWorksSection />
      <PartnersSection />
      <TestimonialsSection />
      {/* <NewsletterSection /> */}
    </>
  );
}
