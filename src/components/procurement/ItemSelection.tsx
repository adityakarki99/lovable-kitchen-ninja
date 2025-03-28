
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStockItems } from '@/services/supabase/stockItemService';
import { mapDbStockItemToUi } from '@/utils/dataMappingUtil';
import { useToast } from '@/hooks/use-toast';
import SearchBar from './itemSelection/SearchBar';
import ItemList from './itemSelection/ItemList';
import { sortItems, filterItems } from './itemSelection/sortUtils';
import { StockItem, ParLevelAlert } from './itemSelection/types';

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
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
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

  // Filter and sort items when dependencies change
  useEffect(() => {
    const filtered = filterItems(stockItems, supplierId, searchQuery);
    const sorted = sortItems(filtered, sortBy, sortDirection);
    setFilteredItems(sorted);
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
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          disabled={!supplierId}
        />
      </CardHeader>
      <CardContent className="p-3">
        {supplierId ? (
          loading ? (
            <div className="p-4 text-center">
              <p>Loading items...</p>
            </div>
          ) : (
            <ItemList 
              items={filteredItems}
              quantities={quantities}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onQuantityChange={handleQuantityChange}
              onAddItem={handleAddItem}
              onSort={handleSort}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
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
