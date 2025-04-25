
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { Recipe } from '../data/recipeData';
import { RecipeFilterOptions } from '../RecipeFilter';
import { SortOption } from '../SortOptions';

export function useRecipeFilters(recipes: Recipe[], initialFilters: RecipeFilterOptions) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState<RecipeFilterOptions>(initialFilters);
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  useEffect(() => {
    const applyFilters = () => {
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        let result = [...recipes];
        
        if (debouncedSearchQuery) {
          const query = debouncedSearchQuery.toLowerCase();
          result = result.filter(recipe => 
            recipe.name.toLowerCase().includes(query) || 
            recipe.category.toLowerCase().includes(query) ||
            recipe.ingredients.some(ing => ing.name.toLowerCase().includes(query)) ||
            recipe.allergens.some(allergen => allergen.toLowerCase().includes(query))
          );
        }
        
        if (filterOptions.categories.length > 0) {
          result = result.filter(recipe => 
            filterOptions.categories.includes(recipe.category)
          );
        }
        
        result = result.filter(recipe => 
          recipe.cost >= filterOptions.costRange[0] && 
          recipe.cost <= filterOptions.costRange[1]
        );
        
        result = result.filter(recipe => {
          const prepTimeMinutes = parseInt(recipe.prepTime);
          return prepTimeMinutes >= filterOptions.prepTimeRange[0] && 
                prepTimeMinutes <= filterOptions.prepTimeRange[1];
        });
        
        if (filterOptions.allergens.length > 0) {
          result = result.filter(recipe => 
            !filterOptions.allergens.some(allergen => 
              recipe.allergens.includes(allergen)
            )
          );
        }
        
        if (filterOptions.inStockOnly) {
          result = result.filter(recipe => 
            recipe.ingredients.every(ing => ing.inStock)
          );
        }
        
        result = result.filter(recipe => 
          recipe.popularity >= filterOptions.popularityMin
        );
        
        switch (sortOption) {
          case 'name-asc':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name-desc':
            result.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 'cost-asc':
            result.sort((a, b) => a.cost - b.cost);
            break;
          case 'cost-desc':
            result.sort((a, b) => b.cost - a.cost);
            break;
          case 'popularity-desc':
            result.sort((a, b) => b.popularity - a.popularity);
            break;
          case 'prep-asc':
            result.sort((a, b) => {
              const aMinutes = parseInt(a.prepTime);
              const bMinutes = parseInt(b.prepTime);
              return aMinutes - bMinutes;
            });
            break;
          default:
            break;
        }
        
        setFilteredRecipes(result);
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    };
    
    applyFilters();
  }, [debouncedSearchQuery, filterOptions, sortOption, recipes]);

  return {
    searchQuery,
    setSearchQuery,
    filterOptions,
    setFilterOptions,
    sortOption,
    setSortOption,
    isLoading,
    filteredRecipes
  };
}
