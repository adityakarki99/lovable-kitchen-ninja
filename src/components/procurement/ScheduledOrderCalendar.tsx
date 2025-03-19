
import React, { useState, useMemo, useCallback } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScheduledOrder, scheduledOrders } from '@/data/procurement/scheduledOrders';
import { format, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CalendarCheck, CalendarDays, CalendarX, Info, ArrowRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import CalendarToolbar from './calendar/CalendarToolbar';
import DayViewOrders from './calendar/DayViewOrders';

interface ScheduledOrderCalendarProps {
  onViewOrder: (orderId: string) => void;
}

type CalendarViewMode = 'month' | 'week' | 'day' | 'list';

export default function ScheduledOrderCalendar({ onViewOrder }: ScheduledOrderCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'all' | 'scheduled' | 'cutoff'>('all');
  const [calendarView, setCalendarView] = useState<CalendarViewMode>('month');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Memorize dates with orders to avoid recreating on every render
  const datesWithOrders = useMemo(() => {
    const dates = new Map<string, { scheduled: ScheduledOrder[], cutoff: ScheduledOrder[] }>();
    
    scheduledOrders.forEach(order => {
      const scheduledDateStr = format(order.scheduledDate, 'yyyy-MM-dd');
      const cutoffDateStr = format(order.cutoffDate, 'yyyy-MM-dd');
      
      if (!dates.has(scheduledDateStr)) {
        dates.set(scheduledDateStr, { scheduled: [], cutoff: [] });
      }
      dates.get(scheduledDateStr)!.scheduled.push(order);
      
      if (!dates.has(cutoffDateStr)) {
        dates.set(cutoffDateStr, { scheduled: [], cutoff: [] });
      }
      dates.get(cutoffDateStr)!.cutoff.push(order);
    });
    
    return dates;
  }, []);

  // Get all orders visible in current view (month, week, or day)
  const visibleOrders = useMemo(() => {
    let start: Date, end: Date;
    
    if (calendarView === 'month') {
      start = startOfMonth(selectedDate);
      end = endOfMonth(selectedDate);
    } else if (calendarView === 'week') {
      start = startOfWeek(selectedDate);
      end = endOfWeek(selectedDate);
    } else {
      start = selectedDate;
      end = selectedDate;
    }
    
    return scheduledOrders.filter(order => {
      // Apply search filter if any
      const matchesSearch = !searchQuery || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        order.supplier.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;
      
      // Check if order's scheduled or cutoff date falls within the visible range
      const scheduledInRange = order.scheduledDate >= start && order.scheduledDate <= end;
      const cutoffInRange = order.cutoffDate >= start && order.cutoffDate <= end;
      
      return scheduledInRange || cutoffInRange;
    });
  }, [selectedDate, calendarView, searchQuery]);

  // Get orders for the selected date
  const ordersForSelectedDate = useMemo(() => {
    if (!selectedDate) return { scheduled: [], cutoff: [] };
    
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return datesWithOrders.get(dateStr) || { scheduled: [], cutoff: [] };
  }, [selectedDate, datesWithOrders]);
  
  // Filter orders based on view mode
  const filteredOrders = useMemo(() => {
    if (viewMode === 'scheduled') return ordersForSelectedDate.scheduled;
    if (viewMode === 'cutoff') return ordersForSelectedDate.cutoff;
    return [...ordersForSelectedDate.scheduled, ...ordersForSelectedDate.cutoff];
  }, [ordersForSelectedDate, viewMode]);

  // CSS class modifiers for calendar days
  const modifiers = useMemo(() => {
    const hasScheduled = new Set<Date>();
    const hasCutoff = new Set<Date>();
    const hasBoth = new Set<Date>();
    
    scheduledOrders.forEach(order => {
      const scheduledDateStr = format(order.scheduledDate, 'yyyy-MM-dd');
      const cutoffDateStr = format(order.cutoffDate, 'yyyy-MM-dd');
      
      if (scheduledDateStr === cutoffDateStr) {
        hasBoth.add(order.scheduledDate);
      } else {
        hasScheduled.add(order.scheduledDate);
        hasCutoff.add(order.cutoffDate);
      }
    });
    
    return { hasScheduled, hasCutoff, hasBoth };
  }, []);

  // Custom day rendering
  const renderDay = (day: Date) => {
    const isScheduled = Array.from(modifiers.hasScheduled).some(date => isSameDay(date, day));
    const isCutoff = Array.from(modifiers.hasCutoff).some(date => isSameDay(date, day));
    const isBoth = Array.from(modifiers.hasBoth).some(date => isSameDay(date, day));
    
    const dateStr = format(day, 'yyyy-MM-dd');
    const hasData = datesWithOrders.has(dateStr);
    const data = datesWithOrders.get(dateStr);
    
    let scheduledCount = 0;
    let cutoffCount = 0;
    
    if (hasData) {
      scheduledCount = data!.scheduled.length;
      cutoffCount = data!.cutoff.length;
    }
    
    const totalCount = scheduledCount + cutoffCount;
    
    if (isBoth || (isScheduled && isCutoff)) {
      return (
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full" />
          <div className="absolute top-0 left-0 h-2 w-2 bg-amber-500 rounded-full" />
          {totalCount > 0 && (
            <div className="absolute bottom-0 left-0 right-0 text-[10px] text-center">
              {totalCount > 1 ? `${totalCount} orders` : `${totalCount} order`}
            </div>
          )}
        </div>
      );
    } else if (isScheduled) {
      return (
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full" />
          {scheduledCount > 0 && (
            <div className="absolute bottom-0 left-0 right-0 text-[10px] text-center">
              {scheduledCount > 1 ? `${scheduledCount} orders` : `${scheduledCount} order`}
            </div>
          )}
        </div>
      );
    } else if (isCutoff) {
      return (
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute top-0 right-0 h-2 w-2 bg-amber-500 rounded-full" />
          {cutoffCount > 0 && (
            <div className="absolute bottom-0 left-0 right-0 text-[10px] text-center">
              {cutoffCount > 1 ? `${cutoffCount} orders` : `${cutoffCount} order`}
            </div>
          )}
        </div>
      );
    }
    
    return day.getDate();
  };

  // Handler for navigating to today
  const handleGoToToday = useCallback(() => {
    setSelectedDate(new Date());
  }, []);

  return (
    <Card className="overflow-hidden border-carbon-gray-20">
      <CardHeader className="bg-carbon-gray-5 pb-3">
        <CardTitle className="text-lg flex items-center">
          <CalendarDays className="mr-2 h-5 w-5 text-carbon-blue-60" />
          Scheduled Order Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <CalendarToolbar 
          currentDate={selectedDate}
          viewMode={calendarView}
          onDateChange={setSelectedDate}
          onViewChange={setCalendarView}
          onToday={handleGoToToday}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-carbon-gray-20 mt-4">
          <div className="col-span-2 lg:pr-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
              showOutsideDays={true}
              components={{
                Day({ date, ...props }) {
                  return <div {...props}>{renderDay(date)}</div>;
                }
              }}
            />
            
            <div className="mt-4 space-y-2">
              <div className="text-sm font-medium">Legend:</div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Delivery Date</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <span className="text-sm">Confirmation Cutoff</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-3 flex flex-col h-full lg:pl-4 mt-4 lg:mt-0">
            <div className="border-b border-carbon-gray-20 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">
                  {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'No date selected'}
                </h3>
                <Tabs defaultValue="all" className="w-auto" onValueChange={(v) => setViewMode(v as any)}>
                  <TabsList className="grid w-full grid-cols-3 h-8">
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                    <TabsTrigger value="scheduled" className="text-xs">Deliveries</TabsTrigger>
                    <TabsTrigger value="cutoff" className="text-xs">Cutoffs</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {filteredOrders.length === 0 ? (
                <Alert className="bg-carbon-gray-5 border-carbon-gray-20">
                  <Info className="h-4 w-4" />
                  <AlertTitle>No orders for this date</AlertTitle>
                  <AlertDescription>
                    There are no scheduled orders or cutoff dates for the selected day.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="text-sm text-carbon-gray-70">
                  {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} on this date
                </div>
              )}
            </div>
            
            <div className="flex-1 overflow-auto pt-4">
              {calendarView === 'day' ? (
                <DayViewOrders 
                  date={selectedDate} 
                  orders={visibleOrders.filter(order => 
                    isSameDay(order.scheduledDate, selectedDate) || 
                    isSameDay(order.cutoffDate, selectedDate)
                  )}
                  onViewOrder={onViewOrder}
                />
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map(order => (
                    <div key={order.id} className="border rounded-sm p-3 hover:border-carbon-blue-60 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium mb-1">{order.id}</div>
                          <div className="text-sm">{order.supplier}</div>
                        </div>
                        <Badge 
                          className={`
                            ${order.status === 'Pending Confirmation' ? 'bg-amber-100 text-amber-800' : ''}
                            ${order.status === 'Confirmed' ? 'bg-green-100 text-green-800' : ''}
                            ${order.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                            ${order.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
                          `}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="mt-2 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-carbon-gray-70">Delivery:</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="ml-1">
                                  <CalendarCheck className="h-3.5 w-3.5 inline-block text-blue-600" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Scheduled delivery date</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <div>{format(order.scheduledDate, 'MMM d, yyyy')}</div>
                          </div>
                          <div>
                            <span className="text-carbon-gray-70">Cutoff:</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="ml-1">
                                  <CalendarX className="h-3.5 w-3.5 inline-block text-amber-600" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Confirmation cutoff date</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <div>{format(order.cutoffDate, 'MMM d, h:mm a')}</div>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <span className="text-carbon-gray-70">Total:</span> ${order.total.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-carbon-blue-60"
                          onClick={() => onViewOrder(order.id)}
                        >
                          View Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
