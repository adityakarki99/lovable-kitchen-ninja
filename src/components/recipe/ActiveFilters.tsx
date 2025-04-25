
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RecipeFilterOptions } from './RecipeFilter';

interface ActiveFiltersProps {
  filters: RecipeFilterOptions;
  onRemoveFilter: (filterType: string, value?: string) => void;
  onClearAllFilters: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ 
  filters, 
  onRemoveFilter,
  onClearAllFilters
}) => {
  // Count how many filters are active
  const activeFilterCount = [
    filters.categories.length > 0,
    filters.allergens.length > 0,
    filters.costRange[0] > 0 || filters.costRange[1] < 10,
    filters.prepTimeRange[0] > 0 || filters.prepTimeRange[1] < 60,
    filters.popularityMin > 0,
    filters.inStockOnly
  ].filter(Boolean).length;
  
  if (activeFilterCount === 0) return null;
  
  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      <span className="text-sm text-kitchen-muted-foreground">Active Filters:</span>
      
      {filters.categories.map(category => (
        <Badge key={category} variant="secondary" className="pl-2">
          Category: {category}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-auto p-0 pl-1"
            onClick={() => onRemoveFilter('category', category)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      ))}
      
      {filters.allergens.map(allergen => (
        <Badge key={allergen} variant="secondary" className="pl-2">
          No {allergen}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-auto p-0 pl-1"
            onClick={() => onRemoveFilter('allergen', allergen)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      ))}
      
      {(filters.costRange[0] > 0 || filters.costRange[1] < 10) && (
        <Badge variant="secondary" className="pl-2">
          ${filters.costRange[0].toFixed(2)} - ${filters.costRange[1].toFixed(2)}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-auto p-0 pl-1"
            onClick={() => onRemoveFilter('costRange')}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      )}
      
      {(filters.prepTimeRange[0] > 0 || filters.prepTimeRange[1] < 60) && (
        <Badge variant="secondary" className="pl-2">
          {filters.prepTimeRange[0]} - {filters.prepTimeRange[1]} min
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-auto p-0 pl-1"
            onClick={() => onRemoveFilter('prepTimeRange')}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      )}
      
      {filters.popularityMin > 0 && (
        <Badge variant="secondary" className="pl-2">
          Min {filters.popularityMin}% popular
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-auto p-0 pl-1"
            onClick={() => onRemoveFilter('popularityMin')}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      )}
      
      {filters.inStockOnly && (
        <Badge variant="secondary" className="pl-2">
          In stock only
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-auto p-0 pl-1"
            onClick={() => onRemoveFilter('inStockOnly')}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      )}
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="ml-auto text-xs"
        onClick={onClearAllFilters}
      >
        Clear all
      </Button>
    </div>
  );
};

export default ActiveFilters;
