
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export interface RecipeFilterOptions {
  categories: string[];
  costRange: [number, number];
  prepTimeRange: [number, number];
  allergens: string[];
  inStockOnly: boolean;
  popularityMin: number;
}

const defaultFilterOptions: RecipeFilterOptions = {
  categories: [],
  costRange: [0, 10],
  prepTimeRange: [0, 60],
  allergens: [],
  inStockOnly: false,
  popularityMin: 0
};

interface RecipeFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: RecipeFilterOptions) => void;
  currentFilters: RecipeFilterOptions;
}

const RecipeFilter: React.FC<RecipeFilterProps> = ({ 
  isOpen, 
  onClose, 
  onApplyFilters,
  currentFilters
}) => {
  const [filters, setFilters] = useState<RecipeFilterOptions>(currentFilters || defaultFilterOptions);
  
  // Available options for filters
  const availableCategories = ['Main Course', 'Appetizer', 'Dessert', 'Breakfast', 'Side Dish'];
  const availableAllergens = ['Gluten', 'Dairy', 'Nuts', 'Egg', 'Fish', 'Shellfish', 'Soy'];

  const handleCategoryToggle = (category: string) => {
    if (filters.categories.includes(category)) {
      setFilters({
        ...filters,
        categories: filters.categories.filter(c => c !== category)
      });
    } else {
      setFilters({
        ...filters,
        categories: [...filters.categories, category]
      });
    }
  };

  const handleAllergenToggle = (allergen: string) => {
    if (filters.allergens.includes(allergen)) {
      setFilters({
        ...filters,
        allergens: filters.allergens.filter(a => a !== allergen)
      });
    } else {
      setFilters({
        ...filters,
        allergens: [...filters.allergens, allergen]
      });
    }
  };

  const handleCostChange = (value: number[]) => {
    setFilters({
      ...filters,
      costRange: [value[0], value[1]]
    });
  };

  const handlePrepTimeChange = (value: number[]) => {
    setFilters({
      ...filters,
      prepTimeRange: [value[0], value[1]]
    });
  };

  const handlePopularityChange = (value: number[]) => {
    setFilters({
      ...filters,
      popularityMin: value[0]
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters(defaultFilterOptions);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Recipes</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 my-4 max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map(category => (
                <Badge 
                  key={category}
                  variant={filters.categories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Cost Range ($ per serving)</h3>
            <Slider
              defaultValue={[filters.costRange[0], filters.costRange[1]]}
              max={10}
              step={0.5}
              minStepsBetweenThumbs={1}
              onValueChange={handleCostChange}
              className="mb-2"
            />
            <div className="flex justify-between">
              <span>${filters.costRange[0].toFixed(2)}</span>
              <span>${filters.costRange[1].toFixed(2)}</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Preparation Time (minutes)</h3>
            <Slider
              defaultValue={[filters.prepTimeRange[0], filters.prepTimeRange[1]]}
              max={120}
              step={5}
              minStepsBetweenThumbs={5}
              onValueChange={handlePrepTimeChange}
              className="mb-2"
            />
            <div className="flex justify-between">
              <span>{filters.prepTimeRange[0]} min</span>
              <span>{filters.prepTimeRange[1]} min</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Minimum Popularity</h3>
            <Slider
              defaultValue={[filters.popularityMin]}
              max={100}
              step={5}
              onValueChange={handlePopularityChange}
              className="mb-2"
            />
            <div className="flex justify-between">
              <span>{filters.popularityMin}%</span>
              <span>100%</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Allergen Filters</h3>
            <div className="flex flex-col space-y-2">
              {availableAllergens.map(allergen => (
                <div key={allergen} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`allergen-${allergen}`}
                    checked={filters.allergens.includes(allergen)}
                    onCheckedChange={() => handleAllergenToggle(allergen)}
                  />
                  <label 
                    htmlFor={`allergen-${allergen}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Exclude {allergen}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="instock-only"
                checked={filters.inStockOnly}
                onCheckedChange={(checked) => 
                  setFilters({...filters, inStockOnly: checked as boolean})
                }
              />
              <label 
                htmlFor="instock-only"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show only recipes with all ingredients in stock
              </label>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleApply}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeFilter;
