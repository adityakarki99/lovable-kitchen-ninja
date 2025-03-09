
import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, TrendingDown, TrendingUp, PackageCheck, Clipboard, BarChart, Check, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Enhanced mock data with more inventory information
const inventoryItems = [
  { 
    id: 1, 
    name: 'Tomatoes', 
    category: 'Vegetables', 
    unit: 'kg', 
    currentStock: 5, 
    minStock: 10, 
    price: 2.50, 
    location: 'Main Kitchen',
    expiryDate: '2023-08-05',
    batchNumber: 'BT-1001',
    supplier: 'Fresh Produce Co.',
    lastUpdated: '2023-07-25',
    status: 'low' 
  },
  { 
    id: 2, 
    name: 'Chicken Breast', 
    category: 'Meat', 
    unit: 'kg', 
    currentStock: 15, 
    minStock: 8, 
    price: 8.75, 
    location: 'Cold Storage',
    expiryDate: '2023-08-10',
    batchNumber: 'BT-1002',
    supplier: 'Premium Meats',
    lastUpdated: '2023-07-26',
    status: 'good' 
  },
  { 
    id: 3, 
    name: 'Flour', 
    category: 'Dry Goods', 
    unit: 'kg', 
    currentStock: 25, 
    minStock: 5, 
    price: 1.20, 
    location: 'Dry Storage',
    expiryDate: '2023-12-20',
    batchNumber: 'BT-1003',
    supplier: 'Bakery Supplies Inc.',
    lastUpdated: '2023-07-20',
    status: 'good' 
  },
  { 
    id: 4, 
    name: 'Olive Oil', 
    category: 'Oils', 
    unit: 'liter', 
    currentStock: 4, 
    minStock: 3, 
    price: 9.30, 
    location: 'Dry Storage',
    expiryDate: '2023-10-15',
    batchNumber: 'BT-1004',
    supplier: 'Global Imports',
    lastUpdated: '2023-07-22',
    status: 'good' 
  },
  { 
    id: 5, 
    name: 'Onions', 
    category: 'Vegetables', 
    unit: 'kg', 
    currentStock: 2, 
    minStock: 5, 
    price: 1.80, 
    location: 'Main Kitchen',
    expiryDate: '2023-08-20',
    batchNumber: 'BT-1005',
    supplier: 'Fresh Produce Co.',
    lastUpdated: '2023-07-24',
    status: 'low' 
  },
  { 
    id: 6, 
    name: 'Garlic', 
    category: 'Vegetables', 
    unit: 'kg', 
    currentStock: 0.5, 
    minStock: 1, 
    price: 3.25, 
    location: 'Main Kitchen',
    expiryDate: '2023-08-12',
    batchNumber: 'BT-1006',
    supplier: 'Fresh Produce Co.',
    lastUpdated: '2023-07-25',
    status: 'low' 
  },
  { 
    id: 7, 
    name: 'Salmon Fillet', 
    category: 'Seafood', 
    unit: 'kg', 
    currentStock: 6, 
    minStock: 4, 
    price: 15.50, 
    location: 'Cold Storage',
    expiryDate: '2023-07-30',
    batchNumber: 'BT-1007',
    supplier: 'Seafood Direct',
    lastUpdated: '2023-07-26',
    status: 'expiring' 
  },
  { 
    id: 8, 
    name: 'Heavy Cream', 
    category: 'Dairy', 
    unit: 'liter', 
    currentStock: 5, 
    minStock: 2, 
    price: 4.25, 
    location: 'Cold Storage',
    expiryDate: '2023-08-02',
    batchNumber: 'BT-1008',
    supplier: 'Dairy Delights',
    lastUpdated: '2023-07-25',
    status: 'expiring' 
  },
];

// Mock waste tracking data
const wasteData = [
  { 
    id: 1, 
    date: '2023-07-25', 
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
    date: '2023-07-24', 
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
    date: '2023-07-23', 
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
    date: '2023-07-22', 
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

// Inventory metrics
const inventoryMetrics = [
  {
    title: "Stock Value",
    value: "$12,564.32",
    description: "Total inventory value",
    icon: PackageCheck,
    trend: "up"
  },
  {
    title: "Low Stock Items",
    value: "6",
    description: "Items below PAR level",
    icon: AlertTriangle,
    trend: "down"
  },
  {
    title: "Expiring Soon",
    value: "3",
    description: "Items expiring in 7 days",
    icon: Clock,
    trend: "neutral"
  },
  {
    title: "Waste This Month",
    value: "$345.20",
    description: "2.75% of inventory value",
    icon: BarChart,
    trend: "down"
  }
];

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend,
  className
}) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-kitchen-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && <p className="text-sm text-kitchen-muted-foreground mt-1">{description}</p>}
          </div>
          <div className={cn(
            "rounded-full p-2",
            trend === 'up' ? "bg-kitchen-success/10" : 
            trend === 'down' ? "bg-kitchen-danger/10" : 
            "bg-kitchen-muted"
          )}>
            <Icon className={cn(
              "h-5 w-5",
              trend === 'up' ? "text-kitchen-success" : 
              trend === 'down' ? "text-kitchen-danger" : 
              "text-kitchen-muted-foreground"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InventoryTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('stock');
  
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
        return <Check className="h-4 w-4" />;
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
        {inventoryMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            icon={metric.icon}
            trend={metric.trend as 'up' | 'down' | 'neutral'}
          />
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
          <Button size="sm" className="bg-kitchen-primary hover:bg-kitchen-primary/90">
            Update Stock
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="stock">Current Stock</TabsTrigger>
          <TabsTrigger value="waste">Waste Tracking</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>
        
        {/* Current Stock Tab */}
        <TabsContent value="stock" className="pt-4">
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
                  <TableHead className="font-medium text-right">Price / Unit</TableHead>
                  <TableHead className="font-medium text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="text-right">{item.currentStock} {item.unit}</TableCell>
                    <TableCell className="text-right">{item.minStock} {item.unit}</TableCell>
                    <TableCell>{item.batchNumber}</TableCell>
                    <TableCell>
                      <span className={cn(
                        isExpiringSoon(item.expiryDate) ? "text-kitchen-warning font-medium" : ""
                      )}>
                        {formatDate(item.expiryDate)}
                        {isExpiringSoon(item.expiryDate) && " (Soon)"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
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
                      <span className={cn(
                        "pill-badge",
                        waste.reason === 'Spoilage' 
                          ? "bg-kitchen-danger/10 text-kitchen-danger" 
                          : waste.reason === 'Overproduction'
                          ? "bg-kitchen-warning/10 text-kitchen-warning"
                          : "bg-kitchen-muted text-kitchen-muted-foreground"
                      )}>
                        {waste.reason}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">${waste.cost.toFixed(2)}</TableCell>
                    <TableCell>{waste.reportedBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                      <Progress value={(location.items / 30) * 100} className="h-2" />
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
      </Tabs>
    </div>
  );
};

export default InventoryTable;
