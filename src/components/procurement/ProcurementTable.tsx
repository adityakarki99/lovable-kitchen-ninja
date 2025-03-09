
import React from 'react';
import { Search, Filter, CheckCircle, Clock, AlertCircle, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock data
const purchaseOrders = [
  { 
    id: 'PO-2305', 
    supplier: 'Fresh Produce Co.', 
    dateOrdered: '2023-07-15', 
    dateDelivery: '2023-07-18',
    status: 'Delivered', 
    totalCost: 445.18,
    progress: 100
  },
  { 
    id: 'PO-2304', 
    supplier: 'Premium Meats', 
    dateOrdered: '2023-07-14', 
    dateDelivery: '2023-07-19',
    status: 'Partially Delivered', 
    totalCost: 1255.70,
    progress: 70
  },
  { 
    id: 'PO-2303', 
    supplier: 'Seafood Direct', 
    dateOrdered: '2023-07-13', 
    dateDelivery: '2023-07-16',
    status: 'Delayed', 
    totalCost: 852.35,
    progress: 0
  },
  { 
    id: 'PO-2302', 
    supplier: 'Global Spices', 
    dateOrdered: '2023-07-12', 
    dateDelivery: '2023-07-19',
    status: 'Pending Approval', 
    totalCost: 320.80,
    progress: 0
  },
  { 
    id: 'PO-2301', 
    supplier: 'Bakery Supplies Inc.', 
    dateOrdered: '2023-07-11', 
    dateDelivery: '2023-07-14',
    status: 'Delivered', 
    totalCost: 645.90,
    progress: 100
  },
  { 
    id: 'PO-2300', 
    supplier: 'Kitchen Equipment Pro', 
    dateOrdered: '2023-07-10', 
    dateDelivery: '2023-07-25',
    status: 'Processing', 
    totalCost: 2175.25,
    progress: 30
  },
];

const ProcurementTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredOrders = purchaseOrders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                <TableCell>{order.supplier}</TableCell>
                <TableCell>{order.dateOrdered}</TableCell>
                <TableCell>{order.dateDelivery}</TableCell>
                <TableCell>
                  <div className={cn(
                    "pill-badge inline-flex items-center gap-1",
                    getStatusClass(order.status)
                  )}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">${order.totalCost.toFixed(2)}</TableCell>
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
      </Card>
    </div>
  );
};

export default ProcurementTable;
