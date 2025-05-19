import { Metadata } from 'next';
import { Container } from '@mui/material';
import HeroSection from '@/components/prompt-engineering/HeroSection';
import IntroSection from '@/components/prompt-engineering/IntroSection';
import CategoriesSection from '@/components/prompt-engineering/CategoriesSection';
import ResourcesSection from '@/components/prompt-engineering/ResourcesSection';

export const metadata: Metadata = {
  title: 'Prompt Engineering Guides - How-ToGuides.com',
  description: 'Master the art of prompt engineering with our comprehensive guides for ChatGPT, Midjourney, DALL-E, and other AI tools.',
  keywords: 'prompt engineering, AI prompts, effective prompts, prompt techniques, prompt optimization',
};

export default function PromptEngineeringPage() {
  return (
    <Container>
      <HeroSection />
      <IntroSection />
      <CategoriesSection />
      <ResourcesSection />
    </Container>
  );
} 