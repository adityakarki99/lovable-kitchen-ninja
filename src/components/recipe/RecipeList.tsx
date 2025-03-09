
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Mock data
const recipes = [
  { id: 1, name: 'Fish & Chips', category: 'Main Course', cost: 4.50, rating: 4.8 },
  { id: 2, name: 'Caesar Salad', category: 'Appetizer', cost: 3.25, rating: 4.5 },
  { id: 3, name: 'Spaghetti Carbonara', category: 'Main Course', cost: 3.80, rating: 4.7 },
  { id: 4, name: 'Chocolate Fondant', category: 'Dessert', cost: 2.90, rating: 4.9 },
  { id: 5, name: 'Mushroom Risotto', category: 'Main Course', cost: 4.20, rating: 4.6 },
  { id: 6, name: 'Chicken Wings', category: 'Appetizer', cost: 3.50, rating: 4.4 }
];

const RecipeList: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Button size="sm" className="bg-kitchen-primary hover:bg-kitchen-primary/90">
            New Recipe
          </Button>
        </div>
      </div>
      
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
    </div>
  );
};

export default RecipeList;
