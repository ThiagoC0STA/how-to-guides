import { notFound } from "next/navigation";
import GuideLayout from "@/components/GuideLayout";
import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

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
  console.log("🔍 Buscando guia com ID:", id);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  console.log("📡 URL do Supabase:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  try {
    // Primeiro, buscar o guia
    const { data: guide, error: guideError } = await supabase
      .from("guides")
      .select("*")
      .eq("id", id)
      .single();

    if (guideError) {
      console.error("❌ Erro ao buscar guia:", guideError);
      return null;
    }

    if (!guide) {
      console.log("⚠️ Guia não encontrado");
      return null;
    }

    // Depois, buscar as categorias separadamente
    const { data: categories, error: categoriesError } = await supabase
      .from("guide_categories")
      .select(
        `
        categories (
          id,
          title,
          color
        )
      `
      )
      .eq("guide_id", id);

    if (categoriesError) {
      console.error("❌ Erro ao buscar categorias:", categoriesError);
    }

    const guideWithCategories = {
      ...guide,
      categories: categories?.map((c) => c.categories) || [],
    };

    return guideWithCategories;
  } catch (error) {
    console.error("❌ Erro inesperado:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const guide = await getGuideById(params.id);

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
  console.log("📄 Renderizando página do guia:", params.id);

  const guide = await getGuideById(params.id);

  if (!guide) {
    console.log("⚠️ Guia não encontrado, redirecionando para 404");
    return notFound();
  }

  console.log("✅ Renderizando guia:", {
    id: guide.id,
    title: guide.title,
  });

  return <GuideLayout guide={guide} />;
}
