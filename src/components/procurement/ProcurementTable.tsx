
import React, { useEffect, useState } from 'react';
import { Search, Filter, CheckCircle, Clock, AlertCircle, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { getPurchaseOrders } from '@/services/supabase/purchaseOrderService';
import { mapDbPurchaseOrderToUi } from '@/utils/dataMappingUtil';
import { format } from 'date-fns';

interface PurchaseOrder {
  id: string;
  supplier: any;
  dateOrdered: string;
  dateDelivery: string;
  status: string;
  totalAmount: number;
  progress: number;
}

const ProcurementTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        setLoading(true);
        const { success, data, error } = await getPurchaseOrders();
        
        if (success && data) {
          // Map the database objects to UI objects and calculate progress
          const uiOrders = data.map(order => {
            const uiOrder = mapDbPurchaseOrderToUi(order);
            
            // Add a progress field based on status
            let progress = 0;
            switch (order.status) {
              case 'Delivered':
                progress = 100;
                break;
              case 'Partially Delivered':
                progress = 70;
                break;
              case 'Processing':
                progress = 30;
                break;
              case 'Delayed':
              case 'Pending Approval':
              default:
                progress = 0;
            }
            
            return { ...uiOrder, progress };
          });
          
          setPurchaseOrders(uiOrders);
        } else if (error) {
          console.error('Error fetching purchase orders:', error);
          toast({
            title: "Error",
            description: "Failed to load purchase orders.",
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
    
    fetchPurchaseOrders();
  }, [toast]);
  
  const filteredOrders = purchaseOrders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (order.supplier?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-kitchen-success" />;
      case 'Partially Delivered':
      case 'Processing':
        return <Clock className="h-4 w-4 text-kitchen-warning" />;
      case 'Delayed':
        return <AlertCircle className="h-4 w-4 text-kitchen-danger" />;
      case 'Pending Approval':
        return <ShoppingCart className="h-4 w-4 text-kitchen-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Delivered':
        return "bg-kitchen-success/10 text-kitchen-success";
      case 'Partially Delivered':
      case 'Processing':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      case 'Delayed':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      case 'Pending Approval':
        return "bg-kitchen-muted text-kitchen-muted-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search purchase orders..."
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
            New Purchase Order
          </Button>
        </div>
      </div>
      
      <Card className="shadow-apple-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p>Loading purchase orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 text-center">
            <p>No purchase orders found. {searchQuery ? 'Try a different search term.' : ''}</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-kitchen-muted">
              <TableRow>
                <TableHead className="font-medium">Order No.</TableHead>
                <TableHead className="font-medium">Supplier Name</TableHead>
                <TableHead className="font-medium">Date Ordered</TableHead>
                <TableHead className="font-medium">Expected Delivery</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium text-right">Total Cost</TableHead>
                <TableHead className="font-medium">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-kitchen-muted/30">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.supplier?.name || 'N/A'}</TableCell>
                  <TableCell>{format(new Date(order.dateOrdered), 'yyyy-MM-dd')}</TableCell>
                  <TableCell>{order.dateDelivery ? format(new Date(order.dateDelivery), 'yyyy-MM-dd') : 'N/A'}</TableCell>
                  <TableCell>
                    <div className={cn(
                      "pill-badge inline-flex items-center gap-1",
                      getStatusClass(order.status)
                    )}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={order.progress} className="h-2" />
                      <span className="text-xs font-medium">{order.progress}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default ProcurementTable;
