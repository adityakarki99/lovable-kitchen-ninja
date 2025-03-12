
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProcurementTable from '@/components/procurement/ProcurementTable';
import SupplierPerformance from '@/components/procurement/SupplierPerformance';
import ThreeWayMatching from '@/components/procurement/ThreeWayMatching';
import SupplierOrdering from '@/components/procurement/SupplierOrdering';
import StocktakeModule from '@/components/stocktake/StocktakeModule';
import ReorderPointConfiguration from '@/components/procurement/ReorderPointConfiguration';
import PurchaseOrderApproval from '@/components/procurement/PurchaseOrderApproval';
import LineItemMatching from '@/components/procurement/LineItemMatching';

const Procurement: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-semibold">Procurement <span className="text-sm bg-kitchen-primary text-white px-2 py-0.5 rounded-full ml-2">2</span></h1>
        <p className="text-kitchen-muted-foreground mt-1">Manage purchase orders, deliveries, suppliers, and waste</p>
      </div>
      
      <Tabs defaultValue="ordering" className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="ordering">Supplier Ordering</TabsTrigger>
          <TabsTrigger value="po-approval">PO Approval</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        {/* Supplier Ordering Tab */}
        <TabsContent value="ordering" className="pt-4">
          <SupplierOrdering />
        </TabsContent>

        {/* PO Approval Tab */}
        <TabsContent value="po-approval" className="pt-4">
          <Tabs defaultValue="approval" className="w-full">
            <TabsList className="bg-kitchen-muted">
              <TabsTrigger value="approval">PO Approvals</TabsTrigger>
              <TabsTrigger value="three-way">Three-Way Matching</TabsTrigger>
              <TabsTrigger value="line-item">Line-Item Matching</TabsTrigger>
            </TabsList>
            <TabsContent value="approval" className="pt-4">
              <PurchaseOrderApproval />
            </TabsContent>
            <TabsContent value="three-way" className="pt-4">
              <ThreeWayMatching />
            </TabsContent>
            <TabsContent value="line-item" className="pt-4">
              <LineItemMatching />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Suppliers Tab */}
        <TabsContent value="suppliers" className="pt-4">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="bg-kitchen-muted">
              <TabsTrigger value="list">Supplier List</TabsTrigger>
              <TabsTrigger value="performance">Supplier Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="pt-4">
              <ProcurementTable />
            </TabsContent>
            <TabsContent value="performance" className="pt-4">
              <SupplierPerformance />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Admin Tab */}
        <TabsContent value="admin" className="pt-4">
          <Tabs defaultValue="reorder" className="w-full">
            <TabsList className="bg-kitchen-muted">
              <TabsTrigger value="reorder">Reorder Points</TabsTrigger>
              <TabsTrigger value="par">PAR Level Alerts</TabsTrigger>
            </TabsList>
            <TabsContent value="reorder" className="pt-4">
              <ReorderPointConfiguration />
            </TabsContent>
            <TabsContent value="par" className="pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">PAR Level Alerts</h2>
                <p>Configure and manage PAR level alerts for your inventory items.</p>
                {/* Additional content for PAR Level Alerts */}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Procurement;
