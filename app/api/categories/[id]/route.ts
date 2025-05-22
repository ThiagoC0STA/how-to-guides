import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// GET /api/categories/[id]
export async function GET(req: NextRequest, { params }: any) {
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
export async function PUT(request: Request, { params }: any) {
  // Pegar o token do header
  const authHeader = request.headers.get("Authorization");
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
    const body = await request.json();
    const { id } = await Promise.resolve(params);

    console.log("id:", id);

    console.log("📝 Updating category with ID:", id);
    console.log("[PUT] Request body:", body);

    const objToUpdate = {
      title: body.title,
      description: body.description,
      icon_url: body.icon_url,
      color: body.color,
      featured: body.featured,
      comingSoon: body.comingSoon,
      guides: body.guides,
      updated_at: new Date().toISOString(),
    };

    console.log("objToUpdate:", objToUpdate);

    const { error } = await supabase
      .from("categories")
      .update(objToUpdate)
      .eq("id", id);

    if (error) {
      console.error("❌ Error updating category:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error in PUT request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id]
export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;
  console.log("🗑️ Deleting category");

  // Get the authorization token
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid authorization token" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  console.log(
    "[DELETE] Authorization header:",
    req.headers.get("Authorization")
  );

  try {
    // CRIE O CLIENTE AQUI!
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

    // First, get the category to get the icon URL
    const { data: category, error: fetchError } = await supabase
      .from("categories")
      .select("icon_url")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("❌ Error fetching category:", fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 400 });
    }

    // Extract the file path from the icon_url
    const iconUrl = category.icon_url;
    let filePath = "";
    console.log("[DELETE] icon_url from DB:", iconUrl);
    if (iconUrl.startsWith("http")) {
      // Public URL: extract after /object/public/icons/
      filePath = iconUrl.split("/object/public/icons/").pop() || "";
      console.log("[DELETE] Extracted filePath from public URL:", filePath);
    } else if (iconUrl.startsWith("icons/")) {
      // Path with icons/ prefix: remove it
      filePath = iconUrl.replace(/^icons\//, "");
      console.log("[DELETE] filePath after removing 'icons/':", filePath);
    } else {
      // Already relative to bucket
      filePath = iconUrl;
      console.log("[DELETE] filePath used as is:", filePath);
    }

    console.log("filePath:", filePath);

    if (filePath) {
      console.log(
        "[DELETE] Attempting to delete from bucket 'icons':",
        filePath
      );
      // Delete the icon from the bucket
      const { data: removeData, error: deleteIconError } =
        await supabase.storage.from("icons").remove([filePath]);
      console.log("[DELETE] remove() result:", removeData);
      if (deleteIconError) {
        console.error("❌ Error deleting icon:", deleteIconError);
        // Continue with category deletion even if icon deletion fails
      } else {
        console.log("✅ Icon deleted successfully from bucket");
      }
    } else {
      console.warn("[DELETE] filePath is empty, skipping icon deletion.");
    }

    // Delete the category from the database
    const { error: deleteError } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("❌ Error deleting category:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 400 });
    }

    console.log("✅ Category and icon deleted successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error in delete operation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
