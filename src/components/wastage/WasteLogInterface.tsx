
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { wasteItems, wasteReasons } from '@/data/wastageData';
import { stockItems } from '@/data/procurementData';
import { BarChart, Camera, Check, Package, Search, Trash2, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const WasteLogInterface: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [showRecent, setShowRecent] = useState(true);
  
  const filteredItems = stockItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    setSearchQuery('');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedItem || !quantity || !reason) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate cost based on quantity and item price
    const cost = parseFloat(quantity) * selectedItem.lastOrderedPrice;
    
    toast({
      title: "Waste Logged Successfully",
      description: `Logged ${quantity} ${selectedItem.unit} of ${selectedItem.name} as waste.`,
      variant: "default"
    });
    
    // Reset form
    setSelectedItem(null);
    setQuantity('');
    setReason('');
    setNotes('');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
      {/* Waste Log Form */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Log Waste Item</CardTitle>
          <CardDescription>Record details about wasted food or inventory items</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Item Selection Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">1. Select Item</h3>
              
              {!selectedItem ? (
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
                    <Input
                      placeholder="Search inventory items..."
                      className="pl-9 bg-white border-kitchen-border"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {searchQuery && (
                    <Card className="overflow-hidden">
                      <div className="max-h-60 overflow-y-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead className="text-right">Current Stock</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredItems.length > 0 ? (
                              filteredItems.map((item) => (
                                <TableRow 
                                  key={item.id} 
                                  className="cursor-pointer hover:bg-kitchen-muted/30"
                                  onClick={() => handleItemSelect(item)}
                                >
                                  <TableCell className="font-medium">{item.name}</TableCell>
                                  <TableCell>{item.category}</TableCell>
                                  <TableCell className="text-right">{item.currentStock} {item.unit}</TableCell>
                                  <TableCell className="text-right">${item.lastOrderedPrice.toFixed(2)}</TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={4} className="text-center py-4 text-kitchen-muted-foreground">
                                  No items found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="bg-kitchen-muted p-4 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-medium">{selectedItem.name}</p>
                    <p className="text-sm text-kitchen-muted-foreground">
                      {selectedItem.category} • ${selectedItem.lastOrderedPrice.toFixed(2)}/{selectedItem.unit} • 
                      Current Stock: {selectedItem.currentStock} {selectedItem.unit}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedItem(null)}
                  >
                    Change
                  </Button>
                </div>
              )}
            </div>
            
            <Separator />
            
            {/* Waste Details Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">2. Enter Waste Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity ({selectedItem?.unit || 'unit'})</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder={`Amount in ${selectedItem?.unit || 'units'}`}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Waste</Label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger id="reason">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {wasteReasons.map(reason => (
                        <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add details about the waste (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            
            <Separator />
            
            {/* Quick Actions Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">3. Additional Options</h3>
              
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Add Photo
                </Button>
                
                <Button type="button" variant="outline" size="sm">
                  <BarChart className="h-4 w-4 mr-2" />
                  Use Scale
                </Button>
                
                <Button type="button" variant="outline" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  Scan Barcode
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <div className="space-x-2">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">
                  <Check className="h-4 w-4 mr-2" />
                  Log Waste
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Right Sidebar */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Recent Waste Logs</CardTitle>
          <CardDescription>Last recorded waste entries</CardDescription>
        </CardHeader>
        <CardContent>
          {wasteItems.slice(0, 5).map((item, index) => (
            <div key={item.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{item.itemName}</p>
                  <p className="text-sm text-kitchen-muted-foreground">
                    {item.quantity} {item.unit} • ${item.cost.toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.reason === 'Spoilage' ? 'bg-kitchen-danger/10 text-kitchen-danger' :
                    item.reason === 'Overproduction' ? 'bg-kitchen-warning/10 text-kitchen-warning' :
                    item.reason === 'Trim Waste' ? 'bg-kitchen-muted text-kitchen-muted-foreground' :
                    'bg-kitchen-primary/10 text-kitchen-primary'
                  }`}>
                    {item.reason}
                  </span>
                </div>
              </div>
              <p className="text-sm text-kitchen-muted-foreground mt-1">
                {formatDate(item.date)} • {item.reportedBy}
              </p>
              {item.notes && (
                <p className="text-sm mt-1 italic">"{item.notes}"</p>
              )}
              {index < wasteItems.slice(0, 5).length - 1 && <Separator className="mt-3" />}
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-2">View All Waste Logs</Button>
          
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <p className="font-medium mb-1">Wastage Insights</p>
                <p>Overproduction is your top waste reason this week. Consider reducing batch sizes for prep items.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WasteLogInterface;
