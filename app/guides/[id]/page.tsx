import { notFound } from "next/navigation";
import { GUIDES } from "@/data/guides";
import GuideLayout from "@/components/GuideLayout";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

const defaultMetadata: Metadata = {
  title: "AI Guide Platform",
  description: "Discover the best guides and tutorials about artificial intelligence, ChatGPT, and AI tools.",
  keywords: [
    "AI guide",
    "artificial intelligence tutorial",
    "ChatGPT guide",
    "AI tools",
    "machine learning",
    "OpenAI",
    "AI course"
  ],
  openGraph: {
    title: "AI Guide Platform",
    description: "Discover the best guides and tutorials about artificial intelligence, ChatGPT, and AI tools.",
    url: "https://how-to-guides-gamma.vercel.app",
    type: "website",
    images: [
      {
        url: "/images/logos/chatgpt-logo.png",
        width: 1200,
        height: 630,
        alt: "AI Guide Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Guide Platform",
    description: "Discover the best guides and tutorials about artificial intelligence, ChatGPT, and AI tools.",
    images: ["/images/logos/chatgpt-logo.png"]
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = GUIDES.find((g) => g.id === params.id);

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }

  if (guide.metadata) {
    return guide.metadata;
  }

  return defaultMetadata;
}

export default function GuidePage({ params }: Props) {
  const guide = GUIDES.find((g) => g.id === params.id);

  if (!guide) return notFound();

  return <GuideLayout guide={guide} />;
}
