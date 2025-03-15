
import React from 'react';
import { format } from 'date-fns';
import { 
  Card, CardContent, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Grid, ListFilter, Plus } from 'lucide-react';
import { products, getStatusColor } from './utils';
import { useToast } from '@/hooks/use-toast';

interface ProductCatalogProps {
  productView: 'grid' | 'list';
  setProductView: (view: 'grid' | 'list') => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ 
  productView, 
  setProductView 
}) => {
  const { toast } = useToast();

  const handlePlaceOrder = (productId: number) => {
    toast({
      title: "Product added to order",
      description: "The product has been added to your current order.",
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9 bg-white border-kitchen-border"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-kitchen-foreground">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <div className="flex border rounded-md">
            <Button
              variant="ghost"
              size="sm"
              className={productView === 'grid' ? 'bg-kitchen-muted' : ''}
              onClick={() => setProductView('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={productView === 'list' ? 'bg-kitchen-muted' : ''}
              onClick={() => setProductView('list')}
            >
              <ListFilter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {productView === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square bg-kitchen-muted flex items-center justify-center text-4xl">
                {product.image}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{product.name}</h3>
                  {product.organic && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Organic
                    </Badge>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-kitchen-muted-foreground">per {product.unit}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <Badge className={getStatusColor(product.availability)}>
                    {product.availability}
                  </Badge>
                  <span className="text-sm text-kitchen-muted-foreground">{product.supplier}</span>
                </div>
                {product.availability === 'Low Stock' && product.restockDate && (
                  <p className="text-sm text-kitchen-muted-foreground mt-2">
                    Restock: {format(product.restockDate, 'MMM d, yyyy')}
                  </p>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  className="w-full bg-carbon-blue-60 hover:bg-carbon-blue-70"
                  onClick={() => handlePlaceOrder(product.id)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Order
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="divide-y">
            {products.map((product) => (
              <div key={product.id} className="p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                <div className="w-16 h-16 bg-kitchen-muted flex items-center justify-center text-2xl shrink-0">
                  {product.image}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{product.name}</h3>
                        {product.organic && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Organic
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-kitchen-muted-foreground">{product.supplier}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
                      <div className="text-sm text-kitchen-muted-foreground">per {product.unit}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge className={getStatusColor(product.availability)}>
                      {product.availability}
                    </Badge>
                    
                    {product.availability === 'Low Stock' && product.restockDate && (
                      <span className="text-sm text-kitchen-muted-foreground">
                        Restock: {format(product.restockDate, 'MMM d, yyyy')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="shrink-0">
                  <Button 
                    className="w-full bg-carbon-blue-60 hover:bg-carbon-blue-70"
                    onClick={() => handlePlaceOrder(product.id)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
};
