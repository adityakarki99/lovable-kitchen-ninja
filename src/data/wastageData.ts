
// Wastage data types and demo data
export interface WasteItem {
  id: string;
  date: string;
  itemName: string;
  itemId: string;
  category: string;
  quantity: number;
  unit: string;
  cost: number;
  reason: 'Spoilage' | 'Overproduction' | 'Trim Waste' | 'Damaged' | 'Expired' | 'Quality Issue' | 'Other';
  notes: string;
  reportedBy: string;
  photo?: string;
  location: string;
}

export interface WasteCategory {
  id: string;
  name: string;
  count: number;
  value: number;
}

export interface WasteTrend {
  date: string;
  weight: number;
  value: number;
}

// Demo waste items
export const wasteItems: WasteItem[] = [
  {
    id: 'WST001',
    date: '2024-02-25',
    itemName: 'Tomatoes',
    itemId: 'ITEM001',
    category: 'Produce',
    quantity: 5.2,
    unit: 'kg',
    cost: 13.00,
    reason: 'Overproduction',
    notes: 'Too many prepped for lunch service',
    reportedBy: 'Chef David',
    location: 'Main Kitchen'
  },
  {
    id: 'WST002',
    date: '2024-02-25',
    itemName: 'Bread Rolls',
    itemId: 'ITEM011',
    category: 'Bakery',
    quantity: 12,
    unit: 'pieces',
    cost: 6.00,
    reason: 'Overproduction',
    notes: 'Leftover from dinner service',
    reportedBy: 'Chef Alana',
    location: 'Main Kitchen'
  },
  {
    id: 'WST003',
    date: '2024-02-24',
    itemName: 'Lettuce',
    itemId: 'ITEM002',
    category: 'Produce',
    quantity: 1.8,
    unit: 'kg',
    cost: 5.76,
    reason: 'Spoilage',
    notes: 'Found wilted at back of fridge',
    reportedBy: 'Chef Michael',
    location: 'Cold Storage'
  },
  {
    id: 'WST004',
    date: '2024-02-24',
    itemName: 'Salmon Fillet',
    itemId: 'ITEM004',
    category: 'Seafood',
    quantity: 0.9,
    unit: 'kg',
    cost: 37.80,
    reason: 'Trim Waste',
    notes: 'Skin and edges from prep',
    reportedBy: 'Chef Lisa',
    location: 'Main Kitchen'
  },
  {
    id: 'WST005',
    date: '2024-02-23',
    itemName: 'Beef Sirloin',
    itemId: 'ITEM003',
    category: 'Meat',
    quantity: 1.2,
    unit: 'kg',
    cost: 39.00,
    reason: 'Quality Issue',
    notes: 'Discoloration found on edges',
    reportedBy: 'Chef David',
    location: 'Cold Storage'
  },
  {
    id: 'WST006',
    date: '2024-02-23',
    itemName: 'Heavy Cream',
    itemId: 'ITEM008',
    category: 'Dairy',
    quantity: 0.5,
    unit: 'liter',
    cost: 2.13,
    reason: 'Expired',
    notes: 'Past use-by date',
    reportedBy: 'Chef Alana',
    location: 'Cold Storage'
  },
  {
    id: 'WST007',
    date: '2024-02-22',
    itemName: 'Onions',
    itemId: 'ITEM005',
    category: 'Produce',
    quantity: 2.3,
    unit: 'kg',
    cost: 4.14,
    reason: 'Trim Waste',
    notes: 'Peels and ends from prep',
    reportedBy: 'Chef Michael',
    location: 'Main Kitchen'
  },
  {
    id: 'WST008',
    date: '2024-02-22',
    itemName: 'Chicken Breast',
    itemId: 'ITEM007',
    category: 'Poultry',
    quantity: 0.8,
    unit: 'kg',
    cost: 14.80,
    reason: 'Overproduction',
    notes: 'Extra from special menu',
    reportedBy: 'Chef Lisa',
    location: 'Main Kitchen'
  },
  {
    id: 'WST009',
    date: '2024-02-21',
    itemName: 'Flour',
    itemId: 'ITEM010',
    category: 'Bakery',
    quantity: 1.5,
    unit: 'kg',
    cost: 3.30,
    reason: 'Damaged',
    notes: 'Bag ripped and spilled',
    reportedBy: 'Chef David',
    location: 'Dry Storage'
  },
  {
    id: 'WST010',
    date: '2024-02-21',
    itemName: 'Prawns',
    itemId: 'ITEM008',
    category: 'Seafood',
    quantity: 0.6,
    unit: 'kg',
    cost: 22.80,
    reason: 'Quality Issue',
    notes: 'Texture issues after thawing',
    reportedBy: 'Chef Lisa',
    location: 'Cold Storage'
  }
];

