
import * as z from 'zod';
import { CreditNoteReason } from '@/data/procurement/creditNotes';

export const creditNoteReasons: CreditNoteReason[] = [
  'Damaged Goods',
  'Incorrect Items',
  'Price Discrepancy',
  'Quality Issues',
  'Returned Items',
  'Other'
];

export const formSchema = z.object({
  purchaseOrderId: z.string().min(1, "Please select a purchase order"),
  supplierRef: z.string().min(1, "Supplier reference is required"),
  items: z.array(z.object({
    itemId: z.string().min(1, "Please select an item"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0.01, "Price must be greater than 0"),
    reason: z.enum(['Damaged Goods', 'Incorrect Items', 'Price Discrepancy', 'Quality Issues', 'Returned Items', 'Other'] as const),
    notes: z.string().optional(),
  })).min(1, "At least one item is required"),
  notes: z.string().optional(),
});

export type CreditNoteFormValues = z.infer<typeof formSchema>;
