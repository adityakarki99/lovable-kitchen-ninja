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
      credit_note_items: {
        Row: {
          created_at: string | null
          credit_note_id: number | null
          id: number
          item_id: number | null
          notes: string | null
          price: number
          quantity: number
          reason: string
          total: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credit_note_id?: number | null
          id?: never
          item_id?: number | null
          notes?: string | null
          price: number
          quantity: number
          reason: string
          total: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credit_note_id?: number | null
          id?: never
          item_id?: number | null
          notes?: string | null
          price?: number
          quantity?: number
          reason?: string
          total?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_note_items_credit_note_id_fkey"
            columns: ["credit_note_id"]
            isOneToOne: false
            referencedRelation: "credit_notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_note_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "stock_items"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_notes: {
        Row: {
          approval_date: string | null
          approver: string | null
          created_at: string | null
          credit_note_number: string
          date_issued: string
          id: number
          notes: string | null
          purchase_order_id: number | null
          status: string
          supplier_id: number | null
          supplier_ref: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          approval_date?: string | null
          approver?: string | null
          created_at?: string | null
          credit_note_number: string
          date_issued: string
          id?: never
          notes?: string | null
          purchase_order_id?: number | null
          status?: string
          supplier_id?: number | null
          supplier_ref?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          approval_date?: string | null
          approver?: string | null
          created_at?: string | null
          credit_note_number?: string
          date_issued?: string
          id?: never
          notes?: string | null
          purchase_order_id?: number | null
          status?: string
          supplier_id?: number | null
          supplier_ref?: string | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_notes_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_notes_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          created_at: string | null
          description: string
          id: number
          invoice_id: number | null
          item_id: number | null
          quantity: number
          tax_amount: number | null
          tax_rate: number | null
          total_price: number
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: never
          invoice_id?: number | null
          item_id?: number | null
          quantity: number
          tax_amount?: number | null
          tax_rate?: number | null
          total_price: number
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: never
          invoice_id?: number | null
          item_id?: number | null
          quantity?: number
          tax_amount?: number | null
          tax_rate?: number | null
          total_price?: number
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "stock_items"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_matches: {
        Row: {
          approval_date: string | null
          approval_status: string | null
          approver_id: number | null
          created_at: string | null
          id: number
          invoice_id: number | null
          match_percentage: number | null
          match_status: string
          notes: string | null
          purchase_order_id: number | null
          receiving_order_id: number | null
          updated_at: string | null
        }
        Insert: {
          approval_date?: string | null
          approval_status?: string | null
          approver_id?: number | null
          created_at?: string | null
          id?: never
          invoice_id?: number | null
          match_percentage?: number | null
          match_status?: string
          notes?: string | null
          purchase_order_id?: number | null
          receiving_order_id?: number | null
          updated_at?: string | null
        }
        Update: {
          approval_date?: string | null
          approval_status?: string | null
          approver_id?: number | null
          created_at?: string | null
          id?: never
          invoice_id?: number | null
          match_percentage?: number | null
          match_status?: string
          notes?: string | null
          purchase_order_id?: number | null
          receiving_order_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_matches_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_matches_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_matches_receiving_order_id_fkey"
            columns: ["receiving_order_id"]
            isOneToOne: false
            referencedRelation: "receiving_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          date_due: string | null
          date_issued: string
          id: number
          invoice_number: string
          notes: string | null
          payment_status: string | null
          payment_terms: string | null
          purchase_order_id: number | null
          status: string
          subtotal: number
          supplier_id: number | null
          supplier_ref: string | null
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_due?: string | null
          date_issued: string
          id?: never
          invoice_number: string
          notes?: string | null
          payment_status?: string | null
          payment_terms?: string | null
          purchase_order_id?: number | null
          status?: string
          subtotal: number
          supplier_id?: number | null
          supplier_ref?: string | null
          tax_amount?: number | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_due?: string | null
          date_issued?: string
          id?: never
          invoice_number?: string
          notes?: string | null
          payment_status?: string | null
          payment_terms?: string | null
          purchase_order_id?: number | null
          status?: string
          subtotal?: number
          supplier_id?: number | null
          supplier_ref?: string | null
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      match_discrepancies: {
        Row: {
          actual_value: string
          created_at: string | null
          difference_amount: number | null
          discrepancy_type: string
          expected_value: string
          id: number
          item_id: number | null
          match_id: number | null
          resolution: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          actual_value: string
          created_at?: string | null
          difference_amount?: number | null
          discrepancy_type: string
          expected_value: string
          id?: never
          item_id?: number | null
          match_id?: number | null
          resolution?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_value?: string
          created_at?: string | null
          difference_amount?: number | null
          discrepancy_type?: string
          expected_value?: string
          id?: never
          item_id?: number | null
          match_id?: number | null
          resolution?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_discrepancies_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "stock_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_discrepancies_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "invoice_matches"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_order_items: {
        Row: {
          created_at: string | null
          id: number
          item_id: number | null
          price: number
          purchase_order_id: number | null
          quantity: number
          total: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          item_id?: number | null
          price: number
          purchase_order_id?: number | null
          quantity: number
          total: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          item_id?: number | null
          price?: number
          purchase_order_id?: number | null
          quantity?: number
          total?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "stock_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          budget_impact: number | null
          created_at: string | null
          date_delivery: string | null
          date_ordered: string
          id: number
          notes: string | null
          payment_terms: string | null
          requestor: string | null
          status: string | null
          supplier_id: number | null
          total_amount: number
          updated_at: string | null
          urgency: string | null
        }
        Insert: {
          budget_impact?: number | null
          created_at?: string | null
          date_delivery?: string | null
          date_ordered: string
          id?: never
          notes?: string | null
          payment_terms?: string | null
          requestor?: string | null
          status?: string | null
          supplier_id?: number | null
          total_amount: number
          updated_at?: string | null
          urgency?: string | null
        }
        Update: {
          budget_impact?: number | null
          created_at?: string | null
          date_delivery?: string | null
          date_ordered?: string
          id?: never
          notes?: string | null
          payment_terms?: string | null
          requestor?: string | null
          status?: string | null
          supplier_id?: number | null
          total_amount?: number
          updated_at?: string | null
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      receiving_order_items: {
        Row: {
          condition: string | null
          created_at: string | null
          id: number
          item_id: number | null
          notes: string | null
          quantity_received: number
          receiving_order_id: number | null
          updated_at: string | null
        }
        Insert: {
          condition?: string | null
          created_at?: string | null
          id?: never
          item_id?: number | null
          notes?: string | null
          quantity_received: number
          receiving_order_id?: number | null
          updated_at?: string | null
        }
        Update: {
          condition?: string | null
          created_at?: string | null
          id?: never
          item_id?: number | null
          notes?: string | null
          quantity_received?: number
          receiving_order_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "receiving_order_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "stock_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receiving_order_items_receiving_order_id_fkey"
            columns: ["receiving_order_id"]
            isOneToOne: false
            referencedRelation: "receiving_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      receiving_orders: {
        Row: {
          condition: string | null
          created_at: string | null
          date_received: string
          id: number
          notes: string | null
          purchase_order_id: number | null
          received_by: string
          updated_at: string | null
        }
        Insert: {
          condition?: string | null
          created_at?: string | null
          date_received: string
          id?: never
          notes?: string | null
          purchase_order_id?: number | null
          received_by: string
          updated_at?: string | null
        }
        Update: {
          condition?: string | null
          created_at?: string | null
          date_received?: string
          id?: never
          notes?: string | null
          purchase_order_id?: number | null
          received_by?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "receiving_orders_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      scanned_invoices: {
        Row: {
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: number
          invoice_id: number | null
          manual_review_notes: string | null
          manual_review_required: boolean | null
          ocr_confidence: number | null
          ocr_raw_text: string | null
          ocr_service: string | null
          scan_status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: never
          invoice_id?: number | null
          manual_review_notes?: string | null
          manual_review_required?: boolean | null
          ocr_confidence?: number | null
          ocr_raw_text?: string | null
          ocr_service?: string | null
          scan_status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: never
          invoice_id?: number | null
          manual_review_notes?: string | null
          manual_review_required?: boolean | null
          ocr_confidence?: number | null
          ocr_raw_text?: string | null
          ocr_service?: string | null
          scan_status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scanned_invoices_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_order_items: {
        Row: {
          created_at: string | null
          id: number
          item_id: number | null
          price: number
          quantity: number
          scheduled_order_id: number | null
          total: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          item_id?: number | null
          price: number
          quantity: number
          scheduled_order_id?: number | null
          total: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          item_id?: number | null
          price?: number
          quantity?: number
          scheduled_order_id?: number | null
          total?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_order_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "stock_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_order_items_scheduled_order_id_fkey"
            columns: ["scheduled_order_id"]
            isOneToOne: false
            referencedRelation: "scheduled_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_orders: {
        Row: {
          created_at: string | null
          cutoff_date: string
          id: number
          next_occurrence: string | null
          notes: string | null
          order_number: string
          recurring: string | null
          rejection_reason: string | null
          requestor: string
          scheduled_date: string
          status: string
          supplier_id: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          cutoff_date: string
          id?: never
          next_occurrence?: string | null
          notes?: string | null
          order_number: string
          recurring?: string | null
          rejection_reason?: string | null
          requestor: string
          scheduled_date: string
          status: string
          supplier_id?: number | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          cutoff_date?: string
          id?: never
          next_occurrence?: string | null
          notes?: string | null
          order_number?: string
          recurring?: string | null
          rejection_reason?: string | null
          requestor?: string
          scheduled_date?: string
          status?: string
          supplier_id?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_items: {
        Row: {
          category: string | null
          created_at: string | null
          current_stock: number | null
          id: number
          image_url: string | null
          is_critical: boolean | null
          item_code: string | null
          last_ordered_price: number | null
          location: string | null
          name: string
          par_level: number | null
          suggested_par: number | null
          supplier_id: number | null
          unit: string | null
          updated_at: string | null
          volatility: string | null
          weekly_usage: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          current_stock?: number | null
          id?: never
          image_url?: string | null
          is_critical?: boolean | null
          item_code?: string | null
          last_ordered_price?: number | null
          location?: string | null
          name: string
          par_level?: number | null
          suggested_par?: number | null
          supplier_id?: number | null
          unit?: string | null
          updated_at?: string | null
          volatility?: string | null
          weekly_usage?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          current_stock?: number | null
          id?: never
          image_url?: string | null
          is_critical?: boolean | null
          item_code?: string | null
          last_ordered_price?: number | null
          location?: string | null
          name?: string
          par_level?: number | null
          suggested_par?: number | null
          supplier_id?: number | null
          unit?: string | null
          updated_at?: string | null
          volatility?: string | null
          weekly_usage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_items_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          account_manager: string | null
          address: string | null
          categories: string[] | null
          created_at: string | null
          delivery_schedule: string | null
          email: string | null
          id: number
          lead_time: number | null
          logo_url: string | null
          minimum_order: number | null
          name: string
          on_time_delivery: number | null
          payment_terms: string | null
          phone: string | null
          quality_rating: number | null
          supplier_code: string | null
          updated_at: string | null
        }
        Insert: {
          account_manager?: string | null
          address?: string | null
          categories?: string[] | null
          created_at?: string | null
          delivery_schedule?: string | null
          email?: string | null
          id?: never
          lead_time?: number | null
          logo_url?: string | null
          minimum_order?: number | null
          name: string
          on_time_delivery?: number | null
          payment_terms?: string | null
          phone?: string | null
          quality_rating?: number | null
          supplier_code?: string | null
          updated_at?: string | null
        }
        Update: {
          account_manager?: string | null
          address?: string | null
          categories?: string[] | null
          created_at?: string | null
          delivery_schedule?: string | null
          email?: string | null
          id?: never
          lead_time?: number | null
          logo_url?: string | null
          minimum_order?: number | null
          name?: string
          on_time_delivery?: number | null
          payment_terms?: string | null
          phone?: string | null
          quality_rating?: number | null
          supplier_code?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      test_table: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
