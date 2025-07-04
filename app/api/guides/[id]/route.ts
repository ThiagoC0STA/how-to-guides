import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// GET /api/guides/[id]
export async function GET(req: NextRequest, { params }: any) {
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
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("❌ Error fetching guide:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!guide) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    // Adapta guide_categories para categories (garante array)
    const guideWithCategories = {
      ...guide,
      categories: Array.isArray(guide.guide_categories)
        ? guide.guide_categories.map((gc: any) => gc.category).filter(Boolean)
        : [],
    };

    return NextResponse.json({ guide: guideWithCategories });
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
    // 1. Deletar todas as referências na tabela guide_categories
    const { error: deleteRefsError } = await supabase
      .from("guide_categories")
      .delete()
      .eq("guide_id", params.id);

    if (deleteRefsError) {
      console.error("❌ Error deleting references:", deleteRefsError);
      return NextResponse.json(
        { error: deleteRefsError.message },
        { status: 400 }
      );
    }

    // 2. Deletar o guide
    const { error: deleteGuideError } = await supabase
      .from("guides")
      .delete()
      .eq("id", params.id);

    if (deleteGuideError) {
      console.error("❌ Error deleting guide:", deleteGuideError);
      return NextResponse.json(
        { error: deleteGuideError.message },
        { status: 400 }
      );
    }

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
    const { error: updateError } = await supabase
      .from("guides")
      .update({
        title: body.title,
        description: body.description,
        image: body.image,
        color: body.color,
        modules: body.modules,
        is_popular: body.is_popular,
        metadata: body.metadata,
        created_at: body.created_at,
      })
      .eq("id", params.id)
      .select()
      .single();
    if (updateError) {
      console.error("❌ Error updating guide:", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    // Atualizar as categorias através da tabela guide_categories
    if (body.categories && Array.isArray(body.categories)) {
      // Primeiro, remover todas as relações existentes
      const { error: deleteError } = await supabase
        .from("guide_categories")
        .delete()
        .eq("guide_id", params.id);

      if (deleteError) {
        console.error("❌ Error deleting existing categories:", deleteError);
        return NextResponse.json(
          { error: deleteError.message },
          { status: 400 }
        );
      }

      // Depois, criar as novas relações
      const categoryRelations = body.categories.map((cat: any) => ({
        guide_id: params.id,
        category_id: cat.id,
      }));

      const { error: insertError } = await supabase
        .from("guide_categories")
        .insert(categoryRelations);

      if (insertError) {
        console.error("❌ Error inserting new categories:", insertError);
        return NextResponse.json(
          { error: insertError.message },
          { status: 400 }
        );
      }
    }

    // Buscar o guide atualizado com as categorias
    const { data: finalGuide, error: finalFetchError } = await supabase
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
      .eq("id", params.id)
      .single();

    if (finalFetchError) {
      console.error("❌ Error fetching updated guide:", finalFetchError);
      return NextResponse.json(
        { error: finalFetchError.message },
        { status: 400 }
      );
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
    console.error("❌ Error in update operation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
