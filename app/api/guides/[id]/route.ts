import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// GET /api/guides/[id]
export async function GET(req: NextRequest, { params }: any) {
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
export async function DELETE(req: NextRequest, { params }: any) {
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
    const imageUrl = guide.image;
    let filePath = "";
    console.log("[DELETE] image from DB:", imageUrl);
    if (imageUrl && imageUrl.startsWith("http")) {
      // Public URL: extract after /object/public/images/
      filePath = imageUrl.split("/object/public/images/").pop() || "";
      console.log("[DELETE] Extracted filePath from public URL:", filePath);
    } else if (imageUrl && imageUrl.startsWith("guides/")) {
      filePath = imageUrl;
    } else if (imageUrl) {
      filePath = imageUrl;
    }

    console.log("filePath:", filePath);

    if (filePath) {
      console.log(
        "[DELETE] Attempting to delete from bucket 'images':",
        filePath
      );
      // Delete the image from the bucket
      const { data: removeData, error: deleteImageError } =
        await supabase.storage.from("images").remove([filePath]);
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

// PUT /api/guides/[id]
export async function PUT(req: NextRequest, { params }: any) {
  console.log("✏️ Updating guide:", params.id);

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
    const body = await req.json();
    // Buscar o guide atual para comparar a imagem
    const { data: currentGuide, error: fetchError } = await supabase
      .from("guides")
      .select("image")
      .eq("id", params.id)
      .single();
    if (fetchError) {
      console.error("❌ Error fetching guide:", fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 400 });
    }
    if (!currentGuide) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    if (
      body.image &&
      typeof body.image === "string" &&
      body.image !== currentGuide.image &&
      currentGuide.image
    ) {
      // Apagar imagem antiga
      let oldFilePath = "";
      if (currentGuide.image.startsWith("http")) {
        oldFilePath =
          currentGuide.image.split("/object/public/guides/").pop() || "";
      } else if (currentGuide.image.startsWith("guides/")) {
        oldFilePath = currentGuide.image.replace(/^guides\//, "");
      } else {
        oldFilePath = currentGuide.image;
      }
      if (oldFilePath) {
        const { error: deleteImageError } = await supabase.storage
          .from("guides")
          .remove([oldFilePath]);
        if (deleteImageError) {
          console.error("❌ Error deleting old image:", deleteImageError);
        }
      }
    }
    // Se for uma nova imagem (upload), o frontend já faz upload e manda a URL
    // Só atualiza os dados
    const { data: updatedGuide, error: updateError } = await supabase
      .from("guides")
      .update({
        title: body.title,
        description: body.description,
        image: body.image,
        color: body.color,
        modules: body.modules,
        is_popular: body.is_popular,
        categories: body.categories,
        metadata: body.metadata,
      })
      .eq("id", params.id)
      .select()
      .single();
    if (updateError) {
      console.error("❌ Error updating guide:", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }
    // Atualizar o campo guides das categorias envolvidas
    if (body.categories && Array.isArray(body.categories)) {
      // Buscar todas as categorias
      const { data: allCategories } = await supabase
        .from("categories")
        .select("id,guides");
      // Remover o id do guide de todas as categorias que não estão mais relacionadas
      for (const cat of allCategories || []) {
        if (!body.categories.find((c: any) => c.id === cat.id)) {
          const newGuides = (cat.guides || []).filter(
            (gid: string) => gid !== params.id
          );
          await supabase
            .from("categories")
            .update({ guides: newGuides })
            .eq("id", cat.id);
        }
      }
      // Adicionar o id do guide nas categorias selecionadas
      for (const cat of body.categories) {
        const { data: catData } = await supabase
          .from("categories")
          .select("guides")
          .eq("id", cat.id)
          .single();
        const guidesArr = catData?.guides || [];
        if (!guidesArr.includes(params.id)) {
          await supabase
            .from("categories")
            .update({ guides: [...guidesArr, params.id] })
            .eq("id", cat.id);
        }
      }
    }
    return NextResponse.json({ guide: updatedGuide });
  } catch (error) {
    console.error("❌ Error in update operation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
