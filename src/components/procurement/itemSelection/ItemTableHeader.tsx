
import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface ItemTableHeaderProps {
  sortBy: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
}

const ItemTableHeader: React.FC<ItemTableHeaderProps> = ({ 
  sortBy, 
  sortDirection, 
  onSort 
}) => {
  return (
    <div className="flex justify-between text-sm text-kitchen-muted-foreground px-3 py-1">
      <div className="w-1/4 cursor-pointer flex items-center" onClick={() => onSort('name')}>
        Item {sortBy === 'name' && <ArrowUpDown className="ml-1 h-3 w-3" />}
      </div>
      <div className="w-1/6 cursor-pointer flex items-center" onClick={() => onSort('category')}>
        Category {sortBy === 'category' && <ArrowUpDown className="ml-1 h-3 w-3" />}
      </div>
      <div className="w-1/6 cursor-pointer flex items-center" onClick={() => onSort('stock')}>
        Stock {sortBy === 'stock' && <ArrowUpDown className="ml-1 h-3 w-3" />}
      </div>
      <div className="w-1/6 cursor-pointer flex items-center" onClick={() => onSort('par')}>
        PAR {sortBy === 'par' && <ArrowUpDown className="ml-1 h-3 w-3" />}
      </div>
      <div className="w-1/6 cursor-pointer flex items-center" onClick={() => onSort('price')}>
        Price {sortBy === 'price' && <ArrowUpDown className="ml-1 h-3 w-3" />}
      </div>
      <div className="w-1/4 text-right">Actions</div>
    </div>
  );
};

export default ItemTableHeader;
