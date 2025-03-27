
import { supabase } from "@/integrations/supabase/client";

export interface StockItem {
  id: number;
  item_code?: string;
  name: string;
  category?: string;
  unit?: string;
  par_level?: number;
  current_stock?: number;
  last_ordered_price?: number;
  supplier_id?: number;
  location?: string;
  image_url?: string;
  weekly_usage?: number;
  volatility?: string;
  suggested_par?: number;
  is_critical?: boolean;
  supplier?: any; // Add this to support joined queries
}

/**
 * Fetch all stock items from the database
 */
export const getStockItems = async (): Promise<{ success: boolean; data?: StockItem[]; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('stock_items')
      .select(`
        *,
        supplier:supplier_id (id, name)
      `)
      .order('name');
    
    if (error) {
      console.error('Error fetching stock items:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error fetching stock items:', error);
    return { success: false, error };
  }
};

/**
 * Fetch a single stock item by ID
 */
export const getStockItemById = async (id: number | string): Promise<{ success: boolean; data?: StockItem; error?: any }> => {
  try {
    // Convert id to number if it's a string
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    const { data, error } = await supabase
      .from('stock_items')
      .select(`
        *,
        supplier:supplier_id (id, name)
      `)
      .eq('id', numericId)
      .single();
    
    if (error) {
      console.error(`Error fetching stock item ${id}:`, error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`Unexpected error fetching stock item ${id}:`, error);
    return { success: false, error };
  }
};
