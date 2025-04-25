
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import RecipeSearchHeader from './filters/RecipeSearchHeader';
import RecipeGridView from './views/RecipeGridView';
import RecipeTableView from './views/RecipeTableView';
import RecipeAnalytics from './analytics/RecipeAnalytics';
import RecipeFilter, { RecipeFilterOptions } from './RecipeFilter';
import ActiveFilters from './ActiveFilters';
import SortOptions from './SortOptions';
import { useRecipeFilters } from './hooks/useRecipeFilters';
import { 
  recipes, 
  costAnalyticsData, 
  ratingAnalyticsData, 
  categoryDistribution 
} from './data/recipeData';

const defaultFilterOptions: RecipeFilterOptions = {
  categories: [],
  costRange: [0, 10],
  prepTimeRange: [0, 60],
  allergens: [],
  inStockOnly: false,
  popularityMin: 0
};

const RecipeList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recipes');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'table'>('list');
  
  const navigate = useNavigate();
  
  const {
    searchQuery,
    setSearchQuery,
    filterOptions,
    setFilterOptions,
    sortOption,
    setSortOption,
    isLoading,
    filteredRecipes
  } = useRecipeFilters(recipes, defaultFilterOptions);

  const handleAddRecipe = () => {
    navigate('/recipes/new');
  };

  const handleApplyFilters = (filters: RecipeFilterOptions) => {
    setFilterOptions(filters);
  };

  const handleRemoveFilter = (filterType: string, value?: string) => {
    switch (filterType) {
      case 'category':
        setFilterOptions({
          ...filterOptions,
          categories: filterOptions.categories.filter(c => c !== value)
        });
        break;
      case 'allergen':
        setFilterOptions({
          ...filterOptions,
          allergens: filterOptions.allergens.filter(a => a !== value)
        });
        break;
      case 'costRange':
        setFilterOptions({
          ...filterOptions,
          costRange: [0, 10]
        });
        break;
      case 'prepTimeRange':
        setFilterOptions({
          ...filterOptions,
          prepTimeRange: [0, 60]
        });
        break;
      case 'popularityMin':
        setFilterOptions({
          ...filterOptions,
          popularityMin: 0
        });
        break;
      case 'inStockOnly':
        setFilterOptions({
          ...filterOptions,
          inStockOnly: false
        });
        break;
      default:
        break;
    }
  };

  const handleClearAllFilters = () => {
    setFilterOptions(defaultFilterOptions);
  };

  return (
    <div className="space-y-5 carbon-fade-in">
      <RecipeSearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onShowFilters={() => setShowFilters(true)}
        onAddRecipe={handleAddRecipe}
      />
      
      <ActiveFilters 
        filters={filterOptions}
        onRemoveFilter={handleRemoveFilter}
        onClearAllFilters={handleClearAllFilters}
      />
      
      <RecipeFilter 
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filterOptions}
      />
      
      <Tabs defaultValue="recipes" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-carbon-gray-10 mb-4 rounded-none border-b border-carbon-gray-20">
          <TabsTrigger value="recipes" className="data-[state=active]:bg-carbon-blue-60 data-[state=active]:text-white">Recipe List</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-carbon-blue-60 data-[state=active]:text-white">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recipes" className="pt-2">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-carbon-blue-60"></div>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-carbon-gray-70 mb-4">No recipes match your search criteria</p>
              <Button variant="outline" onClick={handleClearAllFilters}>Clear filters</Button>
            </div>
          ) : (
            <>
              {viewMode === 'table' ? (
                <RecipeTableView recipes={filteredRecipes} />
              ) : (
                <RecipeGridView recipes={filteredRecipes} viewMode={viewMode} />
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="analytics" className="pt-2">
          <RecipeAnalytics 
            costAnalyticsData={costAnalyticsData}
            ratingAnalyticsData={ratingAnalyticsData}
            categoryDistribution={categoryDistribution}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecipeList;
