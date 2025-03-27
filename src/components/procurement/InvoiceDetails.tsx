import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, FileSearch } from 'lucide-react';

type InvoiceDetailsProps = {
  invoiceId: string;
  onBack: () => void;
};

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ invoiceId, onBack }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-xl font-semibold">Invoice {invoiceId}</h2>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            <FileSearch className="h-4 w-4 mr-2" />
            Rescan
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      {/* Invoice details content would go here */}
      <div className="border rounded-md p-8 text-center">
        <p className="text-muted-foreground">No details available for Invoice {invoiceId}</p>
      </div>
    </div>
  );
};

export default InvoiceDetails;
