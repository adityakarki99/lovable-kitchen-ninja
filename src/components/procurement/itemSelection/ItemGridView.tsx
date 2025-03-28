
import React from 'react';
import { AlertCircle, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StockItem } from './types';

interface ItemGridViewProps {
  items: StockItem[];
  quantities: Record<string, string>;
  onQuantityChange: (id: string, value: string) => void;
  onAddItem: (item: StockItem) => void;
}

const ItemGridView: React.FC<ItemGridViewProps> = ({ 
  items, 
  quantities, 
  onQuantityChange, 
  onAddItem 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((item) => (
        <Card key={item.id} className="border-kitchen-border hover:border-kitchen-primary transition-colors">
          <CardContent className="p-3">
            <div className="flex flex-col h-full space-y-2">
              <div className="flex justify-between">
                <h3 className="font-medium line-clamp-1">{item.name}</h3>
                {item.currentStock < item.parLevel && (
                  <AlertCircle className="h-4 w-4 text-kitchen-warning flex-shrink-0" />
                )}
              </div>
              
              <div className="text-sm text-kitchen-muted-foreground">
                {item.category || 'N/A'}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs mt-1">
                <div className="p-1 bg-kitchen-muted/30 rounded">
                  <span className="block text-kitchen-muted-foreground">Current</span>
                  <span className="font-medium">{item.currentStock} {item.unit}</span>
                </div>
                <div className="p-1 bg-kitchen-muted/30 rounded">
                  <span className="block text-kitchen-muted-foreground">PAR</span>
                  <span className="font-medium">{item.parLevel} {item.unit}</span>
                </div>
              </div>
              
              <div className="mt-1 text-sm font-medium">
                ${item.lastOrderedPrice.toFixed(2)} per {item.unit}
              </div>
              
              <div className="flex items-center gap-2 mt-auto pt-2">
                <Input
                  type="number"
                  className="w-16 h-8 text-center"
                  value={quantities[item.id] || ''}
                  onChange={(e) => onQuantityChange(item.id, e.target.value)}
                  placeholder="Qty"
                  min="1"
                />
                <Button 
                  size="sm" 
                  className="h-8 w-full"
                  onClick={() => onAddItem(item)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ItemGridView;
