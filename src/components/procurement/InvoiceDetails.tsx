
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowLeft, File, Download, Scanner } from 'lucide-react';
import { creditNotes } from '@/data/procurement/creditNotes';
import { invoices } from '@/data/procurement/invoices';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import InvoiceScanner from './InvoiceScanner';
import { useToast } from '@/hooks/use-toast';

interface InvoiceDetailsProps {
  invoiceId: string;
  onBack: () => void;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ invoiceId, onBack }) => {
  const [isOcrDialogOpen, setIsOcrDialogOpen] = useState(false);
  const invoice = invoices.find(inv => inv.id === invoiceId);
  const relatedCreditNotes = creditNotes.filter(cn => cn.purchaseOrderId === invoice?.purchaseOrder);
  const { toast } = useToast();

  if (!invoice) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium">Invoice not found</h3>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Invoices
        </Button>
      </div>
    );
  }

  const handleScanComplete = (result: any) => {
    // In a real app, you would update the invoice with the scanned data
    console.log('Scan result:', result);
    setIsOcrDialogOpen(false);
    
    toast({
      title: 'Invoice scanned successfully',
      description: 'The invoice data has been updated',
    });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Invoices
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => setIsOcrDialogOpen(true)}
          >
            <Scanner className="mr-2 h-4 w-4" />
            Scan with OCR
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="shadow-apple-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Invoice {invoice.id}</CardTitle>
          <div className="flex items-center gap-2">
            <File className="h-5 w-5 text-kitchen-primary" />
            <span className="text-sm font-medium">PO: {invoice.purchaseOrder}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-kitchen-muted-foreground mb-2">Invoice Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Invoice Number:</span>
                  <span className="font-medium">{invoice.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Date Issued:</span>
                  <span>{invoice.dateIssued}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Due Date:</span>
                  <span>{invoice.dateDue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Supplier Ref:</span>
                  <span>{invoice.supplierRef}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-kitchen-muted-foreground mb-2">Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Items:</span>
                  <span>{invoice.items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Subtotal:</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Tax:</span>
                  <span>${(invoice.total * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total:</span>
                  <span className="font-medium">${(invoice.total * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-kitchen-muted-foreground mb-2">Line Items</h3>
            <Table>
              <TableHeader className="bg-kitchen-muted">
                <TableRow>
                  <TableHead className="font-medium">Item</TableHead>
                  <TableHead className="font-medium">Quantity</TableHead>
                  <TableHead className="font-medium">Price</TableHead>
                  <TableHead className="font-medium text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {relatedCreditNotes.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-kitchen-muted-foreground mb-2">Related Credit Notes</h3>
              <Table>
                <TableHeader className="bg-kitchen-muted">
                  <TableRow>
                    <TableHead className="font-medium">Credit Note ID</TableHead>
                    <TableHead className="font-medium">Date Issued</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {relatedCreditNotes.map((cn) => (
                    <TableRow key={cn.id}>
                      <TableCell className="font-medium">{cn.id}</TableCell>
                      <TableCell>{cn.dateIssued}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          cn.status === 'Approved' ? 'bg-kitchen-success/10 text-kitchen-success' :
                          cn.status === 'Rejected' ? 'bg-kitchen-danger/10 text-kitchen-danger' :
                          'bg-kitchen-warning/10 text-kitchen-warning'
                        }`}>
                          {cn.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">${cn.totalAmount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isOcrDialogOpen} onOpenChange={setIsOcrDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Scan Invoice with OCR</DialogTitle>
          </DialogHeader>
          <InvoiceScanner onScanComplete={handleScanComplete} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceDetails;
