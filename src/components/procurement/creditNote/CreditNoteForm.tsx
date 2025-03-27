
import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, CreditNoteFormValues, creditNoteReasons } from './creditNoteSchema';
import CreditNoteItem from './CreditNoteItem';
import { getPurchaseOrders } from '@/services/supabase/purchaseOrderService';
import { getStockItems } from '@/services/supabase/stockItemService';
import { Loader2 } from 'lucide-react';

interface CreditNoteFormProps {
  onSubmit: (values: CreditNoteFormValues) => void;
  onCancel: () => void;
  initialValues?: Partial<CreditNoteFormValues>;
}

const CreditNoteForm: React.FC<CreditNoteFormProps> = ({ 
  onSubmit,
  onCancel,
  initialValues 
}) => {
  const [loading, setLoading] = useState(true);
  const [purchaseOrders, setPurchaseOrders] = useState<Array<{ id: string; display: string }>>([]);
  const [stockItems, setStockItems] = useState<Array<{ id: string; name: string }>>([]);

  const form = useForm<CreditNoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
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

  useEffect(() => {
    // Fetch purchase orders and stock items from Supabase
    const fetchData = async () => {
      setLoading(true);
      try {
        const [purchaseOrdersResponse, stockItemsResponse] = await Promise.all([
          getPurchaseOrders(),
          getStockItems()
        ]);

        if (purchaseOrdersResponse.success && purchaseOrdersResponse.data) {
          // Format purchase orders for the dropdown
          const formattedPOs = purchaseOrdersResponse.data.map(po => ({
            id: po.id?.toString() || '',
            display: `${po.id} - ${po.supplier?.name || 'Unknown Supplier'}`
          }));
          setPurchaseOrders(formattedPOs);
        }

        if (stockItemsResponse.success && stockItemsResponse.data) {
          // Format stock items for the dropdown
          const formattedItems = stockItemsResponse.data.map(item => ({
            id: item.id.toString(),
            name: item.name
          }));
          setStockItems(formattedItems);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (values: CreditNoteFormValues) => {
    onSubmit(values);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-kitchen-primary" />
        <span className="ml-2">Loading form data...</span>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                        {po.display}
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
            <CreditNoteItem 
              key={index} 
              index={index}
              showRemoveButton={index > 0}
              stockItems={stockItems}
              onRemove={() => {
                const currentItems = form.getValues().items;
                form.setValue('items', currentItems.filter((_, i) => i !== index));
              }}
            />
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
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-kitchen-primary hover:bg-kitchen-primary/90">
            Create Credit Note
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};

export default CreditNoteForm;
