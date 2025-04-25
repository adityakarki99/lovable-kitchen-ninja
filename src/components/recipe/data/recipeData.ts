
export interface Recipe {
  id: number;
  name: string;
  category: string;
  cost: number;
  rating: number;
  prepTime: string;
  cookTime: string;
  popularity: number;
  allergens: string[];
  ingredients: {
    name: string;
    quantity: string;
    inStock: boolean;
  }[];
}

export const recipes: Recipe[] = [
  { 
    id: 1, 
    name: 'Fish & Chips', 
    category: 'Main Course', 
    cost: 4.50, 
    rating: 4.8, 
    prepTime: '45 mins', 
    cookTime: '15 mins',
    popularity: 85,
    allergens: ['Gluten', 'Fish'],
    ingredients: [
      { name: 'Fish Fillet', quantity: '200g', inStock: true },
      { name: 'Beer Batter Mix', quantity: '100g', inStock: true },
      { name: 'Potatoes', quantity: '300g', inStock: true },
      { name: 'Vegetable Oil', quantity: '2 tbsp', inStock: true },
      { name: 'Salt', quantity: '1 tsp', inStock: true },
    ]
  },
  { 
    id: 2, 
    name: 'Caesar Salad', 
    category: 'Appetizer', 
    cost: 3.25, 
    rating: 4.5, 
    prepTime: '15 mins', 
    cookTime: '0 mins',
    popularity: 65,
    allergens: ['Egg', 'Dairy'],
    ingredients: [
      { name: 'Romaine Lettuce', quantity: '1 head', inStock: true },
      { name: 'Parmesan Cheese', quantity: '30g', inStock: true },
      { name: 'Croutons', quantity: '50g', inStock: true },
      { name: 'Caesar Dressing', quantity: '45ml', inStock: true },
    ]
  },
  { 
    id: 3, 
    name: 'Spaghetti Carbonara', 
    category: 'Main Course', 
    cost: 3.80, 
    rating: 4.7, 
    prepTime: '10 mins', 
    cookTime: '15 mins',
    popularity: 78,
    allergens: ['Gluten', 'Egg', 'Dairy'],
    ingredients: [
      { name: 'Spaghetti', quantity: '200g', inStock: true },
      { name: 'Bacon', quantity: '100g', inStock: true },
      { name: 'Eggs', quantity: '2', inStock: true },
      { name: 'Parmesan Cheese', quantity: '50g', inStock: true },
    ]
  },
  { 
    id: 4, 
    name: 'Chocolate Fondant', 
    category: 'Dessert', 
    cost: 2.90, 
    rating: 4.9, 
    prepTime: '20 mins', 
    cookTime: '12 mins',
    popularity: 92,
    allergens: ['Gluten', 'Egg', 'Dairy'],
    ingredients: [
      { name: 'Dark Chocolate', quantity: '150g', inStock: true },
      { name: 'Butter', quantity: '100g', inStock: true },
      { name: 'Eggs', quantity: '3', inStock: true },
      { name: 'Sugar', quantity: '80g', inStock: false },
    ]
  },
  { 
    id: 5, 
    name: 'Mushroom Risotto', 
    category: 'Main Course', 
    cost: 4.20, 
    rating: 4.6, 
    prepTime: '15 mins', 
    cookTime: '25 mins',
    popularity: 76,
    allergens: ['Dairy'],
    ingredients: [
      { name: 'Arborio Rice', quantity: '200g', inStock: true },
      { name: 'Mushrooms', quantity: '200g', inStock: true },
      { name: 'Onion', quantity: '1', inStock: true },
      { name: 'Vegetable Stock', quantity: '750ml', inStock: true },
      { name: 'Parmesan', quantity: '50g', inStock: true },
      { name: 'White Wine', quantity: '100ml', inStock: false },
    ]
  },
  { 
    id: 6, 
    name: 'Chicken Wings', 
    category: 'Appetizer', 
    cost: 3.50, 
    rating: 4.4, 
    prepTime: '10 mins', 
    cookTime: '30 mins',
    popularity: 80,
    allergens: [],
    ingredients: [
      { name: 'Chicken Wings', quantity: '500g', inStock: true },
      { name: 'Hot Sauce', quantity: '60ml', inStock: true },
      { name: 'Butter', quantity: '30g', inStock: true },
      { name: 'Garlic Powder', quantity: '1 tsp', inStock: true },
    ]
  }
];

export const costAnalyticsData = [
  { name: 'Fish & Chips', value: 4.50 },
  { name: 'Caesar Salad', value: 3.25 },
  { name: 'Spaghetti Carbonara', value: 3.80 },
  { name: 'Chocolate Fondant', value: 2.90 },
  { name: 'Mushroom Risotto', value: 4.20 },
  { name: 'Chicken Wings', value: 3.50 },
];

export const ratingAnalyticsData = [
  { name: 'Fish & Chips', value: 4.8 },
  { name: 'Caesar Salad', value: 4.5 },
  { name: 'Spaghetti Carbonara', value: 4.7 },
  { name: 'Chocolate Fondant', value: 4.9 },
  { name: 'Mushroom Risotto', value: 4.6 },
  { name: 'Chicken Wings', value: 4.4 },
];

export const categoryDistribution = [
  { name: 'Main Course', value: 3 },
  { name: 'Appetizer', value: 2 },
  { name: 'Dessert', value: 1 },
];
