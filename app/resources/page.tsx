"use client";

import { Container } from "@mui/material";
import HeroSection from "@/components/resources/HeroSection";
import IntroSection from "@/components/resources/IntroSection";
import CategoriesSection from "@/components/resources/CategoriesSection";
import RelatedSection from "@/components/resources/RelatedSection";

export default function ResourcesPage() {
  return (
    <Container sx={{ bgcolor: "var(--background)" }}>
      <HeroSection />
      <IntroSection />
      <CategoriesSection />
      <RelatedSection />
    </Container>
  );
}
