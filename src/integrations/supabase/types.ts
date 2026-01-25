export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      businesses: {
        Row: {
          address: string | null
          brand_color: string | null
          category: string | null
          created_at: string
          id: string
          latitude: number | null
          logo_emoji: string | null
          logo_url: string | null
          longitude: number | null
          name: string
          phone: string | null
          reward_name: string
          reward_value: number | null
        }
        Insert: {
          address?: string | null
          brand_color?: string | null
          category?: string | null
          created_at?: string
          id?: string
          latitude?: number | null
          logo_emoji?: string | null
          logo_url?: string | null
          longitude?: number | null
          name: string
          phone?: string | null
          reward_name?: string
          reward_value?: number | null
        }
        Update: {
          address?: string | null
          brand_color?: string | null
          category?: string | null
          created_at?: string
          id?: string
          latitude?: number | null
          logo_emoji?: string | null
          logo_url?: string | null
          longitude?: number | null
          name?: string
          phone?: string | null
          reward_name?: string
          reward_value?: number | null
        }
        Relationships: []
      }
      loyalty_cards: {
        Row: {
          business_id: string
          created_at: string
          current_stamps: number
          id: string
          is_favorite: boolean
          last_visit: string | null
          stamps_required: number
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string
          current_stamps?: number
          id?: string
          is_favorite?: boolean
          last_visit?: string | null
          stamps_required?: number
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string
          current_stamps?: number
          id?: string
          is_favorite?: boolean
          last_visit?: string | null
          stamps_required?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_cards_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_cards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          birthday_month: number | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          plan: Database["public"]["Enums"]["plan_type"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          birthday_month?: number | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          plan?: Database["public"]["Enums"]["plan_type"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          birthday_month?: number | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["plan_type"]
          updated_at?: string
        }
        Relationships: []
      }
      rewards: {
        Row: {
          card_id: string
          created_at: string
          expires_at: string
          id: string
          redeemed_at: string | null
          redemption_code: string
          user_id: string
        }
        Insert: {
          card_id: string
          created_at?: string
          expires_at?: string
          id?: string
          redeemed_at?: string | null
          redemption_code: string
          user_id: string
        }
        Update: {
          card_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          redeemed_at?: string | null
          redemption_code?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rewards_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "loyalty_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rewards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stamps: {
        Row: {
          card_id: string
          created_at: string
          id: string
          location_lat: number | null
          location_lng: number | null
          multiplier_type: string | null
          stamps_added: number
        }
        Insert: {
          card_id: string
          created_at?: string
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          multiplier_type?: string | null
          stamps_added?: number
        }
        Update: {
          card_id?: string
          created_at?: string
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          multiplier_type?: string | null
          stamps_added?: number
        }
        Relationships: [
          {
            foreignKeyName: "stamps_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "loyalty_cards"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      plan_type: "free" | "premium"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      plan_type: ["free", "premium"],
    },
  },
} as const
