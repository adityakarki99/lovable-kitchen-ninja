
import React from 'react';
import RecipeList from '@/components/recipe/RecipeList';
import { Button } from '@/components/ui/button';
import { ChartBar, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Recipes: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Recipe Management</h1>
          <p className="text-kitchen-muted-foreground mt-1">Manage your recipes, ingredients, and costs</p>
        </div>
        <div className="flex items-center gap-2 self-end">
          <Button variant="outline" asChild>
            <Link to="/menu-engineering">
              <ChartBar className="mr-2 h-4 w-4" />
              Menu Engineering
            </Link>
          </Button>
          <Button className="bg-kitchen-primary hover:bg-kitchen-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Recipe
          </Button>
        </div>
      </div>
      
      <RecipeList />
    </div>
  );
};

export default Recipes;
