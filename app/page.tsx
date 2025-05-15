import GuidesSection from "@/components/GuidesSection";
import HeroSection from "../components/HeroSection";
import NewsletterSection from "../components/NewsletterSection";

export default function Page() {
  return (
    <>
      <HeroSection />
      <GuidesSection isPopular />
      <NewsletterSection />
    </>
  );
}
