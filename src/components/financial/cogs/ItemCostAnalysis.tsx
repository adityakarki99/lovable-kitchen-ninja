
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { topCostItemsData, costChangesData } from '@/data/financial/cogsData';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

const ItemCostAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Get unique categories for filter
  const categories = ['All', ...new Set([...topCostItemsData, ...costChangesData].map(item => item.category))];
  
  // Filter top cost items
  const filteredTopItems = topCostItemsData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  // Filter cost changes
  const filteredChanges = costChangesData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Top Cost Items Table */}
      <Card className="shadow-apple-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b border-kitchen-border">
            <h3 className="text-lg font-semibold">Highest Cost Items</h3>
            <p className="text-sm text-kitchen-muted-foreground">Items with the highest impact on your COGS</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    Cost Per Unit
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Units Used</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    Total Cost
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">% of COGS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTopItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">${item.costPerUnit.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{item.unitsUsed}</TableCell>
                  <TableCell className="text-right font-medium">${item.totalCost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-kitchen-primary/10 text-kitchen-primary">
                      {item.percentOfCogs}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Cost Changes Table */}
      <Card className="shadow-apple-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b border-kitchen-border">
            <h3 className="text-lg font-semibold">Biggest Cost Changes</h3>
            <p className="text-sm text-kitchen-muted-foreground">Items with significant cost changes since last period</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Previous Cost</TableHead>
                <TableHead className="text-right">Current Cost</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    % Change
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChanges.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">${item.previousCost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${item.currentCost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={`
                      ${item.change > 0 
                        ? 'bg-kitchen-danger/10 text-kitchen-danger' 
                        : 'bg-kitchen-success/10 text-kitchen-success'}
                    `}>
                      {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`
                      ${item.impact === 'high' 
                        ? 'bg-kitchen-danger/10 text-kitchen-danger' 
                        : item.impact === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-kitchen-muted text-kitchen-muted-foreground'}
                    `}>
                      {item.impact}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemCostAnalysis;
