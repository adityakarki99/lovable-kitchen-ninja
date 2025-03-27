
import { supabase } from "@/integrations/supabase/client";

export interface InvoiceItem {
  id?: number;
  invoice_id?: number;
  item_id?: number;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  tax_rate?: number;
  tax_amount?: number;
}

export interface Invoice {
  id?: number;
  invoice_number: string;
  purchase_order_id?: number;
  supplier_id?: number;
  date_issued: string;
  date_due?: string;
  supplier_ref?: string;
  subtotal: number;
  tax_amount?: number;
  total_amount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Paid';
  payment_status?: 'Unpaid' | 'Partially Paid' | 'Paid' | 'On Hold';
  payment_terms?: string;
  notes?: string;
  items?: InvoiceItem[];
}

export interface ScannedInvoice {
  id?: number;
  invoice_id?: number;
  file_path: string;
  file_name: string;
  file_type: string;
  file_size: number;
  ocr_raw_text?: string;
  ocr_confidence?: number;
  ocr_service?: string;
  scan_status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  manual_review_required?: boolean;
  manual_review_notes?: string;
}

/**
 * Create a new invoice in the database
 */
export const createInvoice = async (invoiceData: Invoice): Promise<{ success: boolean; data?: Invoice; error?: any }> => {
  try {
    // Create the invoice
    const { data, error } = await supabase
      .from('invoices')
      .insert({
        invoice_number: invoiceData.invoice_number,
        purchase_order_id: invoiceData.purchase_order_id,
        supplier_id: invoiceData.supplier_id,
        date_issued: invoiceData.date_issued,
        date_due: invoiceData.date_due,
        supplier_ref: invoiceData.supplier_ref,
        subtotal: invoiceData.subtotal,
        tax_amount: invoiceData.tax_amount,
        total_amount: invoiceData.total_amount,
        status: invoiceData.status,
        payment_status: invoiceData.payment_status,
        payment_terms: invoiceData.payment_terms,
        notes: invoiceData.notes
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating invoice:', error);
      return { success: false, error };
    }

    // If there are items, create those too
    if (invoiceData.items && invoiceData.items.length > 0) {
      const items = invoiceData.items.map(item => ({
        invoice_id: data.id,
        item_id: item.item_id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        tax_rate: item.tax_rate,
        tax_amount: item.tax_amount
      }));

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(items);
      
      if (itemsError) {
        console.error('Error creating invoice items:', itemsError);
        return { success: false, error: itemsError };
      }
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error creating invoice:', error);
    return { success: false, error };
  }
};

/**
 * Record a scanned invoice in the database
 */
export const recordScannedInvoice = async (
  scannedData: ScannedInvoice, 
  invoiceId?: number
): Promise<{ success: boolean; data?: ScannedInvoice; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('scanned_invoices')
      .insert({
        invoice_id: invoiceId,
        file_path: scannedData.file_path,
        file_name: scannedData.file_name,
        file_type: scannedData.file_type,
        file_size: scannedData.file_size,
        ocr_raw_text: scannedData.ocr_raw_text,
        ocr_confidence: scannedData.ocr_confidence,
        ocr_service: scannedData.ocr_service,
        scan_status: scannedData.scan_status,
        manual_review_required: scannedData.manual_review_required,
        manual_review_notes: scannedData.manual_review_notes
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error recording scanned invoice:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error recording scanned invoice:', error);
    return { success: false, error };
  }
};

/**
 * Fetch all invoices from the database
 */
export const getInvoices = async (): Promise<{ success: boolean; data?: Invoice[]; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        supplier:supplier_id (*),
        purchase_order:purchase_order_id (*)
      `)
      .order('date_issued', { ascending: false });
    
    if (error) {
      console.error('Error fetching invoices:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error fetching invoices:', error);
    return { success: false, error };
  }
};

/**
 * Fetch a single invoice by ID, including its items
 */
export const getInvoiceById = async (id: string): Promise<{ success: boolean; data?: Invoice & { items: InvoiceItem[] }; error?: any }> => {
  try {
    // Fetch the invoice
    const { data: invoice, error } = await supabase
      .from('invoices')
      .select(`
        *,
        supplier:supplier_id (*),
        purchase_order:purchase_order_id (*)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching invoice ${id}:`, error);
      return { success: false, error };
    }

    // Fetch the invoice items
    const { data: items, error: itemsError } = await supabase
      .from('invoice_items')
      .select(`
        *,
        item:item_id (*)
      `)
      .eq('invoice_id', id);
    
    if (itemsError) {
      console.error(`Error fetching items for invoice ${id}:`, itemsError);
      return { success: false, error: itemsError };
    }

    return { 
      success: true, 
      data: { 
        ...invoice,
        items: items || []
      } 
    };
  } catch (error) {
    console.error(`Unexpected error fetching invoice ${id}:`, error);
    return { success: false, error };
  }
};
