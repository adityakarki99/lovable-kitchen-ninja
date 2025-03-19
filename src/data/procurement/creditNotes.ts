
import { purchaseOrders } from './purchaseOrders';
import { stockItems } from './stockItems';

export type CreditNoteStatus = 'Pending' | 'Approved' | 'Rejected';
export type CreditNoteReason = 'Damaged Goods' | 'Incorrect Items' | 'Price Discrepancy' | 'Quality Issues' | 'Returned Items' | 'Other';

export interface CreditNoteItem {
  item: typeof stockItems[number];
  quantity: number;
  price: number;
  total: number;
  reason: CreditNoteReason;
  notes?: string;
}

export interface CreditNote {
  id: string;
  purchaseOrderId: string;
  dateIssued: string;
  supplierRef: string;
  items: CreditNoteItem[];
  totalAmount: number;
  status: CreditNoteStatus;
  approver?: string;
  approvalDate?: string;
  notes?: string;
}

// Sample credit notes data
export const creditNotes: CreditNote[] = [
  {
    id: 'CN-1001',
    purchaseOrderId: 'PO-2305',
    dateIssued: '2024-02-20',
    supplierRef: 'YV-89720-CN1',
    items: [
      {
        item: stockItems[0],
        quantity: 2,
        price: 2.50,
        total: 5.00,
        reason: 'Damaged Goods',
        notes: 'Tomatoes crushed during delivery'
      }
    ],
    totalAmount: 5.00,
    status: 'Approved',
    approver: 'James Wilson',
    approvalDate: '2024-02-21',
    notes: 'Supplier agreed to credit for damaged produce'
  },
  {
    id: 'CN-1002',
    purchaseOrderId: 'PO-2304',
    dateIssued: '2024-02-18',
    supplierRef: 'PM-45678-CN1',
    items: [
      {
        item: stockItems[2],
        quantity: 1,
        price: 32.50,
        total: 32.50,
        reason: 'Quality Issues',
        notes: 'Meat did not meet quality standards'
      }
    ],
    totalAmount: 32.50,
    status: 'Pending',
    notes: 'Awaiting supplier confirmation'
  }
];
