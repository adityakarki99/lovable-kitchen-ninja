import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Search, 
  Filter, 
  Barcode, 
  Clipboard, 
  AlertTriangle, 
  Clock, 
  BarChart, 
  ArrowUpDown, 
  PackageCheck,
  ListCheck,
  FileCheck,
  Scan,
  Save,
  Download,
  Settings,
  ChartBar
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
    varianceValue: -12.50,
    costPerUnit: 2.50
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
    varianceValue: 0,
    costPerUnit: 8.95
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
    varianceValue: 2.40,
    costPerUnit: 1.20
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
    varianceValue: 0,
    costPerUnit: 12.95
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
    varianceValue: -12.00,
    costPerUnit: 1.50
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
    varianceValue: -5.00,
    costPerUnit: 5.00
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
    varianceValue: 0,
    costPerUnit: 22.50
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
    varianceValue: 0,
    costPerUnit: 4.75
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
    varianceValue: -56.85,
    costPerUnit: 18.95
  },
];

const stocktakeTemplates = [
  {
    id: 1,
    name: 'Full Inventory Count',
    description: 'Complete count of all inventory items',
    lastUsed: '2025-03-01',
    itemCount: 120,
    type: 'full'
  },
  {
    id: 2,
    name: 'PAR Level Check',
    description: 'Count of items below PAR level',
    lastUsed: '2025-03-07',
    itemCount: 15,
    type: 'par'
  },
  {
    id: 3,
    name: 'By Location: Fridge Items',
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
    name: 'By Category: Mise en Place',
    description: 'Prepped items ready for service',
    lastUsed: '2025-03-08',
    itemCount: 22,
    type: 'category'
  },
];

const locationData = [
  { id: 1, name: 'Main Kitchen', items: 18, lowStock: 3, expiring: 1 },
  { id: 2, name: 'Cold Storage', items: 12, lowStock: 0, expiring: 2 },
  { id: 3, name: 'Freezer', items: 10, lowStock: 1, expiring: 0 },
  { id: 4, name: 'Dry Storage', items: 25, lowStock: 1, expiring: 0 },
  { id: 5, name: 'Prep Area', items: 8, lowStock: 2, expiring: 0 },
];

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

const stocktakeMetrics = [
  {
    title: "Last Stocktake",
    value: "March 8, 2025",
    description: "93% accuracy rate",
    icon: Clipboard,
  },
  {
    title: "Variance Value",
    value: "$345.20",
    description: "2.75% of inventory value",
    icon: ArrowUpDown,
  },
  {
    title: "Low Stock Items",
    value: "6",
    description: "Items below PAR level",
    icon: AlertTriangle,
  },
  {
    title: "Expiring Soon",
    value: "3",
    description: "Items expiring in 7 days",
    icon: Clock,
  }
];

