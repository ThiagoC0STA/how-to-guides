import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
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

  // Get the authorization token
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
    // First, get the guide to get the image URL
    const { data: guide, error: fetchError } = await supabase
      .from("guides")
      .select("image")
      .eq("id", params.id)
      .single();

    if (fetchError) {
      console.error("❌ Error fetching guide:", fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 400 });
    }

    if (!guide) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    // Extract the file path from the image
    let imageUrl = guide.image;
    let filePath = "";
    console.log("[DELETE] image from DB:", imageUrl);
    if (imageUrl && imageUrl.startsWith("http")) {
      // Public URL: extract after /object/public/guides/
      filePath = imageUrl.split("/object/public/guides/").pop() || "";
      console.log("[DELETE] Extracted filePath from public URL:", filePath);
    } else if (imageUrl && imageUrl.startsWith("guides/")) {
      // Path with guides/ prefix: remove it
      filePath = imageUrl.replace(/^guides\//, "");
      console.log("[DELETE] filePath after removing 'guides/':", filePath);
    } else if (imageUrl) {
      // Already relative to bucket
      filePath = imageUrl;
      console.log("[DELETE] filePath used as is:", filePath);
    }

    console.log("filePath:", filePath);

    if (filePath) {
      console.log(
        "[DELETE] Attempting to delete from bucket 'guides':",
        filePath
      );
      // Delete the image from the bucket
      const { data: removeData, error: deleteImageError } =
        await supabase.storage.from("guides").remove([filePath]);
      console.log("[DELETE] remove() result:", removeData);
      if (deleteImageError) {
        console.error("❌ Error deleting image:", deleteImageError);
        // Continue with guide deletion even if image deletion fails
      } else {
        console.log("✅ Image deleted successfully from bucket");
      }
    } else {
      console.warn("[DELETE] filePath is empty, skipping image deletion.");
    }

    // Delete the guide from the database
    const { error: deleteError } = await supabase
      .from("guides")
      .delete()
      .eq("id", params.id);

    if (deleteError) {
      console.error("❌ Error deleting guide:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 400 });
    }

    console.log("✅ Guide and image deleted successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error in delete operation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
