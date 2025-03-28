
import React, { useState, useEffect } from 'react';
import { Search, Filter, Phone, Mail, Clock, Star, ChevronDown, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { getSuppliers } from '@/services/supabase/supplierService';
import { mapDbSupplierToUi } from '@/utils/dataMappingUtil';

interface Supplier {
  id: string;
  name: string;
  logo: string;
  onTimeDelivery: number;
  qualityRating: number;
  accountManager: string;
  phone: string;
  email: string;
  paymentTerms: string;
  minimumOrder: number;
  deliverySchedule: string;
  categories: string[];
  leadTime: number;
}

interface SuppliersTabProps {
  onSupplierSelect: (supplierId: number) => void;
  onNewSupplier: () => void;
}

const SuppliersTab: React.FC<SuppliersTabProps> = ({ onSupplierSelect, onNewSupplier }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const { success, data, error } = await getSuppliers();
        
        if (success && data) {
          const mappedSuppliers = data.map(supplier => mapDbSupplierToUi(supplier));
          setSuppliers(mappedSuppliers);
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

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (supplier.categories?.some(category => 
      category.toLowerCase().includes(searchQuery.toLowerCase())
    ) || false)
  );

  const handleCreateOrder = (supplierId: string) => {
    onSupplierSelect(parseInt(supplierId));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
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
          <Button 
            size="sm" 
            className="bg-kitchen-primary hover:bg-kitchen-primary/90"
            onClick={onNewSupplier}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Supplier
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="p-8 text-center">
          <p>Loading suppliers...</p>
        </div>
      ) : filteredSuppliers.length === 0 ? (
        <div className="p-8 text-center">
          <p>No suppliers found. {searchQuery ? 'Try a different search term.' : ''}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="overflow-hidden">
              <div className="h-2 bg-kitchen-primary" />
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{supplier.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {supplier.categories && supplier.categories.map((category, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {supplier.logo ? (
                    <img src={supplier.logo} alt={supplier.name} className="h-10 w-10 object-contain" />
                  ) : (
                    <div className="h-10 w-10 bg-kitchen-muted rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold">{supplier.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 mb-4">
                  {supplier.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-4 w-4 text-kitchen-muted-foreground" />
                      {supplier.phone}
                    </div>
                  )}
                  {supplier.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-4 w-4 text-kitchen-muted-foreground" />
                      {supplier.email}
                    </div>
                  )}
                  {supplier.deliverySchedule && (
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-kitchen-muted-foreground" />
                      Delivery: {supplier.deliverySchedule}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(supplier.qualityRating) 
                            ? 'text-amber-500 fill-amber-500' 
                            : 'text-kitchen-muted-foreground'
                        }`} 
                      />
                    ))}
                    <span className="text-sm ml-2">{supplier.qualityRating.toFixed(1)}</span>
                  </div>
                  {supplier.onTimeDelivery > 0 && (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {supplier.onTimeDelivery}% On-time
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCreateOrder(supplier.id)}
                  >
                    Create Order
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
                      <DropdownMenuItem>Supplier Performance</DropdownMenuItem>
                      <DropdownMenuItem>Order History</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuppliersTab;
