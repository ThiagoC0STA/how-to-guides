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
    url: "https://www.how-toguides.com",
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

async function getGuideBySlug(slug: string) {
  console.log("🔍 Buscando guia com slug:", slug);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    // Mapeamento específico de slugs para títulos
    const slugToTitleMap: { [key: string]: string } = {
      "how-to-use-dall-e": "How to use DALL-E",
      "how-to-write-better-dall-e-prompts":
        "How to Write Better DALL-E Prompts",
    };

    // Se temos um mapeamento específico, use-o
    let searchTitle = slugToTitleMap[slug];

    // Se não temos um mapeamento, use a conversão padrão
    if (!searchTitle) {
      searchTitle = slug.split("-").join(" ");
    }

    console.log("🔍 Título convertido para busca:", searchTitle);

    // Primeiro, buscar o guia pelo título (convertendo o slug de volta para título)
    const { data: guide, error: guideError } = await supabase
      .from("guides")
      .select("*")
      .ilike("title", searchTitle)
      .single();

    console.log("📊 Resultado da busca:", { guide, guideError });

    if (guideError) {
      console.error("❌ Erro ao buscar guia:", guideError);
      return null;
    }

    if (!guide) {
      console.log("⚠️ Nenhum guia encontrado para o título:", searchTitle);
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
      .eq("guide_id", guide.id);

    console.log("📊 Categorias encontradas:", { categories, categoriesError });

    if (categoriesError) {
      console.error("❌ Erro ao buscar categorias:", categoriesError);
    }

    const guideWithCategories = {
      ...guide,
      categories: categories?.map((c) => c.categories) || [],
    };

    console.log("✅ Guia final com categorias:", guideWithCategories);
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
  const guide = await getGuideBySlug(params.id);

  if (!guide) {
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
      url: `https://www.how-toguides.com/guide/${params.id}`,
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
  const guide = await getGuideBySlug(params.id);

  if (!guide) {
    return notFound();
  }

  return <GuideLayout guide={guide} />;
}