const ColoredProgress = ({ value, className }: { value: number, className?: string }) => {
  const getProgressColor = () => {
    if (value >= 90) return "bg-green-500";
    if (value >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Progress 
      value={value} 
      className={cn("h-2", className)} 
      style={{ 
        '--progress-background': getProgressColor() 
      } as React.CSSProperties}
    />
  );
};

const StocktakeModule: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('start-stocktake');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isCountingActive, setIsCountingActive] = useState(false);
  const [countView, setCountView] = useState<'all' | 'inProgress' | 'completed'>('all');
  const [updatedCounts, setUpdatedCounts] = useState<Record<number, number>>({});
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(item => selectedLocation === null || 
    locationData.find(loc => loc.id === selectedLocation)?.name === item.location
  );

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

  const getVarianceIcon = (variance: number) => {
    if (variance === 0) return "⚪";
    if (variance > 0) return "🟢";
    return "🔴";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isExpiringSoon = (dateString: string) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const handleStartStocktake = () => {
    if (!selectedTemplate) {
      toast.error("Please select a template first");
      return;
    }
    
    setIsCountingActive(true);
    setActiveTab('active-stocktake');
    
    toast.success(`Started stocktake using "${stocktakeTemplates.find(t => t.id === selectedTemplate)?.name}" template`);
  };

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
    // In a real app, this would fetch the items for this template
    toast.success(`Template "${stocktakeTemplates.find(t => t.id === templateId)?.name}" selected`);
  };

  const handleLocationSelect = (locationId: number) => {
    setSelectedLocation(prev => prev === locationId ? null : locationId);
  };

  const handleScanBarcode = () => {
    setIsScanning(true);
    
    toast("Barcode scanner activated. Scan an item barcode.", {
      description: "This is a demo feature. In a real application, this would activate your device's camera.",
      action: {
        label: "Cancel",
        onClick: () => {
          setIsScanning(false);
          console.log("Cancelled barcode scanning");
        },
      },
    });
    
    // Simulate finding an item by barcode after 2 seconds
    setTimeout(() => {
      const randomItemIndex = Math.floor(Math.random() * inventoryItems.length);
      const item = inventoryItems[randomItemIndex];
      
      setIsScanning(false);
      setSearchQuery(item.name);
      
      toast.success(`Found item: ${item.name}`, {
        description: `Current count: ${item.currentCount} ${item.unit}`,
      });
    }, 2000);
  };

  const handleCountUpdate = (itemId: number, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setUpdatedCounts(prev => ({
        ...prev,
        [itemId]: numValue
      }));
    }
  };

  const handleCompleteStocktake = () => {
    toast.success("Stocktake completed successfully!");
    setIsCountingActive(false);
    setActiveTab('variance-report');
  };

  const handleExportReport = () => {
    toast.success("Exporting stocktake report...");
    setTimeout(() => {
      toast.success("Report exported successfully");
    }, 1500);
  };
  
  const calculateTotalVariance = () => {
    return filteredItems.reduce((total, item) => {
      const updatedCount = updatedCounts[item.id] !== undefined ? updatedCounts[item.id] : item.currentCount;
      const variance = updatedCount - item.lastCount;
      const varianceValue = variance * item.costPerUnit;
      return total + varianceValue;
    }, 0);
  };

  const totalVarianceValue = calculateTotalVariance();

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stocktakeMetrics.map((metric, index) => (
          <Card key={index} className="h-full">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-kitchen-muted-foreground">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                  {metric.description && <p className="text-sm text-kitchen-muted-foreground mt-1">{metric.description}</p>}
                </div>
                <div className="rounded-full p-2 bg-kitchen-muted">
                  <metric.icon className="h-5 w-5 text-kitchen-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="start-stocktake">Start Stocktake</TabsTrigger>
          <TabsTrigger value="active-stocktake">Active Stocktake</TabsTrigger>
          <TabsTrigger value="variance-report">Variance Report</TabsTrigger>
          <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
        </TabsList>
        
        {/* Start Stocktake Tab */}
        <TabsContent value="start-stocktake" className="pt-4">
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
                  <Button variant="outline" className="w-full">
                    Create New Template
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Filter By Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {locationData.map(location => (
                    <div 
                      key={location.id}
                      className={cn(
                        "p-3 border rounded-md cursor-pointer transition-all",
                        selectedLocation === location.id 
                          ? "border-kitchen-primary bg-kitchen-primary/5" 
                          : "border-kitchen-border hover:border-kitchen-primary/50"
                      )}
                      onClick={() => handleLocationSelect(location.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{location.name}</h3>
                          <p className="text-sm text-kitchen-muted-foreground">{location.items} items</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {location.lowStock > 0 && (
                            <Badge className="bg-kitchen-danger/10 text-kitchen-danger">
                              {location.lowStock} Low
                            </Badge>
                          )}
                          {location.expiring > 0 && (
                            <Badge className="bg-kitchen-warning/10 text-kitchen-warning">
                              {location.expiring} Expiring
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            {/* Preview Panel (Right Panel) */}
            <div className="lg:col-span-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Template Preview</CardTitle>
                    <CardDescription>
                      {selectedTemplate 
                        ? `Preview items in "${stocktakeTemplates.find(t => t.id === selectedTemplate)?.name}" template` 
                        : "Select a template to preview items"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleScanBarcode}
                      className="flex items-center gap-1"
                    >
                      <Barcode className="h-4 w-4" />
                      <span>Scan</span>
                    </Button>
                    <Button
                      onClick={handleStartStocktake}
                      size="sm"
                      disabled={!selectedTemplate}
                      className="bg-kitchen-primary hover:bg-kitchen-primary/90"
                    >
                      Start Stocktake
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
                    <Input
                      placeholder="Search items..."
                      className="pl-9 bg-white border-kitchen-border"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader className="bg-kitchen-muted">
                        <TableRow>
                          <TableHead className="font-medium">Item Name</TableHead>
                          <TableHead className="font-medium">Category</TableHead>
                          <TableHead className="font-medium">Location</TableHead>
                          <TableHead className="font-medium text-right">Last Count</TableHead>
                          <TableHead className="font-medium text-right">PAR Level</TableHead>
                          <TableHead className="font-medium">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.map((item) => (
                          <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell className="text-right">{item.lastCount} {item.unit}</TableCell>
                            <TableCell className="text-right">{item.parLevel} {item.unit}</TableCell>
                            <TableCell>
                              <span className={cn(
                                "pill-badge inline-flex items-center",
                                getStatusClass(item.status)
                              )}>
                                {getStatusIcon(item.status)}
                                {item.status === 'low' ? (
                                  <span className="ml-1">Low Stock</span>
                                ) : item.status === 'expiring' ? (
                                  <span className="ml-1">Expiring Soon</span>
                                ) : (
                                  <span className="ml-1">Good</span>
                                )}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Active Stocktake Tab */}
        <TabsContent value="active-stocktake" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  {isCountingActive ? "Active Stocktake in Progress" : "No Active Stocktake"}
                </CardTitle>
                {isCountingActive && (
                  <CardDescription>
                    Template: {stocktakeTemplates.find(t => t.id === selectedTemplate)?.name} 
                    | Started: {new Date().toLocaleTimeString()}
                  </CardDescription>
                )}
              </div>
              <div className="flex items-center gap-2">
                {isCountingActive && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleScanBarcode}
                      className={cn(
                        "flex items-center gap-1",
                        isScanning && "bg-kitchen-primary/10"
                      )}
                    >
                      <Barcode className="h-4 w-4" />
                      <span>{isScanning ? "Scanning..." : "Scan Items"}</span>
                    </Button>
                    <Button
                      onClick={handleCompleteStocktake}
                      size="sm"
                      className="bg-kitchen-primary hover:bg-kitchen-primary/90"
                    >
                      Complete Stocktake
                    </Button>
                  </>
                )}
                {!isCountingActive && (
                  <Button
                    onClick={() => setActiveTab('start-stocktake')}
                    size="sm"
                    className="bg-kitchen-primary hover:bg-kitchen-primary/90"
                  >
                    Start New Stocktake
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isCountingActive ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-kitchen-muted-foreground">Items Counted</span>
                        <span className="text-lg font-medium">{filteredItems.length} items</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-kitchen-muted-foreground">Current Variance</span>
                        <span className={cn(
                          "text-lg font-medium",
                          totalVarianceValue < 0 ? "text-kitchen-danger" : "text-kitchen-success"
                        )}>
                          ${Math.abs(totalVarianceValue).toFixed(2)}
                          {totalVarianceValue < 0 ? " deficit" : totalVarianceValue > 0 ? " surplus" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="relative w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
                      <Input
                        placeholder="Search items..."
                        className="pl-9 bg-white border-kitchen-border"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader className="bg-kitchen-muted">
                        <TableRow>
                          <TableHead className="font-medium">Item Name</TableHead>
                          <TableHead className="font-medium">Category</TableHead>
                          <TableHead className="font-medium">Location</TableHead>
                          <TableHead className="font-medium text-right">PAR Level</TableHead>
                          <TableHead className="font-medium text-right">Last Count</TableHead>
                          <TableHead className="font-medium text-right">Current Count</TableHead>
                          <TableHead className="font-medium text-right">Variance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.map((item) => {
                          const currentCount = updatedCounts[item.id] !== undefined 
                            ? updatedCounts[item.id] 
                            : item.currentCount;
                          const variance = currentCount - item.lastCount;
                          
                          return (
                            <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>{item.location}</TableCell>
                              <TableCell className="text-right">{item.parLevel} {item.unit}</TableCell>
                              <TableCell className="text-right">{item.lastCount} {item.unit}</TableCell>
                              <TableCell className="text-right">
                                <Input
                                  type="number"
                                  className="w-20 text-right inline-block"
                                  value={currentCount}
                                  onChange={(e) => handleCountUpdate(item.id, e.target.value)}
                                />
                                <span className="ml-1">{item.unit}</span>
                              </TableCell>
                              <TableCell className={cn(
                                "text-right font-medium",
                                variance < 0 ? "text-kitchen-danger" : 
                                variance > 0 ? "text-kitchen-success" : ""
                              )}>
                                <span className="mr-1">{getVarianceIcon(variance)}</span>
                                {variance > 0 ? "+" : ""}{variance} {item.unit}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 rounded-full bg-kitchen-muted flex items-center justify-center mb-4">
                    <ListCheck className="h-12 w-12 text-kitchen-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Active Stocktake</h3>
                  <p className="text-kitchen-muted-foreground mb-6">
                    Start a new stocktake to count and verify your inventory.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('start-stocktake')}
                    className="bg-kitchen-primary hover:bg-kitchen-primary/90"
                  >
                    Start New Stocktake
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Variance Report Tab */}
        <TabsContent value="variance-report" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Variance Report</CardTitle>
                <CardDescription>
                  Analysis of inventory discrepancies from the latest stocktake
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportReport}
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Report</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-kitchen-muted-foreground">Total Variance</p>
                        <h3 className={cn(
                          "text-2xl font-bold mt-1",
                          totalVarianceValue < 0 ? "text-kitchen-danger" : "text-kitchen-success"
                        )}>
                          ${Math.abs(totalVarianceValue).toFixed(2)}
                          {totalVarianceValue < 0 ? " deficit" : totalVarianceValue > 0 ? " surplus" : ""}
                        </h3>
                        <p className="text-sm text-kitchen-muted-foreground mt-1">
                          {Math.abs(totalVarianceValue / 12500 * 100).toFixed(2)}% of inventory value
                        </p>
                      </div>
                      <div className={cn(
                        "rounded-full p-2",
                        totalVarianceValue < 0 ? "bg-kitchen-danger/10" : "bg-kitchen-success/10"
                      )}>
                        <ArrowUpDown className={cn(
                          "h-5 w-5",
                          totalVarianceValue < 0 ? "text-kitchen-danger" : "text-kitchen-success"
                        )} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-kitchen-muted-foreground">High-Variance Items</p>
                        <h3 className="text-2xl font-bold mt-1">3 items</h3>
                        <p className="text-sm text-kitchen-muted-foreground mt-1">
                          Items with &gt;10% variance
                        </p>
                      </div>
                      <div className="rounded-full p-2 bg-kitchen-warning/10">
                        <AlertTriangle className="h-5 w-5 text-kitchen-warning" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-kitchen-muted-foreground">Most Affected Category</p>
                        <h3 className="text-2xl font-bold mt-1">Vegetables</h3>
                        <p className="text-sm text-kitchen-muted-foreground mt-1">
                          $29.50 total variance
                        </p>
                      </div>
                      <div className="rounded-full p-2 bg-kitchen-muted">
                        <BarChart className="h-5 w-5 text-kitchen-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-kitchen-muted">
                    <TableRow>
                      <TableHead className="font-medium">Item Name</TableHead>
                      <TableHead className="font-medium">Category</TableHead>
                      <TableHead className="font-medium">Location</TableHead>
                      <TableHead className="font-medium text-right">Last Count</TableHead>
                      <TableHead className="font-medium text-right">Current Count</TableHead>
                      <TableHead className="font-medium text-right">Unit Cost</TableHead>
                      <TableHead className="font-medium text-right">Variance (Units)</TableHead>
                      <TableHead className="font-medium text-right">Variance (Value)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems
                      .sort((a, b) => {
                        const aCurrentCount = updatedCounts[a.id] !== undefined ? updatedCounts[a.id] : a.currentCount;
                        const bCurrentCount = updatedCounts[b.id] !== undefined ? updatedCounts[b.id] : b.currentCount;
                        
                        const aVariance = Math.abs(aCurrentCount - a.lastCount);
                        const bVariance = Math.abs(bCurrentCount - b.lastCount);
                        
                        return bVariance - aVariance;
                      })
                      .map((item) => {
                        const currentCount = updatedCounts[item.id] !== undefined 
                          ? updatedCounts[item.id] 
                          : item.currentCount;
                        const variance = currentCount - item.lastCount;
                        const varianceValue = variance * item.costPerUnit;
                        
                        return (
                          <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell className="text-right">{item.lastCount} {item.unit}</TableCell>
                            <TableCell className="text-right">{currentCount} {item.unit}</TableCell>
                            <TableCell className="text-right">${item.costPerUnit.toFixed(2)}</TableCell>
                            <TableCell className={cn(
                              "text-right font-medium",
                              variance < 0 ? "text-kitchen-danger" : 
                              variance > 0 ? "text-kitchen-success" : ""
                            )}>
                              <span className="mr-1">{getVarianceIcon(variance)}</span>
                              {variance > 0 ? "+" : ""}{variance} {item.unit}
                            </TableCell>
                            <TableCell className={cn(
                              "text-right font-medium",
                              varianceValue < 0 ? "text-kitchen-danger" : 
                              varianceValue > 0 ? "text-kitchen-success" : ""
                            )}>
                              {varianceValue > 0 ? "+" : ""}${varianceValue.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 bg-kitchen-muted/30 p-4 rounded-md">
                <h3 className="font-medium mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-kitchen-warning mt-0.5" />
                    <div>
                      <p className="font-medium">High variance for Tomatoes (-5kg)</p>
                      <p className="text-sm text-kitchen-muted-foreground">
                        Check for spoilage in Main Kitchen storage and update waste tracking.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-kitchen-danger mt-0.5" />
                    <div>
                      <p className="font-medium">Low stock for Fish Fillets (5kg vs PAR 10kg)</p>
                      <p className="text-sm text-kitchen-muted-foreground">
                        Generate purchase order for Fish Fillets to meet upcoming production needs.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Current Inventory Tab */}
        <TabsContent value="inventory" className="pt-4">
          <Card className="shadow-apple-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-kitchen-muted">
                <TableRow>
                  <TableHead className="font-medium">Item Name</TableHead>
                  <TableHead className="font-medium">Category</TableHead>
                  <TableHead className="font-medium">Location</TableHead>
                  <TableHead className="font-medium text-right">Current Stock</TableHead>
                  <TableHead className="font-medium text-right">PAR Level</TableHead>
                  <TableHead className="font-medium">Batch #</TableHead>
                  <TableHead className="font-medium">Expiry Date</TableHead>
                  <TableHead className="font-medium text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="text-right">{item.currentCount} {item.unit}</TableCell>
                    <TableCell className="text-right">{item.parLevel} {item.unit}</TableCell>
                    <TableCell>{item.batchNumber}</TableCell>
                    <TableCell>
                      <span className={cn(
                        isExpiringSoon(item.expiryDate) ? "text-kitchen-warning font-medium" : ""
                      )}>
                        {formatDate(item.expiryDate)}
                        {isExpiringSoon(item.expiryDate) && " (Soon)"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={cn(
                        "pill-badge inline-flex items-center",
                        getStatusClass(item.status)
                      )}>
                        {getStatusIcon(item.status)}
                        {item.status === 'low' ? (
                          <span className="ml-1">Low Stock</span>
                        ) : item.status === 'expiring' ? (
                          <span className="ml-1">Expiring Soon</span>
                        ) : (
                          <span className="ml-1">Good</span>
                        )}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StocktakeModule;
