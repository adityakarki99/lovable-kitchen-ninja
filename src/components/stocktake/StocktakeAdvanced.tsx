
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
      
      if (type === 'locations') {
        const locationId = id as LocationId;
        if (newFilters.locations.has(locationId)) {
          newFilters.locations.delete(locationId);
        } else {
          newFilters.locations.add(locationId);
        }
      } 
      else if (type === 'categories') {
        const categoryId = id as CategoryId;
        if (newFilters.categories.has(categoryId)) {
          newFilters.categories.delete(categoryId);
        } else {
          newFilters.categories.add(categoryId);
        }
      }
      else if (type === 'statuses') {
        const status = id as StatusType;
        if (newFilters.statuses.has(status)) {
          newFilters.statuses.delete(status);
        } else {
          newFilters.statuses.add(status);
        }
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
      selectedFilters.statuses.has(item.status as StatusType);
    
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
                    <Button className="w-full" onClick={handleApplyFilters}>
                      <Filter className="mr-2 h-4 w-4" />
                      Apply Filters
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Item List (Right Panel) */}
              <div className="lg:col-span-8">
                <Card className="mb-6">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-xl">Item Selection</CardTitle>
                      <CardDescription>Items for selected template</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-kitchen-muted-foreground" />
                        <Input 
                          placeholder="Search items..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8 w-[280px]"
                        />
                      </div>
                      <Button variant="outline" onClick={handleScanBarcode}>
                        <Barcode className="mr-2 h-4 w-4" />
                        Scan
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[30px]">ID</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Theoretical</TableHead>
                          <TableHead>Actual</TableHead>
                          <TableHead>Variance</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.length > 0 ? (
                          filteredItems.map(item => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.id}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>{item.location}</TableCell>
                              <TableCell>{item.unit}</TableCell>
                              <TableCell>{item.theoreticalStock}</TableCell>
                              <TableCell>{item.actualStock}</TableCell>
                              <TableCell className={getVarianceClass(item.variance)}>
                                {item.variance > 0 ? `+${item.variance}` : item.variance}
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusClass(item.status)}>
                                  {getStatusIcon(item.status)}
                                  <span className="ml-1">{item.status}</span>
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={9} className="text-center py-6 text-kitchen-muted-foreground">
                              No items found matching your search or filters.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="h-4 w-4 text-kitchen-muted-foreground" />
                      <span className="text-sm text-kitchen-muted-foreground">
                        {filteredItems.length} items selected
                      </span>
                    </div>
                    <Button 
                      onClick={handleStartStocktake}
                      disabled={!selectedTemplate}
                    >
                      <ListCheck className="mr-2 h-4 w-4" />
                      Start Stocktake
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Active Stocktake Tab */}
        <TabsContent value="active-stocktake" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Active Stocktake</CardTitle>
                  <CardDescription>
                    {activeStocktakeData.id} | Started {formatDate(activeStocktakeData.startedAt.split('T')[0])}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm">{activeStocktakeData.progress}%</span>
                    </div>
                    <Progress value={activeStocktakeData.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <span className="text-sm text-kitchen-muted-foreground">Template</span>
                      <p className="font-medium">{activeStocktakeData.template}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-kitchen-muted-foreground">Status</span>
                      <p>
                        <Badge className="bg-kitchen-primary/10 text-kitchen-primary">
                          {activeStocktakeData.status}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-sm text-kitchen-muted-foreground">Items Total</span>
                      <p className="font-medium">{activeStocktakeData.itemsTotal}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-kitchen-muted-foreground">Items Counted</span>
                      <p className="font-medium">{activeStocktakeData.itemsCounted}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="space-y-1">
                      <span className="text-sm text-kitchen-muted-foreground">Current Variance</span>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 rounded bg-kitchen-muted/20">
                          <span className="text-sm block">Total</span>
                          <span className={cn("font-medium", getVarianceClass(activeStocktakeData.variance.total))}>
                            {formatCurrency(activeStocktakeData.variance.total)}
                          </span>
                        </div>
                        <div className="p-2 rounded bg-kitchen-muted/20">
                          <span className="text-sm block">Positive</span>
                          <span className="font-medium text-kitchen-success">
                            {formatCurrency(activeStocktakeData.variance.positive)}
                          </span>
                        </div>
                        <div className="p-2 rounded bg-kitchen-muted/20">
                          <span className="text-sm block">Negative</span>
                          <span className="font-medium text-kitchen-danger">
                            {formatCurrency(activeStocktakeData.variance.negative)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleScanBarcode}
                  >
                    <Scan className="mr-2 h-4 w-4" />
                    Scan Item
                  </Button>
                  <Button 
                    className="w-full" 
                    onClick={handleCompleteStocktake}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Complete Stocktake
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Count Items</CardTitle>
                    <CardDescription>Update actual quantities</CardDescription>
                  </div>
                  <div className="flex gap-1 rounded-md border p-1">
                    <Button 
                      variant={countView === "all" ? "secondary" : "ghost"} 
                      size="sm" 
                      onClick={() => setCountView("all")}
                      className="text-xs px-2"
                    >
                      All Items
                    </Button>
                    <Button 
                      variant={countView === "inProgress" ? "secondary" : "ghost"} 
                      size="sm" 
                      onClick={() => setCountView("inProgress")}
                      className="text-xs px-2"
                    >
                      In Progress
                    </Button>
                    <Button 
                      variant={countView === "completed" ? "secondary" : "ghost"} 
                      size="sm" 
                      onClick={() => setCountView("completed")}
                      className="text-xs px-2"
                    >
                      Completed
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[30px]">ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Last Count</TableHead>
                        <TableHead>Current Count</TableHead>
                        <TableHead>Variance</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventoryItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{item.lastCount}</TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              value={item.currentCount}
                              onChange={(e) => updateCount(item.id, e.target.value)}
                              className="w-20 h-8"
                            />
                          </TableCell>
                          <TableCell className={getVarianceClass(item.lastCount - item.currentCount)}>
                            {item.lastCount - item.currentCount === 0 
                              ? "0" 
                              : (item.lastCount - item.currentCount > 0 
                                ? `+${item.lastCount - item.currentCount}` 
                                : item.lastCount - item.currentCount)}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <CheckSquare className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Variance Report Tab */}
        <TabsContent value="variance-report" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Variance Report</CardTitle>
                    <CardDescription>
                      {activeStocktakeData.id} | Completed {formatDate(new Date().toISOString().split('T')[0])}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
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
                    <Button variant="outline">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[30px]">ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Theoretical</TableHead>
                        <TableHead>Actual</TableHead>
                        <TableHead>Variance Qty</TableHead>
                        <TableHead>Cost Per Unit</TableHead>
                        <TableHead>Variance Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventoryItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>{item.theoreticalStock}</TableCell>
                          <TableCell>{item.actualStock}</TableCell>
                          <TableCell className={getVarianceClass(item.variance)}>
                            {item.variance > 0 ? `+${item.variance}` : item.variance}
                          </TableCell>
                          <TableCell>{formatCurrency(item.costPerUnit)}</TableCell>
                          <TableCell className={getVarianceClass(item.variance * item.costPerUnit)}>
                            {formatCurrency(item.variance * item.costPerUnit)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <div>
                    <span className="text-sm text-kitchen-muted-foreground block">Summary</span>
                    <div className="flex items-center space-x-6 mt-1">
                      <div>
                        <span className="text-sm">Total Items:</span>
                        <span className="font-medium ml-1">{inventoryItems.length}</span>
                      </div>
                      <div>
                        <span className="text-sm">Items with Variance:</span>
                        <span className="font-medium ml-1">
                          {inventoryItems.filter(item => item.variance !== 0).length}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm">Total Variance:</span>
                        <span className={cn("font-medium ml-1", getVarianceClass(activeStocktakeData.variance.total))}>
                          {formatCurrency(activeStocktakeData.variance.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Variance Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Top Losses by Value</h3>
                    <div className="space-y-2">
                      {inventoryItems
                        .filter(item => item.variance < 0)
                        .sort((a, b) => (a.variance * a.costPerUnit) - (b.variance * b.costPerUnit))
                        .slice(0, 3)
                        .map(item => (
                          <div key={item.id} className="flex justify-between items-center p-2 bg-kitchen-muted/10 rounded">
                            <div>
                              <span className="font-medium">{item.name}</span>
                              <div className="text-xs text-kitchen-muted-foreground">
                                Variance: {item.variance} {item.unit}
                              </div>
                            </div>
                            <span className="text-kitchen-danger font-medium">
                              {formatCurrency(item.variance * item.costPerUnit)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Top Overstocks by Value</h3>
                    <div className="space-y-2">
                      {inventoryItems
                        .filter(item => item.variance > 0)
                        .sort((a, b) => (b.variance * b.costPerUnit) - (a.variance * a.costPerUnit))
                        .slice(0, 3)
                        .map(item => (
                          <div key={item.id} className="flex justify-between items-center p-2 bg-kitchen-muted/10 rounded">
                            <div>
                              <span className="font-medium">{item.name}</span>
                              <div className="text-xs text-kitchen-muted-foreground">
                                Variance: +{item.variance} {item.unit}
                              </div>
                            </div>
                            <span className="text-kitchen-success font-medium">
                              {formatCurrency(item.variance * item.costPerUnit)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Recommendations</h3>
                    <div className="space-y-2">
                      <div className="p-3 border border-kitchen-warning/20 bg-kitchen-warning/5 rounded text-sm">
                        <div className="font-medium flex items-center">
                          <FileWarning className="h-4 w-4 mr-1 text-kitchen-warning" />
                          Investigate Fish Fillets Losses
                        </div>
                        <p className="mt-1 text-kitchen-muted-foreground">
                          Consistent losses detected over past 3 stocktakes. Consider portion control training.
                        </p>
                      </div>
                      <div className="p-3 border border-kitchen-primary/20 bg-kitchen-primary/5 rounded text-sm">
                        <div className="font-medium flex items-center">
                          <ChartBar className="h-4 w-4 mr-1 text-kitchen-primary" />
                          Review PAR Levels
                        </div>
                        <p className="mt-1 text-kitchen-muted-foreground">
                          Several items showing consistent overstock. Consider adjusting PAR levels.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Task Management Tab */}
        <TabsContent value="task-management" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Task Assignments</CardTitle>
                  <CardDescription>Manage stocktake assignments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {taskAssignments.map(task => (
                    <div 
                      key={task.id}
                      className="p-4 border rounded-md"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{task.name}</h3>
                          <p className="text-sm text-kitchen-muted-foreground mt-1">
                            {task.location} • {task.itemCount} items
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge 
                              className={
                                task.status === 'completed' ? "bg-kitchen-success/10 text-kitchen-success" :
                                task.status === 'in-progress' ? "bg-kitchen-primary/10 text-kitchen-primary" :
                                "bg-kitchen-muted/50 text-kitchen-muted-foreground"
                              }
                            >
                              {task.status}
                            </Badge>
                            <span className="text-xs text-kitchen-muted-foreground">
                              Due: {formatDate(task.dueDate)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-kitchen-muted-foreground">Assigned to</span>
                          <p className="font-medium">{task.assignedTo}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <PackagePlus className="mr-2 h-4 w-4" />
                    Create New Task
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-7">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Staff Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff Member</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Assigned Tasks</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staffMembers.map(member => {
                        const assignedTasks = taskAssignments.filter(task => 
                          task.assignedTo === member.name
                        );
                        const completedTasks = assignedTasks.filter(task => 
                          task.status === 'completed'
                        ).length;
                        
                        return (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell>{assignedTasks.length}</TableCell>
                            <TableCell>{completedTasks} of {assignedTasks.length}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">Assign</Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Stocktake History</CardTitle>
              <CardDescription>Review past stocktake records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Completed By</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stocktakeHistory.map(record => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{formatDate(record.date)}</TableCell>
                      <TableCell>{record.template}</TableCell>
                      <TableCell>{record.completedBy}</TableCell>
                      <TableCell>{record.itemsTotal}</TableCell>
                      <TableCell className={getVarianceClass(record.variance)}>
                        {formatCurrency(record.variance)}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-kitchen-success/10 text-kitchen-success">
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileCheck className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Stocktake Settings</CardTitle>
              <CardDescription>Customize your stocktake process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Display Settings</h3>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="show-completed" 
                    className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                    checked={showCompleted}
                    onChange={(e) => setShowCompleted(e.target.checked)}
                  />
                  <label htmlFor="show-completed" className="text-sm">
                    Show completed items during count
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Notification Settings</h3>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="email-notifications" 
                    className="h-4 w-4 rounded border-kitchen-border text-kitchen-primary focus:ring-kitchen-primary"
                    defaultChecked
                  />
                  <label htmlFor="email-notifications" className="text-sm">
                    Send email notifications for high variance items
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Schedule Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm block mb-1">
                      Default stocktake day
                    </label>
                    <select className="w-full h-10 rounded-md border border-kitchen-border bg-white px-3 py-2 text-sm">
                      <option value="1">Monday</option>
                      <option value="2">Tuesday</option>
                      <option value="3">Wednesday</option>
                      <option value="4">Thursday</option>
                      <option value="5">Friday</option>
                      <option value="6">Saturday</option>
                      <option value="0">Sunday</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm block mb-1">
                      Automatic reminder (hours before)
                    </label>
                    <Input type="number" defaultValue={24} className="w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Settings className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StocktakeAdvanced;
