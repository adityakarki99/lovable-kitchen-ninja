
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import CreditNoteForm from './CreditNoteForm';
import { CreditNoteFormValues } from './creditNoteSchema';
import InvoiceScanner from '../invoice/InvoiceScanner';
import { createCreditNote } from '@/services/supabase/creditNoteService';
import { Loader2 } from 'lucide-react';

interface CreateCreditNoteProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const CreateCreditNote: React.FC<CreateCreditNoteProps> = ({ isOpen, onClose, onSubmit }) => {
  const [activeTab, setActiveTab] = useState<string>('manual');
  const [submitting, setSubmitting] = useState(false);
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
      // Try to map OCR data to our form
      const newFormValues = {
        purchaseOrderId: '',
        supplierRef: result.invoiceNumber || result.invoice_number || '',
        items: [] as any[],
        notes: '',
      };
      
      if (result.items && result.items.length > 0) {
        newFormValues.items = result.items.map((item: any) => {
          return {
            itemId: '',
            quantity: item.quantity || 1,
            price: item.unit_price || 0,
            reason: 'Price Discrepancy' as const,
            notes: item.description || item.name || '',
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

  const handleFormSubmit = async (values: CreditNoteFormValues) => {
    setSubmitting(true);
    try {
      const result = await createCreditNote(values);
      
      if (result.success) {
        toast({
          title: 'Credit note created',
          description: 'The credit note has been successfully created',
        });
        onSubmit();
      } else {
        toast({
          variant: "destructive",
          title: 'Error creating credit note',
          description: result.error?.message || 'An error occurred while creating the credit note',
        });
      }
    } catch (error) {
      console.error('Error creating credit note:', error);
      toast({
        variant: "destructive",
        title: 'Error creating credit note',
        description: 'An unexpected error occurred',
      });
    } finally {
      setSubmitting(false);
    }
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
            {submitting ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-kitchen-primary" />
                <span className="ml-2">Creating credit note...</span>
              </div>
            ) : (
              <CreditNoteForm 
                onSubmit={handleFormSubmit}
                onCancel={onClose}
                initialValues={formValues}
              />
            )}
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
