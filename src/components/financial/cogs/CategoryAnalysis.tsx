
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { categoryCogsData } from '@/data/financial/cogsData';

const CategoryAnalysis = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Sort categories by cost (descending)
  const sortedCategories = [...categoryCogsData].sort((a, b) => b.cost - a.cost);
  
  // Calculate total COGS
  const totalCogs = categoryCogsData.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Breakdown Chart */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Category Cost Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryCogsData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="cost"
                    nameKey="category"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryCogsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Category Bar Chart */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Category Cost Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortedCategories}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                  <Bar dataKey="cost" fill="#8884d8" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Category Details Table */}
      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-kitchen-border">
            <h3 className="text-lg font-semibold">Category Cost Breakdown</h3>
            <p className="text-sm text-kitchen-muted-foreground">Detailed analysis of costs by category</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Total Cost</TableHead>
                <TableHead className="text-right">% of Total COGS</TableHead>
                <TableHead className="text-right">Cost per Day</TableHead>
                <TableHead className="text-right">Previous Period</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCategories.map((category, index) => {
                // Generate some mock previous period values
                const previousCost = category.cost * (Math.random() * 0.3 + 0.85); // Between 85% and 115% of current
                const change = ((category.cost - previousCost) / previousCost) * 100;
                
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{category.category}</TableCell>
                    <TableCell className="text-right">${category.cost.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{(category.cost / totalCogs * 100).toFixed(1)}%</TableCell>
                    <TableCell className="text-right">${(category.cost / 30).toFixed(2)}</TableCell>
                    <TableCell className="text-right">${previousCost.toFixed(2)}</TableCell>
                    <TableCell className={`text-right ${change >= 0 ? 'text-kitchen-danger' : 'text-kitchen-success'}`}>
                      {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Cost-reduction Opportunities */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Cost-reduction Opportunities</h3>
          
          <div className="space-y-4">
            {sortedCategories.slice(0, 3).map((category, index) => (
              <div key={index} className="border-b border-kitchen-border pb-4 last:border-0">
                <h4 className="font-medium">{category.category}</h4>
                <p className="text-sm text-kitchen-muted-foreground mt-1">
                  {index === 0 ? 
                    "Consider negotiating volume discounts with your main suppliers or exploring alternative sources." :
                    index === 1 ?
                    "Optimize ordering frequency and storage to reduce waste and improve inventory turns." :
                    "Review recipes to potentially reduce portions or find more cost-effective substitutes."
                  }
                </p>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Potential savings: </span>
                  <span className="text-kitchen-success">${(category.cost * 0.1).toFixed(2)} (10% reduction)</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryAnalysis;
