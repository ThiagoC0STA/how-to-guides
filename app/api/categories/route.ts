import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

// GET /api/categories
export async function GET(req: NextRequest) {
  const res = NextResponse.json({ success: true });

  // Get pagination and search parameters
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = page * limit;
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "title";
  const sortDirection = searchParams.get("sortDirection") || "asc";

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
      .from("categories")
      .select("*", { count: "exact", head: true });
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
      .from("categories")
      .select(
        `
        *,
        guide_categories (
          guide:guides (
            id,
            title,
            color
          )
        )
      `
      )
      .order(sortBy, { ascending: sortDirection === "asc" })
      .range(offset, offset + limit - 1);
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }
    const { data: categories, error } = await query;

    if (error) {
      console.error("❌ Error fetching categories:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      categories,
      totalCount: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/categories
export async function POST(req: NextRequest) {
  const res = NextResponse.json({ success: true });

  // Pegar o token do header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid authorization token" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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
    // Verificar autenticação
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const category = await req.json();

    // Validate required fields
    if (
      !category.title ||
      !category.description ||
      !category.icon_url ||
      !category.color
    ) {
      return NextResponse.json(
        { error: "Title, description, icon_url and color are required" },
        { status: 400 }
      );
    }

    // Add default values (NÃO inclui guides)
    const categoryWithDefaults = {
      ...category,
      featured: category.featured || false,
      comingSoon: category.comingSoon || false,
    };
    delete categoryWithDefaults.guides;

    const { data, error } = await supabase
      .from("categories")
      .insert(categoryWithDefaults)
      .select()
      .single();

    if (error) {
      console.error("❌ Error creating category:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Se vier guides, cria os relacionamentos na guide_categories
    if (category.guides && Array.isArray(category.guides) && data?.id) {
      // 1. Remove todas as relações antigas
      await supabase
        .from("guide_categories")
        .delete()
        .eq("category_id", data.id);

      // 2. Cria as novas relações
      const relations = category.guides.map((guideId: string) => ({
        guide_id: guideId,
        category_id: data.id,
      }));
      if (relations.length > 0) {
        await supabase.from("guide_categories").insert(relations);
      }
    }

    return NextResponse.json({ category: data });
  } catch (error) {
    console.error("❌ Error creating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
