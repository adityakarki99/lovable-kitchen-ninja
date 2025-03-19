
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import SupplierSelector from './SupplierSelector';
import ItemSelection from './ItemSelection';
import OrderSummary from './OrderSummary';
import LineItemMatching from './LineItemMatching';
import ScheduledOrders from './ScheduledOrders';
import PurchaseOrdersTable from './PurchaseOrdersTable';
import ParLevelAlertsTab from './ParLevelAlertsTab';
import SuppliersTab from './SuppliersTab';

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
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<Array<{id: number, name: string, quantity: string, price: number}>>([]);
  const { toast } = useToast();
  
  const createNewOrder = () => {
    toast({
      title: "New order created",
      description: "Your order has been created and sent for approval",
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
          <TabsTrigger value="scheduled-orders">Scheduled Orders</TabsTrigger>
          <TabsTrigger value="new-order">Create Order</TabsTrigger>
          <TabsTrigger value="line-item-matching">Line-Item Matching</TabsTrigger>
          <TabsTrigger value="par">PAR Level Alerts</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>
        
        {/* Purchase Orders Tab */}
        <TabsContent value="orders" className="pt-4">
          <PurchaseOrdersTable 
            orders={supplierOrders} 
            onCreateNewOrder={() => setActiveTab('new-order')}
            onSelectLineItemMatching={() => setActiveTab('line-item-matching')}
          />
        </TabsContent>
        
        {/* Scheduled Orders Tab */}
        <TabsContent value="scheduled-orders" className="pt-4">
          <ScheduledOrders />
        </TabsContent>
        
        {/* Create New Order Tab */}
        <TabsContent value="new-order" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-3">
              <SupplierSelector 
                suppliers={suppliers} 
                selectedSupplier={selectedSupplier} 
                onSupplierSelect={handleSupplierSelect} 
              />
            </div>
            
            <div className="lg:col-span-6">
              <ItemSelection 
                supplierId={selectedSupplier} 
                parLevelAlerts={parLevelAlerts}
                onAddItem={handleAddItem}
              />
            </div>
            
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
          <ParLevelAlertsTab parLevelAlerts={parLevelAlerts} />
        </TabsContent>
        
        {/* Suppliers Tab */}
        <TabsContent value="suppliers" className="pt-4">
          <SuppliersTab 
            suppliers={suppliers} 
            onSupplierSelect={handleSupplierSelect} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierOrdering;
