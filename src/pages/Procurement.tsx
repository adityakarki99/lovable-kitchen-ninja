
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProcurementTable from '@/components/procurement/ProcurementTable';
import SupplierPerformance from '@/components/procurement/SupplierPerformance';
import ThreeWayMatching from '@/components/procurement/ThreeWayMatching';

const Procurement: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-semibold">Procurement <span className="text-sm bg-kitchen-primary text-white px-2 py-0.5 rounded-full ml-2">2</span></h1>
        <p className="text-kitchen-muted-foreground mt-1">Manage purchase orders, deliveries, and suppliers</p>
      </div>
      
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="matching">Three-Way Matching</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="pt-4">
          <ProcurementTable />
        </TabsContent>
        <TabsContent value="matching" className="pt-4">
          <ThreeWayMatching />
        </TabsContent>
        <TabsContent value="suppliers" className="pt-4">
          <SupplierPerformance />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Procurement;
