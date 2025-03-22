import { supabase } from '@/utils/supabase/client';

export const GET = async () => {
  const { data, error } = await supabase.from('teams').select('*');

  if (error) {
    return { status: 500, body: { error: 'Internal Server Error' } };
  }

  return data;
};
