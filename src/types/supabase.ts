export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      academic_years: {
        Row: {
          academic_year: string
          created_at: string
          end_date: string
          id: number
          school: number
          start_date: string
        }
        Insert: {
          academic_year: string
          created_at?: string
          end_date: string
          id?: number
          school: number
          start_date: string
        }
        Update: {
          academic_year?: string
          created_at?: string
          end_date?: string
          id?: number
          school?: number
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "academic_years_school_fkey"
            columns: ["school"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          comment: string | null
          created_at: string
          id: number
          image: string | null
          post_id: number | null
          profile_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: number
          image?: string | null
          post_id?: number | null
          profile_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: number
          image?: string | null
          post_id?: number | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          id: number
          profile_url: string | null
          school: number | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          profile_url?: string | null
          school?: number | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          profile_url?: string | null
          school?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_school_fkey"
            columns: ["school"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          }
        ]
      }
      group_chat_urls: {
        Row: {
          created_at: string
          description: string | null
          group_id: number | null
          id: number
          link: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          group_id?: number | null
          id?: number
          link: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          group_id?: number | null
          id?: number
          link?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_chat_urls_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
      group_members: {
        Row: {
          approved: boolean
          created_at: string
          creator: boolean
          description: string | null
          group_id: number
          id: number
          is_admin: boolean
          profile_id: string
          promoted_admin_by: number | null
          student_id: number
        }
        Insert: {
          approved?: boolean
          created_at?: string
          creator?: boolean
          description?: string | null
          group_id: number
          id?: number
          is_admin?: boolean
          profile_id: string
          promoted_admin_by?: number | null
          student_id: number
        }
        Update: {
          approved?: boolean
          created_at?: string
          creator?: boolean
          description?: string | null
          group_id?: number
          id?: number
          is_admin?: boolean
          profile_id?: string
          promoted_admin_by?: number | null
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_promoted_admin_by_fkey"
            columns: ["promoted_admin_by"]
            isOneToOne: false
            referencedRelation: "group_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      group_posts: {
        Row: {
          author: number
          created_at: string
          description: string | null
          group_id: number
          id: number
          pinned: boolean
          title: string
        }
        Insert: {
          author: number
          created_at?: string
          description?: string | null
          group_id: number
          id?: number
          pinned?: boolean
          title: string
        }
        Update: {
          author?: number
          created_at?: string
          description?: string | null
          group_id?: number
          id?: number
          pinned?: boolean
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_posts_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_posts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
      groups: {
        Row: {
          academic_year_id: number
          avatar_url: string | null
          course: number
          cover_url: string | null
          created_at: string
          description: string | null
          id: number
          name: string
          school: number
          semester: number
          vanity_url: string
        }
        Insert: {
          academic_year_id: number
          avatar_url?: string | null
          course: number
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name: string
          school: number
          semester: number
          vanity_url: string
        }
        Update: {
          academic_year_id?: number
          avatar_url?: string | null
          course?: number
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          school?: number
          semester?: number
          vanity_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_academic_year_id_fkey"
            columns: ["academic_year_id"]
            isOneToOne: false
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_course_fkey"
            columns: ["course"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_school_fkey"
            columns: ["school"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_semester_fkey"
            columns: ["semester"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          }
        ]
      }
      otp_codes: {
        Row: {
          code: string
          created_at: string | null
          expiry_at: string | null
          id: number
          student_id: number
        }
        Insert: {
          code: string
          created_at?: string | null
          expiry_at?: string | null
          id?: number
          student_id: number
        }
        Update: {
          code?: string
          created_at?: string | null
          expiry_at?: string | null
          id?: number
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "otp_codes_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          body: string
          created_at: string
          group_id: number | null
          id: number
          is_announcement: boolean
          is_pinned_announcement: boolean
          parent_post: number | null
          reaction: Database["public"]["Enums"]["reaction"] | null
          school_id: number | null
          title: string
        }
        Insert: {
          body: string
          created_at?: string
          group_id?: number | null
          id?: number
          is_announcement?: boolean
          is_pinned_announcement?: boolean
          parent_post?: number | null
          reaction?: Database["public"]["Enums"]["reaction"] | null
          school_id?: number | null
          title: string
        }
        Update: {
          body?: string
          created_at?: string
          group_id?: number | null
          id?: number
          is_announcement?: boolean
          is_pinned_announcement?: boolean
          parent_post?: number | null
          reaction?: Database["public"]["Enums"]["reaction"] | null
          school_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_parent_post_fkey"
            columns: ["parent_post"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          }
        ]
      }
      professors: {
        Row: {
          created_at: string
          full_name: string
          id: number
          profile_id: string
          school: number
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: number
          profile_id: string
          school: number
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: number
          profile_id?: string
          school?: number
        }
        Relationships: [
          {
            foreignKeyName: "professors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professors_school_fkey"
            columns: ["school"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rooms: {
        Row: {
          building: string
          created_at: string
          floor: string
          id: number
          name: string
        }
        Insert: {
          building: string
          created_at?: string
          floor: string
          id?: number
          name: string
        }
        Update: {
          building?: string
          created_at?: string
          floor?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      schedules: {
        Row: {
          created_at: string
          group_id: number
          id: number
          professor_id: number | null
          room_id: number | null
          subject_id: number
        }
        Insert: {
          created_at?: string
          group_id: number
          id?: number
          professor_id?: number | null
          room_id?: number | null
          subject_id: number
        }
        Update: {
          created_at?: string
          group_id?: number
          id?: number
          professor_id?: number | null
          room_id?: number | null
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "schedules_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "professors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          }
        ]
      }
      schools: {
        Row: {
          created_at: string
          email: string
          id: number
          name: string
          profile_url: string | null
          vanity_url: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          name: string
          profile_url?: string | null
          vanity_url: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          name?: string
          profile_url?: string | null
          vanity_url?: string
        }
        Relationships: []
      }
      search_history: {
        Row: {
          created_at: string
          hide: boolean
          id: number
          profile_id: string
          query: string
          student_id: number
        }
        Insert: {
          created_at?: string
          hide?: boolean
          id?: number
          profile_id: string
          query: string
          student_id: number
        }
        Update: {
          created_at?: string
          hide?: boolean
          id?: number
          profile_id?: string
          query?: string
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "search_history_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_history_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      security_questions: {
        Row: {
          answer: string
          created_at: string
          group_id: number | null
          hint: string | null
          id: number
          title: string
        }
        Insert: {
          answer: string
          created_at?: string
          group_id?: number | null
          hint?: string | null
          id?: number
          title: string
        }
        Update: {
          answer?: string
          created_at?: string
          group_id?: number | null
          hint?: string | null
          id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "security_questions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
      semesters: {
        Row: {
          academic_year: number
          created_at: string
          end_date: string
          id: number
          name: string
          start_date: string
          term: number
        }
        Insert: {
          academic_year: number
          created_at?: string
          end_date: string
          id?: number
          name: string
          start_date: string
          term: number
        }
        Update: {
          academic_year?: number
          created_at?: string
          end_date?: string
          id?: number
          name?: string
          start_date?: string
          term?: number
        }
        Relationships: [
          {
            foreignKeyName: "semesters_academic_year_fkey"
            columns: ["academic_year"]
            isOneToOne: false
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          }
        ]
      }
      student_followers: {
        Row: {
          created_at: string
          follow_date: string | null
          follower_id: number
          following_id: number
          id: number
        }
        Insert: {
          created_at?: string
          follow_date?: string | null
          follower_id: number
          following_id: number
          id?: number
        }
        Update: {
          created_at?: string
          follow_date?: string | null
          follower_id?: number
          following_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_followers_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_followers_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      students: {
        Row: {
          academic_year_id: number | null
          avatar_url: string | null
          created_at: string
          description: string | null
          full_name: string | null
          id: number
          profile_id: string
          school: number
          school_email: string
          student_no: string | null
          type: Database["public"]["Enums"]["student_type"] | null
          verified: boolean
        }
        Insert: {
          academic_year_id?: number | null
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          full_name?: string | null
          id?: number
          profile_id: string
          school: number
          school_email: string
          student_no?: string | null
          type?: Database["public"]["Enums"]["student_type"] | null
          verified?: boolean
        }
        Update: {
          academic_year_id?: number | null
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          full_name?: string | null
          id?: number
          profile_id?: string
          school?: number
          school_email?: string
          student_no?: string | null
          type?: Database["public"]["Enums"]["student_type"] | null
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "students_academic_year_id_fkey"
            columns: ["academic_year_id"]
            isOneToOne: false
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_school_fkey"
            columns: ["school"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          }
        ]
      }
      subjects: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: number
          school_id: number
          title: string
          units: number
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: number
          school_id: number
          title: string
          units: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: number
          school_id?: number
          title?: string
          units?: number
        }
        Relationships: [
          {
            foreignKeyName: "subjects_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          }
        ]
      }
      threads: {
        Row: {
          created_at: string
          deleted: boolean
          id: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: number
          title?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      threads_messages: {
        Row: {
          created_at: string
          full_name: string | null
          id: number
          student_id: number
          text: string
          thread_id: number
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: number
          student_id: number
          text?: string
          thread_id: number
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: number
          student_id?: number
          text?: string
          thread_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "threads_messages_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threads_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "threads"
            referencedColumns: ["id"]
          }
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
      reaction: "like" | "love" | "celebrate" | "insightful" | "curious"
      student_type: "regular" | "irregular"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
