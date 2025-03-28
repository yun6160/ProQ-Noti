import { TABLES } from '@/constant/db';
import { supabase } from '@/utils/supabase/client';

/**
 * @description Get all team members
 * @returns string[]
 */
export const GET = async (teamAbbr: string) => {
  const { data, error } = await supabase
    .from(TABLES.RIOT_PRO_USERS)
    .select(`*, ${TABLES.TEAMS}!inner(name_abbr)`)
    .eq(`${TABLES.TEAMS}.name_abbr`, teamAbbr);

  if (error) {
    return { status: 500, body: { error: 'Internal Server Error' } };
  }

  return data;
};
