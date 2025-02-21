import { createClientForServer } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect("/error?message=Missing authorization code");
  }

  const supabase = await createClientForServer();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect("/error?message=" + encodeURIComponent(error.message));
  }

  return NextResponse.redirect(next);
}