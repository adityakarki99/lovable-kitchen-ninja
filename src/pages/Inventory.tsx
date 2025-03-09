
import React from 'react';
import InventoryTable from '@/components/inventory/InventoryTable';

const Inventory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-semibold">Inventory Management</h1>
        <p className="text-kitchen-muted-foreground mt-1">Track your stock levels, set minimum quantities, and manage prices</p>
      </div>
      
      <InventoryTable />
    </div>
  );
};

export default Inventory;
