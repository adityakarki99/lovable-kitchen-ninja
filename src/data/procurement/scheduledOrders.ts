
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

// Sample scheduled orders data with expanded demo entries
export const scheduledOrders: ScheduledOrder[] = [
  {
    id: 'SPO-1001',
    supplier: 'Fresh Produce Co.',
    supplierDetails: suppliers[0],
    items: [
      { item: stockItems[0], quantity: 20, price: 2.50, total: 50.00 },
      { item: stockItems[1], quantity: 15, price: 2.30, total: 34.50 }
    ],
    status: 'Confirmed',
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
  },
  // New demo orders
  {
    id: 'SPO-1006',
    supplier: 'Fresh Produce Co.',
    supplierDetails: suppliers[0],
    items: [
      { item: stockItems[0], quantity: 30, price: 2.50, total: 75.00 },
      { item: stockItems[1], quantity: 25, price: 2.30, total: 57.50 }
    ],
    status: 'Confirmed',
    createdAt: new Date(2024, 5, 28),
    scheduledDate: new Date(2024, 6, 6),
    cutoffDate: new Date(2024, 6, 5, 15, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 6, 13),
    requestor: 'Chef David',
    notes: 'Larger order for weekend event',
    total: 132.50
  },
  {
    id: 'SPO-1007',
    supplier: 'Dairy Distributors',
    supplierDetails: suppliers[5],
    items: [
      { item: stockItems[4], quantity: 20, price: 4.75, total: 95.00 },
      { item: stockItems[5], quantity: 10, price: 3.25, total: 32.50 }
    ],
    status: 'Scheduled',
    createdAt: new Date(2024, 5, 27),
    scheduledDate: new Date(2024, 6, 7),
    cutoffDate: new Date(2024, 6, 6, 12, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 6, 14),
    requestor: 'Chef Lisa',
    notes: 'Standard dairy order',
    total: 127.50
  },
  {
    id: 'SPO-1008',
    supplier: 'Premium Meats',
    supplierDetails: suppliers[1],
    items: [
      { item: stockItems[2], quantity: 15, price: 12.50, total: 187.50 },
      { item: stockItems[6], quantity: 10, price: 15.20, total: 152.00 }
    ],
    status: 'Pending Confirmation',
    createdAt: new Date(2024, 5, 30),
    scheduledDate: new Date(2024, 6, 12),
    cutoffDate: new Date(2024, 6, 10, 14, 0),
    recurring: 'Bi-weekly',
    nextOccurrence: new Date(2024, 6, 26),
    requestor: 'Chef Michael',
    notes: 'Special cuts for new menu items',
    total: 339.50
  },
  {
    id: 'SPO-1009',
    supplier: 'Seafood Direct',
    supplierDetails: suppliers[2],
    items: [
      { item: stockItems[3], quantity: 8, price: 35.00, total: 280.00 },
      { item: stockItems[7], quantity: 5, price: 38.00, total: 190.00 }
    ],
    status: 'Confirmed',
    createdAt: new Date(2024, 5, 29),
    scheduledDate: new Date(2024, 6, 14),
    cutoffDate: new Date(2024, 6, 13, 16, 0),
    recurring: 'Bi-weekly',
    nextOccurrence: new Date(2024, 6, 28),
    requestor: 'Chef Alana',
    notes: 'Fresh seafood for weekend specials',
    total: 470.00
  },
  {
    id: 'SPO-1010',
    supplier: 'Global Spices',
    supplierDetails: suppliers[3],
    items: [
      { item: stockItems[8], quantity: 2, price: 15.00, total: 30.00 },
      { item: stockItems[8], quantity: 3, price: 22.40, total: 67.20 }
    ],
    status: 'Scheduled',
    createdAt: new Date(2024, 6, 1),
    scheduledDate: new Date(2024, 6, 18),
    cutoffDate: new Date(2024, 6, 17, 12, 0),
    recurring: 'Monthly',
    nextOccurrence: new Date(2024, 7, 18),
    requestor: 'Chef David',
    notes: 'Specialty spices for new menu',
    total: 97.20
  },
  {
    id: 'SPO-1011',
    supplier: 'Fresh Produce Co.',
    supplierDetails: suppliers[0],
    items: [
      { item: stockItems[0], quantity: 25, price: 2.50, total: 62.50 },
      { item: stockItems[1], quantity: 20, price: 2.30, total: 46.00 }
    ],
    status: 'Scheduled',
    createdAt: new Date(2024, 6, 3),
    scheduledDate: new Date(2024, 6, 16),
    cutoffDate: new Date(2024, 6, 15, 17, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 6, 23),
    requestor: 'Chef David',
    notes: 'Regular produce order',
    total: 108.50
  },
  {
    id: 'SPO-1012',
    supplier: 'Bakery Supplies Inc.',
    supplierDetails: suppliers[4],
    items: [
      { item: stockItems[9], quantity: 30, price: 2.20, total: 66.00 },
      { item: stockItems[9], quantity: 15, price: 2.20, total: 33.00 }
    ],
    status: 'Pending Confirmation',
    createdAt: new Date(2024, 6, 5),
    scheduledDate: new Date(2024, 6, 20),
    cutoffDate: new Date(2024, 6, 19, 14, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 6, 27),
    requestor: 'Chef Lisa',
    notes: 'Increased bakery supplies for summer menu',
    total: 99.00
  },
  {
    id: 'SPO-1013',
    supplier: 'Dairy Distributors',
    supplierDetails: suppliers[5],
    items: [
      { item: stockItems[4], quantity: 25, price: 4.75, total: 118.75 },
      { item: stockItems[5], quantity: 15, price: 3.25, total: 48.75 }
    ],
    status: 'Confirmed',
    createdAt: new Date(2024, 6, 7),
    scheduledDate: new Date(2024, 6, 21),
    cutoffDate: new Date(2024, 6, 20, 12, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 6, 28),
    requestor: 'Chef Michael',
    notes: 'Increased dairy for summer desserts',
    total: 167.50
  },
  {
    id: 'SPO-1014',
    supplier: 'Premium Meats',
    supplierDetails: suppliers[1],
    items: [
      { item: stockItems[2], quantity: 12, price: 12.50, total: 150.00 },
      { item: stockItems[6], quantity: 10, price: 15.20, total: 152.00 }
    ],
    status: 'Scheduled',
    createdAt: new Date(2024, 6, 10),
    scheduledDate: new Date(2024, 6, 24),
    cutoffDate: new Date(2024, 6, 22, 15, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 7, 1),
    requestor: 'Chef Alana',
    notes: 'Standard meat order',
    total: 302.00
  },
  {
    id: 'SPO-1015',
    supplier: 'Seafood Direct',
    supplierDetails: suppliers[2],
    items: [
      { item: stockItems[3], quantity: 6, price: 35.00, total: 210.00 },
      { item: stockItems[7], quantity: 4, price: 38.00, total: 152.00 }
    ],
    status: 'Pending Confirmation',
    createdAt: new Date(2024, 6, 12),
    scheduledDate: new Date(2024, 6, 28),
    cutoffDate: new Date(2024, 6, 27, 16, 0),
    recurring: 'Bi-weekly',
    nextOccurrence: new Date(2024, 7, 12),
    requestor: 'Chef David',
    notes: 'Premium seafood for weekend special',
    total: 362.00
  },
  {
    id: 'SPO-1016',
    supplier: 'Global Spices',
    supplierDetails: suppliers[3],
    items: [
      { item: stockItems[8], quantity: 1, price: 15.00, total: 15.00 },
      { item: stockItems[8], quantity: 2, price: 22.40, total: 44.80 }
    ],
    status: 'Scheduled',
    createdAt: new Date(2024, 7, 1),
    scheduledDate: new Date(2024, 7, 15),
    cutoffDate: new Date(2024, 7, 13, 12, 0),
    recurring: 'Monthly',
    nextOccurrence: new Date(2024, 8, 15),
    requestor: 'Chef Lisa',
    notes: 'Monthly spice restock',
    total: 59.80
  },
  {
    id: 'SPO-1017',
    supplier: 'Fresh Produce Co.',
    supplierDetails: suppliers[0],
    items: [
      { item: stockItems[0], quantity: 30, price: 2.50, total: 75.00 },
      { item: stockItems[1], quantity: 25, price: 2.30, total: 57.50 }
    ],
    status: 'Confirmed',
    createdAt: new Date(2024, 7, 5),
    scheduledDate: new Date(2024, 7, 12),
    cutoffDate: new Date(2024, 7, 11, 17, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 7, 19),
    requestor: 'Chef Michael',
    notes: 'Regular produce with seasonal additions',
    total: 132.50
  },
  {
    id: 'SPO-1018',
    supplier: 'Bakery Supplies Inc.',
    supplierDetails: suppliers[4],
    items: [
      { item: stockItems[9], quantity: 35, price: 2.20, total: 77.00 },
      { item: stockItems[9], quantity: 20, price: 2.20, total: 44.00 }
    ],
    status: 'Scheduled',
    createdAt: new Date(2024, 7, 7),
    scheduledDate: new Date(2024, 7, 20),
    cutoffDate: new Date(2024, 7, 18, 14, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 7, 27),
    requestor: 'Chef Alana',
    notes: 'Bakery supplies for summer menu',
    total: 121.00
  },
  {
    id: 'SPO-1019',
    supplier: 'Dairy Distributors',
    supplierDetails: suppliers[5],
    items: [
      { item: stockItems[4], quantity: 20, price: 4.75, total: 95.00 },
      { item: stockItems[5], quantity: 12, price: 3.25, total: 39.00 }
    ],
    status: 'Pending Confirmation',
    createdAt: new Date(2024, 7, 10),
    scheduledDate: new Date(2024, 7, 23),
    cutoffDate: new Date(2024, 7, 22, 12, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 7, 30),
    requestor: 'Chef David',
    notes: 'Standard dairy order',
    total: 134.00
  },
  {
    id: 'SPO-1020',
    supplier: 'Premium Meats',
    supplierDetails: suppliers[1],
    items: [
      { item: stockItems[2], quantity: 15, price: 12.50, total: 187.50 },
      { item: stockItems[6], quantity: 12, price: 15.20, total: 182.40 }
    ],
    status: 'Confirmed',
    createdAt: new Date(2024, 7, 12),
    scheduledDate: new Date(2024, 7, 26),
    cutoffDate: new Date(2024, 7, 25, 15, 0),
    recurring: 'Weekly',
    nextOccurrence: new Date(2024, 8, 2),
    requestor: 'Chef Lisa',
    notes: 'Premium meat cuts for weekend specials',
    total: 369.90
  }
];
