// supabaseClient.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import type { Database } from './types.ts';

export const supabase = createClient<Database>(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);
