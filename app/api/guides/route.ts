import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

// GET /api/guides
export async function GET(req: NextRequest) {
  console.log("📚 Fetching guides");
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
    const { data: guides, error } = await supabase
      .from("guides")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching guides:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("✅ Guides fetched successfully");
    return NextResponse.json({ guides });
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
  console.log("📝 Creating new guide");
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
    const guide = await req.json();

    // Validate required fields
    if (!guide.title || !guide.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Add timestamps
    const now = new Date().toISOString();
    const guideWithTimestamps = {
      ...guide,
      created_at: now,
      updated_at: now,
    };

    // Start a transaction
    const { data: newGuide, error: guideError } = await supabase
      .from("guides")
      .insert(guideWithTimestamps)
      .select()
      .single();

    if (guideError) {
      console.error("❌ Error creating guide:", guideError);
      return NextResponse.json({ error: guideError.message }, { status: 400 });
    }

    // Add categories if provided
    if (guide.metadata?.categories?.length > 0) {
      const categoryRelations = guide.metadata.categories.map(
        (categoryId: string) => ({
          guide_id: newGuide.id,
          category_id: categoryId,
        })
      );

      const { error: categoryError } = await supabase
        .from("guide_categories")
        .insert(categoryRelations);

      if (categoryError) {
        console.error("❌ Error adding categories:", categoryError);
        // Rollback guide creation
        await supabase.from("guides").delete().eq("id", newGuide.id);
        return NextResponse.json(
          { error: categoryError.message },
          { status: 400 }
        );
      }
    }

    console.log("✅ Guide created successfully");
    return NextResponse.json({ guide: newGuide });
  } catch (error) {
    console.error("❌ Error creating guide:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
