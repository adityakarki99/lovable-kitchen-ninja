
import { supabase } from "@/integrations/supabase/client";

export interface PurchaseOrderItem {
  id?: number;
  purchase_order_id?: number;
  item_id: number;
  quantity: number;
  price: number;
  total: number;
  item?: any; // Add this to support joined queries
}

export interface PurchaseOrder {
  id?: number;
  supplier_id: number;
  date_ordered: string;
  date_delivery?: string;
  payment_terms?: string;
  status: string; // Changed from enum to string to match DB
  requestor?: string;
  urgency?: string;
  total_amount: number;
  budget_impact?: number;
  notes?: string;
  items?: PurchaseOrderItem[];
  supplier?: any; // Add this to support joined queries
}

/**
 * Fetch all purchase orders from the database
 */
export const getPurchaseOrders = async (): Promise<{ success: boolean; data?: PurchaseOrder[]; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('purchase_orders')
      .select(`
        *,
        supplier:supplier_id (*)
      `)
      .order('date_ordered', { ascending: false });
    
    if (error) {
      console.error('Error fetching purchase orders:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error fetching purchase orders:', error);
    return { success: false, error };
  }
};

/**
 * Fetch a single purchase order by ID, including its items
 */
export const getPurchaseOrderById = async (id: number | string): Promise<{ success: boolean; data?: PurchaseOrder & { items: PurchaseOrderItem[] }; error?: any }> => {
  try {
    // Convert id to number if it's a string
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    // Fetch the purchase order
    const { data: purchaseOrder, error } = await supabase
      .from('purchase_orders')
      .select(`
        *,
        supplier:supplier_id (*)
      `)
      .eq('id', numericId)
      .single();
    
    if (error) {
      console.error(`Error fetching purchase order ${id}:`, error);
      return { success: false, error };
    }

    // Fetch the purchase order items
    const { data: items, error: itemsError } = await supabase
      .from('purchase_order_items')
      .select(`
        *,
        item:item_id (*)
      `)
      .eq('purchase_order_id', numericId);
    
    if (itemsError) {
      console.error(`Error fetching items for purchase order ${id}:`, itemsError);
      return { success: false, error: itemsError };
    }

    return { 
      success: true, 
      data: { 
        ...purchaseOrder,
        items: items || []
      } 
    };
  } catch (error) {
    console.error(`Unexpected error fetching purchase order ${id}:`, error);
    return { success: false, error };
  }
};
