
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { purchaseOrders } from '@/data/procurement/purchaseOrders';
import { CreditNoteReason } from '@/data/procurement/creditNotes';

interface CreateCreditNoteProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const CreateCreditNote: React.FC<CreateCreditNoteProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedPO, setSelectedPO] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<Array<{
    itemId: string;
    name: string;
    quantity: number;
    price: number;
    reason: CreditNoteReason | '';
    notes: string;
  }>>([]);
  
  const { toast } = useToast();
  
  const selectedPOData = purchaseOrders.find(po => po.id === selectedPO);
  
  const resetForm = () => {
    setSelectedPO('');
    setNotes('');
    setItems([]);
  };
  
  const handleAddItem = () => {
    if (!selectedPOData) return;
    
    setItems([
      ...items,
      {
        itemId: '',
        name: '',
        quantity: 1,
        price: 0,
        reason: '',
        notes: ''
      }
    ]);
  };
  
  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    
    if (field === 'itemId' && selectedPOData) {
      const poItem = selectedPOData.items.find(item => item.item.id === value);
      if (poItem) {
        newItems[index] = {
          ...newItems[index],
          itemId: value,
          name: poItem.item.name,
          price: poItem.price
        };
      }
    } else {
      // @ts-ignore - we know the field exists
      newItems[index][field] = value;
    }
    
    setItems(newItems);
  };
  
  const handleSubmit = () => {
    if (!selectedPO) {
      toast({
        title: "Error",
        description: "Please select a purchase order",
        variant: "destructive"
      });
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one item",
        variant: "destructive"
      });
      return;
    }
    
    for (const item of items) {
      if (!item.itemId || !item.reason) {
        toast({
          title: "Error",
          description: "Please complete all item details",
          variant: "destructive"
        });
        return;
      }
    }
    
    toast({
      title: "Credit note created",
      description: "The credit note has been created successfully"
    });
    
    resetForm();
    onSubmit();
  };
  
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Credit Note</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-5 py-4">
          <div className="space-y-3">
            <Label htmlFor="po-select">Select Purchase Order</Label>
            <Select value={selectedPO} onValueChange={setSelectedPO}>
              <SelectTrigger id="po-select">
                <SelectValue placeholder="Select a purchase order" />
              </SelectTrigger>
              <SelectContent>
                {purchaseOrders.map(po => (
                  <SelectItem key={po.id} value={po.id}>
                    {po.id} - {po.supplier.name} (${po.totalAmount.toFixed(2)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedPO && (
            <>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Credit Note Items</Label>
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={handleAddItem}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" /> Add Item
                  </Button>
                </div>
                
                {items.length === 0 ? (
                  <div className="text-kitchen-muted-foreground text-center py-4 border rounded-md">
                    No items added. Click 'Add Item' to begin.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div key={index} className="p-3 border rounded-md space-y-3">
                        <div className="flex justify-between">
                          <Label className="text-base">Item {index + 1}</Label>
                          <Button 
                            type="button" 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleRemoveItem(index)}
                            className="h-8 w-8 p-0 text-kitchen-danger"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`item-${index}`}>Item</Label>
                            <Select 
                              value={item.itemId} 
                              onValueChange={(value) => handleItemChange(index, 'itemId', value)}
                            >
                              <SelectTrigger id={`item-${index}`}>
                                <SelectValue placeholder="Select an item" />
                              </SelectTrigger>
                              <SelectContent>
                                {selectedPOData?.items.map(poItem => (
                                  <SelectItem key={poItem.item.id} value={poItem.item.id}>
                                    {poItem.item.name} (${poItem.price.toFixed(2)})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                            <Input
                              id={`quantity-${index}`}
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`reason-${index}`}>Reason</Label>
                            <Select 
                              value={item.reason} 
                              onValueChange={(value) => handleItemChange(index, 'reason', value)}
                            >
                              <SelectTrigger id={`reason-${index}`}>
                                <SelectValue placeholder="Select a reason" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Damaged Goods">Damaged Goods</SelectItem>
                                <SelectItem value="Incorrect Items">Incorrect Items</SelectItem>
                                <SelectItem value="Price Discrepancy">Price Discrepancy</SelectItem>
                                <SelectItem value="Quality Issues">Quality Issues</SelectItem>
                                <SelectItem value="Returned Items">Returned Items</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor={`price-${index}`}>Unit Price</Label>
                            <Input
                              id={`price-${index}`}
                              type="number"
                              step="0.01"
                              value={item.price}
                              onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <Label htmlFor={`item-notes-${index}`}>Item Notes</Label>
                            <Textarea
                              id={`item-notes-${index}`}
                              placeholder="Add notes about this item..."
                              value={item.notes}
                              onChange={(e) => handleItemChange(index, 'notes', e.target.value)}
                              className="h-20 resize-none"
                            />
                          </div>
                        </div>
                        
                        <div className="text-right font-medium">
                          Subtotal: ${(item.quantity * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-end p-3 bg-kitchen-muted/10 rounded-md">
                      <div className="text-lg font-medium">
                        Total: ${calculateTotal().toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add notes about this credit note..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-24 resize-none"
                />
              </div>
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            <Check className="mr-2 h-4 w-4" />
            Create Credit Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCreditNote;
