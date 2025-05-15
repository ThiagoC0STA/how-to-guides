"use client";

import { Container } from "@mui/material";
import HeroSection from "@/components/about/HeroSection";
import MissionSection from "@/components/about/MissionSection";
import ValuesSection from "@/components/about/ValuesSection";
import ApproachSection from "@/components/about/ApproachSection";
import TeamSection from "@/components/about/TeamSection";
import ContactSection from "@/components/about/ContactSection";
import CTASection from "@/components/about/CTASection";

export default function About() {
  return (
    <Container sx={{ bgcolor: "var(--background)" }}>
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <ApproachSection />
      <TeamSection />
      <ContactSection />
      <CTASection />
    </Container>
  );
}
