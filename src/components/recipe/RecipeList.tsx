
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Filter, PlusCircle, BarChart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock data
const recipes = [
  { id: 1, name: 'Fish & Chips', category: 'Main Course', cost: 4.50, rating: 4.8 },
  { id: 2, name: 'Caesar Salad', category: 'Appetizer', cost: 3.25, rating: 4.5 },
  { id: 3, name: 'Spaghetti Carbonara', category: 'Main Course', cost: 3.80, rating: 4.7 },
  { id: 4, name: 'Chocolate Fondant', category: 'Dessert', cost: 2.90, rating: 4.9 },
  { id: 5, name: 'Mushroom Risotto', category: 'Main Course', cost: 4.20, rating: 4.6 },
  { id: 6, name: 'Chicken Wings', category: 'Appetizer', cost: 3.50, rating: 4.4 }
];

// Mock analytics data
const costAnalyticsData = [
  { name: 'Fish & Chips', value: 4.50 },
  { name: 'Caesar Salad', value: 3.25 },
  { name: 'Spaghetti Carbonara', value: 3.80 },
  { name: 'Chocolate Fondant', value: 2.90 },
  { name: 'Mushroom Risotto', value: 4.20 },
  { name: 'Chicken Wings', value: 3.50 },
];

const ratingAnalyticsData = [
  { name: 'Fish & Chips', value: 4.8 },
  { name: 'Caesar Salad', value: 4.5 },
  { name: 'Spaghetti Carbonara', value: 4.7 },
  { name: 'Chocolate Fondant', value: 4.9 },
  { name: 'Mushroom Risotto', value: 4.6 },
  { name: 'Chicken Wings', value: 4.4 },
];

const categoryDistribution = [
  { name: 'Main Course', value: 3 },
  { name: 'Appetizer', value: 2 },
  { name: 'Dessert', value: 1 },
];

const RecipeList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recipes');
  const navigate = useNavigate();
  
  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRecipe = () => {
    navigate('/recipes/new');
  };

  const chartConfig = {
    cost: {
      label: "Cost per serving",
      theme: {
        light: "#0071e3",
        dark: "#60a5fa"
      }
    },
    rating: {
      label: "Rating",
      theme: {
        light: "#34d399",
        dark: "#10b981"
      }
    },
    category: {
      label: "Category",
      theme: {
        light: "#f59e0b",
        dark: "#f59e0b"
      }
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
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
          <Button 
            size="sm" 
            className="bg-kitchen-primary hover:bg-kitchen-primary/90"
            onClick={handleAddRecipe}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Recipe
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="recipes" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-kitchen-muted mb-4">
          <TabsTrigger value="recipes">Recipe List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recipes" className="pt-2">
          <div className="grid gap-4">
            {filteredRecipes.map((recipe) => (
              <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                <Card className="p-4 flex items-center justify-between transition-all hover:shadow-apple-md">
                  <div>
                    <h3 className="font-medium">{recipe.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="pill-badge bg-kitchen-muted text-kitchen-muted-foreground">
                        {recipe.category}
                      </span>
                      <span className="text-sm text-kitchen-muted-foreground">
                        ${recipe.cost.toFixed(2)}/serving
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="pill-badge bg-kitchen-success/10 text-kitchen-success mr-4">
                      {recipe.rating}
                    </div>
                    <ChevronRight className="h-5 w-5 text-kitchen-muted-foreground" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-kitchen-primary" />
                Recipe Cost Analysis
              </h3>
              <div className="h-[300px]">
                <ChartContainer config={chartConfig}>
                  <RechartsBarChart data={costAnalyticsData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      tickFormatter={(value) => `$${value}`}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent 
                          formatter={(value) => `$${value}`}
                        />
                      }
                    />
                    <Bar dataKey="value" name="cost" fill="var(--color-cost)" />
                  </RechartsBarChart>
                </ChartContainer>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-kitchen-success" />
                Recipe Rating Analysis
              </h3>
              <div className="h-[300px]">
                <ChartContainer config={chartConfig}>
                  <RechartsBarChart data={ratingAnalyticsData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      domain={[0, 5]}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent />
                      }
                    />
                    <Bar dataKey="value" name="rating" fill="var(--color-rating)" />
                  </RechartsBarChart>
                </ChartContainer>
              </div>
            </Card>
            
            <Card className="p-4 md:col-span-2">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-amber-500" />
                Recipe Category Distribution
              </h3>
              <div className="h-[300px]">
                <ChartContainer config={chartConfig}>
                  <RechartsBarChart data={categoryDistribution}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent 
                          formatter={(value) => `${value} recipes`}
                        />
                      }
                    />
                    <Bar dataKey="value" name="category" fill="var(--color-category)" />
                  </RechartsBarChart>
                </ChartContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecipeList;
