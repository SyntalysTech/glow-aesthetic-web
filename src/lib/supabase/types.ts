export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          address: string | null
          city: string | null
          postal_code: string | null
          is_admin: boolean
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          is_admin?: boolean
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          is_admin?: boolean
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      specialists: {
        Row: {
          id: string
          name: string
          role: string
          description: string | null
          image_url: string | null
          specialties: string[]
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          description?: string | null
          image_url?: string | null
          specialties?: string[]
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          description?: string | null
          image_url?: string | null
          specialties?: string[]
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      service_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          category_id: string | null
          name: string
          description: string | null
          duration_minutes: number
          price: number
          image_url: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          name: string
          description?: string | null
          duration_minutes: number
          price: number
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          name?: string
          description?: string | null
          duration_minutes?: number
          price?: number
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      service_specialists: {
        Row: {
          service_id: string
          specialist_id: string
        }
        Insert: {
          service_id: string
          specialist_id: string
        }
        Update: {
          service_id?: string
          specialist_id?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string | null
          service_id: string | null
          specialist_id: string | null
          service_name: string
          service_price: number
          specialist_name: string | null
          booking_date: string
          start_time: string
          end_time: string
          duration_minutes: number
          customer_name: string
          customer_email: string
          customer_phone: string | null
          status: BookingStatus
          notes: string | null
          admin_notes: string | null
          created_at: string
          updated_at: string
          confirmed_at: string | null
          cancelled_at: string | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          service_id?: string | null
          specialist_id?: string | null
          service_name: string
          service_price: number
          specialist_name?: string | null
          booking_date: string
          start_time: string
          end_time: string
          duration_minutes: number
          customer_name: string
          customer_email: string
          customer_phone?: string | null
          status?: BookingStatus
          notes?: string | null
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
          confirmed_at?: string | null
          cancelled_at?: string | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          service_id?: string | null
          specialist_id?: string | null
          service_name?: string
          service_price?: number
          specialist_name?: string | null
          booking_date?: string
          start_time?: string
          end_time?: string
          duration_minutes?: number
          customer_name?: string
          customer_email?: string
          customer_phone?: string | null
          status?: BookingStatus
          notes?: string | null
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
          confirmed_at?: string | null
          cancelled_at?: string | null
          completed_at?: string | null
        }
      }
      product_categories: {
        Row: {
          id: string
          name: string
          slug: string
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string | null
          name: string
          description: string | null
          price: number
          image_url: string | null
          stock_quantity: number
          is_active: boolean
          is_bestseller: boolean
          rating: number
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          stock_quantity?: number
          is_active?: boolean
          is_bestseller?: boolean
          rating?: number
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          stock_quantity?: number
          is_active?: boolean
          is_bestseller?: boolean
          rating?: number
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          order_number: string
          customer_name: string
          customer_email: string
          customer_phone: string | null
          shipping_address: string | null
          shipping_city: string | null
          shipping_postal_code: string | null
          shipping_country: string
          subtotal: number
          shipping_cost: number
          total: number
          status: OrderStatus
          notes: string | null
          admin_notes: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          paid_at: string | null
          created_at: string
          updated_at: string
          shipped_at: string | null
          delivered_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          order_number?: string
          customer_name: string
          customer_email: string
          customer_phone?: string | null
          shipping_address?: string | null
          shipping_city?: string | null
          shipping_postal_code?: string | null
          shipping_country?: string
          subtotal: number
          shipping_cost?: number
          total: number
          status?: OrderStatus
          notes?: string | null
          admin_notes?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          paid_at?: string | null
          created_at?: string
          updated_at?: string
          shipped_at?: string | null
          delivered_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          order_number?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string | null
          shipping_address?: string | null
          shipping_city?: string | null
          shipping_postal_code?: string | null
          shipping_country?: string
          subtotal?: number
          shipping_cost?: number
          total?: number
          status?: OrderStatus
          notes?: string | null
          admin_notes?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          paid_at?: string | null
          created_at?: string
          updated_at?: string
          shipped_at?: string | null
          delivered_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          product_price: number
          quantity: number
          total: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          product_name: string
          product_price: number
          quantity?: number
          total: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          product_name?: string
          product_price?: number
          quantity?: number
          total?: number
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          is_read: boolean
          is_archived: boolean
          admin_notes: string | null
          created_at: string
          read_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          is_read?: boolean
          is_archived?: boolean
          admin_notes?: string | null
          created_at?: string
          read_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          is_read?: boolean
          is_archived?: boolean
          admin_notes?: string | null
          created_at?: string
          read_at?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string | null
          booking_id: string | null
          service_id: string | null
          customer_name: string
          rating: number
          title: string | null
          content: string
          treatment_name: string | null
          is_approved: boolean
          is_featured: boolean
          created_at: string
          approved_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          booking_id?: string | null
          service_id?: string | null
          customer_name: string
          rating: number
          title?: string | null
          content: string
          treatment_name?: string | null
          is_approved?: boolean
          is_featured?: boolean
          created_at?: string
          approved_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          booking_id?: string | null
          service_id?: string | null
          customer_name?: string
          rating?: number
          title?: string | null
          content?: string
          treatment_name?: string | null
          is_approved?: boolean
          is_featured?: boolean
          created_at?: string
          approved_at?: string | null
        }
      }
    }
    Views: {
      booked_slots: {
        Row: {
          specialist_id: string | null
          booking_date: string | null
          start_time: string | null
          end_time: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_status: BookingStatus
      order_status: OrderStatus
    }
  }
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Specialist = Database['public']['Tables']['specialists']['Row']
export type ServiceCategory = Database['public']['Tables']['service_categories']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type ProductCategory = Database['public']['Tables']['product_categories']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type BookingInsert = Database['public']['Tables']['bookings']['Insert']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']
export type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert']
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert']

// Update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type BookingUpdate = Database['public']['Tables']['bookings']['Update']
export type OrderUpdate = Database['public']['Tables']['orders']['Update']
