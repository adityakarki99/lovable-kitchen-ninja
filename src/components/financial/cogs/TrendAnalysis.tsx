
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { monthlyCogsData } from '@/data/financial/cogsData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TrendAnalysis = () => {
  // Calculate year-over-year comparison (mock data)
  const previousYearData = monthlyCogsData.map(item => ({
    ...item,
    previousYearCogs: item.cogs * (Math.random() * 0.4 + 0.8), // 80-120% of current
    previousYearSales: item.sales * (Math.random() * 0.4 + 0.8), // 80-120% of current
  }));
  
  // Calculate projected data for next 6 months
  const lastSixMonths = monthlyCogsData.slice(-6);
  const avgGrowthRate = lastSixMonths.reduce((sum, item, index) => {
    if (index === 0) return sum;
    return sum + ((lastSixMonths[index].cogs / lastSixMonths[index-1].cogs) - 1);
  }, 0) / (lastSixMonths.length - 1);
  
  const projectedData = Array.from({ length: 6 }).map((_, index) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index];
    const lastMonthCogs = index === 0 ? monthlyCogsData[monthlyCogsData.length - 1].cogs : projectedData[index - 1].cogs;
    const projectedCogs = lastMonthCogs * (1 + avgGrowthRate);
    const lastMonthSales = index === 0 ? monthlyCogsData[monthlyCogsData.length - 1].sales : projectedData[index - 1].sales;
    const projectedSales = lastMonthSales * (1 + avgGrowthRate);
    
    return {
      month: month,
      cogs: Math.round(projectedCogs),
      sales: Math.round(projectedSales),
      percentage: Math.round((projectedCogs / projectedSales) * 1000) / 10,
      isProjected: true
    };
  });
  
  // Seasonal patterns - calculate average by month across years
  const seasonalData = [
    { month: 'Jan', avg: 0.95 },
    { month: 'Feb', avg: 0.90 },
    { month: 'Mar', avg: 0.95 },
    { month: 'Apr', avg: 1.00 },
    { month: 'May', avg: 1.05 },
    { month: 'Jun', avg: 1.15 },
    { month: 'Jul', avg: 1.20 },
    { month: 'Aug', avg: 1.25 },
    { month: 'Sep', avg: 1.15 },
    { month: 'Oct', avg: 1.05 },
    { month: 'Nov', avg: 1.00 },
    { month: 'Dec', avg: 1.25 },
  ];

  return (
    <div className="space-y-6">
      {/* Time Period Selector */}
      <div className="flex justify-end">
        <Select defaultValue="12months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="12months">Last 12 Months</SelectItem>
            <SelectItem value="ytd">Year to Date</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* COGS vs Sales Trend */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">COGS vs Sales Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyCogsData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" domain={[20, 40]} />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'cogs' || name === 'sales') return [`$${value.toLocaleString()}`, name === 'cogs' ? 'COGS' : 'Sales'];
                    return [`${value}%`, 'COGS %'];
                  }}
                />
                <Line yAxisId="left" type="monotone" dataKey="cogs" name="COGS" stroke="#8884d8" />
                <Line yAxisId="left" type="monotone" dataKey="sales" name="Sales" stroke="#82ca9d" />
                <Line yAxisId="right" type="monotone" dataKey="percentage" name="COGS %" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Year-over-Year Comparison */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Year-over-Year Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={previousYearData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  <Area type="monotone" dataKey="cogs" name="This Year" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="previousYearCogs" name="Previous Year" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Seasonal Patterns */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Seasonal Patterns</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={seasonalData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0.8, 1.4]} />
                  <Tooltip formatter={(value) => {
                    // Fix the type issue by checking if value is a number before calling toFixed
                    const formattedValue = typeof value === 'number' ? value.toFixed(2) : value;
                    return [`${formattedValue}x`, 'Seasonal Factor'];
                  }} />
                  <Line type="monotone" dataKey="avg" name="Seasonal Factor" stroke="#ff7300" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Projections */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">COGS Projections (Next 6 Months)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[...monthlyCogsData.slice(-6), ...projectedData]}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name, props) => {
                    const formatted = [`$${value.toLocaleString()}`, name === 'cogs' ? 'COGS' : 'Sales'];
                    // Add a note for projected values
                    if (props.payload.isProjected) {
                      formatted.push('(Projected)');
                    }
                    return formatted;
                  }}
                />
                <defs>
                  <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="cogs" 
                  name="COGS" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#splitColor)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-3 w-3 bg-[#8884d8] rounded-full"></div>
            <span className="text-sm text-kitchen-muted-foreground">Historical Data</span>
            <div className="h-3 w-3 bg-[#8884d8] opacity-50 rounded-full ml-4"></div>
            <span className="text-sm text-kitchen-muted-foreground">Projected Data</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysis;
