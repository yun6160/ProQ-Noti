import { createClientForServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = await createClientForServer();
  
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login');
  }

  return <p>hi {data.user.email}</p>
}