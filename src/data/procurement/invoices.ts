
import { stockItems } from './stockItems';

export const invoices = [
  {
    id: 'INV-7801',
    purchaseOrder: 'PO-2305',
    dateIssued: '2024-02-19',
    dateDue: '2024-03-20',
    supplierRef: 'YV-89720',
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
    total: 98.00
  },
  {
    id: 'INV-7802',
    purchaseOrder: 'PO-2304',
    dateIssued: '2024-02-17',
    dateDue: '2024-03-02',
    supplierRef: 'PM-45678',
    items: [
      {
        item: stockItems[2],
        quantity: 15,
        price: 32.50,
        total: 487.50
      }
    ],
    total: 487.50
  }
];
