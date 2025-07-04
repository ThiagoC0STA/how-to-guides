import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// GET /api/ai-models
export async function GET(req: NextRequest) {
  const res = NextResponse.json({ success: true });

  // Get pagination and search parameters
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = page * limit;
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "created_at";
  const sortDirection = searchParams.get("sortDirection") || "desc";

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
      .from("models")
      .select("*", { count: "exact", head: true });
    if (search) {
      countQuery = countQuery.or(
        `name.ilike.%${search}%,description.ilike.%${search}%,company.ilike.%${search}%`
      );
    }
    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error("❌ Error getting total count:", countError);
      return NextResponse.json({ error: countError.message }, { status: 400 });
    }

    // Then get paginated data
    let query = supabase
      .from("models")
      .select("*")
      .order(sortBy, { ascending: sortDirection === "asc" })
      .range(offset, offset + limit - 1);
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,description.ilike.%${search}%,company.ilike.%${search}%`
      );
    }
    const { data: models, error } = await query;

    if (error) {
      console.error("❌ Error fetching models:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      models,
      totalCount: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error("❌ Error fetching models:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/ai-models
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {
    console.error("[AI MODELS][POST] Error parsing JSON body:", e);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!authHeader?.startsWith("Bearer ")) {
    console.error("[AI MODELS][POST] Missing or invalid authorization token");
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
    // Validação dos campos obrigatórios
    if (
      !body.name ||
      !body.company ||
      !body.description ||
      !body.strengths ||
      !body.limitations ||
      !body.use_cases ||
      !body.pricing
    ) {
      console.error("[AI MODELS][POST] Missing required fields", body);
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, company, description, strengths, limitations, use_cases, pricing",
        },
        { status: 400 }
      );
    }
    // Validação dos campos de pricing
    if (!body.pricing.free || !body.pricing.paid || !body.pricing.api) {
      console.error(
        "[AI MODELS][POST] Missing required pricing fields",
        body.pricing
      );
      return NextResponse.json(
        { error: "Missing required pricing fields: free, paid, api" },
        { status: 400 }
      );
    }
    const { data, error } = await supabase
      .from("models")
      .insert({
        name: body.name,
        company: body.company,
        description: body.description,
        strengths: body.strengths,
        limitations: body.limitations,
        use_cases: body.use_cases,
        pricing: body.pricing,
        link: body.link,
      })
      .select()
      .single();
    if (error) {
      console.error("[AI MODELS][POST] Supabase insert error:", error, {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return NextResponse.json(
        {
          error: error.message || "Unknown error",
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ model: data });
  } catch (error) {
    console.error("[AI MODELS][POST] Internal server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
