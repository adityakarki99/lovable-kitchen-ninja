
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import { creditNoteReasons } from './creditNoteSchema';

interface CreditNoteItemProps {
  index: number;
  onRemove: () => void;
  showRemoveButton: boolean;
  stockItems: Array<{ id: string; name: string }>;
}

const CreditNoteItem: React.FC<CreditNoteItemProps> = ({ 
  index, 
  onRemove,
  showRemoveButton,
  stockItems
}) => {
  const form = useFormContext();
  
  return (
    <div className="border border-kitchen-border p-4 rounded-md space-y-4">
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
      
      {showRemoveButton && (
        <Button
          type="button"
          variant="outline"
          className="w-full border-kitchen-danger text-kitchen-danger"
          onClick={onRemove}
        >
          Remove Item
        </Button>
      )}
    </div>
  );
};

export default CreditNoteItem;
