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
    .eq(`${TABLES.TEAMS}.name_abbr`, teamAbbr)
    .order('position_number', { ascending: true });

  if (error) {
    return { status: 500, body: { error: 'Internal Server Error' } };
  }

  return data;
};

/**
 * @param teamAbbr
 * @returns number
 */
export const GET_TEAM_ID = async (teamAbbr: string) => {
  const { data, error } = await supabase
    .from(TABLES.TEAMS)
    .select('id')
    .eq('name_abbr', teamAbbr)
    .single();

  if (error || !data) {
    throw new Error('팀 ID 조회 실패');
  }

  return data.id;
};
