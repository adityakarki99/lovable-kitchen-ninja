
import { suppliers } from './suppliers';
import { stockItems } from './stockItems';

export type ScheduleFrequency = 'One-time' | 'Daily' | 'Weekly' | 'Bi-weekly' | 'Monthly' | 'Custom';
export type ScheduledOrderStatus = 'Pending Confirmation' | 'Confirmed' | 'Scheduled' | 'Rejected';

export interface ScheduledOrderItem {
  item: typeof stockItems[number];
  quantity: number;
  price: number;
  total: number;
}

export interface ScheduledOrder {
  id: string;
  supplier: string;
  supplierDetails: typeof suppliers[number];
  items: ScheduledOrderItem[];
  status: ScheduledOrderStatus;
  createdAt: Date;
  scheduledDate: Date;
  cutoffDate: Date;
  recurring: ScheduleFrequency;
  nextOccurrence: Date;
  requestor: string;
  notes?: string;
  total: number;
  rejectionReason?: string;
}

// Sample scheduled orders data
export const scheduledOrders: ScheduledOrder[] = [
  {
    id: 'SPO-1001',
    supplier: 'Fresh Produce Co.',
    supplierDetails: suppliers[0],
    items: [
      { item: stockItems[0], quantity: 20, price: 2.50, total: 50.00 },
      { item: stockItems[1], quantity: 15, price: 2.30, total: 34.50 }
    ],
    status: 'Pending Confirmation',
    createdAt: new Date(2024, 5, 25),
    scheduledDate: new Date(2024, 6, 2),
    cutoffDate: new Date(2024, 6, 1, 17, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 6, 9),
    requestor: 'Chef David',
    notes: 'Regular produce order for Tuesday delivery',
    total: 84.50
  },
  {
    id: 'SPO-1002',
    supplier: 'Premium Meats',
    supplierDetails: suppliers[1],
    items: [
      { item: stockItems[2], quantity: 10, price: 12.50, total: 125.00 },
      { item: stockItems[6], quantity: 8, price: 15.20, total: 121.60 }
    ],
    status: 'Pending Confirmation',
    createdAt: new Date(2024, 5, 26),
    scheduledDate: new Date(2024, 6, 3),
    cutoffDate: new Date(2024, 6, 2, 12, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 6, 10),
    requestor: 'Chef Michael',
    notes: 'Standard meat order for Monday delivery',
    total: 246.60
  },
  {
    id: 'SPO-1003',
    supplier: 'Seafood Direct',
    supplierDetails: suppliers[2],
    items: [
      { item: stockItems[3], quantity: 5, price: 35.00, total: 175.00 },
      { item: stockItems[7], quantity: 3, price: 38.00, total: 114.00 }
    ],
    status: 'Scheduled',
    createdAt: new Date(2024, 5, 22),
    scheduledDate: new Date(2024, 6, 10),
    cutoffDate: new Date(2024, 6, 8, 15, 0),
    recurring: 'Bi-weekly',
    nextOccurrence: new Date(2024, 6, 24),
    requestor: 'Chef Alana',
    notes: 'Special menu items for weekend',
    total: 289.00
  },
  {
    id: 'SPO-1004',
    supplier: 'Global Spices',
    supplierDetails: suppliers[3],
    items: [
      { item: stockItems[8], quantity: 1, price: 15.00, total: 15.00 },
      { item: stockItems[8], quantity: 1.5, price: 22.40, total: 33.60 }
    ],
    status: 'Confirmed',
    createdAt: new Date(2024, 5, 20),
    scheduledDate: new Date(2024, 6, 5),
    cutoffDate: new Date(2024, 6, 3, 14, 0),
    recurring: 'Monthly',
    nextOccurrence: new Date(2024, 7, 5),
    requestor: 'Chef David',
    notes: 'Monthly spice order',
    total: 48.60
  },
  {
    id: 'SPO-1005',
    supplier: 'Bakery Supplies Inc.',
    supplierDetails: suppliers[4],
    items: [
      { item: stockItems[9], quantity: 25, price: 2.20, total: 55.00 },
      { item: stockItems[9], quantity: 10, price: 2.20, total: 22.00 }
    ],
    status: 'Rejected',
    createdAt: new Date(2024, 5, 18),
    scheduledDate: new Date(2024, 6, 1),
    cutoffDate: new Date(2024, 5, 30, 16, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 6, 8),
    requestor: 'Chef Lisa',
    notes: 'Standard bakery supplies',
    total: 77.00,
    rejectionReason: 'Budget constraints - will reorder next week'
  }
];
