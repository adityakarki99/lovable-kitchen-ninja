
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Save, Plus, Minus, Search, 
  Check, X, CalendarCheck, Repeat, Clock, ShoppingCart, 
  CalendarDays, ClipboardList, Info, Trash2, Loader2
} from 'lucide-react';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { suppliers } from '@/data/procurement/suppliers';
import { stockItems } from '@/data/procurement/stockItems';
import { ScheduleFrequency } from '@/data/procurement/scheduledOrders';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function FullScreenCreateOrder() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Supplier selection state
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');
  
  // Item selection state
  const [selectedItems, setSelectedItems] = useState<Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [itemCategory, setItemCategory] = useState<string>('all');
  
  // Schedule details state
  const [scheduledDate, setScheduledDate] = useState<Date>(addDays(new Date(), 3));
  const [cutoffDate, setCutoffDate] = useState<Date>(addDays(new Date(), 2));
  const [cutoffTime, setCutoffTime] = useState<string>('12:00');
  const [frequency, setFrequency] = useState<ScheduleFrequency>('One-time');
  const [notes, setNotes] = useState<string>('');

  // Calculate total order amount
  const orderTotal = selectedItems.reduce((sum, item) => sum + item.total, 0);

  // Filter items based on search term and category
  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = itemCategory === 'all' || item.category.toLowerCase() === itemCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Get categories for filtering
  const categories = Array.from(new Set(stockItems.map(item => item.category)));

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

  // Handle form submission
  const handleSubmit = () => {
    // Validate form
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

    // Submit form
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Order scheduled",
        description: "Your order has been scheduled successfully"
      });
      navigate('/procurement');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/procurement');
  };

  // Move to next step
  const goToNextStep = () => {
    if (currentStep === 1 && !selectedSupplier) {
      toast({
        title: "Missing information",
        description: "Please select a supplier before proceeding",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 2 && selectedItems.length === 0) {
      toast({
        title: "Missing information",
        description: "Please add at least one item before proceeding",
        variant: "destructive"
      });
      return;
    }

    setCurrentStep(Math.min(currentStep + 1, 3));
  };

  // Move to previous step
  const goToPreviousStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  // Handler for supplier selection
  const handleSupplierSelect = (supplierId: string) => {
    setSelectedSupplier(supplierId);
  };

  // Get selected supplier details
  const getSelectedSupplierDetails = () => {
    return suppliers.find(supplier => supplier.id === selectedSupplier);
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Select Supplier</h2>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-gray-70" />
              <Input 
                placeholder="Search suppliers..." 
                className="pl-9"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suppliers
                .filter(supplier => 
                  supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(supplier => (
                  <Card 
                    key={supplier.id}
                    className={`cursor-pointer transition-all hover:border-carbon-blue-60 ${
                      selectedSupplier === supplier.id ? 'border-carbon-blue-60 ring-2 ring-carbon-blue-20' : ''
                    }`}
                    onClick={() => handleSupplierSelect(supplier.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{supplier.name}</h3>
                          <p className="text-sm text-carbon-gray-70">{supplier.category}</p>
                        </div>
                        {selectedSupplier === supplier.id && (
                          <Badge className="bg-carbon-blue-60">Selected</Badge>
                        )}
                      </div>
                      <div className="mt-2 text-sm">
                        <p>{supplier.contactName}</p>
                        <p>{supplier.email}</p>
                        <p>{supplier.phone}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Select Items</h2>
            
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-gray-70" />
                <Input 
                  placeholder="Search items..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={itemCategory} onValueChange={setItemCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Available Items</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 max-h-[400px] overflow-y-auto">
                    <div className="divide-y">
                      {filteredItems.length === 0 ? (
                        <div className="p-4 text-center text-carbon-gray-70">
                          No items found matching your search
                        </div>
                      ) : (
                        filteredItems.map(item => (
                          <div key={item.id} className="p-4 hover:bg-carbon-gray-5 flex items-center justify-between">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-carbon-gray-70">
                                ${item.lastOrderedPrice.toFixed(2)} / {item.unit} • {item.category}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-carbon-gray-70">
                                Stock: {item.currentStock} {item.unit}
                              </div>
                              <Button size="sm" variant="outline" onClick={() => handleAddItem(item)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Selected Items</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 max-h-[300px] overflow-y-auto">
                    {selectedItems.length === 0 ? (
                      <div className="p-4 text-center text-carbon-gray-70">
                        No items selected
                      </div>
                    ) : (
                      <div className="divide-y">
                        {selectedItems.map(item => (
                          <div key={item.id} className="p-3">
                            <div className="flex justify-between items-start">
                              <div className="font-medium">{item.name}</div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-carbon-red-50 h-6 w-6 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center mt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-7 w-7 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                                min="1"
                                className="h-7 w-16 mx-2 text-center p-1"
                              />
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                className="h-7 w-7 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              
                              <div className="ml-auto">
                                <div className="text-sm">${item.price.toFixed(2)} each</div>
                                <div className="font-medium">${item.total.toFixed(2)}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-3">
                    <div className="font-medium">Total:</div>
                    <div className="font-medium">${orderTotal.toFixed(2)}</div>
                  </CardFooter>
                </Card>
                
                <div className="mt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Items:</span>
                          <span>{selectedItems.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Quantity:</span>
                          <span>{selectedItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Total Amount:</span>
                          <span>${orderTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Schedule Order</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Scheduling Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
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
                              <Calendar className="mr-2 h-4 w-4" />
                              {scheduledDate ? format(scheduledDate, 'PPP') : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
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
                        <Label htmlFor="frequency">Order Frequency</Label>
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
                              <Calendar className="mr-2 h-4 w-4" />
                              {cutoffDate ? format(cutoffDate, 'PPP') : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
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
                    
                    <div className="mt-4">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add any special instructions or notes..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-24 mt-1.5"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Order Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium">Supplier:</span>
                        <div>{getSelectedSupplierDetails()?.name || ""}</div>
                      </div>
                      
                      <div>
                        <span className="font-medium">Items:</span>
                        <div className="mt-1 max-h-[100px] overflow-y-auto">
                          {selectedItems.map((item, index) => (
                            <div key={index} className="flex justify-between py-1 border-b last:border-b-0">
                              <span>{item.name} ({item.quantity})</span>
                              <span>${item.total.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-1">
                        <span className="font-medium">Total:</span>
                        <span className="float-right">${orderTotal.toFixed(2)}</span>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <span className="font-medium">Scheduled Delivery:</span>
                        <div>{format(scheduledDate, 'MMMM d, yyyy')}</div>
                      </div>
                      
                      <div>
                        <span className="font-medium">Confirmation Cutoff:</span>
                        <div>{format(cutoffDate, 'MMMM d, yyyy')} at {cutoffTime}</div>
                      </div>
                      
                      <div>
                        <span className="font-medium">Frequency:</span>
                        <div>{frequency}</div>
                      </div>
                      
                      {notes && (
                        <div>
                          <span className="font-medium">Notes:</span>
                          <div className="text-carbon-gray-70">{notes}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-6xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={handleCancel}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold">Create Scheduled Order</h1>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="relative">
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <Badge 
                className={`rounded-full h-8 w-8 p-0 flex items-center justify-center mr-2 ${
                  currentStep >= 1 ? 'bg-carbon-blue-60' : 'bg-carbon-gray-40'
                }`}
              >
                {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
              </Badge>
              <span className="font-medium">Select Supplier</span>
            </div>
            
            <div className="hidden sm:flex items-center">
              <Badge 
                className={`rounded-full h-8 w-8 p-0 flex items-center justify-center mr-2 ${
                  currentStep >= 2 ? 'bg-carbon-blue-60' : 'bg-carbon-gray-40'
                }`}
              >
                {currentStep > 2 ? <Check className="h-4 w-4" /> : "2"}
              </Badge>
              <span className="font-medium">Select Items</span>
            </div>
            
            <div className="hidden sm:flex items-center">
              <Badge 
                className={`rounded-full h-8 w-8 p-0 flex items-center justify-center mr-2 ${
                  currentStep >= 3 ? 'bg-carbon-blue-60' : 'bg-carbon-gray-40'
                }`}
              >
                {currentStep > 3 ? <Check className="h-4 w-4" /> : "3"}
              </Badge>
              <span className="font-medium">Schedule Order</span>
            </div>
          </div>
          
          <div className="hidden sm:block h-1 bg-carbon-gray-20 absolute top-4 left-4 right-4 z-0">
            <div 
              className="h-1 bg-carbon-blue-60 transition-all" 
              style={{ width: `${(currentStep - 1) * 50}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        {renderStepContent()}
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        {currentStep < 3 ? (
          <Button onClick={goToNextStep}>
            Next
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-carbon-blue-60 hover:bg-carbon-blue-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Schedule Order
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
