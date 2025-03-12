
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, AreaChart, PieChart, XAxis, YAxis, Bar, Area, Pie, Cell, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { TrendingDown, TrendingUp, DollarSign, Scale, ClipboardList, CircleAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { wasteTotals, wasteByCategory, wasteByItem, wasteByDate } from '@/data/wastageData';

const WastageTrackingDashboard: React.FC = () => {
  const [period, setPeriod] = useState('week');
  
  // Calculate metrics based on period
  const metrics = {
    totalWeight: period === 'day' ? 5.2 : period === 'week' ? 38.5 : 152.3,
    totalValue: period === 'day' ? 78.50 : period === 'week' ? 550.25 : 2150.75,
    changePercent: period === 'day' ? -2.5 : period === 'week' ? 1.8 : -5.2,
    incidents: period === 'day' ? 8 : period === 'week' ? 42 : 156,
  };

  // Colors for charts
  const COLORS = ['#EF4444', '#F97316', '#F59E0B', '#10B981', '#06B6D4', '#8B5CF6'];
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  // Format tooltip values
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      // Handle different payloads based on chart type
      const data = payload[0].payload;
      
      // Check if we're dealing with the waste by category chart (has a name property)
      if ('name' in data) {
        return (
          <div className="bg-white p-2 border rounded shadow-sm">
            <p className="font-medium">{data.name}</p>
            <p className="text-sm">Weight: {data.value}kg</p>
            {data.cost && <p className="text-sm">Cost: ${Number(data.cost).toFixed(2)}</p>}
          </div>
        );
      }
      
      // For waste by date chart
      if ('date' in data) {
        return (
          <div className="bg-white p-2 border rounded shadow-sm">
            <p className="font-medium">{data.date}</p>
            <p className="text-sm">Weight: {data.weight}kg</p>
            <p className="text-sm">Cost: ${Number(data.value).toFixed(2)}</p>
          </div>
        );
      }
      
      // For other charts
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Waste Tracking Dashboard</h2>
          <p className="text-kitchen-muted-foreground mt-1">Monitor waste trends and identify opportunities for reduction</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Total Waste</p>
                <h3 className="text-2xl font-bold mt-1">{metrics.totalWeight}kg</h3>
              </div>
              <div className="bg-kitchen-muted p-2 rounded-full">
                <Scale className="h-5 w-5 text-kitchen-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Financial Impact</p>
                <h3 className="text-2xl font-bold mt-1">${metrics.totalValue.toFixed(2)}</h3>
              </div>
              <div className="bg-kitchen-danger/10 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-kitchen-danger" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Change vs Previous</p>
                <h3 className="text-2xl font-bold mt-1 flex items-center">
                  {metrics.changePercent}%
                  {metrics.changePercent < 0 ? (
                    <TrendingDown className="ml-2 h-5 w-5 text-kitchen-success" />
                  ) : (
                    <TrendingUp className="ml-2 h-5 w-5 text-kitchen-danger" />
                  )}
                </h3>
              </div>
              <div className={`p-2 rounded-full ${metrics.changePercent < 0 ? 'bg-kitchen-success/10' : 'bg-kitchen-danger/10'}`}>
                {metrics.changePercent < 0 ? (
                  <TrendingDown className="h-5 w-5 text-kitchen-success" />
                ) : (
                  <TrendingUp className="h-5 w-5 text-kitchen-danger" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Waste Incidents</p>
                <h3 className="text-2xl font-bold mt-1">{metrics.incidents}</h3>
              </div>
              <div className="bg-kitchen-warning/10 p-2 rounded-full">
                <ClipboardList className="h-5 w-5 text-kitchen-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waste by Category */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Waste by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {wasteByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              {wasteByCategory.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span>{category.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-4">{category.value}kg</span>
                    <span>${Number(category.cost).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Waste Trend */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Waste Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={wasteByDate}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Wasted Items */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Wasted Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={wasteByItem}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Items */}
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-kitchen-warning/10 rounded-md">
                <CircleAlert className="h-5 w-5 text-kitchen-warning mt-0.5" />
                <div>
                  <h4 className="font-medium">High Waste Alert: Tomatoes</h4>
                  <p className="text-sm text-kitchen-muted-foreground mt-1">
                    Tomatoes account for 15% of your total waste by cost. Consider reducing order quantities by 20% and reviewing storage procedures.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-kitchen-muted/30 rounded-md">
                <Scale className="h-5 w-5 text-kitchen-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Schedule Waste Audit</h4>
                  <p className="text-sm text-kitchen-muted-foreground mt-1">
                    Your weekly waste has increased by 1.8%. We recommend scheduling a detailed waste audit to identify root causes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-kitchen-success/10 rounded-md">
                <TrendingDown className="h-5 w-5 text-kitchen-success mt-0.5" />
                <div>
                  <h4 className="font-medium">Success: Reduced Seafood Waste</h4>
                  <p className="text-sm text-kitchen-muted-foreground mt-1">
                    Seafood waste has decreased by 12% this week. Continue with your current portioning and storage practices.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WastageTrackingDashboard;
