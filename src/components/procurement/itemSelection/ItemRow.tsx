
import React from 'react';
import { AlertCircle, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StockItem } from './types';

interface ItemRowProps {
  item: StockItem;
  quantity: string;
  onQuantityChange: (id: string, value: string) => void;
  onAddItem: (item: StockItem) => void;
}

const ItemRow: React.FC<ItemRowProps> = ({ 
  item, 
  quantity, 
  onQuantityChange, 
  onAddItem 
}) => {
  return (
    <div 
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
          value={quantity || ''}
          onChange={(e) => onQuantityChange(item.id, e.target.value)}
          placeholder="Qty"
          min="1"
        />
        <Button 
          size="sm" 
          className="h-8 px-2"
          onClick={() => onAddItem(item)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ItemRow;
