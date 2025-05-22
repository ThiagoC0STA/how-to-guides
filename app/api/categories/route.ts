import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

// GET /api/categories
export async function GET(req: NextRequest) {
  console.log("📚 Fetching categories");
  const res = NextResponse.json({ success: true });

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
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .order("title", { ascending: true });

    if (error) {
      console.error("❌ Error fetching categories:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("✅ Categories fetched successfully");
    return NextResponse.json({ categories });
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
  console.log("📝 Creating new category");
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

    // Add default values
    const categoryWithDefaults = {
      ...category,
      guides: [],
      featured: category.featured || false,
      comingSoon: category.comingSoon || false,
    };

    const { data, error } = await supabase
      .from("categories")
      .insert(categoryWithDefaults)
      .select()
      .single();

    if (error) {
      console.error("❌ Error creating category:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("✅ Category created successfully");
    return NextResponse.json({ category: data });
  } catch (error) {
    console.error("❌ Error creating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("📝 Updating category");

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    const category = await req.json();
    const id = params.id;

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

    const { data, error } = await supabase
      .from("categories")
      .update(category)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("❌ Error updating category:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("✅ Category updated successfully");
    return NextResponse.json({ category: data });
  } catch (error) {
    console.error("❌ Error updating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
