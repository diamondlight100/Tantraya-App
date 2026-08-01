export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      booking_types: {
        Row: {
          active: boolean;
          created_at: string;
          description: string | null;
          duration_minutes: number;
          id: string;
          name: string;
          price_cents: number;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          description?: string | null;
          duration_minutes?: number;
          id?: string;
          name: string;
          price_cents?: number;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          description?: string | null;
          duration_minutes?: number;
          id?: string;
          name?: string;
          price_cents?: number;
        };
        Relationships: [];
      };
      bookings: {
        Row: {
          booking_type_id: string | null;
          created_at: string;
          duration_minutes: number;
          id: string;
          notes: string | null;
          scheduled_at: string;
          status: string;
          user_id: string;
        };
        Insert: {
          booking_type_id?: string | null;
          created_at?: string;
          duration_minutes?: number;
          id?: string;
          notes?: string | null;
          scheduled_at: string;
          status?: string;
          user_id: string;
        };
        Update: {
          booking_type_id?: string | null;
          created_at?: string;
          duration_minutes?: number;
          id?: string;
          notes?: string | null;
          scheduled_at?: string;
          status?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      courses: {
        Row: {
          cover_url: string | null;
          created_at: string;
          description: string | null;
          group_id: string | null;
          id: string;
          is_free: boolean;
          pathway: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic";
          price_cents: number | null;
          published: boolean;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          cover_url?: string | null;
          created_at?: string;
          description?: string | null;
          group_id?: string | null;
          id?: string;
          is_free?: boolean;
          pathway?: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic";
          price_cents?: number | null;
          published?: boolean;
          slug: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          cover_url?: string | null;
          created_at?: string;
          description?: string | null;
          group_id?: string | null;
          id?: string;
          is_free?: boolean;
          pathway?: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic";
          price_cents?: number | null;
          published?: boolean;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      dream_entries: {
        Row: {
          audio_path: string | null;
          content: string | null;
          created_at: string;
          id: string;
          title: string | null;
          user_id: string;
        };
        Insert: {
          audio_path?: string | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          title?: string | null;
          user_id: string;
        };
        Update: {
          audio_path?: string | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          title?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      dream_signs: {
        Row: {
          category: string;
          created_at: string;
          dream_entry_id: string;
          id: string;
          phrase: string;
          user_id: string;
        };
        Insert: {
          category?: string;
          created_at?: string;
          dream_entry_id: string;
          id?: string;
          phrase: string;
          user_id: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          dream_entry_id?: string;
          id?: string;
          phrase?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      duat_games: {
        Row: {
          code: string;
          created_at: string;
          guest_id: string | null;
          host_id: string;
          host_team: string;
          id: string;
          state: Json;
          status: string;
          updated_at: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          guest_id?: string | null;
          host_id: string;
          host_team?: string;
          id?: string;
          state: Json;
          status?: string;
          updated_at?: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          guest_id?: string | null;
          host_id?: string;
          host_team?: string;
          id?: string;
          state?: Json;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      duat_unlocks: {
        Row: {
          unlocked_at: string;
          user_id: string;
        };
        Insert: {
          unlocked_at?: string;
          user_id: string;
        };
        Update: {
          unlocked_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      enrollments: {
        Row: {
          course_id: string;
          enrolled_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          course_id: string;
          enrolled_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          course_id?: string;
          enrolled_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          author_id: string;
          cover_image_url: string | null;
          created_at: string;
          description: string | null;
          ends_at: string | null;
          external_url: string | null;
          id: string;
          is_online: boolean;
          kind: string;
          location: string | null;
          published: boolean;
          starts_at: string;
          summary: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          cover_image_url?: string | null;
          created_at?: string;
          description?: string | null;
          ends_at?: string | null;
          external_url?: string | null;
          id?: string;
          is_online?: boolean;
          kind?: string;
          location?: string | null;
          published?: boolean;
          starts_at: string;
          summary?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string;
          cover_image_url?: string | null;
          created_at?: string;
          description?: string | null;
          ends_at?: string | null;
          external_url?: string | null;
          id?: string;
          is_online?: boolean;
          kind?: string;
          location?: string | null;
          published?: boolean;
          starts_at?: string;
          summary?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      forum_categories: {
        Row: {
          created_at: string;
          description: string | null;
          group_id: string | null;
          id: string;
          name: string;
          pathway: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic" | null;
          slug: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          group_id?: string | null;
          id?: string;
          name: string;
          pathway?: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic" | null;
          slug: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          group_id?: string | null;
          id?: string;
          name?: string;
          pathway?: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic" | null;
          slug?: string;
        };
        Relationships: [];
      };
      forum_posts: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          thread_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          id?: string;
          thread_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          thread_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      forum_threads: {
        Row: {
          body: string;
          category_id: string;
          created_at: string;
          id: string;
          pinned: boolean;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          body?: string;
          category_id: string;
          created_at?: string;
          id?: string;
          pinned?: boolean;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          body?: string;
          category_id?: string;
          created_at?: string;
          id?: string;
          pinned?: boolean;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      group_members: {
        Row: {
          group_id: string;
          id: string;
          joined_at: string;
          user_id: string;
        };
        Insert: {
          group_id: string;
          id?: string;
          joined_at?: string;
          user_id: string;
        };
        Update: {
          group_id?: string;
          id?: string;
          joined_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      homework_assignments: {
        Row: {
          alchemy_marks: number;
          attachment_url: string | null;
          audio_url: string | null;
          course_slug: string | null;
          created_at: string;
          created_by: string;
          due_at: string | null;
          group_id: string | null;
          id: string;
          instructions: string | null;
          max_points: number;
          pathway: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic" | null;
          practice_slug: string | null;
          published: boolean;
          questions: Json;
          response_type: string;
          target_minutes: number | null;
          target_reps: number | null;
          title: string;
          updated_at: string;
          video_url: string | null;
        };
        Insert: {
          alchemy_marks?: number;
          attachment_url?: string | null;
          audio_url?: string | null;
          course_slug?: string | null;
          created_at?: string;
          created_by: string;
          due_at?: string | null;
          group_id?: string | null;
          id?: string;
          instructions?: string | null;
          max_points?: number;
          pathway?: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic" | null;
          practice_slug?: string | null;
          published?: boolean;
          questions: Json;
          response_type?: string;
          target_minutes?: number | null;
          target_reps?: number | null;
          title: string;
          updated_at?: string;
          video_url?: string | null;
        };
        Update: {
          alchemy_marks?: number;
          attachment_url?: string | null;
          audio_url?: string | null;
          course_slug?: string | null;
          created_at?: string;
          created_by?: string;
          due_at?: string | null;
          group_id?: string | null;
          id?: string;
          instructions?: string | null;
          max_points?: number;
          pathway?: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic" | null;
          practice_slug?: string | null;
          published?: boolean;
          questions?: Json;
          response_type?: string;
          target_minutes?: number | null;
          target_reps?: number | null;
          title?: string;
          updated_at?: string;
          video_url?: string | null;
        };
        Relationships: [];
      };
      homework_submissions: {
        Row: {
          alchemy_marks_awarded: number | null;
          answers: Json;
          assignment_id: string;
          attachments: Json;
          audio_url: string | null;
          created_at: string;
          feedback: string | null;
          feedback_video_url: string | null;
          graded_at: string | null;
          graded_by: string | null;
          id: string;
          points_awarded: number | null;
          practice_minutes_logged: number | null;
          practice_reps_logged: number | null;
          shared: boolean;
          status: string;
          student_id: string;
          submitted_at: string | null;
          updated_at: string;
          video_url: string | null;
          written_response: string | null;
        };
        Insert: {
          alchemy_marks_awarded?: number | null;
          answers: Json;
          assignment_id: string;
          attachments: Json;
          audio_url?: string | null;
          created_at?: string;
          feedback?: string | null;
          feedback_video_url?: string | null;
          graded_at?: string | null;
          graded_by?: string | null;
          id?: string;
          points_awarded?: number | null;
          practice_minutes_logged?: number | null;
          practice_reps_logged?: number | null;
          shared?: boolean;
          status?: string;
          student_id: string;
          submitted_at?: string | null;
          updated_at?: string;
          video_url?: string | null;
          written_response?: string | null;
        };
        Update: {
          alchemy_marks_awarded?: number | null;
          answers?: Json;
          assignment_id?: string;
          attachments?: Json;
          audio_url?: string | null;
          created_at?: string;
          feedback?: string | null;
          feedback_video_url?: string | null;
          graded_at?: string | null;
          graded_by?: string | null;
          id?: string;
          points_awarded?: number | null;
          practice_minutes_logged?: number | null;
          practice_reps_logged?: number | null;
          shared?: boolean;
          status?: string;
          student_id?: string;
          submitted_at?: string | null;
          updated_at?: string;
          video_url?: string | null;
          written_response?: string | null;
        };
        Relationships: [];
      };
      journal_entries: {
        Row: {
          content: string;
          course_slug: string | null;
          created_at: string;
          diet: string | null;
          energy_level: number | null;
          goals: string | null;
          hydration: number | null;
          id: string;
          lesson_slug: string | null;
          mental_clarity: number | null;
          mood: number | null;
          moon_phase: string | null;
          pathway: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic" | null;
          practice_minutes: number | null;
          reflection_prompt: string | null;
          sleep_hours: number | null;
          sleep_quality: number | null;
          stress_level: number | null;
          title: string | null;
          updated_at: string;
          user_id: string;
          weather: string | null;
        };
        Insert: {
          content?: string;
          course_slug?: string | null;
          created_at?: string;
          diet?: string | null;
          energy_level?: number | null;
          goals?: string | null;
          hydration?: number | null;
          id?: string;
          lesson_slug?: string | null;
          mental_clarity?: number | null;
          mood?: number | null;
          moon_phase?: string | null;
          pathway?: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic" | null;
          practice_minutes?: number | null;
          reflection_prompt?: string | null;
          sleep_hours?: number | null;
          sleep_quality?: number | null;
          stress_level?: number | null;
          title?: string | null;
          updated_at?: string;
          user_id: string;
          weather?: string | null;
        };
        Update: {
          content?: string;
          course_slug?: string | null;
          created_at?: string;
          diet?: string | null;
          energy_level?: number | null;
          goals?: string | null;
          hydration?: number | null;
          id?: string;
          lesson_slug?: string | null;
          mental_clarity?: number | null;
          mood?: number | null;
          moon_phase?: string | null;
          pathway?: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic" | null;
          practice_minutes?: number | null;
          reflection_prompt?: string | null;
          sleep_hours?: number | null;
          sleep_quality?: number | null;
          stress_level?: number | null;
          title?: string | null;
          updated_at?: string;
          user_id?: string;
          weather?: string | null;
        };
        Relationships: [];
      };
      karma_logs: {
        Row: {
          created_at: string;
          id: string;
          karma_points: number;
          note: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          karma_points?: number;
          note?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          karma_points?: number;
          note?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      lessons: {
        Row: {
          content: string | null;
          course_id: string;
          created_at: string;
          id: string;
          lesson_type: "audio" | "text" | "video";
          media_url: string | null;
          position: number;
          release_at: string | null;
          title: string;
        };
        Insert: {
          content?: string | null;
          course_id: string;
          created_at?: string;
          id?: string;
          lesson_type?: "audio" | "text" | "video";
          media_url?: string | null;
          position?: number;
          release_at?: string | null;
          title: string;
        };
        Update: {
          content?: string | null;
          course_id?: string;
          created_at?: string;
          id?: string;
          lesson_type?: "audio" | "text" | "video";
          media_url?: string | null;
          position?: number;
          release_at?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      library_highlights: {
        Row: {
          areas: Json | null;
          color: string;
          created_at: string;
          id: string;
          item_id: string | null;
          material_id: string | null;
          note: string | null;
          page_index: number;
          quote: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          areas?: Json | null;
          color?: string;
          created_at?: string;
          id?: string;
          item_id?: string | null;
          material_id?: string | null;
          note?: string | null;
          page_index?: number;
          quote: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          areas?: Json | null;
          color?: string;
          created_at?: string;
          id?: string;
          item_id?: string | null;
          material_id?: string | null;
          note?: string | null;
          page_index?: number;
          quote?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      library_items: {
        Row: {
          author_id: string;
          book_author: string | null;
          created_at: string;
          description: string | null;
          external_url: string | null;
          file_size: number | null;
          format: string;
          id: string;
          media_path: string | null;
          published: boolean;
          section: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          book_author?: string | null;
          created_at?: string;
          description?: string | null;
          external_url?: string | null;
          file_size?: number | null;
          format: string;
          id?: string;
          media_path?: string | null;
          published?: boolean;
          section?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string;
          book_author?: string | null;
          created_at?: string;
          description?: string | null;
          external_url?: string | null;
          file_size?: number | null;
          format?: string;
          id?: string;
          media_path?: string | null;
          published?: boolean;
          section?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      love_notes: {
        Row: {
          created_at: string;
          display_name: string | null;
          id: string;
          note: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          id?: string;
          note: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          id?: string;
          note?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      mala_counts: {
        Row: {
          count: number;
          count_date: string;
          id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          count?: number;
          count_date?: string;
          id?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          count?: number;
          count_date?: string;
          id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      mantra_recordings: {
        Row: {
          audio_path: string;
          created_at: string;
          id: string;
          is_reference: boolean;
          mantra_key: string;
          user_id: string;
        };
        Insert: {
          audio_path: string;
          created_at?: string;
          id?: string;
          is_reference?: boolean;
          mantra_key: string;
          user_id: string;
        };
        Update: {
          audio_path?: string;
          created_at?: string;
          id?: string;
          is_reference?: boolean;
          mantra_key?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      material_folders: {
        Row: {
          author_id: string;
          created_at: string;
          id: string;
          name: string;
          pathway: string | null;
        };
        Insert: {
          author_id: string;
          created_at?: string;
          id?: string;
          name: string;
          pathway?: string | null;
        };
        Update: {
          author_id?: string;
          created_at?: string;
          id?: string;
          name?: string;
          pathway?: string | null;
        };
        Relationships: [];
      };
      materials: {
        Row: {
          author_id: string;
          body: string | null;
          course_slug: string | null;
          created_at: string;
          description: string | null;
          display_order: number | null;
          external_url: string | null;
          folder_id: string | null;
          format: string;
          group_id: string | null;
          id: string;
          media_path: string | null;
          pathway: string;
          published: boolean;
          title: string;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          body?: string | null;
          course_slug?: string | null;
          created_at?: string;
          description?: string | null;
          display_order?: number | null;
          external_url?: string | null;
          folder_id?: string | null;
          format: string;
          group_id?: string | null;
          id?: string;
          media_path?: string | null;
          pathway?: string;
          published?: boolean;
          title: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string;
          body?: string | null;
          course_slug?: string | null;
          created_at?: string;
          description?: string | null;
          display_order?: number | null;
          external_url?: string | null;
          folder_id?: string | null;
          format?: string;
          group_id?: string | null;
          id?: string;
          media_path?: string | null;
          pathway?: string;
          published?: boolean;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      notification_preferences: {
        Row: {
          forum_notifications_enabled: boolean;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          forum_notifications_enabled?: boolean;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          forum_notifications_enabled?: boolean;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          body: string | null;
          created_at: string;
          id: string;
          link_to: string | null;
          read: boolean;
          title: string;
          type: string;
          user_id: string;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          id?: string;
          link_to?: string | null;
          read?: boolean;
          title: string;
          type: string;
          user_id: string;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          id?: string;
          link_to?: string | null;
          read?: boolean;
          title?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      personal_altar_images: {
        Row: {
          created_at: string;
          display_order: number | null;
          id: string;
          media_path: string;
          title: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          display_order?: number | null;
          id?: string;
          media_path: string;
          title: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          display_order?: number | null;
          id?: string;
          media_path?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      personal_tree_items: {
        Row: {
          body: string | null;
          created_at: string;
          display_order: number | null;
          external_url: string | null;
          format: string;
          id: string;
          media_path: string | null;
          sephirah: string;
          title: string;
          user_id: string;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          display_order?: number | null;
          external_url?: string | null;
          format: string;
          id?: string;
          media_path?: string | null;
          sephirah: string;
          title: string;
          user_id: string;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          display_order?: number | null;
          external_url?: string | null;
          format?: string;
          id?: string;
          media_path?: string | null;
          sephirah?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      practice_logs: {
        Row: {
          body_layer: "emotional" | "etheric" | "general" | "mental" | "physical" | null;
          completed: boolean;
          created_at: string;
          id: string;
          log_date: string;
          minutes: number | null;
          notes: string | null;
          practice_id: string;
          user_id: string;
        };
        Insert: {
          body_layer?: "emotional" | "etheric" | "general" | "mental" | "physical" | null;
          completed?: boolean;
          created_at?: string;
          id?: string;
          log_date?: string;
          minutes?: number | null;
          notes?: string | null;
          practice_id: string;
          user_id: string;
        };
        Update: {
          body_layer?: "emotional" | "etheric" | "general" | "mental" | "physical" | null;
          completed?: boolean;
          created_at?: string;
          id?: string;
          log_date?: string;
          minutes?: number | null;
          notes?: string | null;
          practice_id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      practices: {
        Row: {
          active: boolean;
          body_layer: "emotional" | "etheric" | "general" | "mental" | "physical";
          course_slug: string | null;
          created_at: string;
          days_of_week: number[] | null;
          description: string | null;
          icon: string | null;
          id: string;
          lesson_slug: string | null;
          material_id: string | null;
          name: string;
          pathway: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic" | null;
          preferred_time: string | null;
          removed_at: string | null;
          target_minutes: number | null;
          user_id: string;
        };
        Insert: {
          active?: boolean;
          body_layer?: "emotional" | "etheric" | "general" | "mental" | "physical";
          course_slug?: string | null;
          created_at?: string;
          days_of_week?: number[] | null;
          description?: string | null;
          icon?: string | null;
          id?: string;
          lesson_slug?: string | null;
          material_id?: string | null;
          name: string;
          pathway?: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic" | null;
          preferred_time?: string | null;
          removed_at?: string | null;
          target_minutes?: number | null;
          user_id: string;
        };
        Update: {
          active?: boolean;
          body_layer?: "emotional" | "etheric" | "general" | "mental" | "physical";
          course_slug?: string | null;
          created_at?: string;
          days_of_week?: number[] | null;
          description?: string | null;
          icon?: string | null;
          id?: string;
          lesson_slug?: string | null;
          material_id?: string | null;
          name?: string;
          pathway?: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic" | null;
          preferred_time?: string | null;
          removed_at?: string | null;
          target_minutes?: number | null;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          display_name: string | null;
          flair: string | null;
          id: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          flair?: string | null;
          id: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          flair?: string | null;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      student_awards: {
        Row: {
          alchemy_marks: number;
          awarded_by: string | null;
          color: string | null;
          created_at: string;
          description: string | null;
          icon: string | null;
          id: string;
          student_id: string;
          submission_id: string | null;
          title: string;
        };
        Insert: {
          alchemy_marks?: number;
          awarded_by?: string | null;
          color?: string | null;
          created_at?: string;
          description?: string | null;
          icon?: string | null;
          id?: string;
          student_id: string;
          submission_id?: string | null;
          title: string;
        };
        Update: {
          alchemy_marks?: number;
          awarded_by?: string | null;
          color?: string | null;
          created_at?: string;
          description?: string | null;
          icon?: string | null;
          id?: string;
          student_id?: string;
          submission_id?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      student_groups: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: string;
          role: "admin" | "student" | "teacher";
          user_id: string;
        };
        Insert: {
          id?: string;
          role: "admin" | "student" | "teacher";
          user_id: string;
        };
        Update: {
          id?: string;
          role?: "admin" | "student" | "teacher";
          user_id?: string;
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
      app_role: "admin" | "student" | "teacher";
      body_layer: "emotional" | "etheric" | "general" | "mental" | "physical";
      lesson_type: "audio" | "text" | "video";
      pathway: "bhakti" | "buddhist" | "daoist" | "general" | "magick" | "medicine" | "tantric" | "yogic";
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student", "teacher"],
      body_layer: ["emotional", "etheric", "general", "mental", "physical"],
      lesson_type: ["audio", "text", "video"],
      pathway: ["bhakti", "buddhist", "daoist", "general", "magick", "medicine", "tantric", "yogic"],
    },
  },
} as const;
