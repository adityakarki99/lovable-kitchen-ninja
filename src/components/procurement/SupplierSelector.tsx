
import React from 'react';
import { Search, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Supplier {
  id: number;
  name: string;
  type: string;
  contact: string;
  deliveryDays: string;
}

interface SupplierSelectorProps {
  suppliers: Supplier[];
  selectedSupplier: number | null;
  onSupplierSelect: (supplierId: number) => void;
}

const SupplierSelector: React.FC<SupplierSelectorProps> = ({
  suppliers,
  selectedSupplier,
  onSupplierSelect
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [recentSuppliers, setRecentSuppliers] = React.useState<Supplier[]>([]);

  React.useEffect(() => {
    // In a real app, this would be fetched from a database
    // For now, let's just use the first 5 suppliers as "recent"
    setRecentSuppliers(suppliers.slice(0, 5));
  }, [suppliers]);

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Select Supplier</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-3">
        {searchQuery === '' && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-kitchen-muted-foreground mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" /> Recent Suppliers
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSuppliers.map(supplier => (
                <Button 
                  key={supplier.id}
                  variant="outline"
                  size="sm"
                  className={supplier.id === selectedSupplier ? "border-kitchen-primary" : ""}
                  onClick={() => onSupplierSelect(supplier.id)}
                >
                  {supplier.name}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {filteredSuppliers.map(supplier => (
            <div 
              key={supplier.id}
              className={`border rounded-lg p-3 cursor-pointer transition-colors hover:bg-kitchen-muted/30 ${
                supplier.id === selectedSupplier ? "border-kitchen-primary bg-kitchen-primary/5" : "border-kitchen-border"
              }`}
              onClick={() => onSupplierSelect(supplier.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{supplier.name}</h3>
                <Badge variant="outline">{supplier.type}</Badge>
              </div>
              <div className="text-sm text-kitchen-muted-foreground">
                <div className="mb-1">Contact: {supplier.contact}</div>
                <div>Delivery: {supplier.deliveryDays}</div>
              </div>
              {supplier.id === 1 && (
                <div className="flex items-center mt-2 text-xs text-amber-600">
                  <Star className="h-3 w-3 mr-1 fill-amber-500" />
                  <Star className="h-3 w-3 mr-1 fill-amber-500" />
                  <Star className="h-3 w-3 mr-1 fill-amber-500" />
                  <Star className="h-3 w-3 mr-1 fill-amber-500" />
                  <Star className="h-3 w-3 mr-1" />
                  <span className="ml-1">95% on-time delivery</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierSelector;
