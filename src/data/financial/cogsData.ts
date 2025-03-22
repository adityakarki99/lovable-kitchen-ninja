
// Mock data for COGS Analysis

// Monthly COGS data for trend analysis
export const monthlyCogsData = [
  { month: 'Jan', cogs: 42500, sales: 120000, percentage: 35.4 },
  { month: 'Feb', cogs: 38900, sales: 115000, percentage: 33.8 },
  { month: 'Mar', cogs: 41200, sales: 125000, percentage: 33.0 },
  { month: 'Apr', cogs: 43500, sales: 130000, percentage: 33.5 },
  { month: 'May', cogs: 46800, sales: 140000, percentage: 33.4 },
  { month: 'Jun', cogs: 52300, sales: 150000, percentage: 34.9 },
  { month: 'Jul', cogs: 55700, sales: 165000, percentage: 33.8 },
  { month: 'Aug', cogs: 58100, sales: 170000, percentage: 34.2 },
  { month: 'Sep', cogs: 54200, sales: 160000, percentage: 33.9 },
  { month: 'Oct', cogs: 51500, sales: 155000, percentage: 33.2 },
  { month: 'Nov', cogs: 49800, sales: 145000, percentage: 34.3 },
  { month: 'Dec', cogs: 61200, sales: 175000, percentage: 35.0 },
];

// Category breakdown data
export const categoryCogsData = [
  { category: 'Meat & Poultry', cost: 22800, percentage: 38 },
  { category: 'Seafood', cost: 12600, percentage: 21 },
  { category: 'Produce', cost: 9000, percentage: 15 },
  { category: 'Dairy', cost: 7800, percentage: 13 },
  { category: 'Dry Goods', cost: 4800, percentage: 8 },
  { category: 'Beverages', cost: 3000, percentage: 5 },
];

// Top 10 highest cost items
export const topCostItemsData = [
  { id: 1, name: 'Ribeye Steak', category: 'Meat & Poultry', costPerUnit: 18.5, unitsUsed: 240, totalCost: 4440, percentOfCogs: 7.4 },
  { id: 2, name: 'Fresh Salmon', category: 'Seafood', costPerUnit: 14.75, unitsUsed: 210, totalCost: 3097.5, percentOfCogs: 5.2 },
  { id: 3, name: 'Lobster Tail', category: 'Seafood', costPerUnit: 24.50, unitsUsed: 120, totalCost: 2940, percentOfCogs: 4.9 },
  { id: 4, name: 'Lamb Rack', category: 'Meat & Poultry', costPerUnit: 22.25, unitsUsed: 130, totalCost: 2892.5, percentOfCogs: 4.8 },
  { id: 5, name: 'Wagyu Beef', category: 'Meat & Poultry', costPerUnit: 38.50, unitsUsed: 75, totalCost: 2887.5, percentOfCogs: 4.8 },
  { id: 6, name: 'Truffle Oil', category: 'Dry Goods', costPerUnit: 28.75, unitsUsed: 65, totalCost: 1868.75, percentOfCogs: 3.1 },
  { id: 7, name: 'King Crab Legs', category: 'Seafood', costPerUnit: 32.50, unitsUsed: 55, totalCost: 1787.5, percentOfCogs: 3.0 },
  { id: 8, name: 'Organic Chicken', category: 'Meat & Poultry', costPerUnit: 8.25, unitsUsed: 210, totalCost: 1732.5, percentOfCogs: 2.9 },
  { id: 9, name: 'Premium Cheese', category: 'Dairy', costPerUnit: 12.75, unitsUsed: 135, totalCost: 1721.25, percentOfCogs: 2.9 },
  { id: 10, name: 'Aged Balsamic', category: 'Dry Goods', costPerUnit: 18.50, unitsUsed: 90, totalCost: 1665, percentOfCogs: 2.8 },
];

// Items with biggest cost changes
export const costChangesData = [
  { id: 1, name: 'Ribeye Steak', category: 'Meat & Poultry', previousCost: 16.75, currentCost: 18.5, change: 10.4, impact: 'high' },
  { id: 2, name: 'Fresh Salmon', category: 'Seafood', previousCost: 13.25, currentCost: 14.75, change: 11.3, impact: 'high' },
  { id: 3, name: 'Avocado', category: 'Produce', previousCost: 2.25, currentCost: 3.15, change: 40.0, impact: 'medium' },
  { id: 4, name: 'Heavy Cream', category: 'Dairy', previousCost: 4.50, currentCost: 5.25, change: 16.7, impact: 'medium' },
  { id: 5, name: 'Vanilla Extract', category: 'Dry Goods', previousCost: 8.75, currentCost: 10.25, change: 17.1, impact: 'low' },
  { id: 6, name: 'Organic Berries', category: 'Produce', previousCost: 6.50, currentCost: 5.75, change: -11.5, impact: 'low' },
  { id: 7, name: 'White Rice', category: 'Dry Goods', previousCost: 1.75, currentCost: 1.55, change: -11.4, impact: 'low' },
  { id: 8, name: 'Chicken Wings', category: 'Meat & Poultry', previousCost: 5.25, currentCost: 4.75, change: -9.5, impact: 'medium' },
];

// COGS Metrics
export const cogsMetrics = {
  currentPeriod: {
    total: 60000,
    percentOfSales: 34.3,
    perPlate: 12.75,
    trend: 2.5,
  },
  previousPeriod: {
    total: 58500,
    percentOfSales: 33.4,
    perPlate: 12.45,
  },
  benchmark: {
    industryAverage: 32.0,
    targetPercentage: 31.5,
  }
};
