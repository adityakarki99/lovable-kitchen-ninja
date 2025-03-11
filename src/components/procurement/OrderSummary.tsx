
import React from 'react';
import { Trash2, Receipt, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrderItem {
  id: number;
  name: string;
  quantity: string;
  price: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  onRemoveItem: (itemId: number) => void;
  onCreateOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  onRemoveItem,
  onCreateOrder
}) => {
  const subtotal = items.reduce((sum, item) => {
    // Extract number from quantity string (e.g., "5kg" -> 5)
    const quantityMatch = item.quantity.match(/^(\d+)/);
    const quantity = quantityMatch ? parseFloat(quantityMatch[1]) : 1;
    return sum + (item.price * quantity);
  }, 0);
  
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {items.length === 0 ? (
          <div className="flex justify-center items-center h-40 text-kitchen-muted-foreground">
            No items added yet
          </div>
        ) : (
          <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="text-sm text-kitchen-muted-foreground">
                    {item.quantity} × ${item.price.toFixed(2)}/kg
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-right mr-3">
                    {/* Extract number from quantity string (e.g., "5kg" -> 5) */}
                    ${(item.price * parseFloat(item.quantity.match(/^(\d+)/)?.[1] || '1')).toFixed(2)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-kitchen-muted-foreground hover:text-kitchen-danger"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="delivery-date">Delivery Date</Label>
            <Input
              id="delivery-date"
              type="date"
              defaultValue={new Date(Date.now() + 2*24*60*60*1000).toISOString().split('T')[0]} // 2 days from now
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="payment-terms">Payment Terms</Label>
            <Select defaultValue="30days">
              <SelectTrigger>
                <SelectValue placeholder="Select payment terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Net 7 Days</SelectItem>
                <SelectItem value="14days">Net 14 Days</SelectItem>
                <SelectItem value="30days">Net 30 Days</SelectItem>
                <SelectItem value="cod">Cash on Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes</Label>
            <Input
              id="notes"
              placeholder="Add notes for this order..."
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex-col">
        <div className="w-full space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="w-full space-y-2">
          <Button 
            className="w-full bg-kitchen-primary hover:bg-kitchen-primary/90"
            disabled={items.length === 0}
            onClick={onCreateOrder}
          >
            Create Purchase Order
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              <Receipt className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button variant="outline" className="flex-1">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
