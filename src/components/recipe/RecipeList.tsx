
import React, { ReactElement } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import RecipeFilter, { RecipeFilterOptions } from './RecipeFilter';
import ActiveFilters from './ActiveFilters';
import SortOptions, { SortOption } from './SortOptions';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useDebounce } from '@/hooks/use-debounce';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Update ChartContainer to use more specific typing
const ChartContainer = ({ 
  children, 
  config 
}: { 
  children: ReactElement; 
  config: any 
}) => (
  <ResponsiveContainer width="100%" height="100%">
    {children}
  </ResponsiveContainer>
);

const ChartTooltipContent = ({ active, payload, label, formatter = (value: any) => value }: any) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-2 border border-gray-200 shadow-md">
      <p className="font-medium">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} style={{ color: entry.color }}>
          {formatter(entry.value)}
        </p>
      ))}
    </div>
  );
};

const recipes = [
  { 
    id: 1, 
    name: 'Fish & Chips', 
    category: 'Main Course', 
    cost: 4.50, 
    rating: 4.8, 
    prepTime: '45 mins', 
    cookTime: '15 mins',
    popularity: 85,
    allergens: ['Gluten', 'Fish'],
    ingredients: [
      { name: 'Fish Fillet', quantity: '200g', inStock: true },
      { name: 'Beer Batter Mix', quantity: '100g', inStock: true },
      { name: 'Potatoes', quantity: '300g', inStock: true },
      { name: 'Vegetable Oil', quantity: '2 tbsp', inStock: true },
      { name: 'Salt', quantity: '1 tsp', inStock: true },
    ]
  },
  { 
    id: 2, 
    name: 'Caesar Salad', 
    category: 'Appetizer', 
    cost: 3.25, 
    rating: 4.5, 
    prepTime: '15 mins', 
    cookTime: '0 mins',
    popularity: 65,
    allergens: ['Egg', 'Dairy'],
    ingredients: [
      { name: 'Romaine Lettuce', quantity: '1 head', inStock: true },
      { name: 'Parmesan Cheese', quantity: '30g', inStock: true },
      { name: 'Croutons', quantity: '50g', inStock: true },
      { name: 'Caesar Dressing', quantity: '45ml', inStock: true },
    ]
  },
  { 
    id: 3, 
    name: 'Spaghetti Carbonara', 
    category: 'Main Course', 
    cost: 3.80, 
    rating: 4.7, 
    prepTime: '10 mins', 
    cookTime: '15 mins',
    popularity: 78,
    allergens: ['Gluten', 'Egg', 'Dairy'],
    ingredients: [
      { name: 'Spaghetti', quantity: '200g', inStock: true },
      { name: 'Bacon', quantity: '100g', inStock: true },
      { name: 'Eggs', quantity: '2', inStock: true },
      { name: 'Parmesan Cheese', quantity: '50g', inStock: true },
    ]
  },
  { 
    id: 4, 
    name: 'Chocolate Fondant', 
    category: 'Dessert', 
    cost: 2.90, 
    rating: 4.9, 
    prepTime: '20 mins', 
    cookTime: '12 mins',
    popularity: 92,
    allergens: ['Gluten', 'Egg', 'Dairy'],
    ingredients: [
      { name: 'Dark Chocolate', quantity: '150g', inStock: true },
      { name: 'Butter', quantity: '100g', inStock: true },
      { name: 'Eggs', quantity: '3', inStock: true },
      { name: 'Sugar', quantity: '80g', inStock: false },
    ]
  },
  { 
    id: 5, 
    name: 'Mushroom Risotto', 
    category: 'Main Course', 
    cost: 4.20, 
    rating: 4.6, 
    prepTime: '15 mins', 
    cookTime: '25 mins',
    popularity: 76,
    allergens: ['Dairy'],
    ingredients: [
      { name: 'Arborio Rice', quantity: '200g', inStock: true },
      { name: 'Mushrooms', quantity: '200g', inStock: true },
      { name: 'Onion', quantity: '1', inStock: true },
      { name: 'Vegetable Stock', quantity: '750ml', inStock: true },
      { name: 'Parmesan', quantity: '50g', inStock: true },
      { name: 'White Wine', quantity: '100ml', inStock: false },
    ]
  },
  { 
    id: 6, 
    name: 'Chicken Wings', 
    category: 'Appetizer', 
    cost: 3.50, 
    rating: 4.4, 
    prepTime: '10 mins', 
    cookTime: '30 mins',
    popularity: 80,
    allergens: [],
    ingredients: [
      { name: 'Chicken Wings', quantity: '500g', inStock: true },
      { name: 'Hot Sauce', quantity: '60ml', inStock: true },
      { name: 'Butter', quantity: '30g', inStock: true },
      { name: 'Garlic Powder', quantity: '1 tsp', inStock: true },
    ]
  }
];

const costAnalyticsData = [
  { name: 'Fish & Chips', value: 4.50 },
  { name: 'Caesar Salad', value: 3.25 },
  { name: 'Spaghetti Carbonara', value: 3.80 },
  { name: 'Chocolate Fondant', value: 2.90 },
  { name: 'Mushroom Risotto', value: 4.20 },
  { name: 'Chicken Wings', value: 3.50 },
];

const ratingAnalyticsData = [
  { name: 'Fish & Chips', value: 4.8 },
  { name: 'Caesar Salad', value: 4.5 },
  { name: 'Spaghetti Carbonara', value: 4.7 },
  { name: 'Chocolate Fondant', value: 4.9 },
  { name: 'Mushroom Risotto', value: 4.6 },
  { name: 'Chicken Wings', value: 4.4 },
];

