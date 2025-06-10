import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// GET /api/categories/[id]
export async function GET(req: NextRequest, { params }: any) {

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

    const objToUpdate = {
      title: body.title,
      description: body.description,
      icon_url: body.icon_url,
      color: body.color,
      featured: body.featured,
      comingSoon: body.comingSoon,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("categories")
      .update(objToUpdate)
      .eq("id", id);

    if (error) {
      console.error("❌ Error updating category:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (body.guides && Array.isArray(body.guides)) {
      // Remove todas as ligações antigas
      const { error: deleteLinksError } = await supabase
        .from("guide_categories")
        .delete()
        .eq("category_id", id);

      if (deleteLinksError) {
        console.error(
          "❌ Error deleting old guide_categories:",
          deleteLinksError
        );
        return NextResponse.json(
          { error: deleteLinksError.message },
          { status: 400 }
        );
      }

      // Cria as novas ligações
      const relations = body.guides.map((guideId: string) => ({
        guide_id: guideId,
        category_id: id,
      }));
      if (relations.length > 0) {
        const { error: insertLinksError } = await supabase
          .from("guide_categories")
          .insert(relations);

        if (insertLinksError) {
          console.error(
            "❌ Error inserting new guide_categories:",
            insertLinksError
          );
          return NextResponse.json(
            { error: insertLinksError.message },
            { status: 400 }
          );
        }
      }
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

  // Get the authorization token
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid authorization token" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
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

    // 1. Deletar todas as referências na tabela guide_categories
    const { error: deleteRefsError } = await supabase
      .from("guide_categories")
      .delete()
      .eq("category_id", id);

    if (deleteRefsError) {
      console.error("❌ Error deleting references:", deleteRefsError);
      return NextResponse.json(
        { error: deleteRefsError.message },
        { status: 400 }
      );
    }

    // 2. Deletar a categoria
    const { error: deleteCategoryError } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (deleteCategoryError) {
      console.error("❌ Error deleting category:", deleteCategoryError);
      return NextResponse.json(
        { error: deleteCategoryError.message },
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
