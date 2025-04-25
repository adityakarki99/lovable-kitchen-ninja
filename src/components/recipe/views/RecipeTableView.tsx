
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';

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
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Prep Time</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Popularity</TableHead>
          <TableHead>Stock Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recipes.map((recipe) => (
          <TableRow key={recipe.id} className="cursor-pointer hover:bg-muted" onClick={() => navigate(`/recipes/${recipe.id}`)}>
            <TableCell className="font-medium">{recipe.name}</TableCell>
            <TableCell>{recipe.category}</TableCell>
            <TableCell>${recipe.cost.toFixed(2)}</TableCell>
            <TableCell>{recipe.prepTime}</TableCell>
            <TableCell>{recipe.rating}</TableCell>
            <TableCell>{recipe.popularity}%</TableCell>
            <TableCell>
              {recipe.ingredients.filter((i) => i.inStock).length}/{recipe.ingredients.length}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecipeTableView;
