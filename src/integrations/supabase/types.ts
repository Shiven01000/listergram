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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      comments: {
        Row: {
          created_at: string | null
          id: string
          parent_comment_id: string | null
          post_id: string
          text: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          parent_comment_id?: string | null
          post_id: string
          text: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          parent_comment_id?: string | null
          post_id?: string
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_posts: {
        Row: {
          caption: string | null
          created_at: string | null
          event_id: string
          id: string
          media_urls: string[] | null
          user_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          event_id: string
          id?: string
          media_urls?: string[] | null
          user_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          event_id?: string
          id?: string
          media_urls?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_posts_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_rsvps: {
        Row: {
          checked_in: boolean | null
          event_id: string
          id: string
          rsvp_date: string | null
          status: Database["public"]["Enums"]["rsvp_status"] | null
          user_id: string
        }
        Insert: {
          checked_in?: boolean | null
          event_id: string
          id?: string
          rsvp_date?: string | null
          status?: Database["public"]["Enums"]["rsvp_status"] | null
          user_id: string
        }
        Update: {
          checked_in?: boolean | null
          event_id?: string
          id?: string
          rsvp_date?: string | null
          status?: Database["public"]["Enums"]["rsvp_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_rsvps_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_rsvps_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          approval_status: Database["public"]["Enums"]["approval_status"] | null
          approved_by: string | null
          category: Database["public"]["Enums"]["event_category"] | null
          created_at: string | null
          creator_id: string
          datetime: string
          description: string | null
          id: string
          location: string
          max_attendees: number | null
          recurring_pattern: string | null
          requires_approval: boolean | null
          title: string
          tower_specific: Database["public"]["Enums"]["tower_type"] | null
          updated_at: string | null
        }
        Insert: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_by?: string | null
          category?: Database["public"]["Enums"]["event_category"] | null
          created_at?: string | null
          creator_id: string
          datetime: string
          description?: string | null
          id?: string
          location: string
          max_attendees?: number | null
          recurring_pattern?: string | null
          requires_approval?: boolean | null
          title: string
          tower_specific?: Database["public"]["Enums"]["tower_type"] | null
          updated_at?: string | null
        }
        Update: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_by?: string | null
          category?: Database["public"]["Enums"]["event_category"] | null
          created_at?: string | null
          creator_id?: string
          datetime?: string
          description?: string | null
          id?: string
          location?: string
          max_attendees?: number | null
          recurring_pattern?: string | null
          requires_approval?: boolean | null
          title?: string
          tower_specific?: Database["public"]["Enums"]["tower_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace: {
        Row: {
          category: Database["public"]["Enums"]["marketplace_category"] | null
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          price: number | null
          seller_id: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["marketplace_category"] | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          price?: number | null
          seller_id: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["marketplace_category"] | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          price?: number | null
          seller_id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          conversation_started: boolean | null
          created_at: string | null
          expires_at: string | null
          id: string
          match_type: Database["public"]["Enums"]["match_type"]
          user1_id: string
          user2_id: string
        }
        Insert: {
          conversation_started?: boolean | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          match_type: Database["public"]["Enums"]["match_type"]
          user1_id: string
          user2_id: string
        }
        Update: {
          conversation_started?: boolean | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          match_type?: Database["public"]["Enums"]["match_type"]
          user1_id?: string
          user2_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_user1_id_fkey"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_user2_id_fkey"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string | null
          id: string
          match_id: string
          media_url: string | null
          message_type: Database["public"]["Enums"]["message_type"] | null
          read_at: string | null
          sender_id: string
          text: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          match_id: string
          media_url?: string | null
          message_type?: Database["public"]["Enums"]["message_type"] | null
          read_at?: string | null
          sender_id: string
          text?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          match_id?: string
          media_url?: string | null
          message_type?: Database["public"]["Enums"]["message_type"] | null
          read_at?: string | null
          sender_id?: string
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          caption: string | null
          created_at: string | null
          hashtags: string[] | null
          id: string
          location: string | null
          media_urls: string[] | null
          post_type: Database["public"]["Enums"]["post_type"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          location?: string | null
          media_urls?: string[] | null
          post_type?: Database["public"]["Enums"]["post_type"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          location?: string | null
          media_urls?: string[] | null
          post_type?: Database["public"]["Enums"]["post_type"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          bio: string | null
          created_at: string | null
          dating_enabled: boolean | null
          email: string
          fav_caf_food: string | null
          floor: number
          friend_mode_enabled: boolean | null
          full_name: string
          id: string
          interests: string[] | null
          lister_role: Database["public"]["Enums"]["lister_role"] | null
          profile_pic_url: string | null
          program: string
          pronouns: string | null
          role_verified: boolean | null
          tower: Database["public"]["Enums"]["tower_type"]
          updated_at: string | null
          username: string
          year_of_study: Database["public"]["Enums"]["year_of_study"]
        }
        Insert: {
          age?: number | null
          bio?: string | null
          created_at?: string | null
          dating_enabled?: boolean | null
          email: string
          fav_caf_food?: string | null
          floor: number
          friend_mode_enabled?: boolean | null
          full_name: string
          id: string
          interests?: string[] | null
          lister_role?: Database["public"]["Enums"]["lister_role"] | null
          profile_pic_url?: string | null
          program: string
          pronouns?: string | null
          role_verified?: boolean | null
          tower: Database["public"]["Enums"]["tower_type"]
          updated_at?: string | null
          username: string
          year_of_study: Database["public"]["Enums"]["year_of_study"]
        }
        Update: {
          age?: number | null
          bio?: string | null
          created_at?: string | null
          dating_enabled?: boolean | null
          email?: string
          fav_caf_food?: string | null
          floor?: number
          friend_mode_enabled?: boolean | null
          full_name?: string
          id?: string
          interests?: string[] | null
          lister_role?: Database["public"]["Enums"]["lister_role"] | null
          profile_pic_url?: string | null
          program?: string
          pronouns?: string | null
          role_verified?: boolean | null
          tower?: Database["public"]["Enums"]["tower_type"]
          updated_at?: string | null
          username?: string
          year_of_study?: Database["public"]["Enums"]["year_of_study"]
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          id: string
          reason: string
          reported_content_id: string | null
          reported_user_id: string | null
          reporter_id: string
          status: Database["public"]["Enums"]["report_status"] | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          reason: string
          reported_content_id?: string | null
          reported_user_id?: string | null
          reporter_id: string
          status?: Database["public"]["Enums"]["report_status"] | null
        }
        Update: {
          created_at?: string | null
          id?: string
          reason?: string
          reported_content_id?: string | null
          reported_user_id?: string | null
          reporter_id?: string
          status?: Database["public"]["Enums"]["report_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_reported_user_id_fkey"
            columns: ["reported_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      approval_status: "pending" | "approved" | "rejected"
      event_category:
        | "floor_meeting"
        | "study_session"
        | "social_gathering"
        | "fitness_class"
        | "food_event"
        | "cultural_night"
        | "other"
      lister_role:
        | "Common Resident"
        | "Floor Captain"
        | "Resident Assistant"
        | "VP Finance"
        | "VP Internal"
        | "VP Mackenzie"
        | "VP Schaffer"
        | "VP Henday"
        | "VP Kelsey"
        | "President"
        | "Other Leadership"
      marketplace_category:
        | "textbooks"
        | "furniture"
        | "electronics"
        | "clothing"
        | "meal_plans"
        | "other"
      match_type: "dating" | "friends"
      message_type: "text" | "image" | "video" | "voice"
      post_type: "photo" | "video" | "reel"
      report_status: "pending" | "reviewed" | "resolved" | "dismissed"
      rsvp_status: "attending" | "maybe" | "not_going"
      tower_type: "Henday" | "Mackenzie" | "Schaffer" | "Kelsey" | "Assiniboia"
      year_of_study:
        | "1st Year"
        | "2nd Year"
        | "3rd Year"
        | "4th Year"
        | "5th+ Year"
        | "Graduate Student"
        | "PhD Student"
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
      approval_status: ["pending", "approved", "rejected"],
      event_category: [
        "floor_meeting",
        "study_session",
        "social_gathering",
        "fitness_class",
        "food_event",
        "cultural_night",
        "other",
      ],
      lister_role: [
        "Common Resident",
        "Floor Captain",
        "Resident Assistant",
        "VP Finance",
        "VP Internal",
        "VP Mackenzie",
        "VP Schaffer",
        "VP Henday",
        "VP Kelsey",
        "President",
        "Other Leadership",
      ],
      marketplace_category: [
        "textbooks",
        "furniture",
        "electronics",
        "clothing",
        "meal_plans",
        "other",
      ],
      match_type: ["dating", "friends"],
      message_type: ["text", "image", "video", "voice"],
      post_type: ["photo", "video", "reel"],
      report_status: ["pending", "reviewed", "resolved", "dismissed"],
      rsvp_status: ["attending", "maybe", "not_going"],
      tower_type: ["Henday", "Mackenzie", "Schaffer", "Kelsey", "Assiniboia"],
      year_of_study: [
        "1st Year",
        "2nd Year",
        "3rd Year",
        "4th Year",
        "5th+ Year",
        "Graduate Student",
        "PhD Student",
      ],
    },
  },
} as const
