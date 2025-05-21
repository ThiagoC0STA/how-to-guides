import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

// GET /api/guides/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("📚 Fetching guide:", params.id);
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
    const { data: guide, error } = await supabase
      .from("guides")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("❌ Error fetching guide:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!guide) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    console.log("✅ Guide fetched successfully");
    return NextResponse.json({ guide });
  } catch (error) {
    console.error("❌ Error fetching guide:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/guides/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("🗑️ Deleting guide:", params.id);
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
    // First check if guide exists
    const { data: guide, error: fetchError } = await supabase
      .from("guides")
      .select("id")
      .eq("id", params.id)
      .single();

    if (fetchError) {
      console.error("❌ Error checking guide:", fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 400 });
    }

    if (!guide) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    // Delete the guide
    const { error: deleteError } = await supabase
      .from("guides")
      .delete()
      .eq("id", params.id);

    if (deleteError) {
      console.error("❌ Error deleting guide:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 400 });
    }

    console.log("✅ Guide deleted successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting guide:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
