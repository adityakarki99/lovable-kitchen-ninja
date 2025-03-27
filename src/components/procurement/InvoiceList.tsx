
import React, { useState } from 'react';
import { Search, Filter, Plus, Download, Scanner } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { invoices } from '@/data/procurement/invoices';

interface InvoiceListProps {
  onSelectInvoice: (id: string) => void;
  onUploadInvoice: () => void;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ onSelectInvoice, onUploadInvoice }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInvoices = invoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.purchaseOrder.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.supplierRef.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-kitchen-foreground">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button 
            size="sm" 
            className="bg-kitchen-primary hover:bg-kitchen-primary/90"
            onClick={onUploadInvoice}
          >
            <Scanner className="mr-2 h-4 w-4" />
            Scan Invoice
          </Button>
        </div>
      </div>
      
      <Card className="shadow-apple-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-kitchen-muted">
            <TableRow>
              <TableHead className="font-medium">Invoice No.</TableHead>
              <TableHead className="font-medium">Purchase Order</TableHead>
              <TableHead className="font-medium">Supplier Ref</TableHead>
              <TableHead className="font-medium">Date Issued</TableHead>
              <TableHead className="font-medium">Due Date</TableHead>
              <TableHead className="font-medium text-right">Total</TableHead>
              <TableHead className="font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-kitchen-muted/30">
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.purchaseOrder}</TableCell>
                <TableCell>{invoice.supplierRef}</TableCell>
                <TableCell>{invoice.dateIssued}</TableCell>
                <TableCell>{invoice.dateDue}</TableCell>
                <TableCell className="text-right">${invoice.total.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onSelectInvoice(invoice.id)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-9 p-0"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default InvoiceList;
