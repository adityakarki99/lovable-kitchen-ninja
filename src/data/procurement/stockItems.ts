
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
