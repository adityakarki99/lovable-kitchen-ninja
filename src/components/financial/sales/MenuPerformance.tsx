
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const MenuPerformance = () => {
  // Sample data for the category breakdown chart
  const categoryData = [
    { name: 'Appetizers', value: 15 },
    { name: 'Entrees', value: 45 },
    { name: 'Beverages', value: 25 },
    { name: 'Desserts', value: 15 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Sample data for top items table
  const topItems = [
    { id: 1, name: 'Signature Burger', category: 'Entrees', revenue: 12450, quantity: 623, margin: 68 },
    { id: 2, name: 'Craft Beer', category: 'Beverages', revenue: 9870, quantity: 548, margin: 72 },
    { id: 3, name: 'Truffle Fries', category: 'Appetizers', revenue: 8540, quantity: 427, margin: 65 },
    { id: 4, name: 'Chocolate Cake', category: 'Desserts', revenue: 7650, quantity: 383, margin: 70 },
    { id: 5, name: 'House Salad', category: 'Appetizers', revenue: 6230, quantity: 312, margin: 62 },
  ];

  return (
    <div className="space-y-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Sales by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Category Performance</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Entrees</TableCell>
                  <TableCell className="text-right">$68,610</TableCell>
                  <TableCell className="text-right text-green-500">+7.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Beverages</TableCell>
                  <TableCell className="text-right">$38,117</TableCell>
                  <TableCell className="text-right text-green-500">+4.5%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Appetizers</TableCell>
                  <TableCell className="text-right">$22,870</TableCell>
                  <TableCell className="text-right text-red-500">-1.8%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Desserts</TableCell>
                  <TableCell className="text-right">$22,870</TableCell>
                  <TableCell className="text-right text-green-500">+2.3%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Top Performing Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Margin %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">${item.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.margin}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuPerformance;