// Category summary
export const wasteCategories: WasteCategory[] = [
  { id: 'CAT001', name: 'Produce', count: 9, value: 22.90 },
  { id: 'CAT002', name: 'Meat', count: 4, value: 39.00 },
  { id: 'CAT003', name: 'Seafood', count: 5, value: 60.60 },
  { id: 'CAT004', name: 'Dairy', count: 3, value: 2.13 },
  { id: 'CAT005', name: 'Bakery', count: 7, value: 9.30 },
  { id: 'CAT006', name: 'Poultry', count: 2, value: 14.80 }
];

// Weekly waste trends
export const wasteTrends: WasteTrend[] = [
  { date: '2024-02-19', weight: 12.5, value: 125.47 },
  { date: '2024-02-20', weight: 9.8, value: 112.30 },
  { date: '2024-02-21', weight: 10.2, value: 130.25 },
  { date: '2024-02-22', weight: 8.7, value: 98.20 },
  { date: '2024-02-23', weight: 11.3, value: 142.68 },
  { date: '2024-02-24', weight: 7.5, value: 108.75 },
  { date: '2024-02-25', weight: 9.0, value: 115.50 }
];

// Calculate waste metrics
export const calculateWasteMetrics = () => {
  const totalWeight = wasteItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = wasteItems.reduce((sum, item) => sum + item.cost, 0);
  
  const wasteCauses = [
    { cause: 'Spoilage', amount: wasteItems.filter(i => i.reason === 'Spoilage').reduce((sum, item) => sum + item.cost, 0) },
    { cause: 'Overproduction', amount: wasteItems.filter(i => i.reason === 'Overproduction').reduce((sum, item) => sum + item.cost, 0) },
    { cause: 'Trim Waste', amount: wasteItems.filter(i => i.reason === 'Trim Waste').reduce((sum, item) => sum + item.cost, 0) },
    { cause: 'Quality Issues', amount: wasteItems.filter(i => i.reason === 'Quality Issue').reduce((sum, item) => sum + item.cost, 0) },
    { cause: 'Expired', amount: wasteItems.filter(i => i.reason === 'Expired').reduce((sum, item) => sum + item.cost, 0) },
    { cause: 'Damaged', amount: wasteItems.filter(i => i.reason === 'Damaged').reduce((sum, item) => sum + item.cost, 0) }
  ];
  
  const topWastedItems = [...wasteItems]
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 5)
    .map(item => ({
      name: item.itemName,
      value: item.cost,
      quantity: item.quantity,
      unit: item.unit
    }));
  
  const wasteByLocation = [
    { location: 'Main Kitchen', amount: wasteItems.filter(i => i.location === 'Main Kitchen').reduce((sum, item) => sum + item.cost, 0) },
    { location: 'Cold Storage', amount: wasteItems.filter(i => i.location === 'Cold Storage').reduce((sum, item) => sum + item.cost, 0) },
    { location: 'Dry Storage', amount: wasteItems.filter(i => i.location === 'Dry Storage').reduce((sum, item) => sum + item.cost, 0) }
  ];
  
  // Weekly average from trends
  const weeklyAverage = wasteTrends.reduce((sum, day) => sum + day.value, 0) / wasteTrends.length;
  
  // Environmental impact (rough estimation)
  const co2Equivalent = totalWeight * 2.5; // 2.5 kg CO2 per kg of food waste (simplified)
  
  return {
    totalWeight,
    totalValue,
    wasteCauses,
    topWastedItems,
    wasteByLocation,
    weeklyAverage,
    co2Equivalent
  };
};

export const wasteReasons = [
  'Spoilage',
  'Overproduction',
  'Trim Waste',
  'Damaged',
  'Expired',
  'Quality Issue',
  'Other'
];

export const wasteRecommendations = [
  {
    id: 'REC001',
    title: 'Reduce Tomato Prepping',
    description: 'Data shows consistent overproduction of tomatoes. Consider reducing prep quantities by 20% for lunch service.',
    impact: 'Estimated $52/week savings',
    status: 'New'
  },
  {
    id: 'REC002',
    title: 'Review Bread Order Schedule',
    description: 'High waste from dinner bread rolls. Consider ordering less or repurposing for next-day bread pudding.',
    impact: 'Estimated $24/week savings',
    status: 'In Progress'
  },
  {
    id: 'REC003',
    title: 'Salmon Trim Recovery',
    description: 'Collect salmon trims for staff meals or fish cakes instead of discarding.',
    impact: 'Estimated $120/month savings',
    status: 'Implemented'
  },
  {
    id: 'REC004',
    title: 'FIFO Training Refresh',
    description: 'Schedule refresher training on FIFO principles for all kitchen staff to reduce spoilage.',
    impact: 'Potential 15% reduction in spoilage waste',
    status: 'New'
  },
  {
    id: 'REC005',
    title: 'Adjust Seafood PAR Levels',
    description: 'Current seafood waste suggests PAR levels may be too high. Consider 10% reduction.',
    impact: 'Estimated $200/month savings',
    status: 'New'
  }
];
