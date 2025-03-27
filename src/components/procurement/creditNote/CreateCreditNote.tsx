
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { purchaseOrders } from '@/data/procurement/purchaseOrders';
import { stockItems } from '@/data/procurement/stockItems';
import CreditNoteForm from './CreditNoteForm';
import { CreditNoteFormValues } from './creditNoteSchema';
import InvoiceScanner from '../invoice/InvoiceScanner';

interface CreateCreditNoteProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const CreateCreditNote: React.FC<CreateCreditNoteProps> = ({ isOpen, onClose, onSubmit }) => {
  const [activeTab, setActiveTab] = useState<string>('manual');
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<Partial<CreditNoteFormValues>>({
    purchaseOrderId: '',
    supplierRef: '',
    items: [{
      itemId: '',
      quantity: 1,
      price: 0,
      reason: 'Damaged Goods',
      notes: '',
    }],
    notes: '',
  });

  const handleOCRResult = (result: any) => {
    if (result) {
      const matchedPO = purchaseOrders.find(po => 
        po.supplier.name.toLowerCase().includes((result.supplier || '').toLowerCase())
      );
      
      const newFormValues = {
        purchaseOrderId: matchedPO?.id || '',
        supplierRef: result.invoice_number || '',
        items: [] as any[],
        notes: '',
      };
      
      if (result.items && result.items.length > 0) {
        newFormValues.items = result.items.map((item: any) => {
          const matchedItem = stockItems.find(si => 
            si.name.toLowerCase().includes((item.description || '').toLowerCase())
          );
          
          return {
            itemId: matchedItem?.id || '',
            quantity: item.quantity || 1,
            price: item.unit_price || 0,
            reason: 'Price Discrepancy' as const,
            notes: item.description || '',
          };
        });
      }
      
      setFormValues(newFormValues);
      setActiveTab('manual');
      
      toast({
        title: 'Invoice data loaded',
        description: 'Please review and edit the data as needed',
      });
    }
  };

  const handleFormSubmit = (values: CreditNoteFormValues) => {
    console.log('Credit Note Form Values:', values);
    toast({
      title: 'Credit note created',
      description: 'The credit note has been successfully created',
    });
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Credit Note</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new credit note, or scan an invoice.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="scan">Scan Invoice</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="py-4">
            <CreditNoteForm 
              onSubmit={handleFormSubmit}
              onCancel={onClose}
              initialValues={formValues}
            />
          </TabsContent>
          
          <TabsContent value="scan" className="py-4">
            <InvoiceScanner onScanComplete={handleOCRResult} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCreditNote;
