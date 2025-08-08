export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string
          student_id: string
          formation_id: string
          status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted'
          priority: number
          motivation_letter?: string | null
          additional_documents?: string[] | null
          grade_average?: number | null
          submitted_at?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          review_notes?: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          formation_id: string
          status?: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted'
          priority?: number
          motivation_letter?: string | null
          additional_documents?: string[] | null
          grade_average?: number | null
          submitted_at?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          review_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          formation_id?: string
          status?: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted'
          priority?: number
          motivation_letter?: string | null
          additional_documents?: string[] | null
          grade_average?: number | null
          submitted_at?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          review_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          title?: string | null
          is_group: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title?: string | null
          is_group?: boolean
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string | null
          is_group?: boolean
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      conversation_participants: {
        Row: {
          id: string
          conversation_id: string
          user_id: string
          joined_at: string
          last_read_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id: string
          joined_at?: string
          last_read_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          user_id?: string
          joined_at?: string
          last_read_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description?: string | null
          event_type: 'open_day' | 'conference' | 'webinar' | 'deadline' | 'exam' | 'interview' | 'other'
          start_date: string
          end_date?: string | null
          location?: string | null
          is_online: boolean
          meeting_url?: string | null
          max_participants?: number | null
          current_participants: number
          organizer_id: string
          university_id?: string | null
          formation_id?: string | null
          is_public: boolean
          registration_required: boolean
          registration_deadline?: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          event_type: 'open_day' | 'conference' | 'webinar' | 'deadline' | 'exam' | 'interview' | 'other'
          start_date: string
          end_date?: string | null
          location?: string | null
          is_online?: boolean
          meeting_url?: string | null
          max_participants?: number | null
          current_participants?: number
          organizer_id: string
          university_id?: string | null
          formation_id?: string | null
          is_public?: boolean
          registration_required?: boolean
          registration_deadline?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          event_type?: 'open_day' | 'conference' | 'webinar' | 'deadline' | 'exam' | 'interview' | 'other'
          start_date?: string
          end_date?: string | null
          location?: string | null
          is_online?: boolean
          meeting_url?: string | null
          max_participants?: number | null
          current_participants?: number
          organizer_id?: string
          university_id?: string | null
          formation_id?: string | null
          is_public?: boolean
          registration_required?: boolean
          registration_deadline?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      event_registrations: {
        Row: {
          id: string
          event_id: string
          user_id: string
          registered_at: string
          status: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          registered_at?: string
          status?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          registered_at?: string
          status?: string
        }
      }
      formations: {
        Row: {
          id: string
          university_id: string
          name: string
          description?: string | null
          level: string
          domain: string
          duration_years: number
          total_places: number
          available_places: number
          requirements?: string | null
          admission_criteria?: string | null
          application_deadline?: string | null
          tuition_fee?: number | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          university_id: string
          name: string
          description?: string | null
          level: string
          domain: string
          duration_years: number
          total_places?: number
          available_places?: number
          requirements?: string | null
          admission_criteria?: string | null
          application_deadline?: string | null
          tuition_fee?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          university_id?: string
          name?: string
          description?: string | null
          level?: string
          domain?: string
          duration_years?: number
          total_places?: number
          available_places?: number
          requirements?: string | null
          admission_criteria?: string | null
          application_deadline?: string | null
          tuition_fee?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          message_type: string
          attachments?: string[] | null
          status: 'sending' | 'sent' | 'delivered' | 'read'
          reply_to?: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content: string
          message_type?: string
          attachments?: string[] | null
          status?: 'sending' | 'sent' | 'delivered' | 'read'
          reply_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string
          message_type?: string
          attachments?: string[] | null
          status?: 'sending' | 'sent' | 'delivered' | 'read'
          reply_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'message' | 'application_update' | 'event_reminder' | 'system' | 'reminder'
          title: string
          message: string
          priority: 'low' | 'medium' | 'high'
          is_read: boolean
          action_url?: string | null
          related_id?: string | null
          created_at: string
          read_at?: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: 'message' | 'application_update' | 'event_reminder' | 'system' | 'reminder'
          title: string
          message: string
          priority?: 'low' | 'medium' | 'high'
          is_read?: boolean
          action_url?: string | null
          related_id?: string | null
          created_at?: string
          read_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'message' | 'application_update' | 'event_reminder' | 'system' | 'reminder'
          title?: string
          message?: string
          priority?: 'low' | 'medium' | 'high'
          is_read?: boolean
          action_url?: string | null
          related_id?: string | null
          created_at?: string
          read_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          institution?: string | null
          user_type?: string | null
          phone?: string | null
          date_of_birth?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          avatar_url?: string | null
          bio?: string | null
          current_level?: string | null
          specialization?: string | null
          grade_average?: number | null
          is_active: boolean
          email_notifications: boolean
          push_notifications: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          institution?: string | null
          user_type?: string | null
          phone?: string | null
          date_of_birth?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          avatar_url?: string | null
          bio?: string | null
          current_level?: string | null
          specialization?: string | null
          grade_average?: number | null
          is_active?: boolean
          email_notifications?: boolean
          push_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          institution?: string | null
          user_type?: string | null
          phone?: string | null
          date_of_birth?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          avatar_url?: string | null
          bio?: string | null
          current_level?: string | null
          specialization?: string | null
          grade_average?: number | null
          is_active?: boolean
          email_notifications?: boolean
          push_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      resource_favorites: {
        Row: {
          id: string
          user_id: string
          resource_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          resource_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          resource_id?: string
          created_at?: string
        }
      }
      resource_ratings: {
        Row: {
          id: string
          user_id: string
          resource_id: string
          rating: number
          comment?: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          resource_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          resource_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      study_resources: {
        Row: {
          id: string
          title: string
          description?: string | null
          resource_type: 'pdf' | 'video' | 'audio' | 'image' | 'link' | 'document'
          category: string
          subject: string
          file_url?: string | null
          thumbnail_url?: string | null
          file_size?: number | null
          duration?: number | null
          download_count: number
          rating: number
          rating_count: number
          uploader_id: string
          university_id?: string | null
          formation_id?: string | null
          is_public: boolean
          is_approved: boolean
          tags?: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          resource_type: 'pdf' | 'video' | 'audio' | 'image' | 'link' | 'document'
          category: string
          subject: string
          file_url?: string | null
          thumbnail_url?: string | null
          file_size?: number | null
          duration?: number | null
          download_count?: number
          rating?: number
          rating_count?: number
          uploader_id: string
          university_id?: string | null
          formation_id?: string | null
          is_public?: boolean
          is_approved?: boolean
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          resource_type?: 'pdf' | 'video' | 'audio' | 'image' | 'link' | 'document'
          category?: string
          subject?: string
          file_url?: string | null
          thumbnail_url?: string | null
          file_size?: number | null
          duration?: number | null
          download_count?: number
          rating?: number
          rating_count?: number
          uploader_id?: string
          university_id?: string | null
          formation_id?: string | null
          is_public?: boolean
          is_approved?: boolean
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      universities: {
        Row: {
          id: string
          name: string
          description?: string | null
          city: string
          address?: string | null
          type: string
          website?: string | null
          email?: string | null
          phone?: string | null
          established_year?: number | null
          student_count: number
          rating: number
          image_url?: string | null
          logo_url?: string | null
          latitude?: number | null
          longitude?: number | null
          accreditations?: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          city: string
          address?: string | null
          type?: string
          website?: string | null
          email?: string | null
          phone?: string | null
          established_year?: number | null
          student_count?: number
          rating?: number
          image_url?: string | null
          logo_url?: string | null
          latitude?: number | null
          longitude?: number | null
          accreditations?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          city?: string
          address?: string | null
          type?: string
          website?: string | null
          email?: string | null
          phone?: string | null
          established_year?: number | null
          student_count?: number
          rating?: number
          image_url?: string | null
          logo_url?: string | null
          latitude?: number | null
          longitude?: number | null
          accreditations?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_download_count: {
        Args: {
          resource_id: string
        }
        Returns: boolean
      }
      mark_all_notifications_as_read: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      mark_notification_as_read: {
        Args: {
          notification_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      application_status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted'
      event_type: 'open_day' | 'conference' | 'webinar' | 'deadline' | 'exam' | 'interview' | 'other'
      message_status: 'sending' | 'sent' | 'delivered' | 'read'
      notification_priority: 'low' | 'medium' | 'high'
      notification_type: 'message' | 'application_update' | 'event_reminder' | 'system' | 'reminder'
      resource_type: 'pdf' | 'video' | 'audio' | 'image' | 'link' | 'document'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
