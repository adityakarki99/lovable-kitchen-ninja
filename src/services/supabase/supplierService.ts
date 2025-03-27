
import { supabase } from "@/integrations/supabase/client";

export interface Supplier {
  id: number;
  supplier_code?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  payment_terms?: string;
  account_manager?: string;
  minimum_order?: number;
  delivery_schedule?: string;
  lead_time?: number;
  logo_url?: string;
  quality_rating?: number;
  on_time_delivery?: number;
  categories?: string[];
}

/**
 * Fetch all suppliers from the database
 */
export const getSuppliers = async (): Promise<{ success: boolean; data?: Supplier[]; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching suppliers:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error fetching suppliers:', error);
    return { success: false, error };
  }
};

/**
 * Fetch a single supplier by ID
 */
export const getSupplierById = async (id: string): Promise<{ success: boolean; data?: Supplier; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching supplier ${id}:`, error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`Unexpected error fetching supplier ${id}:`, error);
    return { success: false, error };
  }
};
