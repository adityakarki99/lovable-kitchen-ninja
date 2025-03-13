
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Filter, 
  Barcode, 
  AlertTriangle, 
  Clock, 
  PackageCheck, 
  ArrowUpDown, 
  CheckSquare,
  FileCheck, 
  Settings,
  ChartBar,
  Clipboard, 
  ClipboardList,
  ListCheck,
  PackagePlus,
  FileWarning,
  Scan,
  Download,
  Share,
  Save,
  Check,
  Loader2
} from 'lucide-react';

// Mock inventory data for stocktake
const inventoryItems = [
  { 
    id: 1, 
    name: 'Tomatoes', 
    category: 'Vegetables', 
    unit: 'kg', 
    theoreticalStock: 10, 
    actualStock: 5, 
    lastCount: 45,
    currentCount: 40,
    parLevel: 10, 
    location: 'Main Kitchen',
    expiryDate: '2025-03-15',
    batchNumber: 'BT-1001',
    supplier: 'Fresh Produce Co.',
    lastStocktake: '2025-03-08',
    status: 'low',
    variance: -5,
    costPerUnit: 2.50,
    totalCost: 12.50
  },
  { 
    id: 2, 
    name: 'Chicken Breast', 
    category: 'Meat', 
    unit: 'kg', 
    theoreticalStock: 15, 
    actualStock: 15, 
    lastCount: 15,
    currentCount: 15,
    parLevel: 8, 
    location: 'Cold Storage',
    expiryDate: '2025-03-10',
    batchNumber: 'BT-1002',
    supplier: 'Premium Meats',
    lastStocktake: '2025-03-08',
    status: 'good',
    variance: 0,
    costPerUnit: 8.95,
    totalCost: 134.25
  },
  { 
    id: 3, 
    name: 'Flour', 
    category: 'Dry Goods', 
    unit: 'kg', 
    theoreticalStock: 25, 
    actualStock: 27, 
    lastCount: 25,
    currentCount: 27,
    parLevel: 5, 
    location: 'Dry Storage',
    expiryDate: '2025-12-20',
    batchNumber: 'BT-1003',
    supplier: 'Bakery Supplies Inc.',
    lastStocktake: '2025-03-07',
    status: 'good',
    variance: 2,
    costPerUnit: 1.20,
    totalCost: 32.40
  },
  { 
    id: 4, 
    name: 'Olive Oil', 
    category: 'Oils', 
    unit: 'liter', 
    theoreticalStock: 4, 
    actualStock: 4, 
    lastCount: 4,
    currentCount: 4,
    parLevel: 3, 
    location: 'Dry Storage',
    expiryDate: '2025-10-15',
    batchNumber: 'BT-1004',
    supplier: 'Global Imports',
    lastStocktake: '2025-03-06',
    status: 'good',
    variance: 0,
    costPerUnit: 12.95,
    totalCost: 51.80
  },
  { 
    id: 5, 
    name: 'Onions', 
    category: 'Vegetables', 
    unit: 'kg', 
    theoreticalStock: 10, 
    actualStock: 2, 
    lastCount: 10,
    currentCount: 2,
    parLevel: 5, 
    location: 'Main Kitchen',
    expiryDate: '2025-03-20',
    batchNumber: 'BT-1005',
    supplier: 'Fresh Produce Co.',
    lastStocktake: '2025-03-08',
    status: 'low',
    variance: -8,
    costPerUnit: 1.50,
    totalCost: 3.00
  },
  { 
    id: 6, 
    name: 'Garlic', 
    category: 'Vegetables', 
    unit: 'kg', 
    theoreticalStock: 1.5, 
    actualStock: 0.5, 
    lastCount: 1.5,
    currentCount: 0.5,
    parLevel: 1, 
    location: 'Main Kitchen',
    expiryDate: '2025-03-12',
    batchNumber: 'BT-1006',
    supplier: 'Fresh Produce Co.',
    lastStocktake: '2025-03-08',
    status: 'low',
    variance: -1,
    costPerUnit: 5.00,
    totalCost: 2.50
  },
  { 
    id: 7, 
    name: 'Salmon Fillet', 
    category: 'Seafood', 
    unit: 'kg', 
    theoreticalStock: 6, 
    actualStock: 6, 
    lastCount: 6,
    currentCount: 6,
    parLevel: 4, 
    location: 'Cold Storage',
    expiryDate: '2025-03-09',
    batchNumber: 'BT-1007',
    supplier: 'Seafood Direct',
    lastStocktake: '2025-03-08',
    status: 'expiring',
    variance: 0,
    costPerUnit: 22.50,
    totalCost: 135.00
  },
  { 
    id: 8, 
    name: 'Heavy Cream', 
    category: 'Dairy', 
    unit: 'liter', 
    theoreticalStock: 5, 
    actualStock: 5, 
    lastCount: 5,
    currentCount: 5,
    parLevel: 2, 
    location: 'Cold Storage',
    expiryDate: '2025-03-10',
    batchNumber: 'BT-1008',
    supplier: 'Dairy Delights',
    lastStocktake: '2025-03-08',
    status: 'expiring',
    variance: 0,
    costPerUnit: 4.75,
    totalCost: 23.75
  },
  { 
    id: 9, 
    name: 'Fish Fillets', 
    category: 'Seafood', 
    unit: 'kg', 
    theoreticalStock: 8, 
    actualStock: 5, 
    lastCount: 8,
    currentCount: 5,
    parLevel: 10, 
    location: 'Freezer',
    expiryDate: '2025-04-15',
    batchNumber: 'BT-1010',
    supplier: 'Seafood Direct',
    lastStocktake: '2025-03-08',
    status: 'low',
    variance: -3,
    costPerUnit: 18.95,
    totalCost: 94.75
  },
];

