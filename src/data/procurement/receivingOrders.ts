
import { stockItems } from './stockItems';

export const receivingOrders = [
  {
    id: 'RO-4501',
    purchaseOrder: 'PO-2305',
    dateReceived: '2024-02-18',
    receivedBy: 'John Smith',
    condition: 'Good',
    notes: 'Some tomatoes slightly damaged',
    items: [
      {
        item: stockItems[0],
        quantityReceived: 18,
        condition: 'Partial damage',
        notes: '2kg damaged'
      },
      {
        item: stockItems[1],
        quantityReceived: 15,
        condition: 'Good',
        notes: ''
      }
    ]
  },
  {
    id: 'RO-4502',
    purchaseOrder: 'PO-2304',
    dateReceived: '2024-02-16',
    receivedBy: 'Maria Garcia',
    condition: 'Good',
    notes: '',
    items: [
      {
        item: stockItems[2],
        quantityReceived: 15,
        condition: 'Good',
        notes: ''
      }
    ]
  }
];
