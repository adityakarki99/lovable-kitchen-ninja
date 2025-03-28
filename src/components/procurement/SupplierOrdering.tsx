
import React, { useState, useEffect } from 'react';
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
import CreateItemDialog from './dialogs/CreateItemDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Mock data for PAR level alerts - will replace with real data later
const parLevelAlerts = [
  { id: 1, name: 'Tomatoes', currentStock: '5kg', parLevel: '10kg', supplier: 'Fresh Foods', suggestedOrder: '10kg' },
  { id: 2, name: 'Onions', currentStock: '2kg', parLevel: '5kg', supplier: 'Fresh Produce Co.', suggestedOrder: '5kg' },
  { id: 3, name: 'Garlic', currentStock: '0.5kg', parLevel: '1kg', supplier: 'Global Spices', suggestedOrder: '2kg' },
];

const SupplierOrdering: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<Array<{id: number, name: string, quantity: string, price: number}>>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createDialogDefaultTab, setCreateDialogDefaultTab] = useState<'supplier' | 'item'>('supplier');
  const { toast } = useToast();
  
  const createNewOrder = () => {
    toast({
      title: "New order created",
      description: "Your order has been created and sent for approval",
    });
    
    // Reset the order form
    setSelectedItems([]);
    setSelectedSupplier(null);
    setActiveTab('orders');
  };

  const handleSupplierSelect = (supplierId: number) => {
    setSelectedSupplier(supplierId);
    if (activeTab !== 'new-order') {
      setActiveTab('new-order');
    }
  };

  const handleAddItem = (item: {id: number, name: string, quantity: string, price: number}) => {
    setSelectedItems(prev => [...prev, item]);
  };

  const handleRemoveItem = (itemId: number) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleOpenCreateDialog = (tab: 'supplier' | 'item') => {
    setCreateDialogDefaultTab(tab);
    setIsCreateDialogOpen(true);
  };

  const handleCreateSuccess = () => {
    // Refresh data after successful creation
    // We'll implement real data fetching later
    
    // Close the dialog
    setIsCreateDialogOpen(false);
    
    // Show a success message
    toast({
      title: "Created successfully",
      description: `The ${createDialogDefaultTab} was created successfully.`,
    });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Unified Supplier Ordering Platform</h2>
          <p className="text-kitchen-muted-foreground mt-1">Manage orders across multiple suppliers from a single interface</p>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button 
            variant="outline" 
            className="text-kitchen-primary"
            onClick={() => handleOpenCreateDialog('supplier')}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Supplier
          </Button>
          <Button 
            variant="outline" 
            className="text-kitchen-primary"
            onClick={() => handleOpenCreateDialog('item')}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Item
          </Button>
        </div>
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
            onSupplierSelect={handleSupplierSelect}
            onNewSupplier={() => handleOpenCreateDialog('supplier')}
          />
        </TabsContent>
      </Tabs>

      <CreateItemDialog 
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        defaultTab={createDialogDefaultTab}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default SupplierOrdering;
