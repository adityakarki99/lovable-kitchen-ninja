
import React, { useEffect, useState } from 'react';
import { Search, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getSuppliers } from '@/services/supabase/supplierService';
import { mapDbSupplierToUi } from '@/utils/dataMappingUtil';
import { useToast } from '@/hooks/use-toast';

interface Supplier {
  id: string;
  name: string;
  categories: string[];
  phone: string;
  deliverySchedule: string;
  onTimeDelivery: number;
  qualityRating: number;
}

interface SupplierSelectorProps {
  selectedSupplier: number | null;
  onSupplierSelect: (supplierId: number) => void;
}

const SupplierSelector: React.FC<SupplierSelectorProps> = ({
  selectedSupplier,
  onSupplierSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSuppliers, setRecentSuppliers] = useState<Supplier[]>([]);
  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const { success, data, error } = await getSuppliers();
        
        if (success && data) {
          const mappedSuppliers = data.map(supplier => mapDbSupplierToUi(supplier));
          setAllSuppliers(mappedSuppliers);
          // Use the first 5 suppliers as "recent" for now
          setRecentSuppliers(mappedSuppliers.slice(0, 5));
        } else if (error) {
          console.error('Error fetching suppliers:', error);
          toast({
            title: "Error",
            description: "Failed to load suppliers.",
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
    
    fetchSuppliers();
  }, [toast]);

  const filteredSuppliers = allSuppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (supplier.categories?.some(category => 
      category.toLowerCase().includes(searchQuery.toLowerCase())
    ) || false)
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
        {loading ? (
          <div className="p-4 text-center">
            <p>Loading suppliers...</p>
          </div>
        ) : (
          <>
            {searchQuery === '' && recentSuppliers.length > 0 && (
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
                      className={parseInt(supplier.id) === selectedSupplier ? "border-kitchen-primary" : ""}
                      onClick={() => onSupplierSelect(parseInt(supplier.id))}
                    >
                      {supplier.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {filteredSuppliers.length === 0 ? (
              <div className="p-4 text-center">
                <p>No suppliers found. {searchQuery ? 'Try a different search term.' : ''}</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                {filteredSuppliers.map(supplier => (
                  <div 
                    key={supplier.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors hover:bg-kitchen-muted/30 ${
                      parseInt(supplier.id) === selectedSupplier ? "border-kitchen-primary bg-kitchen-primary/5" : "border-kitchen-border"
                    }`}
                    onClick={() => onSupplierSelect(parseInt(supplier.id))}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{supplier.name}</h3>
                      <Badge variant="outline">
                        {supplier.categories && supplier.categories.length > 0 
                          ? supplier.categories[0] 
                          : 'General'
                        }
                      </Badge>
                    </div>
                    <div className="text-sm text-kitchen-muted-foreground">
                      <div className="mb-1">Contact: {supplier.phone || 'N/A'}</div>
                      <div>Delivery: {supplier.deliverySchedule || 'Not specified'}</div>
                    </div>
                    {supplier.onTimeDelivery > 0 && (
                      <div className="flex items-center mt-2 text-xs text-amber-600">
                        {Array.from({ length: Math.min(5, Math.ceil(supplier.qualityRating || 0)) }).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 mr-1 ${i < Math.floor(supplier.qualityRating || 0) ? 'fill-amber-500' : ''}`} />
                        ))}
                        <span className="ml-1">{supplier.onTimeDelivery}% on-time delivery</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SupplierSelector;
