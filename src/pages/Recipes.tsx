
import React from 'react';
import RecipeList from '@/components/recipe/RecipeList';

const Recipes: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-semibold">Recipe Management</h1>
        <p className="text-kitchen-muted-foreground mt-1">Manage your recipes, ingredients, and costs</p>
      </div>
      
      <RecipeList />
    </div>
  );
};

export default Recipes;
