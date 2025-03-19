
import React from 'react';
import { BarChart3, Plus } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Supplier {
  id: number;
  name: string;
  type: string;
  contact: string;
  deliveryDays: string;
}

interface SuppliersTabProps {
  suppliers: Supplier[];
  onSupplierSelect: (supplierId: number) => void;
}

const SuppliersTab: React.FC<SuppliersTabProps> = ({ suppliers, onSupplierSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {suppliers.map(supplier => (
        <Card key={supplier.id} className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{supplier.name}</CardTitle>
            <Badge variant="outline" className="mt-1 w-fit">
              {supplier.type}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-kitchen-muted-foreground">Contact:</span>
                <span>{supplier.contact}</span>
              </div>
              
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-kitchen-muted-foreground">Delivery Days:</span>
                <span>{supplier.deliveryDays}</span>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  History
                </Button>
                <Button 
                  size="sm" 
                  className="bg-kitchen-primary hover:bg-kitchen-primary/90"
                  onClick={() => onSupplierSelect(supplier.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SuppliersTab;
