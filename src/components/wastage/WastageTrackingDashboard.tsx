
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { wasteItems, wasteTrends, calculateWasteMetrics } from '@/data/wastageData';
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
  ResponsiveContainer 
} from 'recharts';
import { Trash2, BarChart3, Leaf, TrendingDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const WastageTrackingDashboard: React.FC = () => {
  const metrics = calculateWasteMetrics();
  
  // Format the date for recent waste items
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  
  // Colors for pie chart
  const COLORS = ['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#9C27B0', '#FF9800'];
  
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Total Waste Value</p>
                <h3 className="text-2xl font-bold mt-1">${metrics.totalValue.toFixed(2)}</h3>
                <p className="text-sm text-kitchen-muted-foreground mt-1">Last 7 days</p>
              </div>
              <div className="rounded-full p-2 bg-kitchen-danger/10">
                <Trash2 className="h-5 w-5 text-kitchen-danger" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Total Waste Weight</p>
                <h3 className="text-2xl font-bold mt-1">{metrics.totalWeight.toFixed(1)} kg</h3>
                <p className="text-sm text-kitchen-muted-foreground mt-1">Last 7 days</p>
              </div>
              <div className="rounded-full p-2 bg-kitchen-warning/10">
                <BarChart3 className="h-5 w-5 text-kitchen-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">CO₂ Equivalent</p>
                <h3 className="text-2xl font-bold mt-1">{metrics.co2Equivalent.toFixed(1)} kg</h3>
                <p className="text-sm text-kitchen-muted-foreground mt-1">Environmental impact</p>
              </div>
              <div className="rounded-full p-2 bg-kitchen-success/10">
                <Leaf className="h-5 w-5 text-kitchen-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Waste Reduction</p>
                <h3 className="text-2xl font-bold mt-1">8.2%</h3>
                <p className="text-sm text-kitchen-muted-foreground mt-1">vs. previous period</p>
              </div>
              <div className="rounded-full p-2 bg-kitchen-success/10">
                <TrendingDown className="h-5 w-5 text-kitchen-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Waste Trends Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Waste Trends (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={wasteTrends}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="value" 
                    name="Value ($)" 
                    stroke="#4CAF50" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="weight" 
                    name="Weight (kg)" 
                    stroke="#2196F3" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Waste by Cause Pie Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Waste by Cause</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.wasteCauses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="cause"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {metrics.wasteCauses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom Section: Top Wasted Items and Recent Waste */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Wasted Items */}
        <Card>
          <CardHeader>
            <CardTitle>Top Wasted Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={metrics.topWastedItems}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                  <Bar dataKey="value" name="Waste Value ($)" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Waste Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Waste Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wasteItems.slice(0, 5).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.itemName}</TableCell>
                    <TableCell>{item.quantity} {item.unit}</TableCell>
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
                    <TableCell>{formatDate(item.date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WastageTrackingDashboard;
