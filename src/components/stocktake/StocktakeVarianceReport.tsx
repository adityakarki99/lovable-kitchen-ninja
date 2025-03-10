
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import the StocktakeItem interface
import { StocktakeItem } from './StocktakeGrid';

interface StocktakeVarianceReportProps {
  items: StocktakeItem[];
}

const StocktakeVarianceReport: React.FC<StocktakeVarianceReportProps> = ({ items }) => {
  // Sort items by variance amount (absolute value)
  const sortedItems = [...items]
    .filter(item => item.variance !== 0)
    .sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance));
  
  // Calculate total variance value (simplified calculation)
  const totalVariance = sortedItems.reduce((sum, item) => {
    // Simple placeholder calculation - in a real app, would consider item price
    return sum + (item.variance * 2);  // Assuming $2 per unit for simplicity
  }, 0);

  // Find most affected category
  const categoryVariances = sortedItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Math.abs(item.variance);
    return acc;
  }, {} as Record<string, number>);
  
  const mostAffectedCategory = Object.entries(categoryVariances).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
  
  // Calculate accuracy rate
  const accuracyRate = items.length > 0 
    ? Math.round((items.filter(item => item.variance === 0).length / items.length) * 100) 
    : 100;
  
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Variance Report</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <FileDown className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Card className="shadow-apple-sm overflow-hidden">
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
          {sortedItems.map((item) => (
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
      </Card>
      
      <div className="mt-6 bg-kitchen-muted/30 p-4 rounded-md">
        <h3 className="font-medium mb-2">Variance Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-kitchen-muted-foreground mb-1">Variance Value</p>
            <p className="text-lg font-medium text-kitchen-danger">${Math.abs(totalVariance).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-kitchen-muted-foreground mb-1">Most Affected Category</p>
            <p className="text-lg font-medium">{mostAffectedCategory}</p>
          </div>
          <div>
            <p className="text-sm text-kitchen-muted-foreground mb-1">Accuracy Rate</p>
            <p className="text-lg font-medium">{accuracyRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StocktakeVarianceReport;
