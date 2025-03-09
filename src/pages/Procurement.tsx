
import React from 'react';
import ProcurementTable from '@/components/procurement/ProcurementTable';

const Procurement: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-semibold">Procurement</h1>
        <p className="text-kitchen-muted-foreground mt-1">Manage purchase orders, deliveries, and suppliers</p>
      </div>
      
      <ProcurementTable />
    </div>
  );
};

export default Procurement;
