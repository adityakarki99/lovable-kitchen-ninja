
import { supabase } from "@/integrations/supabase/client";
import { CreditNoteFormValues } from "@/components/procurement/creditNote/creditNoteSchema";
import { CreditNoteReason } from "@/data/procurement/creditNotes";

export interface CreditNoteItem {
  id?: number;
  credit_note_id?: number;
  item_id: number;
  quantity: number;
  price: number;
  total: number;
  reason: CreditNoteReason;
  notes?: string;
  item?: any; // Add this to support joined queries
}

export interface CreditNote {
  id?: number;
  credit_note_number: string;
  purchase_order_id: number;
  supplier_id?: number;
  date_issued: string;
  supplier_ref: string;
  total_amount: number;
  status: string; // Changed from enum to string to match DB
  approver?: string;
  approval_date?: string;
  notes?: string;
  items?: CreditNoteItem[];
  purchase_order?: any; // Add this to support joined queries
}

/**
 * Create a new credit note in the database
 */
export const createCreditNote = async (formData: CreditNoteFormValues): Promise<{ success: boolean; data?: CreditNote; error?: any }> => {
  try {
    // 1. First, get the supplier ID from the purchase order
    const purchaseOrderId = parseInt(formData.purchaseOrderId, 10);
    const { data: purchaseOrder, error: poError } = await supabase
      .from('purchase_orders')
      .select('supplier_id')
      .eq('id', purchaseOrderId)
      .single();
    
    if (poError) {
      console.error('Error fetching purchase order:', poError);
      return { success: false, error: poError };
    }

    // 2. Calculate total amount
    const totalAmount = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 3. Generate a credit note number
    const creditNoteNumber = `CN-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    // 4. Create the credit note
    const { data, error } = await supabase
      .from('credit_notes')
      .insert({
        credit_note_number: creditNoteNumber,
        purchase_order_id: purchaseOrderId,
        supplier_id: purchaseOrder.supplier_id,
        date_issued: new Date().toISOString(),
        supplier_ref: formData.supplierRef,
        total_amount: totalAmount,
        status: 'Pending',
        notes: formData.notes
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating credit note:', error);
      return { success: false, error };
    }

    // 5. Create the credit note items
    const creditNoteItems = formData.items.map(item => ({
      credit_note_id: data.id,
      item_id: parseInt(item.itemId, 10),
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
      reason: item.reason,
      notes: item.notes
    }));

    const { error: itemsError } = await supabase
      .from('credit_note_items')
      .insert(creditNoteItems);
    
    if (itemsError) {
      console.error('Error creating credit note items:', itemsError);
      // If we fail to insert items, we should ideally rollback the credit note
      // However, for simplicity, we'll just return the error
      return { success: false, error: itemsError };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error creating credit note:', error);
    return { success: false, error };
  }
};

/**
 * Fetch all credit notes from the database
 */
export const getCreditNotes = async (): Promise<{ success: boolean; data?: CreditNote[]; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('credit_notes')
      .select(`
        *,
        purchase_order:purchase_order_id (id)
      `)
      .order('date_issued', { ascending: false });
    
    if (error) {
      console.error('Error fetching credit notes:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error fetching credit notes:', error);
    return { success: false, error };
  }
};

/**
 * Fetch a single credit note by ID, including its items
 */
export const getCreditNoteById = async (id: number | string): Promise<{ success: boolean; data?: CreditNote & { items: CreditNoteItem[] }; error?: any }> => {
  try {
    // Convert id to number if it's a string
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    // Fetch the credit note
    const { data: creditNote, error } = await supabase
      .from('credit_notes')
      .select(`
        *,
        purchase_order:purchase_order_id (*)
      `)
      .eq('id', numericId)
      .single();
    
    if (error) {
      console.error(`Error fetching credit note ${id}:`, error);
      return { success: false, error };
    }

    // Fetch the credit note items
    const { data: items, error: itemsError } = await supabase
      .from('credit_note_items')
      .select(`
        *,
        item:item_id (*)
      `)
      .eq('credit_note_id', numericId);
    
    if (itemsError) {
      console.error(`Error fetching items for credit note ${id}:`, itemsError);
      return { success: false, error: itemsError };
    }

    return { 
      success: true, 
      data: { 
        ...creditNote,
        items: items || []
      } 
    };
  } catch (error) {
    console.error(`Unexpected error fetching credit note ${id}:`, error);
    return { success: false, error };
  }
};

/**
 * Update a credit note's status
 */
export const updateCreditNoteStatus = async (
  id: number | string, 
  status: 'Approved' | 'Rejected', 
  approver: string
): Promise<{ success: boolean; error?: any }> => {
  try {
    // Convert id to number if it's a string
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    const { error } = await supabase
      .from('credit_notes')
      .update({
        status,
        approver,
        approval_date: new Date().toISOString()
      })
      .eq('id', numericId);
    
    if (error) {
      console.error(`Error updating credit note ${id} status:`, error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error(`Unexpected error updating credit note ${id} status:`, error);
    return { success: false, error };
  }
};
