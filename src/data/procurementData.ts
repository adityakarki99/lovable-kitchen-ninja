
export const suppliers = [
  {
    id: 'SUP001',
    name: '1A Yarra Valley',
    logo: '/suppliers/1a-yarra.png',
    onTimeDelivery: 95,
    qualityRating: 4.8,
    accountManager: 'Sarah Chen',
    phone: '0412 345 678',
    email: 'orders@1ayarravalley.com',
    paymentTerms: 'Net 30',
    minimumOrder: 200,
    deliverySchedule: 'Mon, Wed, Fri',
    categories: ['Produce', 'Herbs']
  },
  {
    id: 'SUP002',
    name: 'Premium Meats',
    logo: '/suppliers/premium-meats.png',
    onTimeDelivery: 92,
    qualityRating: 4.7,
    accountManager: 'John Smith',
    phone: '0423 456 789',
    email: 'orders@premiummeats.com.au',
    paymentTerms: 'Net 14',
    minimumOrder: 300,
    deliverySchedule: 'Tue, Thu',
    categories: ['Meat', 'Poultry']
  },
  {
    id: 'SUP003',
    name: 'Seafood Direct',
    logo: '/suppliers/seafood-direct.png',
    onTimeDelivery: 88,
    qualityRating: 4.6,
    accountManager: 'Maria Lopez',
    phone: '0434 567 890',
    email: 'orders@seafooddirect.com.au',
    paymentTerms: 'Net 7',
    minimumOrder: 250,
    deliverySchedule: 'Wed, Fri',
    categories: ['Seafood']
  }
];

export const stockItems = [
  {
    id: 'ITEM001',
    name: 'Tomatoes',
    category: 'Produce',
    supplier: 'SUP001',
    unit: 'kg',
    parLevel: 20,
    currentStock: 5,
    lastOrderedPrice: 2.50,
    location: 'Walk-in Cooler',
    image: '/items/tomatoes.jpg'
  },
  {
    id: 'ITEM002',
    name: 'Lettuce',
    category: 'Produce',
    supplier: 'SUP001',
    unit: 'kg',
    parLevel: 15,
    currentStock: 3,
    lastOrderedPrice: 3.20,
    location: 'Walk-in Cooler',
    image: '/items/lettuce.jpg'
  },
  {
    id: 'ITEM003',
    name: 'Beef Sirloin',
    category: 'Meat',
    supplier: 'SUP002',
    unit: 'kg',
    parLevel: 25,
    currentStock: 8,
    lastOrderedPrice: 32.50,
    location: 'Walk-in Freezer',
    image: '/items/beef-sirloin.jpg'
  },
  {
    id: 'ITEM004',
    name: 'Salmon Fillet',
    category: 'Seafood',
    supplier: 'SUP003',
    unit: 'kg',
    parLevel: 15,
    currentStock: 4,
    lastOrderedPrice: 42.00,
    location: 'Walk-in Freezer',
    image: '/items/salmon-fillet.jpg'
  }
];

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
    totalExpected: 98.00
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
    totalExpected: 487.50
  }
];

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

