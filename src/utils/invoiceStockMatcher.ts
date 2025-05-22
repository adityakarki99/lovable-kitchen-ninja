
import { stockItems } from '@/data/procurement/stockItems';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  [key: string]: any;
}

interface StockItem {
  id: string;
  name: string;
  category?: string;
  unit?: string;
  [key: string]: any;
}

/**
 * Attempt to match invoice line items to stock items based on description similarity
 */
export const autoMatchInvoiceItems = (
  invoiceItems: InvoiceItem[], 
  availableStockItems: StockItem[] = stockItems
): InvoiceItem[] => {
  return invoiceItems.map(item => {
    // Basic matching - in a real app this would be more sophisticated
    // Could use fuzzy matching, NLP, or a combination of approaches
    const matchedItem = availableStockItems.find(stockItem => 
      item.description.toLowerCase().includes(stockItem.name.toLowerCase()) ||
      stockItem.name.toLowerCase().includes(item.description.toLowerCase())
    );
    
    if (matchedItem) {
      return {
        ...item,
        matchedStockItem: matchedItem,
        stockItemId: matchedItem.id,
        matchType: 'auto'
      };
    }
    
    return item;
  });
};

/**
 * Calculate the percentage of matched items in the invoice
 */
export const calculateMatchPercentage = (invoiceItems: InvoiceItem[]): number => {
  const matchedItems = invoiceItems.filter(item => item.matchedStockItem);
  return matchedItems.length / invoiceItems.length;
};

export default {
  autoMatchInvoiceItems,
  calculateMatchPercentage
};
