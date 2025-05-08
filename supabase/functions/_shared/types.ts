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
            notifications: {
                Row: {
                    body: string;
                    created_at: string;
                    id: string;
                    user_id: string;
                };
                Insert: {
                    body: string;
                    created_at?: string;
                    id?: string;
                    user_id: string;
                };
                Update: {
                    body?: string;
                    created_at?: string;
                    id?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "notifications_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            riot_accounts: {
                Row: {
                    created_at: string | null;
                    id: number;
                    is_main: boolean | null;
                    is_online: boolean | null;
                    last_checked_at: string | null;
                    last_online: string | null;
                    pro_user_id: number;
                    puuid: string;
                    summoner_name: string;
                    tag_line: string;
                    updated_at: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    id?: number;
                    is_main?: boolean | null;
                    is_online?: boolean | null;
                    last_checked_at?: string | null;
                    last_online?: string | null;
                    pro_user_id: number;
                    puuid: string;
                    summoner_name: string;
                    tag_line: string;
                    updated_at?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    id?: number;
                    is_main?: boolean | null;
                    is_online?: boolean | null;
                    last_checked_at?: string | null;
                    last_online?: string | null;
                    pro_user_id?: number;
                    puuid?: string;
                    summoner_name?: string;
                    tag_line?: string;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "riot_accounts_pro_user_id_fkey";
                        columns: ["pro_user_id"];
                        isOneToOne: false;
                        referencedRelation: "riot_pro_users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            riot_pro_users: {
                Row: {
                    id: number;
                    is_starter: boolean;
                    position_number: number;
                    pro_name: string;
                    team_id: number | null;
                };
                Insert: {
                    id?: number;
                    is_starter?: boolean;
                    position_number?: number;
                    pro_name: string;
                    team_id?: number | null;
                };
                Update: {
                    id?: number;
                    is_starter?: boolean;
                    position_number?: number;
                    pro_name?: string;
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
                    fcm_token: string | null;
                    id: string;
                    user_name: string | null;
                };
                Insert: {
                    avatar_url?: string | null;
                    created_at?: string | null;
                    email: string;
                    fcm_token?: string | null;
                    id: string;
                    user_name?: string | null;
                };
                Update: {
                    avatar_url?: string | null;
                    created_at?: string | null;
                    email?: string;
                    fcm_token?: string | null;
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
            get_players_with_subscription: {
                Args: { team_abbr: string; current_user_id?: string };
                Returns: {
                    id: number;
                    pro_name: string;
                    account_id: number;
                    puuid: string;
                    summoner_name: string;
                    tag_line: string;
                    team_id: number;
                    is_online: boolean;
                    last_online: string;
                    is_subscribed: boolean;
                }[];
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
              Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof Database },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
    graphql_public: {
        Enums: {},
    },
    public: {
        Enums: {},
    },
} as const;