const categoryDistribution = [
  { name: 'Main Course', value: 3 },
  { name: 'Appetizer', value: 2 },
  { name: 'Dessert', value: 1 },
];

const RecipeList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recipes');
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState<RecipeFilterOptions>({
    categories: [],
    costRange: [0, 10],
    prepTimeRange: [0, 60],
    allergens: [],
    inStockOnly: false,
    popularityMin: 0
  });
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'table'>('list');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  
  const navigate = useNavigate();
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
  }, [debouncedSearchQuery, filterOptions, sortOption]);

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
    setFilterOptions({
      categories: [],
      costRange: [0, 10],
      prepTimeRange: [0, 60],
      allergens: [],
      inStockOnly: false,
      popularityMin: 0
    });
  };

  const chartConfig = {
    cost: {
      label: "Cost per serving",
      theme: {
        light: "#0f62fe",
        dark: "#78a9ff"
      }
    },
    rating: {
      label: "Rating",
      theme: {
        light: "#24a148",
        dark: "#42be65"
      }
    },
    category: {
      label: "Category",
      theme: {
        light: "#8a3ffc",
        dark: "#a56eff"
      }
    }
  };

  const renderTableView = () => (
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
        {filteredRecipes.map((recipe) => (
          <TableRow key={recipe.id} className="cursor-pointer hover:bg-muted" onClick={() => navigate(`/recipes/${recipe.id}`)}>
            <TableCell className="font-medium">{recipe.name}</TableCell>
            <TableCell>{recipe.category}</TableCell>
            <TableCell>${recipe.cost.toFixed(2)}</TableCell>
            <TableCell>{recipe.prepTime}</TableCell>
            <TableCell>{recipe.rating}</TableCell>
            <TableCell>{recipe.popularity}%</TableCell>
            <TableCell>
              {recipe.ingredients.filter((i: any) => i.inStock).length}/{recipe.ingredients.length}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderRecipeItem = (recipe: any) => (
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
                  value={recipe.ingredients.filter((i: any) => i.inStock).length / recipe.ingredients.length * 100} 
                  className="h-2 w-24" 
                />
                <span className="text-xs">
                  {recipe.ingredients.filter((i: any) => i.inStock).length}/{recipe.ingredients.length}
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
                    value={recipe.ingredients.filter((i: any) => i.inStock).length / recipe.ingredients.length * 100} 
                    className="h-2 w-16" 
                  />
                  <span className="text-xs">
                    {recipe.ingredients.filter((i: any) => i.inStock).length}/{recipe.ingredients.length}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </Link>
  );

  return (
    <div className="space-y-5 carbon-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-gray-60" />
          <Input
            placeholder="Search recipes by name, ingredient, category..."
            className="carbon-input pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <SortOptions 
            currentSort={sortOption} 
            onChange={setSortOption} 
          />
          
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'} 
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode('table')}
            >
              <TableIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="carbon-btn-tertiary text-carbon-gray-100"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          
          <Button 
            size="sm" 
            className="carbon-btn-primary"
            onClick={handleAddRecipe}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Recipe
          </Button>
        </div>
      </div>
      
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
                renderTableView()
              ) : (
                <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {filteredRecipes.map(recipe => renderRecipeItem(recipe))}
                </div>
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="analytics" className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="carbon-card">
              <div className="carbon-card-header">
                <h3 className="carbon-card-title flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-carbon-blue-60" />
                  Recipe Cost Analysis
                </h3>
              </div>
              <div className="carbon-card-content h-[300px]">
                <ChartContainer config={chartConfig}>
                  <RechartsBarChart data={costAnalyticsData} margin={{ top: 20, right: 30, left: 40, bottom: 50 }}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      tickLine={{ stroke: '#e0e0e0' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      tickFormatter={(value) => `$${value}`}
                      tickLine={{ stroke: '#e0e0e0' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent 
                          formatter={(value: any) => `$${value}`}
                        />
                      }
                    />
                    <Bar 
                      dataKey="value" 
                      name="cost" 
                      fill="#0f62fe" 
                      radius={[0, 0, 0, 0]}
                    />
                  </RechartsBarChart>
                </ChartContainer>
              </div>
            </Card>
            
            <Card className="carbon-card">
              <div className="carbon-card-header">
                <h3 className="carbon-card-title flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-carbon-green-50" />
                  Recipe Rating Analysis
                </h3>
              </div>
              <div className="carbon-card-content h-[300px]">
                <ChartContainer config={chartConfig}>
                  <RechartsBarChart data={ratingAnalyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      tickLine={{ stroke: '#e0e0e0' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      domain={[0, 5]}
                      tickLine={{ stroke: '#e0e0e0' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent />
                      }
                    />
                    <Bar 
                      dataKey="value" 
                      name="rating" 
                      fill="#24a148" 
                      radius={[0, 0, 0, 0]}
                    />
                  </RechartsBarChart>
                </ChartContainer>
              </div>
            </Card>
            
            <Card className="carbon-card md:col-span-2">
              <div className="carbon-card-header">
                <h3 className="carbon-card-title flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-carbon-purple-50" />
                  Recipe Category Distribution
                </h3>
              </div>
              <div className="carbon-card-content h-[300px]">
                <ChartContainer config={chartConfig}>
                  <RechartsBarChart data={categoryDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      tickLine={{ stroke: '#e0e0e0' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      tickLine={{ stroke: '#e0e0e0' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent 
                          formatter={(value: any) => `${value} recipes`}
                        />
                      }
                    />
                    <Bar 
                      dataKey="value" 
                      name="category" 
                      fill="#8a3ffc" 
                      radius={[0, 0, 0, 0]}
                    />
                  </RechartsBarChart>
                </ChartContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecipeList;
