
import React from 'react';
import ItemTableHeader from './ItemTableHeader';
import ItemRow from './ItemRow';
import { StockItem } from './types';

interface ItemListProps {
  items: StockItem[];
  quantities: Record<string, string>;
  sortBy: string | null;
  sortDirection: 'asc' | 'desc';
  onQuantityChange: (id: string, value: string) => void;
  onAddItem: (item: StockItem) => void;
  onSort: (column: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ 
  items, 
  quantities, 
  sortBy, 
  sortDirection, 
  onQuantityChange, 
  onAddItem, 
  onSort 
}) => {
  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-kitchen-muted-foreground">
        <p>No items found for this supplier. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
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
    </div>
  );
};

export default ItemList;
