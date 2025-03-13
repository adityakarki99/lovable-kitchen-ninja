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

// Updated type definitions for the filters
type LocationId = number;
type CategoryId = number;
type StatusType = 'low' | 'expiring' | 'good';

interface SelectedFilters {
  locations: Set<LocationId>;
  categories: Set<CategoryId>;
  statuses: Set<StatusType>;
}

// Combined and enhanced StocktakeAdvanced component
const StocktakeAdvanced: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('start-stocktake');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [countView, setCountView] = useState<'all' | 'inProgress' | 'completed'>('all');
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    locations: new Set<LocationId>(),
    categories: new Set<CategoryId>(),
    statuses: new Set<StatusType>()
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

  // Fix the filter functionality with proper typing
  const toggleFilter = (type: keyof SelectedFilters, id: LocationId | CategoryId | StatusType) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      const targetSet = newFilters[type] as Set<typeof id>;
      
      if (targetSet.has(id)) {
        targetSet.delete(id);
      } else {
        targetSet.add(id);
      }
      
      return newFilters;
    });
  };

  // Filter functionality
  const toggleFilterOriginal = (type: 'locations' | 'categories' | 'statuses', id: number | string) => {
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
