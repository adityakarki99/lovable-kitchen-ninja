
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, Calendar as CalendarIcon, LayoutList } from 'lucide-react';

type ViewMode = 'month' | 'week' | 'day' | 'list';

interface CalendarViewSelectorProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export default function CalendarViewSelector({ currentView, onViewChange }: CalendarViewSelectorProps) {
  return (
    <div className="flex bg-carbon-gray-5 rounded-md p-1">
      <Button 
        variant={currentView === 'month' ? 'default' : 'ghost'} 
        size="sm"
        onClick={() => onViewChange('month')}
        className={currentView === 'month' ? 'bg-kitchen-primary hover:bg-kitchen-primary/90' : ''}
      >
        <CalendarDays className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Month</span>
      </Button>
      <Button 
        variant={currentView === 'week' ? 'default' : 'ghost'} 
        size="sm"
        onClick={() => onViewChange('week')}
        className={currentView === 'week' ? 'bg-kitchen-primary hover:bg-kitchen-primary/90' : ''}
      >
        <CalendarIcon className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Week</span>
      </Button>
      <Button 
        variant={currentView === 'day' ? 'default' : 'ghost'} 
        size="sm"
        onClick={() => onViewChange('day')}
        className={currentView === 'day' ? 'bg-kitchen-primary hover:bg-kitchen-primary/90' : ''}
      >
        <CalendarIcon className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Day</span>
      </Button>
      <Button 
        variant={currentView === 'list' ? 'default' : 'ghost'} 
        size="sm"
        onClick={() => onViewChange('list')}
        className={currentView === 'list' ? 'bg-kitchen-primary hover:bg-kitchen-primary/90' : ''}
      >
        <LayoutList className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">List</span>
      </Button>
    </div>
  );
}
