
import React from 'react';
import ItemTableHeader from './ItemTableHeader';
import ItemRow from './ItemRow';
import ItemGridView from './ItemGridView';
import { StockItem } from './types';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, LayoutList } from 'lucide-react';

interface ItemListProps {
  items: StockItem[];
  quantities: Record<string, string>;
  sortBy: string | null;
  sortDirection: 'asc' | 'desc';
  onQuantityChange: (id: string, value: string) => void;
  onAddItem: (item: StockItem) => void;
  onSort: (column: string) => void;
  viewMode?: 'list' | 'grid';
  onViewModeChange?: (mode: 'list' | 'grid') => void;
}

const ItemList: React.FC<ItemListProps> = ({ 
  items, 
  quantities, 
  sortBy, 
  sortDirection, 
  onQuantityChange, 
  onAddItem, 
  onSort,
  viewMode = 'list',
  onViewModeChange
}) => {
  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-kitchen-muted-foreground">
        <p>No items found for this supplier. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-sm text-kitchen-muted-foreground">
          {items.length} items found
        </p>
        
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => onViewModeChange?.(value as 'list' | 'grid')}>
          <ToggleGroupItem value="list" aria-label="List view" className="h-8 w-8 p-0">
            <LayoutList className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grid view" className="h-8 w-8 p-0">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div className={`max-h-[calc(100vh-300px)] overflow-y-auto ${viewMode === 'grid' ? 'pr-1' : ''}`}>
        {viewMode === 'list' ? (
          <>
            <ItemTableHeader sortBy={sortBy} sortDirection={sortDirection} onSort={onSort} />
            
            {items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                quantity={quantities[item.id] || ''}
                onQuantityChange={onQuantityChange}
                onAddItem={onAddItem}
              />
            ))}
          </>
        ) : (
          <ItemGridView
            items={items}
            quantities={quantities}
            onQuantityChange={onQuantityChange}
            onAddItem={onAddItem}
          />
        )}
      </div>
    </div>
  );
};

export default ItemList;
