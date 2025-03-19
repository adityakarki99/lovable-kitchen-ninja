
import React, { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScheduledOrder, scheduledOrders } from '@/data/procurement/scheduledOrders';
import { format, isSameDay } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CalendarCheck, CalendarDays, CalendarX, Info, ArrowRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ScheduledOrderCalendarProps {
  onViewOrder: (orderId: string) => void;
}

export default function ScheduledOrderCalendar({ onViewOrder }: ScheduledOrderCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'all' | 'scheduled' | 'cutoff'>('all');
  
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
    
    if (isBoth) {
      return <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full" />
        <div className="absolute top-0 left-0 h-2 w-2 bg-amber-500 rounded-full" />
      </div>;
    } else if (isScheduled) {
      return <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full" />
      </div>;
    } else if (isCutoff) {
      return <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute top-0 right-0 h-2 w-2 bg-amber-500 rounded-full" />
      </div>;
    }
    
    return day.getDate();
  };

  return (
    <Card className="overflow-hidden border-carbon-gray-20">
      <CardHeader className="bg-carbon-gray-5 pb-3">
        <CardTitle className="text-lg flex items-center">
          <CalendarDays className="mr-2 h-5 w-5 text-carbon-blue-60" />
          Scheduled Order Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-carbon-gray-20">
          <div className="col-span-2 p-4">
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
          
          <div className="col-span-3 flex flex-col h-full">
            <div className="border-b border-carbon-gray-20 p-4">
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
            
            <div className="flex-1 overflow-auto p-4">
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
