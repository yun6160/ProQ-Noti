import { TABLES } from '@/constant/db';
import { supabase } from '@/utils/supabase/client';

/**
 * @description Get all teams
 * @returns string[]
 */
export const GET = async () => {
  const { data, error } = await supabase
    .from(TABLES.TEAMS)
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    return { status: 500, body: { error: 'Internal Server Error' } };
  }

  return data;
};
