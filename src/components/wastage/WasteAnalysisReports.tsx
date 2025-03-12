
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart,
  Area
} from 'recharts';
import { wasteItems, wasteCategories, wasteTrends, calculateWasteMetrics } from '@/data/wastageData';
import { CalendarIcon, Download, FilterX, Filter, Printer, BarChart as BarChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const WasteAnalysisReports: React.FC = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)), // Default to last 7 days
    to: new Date()
  });
  const [category, setCategory] = useState<string>('all');
  const [location, setLocation] = useState<string>('all');
  const [reportType, setReportType] = useState<string>('summary');
  
  const metrics = calculateWasteMetrics();
  
  // Colors for charts
  const COLORS = ['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#9C27B0', '#FF9800'];
  
  // Filtered waste items based on selected filters
  const filteredWasteItems = wasteItems.filter(item => {
    const itemDate = new Date(item.date);
    const dateFilter = 
      (!date?.from || itemDate >= date.from) && 
      (!date?.to || itemDate <= date.to);
      
    const categoryFilter = category === 'all' || item.category === category;
    const locationFilter = location === 'all' || item.location === location;
    
    return dateFilter && categoryFilter && locationFilter;
  });
  
  // Calculate totals for filtered items
  const filteredTotalWeight = filteredWasteItems.reduce((sum, item) => sum + item.quantity, 0);
  const filteredTotalValue = filteredWasteItems.reduce((sum, item) => sum + item.cost, 0);
  
  // Group waste by reason for filtered items
  const wasteByReason = Object.entries(
    filteredWasteItems.reduce((acc, item) => {
      acc[item.reason] = (acc[item.reason] || 0) + item.cost;
      return acc;
    }, {} as Record<string, number>)
  ).map(([reason, value]) => ({ reason, value }));
  
  // Group waste by category for filtered items
  const wasteByCategory = Object.entries(
    filteredWasteItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.cost;
      return acc;
    }, {} as Record<string, number>)
  ).map(([category, value]) => ({ category, value }));
  
  // Format date range for display
  const formatDateRange = () => {
    if (!date?.from) return 'All dates';
    if (!date.to) return `From ${format(date.from, 'PPP')}`;
    return `${format(date.from, 'PPP')} - ${format(date.to, 'PPP')}`;
  };
  
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Filter Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
              {/* Date Range */}
              <div className="space-y-2">
                <Label htmlFor="date">Date Range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDateRange()}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Produce">Produce</SelectItem>
                    <SelectItem value="Meat">Meat</SelectItem>
                    <SelectItem value="Seafood">Seafood</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                    <SelectItem value="Bakery">Bakery</SelectItem>
                    <SelectItem value="Poultry">Poultry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Main Kitchen">Main Kitchen</SelectItem>
                    <SelectItem value="Cold Storage">Cold Storage</SelectItem>
                    <SelectItem value="Dry Storage">Dry Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto justify-end">
              <Button variant="outline" size="sm" onClick={() => {
                setCategory('all');
                setLocation('all');
                setDate(undefined);
              }}>
                <FilterX className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm font-medium text-kitchen-muted-foreground">Total Waste Value</p>
              <h3 className="text-2xl font-bold mt-1">${filteredTotalValue.toFixed(2)}</h3>
              <p className="text-sm text-kitchen-muted-foreground mt-1">{formatDateRange()}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm font-medium text-kitchen-muted-foreground">Total Waste Weight</p>
              <h3 className="text-2xl font-bold mt-1">{filteredTotalWeight.toFixed(1)} kg</h3>
              <p className="text-sm text-kitchen-muted-foreground mt-1">{formatDateRange()}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm font-medium text-kitchen-muted-foreground">Average Daily Waste</p>
              <h3 className="text-2xl font-bold mt-1">${(filteredTotalValue / (filteredWasteItems.length || 1)).toFixed(2)}</h3>
              <p className="text-sm text-kitchen-muted-foreground mt-1">Per day</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm font-medium text-kitchen-muted-foreground">Items Wasted</p>
              <h3 className="text-2xl font-bold mt-1">{filteredWasteItems.length}</h3>
              <p className="text-sm text-kitchen-muted-foreground mt-1">Total entries</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Chart Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Waste Analysis</CardTitle>
          <CardDescription>Visual analysis of waste data for the selected time period</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="byReason">
            <TabsList className="mb-4">
              <TabsTrigger value="byReason">
                <PieChartIcon className="h-4 w-4 mr-2" />
                By Reason
              </TabsTrigger>
              <TabsTrigger value="byCategory">
                <BarChartIcon className="h-4 w-4 mr-2" />
                By Category
              </TabsTrigger>
              <TabsTrigger value="byDate">
                <BarChartIcon className="h-4 w-4 mr-2" />
                By Date
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="byReason" className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteByReason}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="reason"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {wasteByReason.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="byCategory" className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={wasteByCategory}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                  <Bar dataKey="value" name="Waste Value ($)" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="byDate" className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={wasteTrends}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip formatter={(value, name) => [
                    name === 'value' ? `$${value.toFixed(2)}` : `${value.toFixed(1)} kg`,
                    name === 'value' ? 'Waste Value' : 'Waste Weight'
                  ]} />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="value" name="Value ($)" fill="#8884d8" stroke="#8884d8" />
                  <Bar yAxisId="right" dataKey="weight" name="Weight (kg)" barSize={20} fill="#413ea0" />
                </ComposedChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Detailed Waste Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Waste Log</CardTitle>
          <CardDescription>Complete list of waste entries for the selected filters</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead>Reported By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWasteItems.length > 0 ? (
                filteredWasteItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {format(new Date(item.date), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="font-medium">{item.itemName}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.reason === 'Spoilage' ? 'bg-kitchen-danger/10 text-kitchen-danger' :
                        item.reason === 'Overproduction' ? 'bg-kitchen-warning/10 text-kitchen-warning' :
                        item.reason === 'Trim Waste' ? 'bg-kitchen-muted text-kitchen-muted-foreground' :
                        'bg-kitchen-primary/10 text-kitchen-primary'
                      }`}>
                        {item.reason}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{item.quantity} {item.unit}</TableCell>
                    <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
                    <TableCell>{item.reportedBy}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-kitchen-muted-foreground">
                    No waste data found for the selected filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WasteAnalysisReports;
