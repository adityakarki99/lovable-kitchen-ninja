
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, LineChart, XAxis, YAxis, Bar, Line, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { Button } from '@/components/ui/button';
import { Printer, Download, Filter, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { wasteByCategory, wasteByItem, wasteByDate, wasteCauses } from '@/data/wastageData';

const WasteAnalysisReports: React.FC = () => {
  const [reportPeriod, setReportPeriod] = useState('week');
  const [reportType, setReportType] = useState('summary');
  
  // Format tooltip values
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.dataKey === 'cost' ? '$' : ''}{Number(entry.value).toFixed(2)}{entry.dataKey === 'weight' ? 'kg' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold">Waste Analysis & Reports</h2>
          <p className="text-kitchen-muted-foreground mt-1">Detailed insights into waste patterns and opportunities</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Categories</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="spoilage">Spoilage</SelectItem>
                      <SelectItem value="overproduction">Overproduction</SelectItem>
                      <SelectItem value="trim">Trim Waste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Kitchen Area</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Kitchen Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Areas</SelectItem>
                      <SelectItem value="prep">Prep Kitchen</SelectItem>
                      <SelectItem value="line">Line</SelectItem>
                      <SelectItem value="pastry">Pastry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline">Reset</Button>
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={reportType} onValueChange={setReportType} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="summary">Summary Report</TabsTrigger>
          <TabsTrigger value="trend">Trend Analysis</TabsTrigger>
          <TabsTrigger value="items">Item Breakdown</TabsTrigger>
          <TabsTrigger value="causes">Root Causes</TabsTrigger>
        </TabsList>
        
        {/* Summary Report */}
        <TabsContent value="summary" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Waste by Category</CardTitle>
                <CardDescription>Breakdown of waste by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={wasteByCategory}
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
                      <Legend />
                      <Bar name="Weight (kg)" dataKey="value" fill="#10b981" />
                      <Bar name="Cost ($)" dataKey="cost" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Wasted Items</CardTitle>
                <CardDescription>Items with highest waste value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={wasteByItem.slice(0, 5)}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 100,
                        bottom: 5,
                      }}
                    >
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar name="Weight (kg)" dataKey="value" fill="#10b981" />
                      <Bar name="Cost ($)" dataKey="cost" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Summary Metrics</CardTitle>
                <CardDescription>Key waste performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <div className="p-4 bg-kitchen-muted/10 rounded-lg">
                    <p className="text-sm text-kitchen-muted-foreground">Total Waste</p>
                    <p className="text-2xl font-bold mt-1">38.5kg</p>
                    <p className="text-sm mt-1">
                      <span className="text-kitchen-success">↓ 3.2%</span> vs previous period
                    </p>
                  </div>
                  
                  <div className="p-4 bg-kitchen-muted/10 rounded-lg">
                    <p className="text-sm text-kitchen-muted-foreground">Total Cost</p>
                    <p className="text-2xl font-bold mt-1">$550.25</p>
                    <p className="text-sm mt-1">
                      <span className="text-kitchen-danger">↑ 1.8%</span> vs previous period
                    </p>
                  </div>
                  
                  <div className="p-4 bg-kitchen-muted/10 rounded-lg">
                    <p className="text-sm text-kitchen-muted-foreground">Waste per Meal</p>
                    <p className="text-2xl font-bold mt-1">62g</p>
                    <p className="text-sm mt-1">
                      <span className="text-kitchen-muted-foreground">5,845 covers served</span>
                    </p>
                  </div>
                  
                  <div className="p-4 bg-kitchen-muted/10 rounded-lg">
                    <p className="text-sm text-kitchen-muted-foreground">Cost per Meal</p>
                    <p className="text-2xl font-bold mt-1">$0.94</p>
                    <p className="text-sm mt-1">
                      <span className="text-kitchen-success">↓ 0.8%</span> vs previous period
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Trend Analysis */}
        <TabsContent value="trend" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Waste Trends Over Time</CardTitle>
              <CardDescription>Track waste patterns across periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={wasteByDate}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
                    <YAxis yAxisId="right" orientation="right" stroke="#f97316" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="weight" name="Weight (kg)" stroke="#10b981" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="value" name="Cost ($)" stroke="#f97316" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" size="sm">Daily</Button>
                <Button variant="outline" size="sm" className="bg-kitchen-muted/20">Weekly</Button>
                <Button variant="outline" size="sm">Monthly</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Pattern Analysis</CardTitle>
                <CardDescription>Waste patterns by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { day: 'Monday', weight: 5.2, cost: 75.40 },
                        { day: 'Tuesday', weight: 4.8, cost: 68.20 },
                        { day: 'Wednesday', weight: 5.5, cost: 82.30 },
                        { day: 'Thursday', weight: 4.2, cost: 65.10 },
                        { day: 'Friday', weight: 6.8, cost: 95.20 },
                        { day: 'Saturday', weight: 7.5, cost: 110.50 },
                        { day: 'Sunday', weight: 4.5, cost: 67.80 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar name="Weight (kg)" dataKey="weight" fill="#10b981" />
                      <Bar name="Cost ($)" dataKey="cost" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Year-over-Year Comparison</CardTitle>
                <CardDescription>Waste trends compared to previous year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', current: 120.5, previous: 140.2 },
                        { month: 'Feb', current: 115.3, previous: 135.8 },
                        { month: 'Mar', current: 130.8, previous: 142.3 },
                        { month: 'Apr', current: 125.2, previous: 138.5 },
                        { month: 'May', current: 140.5, previous: 145.2 },
                        { month: 'Jun', current: 152.3, previous: 158.7 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="current" name="2023 ($)" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="previous" name="2022 ($)" stroke="#d1d5db" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-3 bg-kitchen-success/10 rounded-md">
                  <p className="text-sm font-medium text-kitchen-success">Improvement: -12.5% YoY</p>
                  <p className="text-sm text-kitchen-muted-foreground mt-1">
                    Your waste costs are down by an average of 12.5% compared to last year, resulting in approximately ${Number(140 * 0.125 * 6).toFixed(2)} savings from January to June.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Item Breakdown */}
        <TabsContent value="items" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Item Breakdown</CardTitle>
              <CardDescription>Waste analysis by individual ingredients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md divide-y">
                <div className="grid grid-cols-12 gap-2 p-3 bg-kitchen-muted/10 font-medium">
                  <div className="col-span-5">Item</div>
                  <div className="col-span-1 text-right">Qty</div>
                  <div className="col-span-1 text-right">Unit</div>
                  <div className="col-span-1 text-right">Cost</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2">Main Cause</div>
                </div>
                
                {wasteByItem.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 p-3 items-center hover:bg-kitchen-muted/5">
                    <div className="col-span-5">{item.name}</div>
                    <div className="col-span-1 text-right">{item.value}</div>
                    <div className="col-span-1 text-right">kg</div>
                    <div className="col-span-1 text-right">${Number(item.cost).toFixed(2)}</div>
                    <div className="col-span-2">
                      <span className="px-2 py-1 bg-kitchen-muted/20 text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.cause === 'Spoilage' ? 'bg-kitchen-danger/10 text-kitchen-danger' :
                        item.cause === 'Overproduction' ? 'bg-kitchen-warning/10 text-kitchen-warning' :
                        'bg-kitchen-muted/20 text-kitchen-muted-foreground'
                      }`}>
                        {item.cause}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Root Causes */}
        <TabsContent value="causes" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Waste by Root Cause</CardTitle>
                <CardDescription>Analysis of contributing factors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={wasteCauses}
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
                      <Legend />
                      <Bar name="Weight (kg)" dataKey="value" fill="#10b981" />
                      <Bar name="Cost ($)" dataKey="cost" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Root Cause Insights</CardTitle>
                <CardDescription>Analysis and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Overproduction</h3>
                      <span className="px-2 py-1 bg-kitchen-warning/10 text-kitchen-warning text-xs rounded-full">
                        32% of waste
                      </span>
                    </div>
                    <p className="text-sm text-kitchen-muted-foreground mt-2">
                      Overproduction accounts for the largest portion of your waste. Focus on improving demand forecasting and implementing just-in-time production techniques.
                    </p>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm font-medium">Recommendation:</p>
                      <p className="text-sm text-kitchen-muted-foreground">
                        Reduce batch sizes for high-waste items and implement a production schedule based on historical sales data.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Spoilage</h3>
                      <span className="px-2 py-1 bg-kitchen-danger/10 text-kitchen-danger text-xs rounded-full">
                        25% of waste
                      </span>
                    </div>
                    <p className="text-sm text-kitchen-muted-foreground mt-2">
                      Improper storage and inventory management are leading to significant spoilage issues, particularly with fresh produce.
                    </p>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm font-medium">Recommendation:</p>
                      <p className="text-sm text-kitchen-muted-foreground">
                        Implement a strict FIFO system and review storage conditions for perishable items. Consider more frequent, smaller deliveries.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Trim Waste</h3>
                      <span className="px-2 py-1 bg-kitchen-muted/20 text-kitchen-muted-foreground text-xs rounded-full">
                        18% of waste
                      </span>
                    </div>
                    <p className="text-sm text-kitchen-muted-foreground mt-2">
                      Significant waste is occurring during the preparation process, particularly with vegetables and proteins.
                    </p>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm font-medium">Recommendation:</p>
                      <p className="text-sm text-kitchen-muted-foreground">
                        Schedule staff training on efficient cutting techniques and identify creative uses for trim in other dishes.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WasteAnalysisReports;
