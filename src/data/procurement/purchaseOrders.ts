
import { suppliers } from './suppliers';
import { stockItems } from './stockItems';

export const purchaseOrders = [
  {
    id: 'PO-2305',
    supplier: suppliers[0],
    dateOrdered: '2024-02-15',
    dateDelivery: '2024-02-18',
    paymentTerms: 'Net 30 Days',
    status: 'Delivered',
    items: [
      { 
        item: stockItems[0],
        quantity: 20,
        price: 2.50,
        total: 50.00
      },
      {
        item: stockItems[1],
        quantity: 15,
        price: 3.20,
        total: 48.00
      }
    ],
    totalAmount: 98.00,
    requestor: 'Chef David',
    urgency: 'High',
    budgetImpact: 2.5,
    age: '1d',
    notes: 'Urgent order for weekend service'
  },
  {
    id: 'PO-2304',
    supplier: suppliers[1],
    dateOrdered: '2024-02-14',
    dateDelivery: '2024-02-16',
    paymentTerms: 'Net 14 Days',
    status: 'Delivered',
    items: [
      {
        item: stockItems[2],
        quantity: 15,
        price: 32.50,
        total: 487.50
      }
    ],
    totalAmount: 487.50,
    requestor: 'Chef Alana',
    urgency: 'Medium',
    budgetImpact: 5.3,
    age: '4h',
    notes: 'Regular weekly meat order'
  },
  {
    id: 'PO-2303',
    supplier: suppliers[2],
    dateOrdered: '2024-02-13',
    dateDelivery: '2024-02-15',
    paymentTerms: 'Net 7 Days',
    status: 'Pending Approval',
    items: [
      {
        item: stockItems[3],
        quantity: 10,
        price: 42.00,
        total: 420.00
      },
      {
        item: stockItems[7],
        quantity: 8,
        price: 38.00,
        total: 304.00
      }
    ],
    totalAmount: 724.00,
    requestor: 'Chef Michael',
    urgency: 'Low',
    budgetImpact: 7.8,
    age: '2h',
    notes: 'Seafood for next week\'s special menu'
  },
  {
    id: 'PO-2302',
    supplier: suppliers[3],
    dateOrdered: '2024-02-12',
    dateDelivery: '2024-02-16',
    paymentTerms: 'Net 30 Days',
    status: 'Pending Approval',
    items: [
      {
        item: stockItems[8],
        quantity: 5,
        price: 15.00,
        total: 75.00
      }
    ],
    totalAmount: 75.00,
    requestor: 'Chef David',
    urgency: 'Medium',
    budgetImpact: 0.8,
    age: '1h',
    notes: 'Monthly spice order'
  },
  {
    id: 'PO-2301',
    supplier: suppliers[4],
    dateOrdered: '2024-02-11',
    dateDelivery: '2024-02-14',
    paymentTerms: 'Net 14 Days',
    status: 'Pending Approval',
    items: [
      {
        item: stockItems[9],
        quantity: 50,
        price: 2.20,
        total: 110.00
      }
    ],
    totalAmount: 110.00,
    requestor: 'Chef Lisa',
    urgency: 'High',
    budgetImpact: 1.2,
    age: '30m',
    notes: 'Bakery supplies running very low'
  }
];
