
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Recipe {
  id: number;
  name: string;
  category: string;
  cost: number;
  rating: number;
  prepTime: string;
  cookTime: string;
  popularity: number;
  allergens: string[];
  ingredients: { name: string; quantity: string; inStock: boolean }[];
}

interface RecipeGridViewProps {
  recipes: Recipe[];
  viewMode: 'grid' | 'list';
}

const RecipeGridView: React.FC<RecipeGridViewProps> = ({ recipes, viewMode }) => {
  return (
    <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {recipes.map(recipe => (
        <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="block">
          <Card className={`flex ${viewMode === 'grid' ? 'flex-col h-full' : 'items-center justify-between'} p-4 hover:border-carbon-blue-40 transition-colors`}>
            {viewMode === 'grid' ? (
              <>
                <div className="mb-4">
                  <h3 className="font-normal text-carbon-heading-02">{recipe.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="carbon-tag carbon-tag-blue">
                      {recipe.category}
                    </span>
                    <span className="text-sm text-carbon-gray-70">
                      ${recipe.cost.toFixed(2)}/serving
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm text-carbon-gray-70">
                      Prep: {recipe.prepTime} | Cook: {recipe.cookTime}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {recipe.allergens.map((allergen: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-kitchen-danger/10 text-kitchen-danger border-kitchen-danger/20">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-2">
                    <div className="carbon-tag carbon-tag-green">
                      {recipe.rating}
                    </div>
                    <div className="text-sm text-carbon-gray-70 mt-2">
                      Popularity: {recipe.popularity}%
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <p className="text-xs text-carbon-gray-70 mb-1">Ingredients In Stock</p>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={recipe.ingredients.filter((i) => i.inStock).length / recipe.ingredients.length * 100} 
                      className="h-2 w-24" 
                    />
                    <span className="text-xs">
                      {recipe.ingredients.filter((i) => i.inStock).length}/{recipe.ingredients.length}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-normal text-carbon-heading-02">{recipe.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="carbon-tag carbon-tag-blue">
                      {recipe.category}
                    </span>
                    <span className="text-sm text-carbon-gray-70">
                      ${recipe.cost.toFixed(2)}/serving
                    </span>
                    <span className="text-sm text-carbon-gray-70">
                      Prep: {recipe.prepTime}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {recipe.allergens.map((allergen: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-kitchen-danger/10 text-kitchen-danger border-kitchen-danger/20">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex flex-col items-end mr-4">
                    <div className="carbon-tag carbon-tag-green mr-2">
                      {recipe.rating}
                    </div>
                    <span className="text-xs text-carbon-gray-70 mt-1">
                      Popularity: {recipe.popularity}%
                    </span>
                  </div>
                  
                  <div className="mr-4">
                    <p className="text-xs text-carbon-gray-70 mb-1">Ingredients</p>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={recipe.ingredients.filter((i) => i.inStock).length / recipe.ingredients.length * 100} 
                        className="h-2 w-16" 
                      />
                      <span className="text-xs">
                        {recipe.ingredients.filter((i) => i.inStock).length}/{recipe.ingredients.length}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RecipeGridView;
