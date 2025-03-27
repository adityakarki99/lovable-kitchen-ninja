
import { StockItem } from '@/services/supabase/stockItemService';
import { PurchaseOrder } from '@/services/supabase/purchaseOrderService';
import { Supplier } from '@/services/supabase/supplierService';
import { CreditNote, CreditNoteItem } from '@/services/supabase/creditNoteService';
import { Invoice, InvoiceItem } from '@/services/supabase/invoiceService';

/**
 * Convert a database StockItem to the format used in the UI
 */
export const mapDbStockItemToUi = (dbItem: StockItem) => {
  return {
    id: dbItem.id.toString(),
    name: dbItem.name,
    category: dbItem.category || '',
    supplier: dbItem.supplier_id?.toString() || '',
    unit: dbItem.unit || '',
    parLevel: dbItem.par_level || 0,
    currentStock: dbItem.current_stock || 0,
    lastOrderedPrice: dbItem.last_ordered_price || 0,
    location: dbItem.location || '',
    image: dbItem.image_url || '',
    weeklyUsage: dbItem.weekly_usage || 0,
    volatility: dbItem.volatility || 'Low',
    suggestedPar: dbItem.suggested_par || 0,
    isCritical: dbItem.is_critical || false
  };
};

/**
 * Convert a database Supplier to the format used in the UI
 */
export const mapDbSupplierToUi = (dbSupplier: Supplier) => {
  return {
    id: dbSupplier.id.toString(),
    name: dbSupplier.name,
    logo: dbSupplier.logo_url || '',
    onTimeDelivery: dbSupplier.on_time_delivery || 0,
    qualityRating: dbSupplier.quality_rating || 0,
    accountManager: dbSupplier.account_manager || '',
    phone: dbSupplier.phone || '',
    email: dbSupplier.email || '',
    paymentTerms: dbSupplier.payment_terms || '',
    minimumOrder: dbSupplier.minimum_order || 0,
    deliverySchedule: dbSupplier.delivery_schedule || '',
    categories: dbSupplier.categories || [],
    leadTime: dbSupplier.lead_time || 0
  };
};

/**
 * Convert a database PurchaseOrder to the format used in the UI
 */
export const mapDbPurchaseOrderToUi = (dbPo: PurchaseOrder) => {
  return {
    id: dbPo.id?.toString() || '',
    supplier: dbPo.supplier ? mapDbSupplierToUi(dbPo.supplier) : null,
    dateOrdered: dbPo.date_ordered,
    dateDelivery: dbPo.date_delivery || '',
    paymentTerms: dbPo.payment_terms || '',
    status: dbPo.status,
    items: dbPo.items ? dbPo.items.map(item => ({
      item: item.item ? mapDbStockItemToUi(item.item) : null,
      quantity: item.quantity,
      price: item.price,
      total: item.total
    })) : [],
    totalAmount: dbPo.total_amount,
    requestor: dbPo.requestor || '',
    urgency: dbPo.urgency || 'Medium',
    budgetImpact: dbPo.budget_impact || 0,
    age: '1d', // Would need logic to calculate
    notes: dbPo.notes || ''
  };
};

/**
 * Convert a database CreditNote to the format used in the UI
 */
export const mapDbCreditNoteToUi = (dbCreditNote: CreditNote & { items?: CreditNoteItem[] }) => {
  return {
    id: dbCreditNote.id?.toString() || '',
    purchaseOrderId: dbCreditNote.purchase_order_id?.toString() || '',
    dateIssued: dbCreditNote.date_issued,
    supplierRef: dbCreditNote.supplier_ref || '',
    items: dbCreditNote.items ? dbCreditNote.items.map(item => ({
      item: item.item ? mapDbStockItemToUi(item.item) : { id: item.item_id.toString(), name: `Item #${item.item_id}` },
      quantity: item.quantity,
      price: item.price,
      total: item.total,
      reason: item.reason,
      notes: item.notes
    })) : [],
    totalAmount: dbCreditNote.total_amount,
    status: dbCreditNote.status,
    approver: dbCreditNote.approver,
    approvalDate: dbCreditNote.approval_date,
    notes: dbCreditNote.notes
  };
};

/**
 * Convert a database Invoice to the format used in the UI
 */
export const mapDbInvoiceToUi = (dbInvoice: Invoice & { items?: InvoiceItem[] }) => {
  return {
    id: dbInvoice.id?.toString() || '',
    purchaseOrder: dbInvoice.purchase_order_id?.toString() || '',
    dateIssued: dbInvoice.date_issued,
    dateDue: dbInvoice.date_due || '',
    supplierRef: dbInvoice.supplier_ref || '',
    items: dbInvoice.items ? dbInvoice.items.map(item => ({
      item: item.item ? mapDbStockItemToUi(item.item) : { id: item.item_id?.toString() || '', name: item.description },
      quantity: item.quantity,
      price: item.unit_price,
      total: item.total_price
    })) : [],
    total: dbInvoice.total_amount
  };
};
