import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Barcode, Clipboard, AlertTriangle, Clock, BarChart, PackageCheck, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock inventory data for stocktake
const inventoryItems = [
  { 
    id: 1, 
    name: 'Tomatoes', 
    category: 'Vegetables', 
    unit: 'kg', 
    theoreticalStock: 10, 
    actualStock: 5, 
    parLevel: 10, 
    location: 'Main Kitchen',
    expiryDate: '2025-03-15',
    batchNumber: 'BT-1001',
    supplier: 'Fresh Produce Co.',
    lastStocktake: '2025-03-08',
    status: 'low',
    variance: -5
  },
  { 
    id: 2, 
    name: 'Chicken Breast', 
    category: 'Meat', 
    unit: 'kg', 
    theoreticalStock: 15, 
    actualStock: 15, 
    parLevel: 8, 
    location: 'Cold Storage',
    expiryDate: '2025-03-10',
    batchNumber: 'BT-1002',
    supplier: 'Premium Meats',
    lastStocktake: '2025-03-08',
    status: 'good',
    variance: 0
  },
  { 
    id: 3, 
    name: 'Flour', 
    category: 'Dry Goods', 
    unit: 'kg', 
    theoreticalStock: 25, 
    actualStock: 27, 
    parLevel: 5, 
    location: 'Dry Storage',
    expiryDate: '2025-12-20',
    batchNumber: 'BT-1003',
    supplier: 'Bakery Supplies Inc.',
    lastStocktake: '2025-03-07',
    status: 'good',
    variance: 2
  },
  { 
    id: 4, 
    name: 'Olive Oil', 
    category: 'Oils', 
    unit: 'liter', 
    theoreticalStock: 4, 
    actualStock: 4, 
    parLevel: 3, 
    location: 'Dry Storage',
    expiryDate: '2025-10-15',
    batchNumber: 'BT-1004',
    supplier: 'Global Imports',
    lastStocktake: '2025-03-06',
    status: 'good',
    variance: 0
  },
  { 
    id: 5, 
    name: 'Onions', 
    category: 'Vegetables', 
    unit: 'kg', 
    theoreticalStock: 10, 
    actualStock: 2, 
    parLevel: 5, 
    location: 'Main Kitchen',
    expiryDate: '2025-03-20',
    batchNumber: 'BT-1005',
    supplier: 'Fresh Produce Co.',
    lastStocktake: '2025-03-08',
    status: 'low',
    variance: -8
  },
  { 
    id: 6, 
    name: 'Garlic', 
    category: 'Vegetables', 
    unit: 'kg', 
    theoreticalStock: 1.5, 
    actualStock: 0.5, 
    parLevel: 1, 
    location: 'Main Kitchen',
    expiryDate: '2025-03-12',
    batchNumber: 'BT-1006',
    supplier: 'Fresh Produce Co.',
    lastStocktake: '2025-03-08',
    status: 'low',
    variance: -1
  },
  { 
    id: 7, 
    name: 'Salmon Fillet', 
    category: 'Seafood', 
    unit: 'kg', 
    theoreticalStock: 6, 
    actualStock: 6, 
    parLevel: 4, 
    location: 'Cold Storage',
    expiryDate: '2025-03-09',
    batchNumber: 'BT-1007',
    supplier: 'Seafood Direct',
    lastStocktake: '2025-03-08',
    status: 'expiring',
    variance: 0
  },
  { 
    id: 8, 
    name: 'Heavy Cream', 
    category: 'Dairy', 
    unit: 'liter', 
    theoreticalStock: 5, 
    actualStock: 5, 
    parLevel: 2, 
    location: 'Cold Storage',
    expiryDate: '2025-03-10',
    batchNumber: 'BT-1008',
    supplier: 'Dairy Delights',
    lastStocktake: '2025-03-08',
    status: 'expiring',
    variance: 0
  },
];

// Mock waste tracking data
const wasteData = [
  { 
    id: 1, 
    date: '2025-03-08', 
    itemName: 'Lettuce', 
    category: 'Vegetables', 
    quantity: 2, 
    unit: 'kg', 
    reason: 'Spoilage', 
    cost: 8.00, 
    reportedBy: 'John Smith' 
  },
  { 
    id: 2, 
    date: '2025-03-07', 
    itemName: 'Tomatoes', 
    category: 'Vegetables', 
    quantity: 1.5, 
    unit: 'kg', 
    reason: 'Overproduction', 
    cost: 3.75, 
    reportedBy: 'Emma Johnson' 
  },
  { 
    id: 3, 
    date: '2025-03-06', 
    itemName: 'Chicken Breast', 
    category: 'Meat', 
    quantity: 0.8, 
    unit: 'kg', 
    reason: 'Quality Issue', 
    cost: 7.00, 
    reportedBy: 'Michael Brown' 
  },
  { 
    id: 4, 
    date: '2025-03-05', 
    itemName: 'Milk', 
    category: 'Dairy', 
    quantity: 2, 
    unit: 'liter', 
    reason: 'Expired', 
    cost: 5.50, 
    reportedBy: 'Sarah Davis' 
  },
];

// Mock location data
const locationData = [
  { id: 1, name: 'Main Kitchen', items: 18, lowStock: 3, expiring: 1 },
  { id: 2, name: 'Cold Storage', items: 12, lowStock: 0, expiring: 2 },
  { id: 3, name: 'Dry Storage', items: 25, lowStock: 1, expiring: 0 },
  { id: 4, name: 'Bar', items: 15, lowStock: 2, expiring: 1 },
];

// Stocktake metrics
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

