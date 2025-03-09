
import React from 'react';
import { Search, Filter, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mock data
const inventoryItems = [
  { id: 1, name: 'Tomatoes', category: 'Vegetables', unit: 'kg', currentStock: 5, minStock: 10, price: 2.50, status: 'low' },
  { id: 2, name: 'Chicken Breast', category: 'Meat', unit: 'kg', currentStock: 15, minStock: 8, price: 8.75, status: 'good' },
  { id: 3, name: 'Flour', category: 'Dry Goods', unit: 'kg', currentStock: 25, minStock: 5, price: 1.20, status: 'good' },
  { id: 4, name: 'Olive Oil', category: 'Oils', unit: 'liter', currentStock: 4, minStock: 3, price: 9.30, status: 'good' },
  { id: 5, name: 'Onions', category: 'Vegetables', unit: 'kg', currentStock: 2, minStock: 5, price: 1.80, status: 'low' },
  { id: 6, name: 'Garlic', category: 'Vegetables', unit: 'kg', currentStock: 0.5, minStock: 1, price: 3.25, status: 'low' },
  { id: 7, name: 'Salmon Fillet', category: 'Seafood', unit: 'kg', currentStock: 6, minStock: 4, price: 15.50, status: 'good' },
  { id: 8, name: 'Heavy Cream', category: 'Dairy', unit: 'liter', currentStock: 5, minStock: 2, price: 4.25, status: 'good' },
];

const InventoryTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-kitchen-foreground">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="bg-kitchen-primary hover:bg-kitchen-primary/90">
            Update Stock
          </Button>
        </div>
      </div>
      
      <Card className="shadow-apple-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-kitchen-muted">
            <TableRow>
              <TableHead className="font-medium">Item Name</TableHead>
              <TableHead className="font-medium">Category</TableHead>
              <TableHead className="font-medium text-right">Current Stock</TableHead>
              <TableHead className="font-medium text-right">Min Stock</TableHead>
              <TableHead className="font-medium text-right">Price / Unit</TableHead>
              <TableHead className="font-medium text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">{item.currentStock} {item.unit}</TableCell>
                <TableCell className="text-right">{item.minStock} {item.unit}</TableCell>
                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <span className={cn(
                    "pill-badge inline-flex items-center",
                    item.status === 'low' 
                      ? "bg-kitchen-danger/10 text-kitchen-danger" 
                      : "bg-kitchen-success/10 text-kitchen-success"
                  )}>
                    {item.status === 'low' ? (
                      <>
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Low Stock
                      </>
                    ) : (
                      <>
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Good
                      </>
                    )}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default InventoryTable;