// Stocktake templates
const stocktakeTemplates = [
  {
    id: 1,
    name: 'Weekly Full Count',
    description: 'Complete count of all inventory items',
    lastUsed: '2025-03-01',
    itemCount: 120,
    type: 'full'
  },
  {
    id: 2,
    name: 'Daily PAR Check',
    description: 'Count of items below PAR level',
    lastUsed: '2025-03-07',
    itemCount: 15,
    type: 'par'
  },
  {
    id: 3,
    name: 'Fridge Items',
    description: 'All items in refrigerated storage',
    lastUsed: '2025-03-05',
    itemCount: 35,
    type: 'location'
  },
  {
    id: 4,
    name: 'High Variance Items',
    description: 'Items with >10% variance in last count',
    lastUsed: '2025-03-02',
    itemCount: 8,
    type: 'variance'
  },
  {
    id: 5,
    name: 'Mise en Place',
    description: 'Prepped items ready for service',
    lastUsed: '2025-03-08',
    itemCount: 22,
    type: 'category'
  },
];

// Location data for stocktake
const locationData = [
  { id: 1, name: 'Main Kitchen', items: 18, lowStock: 3, expiring: 1 },
  { id: 2, name: 'Cold Storage', items: 12, lowStock: 0, expiring: 2 },
  { id: 3, name: 'Freezer', items: 10, lowStock: 1, expiring: 0 },
  { id: 4, name: 'Dry Storage', items: 25, lowStock: 1, expiring: 0 },
  { id: 5, name: 'Prep Area', items: 8, lowStock: 2, expiring: 0 },
];

// Category data
const categoryData = [
  { id: 1, name: 'Vegetables', items: 15 },
  { id: 2, name: 'Meat', items: 8 },
  { id: 3, name: 'Seafood', items: 6 },
  { id: 4, name: 'Dairy', items: 10 },
  { id: 5, name: 'Dry Goods', items: 20 },
  { id: 6, name: 'Oils', items: 4 },
];

// Mock active stocktake data
const activeStocktake = {
  id: 'ST-2025-0308',
  startedAt: '2025-03-08T09:30:00',
  template: 'Weekly Full Count',
  status: 'in-progress',
  progress: 65,
  itemsTotal: 120,
  itemsCounted: 78,
  variance: {
    total: -250.20,
    positive: 85.40,
    negative: -335.60
  }
};

// Mock historical stocktakes
const stocktakeHistory = [
  {
    id: 'ST-2025-0301',
    date: '2025-03-01',
    template: 'Weekly Full Count',
    completedBy: 'John Smith',
    variance: -325.50,
    itemsTotal: 120,
    status: 'completed'
  },
  {
    id: 'ST-2025-0215',
    date: '2025-02-15',
    template: 'Weekly Full Count',
    completedBy: 'Maria Garcia',
    variance: -187.25,
    itemsTotal: 118,
    status: 'completed'
  },
  {
    id: 'ST-2025-0208',
    date: '2025-02-08',
    template: 'Weekly Full Count',
    completedBy: 'John Smith',
    variance: -210.80,
    itemsTotal: 115,
    status: 'completed'
  }
];

// Staff members for task assignment
const staffMembers = [
  { id: 1, name: 'John Smith', role: 'Kitchen Manager' },
  { id: 2, name: 'Maria Garcia', role: 'Sous Chef' },
  { id: 3, name: 'David Lee', role: 'Line Cook' },
  { id: 4, name: 'Sarah Johnson', role: 'Inventory Specialist' },
  { id: 5, name: 'Michael Brown', role: 'Prep Cook' }
];

// Task assignments
const taskAssignments = [
  { 
    id: 1, 
    name: 'Main Kitchen Count', 
    assignedTo: 'Maria Garcia', 
    dueDate: '2025-03-10', 
    status: 'in-progress',
    location: 'Main Kitchen',
    itemCount: 18
  },
  { 
    id: 2, 
    name: 'Cold Storage Count', 
    assignedTo: 'David Lee', 
    dueDate: '2025-03-10', 
    status: 'pending',
    location: 'Cold Storage',
    itemCount: 12
  },
  { 
    id: 3, 
    name: 'Dry Storage Count', 
    assignedTo: 'Sarah Johnson', 
    dueDate: '2025-03-11', 
    status: 'pending',
    location: 'Dry Storage',
    itemCount: 25
  }
];