// Customized Progress component that changes color based on value
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
      indicatorClassName={getProgressColor()}
    />
  );
};

const StocktakeModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('inventory');
  
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
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

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search inventory..."
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
          <Button variant="outline" size="sm" className="text-kitchen-foreground">
            <Barcode className="mr-2 h-4 w-4" />
            Scan Barcode
          </Button>
          <Button size="sm" className="bg-kitchen-primary hover:bg-kitchen-primary/90">
            Start Stocktake
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
          <TabsTrigger value="waste">Waste Tracking</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="variance">Variance Report</TabsTrigger>
        </TabsList>
        
        {/* Current Inventory Tab */}
        <TabsContent value="inventory" className="pt-4">
          <Card className="shadow-apple-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-kitchen-muted">
                <TableRow>
                  <TableHead className="font-medium">Item Name</TableHead>
                  <TableHead className="font-medium">Category</TableHead>
                  <TableHead className="font-medium">Location</TableHead>
                  <TableHead className="font-medium text-right">Actual Stock</TableHead>
                  <TableHead className="font-medium text-right">PAR Level</TableHead>
                  <TableHead className="font-medium">Expiry Date</TableHead>
                  <TableHead className="font-medium">Last Stocktake</TableHead>
                  <TableHead className="font-medium text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="text-right">{item.actualStock} {item.unit}</TableCell>
                    <TableCell className="text-right">{item.parLevel} {item.unit}</TableCell>
                    <TableCell>
                      <span className={cn(
                        isExpiringSoon(item.expiryDate) ? "text-kitchen-warning font-medium" : ""
                      )}>
                        {formatDate(item.expiryDate)}
                        {isExpiringSoon(item.expiryDate) && " (Soon)"}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(item.lastStocktake)}</TableCell>
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
        
        {/* Waste Tracking Tab */}
        <TabsContent value="waste" className="pt-4">
          <Card className="shadow-apple-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Waste Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-kitchen-muted">
                  <TableRow>
                    <TableHead className="font-medium">Date</TableHead>
                    <TableHead className="font-medium">Item</TableHead>
                    <TableHead className="font-medium">Category</TableHead>
                    <TableHead className="font-medium text-right">Quantity</TableHead>
                    <TableHead className="font-medium">Reason</TableHead>
                    <TableHead className="font-medium text-right">Cost</TableHead>
                    <TableHead className="font-medium">Reported By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wasteData.map((waste) => (
                    <TableRow key={waste.id} className="hover:bg-kitchen-muted/30">
                      <TableCell>{formatDate(waste.date)}</TableCell>
                      <TableCell className="font-medium">{waste.itemName}</TableCell>
                      <TableCell>{waste.category}</TableCell>
                      <TableCell className="text-right">{waste.quantity} {waste.unit}</TableCell>
                      <TableCell>
                        <Badge className={cn(
                          waste.reason === 'Spoilage' 
                            ? "bg-kitchen-danger/10 text-kitchen-danger border-kitchen-danger/20" 
                            : waste.reason === 'Overproduction'
                            ? "bg-kitchen-warning/10 text-kitchen-warning border-kitchen-warning/20"
                            : "bg-kitchen-muted text-kitchen-muted-foreground"
                        )}>
                          {waste.reason}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">${waste.cost.toFixed(2)}</TableCell>
                      <TableCell>{waste.reportedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button size="sm">Log Waste</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Locations Tab */}
        <TabsContent value="locations" className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {locationData.map(location => (
              <Card key={location.id} className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{location.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Total Items</span>
                        <span className="font-medium">{location.items}</span>
                      </div>
                      <ColoredProgress value={(location.items / 30) * 100} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-kitchen-danger">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">{location.lowStock} Low Stock</span>
                      </div>
                      <div className="flex items-center gap-1 text-kitchen-warning">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{location.expiring} Expiring</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Variance Report Tab */}
        <TabsContent value="variance" className="pt-4">
          <Card className="shadow-apple-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Inventory Variance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-kitchen-muted">
                  <TableRow>
                    <TableHead className="font-medium">Item Name</TableHead>
                    <TableHead className="font-medium">Category</TableHead>
                    <TableHead className="font-medium text-right">Theoretical</TableHead>
                    <TableHead className="font-medium text-right">Actual</TableHead>
                    <TableHead className="font-medium text-right">Variance</TableHead>
                    <TableHead className="font-medium">Location</TableHead>
                    <TableHead className="font-medium">Last Stocktake</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems
                    .filter(item => item.variance !== 0)
                    .sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance))
                    .map((item) => (
                    <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">{item.theoreticalStock} {item.unit}</TableCell>
                      <TableCell className="text-right">{item.actualStock} {item.unit}</TableCell>
                      <TableCell className={cn("text-right font-medium", getVarianceClass(item.variance))}>
                        {item.variance > 0 ? "+" : ""}{item.variance} {item.unit}
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{formatDate(item.lastStocktake)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 bg-kitchen-muted/30 p-4 rounded-md">
                <h3 className="font-medium mb-2">Variance Analysis</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-kitchen-muted-foreground mb-1">Variance Value</p>
                    <p className="text-lg font-medium text-kitchen-danger">-$345.20</p>
                  </div>
                  <div>
                    <p className="text-sm text-kitchen-muted-foreground mb-1">Most Affected Category</p>
                    <p className="text-lg font-medium">Vegetables</p>
                  </div>
                  <div>
                    <p className="text-sm text-kitchen-muted-foreground mb-1">Accuracy Rate</p>
                    <p className="text-lg font-medium">93%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StocktakeModule;
