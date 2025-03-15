
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
        light: "#0f62fe", // Carbon blue60
        dark: "#78a9ff"  // Carbon blue40
      }
    },
    rating: {
      label: "Rating",
      theme: {
        light: "#24a148", // Carbon green50
        dark: "#42be65"  // Carbon green40
      }
    },
    category: {
      label: "Category",
      theme: {
        light: "#8a3ffc", // Carbon purple50
        dark: "#a56eff"  // Carbon purple40
      }
    }
  };

  return (
    <div className="space-y-5 carbon-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-gray-60" />
          <Input
            placeholder="Search recipes..."
            className="carbon-input pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="carbon-btn-tertiary text-carbon-gray-100">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button 
            size="sm" 
            className="carbon-btn-primary"
            onClick={handleAddRecipe}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Recipe
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="recipes" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-carbon-gray-10 mb-4 rounded-none border-b border-carbon-gray-20">
          <TabsTrigger value="recipes" className="data-[state=active]:bg-carbon-blue-60 data-[state=active]:text-white">Recipe List</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-carbon-blue-60 data-[state=active]:text-white">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recipes" className="pt-2">
          <div className="grid gap-4">
            {filteredRecipes.map((recipe) => (
              <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="block">
                <Card className="carbon-card flex items-center justify-between p-4 hover:border-carbon-blue-40 transition-colors">
                  <div>
                    <h3 className="font-normal text-carbon-heading-02">{recipe.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="carbon-tag carbon-tag-blue">
                        {recipe.category}
                      </span>
                      <span className="text-sm text-carbon-gray-70">
                        ${recipe.cost.toFixed(2)}/serving
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="carbon-tag carbon-tag-green mr-4">
                      {recipe.rating}
                    </div>
                    <ChevronRight className="h-5 w-5 text-carbon-gray-60" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="carbon-card">
              <div className="carbon-card-header">
                <h3 className="carbon-card-title flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-carbon-blue-60" />
                  Recipe Cost Analysis
                </h3>
              </div>
              <div className="carbon-card-content h-[300px]">
                <ChartContainer config={chartConfig}>
                  <RechartsBarChart data={costAnalyticsData} margin={{ top: 20, right: 30, left: 40, bottom: 50 }}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      tickLine={{ stroke: '#e0e0e0' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      tickFormatter={(value) => `$${value}`}
                      tickLine={{ stroke: '#e0e0e0' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent 
                          formatter={(value) => `$${value}`}
                        />
                      }
                    />
                    <Bar 
                      dataKey="value" 
                      name="cost" 
                      fill="#0f62fe" 
                      radius={[0, 0, 0, 0]}
                    />
                  </RechartsBarChart>
                </ChartContainer>
              </div>
            </Card>
            
            <Card className="carbon-card">
              <div className="carbon-card-header">
                <h3 className="carbon-card-title flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-carbon-green-50" />
                  Recipe Rating Analysis
                </h3>
              </div>
              <div className="carbon-card-content h-[300px]">
                <ChartContainer config={chartConfig}>
                  <RechartsBarChart data={ratingAnalyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      tickLine={{ stroke: '#e0e0e0' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      domain={[0, 5]}
                      tickLine={{ stroke: '#e0e0e0' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent />
                      }
                    />
                    <Bar 
                      dataKey="value" 
                      name="rating" 
                      fill="#24a148" 
                      radius={[0, 0, 0, 0]}
                    />
                  </RechartsBarChart>
                </ChartContainer>
              </div>
            </Card>
            
            <Card className="carbon-card md:col-span-2">
              <div className="carbon-card-header">
                <h3 className="carbon-card-title flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-carbon-purple-50" />
                  Recipe Category Distribution
                </h3>
              </div>
              <div className="carbon-card-content h-[300px]">
                <ChartContainer config={chartConfig}>
                  <RechartsBarChart data={categoryDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      tickLine={{ stroke: '#e0e0e0' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      tickLine={{ stroke: '#e0e0e0' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent 
                          formatter={(value) => `${value} recipes`}
                        />
                      }
                    />
                    <Bar 
                      dataKey="value" 
                      name="category" 
                      fill="#8a3ffc" 
                      radius={[0, 0, 0, 0]}
                    />
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
