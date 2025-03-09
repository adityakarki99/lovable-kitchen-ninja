
import React from 'react';
import InventoryTable from '@/components/inventory/InventoryTable';

const Inventory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-semibold">Inventory Management <span className="text-sm bg-kitchen-primary text-white px-2 py-0.5 rounded-full ml-2">3</span></h1>
        <p className="text-kitchen-muted-foreground mt-1">Track your stock levels across locations, monitor waste, and set PAR levels</p>
      </div>
      
      <InventoryTable />
    </div>
  );
};

export default Inventory;
