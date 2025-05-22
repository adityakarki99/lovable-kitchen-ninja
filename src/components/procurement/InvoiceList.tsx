
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileSearch, Plus, Download, Link as LinkIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { invoices } from '@/data/procurement/invoices';

type InvoiceListProps = {
  onSelectInvoice: (id: string) => void;
  onUploadInvoice: () => void;
};

const InvoiceList: React.FC<InvoiceListProps> = ({ onSelectInvoice, onUploadInvoice }) => {
  const getMatchStatusBadge = (invoice: any) => {
    // Mock match status detection - in a real app would be from the database
    const matchedItems = invoice.items.filter((item: any) => item.item);
    const matchPercentage = matchedItems.length / invoice.items.length;
    
    if (matchPercentage === 1) {
      return <Badge variant="success">Fully Matched</Badge>;
    } else if (matchPercentage > 0) {
      return <Badge variant="warning">Partially Matched</Badge>;
    } else {
      return <Badge variant="outline">Unmatched</Badge>;
    }
  };
  
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
      
      {invoices.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Stock Match</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.dateIssued}</TableCell>
                <TableCell>{invoice.dateDue || 'N/A'}</TableCell>
                <TableCell>${invoice.total.toFixed(2)}</TableCell>
                <TableCell>{getMatchStatusBadge(invoice)}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onSelectInvoice(invoice.id)}
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                  >
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="border rounded-md p-4 text-center">
          <p className="text-muted-foreground">No invoices found</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
