import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditNoteReason } from '@/data/procurement/creditNotes';
import { purchaseOrders } from '@/data/procurement/purchaseOrders';
import { stockItems } from '@/data/procurement/stockItems';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import InvoiceScanner from '../invoice/InvoiceScanner';

interface CreateCreditNoteProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const creditNoteReasons: CreditNoteReason[] = [
  'Damaged Goods',
  'Incorrect Items',
  'Price Discrepancy',
  'Quality Issues',
  'Returned Items',
  'Other'
];

const formSchema = z.object({
  purchaseOrderId: z.string().min(1, "Please select a purchase order"),
  supplierRef: z.string().min(1, "Supplier reference is required"),
  items: z.array(z.object({
    itemId: z.string().min(1, "Please select an item"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0.01, "Price must be greater than 0"),
    reason: z.enum(['Damaged Goods', 'Incorrect Items', 'Price Discrepancy', 'Quality Issues', 'Returned Items', 'Other'] as const),
    notes: z.string().optional(),
  })).min(1, "At least one item is required"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateCreditNote: React.FC<CreateCreditNoteProps> = ({ isOpen, onClose, onSubmit }) => {
  const [activeTab, setActiveTab] = useState<string>('manual');
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  });

  const handleOCRResult = (result: any) => {
    if (result) {
      const matchedPO = purchaseOrders.find(po => 
        po.supplier.name.toLowerCase().includes((result.supplier || '').toLowerCase())
      );
      
      form.setValue('purchaseOrderId', matchedPO?.id || '');
      form.setValue('supplierRef', result.invoice_number || '');
      
      if (result.items && result.items.length > 0) {
        const formattedItems = result.items.map((item: any) => {
          const matchedItem = stockItems.find(si => 
            si.name.toLowerCase().includes((item.description || '').toLowerCase())
          );
          
          return {
            itemId: matchedItem?.id || '',
            quantity: item.quantity || 1,
            price: item.unit_price || 0,
            reason: 'Price Discrepancy' as CreditNoteReason,
            notes: item.description || '',
          };
        });
        
        form.setValue('items', formattedItems);
      }
      
      setActiveTab('manual');
      
      toast({
        title: 'Invoice data loaded',
        description: 'Please review and edit the data as needed',
      });
    }
  };

  const handleFormSubmit = (values: FormValues) => {
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="purchaseOrderId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Order</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a purchase order" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {purchaseOrders.map((po) => (
                              <SelectItem key={po.id} value={po.id}>
                                {po.id} - {po.supplier.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="supplierRef"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier Reference</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., INV-12345" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>Items</Label>
                  {form.watch('items').map((_, index) => (
                    <div key={index} className="border border-kitchen-border p-4 rounded-md space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.itemId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Item</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an item" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {stockItems.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>
                                      {item.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`items.${index}.reason`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reason</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a reason" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {creditNoteReasons.map((reason) => (
                                    <SelectItem key={reason} value={reason}>
                                      {reason}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="1" 
                                  step="1" 
                                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                  value={field.value} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`items.${index}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0.01" 
                                  step="0.01"
                                  onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                                  value={field.value} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`items.${index}.notes`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Additional details about this item" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-kitchen-danger text-kitchen-danger"
                          onClick={() => {
                            const currentItems = form.getValues().items;
                            form.setValue('items', currentItems.filter((_, i) => i !== index));
                          }}
                        >
                          Remove Item
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentItems = form.getValues().items;
                      form.setValue('items', [
                        ...currentItems,
                        {
                          itemId: '',
                          quantity: 1,
                          price: 0,
                          reason: 'Damaged Goods',
                          notes: '',
                        }
                      ]);
                    }}
                  >
                    Add Another Item
                  </Button>
                </div>
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Any additional information about this credit note" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-kitchen-primary hover:bg-kitchen-primary/90">
                    Create Credit Note
                  </Button>
                </DialogFooter>
              </form>
            </Form>
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
