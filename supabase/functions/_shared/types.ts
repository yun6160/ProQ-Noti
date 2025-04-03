export interface Player {
    id: number;
    is_online: boolean;
    last_checked_at: string;
    last_online: string | null;
    position_number: number;
    pro_name: string;
    puuid: string;
    summoner_name: string;
    tag_line: string;
    team_id: number | null;
}
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    graphql_public: {
        Tables: {
            [_ in never]: never;
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            graphql: {
                Args: {
                    operationName?: string;
                    query?: string;
                    variables?: Json;
                    extensions?: Json;
                };
                Returns: Json;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
    public: {
        Tables: {
            riot_pro_users: {
                Row: {
                    id: number;
                    is_online: boolean;
                    is_starter: boolean;
                    last_checked_at: string;
                    last_online: string | null;
                    position_number: number;
                    pro_name: string;
                    puuid: string;
                    summoner_name: string;
                    tag_line: string;
                    team_id: number | null;
                };
                Insert: {
                    id?: number;
                    is_online?: boolean;
                    is_starter?: boolean;
                    last_checked_at?: string;
                    last_online?: string | null;
                    position_number?: number;
                    pro_name: string;
                    puuid: string;
                    summoner_name: string;
                    tag_line: string;
                    team_id?: number | null;
                };
                Update: {
                    id?: number;
                    is_online?: boolean;
                    is_starter?: boolean;
                    last_checked_at?: string;
                    last_online?: string | null;
                    position_number?: number;
                    pro_name?: string;
                    puuid?: string;
                    summoner_name?: string;
                    tag_line?: string;
                    team_id?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "riot_pro_users_team_id_fkey";
                        columns: ["team_id"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            subscribe: {
                Row: {
                    created_at: string | null;
                    id: number;
                    riot_pro_user_id: number;
                    user_id: string;
                };
                Insert: {
                    created_at?: string | null;
                    id?: number;
                    riot_pro_user_id: number;
                    user_id: string;
                };
                Update: {
                    created_at?: string | null;
                    id?: number;
                    riot_pro_user_id?: number;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "subscribe_riot_pro_user_id_fkey";
                        columns: ["riot_pro_user_id"];
                        isOneToOne: false;
                        referencedRelation: "riot_pro_users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "subscribe_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            teams: {
                Row: {
                    created_at: string;
                    id: number;
                    name_abbr: string;
                    name_prefix: string;
                    name_suffix: string | null;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name_abbr: string;
                    name_prefix: string;
                    name_suffix?: string | null;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name_abbr?: string;
                    name_prefix?: string;
                    name_suffix?: string | null;
                };
                Relationships: [];
            };
            users: {
                Row: {
                    avatar_url: string | null;
                    created_at: string | null;
                    email: string;
                    id: string;
                    user_name: string | null;
                };
                Insert: {
                    avatar_url?: string | null;
                    created_at?: string | null;
                    email: string;
                    id: string;
                    user_name?: string | null;
                };
                Update: {
                    avatar_url?: string | null;
                    created_at?: string | null;
                    email?: string;
                    id?: string;
                    user_name?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
