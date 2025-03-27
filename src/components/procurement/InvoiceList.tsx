import React from 'react';
import { Button } from '@/components/ui/button';
import { FileSearch, Plus } from 'lucide-react';

type InvoiceListProps = {
  onSelectInvoice: (id: string) => void;
  onUploadInvoice: () => void;
};

const InvoiceList: React.FC<InvoiceListProps> = ({ onSelectInvoice, onUploadInvoice }) => {
  // Implementation would go here
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Invoices</h2>
        <div className="space-x-2">
          <Button onClick={onUploadInvoice} className="gap-1">
            <FileSearch className="h-4 w-4" />
            Scan Invoice
          </Button>
          <Button onClick={onUploadInvoice} className="gap-1">
            <Plus className="h-4 w-4" />
            Add Invoice
          </Button>
        </div>
      </div>
      {/* Actual invoice list would go here */}
      <div className="border rounded-md p-4 text-center">
        <p className="text-muted-foreground">No invoices found</p>
      </div>
    </div>
  );
};

export default InvoiceList;
