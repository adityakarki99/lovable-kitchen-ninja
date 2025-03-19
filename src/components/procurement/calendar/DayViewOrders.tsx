
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowRight, CalendarCheck, CalendarX, Repeat } from 'lucide-react';
import { format } from 'date-fns';
import { 
  ScheduledOrder,
  ScheduledOrderStatus
} from '@/data/procurement/scheduledOrders';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DayViewOrdersProps {
  date: Date;
  orders: ScheduledOrder[];
  onViewOrder: (orderId: string) => void;
}

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

export default function DayViewOrders({ date, orders, onViewOrder }: DayViewOrdersProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-10 text-carbon-gray-70">
        No orders scheduled for {format(date, 'MMMM d, yyyy')}
      </div>
    );
  }

  // Group orders by type (delivery or cutoff)
  const deliveryOrders = orders.filter(order => 
    format(order.scheduledDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );
  
  const cutoffOrders = orders.filter(order => 
    format(order.cutoffDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') &&
    !deliveryOrders.some(dOrder => dOrder.id === order.id)
  );

  return (
    <div className="space-y-6">
      {deliveryOrders.length > 0 && (
        <div>
          <h3 className="font-medium text-sm flex items-center mb-3 text-carbon-blue-60">
            <CalendarCheck className="mr-2 h-4 w-4" />
            Scheduled Deliveries
          </h3>
          <div className="space-y-3">
            {deliveryOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                isDelivery={true}
                onViewOrder={onViewOrder} 
              />
            ))}
          </div>
        </div>
      )}
      
      {cutoffOrders.length > 0 && (
        <div>
          <h3 className="font-medium text-sm flex items-center mb-3 text-amber-700">
            <CalendarX className="mr-2 h-4 w-4" />
            Cutoff Deadlines
          </h3>
          <div className="space-y-3">
            {cutoffOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                isDelivery={false}
                onViewOrder={onViewOrder} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface OrderCardProps {
  order: ScheduledOrder;
  isDelivery: boolean;
  onViewOrder: (orderId: string) => void;
}

function OrderCard({ order, isDelivery, onViewOrder }: OrderCardProps) {
  return (
    <Card className="p-3 hover:border-carbon-blue-60 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium mb-1 flex items-center">
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
                    {order.nextOccurrence && (
                      <p>Next: {format(order.nextOccurrence, 'MMM d, yyyy')}</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="text-sm">{order.supplier}</div>
        </div>
        <Badge className={`${getStatusColor(order.status)}`}>
          {order.status}
        </Badge>
      </div>
      
      <div className="mt-2 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-carbon-gray-70">
              {isDelivery ? 'Delivery:' : 'Cutoff:'}
            </span>
            <div>
              {format(isDelivery ? order.scheduledDate : order.cutoffDate, 'MMM d, yyyy')}
              {!isDelivery && (
                <span className="ml-1 text-carbon-gray-70">
                  {format(order.cutoffDate, 'h:mm a')}
                </span>
              )}
            </div>
          </div>
          <div>
            <span className="text-carbon-gray-70">Total:</span>
            <div>${order.total.toFixed(2)}</div>
          </div>
        </div>
        
        {order.items.length > 0 && (
          <div className="mt-2">
            <span className="text-carbon-gray-70">Items:</span>
            <div className="text-sm mt-1">
              {order.items.slice(0, 2).map((item, idx) => (
                <div key={idx} className="text-carbon-gray-100">
                  {item.item.name} ({item.quantity})
                </div>
              ))}
              {order.items.length > 2 && (
                <div className="text-carbon-blue-60">
                  +{order.items.length - 2} more
                </div>
              )}
            </div>
          </div>
        )}
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
    </Card>
  );
}
