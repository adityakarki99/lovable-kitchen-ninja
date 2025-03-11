
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
    categories: ['Produce', 'Herbs'],
    leadTime: 2
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
    categories: ['Meat', 'Poultry'],
    leadTime: 1
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
    categories: ['Seafood'],
    leadTime: 1
  },
  {
    id: 'SUP004',
    name: 'Global Spices',
    logo: '/suppliers/global-spices.png',
    onTimeDelivery: 94,
    qualityRating: 4.5,
    accountManager: 'Raj Patel',
    phone: '0445 678 901',
    email: 'orders@globalspices.com.au',
    paymentTerms: 'Net 30',
    minimumOrder: 150,
    deliverySchedule: 'Mon, Thu',
    categories: ['Spices', 'Dry Goods'],
    leadTime: 3
  },
  {
    id: 'SUP005',
    name: 'Bakery Supplies Inc.',
    logo: '/suppliers/bakery-supplies.png',
    onTimeDelivery: 90,
    qualityRating: 4.4,
    accountManager: 'Emma Johnson',
    phone: '0456 789 012',
    email: 'orders@bakerysupplies.com.au',
    paymentTerms: 'Net 14',
    minimumOrder: 200,
    deliverySchedule: 'Tue, Fri',
    categories: ['Bakery', 'Dairy'],
    leadTime: 2
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
    image: '/items/tomatoes.jpg',
    weeklyUsage: 35,
    volatility: 'Low',
    suggestedPar: 15,
    isCritical: true,
    usageHistory: [32, 35, 38, 34, 36, 33, 35, 37, 40, 45, 42, 38]
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
    image: '/items/lettuce.jpg',
    weeklyUsage: 25,
    volatility: 'Medium',
    suggestedPar: 12,
    isCritical: true,
    usageHistory: [22, 24, 26, 25, 23, 24, 28, 30, 27, 25, 24, 22]
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
    image: '/items/beef-sirloin.jpg',
    weeklyUsage: 20,
    volatility: 'Low',
    suggestedPar: 25,
    isCritical: true,
    usageHistory: [18, 20, 22, 19, 21, 20, 18, 17, 19, 20, 21, 22]
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
    image: '/items/salmon-fillet.jpg',
    weeklyUsage: 12,
    volatility: 'Medium',
    suggestedPar: 15,
    isCritical: true,
    usageHistory: [10, 12, 14, 13, 11, 12, 15, 16, 13, 11, 10, 12]
  },
  {
    id: 'ITEM005',
    name: 'Onions',
    category: 'Produce',
    supplier: 'SUP001',
    unit: 'kg',
    parLevel: 30,
    currentStock: 12,
    lastOrderedPrice: 1.80,
    location: 'Dry Storage',
    image: '/items/onions.jpg',
    weeklyUsage: 25,
    volatility: 'Low',
    suggestedPar: 30,
    isCritical: false,
    usageHistory: [24, 25, 26, 25, 23, 24, 25, 26, 25, 24, 23, 25]
  },
  {
    id: 'ITEM006',
    name: 'Garlic',
    category: 'Produce',
    supplier: 'SUP001',
    unit: 'kg',
    parLevel: 5,
    currentStock: 1,
    lastOrderedPrice: 8.50,
    location: 'Dry Storage',
    image: '/items/garlic.jpg',
    weeklyUsage: 4,
    volatility: 'Low',
    suggestedPar: 5,
    isCritical: true,
    usageHistory: [3.5, 4, 4.5, 4, 3.8, 4.2, 4, 3.9, 4.1, 4.3, 4, 3.8]
  },
  {
    id: 'ITEM007',
    name: 'Chicken Breast',
    category: 'Poultry',
    supplier: 'SUP002',
    unit: 'kg',
    parLevel: 20,
    currentStock: 5,
    lastOrderedPrice: 18.50,
    location: 'Walk-in Freezer',
    image: '/items/chicken-breast.jpg',
    weeklyUsage: 18,
    volatility: 'Low',
    suggestedPar: 20,
    isCritical: true,
    usageHistory: [17, 18, 19, 18, 17, 16, 18, 20, 19, 18, 17, 18]
  },
  {
    id: 'ITEM008',
    name: 'Prawns',
    category: 'Seafood',
    supplier: 'SUP003',
    unit: 'kg',
    parLevel: 10,
    currentStock: 2,
    lastOrderedPrice: 38.00,
    location: 'Walk-in Freezer',
    image: '/items/prawns.jpg',
    weeklyUsage: 8,
    volatility: 'High',
    suggestedPar: 12,
    isCritical: false,
    usageHistory: [6, 8, 10, 12, 7, 5, 8, 9, 11, 13, 7, 6]
  },
  {
    id: 'ITEM009',
    name: 'Cumin',
    category: 'Spices',
    supplier: 'SUP004',
    unit: 'kg',
    parLevel: 2,
    currentStock: 0.5,
    lastOrderedPrice: 15.00,
    location: 'Dry Storage',
    image: '/items/cumin.jpg',
    weeklyUsage: 1,
    volatility: 'Low',
    suggestedPar: 2,
    isCritical: false,
    usageHistory: [1, 1, 0.9, 1.1, 1, 1, 0.9, 1, 1.1, 1, 0.9, 1]
  },
  {
    id: 'ITEM010',
    name: 'Flour',
    category: 'Bakery',
    supplier: 'SUP005',
    unit: 'kg',
    parLevel: 50,
    currentStock: 15,
    lastOrderedPrice: 2.20,
    location: 'Dry Storage',
    image: '/items/flour.jpg',
    weeklyUsage: 40,
    volatility: 'Low',
    suggestedPar: 50,
    isCritical: true,
    usageHistory: [38, 40, 42, 39, 41, 40, 38, 37, 39, 40, 41, 42]
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

export const approvalMatrix = [
  {
    role: 'Head Chef',
    name: 'David Chen',
    approvalLimit: 2000,
    categories: ['All'],
    email: 'david.chen@restaurant.com',
    phone: '0412 345 789'
  },
  {
    role: 'Bar Manager',
    name: 'Emma Johnson',
    approvalLimit: 1000,
    categories: ['Beverages', 'Bar Supplies'],
    email: 'emma.johnson@restaurant.com',
    phone: '0423 456 789'
  },
  {
    role: 'Kitchen Manager',
    name: 'Michael Smith',
    approvalLimit: 1500,
    categories: ['Produce', 'Meat', 'Seafood', 'Dry Goods'],
    email: 'michael.smith@restaurant.com',
    phone: '0434 567 890'
  },
  {
    role: 'General Manager',
    name: 'Sarah Davis',
    approvalLimit: 5000,
    categories: ['All'],
    email: 'sarah.davis@restaurant.com',
    phone: '0445 678 901'
  },
  {
    role: 'Owner',
    name: 'James Wilson',
    approvalLimit: 10000,
    categories: ['All'],
    email: 'james.wilson@restaurant.com',
    phone: '0456 789 012'
  }
];
