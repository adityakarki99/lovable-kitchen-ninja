import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Star, Puzzle, CircleDollarSign, Dog, PlusCircle, FileText, Calculator } from 'lucide-react';
import MenuQuadrantChart from './MenuQuadrantChart';
import MenuMetricsCards from './MenuMetricsCards';

// Mock data for filter options
const categories = ['All Categories', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages'];
const locations = ['All Locations', 'Main Restaurant', 'Bar', 'Patio'];
const periods = ['Last Week', 'Last Month', 'Last Quarter', 'Last Year', 'Custom'];

const MenuAnalysisDashboard: React.FC = () => {
  const [category, setCategory] = useState('All Categories');
  const [location, setLocation] = useState('All Locations');
  const [period, setPeriod] = useState('Last Month');
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {period === 'Custom' && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button className="bg-kitchen-primary hover:bg-kitchen-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Menu Layout
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Run Report
          </Button>
          <Button variant="outline">
            <Calculator className="mr-2 h-4 w-4" />
            Price Simulator
          </Button>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <MenuMetricsCards />
      
      {/* Menu Quadrant Chart */}
      <Card className="shadow-apple-sm">
        <CardHeader>
          <CardTitle className="text-lg">Menu Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px]">
            <MenuQuadrantChart />
          </div>
        </CardContent>
      </Card>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 pt-2">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="text-sm">Stars: High Profit, High Popularity</span>
        </div>
        <div className="flex items-center gap-2">
          <Puzzle className="h-5 w-5 text-blue-500" />
          <span className="text-sm">Puzzles: High Profit, Low Popularity</span>
        </div>
        <div className="flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5 text-green-500" />
          <span className="text-sm">Plow Horses: Low Profit, High Popularity</span>
        </div>
        <div className="flex items-center gap-2">
          <Dog className="h-5 w-5 text-red-500" />
          <span className="text-sm">Dogs: Low Profit, Low Popularity</span>
        </div>
      </div>
    </div>
  );
};

export default MenuAnalysisDashboard;
