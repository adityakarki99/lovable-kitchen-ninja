
import React from 'react';
import { format } from 'date-fns';
import { 
  Card, CardContent, CardHeader, CardTitle, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, MessageSquare, Truck, BarChart3, AlertCircle, ArrowUpRight
} from 'lucide-react';
import { orderData, messages, deliveries, getStatusColor, getStatusIcon } from './utils';

export const DashboardSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-5 w-5 mr-2 text-carbon-blue-60" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orderData.slice(0, 3).map((order, index) => (
              <div key={order.id} className="flex items-start border-b last:border-0 pb-3 last:pb-0">
                <div className={`p-2 rounded-full mr-3 ${getStatusColor(order.status)} bg-opacity-20`}>
                  {getStatusIcon(order.status)}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">Order {order.id}</h3>
                    <span className="text-sm text-kitchen-muted-foreground">
                      {format(order.createdAt, 'MMM d, h:mm a')}
                    </span>
                  </div>
                  <p className="text-sm text-kitchen-muted-foreground">
                    {order.status} - {order.supplier}
                  </p>
                  <p className="text-sm mt-1">
                    {order.items.length} items · ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-carbon-blue-60" />
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {messages.slice(0, 2).map((conversation) => (
                <div key={conversation.id} className="border-b last:border-0 pb-2 last:pb-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{conversation.supplier}</h3>
                    {conversation.unread > 0 && (
                      <Badge className="bg-carbon-blue-60">{conversation.unread}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-kitchen-muted-foreground truncate">
                    {conversation.topic}
                  </p>
                  <p className="text-sm mt-1 truncate">
                    {conversation.messages[conversation.messages.length - 1].content}
                  </p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
              >
                Open Communication Hub
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Truck className="h-5 w-5 mr-2 text-carbon-blue-60" />
                Upcoming Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {deliveries.filter(d => ['Scheduled', 'In Transit'].includes(d.status)).slice(0, 2).map((delivery) => (
                <div key={delivery.id} className="border-b last:border-0 pb-2 last:pb-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{delivery.supplier}</h3>
                    <Badge className={getStatusColor(delivery.status)}>
                      {delivery.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-kitchen-muted-foreground">
                    Order {delivery.orderId}
                  </p>
                  <p className="text-sm mt-1">
                    {format(delivery.scheduledDate, 'MMM d, yyyy')}
                    {delivery.status === 'In Transit' && delivery.estimatedArrival && (
                      <span> · ETA: {format(delivery.estimatedArrival, 'h:mm a')}</span>
                    )}
                  </p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
              >
                View All Deliveries
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="md:col-span-4 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-carbon-blue-60" />
              Supplier Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">On-Time Delivery</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Order Accuracy</span>
                <span className="text-sm font-medium">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Response Time</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-carbon-blue-60" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border-b pb-2">
              <div className="flex items-center">
                <Badge className="bg-carbon-red-50 mr-2">Urgent</Badge>
                <h3 className="font-medium">Confirm PO-4201</h3>
              </div>
              <p className="text-sm text-kitchen-muted-foreground mt-1">
                Fresh Foods needs confirmation
              </p>
            </div>
            <div>
              <div className="flex items-center">
                <Badge className="bg-amber-500 mr-2">Review</Badge>
                <h3 className="font-medium">Price Update</h3>
              </div>
              <p className="text-sm text-kitchen-muted-foreground mt-1">
                Global Spices updated pricing
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" className="w-full bg-carbon-blue-60 hover:bg-carbon-blue-70">
              Take Action
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
