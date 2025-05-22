
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, FileSearch, Link } from 'lucide-react';
import { invoices } from '@/data/procurement';
import { stockItems } from '@/data/procurement/stockItems';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LineItemStockMatcher from './invoice/LineItemStockMatcher';

type InvoiceDetailsProps = {
  invoiceId: string;
  onBack: () => void;
};

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ invoiceId, onBack }) => {
  const [invoice, setInvoice] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('details');
  
  // Mock fetching invoice details
  useEffect(() => {
    // In a real implementation, we would fetch from Supabase
    const foundInvoice = invoices.find(inv => inv.id === invoiceId) || {
      id: invoiceId,
      invoiceNumber: `INV-${invoiceId}`,
      dateIssued: '2024-05-01',
      dateDue: '2024-05-31',
      supplierRef: 'SUPP-REF',
      items: [
        {
          id: '1',
          description: 'Tomatoes',
          quantity: 20,
          unit_price: 2.50,
          total_price: 50.00,
          // Already matched items would have these properties:
          matchedStockItem: stockItems[0],
          stockItemId: stockItems[0].id,
          matchType: 'auto'
        },
        {
          id: '2',
          description: 'Lettuce',
          quantity: 15,
          unit_price: 3.20,
          total_price: 48.00,
          // Unmatched items would not have these
        },
        {
          id: '3',
          description: 'Olive Oil',
          quantity: 5,
          unit_price: 18.50,
          total_price: 92.50,
        }
      ],
      total: 190.50
    };
    setInvoice(foundInvoice);
  }, [invoiceId]);

  const handleItemMatched = (lineItemId: string, stockItemId: string) => {
    console.log(`Line item ${lineItemId} matched to stock item ${stockItemId}`);
    // In a real implementation, we would update the database
    // via supabase.from('invoice_items').update({ stock_item_id: stockItemId })
  };
  
  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-xl font-semibold">Invoice {invoice.invoiceNumber}</h2>
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
      
      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="matching">Stock Matching</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-md p-6">
              <h3 className="text-lg font-medium mb-4">Invoice Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invoice Number:</span>
                  <span className="font-medium">{invoice.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Issued:</span>
                  <span>{invoice.dateIssued}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date:</span>
                  <span>{invoice.dateDue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supplier Reference:</span>
                  <span>{invoice.supplierRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-6">
              <h3 className="text-lg font-medium mb-4">Line Items</h3>
              <div className="space-y-2">
                {invoice.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.description} ({item.quantity})</span>
                    <span>${item.total_price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="matching">
          <LineItemStockMatcher 
            invoiceId={invoiceId} 
            invoiceItems={invoice.items}
            onItemMatched={handleItemMatched}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvoiceDetails;
