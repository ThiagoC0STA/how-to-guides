import { notFound } from "next/navigation";
import GuideLayout from "@/components/GuideLayout";
import { Metadata } from "next";

const defaultMetadata: Metadata = {
  title: "AI Guide Platform",
  description:
    "Discover the best guides and tutorials about artificial intelligence, ChatGPT, and AI tools.",
  keywords: [
    "AI guide",
    "artificial intelligence tutorial",
    "ChatGPT guide",
    "AI tools",
    "machine learning",
    "OpenAI",
    "AI course",
  ],
  openGraph: {
    title: "AI Guide Platform",
    description:
      "Discover the best guides and tutorials about artificial intelligence, ChatGPT, and AI tools.",
    url: "https://how-to-guides-gamma.vercel.app",
    type: "website",
    images: [
      {
        url: "/images/logos/chatgpt-logo.png",
        width: 1200,
        height: 630,
        alt: "AI Guide Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Guide Platform",
    description:
      "Discover the best guides and tutorials about artificial intelligence, ChatGPT, and AI tools.",
    images: ["/images/logos/chatgpt-logo.png"],
  },
};

async function getGuideById(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/guides/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const { guide } = await res.json();
    console.log("🔍 Guide:", guide);
    return guide;
  } catch (error) {
    console.error("❌ Erro ao buscar guia via API:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = await Promise.resolve(params.id);
  const guide = await getGuideById(id);

  if (!guide) {
    console.log("⚠️ Guia não encontrado para metadata");
    return {
      title: "Guide Not Found",
    };
  }

  // Construct metadata from guide data
  const metadata: Metadata = {
    title: guide.title,
    description: guide.description,
    keywords: guide.metadata?.keywords || defaultMetadata.keywords,
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://how-to-guides-kappa.vercel.app/guides/${guide.id}`,
      type: "article",
      images: [
        {
          url: guide.image,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [guide.image],
    },
  };

  return metadata;
}

export default async function GuidePage({ params }: any) {
  const id = await Promise.resolve(params.id);
  const guide = await getGuideById(id);

  if (!guide) {
    return notFound();
  }

  return <GuideLayout guide={guide} />;
}
