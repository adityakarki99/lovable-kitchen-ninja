
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Edit, Save, AlertTriangle, TrendingUp, Check } from 'lucide-react';
import { stockItems, suppliers } from '@/data/procurementData';
import { Label } from '@/components/ui/label';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const ReorderPointConfiguration: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showBelowPar, setShowBelowPar] = useState<boolean>(false);
  const [showCritical, setShowCritical] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [bulkEditMode, setBulkEditMode] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [editableParLevels, setEditableParLevels] = useState<Record<string, number>>(
    stockItems.reduce((acc, item) => ({ ...acc, [item.id]: item.parLevel }), {})
  );

  // Filter items based on selected filters
  const filteredItems = stockItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesBelowPar = !showBelowPar || item.currentStock < item.parLevel;
    const matchesCritical = !showCritical || item.isCritical;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesBelowPar && matchesCritical && matchesSearch;
  });

  // Get categories from stock items
  const categories = ['All', ...Array.from(new Set(stockItems.map(item => item.category)))];

  // Handle selecting an item for viewing usage data
  const handleSelectItem = (itemId: string) => {
    setSelectedItemId(itemId === selectedItemId ? null : itemId);
  };

  // Handle toggling item selection for bulk edit
  const handleToggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  // Handle updating PAR level
  const handleUpdateParLevel = (itemId: string, value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setEditableParLevels(prev => ({ ...prev, [itemId]: parsedValue }));
    }
  };

  // Handle saving PAR levels
  const handleSaveParLevels = () => {
    console.log('Saving PAR levels:', editableParLevels);
    // In a real app, this would send the updated PAR levels to the backend
    alert('PAR levels updated successfully!');
  };

  // Handle applying bulk update to selected items
  const handleBulkUpdate = (percentageChange: number) => {
    const newParLevels = { ...editableParLevels };
    
    selectedItems.forEach(itemId => {
      const currentPar = newParLevels[itemId];
      newParLevels[itemId] = Math.max(0, currentPar * (1 + percentageChange / 100));
    });
    
    setEditableParLevels(newParLevels);
    setSelectedItems([]);
    setBulkEditMode(false);
  };

  // Get selected item for usage chart
  const selectedItem = selectedItemId ? stockItems.find(item => item.id === selectedItemId) : null;

  // Prepare usage data for chart
  const usageData = selectedItem?.usageHistory.map((usage, index) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index],
    usage
  })) || [];

  // Get supplier for selected item
  const getSupplierById = (supplierId: string) => {
    return suppliers.find(supplier => supplier.id === supplierId);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="below-par" 
              checked={showBelowPar} 
              onCheckedChange={(checked) => setShowBelowPar(!!checked)} 
            />
            <Label htmlFor="below-par">Below PAR</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="critical" 
              checked={showCritical} 
              onCheckedChange={(checked) => setShowCritical(!!checked)} 
            />
            <Label htmlFor="critical">Critical Items</Label>
          </div>

          {bulkEditMode ? (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => handleBulkUpdate(10)}>
                +10%
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkUpdate(-10)}>
                -10%
              </Button>
              <Button size="sm" variant="outline" onClick={() => {
                setSelectedItems([]);
                setBulkEditMode(false);
              }}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button 
              size="sm" 
              variant="outline" 
              className="text-kitchen-foreground"
              onClick={() => setBulkEditMode(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Bulk Edit
            </Button>
          )}
          
          <Button 
            size="sm" 
            className="bg-kitchen-primary hover:bg-kitchen-primary/90"
            onClick={handleSaveParLevels}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-apple-sm overflow-hidden md:col-span-2">
          <Table>
            <TableHeader className="bg-kitchen-muted">
              <TableRow>
                {bulkEditMode && <TableHead className="w-12"></TableHead>}
                <TableHead className="font-medium">Item Name</TableHead>
                <TableHead className="font-medium">Current Stock</TableHead>
                <TableHead className="font-medium">Weekly Usage</TableHead>
                <TableHead className="font-medium">Lead Time</TableHead>
                <TableHead className="font-medium">Current PAR</TableHead>
                <TableHead className="font-medium">Suggested PAR</TableHead>
                <TableHead className="font-medium">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => {
                const supplier = getSupplierById(item.supplier);
                const isBelowPar = item.currentStock < item.parLevel;
                const isSelected = selectedItemId === item.id;
                const isSuggestedDifferent = item.suggestedPar !== item.parLevel;
                
                return (
                  <TableRow 
                    key={item.id} 
                    className={`hover:bg-kitchen-muted/30 ${isSelected ? 'bg-kitchen-muted/20' : ''}`}
                    onClick={() => handleSelectItem(item.id)}
                  >
                    {bulkEditMode && (
                      <TableCell>
                        <Checkbox 
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => handleToggleItemSelection(item.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                    )}
                    <TableCell className="font-medium">
                      {item.name}
                      {item.isCritical && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-kitchen-warning/10 px-1.5 py-0.5 text-xs font-medium text-kitchen-warning">
                          Critical
                        </span>
                      )}
                    </TableCell>
                    <TableCell className={isBelowPar ? 'text-kitchen-danger' : ''}>
                      {item.currentStock}{item.unit}
                    </TableCell>
                    <TableCell>{item.weeklyUsage}{item.unit}</TableCell>
                    <TableCell>{supplier?.leadTime || 'N/A'} days</TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        min="0" 
                        className="w-20 h-8"
                        value={editableParLevels[item.id]} 
                        onChange={(e) => handleUpdateParLevel(item.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className={isSuggestedDifferent ? 'text-kitchen-warning font-medium' : ''}>
                          {item.suggestedPar}{item.unit}
                        </span>
                        {isSuggestedDifferent && <AlertTriangle className="ml-2 h-4 w-4 text-kitchen-warning" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      {isSuggestedDifferent ? (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 text-kitchen-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateParLevel(item.id, item.suggestedPar.toString());
                          }}
                        >
                          Accept
                        </Button>
                      ) : (
                        <span className="text-kitchen-success flex items-center">
                          <Check className="h-4 w-4 mr-1" /> Optimal
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>

        {selectedItem && (
          <Card className="p-5 shadow-apple-sm">
            <h3 className="text-lg font-medium mb-2">{selectedItem.name} Usage</h3>
            <p className="text-sm text-kitchen-muted-foreground mb-4">
              12-month usage pattern
            </p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={usageData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="usage" 
                    stroke="#4CAF50" 
                    activeDot={{ r: 8 }} 
                    name={`Usage (${selectedItem.unit})`}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Weekly Usage:</span>
                <span className="font-medium">{selectedItem.weeklyUsage}{selectedItem.unit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Usage Volatility:</span>
                <span className={`font-medium ${
                  selectedItem.volatility === 'Low' 
                    ? 'text-kitchen-success' 
                    : selectedItem.volatility === 'Medium' 
                      ? 'text-kitchen-warning' 
                      : 'text-kitchen-danger'
                }`}>
                  {selectedItem.volatility}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Reorder Frequency:</span>
                <span className="font-medium">
                  {Math.round(selectedItem.parLevel / selectedItem.weeklyUsage * 7)} days
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Lead Time:</span>
                <span className="font-medium">
                  {suppliers.find(s => s.id === selectedItem.supplier)?.leadTime || 'N/A'} days
                </span>
              </div>
            </div>

            <div className="mt-5 bg-kitchen-muted/20 p-3 rounded-md">
              <div className="flex items-start gap-2">
                <TrendingUp className="h-5 w-5 text-kitchen-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Recommendation</h4>
                  <p className="text-sm text-kitchen-muted-foreground mt-1">
                    Based on usage trends and lead time, we recommend a PAR level of{' '}
                    <span className="font-medium text-kitchen-primary">{selectedItem.suggestedPar}{selectedItem.unit}</span>.
                    This provides a {Math.round(selectedItem.suggestedPar / selectedItem.weeklyUsage * 7)} day buffer.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReorderPointConfiguration;
