
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesDashboard = () => {
  // Sample data for the chart
  const data = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 5890 },
    { name: 'Sat', sales: 6390 },
    { name: 'Sun', sales: 3490 },
  ];

  return (
    <div className="space-y-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-kitchen-muted-foreground">Total Sales</h3>
            <p className="text-3xl font-bold mt-2">$152,467.89</p>
            <p className="text-xs text-green-500 mt-1">↑ 5.2% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-kitchen-muted-foreground">Average Check Size</h3>
            <p className="text-3xl font-bold mt-2">$42.35</p>
            <p className="text-xs text-green-500 mt-1">↑ 1.8% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-kitchen-muted-foreground">Transaction Count</h3>
            <p className="text-3xl font-bold mt-2">3,600</p>
            <p className="text-xs text-red-500 mt-1">↓ 2.1% from last period</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Weekly Sales Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesDashboard;
