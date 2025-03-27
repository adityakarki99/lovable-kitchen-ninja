
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
import SupplierOnboarding from '@/components/procurement/SupplierOnboarding';
import ComplianceAudits from '@/components/procurement/ComplianceAudits';
import SupplierAdvanced from '@/components/procurement/SupplierAdvanced';
import CreditNoteManagement from '@/components/procurement/CreditNoteManagement';
import InvoiceManagement from '@/components/procurement/InvoiceManagement';
import { suppliers } from '@/data/procurement/suppliers';
import DashboardLayout from '@/components/shared/DashboardLayout';

const Procurement: React.FC = () => {
  return (
    <DashboardLayout
      title="Procurement"
      description="Manage purchase orders, deliveries, suppliers, and inventory ordering"
      className="pb-12"
    >
      <div className="inline-flex items-center bg-kitchen-primary text-white px-2 py-0.5 rounded-full ml-2 text-sm">
        {suppliers.length}
      </div>
      
      <Tabs defaultValue="ordering" className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="ordering">Supplier Ordering</TabsTrigger>
          <TabsTrigger value="po-approval">PO Approval</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="supplier-advanced">Supplier Advanced</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
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
              <TabsTrigger value="credit-notes">Credit Notes</TabsTrigger>
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
            <TabsContent value="credit-notes" className="pt-4">
              <CreditNoteManagement />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Invoices Tab - NEW */}
        <TabsContent value="invoices" className="pt-4">
          <InvoiceManagement />
        </TabsContent>

        {/* Suppliers Tab */}
        <TabsContent value="suppliers" className="pt-4">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="bg-kitchen-muted">
              <TabsTrigger value="list">Supplier List</TabsTrigger>
              <TabsTrigger value="performance">Supplier Performance</TabsTrigger>
              <TabsTrigger value="onboarding">Supplier Onboarding</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="pt-4">
              <ProcurementTable />
            </TabsContent>
            <TabsContent value="performance" className="pt-4">
              <SupplierPerformance />
            </TabsContent>
            <TabsContent value="onboarding" className="pt-4">
              <SupplierOnboarding />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Supplier Advanced Tab */}
        <TabsContent value="supplier-advanced" className="pt-4">
          <SupplierAdvanced />
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="pt-4">
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

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="pt-4">
          <ComplianceAudits />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Procurement;
