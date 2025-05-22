import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// GET /api/categories/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("📚 Fetching category by ID");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("❌ Error fetching category:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("✅ Category fetched successfully");
    return NextResponse.json({ category: data });
  } catch (error) {
    console.error("❌ Error fetching category:", error);
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

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
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

    const { data, error } = await supabase
      .from("categories")
      .update(category)
      .eq("id", params.id)
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

// DELETE /api/categories/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("🗑️ Deleting category");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("❌ Error deleting category:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("✅ Category deleted successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
