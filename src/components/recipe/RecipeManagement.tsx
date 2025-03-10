
import React, { useState } from 'react';
import { Search, Filter, PlusCircle, ChefHat, DollarSign, PieChart, Clipboard, Utensils } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// Mock recipe data 
const recipes = [
  { 
    id: 1, 
    name: 'Fish & Chips', 
    category: 'Main Course', 
    prepTime: '45 mins',
    cookTime: '15 mins',
    servings: 4,
    cost: 4.50,
    popularity: 85,
    allergens: ['Gluten', 'Fish'],
    ingredients: [
      { name: 'Fish Fillet', quantity: '200g', inStock: true, cost: 2.50 },
      { name: 'Beer Batter Mix', quantity: '100g', inStock: true, cost: 0.75 },
      { name: 'Potatoes', quantity: '300g', inStock: true, cost: 0.60 },
      { name: 'Vegetable Oil', quantity: '2 tbsp', inStock: true, cost: 0.15 },
      { name: 'Salt', quantity: '1 tsp', inStock: true, cost: 0.05 },
    ]
  },
  { 
    id: 2, 
    name: 'Caesar Salad', 
    category: 'Appetizer', 
    prepTime: '15 mins',
    cookTime: '0 mins',
    servings: 2,
    cost: 3.25,
    popularity: 65,
    allergens: ['Egg', 'Dairy'],
    ingredients: [
      { name: 'Romaine Lettuce', quantity: '1 head', inStock: true, cost: 1.20 },
      { name: 'Parmesan Cheese', quantity: '30g', inStock: true, cost: 0.80 },
      { name: 'Croutons', quantity: '50g', inStock: true, cost: 0.50 },
      { name: 'Caesar Dressing', quantity: '45ml', inStock: true, cost: 0.75 },
    ]
  },
  { 
    id: 3, 
    name: 'Spaghetti Carbonara', 
    category: 'Main Course', 
    prepTime: '10 mins',
    cookTime: '15 mins',
    servings: 2,
    cost: 3.80,
    popularity: 78,
    allergens: ['Gluten', 'Egg', 'Dairy'],
    ingredients: [
      { name: 'Spaghetti', quantity: '200g', inStock: true, cost: 0.80 },
      { name: 'Bacon', quantity: '100g', inStock: true, cost: 1.50 },
      { name: 'Eggs', quantity: '2', inStock: true, cost: 0.60 },
      { name: 'Parmesan Cheese', quantity: '50g', inStock: true, cost: 0.90 },
    ]
  },
  { 
    id: 4, 
    name: 'Chocolate Fondant', 
    category: 'Dessert', 
    prepTime: '20 mins',
    cookTime: '12 mins',
    servings: 4,
    cost: 2.90,
    popularity: 92,
    allergens: ['Gluten', 'Egg', 'Dairy'],
    ingredients: [
      { name: 'Dark Chocolate', quantity: '150g', inStock: true, cost: 1.20 },
      { name: 'Butter', quantity: '100g', inStock: true, cost: 0.80 },
      { name: 'Eggs', quantity: '3', inStock: true, cost: 0.90 },
      { name: 'Sugar', quantity: '80g', inStock: false, cost: 0.20 },
    ]
  },
];

// Mock data for low stock ingredients that affect recipes
const lowStockIngredients = [
  { id: 1, name: 'Sugar', currentStock: '0.2kg', affectedRecipes: 3, supplier: 'Global Spices' },
  { id: 2, name: 'Tomatoes', currentStock: '1.5kg', affectedRecipes: 5, supplier: 'Fresh Produce Co.' },
  { id: 3, name: 'Chicken Breast', currentStock: '2kg', affectedRecipes: 2, supplier: 'Premium Meats' },
];

// Mock data for recipe categories
const recipeCategories = [
  { id: 1, name: 'Main Course', count: 12 },
  { id: 2, name: 'Appetizer', count: 8 },
  { id: 3, name: 'Dessert', count: 6 },
  { id: 4, name: 'Breakfast', count: 5 },
];

// Recipe metrics
const recipeMetrics = [
  {
    title: "Recipes",
    value: "34",
    description: "Total standardized recipes",
    icon: ChefHat,
  },
  {
    title: "Avg. Cost",
    value: "$3.87",
    description: "Per serving",
    icon: DollarSign,
  },
  {
    title: "Affected by Low Stock",
    value: "8",
    description: "Recipes with low stock ingredients",
    icon: Clipboard,
  },
  {
    title: "Most Popular",
    value: "Fish & Chips",
    description: "250 orders this week",
    icon: Utensils,
  }
];

const RecipeManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recipes');
  
  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {recipeMetrics.map((metric, index) => (
          <Card key={index} className="h-full">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-kitchen-muted-foreground">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                  {metric.description && <p className="text-sm text-kitchen-muted-foreground mt-1">{metric.description}</p>}
                </div>
                <div className="rounded-full p-2 bg-kitchen-muted">
                  <metric.icon className="h-5 w-5 text-kitchen-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-kitchen-foreground">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="bg-kitchen-primary hover:bg-kitchen-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Recipe
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="recipes">All Recipes</TabsTrigger>
          <TabsTrigger value="lowstock">Low Stock Alerts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        {/* All Recipes Tab */}
        <TabsContent value="recipes" className="pt-4">
          <div className="grid gap-4">
            {filteredRecipes.map((recipe) => (
              <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                <Card className="p-4 hover:shadow-apple-md transition-all">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{recipe.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="pill-badge bg-kitchen-muted text-kitchen-muted-foreground">
                          {recipe.category}
                        </span>
                        <span className="text-sm text-kitchen-muted-foreground">
                          ${recipe.cost.toFixed(2)}/serving
                        </span>
                        <span className="text-sm text-kitchen-muted-foreground">
                          {recipe.prepTime} prep
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {recipe.allergens.map((allergen, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-kitchen-danger/10 text-kitchen-danger border-kitchen-danger/20">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end justify-between">
                      <div className="pill-badge bg-kitchen-success/10 text-kitchen-success">
                        {recipe.popularity}% Popular
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-xs text-kitchen-muted-foreground mb-1">Ingredients In Stock</p>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={recipe.ingredients.filter(i => i.inStock).length / recipe.ingredients.length * 100} 
                            className="h-2 w-24" 
                          />
                          <span className="text-xs">
                            {recipe.ingredients.filter(i => i.inStock).length}/{recipe.ingredients.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        
        {/* Low Stock Alerts Tab */}
        <TabsContent value="lowstock" className="pt-4">
          <Card className="shadow-apple-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Ingredients Affecting Recipes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockIngredients.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-kitchen-danger mt-1">
                          Current Stock: {item.currentStock}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-sm font-medium">Affects {item.affectedRecipes} recipes</span>
                        <p className="text-sm text-kitchen-muted-foreground mt-1">Supplier: {item.supplier}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Order Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Categories Tab */}
        <TabsContent value="categories" className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {recipeCategories.map(category => (
              <Card key={category.id} className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">{category.count}</span>
                    <span className="text-sm text-kitchen-muted-foreground">Recipes</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Recipes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecipeManagement;
