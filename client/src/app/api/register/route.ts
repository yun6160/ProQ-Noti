import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { email, puuid } = await req.json();

  if (!email || !puuid) {
    return NextResponse.json({ error: "Missing email or puuid" }, { status: 400 });
  }

  const { data, error } = await supabase.from("riot_users").insert([{ email, puuid }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "User registered successfully", data });
};