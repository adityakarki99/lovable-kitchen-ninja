
import React from 'react';
import { format } from 'date-fns';
import { 
  Card, CardContent, CardHeader, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, Plus, FileText, PenLine, CheckCircle, Truck, MessageSquare
} from 'lucide-react';
import { orderData, getStatusColor, getStatusIcon } from './utils';
import { useToast } from '@/hooks/use-toast';

export const OrderManagement: React.FC = () => {
  const { toast } = useToast();
  
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-9 bg-white border-kitchen-border"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-kitchen-foreground">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button 
            size="sm" 
            className="bg-kitchen-primary hover:bg-kitchen-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {orderData.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <div className={`h-1 ${
              order.status === 'Pending Confirmation' ? 'bg-carbon-gray-50' :
              order.status === 'Confirmed' ? 'bg-carbon-blue-60' :
              order.status === 'In Transit' ? 'bg-amber-500' :
              'bg-green-500'
            }`} />
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">Order {order.id}</h3>
                  {order.urgency === 'High' && (
                    <Badge className="ml-2 bg-carbon-red-50">Urgent</Badge>
                  )}
                </div>
                <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 mt-1 text-sm text-kitchen-muted-foreground">
                <div>Supplier: {order.supplier}</div>
                <div>Ordered: {format(order.createdAt, 'MMM d, yyyy')}</div>
                <div>Delivery: {format(order.deliveryDate, 'MMM d, yyyy')}</div>
                <div className="font-medium text-kitchen-foreground">Total: ${order.total.toFixed(2)}</div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="border rounded-md">
                <div className="bg-kitchen-muted px-4 py-2 text-sm font-medium border-b">
                  Order Items
                </div>
                <div className="divide-y">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="px-4 py-3 flex justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-kitchen-muted-foreground">Quantity: {item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div>${item.price.toFixed(2)}</div>
                        <div className="text-sm text-kitchen-muted-foreground">
                          ${(item.price * parseInt(item.quantity)).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                View Details
              </Button>
              
              {order.status === 'Pending Confirmation' && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <PenLine className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" className="bg-carbon-blue-60 hover:bg-carbon-blue-70">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirm
                  </Button>
                </div>
              )}
              
              {order.status === 'Confirmed' && (
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                  <Truck className="mr-2 h-4 w-4" />
                  Track
                </Button>
              )}
              
              {order.status === 'In Transit' && (
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Receive
                </Button>
              )}
              
              {order.status === 'Delivered' && (
                <Button variant="outline" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Supplier
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
