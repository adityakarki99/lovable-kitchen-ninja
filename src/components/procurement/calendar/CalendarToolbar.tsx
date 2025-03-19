
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, Search, RefreshCw } from 'lucide-react';
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import CalendarViewSelector from './CalendarViewSelector';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type ViewMode = 'month' | 'week' | 'day' | 'list';

interface CalendarToolbarProps {
  currentDate: Date;
  viewMode: ViewMode;
  onDateChange: (date: Date) => void;
  onViewChange: (view: ViewMode) => void;
  onToday: () => void;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function CalendarToolbar({ 
  currentDate, 
  viewMode, 
  onDateChange, 
  onViewChange, 
  onToday, 
  onSearch,
  searchQuery = ''
}: CalendarToolbarProps) {
  
  const handlePrevious = () => {
    switch(viewMode) {
      case 'month':
        onDateChange(subMonths(currentDate, 1));
        break;
      case 'week':
        onDateChange(subWeeks(currentDate, 1));
        break;
      case 'day':
        onDateChange(subDays(currentDate, 1));
        break;
      default:
        onDateChange(subMonths(currentDate, 1));
    }
  };

  const handleNext = () => {
    switch(viewMode) {
      case 'month':
        onDateChange(addMonths(currentDate, 1));
        break;
      case 'week':
        onDateChange(addWeeks(currentDate, 1));
        break;
      case 'day':
        onDateChange(addDays(currentDate, 1));
        break;
      default:
        onDateChange(addMonths(currentDate, 1));
    }
  };

  const getDateRangeText = () => {
    switch(viewMode) {
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      case 'week':
        const weekStart = subDays(currentDate, currentDate.getDay());
        const weekEnd = addDays(weekStart, 6);
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      case 'day':
        return format(currentDate, 'MMMM d, yyyy');
      default:
        return format(currentDate, 'MMMM yyyy');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={handlePrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {getDateRangeText()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={(date) => date && onDateChange(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="sm" onClick={onToday}>
          Today
        </Button>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {onSearch && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-gray-70" />
            <Input
              placeholder="Search orders..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        )}
        
        <CalendarViewSelector currentView={viewMode} onViewChange={onViewChange} />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Orders</DropdownMenuItem>
            <DropdownMenuItem>Pending Confirmation</DropdownMenuItem>
            <DropdownMenuItem>Confirmed</DropdownMenuItem>
            <DropdownMenuItem>Scheduled</DropdownMenuItem>
            <DropdownMenuItem>Rejected</DropdownMenuItem>
            <DropdownMenuItem>Recurring Orders</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" size="icon" title="Refresh">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
