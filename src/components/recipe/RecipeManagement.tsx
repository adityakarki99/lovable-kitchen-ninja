
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, DollarSign, Clipboard, Utensils } from 'lucide-react';
import RecipeList from '@/components/recipe/RecipeList';

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

      <RecipeList />
    </div>
  );
};

export default RecipeManagement;
