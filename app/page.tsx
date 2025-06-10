import GuidesSection from "@/components/GuidesSection";
import HeroSection from "../components/HeroSection";
import NewsletterSection from "../components/NewsletterSection";
import { Suspense } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Page() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<LoadingOverlay />}>
        <GuidesSection isPopular />
      </Suspense>
      <NewsletterSection />
    </>
  );
}
