
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package, FileText, Receipt } from 'lucide-react';

type DocumentsTabProps = {
  selectedMatch: any;
};

const DocumentsTab: React.FC<DocumentsTabProps> = ({ selectedMatch }) => {
  return (
    <div className="space-y-4">
      <p className="text-kitchen-muted-foreground">View and download the original documents for this match.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
          <Package className="h-8 w-8 mb-2 text-kitchen-primary" />
          <span className="font-medium">Purchase Order</span>
          <span className="text-sm text-kitchen-muted-foreground mt-1">
            {selectedMatch.purchaseOrder.id}.pdf
          </span>
        </Button>
        
        <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
          <FileText className="h-8 w-8 mb-2 text-kitchen-primary" />
          <span className="font-medium">Receiving Order</span>
          <span className="text-sm text-kitchen-muted-foreground mt-1">
            {selectedMatch.receivingOrder.id}.pdf
          </span>
        </Button>
        
        <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
          <Receipt className="h-8 w-8 mb-2 text-kitchen-primary" />
          <span className="font-medium">Invoice</span>
          <span className="text-sm text-kitchen-muted-foreground mt-1">
            {selectedMatch.invoice.id}.pdf
          </span>
        </Button>
      </div>
    </div>
  );
};

export default DocumentsTab;
