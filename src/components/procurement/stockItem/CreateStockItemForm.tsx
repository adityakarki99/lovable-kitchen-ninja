
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getSuppliers } from '@/services/supabase/supplierService';
import { Supplier } from '@/services/supabase/supplierService';

const formSchema = z.object({
  name: z.string().min(2, 'Item name must be at least 2 characters'),
  category: z.string().optional(),
  supplier_id: z.string().optional(),
  unit: z.string().optional(),
  par_level: z.coerce.number().min(0).optional(),
  current_stock: z.coerce.number().min(0).optional(),
  last_ordered_price: z.coerce.number().min(0).optional(),
  location: z.string().optional(),
  is_critical: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateStockItemFormProps {
  onSuccess?: () => void;
}

const CreateStockItemForm: React.FC<CreateStockItemFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      supplier_id: '',
      unit: 'kg',
      par_level: 10,
      current_stock: 0,
      last_ordered_price: 0,
      location: 'Dry Storage',
      is_critical: false,
    },
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const { success, data, error } = await getSuppliers();
        if (success && data) {
          setSuppliers(data);
        } else if (error) {
          console.error('Error fetching suppliers:', error);
          toast({
            title: 'Error',
            description: 'Failed to load suppliers. Please try again later.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [toast]);

  const onSubmit = async (data: FormValues) => {
    try {
      const { error } = await supabase
        .from('stock_items')
        .insert({
          name: data.name,
          category: data.category,
          supplier_id: data.supplier_id ? parseInt(data.supplier_id) : null,
          unit: data.unit,
          par_level: data.par_level,
          current_stock: data.current_stock,
          last_ordered_price: data.last_ordered_price,
          location: data.location,
          is_critical: data.is_critical,
        });

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: `Stock item ${data.name} created successfully`,
      });

      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="Item name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Produce">Produce</SelectItem>
                    <SelectItem value="Meat">Meat</SelectItem>
                    <SelectItem value="Seafood">Seafood</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                    <SelectItem value="Bakery">Bakery</SelectItem>
                    <SelectItem value="Dry Goods">Dry Goods</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Spices">Spices</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supplier_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a supplier" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier.id} value={supplier.id.toString()}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                    <SelectItem value="l">Liter (l)</SelectItem>
                    <SelectItem value="ml">Milliliter (ml)</SelectItem>
                    <SelectItem value="ea">Each (ea)</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="case">Case</SelectItem>
                    <SelectItem value="pack">Pack</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="par_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAR Level</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="Minimum stock level" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="current_stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Stock</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="Current stock amount" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="last_ordered_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Ordered Price</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="Price per unit" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Storage Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Dry Storage">Dry Storage</SelectItem>
                    <SelectItem value="Walk-in Cooler">Walk-in Cooler</SelectItem>
                    <SelectItem value="Walk-in Freezer">Walk-in Freezer</SelectItem>
                    <SelectItem value="Front of House">Front of House</SelectItem>
                    <SelectItem value="Bar">Bar</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="is_critical"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Critical Item</FormLabel>
                <p className="text-sm text-kitchen-muted-foreground">
                  Mark as critical if this item is essential for operations
                </p>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Create Stock Item</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateStockItemForm;
