
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScheduleFrequency } from '@/data/procurement/scheduledOrders';
import { 
  Calendar as CalendarIcon, Plus, Search, TimerIcon, Clock, 
  X, CheckSquare, Save, Loader2, CalendarCheck, Repeat 
} from 'lucide-react';
import { format, addHours, addDays, setHours, setMinutes } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { suppliers } from '@/data/procurement/suppliers';
import { stockItems } from '@/data/procurement/stockItems';
import { useToast } from '@/hooks/use-toast';

interface CreateScheduledOrderProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function CreateScheduledOrder({ isOpen, onClose, onSubmit }: CreateScheduledOrderProps) {
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedItems, setSelectedItems] = useState<Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>>([]);
  const [scheduledDate, setScheduledDate] = useState<Date>(
    addDays(new Date(), 3) // Default to 3 days from now
  );
  const [cutoffTime, setCutoffTime] = useState('12:00');
  const [cutoffDate, setCutoffDate] = useState<Date>(
    addDays(new Date(), 2) // Default to 2 days from now
  );
  const [frequency, setFrequency] = useState<ScheduleFrequency>('One-time');
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  // Calculate total order amount
  const orderTotal = selectedItems.reduce((sum, item) => sum + item.total, 0);

  // Handle adding an item to the order
  const handleAddItem = (item: typeof stockItems[number]) => {
    const existingItemIndex = selectedItems.findIndex(i => i.id === item.id);
    
    if (existingItemIndex >= 0) {
      // If item already exists, just increment quantity
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += 1;
      updatedItems[existingItemIndex].total = 
        updatedItems[existingItemIndex].quantity * updatedItems[existingItemIndex].price;
      setSelectedItems(updatedItems);
    } else {
      // Add new item
      setSelectedItems([
        ...selectedItems,
        {
          id: item.id,
          name: item.name,
          quantity: 1,
          price: item.lastOrderedPrice,
          total: item.lastOrderedPrice
        }
      ]);
    }
  };

  // Handle updating item quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    const updatedItems = selectedItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, quantity); // Ensure quantity is at least 1
        return {
          ...item,
          quantity: newQuantity,
          total: newQuantity * item.price
        };
      }
      return item;
    });
    
    setSelectedItems(updatedItems);
  };

  // Handle removing an item
  const handleRemoveItem = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  // Filter items based on search term
  const filteredItems = stockItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedSupplier) {
      toast({
        title: "Missing information",
        description: "Please select a supplier",
        variant: "destructive"
      });
      return;
    }

    if (selectedItems.length === 0) {
      toast({
        title: "Missing information",
        description: "Please add at least one item to the order",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we would process the form data here
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Order scheduled",
        description: "Your order has been scheduled successfully"
      });
      onSubmit();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CalendarCheck className="mr-2 h-5 w-5 text-carbon-blue-60" />
            Create Scheduled Order
          </DialogTitle>
          <DialogDescription>
            Set up a new scheduled order for regular or one-time delivery.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-5 py-4">
          {/* Supplier Selection */}
          <div className="space-y-1.5">
            <Label htmlFor="supplier">Supplier</Label>
            <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
              <SelectTrigger id="supplier">
                <SelectValue placeholder="Select a supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map(supplier => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Item Selection */}
          <div className="space-y-3 border rounded-sm p-3">
            <Label>Order Items</Label>
            
            {/* Search for items */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-gray-70" />
              <Input
                placeholder="Search for items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            {/* Items list */}
            <div className="max-h-[150px] overflow-y-auto border rounded-sm">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="all">All Items</TabsTrigger>
                  <TabsTrigger value="recent">Recently Ordered</TabsTrigger>
                  <TabsTrigger value="common">Commonly Ordered</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="p-0">
                  <div className="divide-y">
                    {filteredItems.length === 0 ? (
                      <div className="p-4 text-center text-carbon-gray-70">
                        No items found matching your search
                      </div>
                    ) : (
                      filteredItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 hover:bg-carbon-gray-5">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-carbon-gray-70">${item.lastOrderedPrice.toFixed(2)} / {item.unit}</div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => handleAddItem(item)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="recent" className="p-3 text-center text-carbon-gray-70">
                  Recent orders will appear here
                </TabsContent>
                
                <TabsContent value="common" className="p-3 text-center text-carbon-gray-70">
                  Common items will appear here
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Selected items */}
            <div className="space-y-2">
              <div className="font-medium">Selected Items</div>
              
              {selectedItems.length === 0 ? (
                <div className="border rounded-sm p-4 text-center text-carbon-gray-70">
                  No items selected
                </div>
              ) : (
                <div className="border rounded-sm divide-y">
                  {selectedItems.map(item => (
                    <div key={item.id} className="p-3 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-carbon-gray-70">${item.price.toFixed(2)} each</div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-20">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                            min="1"
                            className="h-8"
                          />
                        </div>
                        
                        <div className="w-20 text-right font-medium">
                          ${item.total.toFixed(2)}
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-carbon-red-50 h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="p-3 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Schedule Settings */}
          <div className="space-y-3">
            <Label>Schedule Settings</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Delivery date */}
              <div className="space-y-1.5">
                <Label htmlFor="deliveryDate">Delivery Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduledDate ? format(scheduledDate, 'PPP') : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={(date) => date && setScheduledDate(date)}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Frequency */}
              <div className="space-y-1.5">
                <Label htmlFor="frequency">Frequency</Label>
                <div className="flex gap-2 items-center">
                  <Repeat className="h-4 w-4 text-carbon-gray-70" />
                  <Select 
                    value={frequency} 
                    onValueChange={(value) => setFrequency(value as ScheduleFrequency)}
                  >
                    <SelectTrigger id="frequency" className="flex-1">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="One-time">One-time</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Cutoff date */}
              <div className="space-y-1.5">
                <Label htmlFor="cutoffDate">Confirmation Cutoff Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {cutoffDate ? format(cutoffDate, 'PPP') : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={cutoffDate}
                      onSelect={(date) => date && setCutoffDate(date)}
                      initialFocus
                      disabled={(date) => date < new Date() || date > scheduledDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Cutoff time */}
              <div className="space-y-1.5">
                <Label htmlFor="cutoffTime">Confirmation Cutoff Time</Label>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-carbon-gray-70" />
                  <Input
                    id="cutoffTime"
                    type="time"
                    value={cutoffTime}
                    onChange={(e) => setCutoffTime(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any special instructions or notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-24"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Schedule Order
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
