
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Barcode, ClipboardCheck, PackageCheck, Search, ArrowUpDown, AlertTriangle, Check } from 'lucide-react';

// Mock location data
const locationData = [
  { id: 1, name: 'Main Kitchen', items: 18, selected: true },
  { id: 2, name: 'Cold Storage', items: 12, selected: false },
  { id: 3, name: 'Dry Storage', items: 25, selected: false },
  { id: 4, name: 'Bar', items: 15, selected: false },
];

// Mock category data
const categoryData = [
  { id: 1, name: 'Vegetables', items: 12, selected: true },
  { id: 2, name: 'Meat', items: 8, selected: false },
  { id: 3, name: 'Dairy', items: 6, selected: false },
  { id: 4, name: 'Dry Goods', items: 15, selected: true },
  { id: 5, name: 'Seafood', items: 4, selected: false },
  { id: 6, name: 'Oils', items: 3, selected: false },
];

// Mock inventory data for counting
const inventoryItems = [
  { 
    id: 1, 
    name: 'Tomatoes', 
    category: 'Vegetables', 
    unit: 'kg', 
    theoreticalStock: 10, 
    actualStock: null, 
    location: 'Main Kitchen',
    counted: false,
    status: 'pending'
  },
  { 
    id: 2, 
    name: 'Onions', 
    category: 'Vegetables', 
    unit: 'kg', 
    theoreticalStock: 8, 
    actualStock: null, 
    location: 'Main Kitchen',
    counted: false,
    status: 'pending'
  },
  { 
    id: 3, 
    name: 'Flour', 
    category: 'Dry Goods', 
    unit: 'kg', 
    theoreticalStock: 25, 
    actualStock: null, 
    location: 'Dry Storage',
    counted: false,
    status: 'pending'
  },
  { 
    id: 4, 
    name: 'Sugar', 
    category: 'Dry Goods', 
    unit: 'kg', 
    theoreticalStock: 15, 
    actualStock: null, 
    location: 'Dry Storage',
    counted: false,
    status: 'pending'
  },
  { 
    id: 5, 
    name: 'Rice', 
    category: 'Dry Goods', 
    unit: 'kg', 
    theoreticalStock: 20, 
    actualStock: null, 
    location: 'Dry Storage',
    counted: false,
    status: 'pending'
  },
];

const StartStocktakeFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [locations, setLocations] = useState(locationData);
  const [categories, setCategories] = useState(categoryData);
  const [items, setItems] = useState(inventoryItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCounted, setShowCounted] = useState(false);

  // Step 1: Toggle location selection
  const toggleLocation = (id: number) => {
    setLocations(locations.map(location => 
      location.id === id ? { ...location, selected: !location.selected } : location
    ));
  };

  // Step 1: Toggle category selection
  const toggleCategory = (id: number) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, selected: !category.selected } : category
    ));
  };

  // Step 2: Update actual stock count
  const updateStockCount = (id: number, count: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { 
            ...item, 
            actualStock: count, 
            counted: true, 
            status: count < item.theoreticalStock ? 'low' : count > item.theoreticalStock ? 'high' : 'match' 
          } 
        : item
    ));
  };

  // Filter items for step 2 based on selected locations/categories and search
  const filteredItems = items.filter(item => {
    // Filter by selected locations and categories
    const locationSelected = locations.find(loc => loc.name === item.location)?.selected;
    const categorySelected = categories.find(cat => cat.name === item.category)?.selected;
    
    // Filter by search query
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by count status if showCounted is enabled
    const countStatus = showCounted ? true : !item.counted;
    
    return locationSelected && categorySelected && matchesSearch && countStatus;
  });

  // Calculate summary for step 3
  const countedItems = items.filter(item => item.counted).length;
  const totalItemsToCount = filteredItems.length;
  const completionPercentage = totalItemsToCount > 0 
    ? Math.round((countedItems / totalItemsToCount) * 100) 
    : 0;

  // Calculate variances for summary
  const itemsWithVariance = items.filter(item => 
    item.counted && item.actualStock !== item.theoreticalStock
  );
  
  const totalVariance = itemsWithVariance.reduce((sum, item) => 
    sum + ((item.actualStock || 0) - item.theoreticalStock), 0
  );

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Stocktake Process</h2>
          <p className="text-kitchen-muted-foreground">Step {currentStep} of {totalSteps}</p>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="w-[200px]" />
      </div>

      {/* Step 1: Select Locations & Categories */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Select Location & Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-md font-medium mb-3">Locations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {locations.map(location => (
                  <div 
                    key={location.id} 
                    className={`border rounded-md p-3 cursor-pointer hover:border-primary transition-colors ${
                      location.selected ? 'border-primary bg-primary/5' : 'border-input'
                    }`}
                    onClick={() => toggleLocation(location.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-sm text-kitchen-muted-foreground">{location.items} items</div>
                      </div>
                      <Checkbox checked={location.selected} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium mb-3">Categories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map(category => (
                  <div 
                    key={category.id} 
                    className={`border rounded-md p-3 cursor-pointer hover:border-primary transition-colors ${
                      category.selected ? 'border-primary bg-primary/5' : 'border-input'
                    }`}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-kitchen-muted-foreground">{category.items} items</div>
                      </div>
                      <Checkbox checked={category.selected} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/inventory/stocktake')}>
              Cancel
            </Button>
            <Button onClick={() => setCurrentStep(2)}>
              Continue to Counting
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Count Items */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Barcode className="h-5 w-5" />
              Count Items
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-counted" 
                  checked={showCounted} 
                  onCheckedChange={() => setShowCounted(!showCounted)} 
                />
                <Label htmlFor="show-counted">Show counted items</Label>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-kitchen-muted">
                  <TableRow>
                    <TableHead className="font-medium">Item</TableHead>
                    <TableHead className="font-medium">Location</TableHead>
                    <TableHead className="font-medium">Category</TableHead>
                    <TableHead className="font-medium text-right">Expected</TableHead>
                    <TableHead className="font-medium text-right">Actual Count</TableHead>
                    <TableHead className="font-medium text-center w-24">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">{item.theoreticalStock} {item.unit}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Input
                              type="number"
                              className="w-20 text-right"
                              value={item.actualStock !== null ? item.actualStock : ''}
                              onChange={(e) => {
                                const value = e.target.value === '' ? null : parseFloat(e.target.value);
                                if (value === null || !isNaN(value)) {
                                  updateStockCount(item.id, value as number);
                                }
                              }}
                            />
                            <span className="text-sm text-kitchen-muted-foreground">{item.unit}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.counted ? (
                            <Badge className={
                              item.status === 'low' 
                                ? "bg-kitchen-danger/10 text-kitchen-danger border-kitchen-danger/20" 
                                : item.status === 'high'
                                ? "bg-kitchen-warning/10 text-kitchen-warning border-kitchen-warning/20"
                                : "bg-kitchen-success/10 text-kitchen-success border-kitchen-success/20"
                            }>
                              {item.status === 'low' && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {item.status === 'high' && <ArrowUpDown className="h-3 w-3 mr-1" />}
                              {item.status === 'match' && <Check className="h-3 w-3 mr-1" />}
                              {item.status === 'low' ? 'Low' : 
                               item.status === 'high' ? 'High' : 'Match'}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-kitchen-muted/30">Pending</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-kitchen-muted-foreground">
                        {searchQuery 
                          ? "No items match your search criteria" 
                          : showCounted 
                            ? "No items have been counted yet" 
                            : "All items have been counted! Adjust filters to see them."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="border rounded-md p-3 bg-kitchen-muted/10">
              <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                <div>
                  <p className="text-sm text-kitchen-muted-foreground">Progress</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{countedItems} of {totalItemsToCount} items counted</span>
                    <Badge variant="outline" className="ml-2">
                      {completionPercentage}%
                    </Badge>
                  </div>
                </div>
                <div>
                  <Button size="sm" className="gap-2" variant="outline">
                    <Barcode className="h-4 w-4" />
                    Scan Barcode
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
              Back
            </Button>
            <Button 
              onClick={() => setCurrentStep(3)}
              disabled={countedItems === 0}
            >
              Review & Submit
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Review & Submit */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageCheck className="h-5 w-5" />
              Review & Submit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div>
                    <p className="text-sm text-kitchen-muted-foreground">Items Counted</p>
                    <h3 className="text-2xl font-bold mt-1">{countedItems}</h3>
                    <p className="text-sm text-kitchen-muted-foreground mt-1">
                      {completionPercentage}% of selected items
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div>
                    <p className="text-sm text-kitchen-muted-foreground">Variance Items</p>
                    <h3 className="text-2xl font-bold mt-1">{itemsWithVariance.length}</h3>
                    <p className="text-sm text-kitchen-muted-foreground mt-1">
                      {countedItems > 0 
                        ? Math.round((itemsWithVariance.length / countedItems) * 100)
                        : 0}% of counted items
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div>
                    <p className="text-sm text-kitchen-muted-foreground">Total Variance</p>
                    <h3 className={`text-2xl font-bold mt-1 ${
                      totalVariance < 0 
                        ? 'text-kitchen-danger' 
                        : totalVariance > 0 
                          ? 'text-kitchen-warning' 
                          : ''
                    }`}>
                      {totalVariance > 0 ? '+' : ''}{totalVariance.toFixed(2)} units
                    </h3>
                    <p className="text-sm text-kitchen-muted-foreground mt-1">
                      Across all categories
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-kitchen-muted">
                  <TableRow>
                    <TableHead className="font-medium">Item</TableHead>
                    <TableHead className="font-medium">Location</TableHead>
                    <TableHead className="font-medium">Category</TableHead>
                    <TableHead className="font-medium text-right">Expected</TableHead>
                    <TableHead className="font-medium text-right">Counted</TableHead>
                    <TableHead className="font-medium text-right">Variance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemsWithVariance.length > 0 ? (
                    itemsWithVariance
                      .sort((a, b) => {
                        const aVariance = (a.actualStock || 0) - a.theoreticalStock;
                        const bVariance = (b.actualStock || 0) - b.theoreticalStock;
                        return Math.abs(bVariance) - Math.abs(aVariance);
                      })
                      .map((item) => {
                        const variance = (item.actualStock || 0) - item.theoreticalStock;
                        return (
                          <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell className="text-right">{item.theoreticalStock} {item.unit}</TableCell>
                            <TableCell className="text-right">{item.actualStock} {item.unit}</TableCell>
                            <TableCell className={`text-right font-medium ${
                              variance < 0 
                                ? 'text-kitchen-danger' 
                                : 'text-kitchen-warning'
                            }`}>
                              {variance > 0 ? '+' : ''}{variance} {item.unit}
                            </TableCell>
                          </TableRow>
                        );
                      })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-kitchen-muted-foreground">
                        No variance detected. All items match expected levels.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="border rounded-md p-4 bg-kitchen-muted/10">
              <h3 className="font-medium mb-2">Notes</h3>
              <textarea 
                className="w-full min-h-24 p-3 rounded-md border resize-none" 
                placeholder="Add any notes about this stocktake..."
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              Back to Counting
            </Button>
            <Button 
              onClick={() => {
                // In a real app, this would save the stocktake data
                navigate('/inventory/stocktake');
              }}
            >
              Complete Stocktake
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default StartStocktakeFlow;
