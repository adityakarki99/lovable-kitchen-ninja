
import React, { useState } from 'react';
import { 
  Search, Filter, CalendarCheck, CalendarX, PenLine, 
  Clock, Calendar, CheckCircle, XCircle, AlertCircle, 
  ChevronDown, ArrowUpDown, Info, Plus, RotateCcw, Filter as FilterIcon,
  Calendar as CalendarIcon, Repeat, ListFilter, Clock3
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  scheduledOrders, 
  ScheduledOrderStatus, 
  ScheduleFrequency 
} from '@/data/procurement/scheduledOrders';
import CreateScheduledOrder from './CreateScheduledOrder';
import ScheduledOrderCalendar from './ScheduledOrderCalendar';

const getStatusColor = (status: ScheduledOrderStatus) => {
  switch (status) {
    case 'Pending Confirmation':
      return "bg-amber-100 text-amber-800";
    case 'Confirmed':
      return "bg-green-100 text-green-800";
    case 'Scheduled':
      return "bg-blue-100 text-blue-800";
    case 'Rejected':
      return "bg-red-100 text-red-800";
    default:
      return "bg-carbon-gray-20 text-carbon-gray-100";
  }
};

const getStatusIcon = (status: ScheduledOrderStatus) => {
  switch (status) {
    case 'Pending Confirmation':
      return <Clock className="h-4 w-4" />;
    case 'Confirmed':
      return <CheckCircle className="h-4 w-4" />;
    case 'Scheduled':
      return <Calendar className="h-4 w-4" />;
    case 'Rejected':
      return <XCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const ScheduledOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ScheduledOrderStatus[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const { toast } = useToast();

  const confirmOrder = (orderId: string) => {
    toast({
      title: "Order confirmed",
      description: `Scheduled order ${orderId} has been confirmed and will be sent to the supplier.`,
    });
  };

  const rejectOrder = (orderId: string) => {
    toast({
      title: "Order rejected",
      description: `Scheduled order ${orderId} has been rejected.`,
    });
  };

  const editOrder = (orderId: string) => {
    toast({
      title: "Edit order",
      description: `Editing scheduled order ${orderId}.`,
    });
  };

  const handleViewOrder = (orderId: string) => {
    setSelectedOrder(orderId);
    toast({
      title: "View order details",
      description: `Viewing details for order ${orderId}.`,
    });
  };

  // Filter orders based on search query and status filters
  const filteredOrders = scheduledOrders.filter(order => {
    // Text search filter
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.requestor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(order.status);
    
    return matchesSearch && matchesStatus;
  });

  // Sort orders based on sortBy and sortDirection
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortBy) return 0;
    
    let valueA, valueB;
    
    switch (sortBy) {
      case 'id':
        valueA = a.id;
        valueB = b.id;
        break;
      case 'supplier':
        valueA = a.supplier;
        valueB = b.supplier;
        break;
      case 'status':
        valueA = a.status;
        valueB = b.status;
        break;
      case 'scheduledDate':
        valueA = a.scheduledDate;
        valueB = b.scheduledDate;
        break;
      case 'cutoffDate':
        valueA = a.cutoffDate;
        valueB = b.cutoffDate;
        break;
      case 'total':
        valueA = a.total;
        valueB = b.total;
        break;
      default:
        return 0;
    }
    
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const toggleStatusFilter = (status: ScheduledOrderStatus) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter(s => s !== status));
    } else {
      setStatusFilter([...statusFilter, status]);
    }
  };

  const clearFilters = () => {
    setStatusFilter([]);
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search scheduled orders..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-kitchen-foreground">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter
                {statusFilter.length > 0 && (
                  <Badge className="ml-2 bg-carbon-blue-60">{statusFilter.length}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes('Pending Confirmation')}
                onCheckedChange={() => toggleStatusFilter('Pending Confirmation')}
              >
                Pending Confirmation
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes('Confirmed')}
                onCheckedChange={() => toggleStatusFilter('Confirmed')}
              >
                Confirmed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes('Scheduled')}
                onCheckedChange={() => toggleStatusFilter('Scheduled')}
              >
                Scheduled
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes('Rejected')}
                onCheckedChange={() => toggleStatusFilter('Rejected')}
              >
                Rejected
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={clearFilters} className="justify-center text-carbon-red-50">
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex bg-carbon-gray-5 rounded-md p-1">
            <Button 
              variant={viewMode === 'table' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('table')}
              className={viewMode === 'table' ? 'bg-kitchen-primary hover:bg-kitchen-primary/90' : ''}
            >
              <ListFilter className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'calendar' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('calendar')}
              className={viewMode === 'calendar' ? 'bg-kitchen-primary hover:bg-kitchen-primary/90' : ''}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            size="sm" 
            className="bg-kitchen-primary hover:bg-kitchen-primary/90"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Create Scheduled Order
          </Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <Card className="shadow-apple-sm overflow-hidden">
          <CardHeader className="bg-carbon-gray-5 pb-3">
            <CardTitle className="text-lg">Scheduled Purchase Orders</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader className="bg-kitchen-muted">
              <TableRow>
                <TableHead className="font-medium cursor-pointer" onClick={() => handleSort('id')}>
                  <div className="flex items-center">
                    Order ID
                    {sortBy === 'id' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="font-medium cursor-pointer" onClick={() => handleSort('supplier')}>
                  <div className="flex items-center">
                    Supplier
                    {sortBy === 'supplier' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="font-medium">Items</TableHead>
                <TableHead className="font-medium cursor-pointer" onClick={() => handleSort('status')}>
                  <div className="flex items-center">
                    Status
                    {sortBy === 'status' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="font-medium cursor-pointer" onClick={() => handleSort('scheduledDate')}>
                  <div className="flex items-center">
                    Scheduled Date
                    {sortBy === 'scheduledDate' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="font-medium cursor-pointer" onClick={() => handleSort('cutoffDate')}>
                  <div className="flex items-center">
                    Confirmation Cutoff
                    {sortBy === 'cutoffDate' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="font-medium">Requestor</TableHead>
                <TableHead className="font-medium cursor-pointer text-right" onClick={() => handleSort('total')}>
                  <div className="flex items-center justify-end">
                    Total
                    {sortBy === 'total' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-kitchen-muted/30">
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {order.id}
                      {order.recurring && order.recurring !== 'One-time' && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="ml-2 text-carbon-blue-60">
                                <Repeat className="h-4 w-4" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Recurring: {order.recurring}</p>
                              <p>Next: {format(order.nextOccurrence, 'MMM d, yyyy')}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {order.items.map((item, idx) => (
                        idx < 2 && (
                          <span key={idx} className="text-sm">
                            {item.item.name} ({item.quantity})
                          </span>
                        )
                      ))}
                      {order.items.length > 2 && (
                        <span className="text-sm text-carbon-blue-60">
                          +{order.items.length - 2} more
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`flex w-fit items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                    {order.status === 'Rejected' && order.rejectionReason && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-carbon-gray-70 ml-2" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Reason: {order.rejectionReason}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                  <TableCell>{format(order.scheduledDate, 'MMM d, yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{format(order.cutoffDate, 'MMM d, yyyy')}</span>
                      <span className="text-sm text-carbon-gray-70">{format(order.cutoffDate, 'h:mm a')}</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.requestor}</TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {order.status === 'Pending Confirmation' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-green-700 hover:bg-green-50 hover:text-green-800 px-2"
                            onClick={() => confirmOrder(order.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-700 hover:bg-red-50 hover:text-red-800 px-2"
                            onClick={() => rejectOrder(order.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-carbon-blue-60 hover:bg-carbon-blue-10 hover:text-carbon-blue-70 px-2"
                            onClick={() => editOrder(order.id)}
                          >
                            <PenLine className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {(order.status === 'Confirmed' || order.status === 'Scheduled') && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-carbon-blue-60 hover:bg-carbon-blue-10 hover:text-carbon-blue-70 px-2"
                            onClick={() => editOrder(order.id)}
                          >
                            <PenLine className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewOrder(order.id)}>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                      {order.status === 'Rejected' && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewOrder(order.id)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Reactivate</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <ScheduledOrderCalendar onViewOrder={handleViewOrder} />
      )}

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Upcoming Scheduled Orders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scheduledOrders
            .filter(order => order.status === 'Scheduled' || order.status === 'Confirmed')
            .slice(0, 3)
            .map(order => (
              <Card key={order.id} className="overflow-hidden">
                <div className={`h-1 ${order.status === 'Scheduled' ? 'bg-carbon-blue-60' : 'bg-green-500'}`} />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{order.id}</CardTitle>
                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex flex-col text-sm text-kitchen-muted-foreground mt-1">
                    <div>Supplier: {order.supplier}</div>
                    <div>Scheduled: {format(order.scheduledDate, 'MMM d, yyyy')}</div>
                    <div className="flex items-center">
                      <Repeat className="h-3.5 w-3.5 mr-1" /> 
                      {order.recurring}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="text-sm">
                    <div className="font-medium mb-1">Order Items</div>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-1">
                        <span>{item.item.name} ({item.quantity})</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 font-medium flex justify-between">
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-carbon-gray-5 justify-between pt-3 pb-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-carbon-blue-60 hover:bg-carbon-blue-10 hover:text-carbon-blue-70"
                    onClick={() => editOrder(order.id)}
                  >
                    <PenLine className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  {order.status === 'Scheduled' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-green-700 hover:bg-green-50 hover:text-green-800"
                      onClick={() => confirmOrder(order.id)}
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Confirm
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>

      {/* Create scheduled order dialog */}
      <CreateScheduledOrder 
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={() => {
          setIsCreateDialogOpen(false);
          // In a real app, we would fetch the updated orders list
        }}
      />
    </div>
  );
};

export default ScheduledOrders;
