import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// GET /api/guides
export async function GET(req: NextRequest) {
  console.log("📚 Fetching guides");
  const res = NextResponse.json({ success: true });

  // Get parameters from the URL
  const { searchParams } = new URL(req.url);
  const popular = searchParams.get("popular") === "true";
  const page = parseInt(searchParams.get("page") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "created_at";
  const sortDirection = searchParams.get("sortDirection") || "desc";
  const offset = page * limit;
  const category = searchParams.get("category");

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          res.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  try {
    // First get total count
    let countQuery = supabase
      .from("guides")
      .select("*", { count: "exact", head: true });

    if (popular) {
      countQuery = countQuery.eq("is_popular", true);
    }

    if (search) {
      countQuery = countQuery.or(
        `title.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error("❌ Error getting total count:", countError);
      return NextResponse.json({ error: countError.message }, { status: 400 });
    }

    // Then get paginated data
    let query = supabase
      .from("guides")
      .select(
        `
        *,
        guide_categories (
          category:categories (
            id,
            title,
            color
          )
        )
      `
      )
      .order(sortBy, { ascending: sortDirection === "asc" })
      .range(offset, offset + limit - 1);

    // If popular is true, only get popular guides
    if (popular) {
      query = query.eq("is_popular", true);
    }

    // Add search condition
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Add category filter
    if (category && category !== "all") {
      // Buscar guides que têm relação com a categoria informada
      // 1. Buscar os ids dos guides relacionados à categoria
      const { data: guideCategoryLinks, error: guideCatError } = await supabase
        .from("guide_categories")
        .select("guide_id")
        .eq("category_id", category);
      if (guideCatError) {
        console.error(
          "❌ Error fetching guide_categories for category filter:",
          guideCatError
        );
        return NextResponse.json(
          { error: guideCatError.message },
          { status: 400 }
        );
      }
      const guideIds = (guideCategoryLinks || []).map((g: any) => g.guide_id);
      if (guideIds.length > 0) {
        query = query.in("id", guideIds);
      } else {
        // Nenhum guide para essa categoria
        return NextResponse.json({ guides: [], totalCount: 0, page, limit });
      }
    }

    const { data: guides, error } = await query;

    if (error) {
      console.error("❌ Error fetching guides:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Adapta guide_categories para categories
    const guidesWithCategories = (guides || []).map((guide: any) => ({
      ...guide,
      categories: Array.isArray(guide.guide_categories)
        ? guide.guide_categories.map((gc: any) => gc.category).filter(Boolean)
        : [],
    }));

    console.log("✅ Guides fetched successfully");
    return NextResponse.json({
      guides: guidesWithCategories,
      totalCount: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error("❌ Error fetching guides:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/guides
export async function POST(req: NextRequest) {
  // Pega o token do header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid authorization token" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  try {
    const body = await req.json();
    // Validação básica
    if (!body.title || !body.description || !body.modules || !body.metadata) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("guides")
      .insert({
        title: body.title,
        description: body.description,
        image: body.image || null,
        color: body.color || null,
        modules: body.modules,
        is_popular: body.is_popular || false,
        metadata: body.metadata,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Criar relacionamentos na tabela de junção
    if (body.categories && Array.isArray(body.categories)) {
      const guideCategories = body.categories.map((cat: { id: string }) => ({
        guide_id: data.id,
        category_id: cat.id,
      }));

      const { error: junctionError } = await supabase
        .from("guide_categories")
        .insert(guideCategories);

      if (junctionError) {
        console.error(
          "❌ Error creating guide-category relationships:",
          junctionError
        );
        return NextResponse.json(
          { error: junctionError.message },
          { status: 400 }
        );
      }
    }

    // Buscar o guide criado com as categorias
    const { data: finalGuide, error: fetchError } = await supabase
      .from("guides")
      .select(
        `
        *,
        guide_categories (
          category:categories (
            id,
            title,
            color
          )
        )
      `
      )
      .eq("id", data.id)
      .single();

    if (fetchError) {
      console.error("❌ Error fetching created guide:", fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 400 });
    }

    // Adaptar o formato da resposta
    const guideWithCategories = {
      ...finalGuide,
      categories: Array.isArray(finalGuide.guide_categories)
        ? finalGuide.guide_categories
            .map((gc: any) => gc.category)
            .filter(Boolean)
        : [],
    };

    return NextResponse.json({ guide: guideWithCategories });
  } catch (error) {
    console.error("❌ Error creating guide:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
