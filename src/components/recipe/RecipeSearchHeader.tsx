
import React from 'react';
import { Search, Filter, PlusCircle, List, Grid, Table as TableIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SortOptions, { SortOption } from './SortOptions';
import ActionBar from '@/components/shared/ActionBar';

interface RecipeSearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  viewMode: 'list' | 'grid' | 'table';
  onViewModeChange: (mode: 'list' | 'grid' | 'table') => void;
  onShowFilters: () => void;
  onAddRecipe: () => void;
}

const RecipeSearchHeader: React.FC<RecipeSearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  onShowFilters,
  onAddRecipe
}) => {
  return (
    <ActionBar>
      <div className="relative w-full sm:w-72 lg:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-gray-60" />
        <Input
          placeholder="Search recipes by name, ingredient, category..."
          className="carbon-input pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <SortOptions 
          currentSort={sortOption} 
          onChange={onSortChange} 
        />
        
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'} 
            size="sm"
            className="rounded-none"
            onClick={() => onViewModeChange('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'} 
            size="sm"
            className="rounded-none"
            onClick={() => onViewModeChange('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'} 
            size="sm"
            className="rounded-none"
            onClick={() => onViewModeChange('table')}
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="carbon-btn-tertiary"
          onClick={onShowFilters}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        
        <Button 
          size="sm" 
          className="carbon-btn-primary"
          onClick={onAddRecipe}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Recipe
        </Button>
      </div>
    </ActionBar>
  );
};

export default RecipeSearchHeader;
