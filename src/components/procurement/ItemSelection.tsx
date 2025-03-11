
import React, { useState } from 'react';
import { Search, Filter, Grid, List, Barcode, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PARAlert {
  id: number;
  name: string;
  currentStock: string;
  parLevel: string;
  supplier: string;
  suggestedOrder: string;
}

interface ItemSelectionProps {
  supplierId: number | null;
  parLevelAlerts: PARAlert[];
  onAddItem: (item: {id: number, name: string, quantity: string, price: number}) => void;
}

// Mock data for items by supplier
const supplierItems = [
  // Fresh Produce Co. (ID: 1)
  [
    { id: 101, name: 'Tomatoes', category: 'Produce', price: 2.50, imageUrl: '/placeholder.svg', inStock: true, parLevel: '10kg', currentStock: '5kg', belowPAR: true },
    { id: 102, name: 'Lettuce', category: 'Produce', price: 3.20, imageUrl: '/placeholder.svg', inStock: true, parLevel: '7kg', currentStock: '4kg', belowPAR: true },
    { id: 103, name: 'Carrots', category: 'Produce', price: 1.80, imageUrl: '/placeholder.svg', inStock: true, parLevel: '8kg', currentStock: '10kg', belowPAR: false },
    { id: 104, name: 'Onions', category: 'Produce', price: 1.50, imageUrl: '/placeholder.svg', inStock: true, parLevel: '5kg', currentStock: '2kg', belowPAR: true },
    { id: 105, name: 'Bell Peppers', category: 'Produce', price: 4.00, imageUrl: '/placeholder.svg', inStock: true, parLevel: '3kg', currentStock: '2kg', belowPAR: true },
    { id: 106, name: 'Cucumbers', category: 'Produce', price: 2.20, imageUrl: '/placeholder.svg', inStock: true, parLevel: '4kg', currentStock: '5kg', belowPAR: false },
    { id: 107, name: 'Mushrooms', category: 'Produce', price: 6.50, imageUrl: '/placeholder.svg', inStock: true, parLevel: '2kg', currentStock: '1.5kg', belowPAR: true },
    { id: 108, name: 'Potatoes', category: 'Produce', price: 1.20, imageUrl: '/placeholder.svg', inStock: true, parLevel: '15kg', currentStock: '8kg', belowPAR: true }
  ],
  // Premium Meats (ID: 2)
  [
    { id: 201, name: 'Chicken Breast', category: 'Meat', price: 12.50, imageUrl: '/placeholder.svg', inStock: true, parLevel: '10kg', currentStock: '7kg', belowPAR: true },
    { id: 202, name: 'Ground Beef', category: 'Meat', price: 15.20, imageUrl: '/placeholder.svg', inStock: true, parLevel: '8kg', currentStock: '5kg', belowPAR: true },
    { id: 203, name: 'Pork Chops', category: 'Meat', price: 14.00, imageUrl: '/placeholder.svg', inStock: true, parLevel: '5kg', currentStock: '3kg', belowPAR: true },
    { id: 204, name: 'Bacon', category: 'Meat', price: 18.50, imageUrl: '/placeholder.svg', inStock: true, parLevel: '4kg', currentStock: '2kg', belowPAR: true }
  ],
  // 1A Yarra Valley (ID: 3)
  [
    { id: 301, name: 'Fish Fillets', category: 'Seafood', price: 18.25, imageUrl: '/placeholder.svg', inStock: true, parLevel: '8kg', currentStock: '5kg', belowPAR: true },
    { id: 302, name: 'Beer Batter Mix', category: 'Dry Goods', price: 8.50, imageUrl: '/placeholder.svg', inStock: true, parLevel: '5kg', currentStock: '2kg', belowPAR: true }
  ],
  // Global Spices (ID: 4)
  [
    { id: 401, name: 'Paprika', category: 'Spices', price: 22.40, imageUrl: '/placeholder.svg', inStock: true, parLevel: '2kg', currentStock: '1kg', belowPAR: true },
    { id: 402, name: 'Black Pepper', category: 'Spices', price: 18.90, imageUrl: '/placeholder.svg', inStock: true, parLevel: '3kg', currentStock: '0.5kg', belowPAR: true },
    { id: 403, name: 'Garlic Powder', category: 'Spices', price: 15.75, imageUrl: '/placeholder.svg', inStock: true, parLevel: '1kg', currentStock: '0.5kg', belowPAR: true }
  ],
  // Fresh Foods (ID: 5)
  [
    { id: 501, name: 'Tomatoes', category: 'Produce', price: 2.75, imageUrl: '/placeholder.svg', inStock: true, parLevel: '10kg', currentStock: '5kg', belowPAR: true },
    { id: 502, name: 'Lettuce', category: 'Produce', price: 3.50, imageUrl: '/placeholder.svg', inStock: true, parLevel: '7kg', currentStock: '6kg', belowPAR: true }
  ]
];

const ItemSelection: React.FC<ItemSelectionProps> = ({
  supplierId,
  parLevelAlerts,
  onAddItem
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [category, setCategory] = useState<string>('all');
  const [showBelowPAROnly, setShowBelowPAROnly] = useState(false);
  const [quantities, setQuantities] = useState<Record<number, string>>({});

  const items = supplierId !== null && supplierId > 0 && supplierId <= supplierItems.length
    ? supplierItems[supplierId - 1]
    : [];

  const handleQuantityChange = (itemId: number, value: string) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: value
    }));
  };

  const handleAddItem = (item: typeof items[0]) => {
    const quantity = quantities[item.id] || '1kg';
    onAddItem({
      id: item.id,
      name: item.name,
      quantity,
      price: item.price
    });
    
    // Reset quantity after adding
    setQuantities(prev => {
      const newQuantities = {...prev};
      delete newQuantities[item.id];
      return newQuantities;
    });
  };

  const filteredItems = items.filter(item => {
    // Filter by search query
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = category === 'all' || item.category.toLowerCase() === category.toLowerCase();
    
    // Filter by PAR level
    const matchesPAR = !showBelowPAROnly || item.belowPAR;
    
    return matchesSearch && matchesCategory && matchesPAR;
  });

  const categories = ['all', ...new Set(items.map(item => item.category.toLowerCase()))];

  if (!supplierId) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">Select Items</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64 text-kitchen-muted-foreground">
          Please select a supplier first
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Select Items</CardTitle>
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
            <Input
              placeholder="Search items..."
              className="pl-9 bg-white border-kitchen-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant={showBelowPAROnly ? "default" : "outline"}
              size="icon"
              className={showBelowPAROnly ? "bg-kitchen-warning text-white" : ""}
              onClick={() => setShowBelowPAROnly(!showBelowPAROnly)}
              title="Show items below PAR level"
            >
              <AlertCircle className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className={viewMode === 'grid' ? "border-kitchen-primary bg-kitchen-primary/5" : ""}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className={viewMode === 'list' ? "border-kitchen-primary bg-kitchen-primary/5" : ""}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        {filteredItems.length === 0 ? (
          <div className="flex justify-center items-center h-40 text-kitchen-muted-foreground">
            No items match your filters
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredItems.map(item => (
              <div key={item.id} className="border rounded-lg p-3 hover:bg-kitchen-muted/10">
                <div className="flex items-center gap-2 mb-2">
                  <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Price: ${item.price.toFixed(2)}/kg</span>
                  {item.belowPAR && (
                    <Badge variant="outline" className="bg-kitchen-warning/10 text-kitchen-warning border-kitchen-warning">
                      Below PAR
                    </Badge>
                  )}
                </div>
                
                <div className="text-xs text-kitchen-muted-foreground mb-3">
                  <div className="flex justify-between">
                    <span>PAR Level: {item.parLevel}</span>
                    <span>Current: {item.currentStock}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Quantity"
                    value={quantities[item.id] || ''}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="text-sm h-9"
                  />
                  <Button size="sm" onClick={() => handleAddItem(item)}>
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg divide-y max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredItems.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-kitchen-muted/10">
                <Checkbox id={`item-${item.id}`} />
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <label htmlFor={`item-${item.id}`} className="font-medium cursor-pointer">
                      {item.name}
                    </label>
                    {item.belowPAR && (
                      <Badge variant="outline" className="bg-kitchen-warning/10 text-kitchen-warning border-kitchen-warning">
                        Below PAR
                      </Badge>
                    )}
                  </div>
                  <div className="flex text-xs text-kitchen-muted-foreground">
                    <span className="mr-3">Price: ${item.price.toFixed(2)}/kg</span>
                    <span className="mr-3">PAR: {item.parLevel}</span>
                    <span>Current: {item.currentStock}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Qty"
                    value={quantities[item.id] || ''}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="text-sm w-20 h-8"
                  />
                  <Button size="sm" onClick={() => handleAddItem(item)}>
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ItemSelection;
