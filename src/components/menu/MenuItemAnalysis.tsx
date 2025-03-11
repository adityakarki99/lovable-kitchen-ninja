import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Star, Puzzle, CircleDollarSign, Dog, Search, Filter, ArrowUpDown, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for menu items
const menuItems = [
  { id: 1, name: 'Fish & Chips', category: 'Main Course', price: '$16.50', cost: '$4.62', profitMargin: 72, weeklySales: 250, popularity: 85, quadrant: 'star' },
  { id: 2, name: 'Ribeye Steak', category: 'Main Course', price: '$32.00', cost: '$10.24', profitMargin: 68, weeklySales: 180, popularity: 75, quadrant: 'star' },
  { id: 3, name: 'Shrimp Pasta', category: 'Main Course', price: '$18.50', cost: '$5.55', profitMargin: 70, weeklySales: 150, popularity: 68, quadrant: 'star' },
  { id: 4, name: 'Wagyu Steak', category: 'Main Course', price: '$45.00', cost: '$15.75', profitMargin: 65, weeklySales: 50, popularity: 30, quadrant: 'puzzle' },
  { id: 5, name: 'Lobster Risotto', category: 'Main Course', price: '$29.50', cost: '$9.44', profitMargin: 68, weeklySales: 45, popularity: 25, quadrant: 'puzzle' },
  { id: 6, name: 'Margherita Pizza', category: 'Main Course', price: '$14.00', cost: '$7.70', profitMargin: 45, weeklySales: 300, popularity: 80, quadrant: 'plowHorse' },
  { id: 7, name: 'Burger & Fries', category: 'Main Course', price: '$12.50', cost: '$7.25', profitMargin: 42, weeklySales: 290, popularity: 78, quadrant: 'plowHorse' },
  { id: 8, name: 'Caesar Salad', category: 'Appetizer', price: '$10.00', cost: '$6.00', profitMargin: 40, weeklySales: 220, popularity: 65, quadrant: 'plowHorse' },
  { id: 9, name: 'Quinoa Salad', category: 'Appetizer', price: '$12.00', cost: '$7.20', profitMargin: 40, weeklySales: 40, popularity: 20, quadrant: 'dog' },
  { id: 10, name: 'Vegetable Soup', category: 'Appetizer', price: '$8.50', cost: '$5.52', profitMargin: 35, weeklySales: 30, popularity: 15, quadrant: 'dog' },
  { id: 11, name: 'Chocolate Fondant', category: 'Dessert', price: '$9.50', cost: '$2.85', profitMargin: 70, weeklySales: 120, popularity: 60, quadrant: 'star' },
  { id: 12, name: 'Tiramisu', category: 'Dessert', price: '$8.50', cost: '$2.55', profitMargin: 70, weeklySales: 100, popularity: 55, quadrant: 'star' },
  { id: 13, name: 'Strawberry Cheesecake', category: 'Dessert', price: '$7.50', cost: '$2.62', profitMargin: 65, weeklySales: 90, popularity: 50, quadrant: 'puzzle' },
  { id: 14, name: 'French Onion Soup', category: 'Appetizer', price: '$7.50', cost: '$4.50', profitMargin: 40, weeklySales: 50, popularity: 25, quadrant: 'dog' },
  { id: 15, name: 'Garlic Bread', category: 'Appetizer', price: '$5.50', cost: '$1.10', profitMargin: 80, weeklySales: 200, popularity: 70, quadrant: 'star' },
];

const MenuItemAnalysis: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [quadrantFilter, setQuadrantFilter] = useState('All');
  
  // Filter menu items based on search query and filters
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesQuadrant = quadrantFilter === 'All' || item.quadrant === quadrantFilter;
    
    return matchesSearch && matchesCategory && matchesQuadrant;
  });
  
  // Extract unique categories for filter
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  
  // Function to render quadrant icon
  const renderQuadrantIcon = (quadrant: string) => {
    switch (quadrant) {
      case 'star':
        return <Star className="h-4 w-4 text-yellow-500" />;
      case 'puzzle':
        return <Puzzle className="h-4 w-4 text-blue-500" />;
      case 'plowHorse':
        return <CircleDollarSign className="h-4 w-4 text-green-500" />;
      case 'dog':
        return <Dog className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  // Function to render quadrant label
  const renderQuadrantLabel = (quadrant: string) => {
    switch (quadrant) {
      case 'star':
        return 'Star';
      case 'puzzle':
        return 'Puzzle';
      case 'plowHorse':
        return 'Plow Horse';
      case 'dog':
        return 'Dog';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search menu items..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={quadrantFilter} onValueChange={setQuadrantFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Quadrant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Quadrants</SelectItem>
              <SelectItem value="star">Stars</SelectItem>
              <SelectItem value="puzzle">Puzzles</SelectItem>
              <SelectItem value="plowHorse">Plow Horses</SelectItem>
              <SelectItem value="dog">Dogs</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>
      </div>
      
      <Card className="shadow-apple-sm">
        <CardHeader className="py-4">
          <CardTitle className="text-lg">Menu Items Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Price
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Food Cost</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Profit Margin
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Weekly Sales
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Quadrant</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.cost}</TableCell>
                  <TableCell>
                    <Badge className={`${
                      item.profitMargin >= 65 ? 'bg-kitchen-success/10 text-kitchen-success' : 
                      item.profitMargin >= 50 ? 'bg-kitchen-primary/10 text-kitchen-primary' : 
                      'bg-kitchen-muted text-kitchen-muted-foreground'
                    }`}>
                      {item.profitMargin}%
                    </Badge>
                  </TableCell>
                  <TableCell>{item.weeklySales}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {renderQuadrantIcon(item.quadrant)}
                      <span className="text-sm">{renderQuadrantLabel(item.quadrant)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
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

export default MenuItemAnalysis;
