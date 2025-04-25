
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface Recipe {
  id: number;
  name: string;
  category: string;
  cost: number;
  rating: number;
  prepTime: string;
  popularity: number;
  ingredients: { name: string; quantity: string; inStock: boolean }[];
}

interface RecipeTableViewProps {
  recipes: Recipe[];
}

const RecipeTableView: React.FC<RecipeTableViewProps> = ({ recipes }) => {
  const navigate = useNavigate();
  
  // Function to render stars for ratings
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-carbon-blue-60 fill-carbon-blue-60' : 'text-carbon-gray-30'}`}
          />
        ))}
        <span className="ml-2 text-carbon-gray-70">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  // Function to render stock status with badge
  const renderStockStatus = (recipe: Recipe) => {
    const inStockCount = recipe.ingredients.filter(i => i.inStock).length;
    const totalCount = recipe.ingredients.length;
    const percentage = (inStockCount / totalCount) * 100;
    
    let badgeVariant: "outline" | "default" | "secondary" | "destructive" = "outline";
    if (percentage === 100) badgeVariant = "default";
    else if (percentage >= 70) badgeVariant = "secondary";
    else badgeVariant = "destructive";
    
    return (
      <Badge variant={badgeVariant}>
        {inStockCount}/{totalCount} ({Math.round(percentage)}%)
      </Badge>
    );
  };
  
  return (
    <div className="border rounded-none overflow-hidden">
      <Table className="carbon-data-table">
        <TableHeader className="carbon-data-table-header bg-carbon-gray-10">
          <TableRow>
            <TableHead className="font-medium">Name</TableHead>
            <TableHead className="font-medium">Category</TableHead>
            <TableHead className="font-medium">Cost</TableHead>
            <TableHead className="font-medium">Prep Time</TableHead>
            <TableHead className="font-medium">Rating</TableHead>
            <TableHead className="font-medium">Popularity</TableHead>
            <TableHead className="font-medium">Stock Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow 
              key={recipe.id} 
              className="cursor-pointer hover:bg-carbon-gray-10 border-b border-carbon-gray-20" 
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              <TableCell className="font-medium">{recipe.name}</TableCell>
              <TableCell>{recipe.category}</TableCell>
              <TableCell>${recipe.cost.toFixed(2)}</TableCell>
              <TableCell>{recipe.prepTime}</TableCell>
              <TableCell>{renderRatingStars(recipe.rating)}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="w-24 bg-carbon-gray-20 rounded-full h-2.5">
                    <div 
                      className="bg-carbon-blue-60 h-2.5 rounded-full" 
                      style={{ width: `${recipe.popularity}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs">{recipe.popularity}%</span>
                </div>
              </TableCell>
              <TableCell>{renderStockStatus(recipe)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipeTableView;
