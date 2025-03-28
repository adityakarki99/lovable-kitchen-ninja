import React, { useState, useEffect } from 'react';
import { Search, Plus, AlertCircle, Filter, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getStockItems } from '@/services/supabase/stockItemService';
import { mapDbStockItemToUi } from '@/utils/dataMappingUtil';
import { useToast } from '@/hooks/use-toast';

interface StockItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
  parLevel: number;
  lastOrderedPrice: number;
  supplier: string;
}

interface ParLevelAlert {
  id: number;
  name: string;
  currentStock: string;
  parLevel: string;
  supplier: string;
  suggestedOrder: string;
}

interface ItemSelectionProps {
  supplierId: number | null;
  parLevelAlerts: ParLevelAlert[];
  onAddItem: (item: { id: number; name: string; quantity: string; price: number }) => void;
}

const ItemSelection: React.FC<ItemSelectionProps> = ({
  supplierId,
  parLevelAlerts,
  onAddItem
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection<'asc' | 'desc'>>('asc');
  const { toast } = useToast();

  // Fetch stock items on component mount
  useEffect(() => {
    const fetchStockItems = async () => {
      try {
        setLoading(true);
        const { success, data, error } = await getStockItems();
        
        if (success && data) {
          const mappedItems = data.map(item => mapDbStockItemToUi(item));
          setStockItems(mappedItems);
        } else if (error) {
          console.error('Error fetching stock items:', error);
          toast({
            title: "Error",
            description: "Failed to load stock items.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStockItems();
  }, [toast]);

  // Filter items when search query or supplier ID changes
  useEffect(() => {
    let filtered = [...stockItems];
    
    // Filter by supplier if a supplier is selected
    if (supplierId) {
      filtered = filtered.filter(item => item.supplier === supplierId.toString());
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting if set
    if (sortBy) {
      filtered.sort((a, b) => {
        let valueA, valueB;
        
        switch (sortBy) {
          case 'name':
            valueA = a.name;
            valueB = b.name;
            break;
          case 'category':
            valueA = a.category;
            valueB = b.category;
            break;
          case 'stock':
            valueA = a.currentStock;
            valueB = b.currentStock;
            break;
          case 'par':
            valueA = a.parLevel;
            valueB = b.parLevel;
            break;
          case 'price':
            valueA = a.lastOrderedPrice;
            valueB = b.lastOrderedPrice;
            break;
          default:
            return 0;
        }
        
        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    setFilteredItems(filtered);
  }, [stockItems, supplierId, searchQuery, sortBy, sortDirection]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const handleQuantityChange = (id: string, value: string) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleAddItem = (item: StockItem) => {
    const quantity = quantities[item.id] || '1';
    onAddItem({
      id: parseInt(item.id),
      name: item.name,
      quantity,
      price: item.lastOrderedPrice
    });
    
    // Clear the quantity after adding
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[item.id];
    setQuantities(updatedQuantities);
    
    toast({
      title: "Item added",
      description: `${quantity} ${item.name} added to order.`,
    });
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{supplierId ? 'Select Items' : 'Select a supplier first'}</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={!supplierId}
          />
        </div>
      </CardHeader>
      <CardContent className="p-3">
        {supplierId ? (
          loading ? (
            <div className="p-4 text-center">
              <p>Loading items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-4 text-center text-kitchen-muted-foreground">
              <p>No items found for this supplier. {searchQuery ? 'Try a different search term.' : ''}</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
              <div className="flex justify-between text-sm text-kitchen-muted-foreground px-3 py-1">
                <div className="w-1/4 cursor-pointer flex items-center" onClick={() => handleSort('name')}>
                  Item {sortBy === 'name' && <ArrowUpDown className="ml-1 h-3 w-3" />}
                </div>
                <div className="w-1/6 cursor-pointer flex items-center" onClick={() => handleSort('category')}>
                  Category {sortBy === 'category' && <ArrowUpDown className="ml-1 h-3 w-3" />}
                </div>
                <div className="w-1/6 cursor-pointer flex items-center" onClick={() => handleSort('stock')}>
                  Stock {sortBy === 'stock' && <ArrowUpDown className="ml-1 h-3 w-3" />}
                </div>
                <div className="w-1/6 cursor-pointer flex items-center" onClick={() => handleSort('par')}>
                  PAR {sortBy === 'par' && <ArrowUpDown className="ml-1 h-3 w-3" />}
                </div>
                <div className="w-1/6 cursor-pointer flex items-center" onClick={() => handleSort('price')}>
                  Price {sortBy === 'price' && <ArrowUpDown className="ml-1 h-3 w-3" />}
                </div>
                <div className="w-1/4 text-right">Actions</div>
              </div>
              
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className="border rounded-lg p-3 transition-colors hover:bg-kitchen-muted/30 border-kitchen-border flex justify-between items-center"
                >
                  <div className="w-1/4 font-medium">{item.name}</div>
                  <div className="w-1/6 text-sm">{item.category || 'N/A'}</div>
                  <div className="w-1/6 text-sm">
                    {item.currentStock} {item.unit}
                    {item.currentStock < item.parLevel && (
                      <AlertCircle className="h-3.5 w-3.5 inline-block ml-1 text-kitchen-warning" />
                    )}
                  </div>
                  <div className="w-1/6 text-sm">{item.parLevel} {item.unit}</div>
                  <div className="w-1/6 text-sm">${item.lastOrderedPrice.toFixed(2)}</div>
                  <div className="w-1/4 flex items-center justify-end gap-2">
                    <Input
                      type="number"
                      className="w-16 h-8 text-center"
                      value={quantities[item.id] || ''}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      placeholder="Qty"
                      min="1"
                    />
                    <Button 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => handleAddItem(item)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="p-8 text-center text-kitchen-muted-foreground border border-dashed rounded-lg">
            <p>Please select a supplier to view available items.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ItemSelection;