// Combined and enhanced StocktakeAdvanced component
const StocktakeAdvanced: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('start-stocktake');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [countView, setCountView] = useState<'all' | 'inProgress' | 'completed'>('all');
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    locations: new Set<number>(),
    categories: new Set<number>(),
    statuses: new Set<string>()
  });
  const [activeStocktakeData, setActiveStocktakeData] = useState(activeStocktake);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    type: 'custom'
  });
  const [isCountingActive, setIsCountingActive] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Filter functionality
  const toggleFilter = (type: 'locations' | 'categories' | 'statuses', id: number | string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[type].has(id as any)) {
        newFilters[type].delete(id as any);
      } else {
        newFilters[type].add(id as any);
      }
      return newFilters;
    });
  };

  // Apply filters to inventory items
  const filteredItems = inventoryItems.filter(item => {
    // Search query filter
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Location filter
    const matchesLocation = selectedFilters.locations.size === 0 || 
      [...selectedFilters.locations].some(locId => 
        locationData.find(loc => loc.id === locId)?.name === item.location
      );
    
    // Category filter
    const matchesCategory = selectedFilters.categories.size === 0 || 
      [...selectedFilters.categories].some(catId => 
        categoryData.find(cat => cat.id === catId)?.name === item.category
      );
    
    // Status filter
    const matchesStatus = selectedFilters.statuses.size === 0 || 
      selectedFilters.statuses.has(item.status);
    
    return matchesSearch && matchesLocation && matchesCategory && matchesStatus;
  });

  // Utility functions
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low':
        return <AlertTriangle className="h-4 w-4" />;
      case 'expiring':
        return <Clock className="h-4 w-4" />;
      case 'good':
        return <PackageCheck className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'low':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      case 'expiring':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      case 'good':
        return "bg-kitchen-success/10 text-kitchen-success";
      default:
        return "";
    }
  };

  const getVarianceClass = (variance: number) => {
    if (variance === 0) return "text-kitchen-success";
    if (variance > 0) return "text-kitchen-success";
    return "text-kitchen-danger";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Handle template selection
  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
    // In a real app, this would fetch the items for this template
    toast.success(`Template "${stocktakeTemplates.find(t => t.id === templateId)?.name}" selected`);
  };

  // Handle starting a stocktake
  const handleStartStocktake = () => {
    if (!selectedTemplate) {
      toast.error("Please select a template first");
      return;
    }
    
    setIsCountingActive(true);
    setActiveTab('active-stocktake');
    
    toast.success(`Started stocktake using "${stocktakeTemplates.find(t => t.id === selectedTemplate)?.name}" template`);
  };

  // Handle completing a stocktake
  const handleCompleteStocktake = () => {
    setIsCountingActive(false);
    setActiveTab('variance-report');
    toast.success("Stocktake completed successfully");
  };

  // Handle scanning barcode
  const handleScanBarcode = () => {
    toast("Barcode scanner activated. Scan an item barcode.", {
      description: "This is a demo feature. In a real application, this would activate your device's camera.",
      action: {
        label: "Cancel",
        onClick: () => console.log("Cancelled barcode scanning"),
      },
    });
  };

  // Handle exporting report
  const handleExportReport = () => {
    setIsExporting(true);
    
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Report exported successfully");
    }, 1500);
  };

  // Handle creating a new template
  const handleCreateTemplate = () => {
    setIsCreatingTemplate(true);
  };

  // Handle saving a new template
  const handleSaveTemplate = () => {
    if (!newTemplate.name) {
      toast.error("Please enter a template name");
      return;
    }
    
    setIsCreatingTemplate(false);
    toast.success(`Template "${newTemplate.name}" created successfully`);
    
    // Reset form
    setNewTemplate({
      name: '',
      description: '',
      type: 'custom'
    });
  };

  // Mock function to update count
  const updateCount = (itemId: number, newCount: string) => {
    // In a real app, this would update the item count in the database
    console.log(`Updating item ${itemId} count to ${newCount}`);
  };

  // Handle applying filters
  const handleApplyFilters = () => {
    toast.success("Filters applied successfully");
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="start-stocktake">Start Stocktake</TabsTrigger>
          <TabsTrigger value="active-stocktake">Active Stocktake</TabsTrigger>
          <TabsTrigger value="variance-report">Variance Report</TabsTrigger>
          <TabsTrigger value="task-management">Task Management</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Start Stocktake Tab */}
        <TabsContent value="start-stocktake" className="pt-4">
          {isCreatingTemplate ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Create New Template</CardTitle>
                <CardDescription>Define a new stocktake template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Template Name</label>
                  <Input 
                    placeholder="Enter template name" 
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input 
                    placeholder="Enter template description" 
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Template Type</label>
                  <select 
                    className="w-full h-10 rounded-md border border-kitchen-border bg-white px-3 py-2 text-sm"
                    value={newTemplate.type}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="full">Full Count</option>
                    <option value="par">PAR Based</option>
                    <option value="location">Location Based</option>
                    <option value="category">Category Based</option>
                    <option value="variance">Variance Based</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium mb-2">Select Locations</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {locationData.map(location => (
                      <div key={location.id} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id={`new-location-${location.id}`} 
                          className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                        />
                        <label htmlFor={`new-location-${location.id}`} className="text-sm">
                          {location.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium mb-2">Select Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categoryData.map(category => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id={`new-category-${category.id}`} 
                          className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                        />
                        <label htmlFor={`new-category-${category.id}`} className="text-sm">
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium mb-2">Assign Tasks</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm">Task Name</label>
                        <Input placeholder="Main Kitchen Count" />
                      </div>
                      <div>
                        <label className="text-sm">Assign To</label>
                        <select className="w-full h-10 rounded-md border border-kitchen-border bg-white px-3 py-2 text-sm">
                          {staffMembers.map(staff => (
                            <option key={staff.id} value={staff.id}>{staff.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm">Due Date</label>
                      <Input type="date" className="w-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsCreatingTemplate(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveTemplate}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Template
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Template Selection (Left Panel) */}
              <div className="lg:col-span-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Stocktake Templates</CardTitle>
                    <CardDescription>Select a template to begin your stocktake</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stocktakeTemplates.map(template => (
                      <div 
                        key={template.id}
                        className={cn(
                          "p-4 border rounded-md cursor-pointer transition-all",
                          selectedTemplate === template.id 
                            ? "border-kitchen-primary bg-kitchen-primary/5" 
                            : "border-kitchen-border hover:border-kitchen-primary/50"
                        )}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{template.name}</h3>
                            <p className="text-sm text-kitchen-muted-foreground mt-1">{template.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {template.itemCount} items
                              </Badge>
                              <span className="text-xs text-kitchen-muted-foreground">
                                Last used: {formatDate(template.lastUsed)}
                              </span>
                            </div>
                          </div>
                          <Badge 
                            className={cn(
                              template.type === 'full' ? "bg-kitchen-primary/10 text-kitchen-primary" :
                              template.type === 'par' ? "bg-kitchen-warning/10 text-kitchen-warning" :
                              template.type === 'variance' ? "bg-kitchen-danger/10 text-kitchen-danger" :
                              "bg-kitchen-muted text-kitchen-muted-foreground"
                            )}
                          >
                            {template.type === 'full' ? "Full Count" :
                             template.type === 'par' ? "PAR Based" :
                             template.type === 'variance' ? "Variance" :
                             template.type === 'location' ? "Location" :
                             "Category"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="w-full" onClick={handleCreateTemplate}>
                      <PackagePlus className="mr-2 h-4 w-4" />
                      Create New Template
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Filter By</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Locations</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {locationData.map(location => (
                          <div key={location.id} className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              id={`location-${location.id}`} 
                              className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                              checked={selectedFilters.locations.has(location.id)}
                              onChange={() => toggleFilter('locations', location.id)}
                            />
                            <label htmlFor={`location-${location.id}`} className="text-sm">
                              {location.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Categories</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {categoryData.map(category => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              id={`category-${category.id}`} 
                              className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                              checked={selectedFilters.categories.has(category.id)}
                              onChange={() => toggleFilter('categories', category.id)}
                            />
                            <label htmlFor={`category-${category.id}`} className="text-sm">
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Status</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="low-stock" 
                            className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                            checked={selectedFilters.statuses.has('low')}
                            onChange={() => toggleFilter('statuses', 'low')}
                          />
                          <label htmlFor="low-stock" className="text-sm flex items-center">
                            <AlertTriangle className="h-3 w-3 text-kitchen-danger mr-1" />
                            Low Stock Items
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="expiring" 
                            className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                            checked={selectedFilters.statuses.has('expiring')}
                            onChange={() => toggleFilter('statuses', 'expiring')}
                          />
                          <label htmlFor="expiring" className="text-sm flex items-center">
                            <Clock className="h-3 w-3 text-kitchen-warning mr-1" />
                            Expiring Soon
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="high-variance" 
                            className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                          />
                          <label htmlFor="high-variance" className="text-sm flex items-center">
                            <ArrowUpDown className="h-3 w-3 text-kitchen-danger mr-1" />
                            High Variance Items
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Active Stocktake Preview (Right Panel) */}
              <div className="lg:col-span-8 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Stocktake Preview</CardTitle>
                    <CardDescription>
                      {selectedTemplate ? 
                        `${stocktakeTemplates.find(t => t.id === selectedTemplate)?.name} - ${stocktakeTemplates.find(t => t.id === selectedTemplate)?.itemCount} items to count` : 
                        "Select a template or create a custom stocktake"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
                      <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
                        <Input
                          placeholder="Search items..."
                          className="pl-9 bg-white border-kitchen-border"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="text-kitchen-foreground">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm" className="text-kitchen-foreground" onClick={handleScanBarcode}>
                          <Scan className="mr-2 h-4 w-4" />
                          Scan Barcode
                        </Button>
                      </div>
                    </div>
                    
                    <Table>
                      <TableHeader className="bg-kitchen-muted">
                        <TableRow>
                          <TableHead className="font-medium w-10"></TableHead>
                          <TableHead className="font-medium">Item Name</TableHead>
                          <TableHead className="font-medium">Category</TableHead>
                          <TableHead className="font-medium">Location</TableHead>
                          <TableHead className="font-medium text-right">PAR Level</TableHead>
                          <TableHead className="font-medium text-right">Last Count</TableHead>
                          <TableHead className="font-medium text-right">Current Count</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.slice(0, 6).map((item) => (
                          <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                            <TableCell>
                              <input 
                                type="checkbox" 
                                className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell className="text-right">{item.parLevel} {item.unit}</TableCell>
                            <TableCell className="text-right">{item.lastCount} {item.unit}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Input 
                                  type="number" 
                                  className="w-20 text-right"
                                  defaultValue={item.currentCount}
                                  onChange={(e) => updateCount(item.id, e.target.value)}
                                />
                                <span>{item.unit}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {selectedTemplate ? (
                      <div className="flex justify-end mt-4">
                        <Button 
                          className="bg-kitchen-primary hover:bg-kitchen-primary/90"
                          onClick={handleStartStocktake}
                        >
                          <ClipboardList className="mr-2 h-4 w-4" />
                          Start Stocktake
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-md border-kitchen-border mt-4">
                        <FileCheck className="h-12 w-12 text-kitchen-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">No Template Selected</h3>
                        <p className="text-kitchen-muted-foreground mt-1">Select a template from the left or create a custom stocktake</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Last Stocktake</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-kitchen-muted-foreground">Date:</span>
                          <span className="font-medium">March 8, 2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-kitchen-muted-foreground">Template:</span>
                          <span className="font-medium">Weekly Full Count</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-kitchen-muted-foreground">Accuracy:</span>
                          <span className="font-medium text-kitchen-success">93%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-kitchen-muted-foreground">Variance:</span>
                          <span className="font-medium text-kitchen-danger">-$250.20</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Top Variances</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Tomatoes</span>
                          <Badge className="bg-kitchen-danger/10 text-kitchen-danger">
                            -5kg (-$12.50)
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Onions</span>
                          <Badge className="bg-kitchen-danger/10 text-kitchen-danger">
                            -8kg (-$12.00)
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Fish Fillets</span>
                          <Badge className="bg-kitchen-danger/10 text-kitchen-danger">
                            -3kg (-$56.85)
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Flour</span>
                          <Badge className="bg-kitchen-success/10 text-kitchen-success">
                            +2kg (+$2.40)
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">PAR Level Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm flex items-center">
                            <AlertTriangle className="h-3 w-3 text-kitchen-danger mr-1" />
                            Fish Fillets
                          </span>
                          <span className="text-sm">
                            5kg <span className="text-kitchen-muted-foreground">(PAR: 10kg)</span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm flex items-center">
                            <AlertTriangle className="h-3 w-3 text-kitchen-danger mr-1" />
                            Tomatoes
                          </span>
                          <span className="text-sm">
                            5kg <span className="text-kitchen-muted-foreground">(PAR: 10kg)</span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm flex items-center">
                            <AlertTriangle className="h-3 w-3 text-kitchen-danger mr-1" />
                            Garlic
                          </span>
                          <span className="text-sm">
                            0.5kg <span className="text-kitchen-muted-foreground">(PAR: 1kg)</span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm flex items-center">
                            <AlertTriangle className="h-3 w-3 text-kitchen-danger mr-1" />
                            Onions
                          </span>
                          <span className="text-sm">
                            2kg <span className="text-kitchen-muted-foreground">(PAR: 5kg)</span>
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
        
        {/* Active Stocktake Tab */}
        <TabsContent value="active-stocktake" className="pt-4">
          <div className="space-y-6">
            {/* Progress Bar and Status */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-medium">Active Stocktake: {activeStocktakeData.template}</h3>
                      <p className="text-sm text-kitchen-muted-foreground mt-1">
                        Started: {new Date(activeStocktakeData.startedAt).toLocaleString()} • 
                        ID: {activeStocktakeData.id}
                      </p>
                    </div>
                    <Badge 
                      className={
                        activeStocktakeData.status === 'in-progress' 
                          ? "bg-kitchen-warning/10 text-kitchen-warning"
                          : "bg-kitchen-success/10 text-kitchen-success"
                      }
                    >
                      {activeStocktakeData.status === 'in-progress' ? 'In Progress' : 'Completed'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress: {activeStocktakeData.itemsCounted} of {activeStocktakeData.itemsTotal} items</span>
                      <span className="font-medium">{activeStocktakeData.progress}%</span>
                    </div>
                    <Progress value={activeStocktakeData.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="bg-kitchen-muted/30 p-3 rounded-md">
                      <p className="text-sm text-kitchen-muted-foreground">Total Counted</p>
                      <p className="text-xl font-medium">{activeStocktakeData.itemsCounted} items</p>
                    </div>
                    <div className="bg-kitchen-muted/30 p-3 rounded-md">
                      <p className="text-sm text-kitchen-muted-foreground">Remaining</p>
                      <p className="text-xl font-medium">{activeStocktakeData.itemsTotal - activeStocktakeData.itemsCounted} items</p>
                    </div>
                    <div className="bg-kitchen-muted/30 p-3 rounded-md">
                      <p className="text-sm text-kitchen-muted-foreground">Current Variance</p>
                      <p className={cn(
                        "text-xl font-medium",
                        activeStocktakeData.variance.total < 0 ? "text-kitchen-danger" : "text-kitchen-success"
                      )}>
                        {formatCurrency(activeStocktakeData.variance.total)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Count Interface */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative w-full sm:w-72 lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
                <Input
                  placeholder="Search items to count..."
                  className="pl-9 bg-white border-kitchen-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button 
                    className={cn(
                      "px-3 py-1 text-sm",
                      countView === 'all' ? "bg-kitchen-primary text-white" : "bg-white"
                    )}
                    onClick={() => setCountView('all')}
                  >
                    All
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-sm",
                      countView === 'inProgress' ? "bg-kitchen-primary text-white" : "bg-white"
                    )}
                    onClick={() => setCountView('inProgress')}
                  >
                    In Progress
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-sm",
                      countView === 'completed' ? "bg-kitchen-primary text-white" : "bg-white"
                    )}
                    onClick={() => setCountView('completed')}
                  >
                    Completed
                  </button>
                </div>
                <Button variant="outline" size="sm" className="text-kitchen-foreground">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="text-kitchen-foreground" onClick={handleScanBarcode}>
                  <Scan className="mr-2 h-4 w-4" />
                  Scan
                </Button>
              </div>
            </div>
            
            <Card className="shadow-apple-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-kitchen-muted">
                  <TableRow>
                    <TableHead className="font-medium">Item Name</TableHead>
                    <TableHead className="font-medium">Location</TableHead>
                    <TableHead className="font-medium text-right">Last Count</TableHead>
                    <TableHead className="font-medium text-right">Current Count</TableHead>
                    <TableHead className="font-medium text-right">PAR Level</TableHead>
                    <TableHead className="font-medium text-right">Variance</TableHead>
                    <TableHead className="font-medium text-right">Status</TableHead>
                    <TableHead className="font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell className="text-right">{item.lastCount} {item.unit}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Input 
                            type="number" 
                            className="w-20 text-right"
                            defaultValue={item.currentCount}
                            onChange={(e) => updateCount(item.id, e.target.value)}
                          />
                          <span>{item.unit}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{item.parLevel} {item.unit}</TableCell>
                      <TableCell className={cn(
                        "text-right font-medium", 
                        getVarianceClass(item.variance)
                      )}>
                        {item.variance > 0 ? "+" : ""}{item.variance} {item.unit}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={getStatusClass(item.status)}>
                          {getStatusIcon(item.status)}
                          <span className="ml-1">
                            {item.status === 'low' ? 'Low' : 
                             item.status === 'expiring' ? 'Expiring' : 'Good'}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Mark as counted">
                          <CheckSquare className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Progress
              </Button>
              <Button onClick={handleCompleteStocktake}>
                <Check className="mr-2 h-4 w-4" />
                Complete Stocktake
              </Button>
            </div>
          </div>
        </TabsContent>
        
        {/* Variance Report Tab */}
        <TabsContent value="variance-report" className="pt-4">
          <div className="space-y-6">
            <Card className="shadow-apple-sm overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Variance Summary</CardTitle>
                <CardDescription>Analysis from your latest stocktake</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-kitchen-muted/30 p-4 rounded-md">
                    <h3 className="text-sm text-kitchen-muted-foreground">Total Variance</h3>
                    <p className="text-2xl font-semibold text-kitchen-danger">-$250.20</p>
                    <p className="text-sm text-kitchen-muted-foreground mt-1">2.75% of inventory value</p>
                  </div>
                  <div className="bg-kitchen-muted/30 p-4 rounded-md">
                    <h3 className="text-sm text-kitchen-muted-foreground">Positive Variance</h3>
                    <p className="text-2xl font-semibold text-kitchen-success">+$85.40</p>
                    <p className="text-sm text-kitchen-muted-foreground mt-1">1 item over counted</p>
                  </div>
                  <div className="bg-kitchen-muted/30 p-4 rounded-md">
                    <h3 className="text-sm text-kitchen-muted-foreground">Negative Variance</h3>
                    <p className="text-2xl font-semibold text-kitchen-danger">-$335.60</p>
                    <p className="text-sm text-kitchen-muted-foreground mt-1">4 items under counted</p>
                  </div>
                  <div className="bg-kitchen-muted/30 p-4 rounded-md">
                    <h3 className="text-sm text-kitchen-muted-foreground">Accuracy Rate</h3>
                    <p className="text-2xl font-semibold">93%</p>
                    <p className="text-sm text-kitchen-muted-foreground mt-1">Target: 95%</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Top Variances by Value</h3>
                  <Table>
                    <TableHeader className="bg-kitchen-muted">
                      <TableRow>
                        <TableHead className="font-medium">Item Name</TableHead>
                        <TableHead className="font-medium">Category</TableHead>
                        <TableHead className="font-medium text-right">Theoretical</TableHead>
                        <TableHead className="font-medium text-right">Actual</TableHead>
                        <TableHead className="font-medium text-right">Variance (Qty)</TableHead>
                        <TableHead className="font-medium text-right">Variance ($)</TableHead>
                        <TableHead className="font-medium">Location</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems
                        .filter(item => item.variance !== 0)
                        .sort((a, b) => Math.abs(b.variance * b.costPerUnit) - Math.abs(a.variance * a.costPerUnit))
                        .slice(0, 5)
                        .map((item) => (
                        <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell className="text-right">{item.theoreticalStock} {item.unit}</TableCell>
                          <TableCell className="text-right">{item.actualStock} {item.unit}</TableCell>
                          <TableCell className={cn("text-right font-medium", getVarianceClass(item.variance))}>
                            {item.variance > 0 ? "+" : ""}{item.variance} {item.unit}
                          </TableCell>
                          <TableCell className={cn("text-right font-medium", getVarianceClass(item.variance))}>
                            {item.variance > 0 ? "+" : ""}
                            {formatCurrency(item.variance * item.costPerUnit)}
                          </TableCell>
                          <TableCell>{item.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 bg-kitchen-muted/30 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Variance Analysis</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-kitchen-muted-foreground mb-1">Most Affected Category</p>
                      <p className="text-lg font-medium">Vegetables</p>
                      <p className="text-sm text-kitchen-muted-foreground">-$85.50 variance</p>
                    </div>
                    <div>
                      <p className="text-sm text-kitchen-muted-foreground mb-1">Most Affected Location</p>
                      <p className="text-lg font-medium">Main Kitchen</p>
                      <p className="text-sm text-kitchen-muted-foreground">-$125.75 variance</p>
                    </div>
                    <div>
                      <p className="text-sm text-kitchen-muted-foreground mb-1">Recommended Action</p>
                      <p className="text-lg font-medium">Staff Training</p>
                      <p className="text-sm text-kitchen-muted-foreground">Focus on vegetable handling</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleExportReport}>
                  {isExporting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Export Report
                    </>
                  )}
                </Button>
                <Button>
                  <Share className="mr-2 h-4 w-4" />
                  Share Report
                </Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Historical Variance</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed border-kitchen-muted rounded-md">
                  <div className="text-center">
                    <ChartBar className="h-12 w-12 text-kitchen-muted-foreground mx-auto mb-2" />
                    <p className="text-kitchen-muted-foreground">Chart showing historical variance trends would appear here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Variance by Category</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed border-kitchen-muted rounded-md">
                  <div className="text-center">
                    <ChartBar className="h-12 w-12 text-kitchen-muted-foreground mx-auto mb-2" />
                    <p className="text-kitchen-muted-foreground">Chart showing variance by category would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Task Management Tab - New */}
        <TabsContent value="task-management" className="pt-4">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Task Assignments</CardTitle>
                <CardDescription>Manage and monitor stocktake tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
                      <Input
                        placeholder="Search tasks..."
                        className="pl-9 bg-white border-kitchen-border"
                      />
                    </div>
                    <Button>
                      <ListCheck className="mr-2 h-4 w-4" />
                      Create New Task
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader className="bg-kitchen-muted">
                      <TableRow>
                        <TableHead className="font-medium">Task Name</TableHead>
                        <TableHead className="font-medium">Assigned To</TableHead>
                        <TableHead className="font-medium">Location</TableHead>
                        <TableHead className="font-medium">Items</TableHead>
                        <TableHead className="font-medium">Due Date</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="font-medium text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {taskAssignments.map((task) => (
                        <TableRow key={task.id} className="hover:bg-kitchen-muted/30">
                          <TableCell className="font-medium">{task.name}</TableCell>
                          <TableCell>{task.assignedTo}</TableCell>
                          <TableCell>{task.location}</TableCell>
                          <TableCell>{task.itemCount} items</TableCell>
                          <TableCell>{formatDate(task.dueDate)}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                task.status === 'completed' ? "bg-kitchen-success/10 text-kitchen-success" :
                                task.status === 'in-progress' ? "bg-kitchen-warning/10 text-kitchen-warning" :
                                "bg-kitchen-muted/50 text-kitchen-muted-foreground"
                              }
                            >
                              {task.status === 'completed' ? 'Completed' :
                               task.status === 'in-progress' ? 'In Progress' :
                               'Pending'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit task">
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Mark complete">
                                <CheckSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Task Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-kitchen-muted-foreground">Pending</span>
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-kitchen-muted-foreground">In Progress</span>
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-kitchen-muted-foreground">Completed</span>
                      <span className="text-sm font-medium">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-kitchen-muted-foreground">Total</span>
                      <span className="text-sm font-medium">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Assigned Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {staffMembers.filter(staff => 
                      taskAssignments.some(task => task.assignedTo === staff.name)
                    ).map(staff => (
                      <div key={staff.id} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{staff.name}</p>
                          <p className="text-xs text-kitchen-muted-foreground">{staff.role}</p>
                        </div>
                        <Badge variant="outline">
                          {taskAssignments.filter(task => task.assignedTo === staff.name).length} tasks
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upcoming Due Dates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {taskAssignments
                      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                      .map(task => (
                      <div key={task.id} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{task.name}</p>
                          <p className="text-xs text-kitchen-muted-foreground">Assigned to: {task.assignedTo}</p>
                        </div>
                        <Badge 
                          className={
                            new Date(task.dueDate) < new Date() ? "bg-kitchen-danger/10 text-kitchen-danger" :
                            "bg-kitchen-muted/50 text-kitchen-muted-foreground"
                          }
                        >
                          {formatDate(task.dueDate)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* History Tab - New */}
        <TabsContent value="history" className="pt-4">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Stocktake History</CardTitle>
                <CardDescription>View and analyze past stocktakes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
                    <Input
                      placeholder="Search stocktakes..."
                      className="pl-9 bg-white border-kitchen-border"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm">From:</label>
                      <Input type="date" className="w-auto" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm">To:</label>
                      <Input type="date" className="w-auto" />
                    </div>
                  </div>
                </div>
                
                <Table>
                  <TableHeader className="bg-kitchen-muted">
                    <TableRow>
                      <TableHead className="font-medium">ID</TableHead>
                      <TableHead className="font-medium">Date</TableHead>
                      <TableHead className="font-medium">Template</TableHead>
                      <TableHead className="font-medium">Items</TableHead>
                      <TableHead className="font-medium">Completed By</TableHead>
                      <TableHead className="font-medium text-right">Variance</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                      <TableHead className="font-medium text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stocktakeHistory.map((stocktake) => (
                      <TableRow key={stocktake.id} className="hover:bg-kitchen-muted/30">
                        <TableCell className="font-medium">{stocktake.id}</TableCell>
                        <TableCell>{formatDate(stocktake.date)}</TableCell>
                        <TableCell>{stocktake.template}</TableCell>
                        <TableCell>{stocktake.itemsTotal} items</TableCell>
                        <TableCell>{stocktake.completedBy}</TableCell>
                        <TableCell className={cn(
                          "text-right font-medium", 
                          stocktake.variance < 0 ? "text-kitchen-danger" : "text-kitchen-success"
                        )}>
                          {formatCurrency(stocktake.variance)}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              stocktake.status === 'completed' ? "bg-kitchen-success/10 text-kitchen-success" :
                              "bg-kitchen-warning/10 text-kitchen-warning"
                            }
                          >
                            {stocktake.status === 'completed' ? 'Completed' : 'In Progress'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View details">
                              <FileCheck className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Export report">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Monthly Summary</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed border-kitchen-muted rounded-md">
                  <div className="text-center">
                    <ChartBar className="h-12 w-12 text-kitchen-muted-foreground mx-auto mb-2" />
                    <p className="text-kitchen-muted-foreground">Chart showing monthly variance trends would appear here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Staff Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">John Smith</p>
                        <p className="text-xs text-kitchen-muted-foreground">Kitchen Manager</p>
                      </div>
                      <Badge className="bg-kitchen-success/10 text-kitchen-success">96% accuracy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Maria Garcia</p>
                        <p className="text-xs text-kitchen-muted-foreground">Sous Chef</p>
                      </div>
                      <Badge className="bg-kitchen-success/10 text-kitchen-success">93% accuracy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">David Lee</p>
                        <p className="text-xs text-kitchen-muted-foreground">Line Cook</p>
                      </div>
                      <Badge className="bg-kitchen-warning/10 text-kitchen-warning">88% accuracy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs text-kitchen-muted-foreground">Inventory Specialist</p>
                      </div>
                      <Badge className="bg-kitchen-success/10 text-kitchen-success">98% accuracy</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Template Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stocktakeTemplates.slice(0, 4).map(template => (
                      <div key={template.id} className="flex justify-between items-center">
                        <p className="text-sm font-medium">{template.name}</p>
                        <Badge variant="outline">
                          {Math.floor(Math.random() * 10) + 1} times used
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Stocktake Settings</CardTitle>
                <CardDescription>Configure your stocktake process and templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Variance Thresholds</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Warning Threshold (%)</label>
                      <Input defaultValue="5" />
                      <p className="text-xs text-kitchen-muted-foreground">Items with variance above this % will be highlighted in yellow</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Critical Threshold (%)</label>
                      <Input defaultValue="10" />
                      <p className="text-xs text-kitchen-muted-foreground">Items with variance above this % will be highlighted in red</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Approval Workflow</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="require-approval" 
                        defaultChecked
                        className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                      />
                      <label htmlFor="require-approval" className="text-sm">
                        Require manager approval for stocktake completion
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="notify-high-variance" 
                        defaultChecked
                        className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                      />
                      <label htmlFor="notify-high-variance" className="text-sm">
                        Notify managers about high variance items
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="auto-po" 
                        className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                      />
                      <label htmlFor="auto-po" className="text-sm">
                        Automatically generate purchase orders for low stock items
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Units of Measure</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Weight Unit</label>
                      <select className="w-full h-10 rounded-md border border-kitchen-border bg-white px-3 py-2 text-sm">
                        <option>Kilograms (kg)</option>
                        <option>Pounds (lb)</option>
                        <option>Ounces (oz)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Volume Unit</label>
                      <select className="w-full h-10 rounded-md border border-kitchen-border bg-white px-3 py-2 text-sm">
                        <option>Liters (L)</option>
                        <option>Gallons (gal)</option>
                        <option>Milliliters (ml)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Currency</label>
                      <select className="w-full h-10 rounded-md border border-kitchen-border bg-white px-3 py-2 text-sm">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Template Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full flex items-center" onClick={handleCreateTemplate}>
                    <PackagePlus className="mr-2 h-4 w-4" />
                    Create New Template
                  </Button>
                  
                  <div className="space-y-2">
                    {stocktakeTemplates.map(template => (
                      <div 
                        key={template.id}
                        className="p-3 border rounded-md hover:border-kitchen-primary/50 transition-all cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-sm">{template.name}</h3>
                            <p className="text-xs text-kitchen-muted-foreground">{template.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {template.itemCount} items
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Integration Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Connect with Other Modules</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="recipes-integration" 
                            defaultChecked
                            className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                          />
                          <label htmlFor="recipes-integration" className="text-sm">
                            Recipes
                          </label>
                        </div>
                        <Badge>Connected</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="procurement-integration" 
                            defaultChecked
                            className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                          />
                          <label htmlFor="procurement-integration" className="text-sm">
                            Procurement
                          </label>
                        </div>
                        <Badge>Connected</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="financials-integration" 
                            defaultChecked
                            className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                          />
                          <label htmlFor="financials-integration" className="text-sm">
                            Financials
                          </label>
                        </div>
                        <Badge>Connected</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">External Connections</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="barcode-scanner" 
                            className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                          />
                          <label htmlFor="barcode-scanner" className="text-sm">
                            Barcode Scanner
                          </label>
                        </div>
                        <Badge variant="outline">Not Connected</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="iot-sensors" 
                            className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                          />
                          <label htmlFor="iot-sensors" className="text-sm">
                            IoT Sensors
                          </label>
                        </div>
                        <Badge variant="outline">Not Connected</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="mobile-app" 
                            defaultChecked
                            className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                          />
                          <label htmlFor="mobile-app" className="text-sm">
                            Mobile App
                          </label>
                        </div>
                        <Badge>Connected</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StocktakeAdvanced;
