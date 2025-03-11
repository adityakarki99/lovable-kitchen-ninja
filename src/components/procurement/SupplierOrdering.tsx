import React, { useState } from 'react';
import { Search, Filter, Plus, CheckCircle, Clock, AlertTriangle, ShoppingCart, CircleDollarSign, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import SupplierSelector from './SupplierSelector';
import ItemSelection from './ItemSelection';
import OrderSummary from './OrderSummary';
import LineItemMatching from './LineItemMatching';

// Mock data for supplier orders
const supplierOrders = [
  { 
    id: 'PO-2305', 
    supplier: 'Fresh Produce Co.', 
    dateOrdered: '2023-07-15', 
    dateDelivery: '2023-07-18',
    items: [
      { name: 'Tomatoes', quantity: '50kg', price: 2.50 },
      { name: 'Lettuce', quantity: '30kg', price: 3.20 }
    ],
    status: 'Delivered', 
    totalCost: 445.18,
    progress: 100
  },
  { 
    id: 'PO-2304', 
    supplier: 'Premium Meats', 
    dateOrdered: '2023-07-14', 
    dateDelivery: '2023-07-19',
    items: [
      { name: 'Chicken Breast', quantity: '20kg', price: 12.50 },
      { name: 'Ground Beef', quantity: '15kg', price: 15.20 }
    ],
    status: 'Partially Delivered', 
    totalCost: 1255.70,
    progress: 70
  },
  { 
    id: 'PO-2303', 
    supplier: '1A Yarra Valley', 
    dateOrdered: '2023-07-13', 
    dateDelivery: '2023-07-16',
    items: [
      { name: 'Fish Fillets', quantity: '20kg', price: 18.25 },
      { name: 'Beer Batter Mix', quantity: '10kg', price: 8.50 }
    ],
    status: 'Delayed', 
    totalCost: 445.18,
    progress: 0
  },
  { 
    id: 'PO-2302', 
    supplier: 'Global Spices', 
    dateOrdered: '2023-07-12', 
    dateDelivery: '2023-07-19',
    items: [
      { name: 'Paprika', quantity: '5kg', price: 22.40 },
      { name: 'Black Pepper', quantity: '8kg', price: 18.90 }
    ],
    status: 'Pending Approval', 
    totalCost: 320.80,
    progress: 0
  },
  { 
    id: 'PO-2301', 
    supplier: 'Fresh Foods', 
    dateOrdered: '2023-07-11', 
    dateDelivery: '2023-07-14',
    items: [
      { name: 'Tomatoes', quantity: '50kg', price: 2.75 },
      { name: 'Lettuce', quantity: '30kg', price: 3.50 }
    ],
    status: 'Delivered', 
    totalCost: 507.08,
    progress: 100
  },
];

// Mock data for PAR level alerts
const parLevelAlerts = [
  { id: 1, name: 'Tomatoes', currentStock: '5kg', parLevel: '10kg', supplier: 'Fresh Foods', suggestedOrder: '10kg' },
  { id: 2, name: 'Onions', currentStock: '2kg', parLevel: '5kg', supplier: 'Fresh Produce Co.', suggestedOrder: '5kg' },
  { id: 3, name: 'Garlic', currentStock: '0.5kg', parLevel: '1kg', supplier: 'Global Spices', suggestedOrder: '2kg' },
];

// Mock data for suppliers
const suppliers = [
  { id: 1, name: 'Fresh Produce Co.', type: 'Vegetables & Fruits', contact: '+1 555-123-4567', deliveryDays: 'Mon, Wed, Fri' },
  { id: 2, name: 'Premium Meats', type: 'Meat & Poultry', contact: '+1 555-987-6543', deliveryDays: 'Tue, Thu' },
  { id: 3, name: '1A Yarra Valley', type: 'Seafood & Specialty', contact: '+1 555-456-7890', deliveryDays: 'Wed, Sat' },
  { id: 4, name: 'Global Spices', type: 'Spices & Dry Goods', contact: '+1 555-789-0123', deliveryDays: 'Mon, Thu' },
  { id: 5, name: 'Fresh Foods', type: 'Vegetables & Fruits', contact: '+1 555-234-5678', deliveryDays: 'Tue, Fri' },
];

const SupplierOrdering: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<Array<{id: number, name: string, quantity: string, price: number}>>([]);
  const { toast } = useToast();
  
  const filteredOrders = supplierOrders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-kitchen-success" />;
      case 'Partially Delivered':
        return <Clock className="h-4 w-4 text-kitchen-warning" />;
      case 'Delayed':
        return <AlertTriangle className="h-4 w-4 text-kitchen-danger" />;
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
        return "bg-kitchen-warning/10 text-kitchen-warning";
      case 'Delayed':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      case 'Pending Approval':
        return "bg-kitchen-muted text-kitchen-muted-foreground";
      default:
        return "";
    }
  };

  const createNewOrder = () => {
    toast({
      title: "New order created",
      description: "Your order has been created and sent for approval",
    });
  };

  const approveOrder = (id: string) => {
    toast({
      title: "Order approved",
      description: `Order ${id} has been approved`,
    });
  };

  const generatePAROrders = () => {
    toast({
      title: "PAR orders generated",
      description: "Orders for items below PAR levels have been created",
    });
  };

  const handleSupplierSelect = (supplierId: number) => {
    setSelectedSupplier(supplierId);
    setActiveTab('new-order');
  };

  const handleAddItem = (item: {id: number, name: string, quantity: string, price: number}) => {
    setSelectedItems(prev => [...prev, item]);
  };

  const handleRemoveItem = (itemId: number) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-xl font-semibold">Unified Supplier Ordering Platform</h2>
        <p className="text-kitchen-muted-foreground mt-1">Manage orders across multiple suppliers from a single interface</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="new-order">Create Order</TabsTrigger>
          <TabsTrigger value="line-item-matching">Line-Item Matching</TabsTrigger>
          <TabsTrigger value="par">PAR Level Alerts</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>
        
        {/* Purchase Orders Tab */}
        <TabsContent value="orders" className="pt-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
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
              <Button 
                size="sm" 
                className="bg-kitchen-primary hover:bg-kitchen-primary/90" 
                onClick={() => setActiveTab('new-order')}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Order
              </Button>
            </div>
          </div>
          
          <Card className="shadow-apple-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-kitchen-muted">
                <TableRow>
                  <TableHead className="font-medium">Order No.</TableHead>
                  <TableHead className="font-medium">Supplier</TableHead>
                  <TableHead className="font-medium">Items</TableHead>
                  <TableHead className="font-medium">Date Ordered</TableHead>
                  <TableHead className="font-medium">Expected Delivery</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium text-right">Total Cost</TableHead>
                  <TableHead className="font-medium">Progress</TableHead>
                  <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-kitchen-muted/30">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="text-sm">
                            {item.name} ({item.quantity})
                          </span>
                        ))}
                      </div>
                    </TableCell>
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
                    <TableCell>
                      {order.status === 'Pending Approval' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => approveOrder(order.id)}
                        >
                          Approve
                        </Button>
                      )}
                      {order.status === 'Delivered' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setActiveTab('line-item-matching')}
                        >
                          Match
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        {/* Create New Order Tab */}
        <TabsContent value="new-order" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Supplier Selection Panel */}
            <div className="lg:col-span-3">
              <SupplierSelector 
                suppliers={suppliers} 
                selectedSupplier={selectedSupplier} 
                onSupplierSelect={handleSupplierSelect} 
              />
            </div>
            
            {/* Item Selection Panel */}
            <div className="lg:col-span-6">
              <ItemSelection 
                supplierId={selectedSupplier} 
                parLevelAlerts={parLevelAlerts}
                onAddItem={handleAddItem}
              />
            </div>
            
            {/* Order Summary Panel */}
            <div className="lg:col-span-3">
              <OrderSummary 
                items={selectedItems} 
                onRemoveItem={handleRemoveItem}
                onCreateOrder={createNewOrder}
              />
            </div>
          </div>
        </TabsContent>
        
        {/* Line-Item Matching Tab */}
        <TabsContent value="line-item-matching" className="pt-4">
          <LineItemMatching />
        </TabsContent>
        
        {/* PAR Level Alerts Tab */}
        <TabsContent value="par" className="pt-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium">Items Below PAR Level</h3>
              <p className="text-kitchen-muted-foreground text-sm">
                These items are below your minimum stock level and need to be reordered
              </p>
            </div>
            <Button 
              className="bg-kitchen-primary hover:bg-kitchen-primary/90"
              onClick={generatePAROrders}
            >
              Generate PAR Orders
            </Button>
          </div>
          
          <Card className="shadow-apple-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-kitchen-muted">
                <TableRow>
                  <TableHead className="font-medium">Item Name</TableHead>
                  <TableHead className="font-medium text-right">Current Stock</TableHead>
                  <TableHead className="font-medium text-right">PAR Level</TableHead>
                  <TableHead className="font-medium">Preferred Supplier</TableHead>
                  <TableHead className="font-medium text-right">Suggested Order</TableHead>
                  <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parLevelAlerts.map((item) => (
                  <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right text-kitchen-danger font-medium">{item.currentStock}</TableCell>
                    <TableCell className="text-right">{item.parLevel}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell className="text-right">{item.suggestedOrder}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Add to Order
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        {/* Suppliers Tab */}
        <TabsContent value="suppliers" className="pt-4">
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
                        onClick={() => handleSupplierSelect(supplier.id)}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierOrdering;
