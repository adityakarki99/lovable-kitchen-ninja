
import { purchaseOrders } from './purchaseOrders';
import { receivingOrders } from './receivingOrders';
import { invoices } from './invoices';
import { stockItems } from './stockItems';

export const matchingData = [
  {
    id: 'MATCH-1001',
    purchaseOrder: purchaseOrders[0],
    receivingOrder: receivingOrders[0],
    invoice: invoices[0],
    status: 'Partial Match',
    matchPercentage: 90,
    discrepancies: [
      {
        type: 'Quantity',
        item: stockItems[0],
        expected: '20kg',
        received: '18kg',
        difference: -5.00
      }
    ],
    approver: 'James Wilson',
    approvalStatus: 'Pending',
    paymentStatus: 'On Hold'
  },
  {
    id: 'MATCH-1002',
    purchaseOrder: purchaseOrders[1],
    receivingOrder: receivingOrders[1],
    invoice: invoices[1],
    status: 'Matched',
    matchPercentage: 100,
    discrepancies: [],
    approver: 'Sarah Davis',
    approvalStatus: 'Approved',
    paymentStatus: 'Paid'
  }
];
