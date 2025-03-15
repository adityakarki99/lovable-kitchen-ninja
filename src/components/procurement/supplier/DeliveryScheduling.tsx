
import React from 'react';
import { format } from 'date-fns';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, AlertCircle, ArrowUpRight, MessageSquare, FileText, RefreshCw, CheckCircle, Truck
} from 'lucide-react';
import { deliveries, getStatusColor } from './utils';
import { useToast } from '@/hooks/use-toast';

export const DeliveryScheduling: React.FC = () => {
  const { toast } = useToast();

  const handleUpdateDelivery = (deliveryId: string) => {
    toast({
      title: "Delivery updated",
      description: "The delivery schedule has been updated.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-carbon-blue-60" />
              Delivery Schedule
            </CardTitle>
            <CardDescription>
              View and manage upcoming and past deliveries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveries.map((delivery) => (
                <div 
                  key={delivery.id} 
                  className={`border p-4 rounded-md ${
                    delivery.status === 'In Transit' ? 'border-amber-400 bg-amber-50' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center">
                      <h3 className="font-medium">Delivery {delivery.id}</h3>
                      <Badge className={`ml-2 ${getStatusColor(delivery.status)}`}>
                        {delivery.status}
                      </Badge>
                    </div>
                    <span className="text-sm">
                      Order: {delivery.orderId}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-sm text-kitchen-muted-foreground mb-3">
                    <div>Supplier: {delivery.supplier}</div>
                    <div>
                      {delivery.status === 'Completed' ? 'Delivered' : 'Scheduled'}: {' '}
                      {format(delivery.scheduledDate, 'MMM d, yyyy')}
                      {delivery.status === 'Scheduled' && ' - Expected AM'}
                    </div>
                    {delivery.status === 'In Transit' && delivery.estimatedArrival && (
                      <div className="font-medium text-amber-800">
                        ETA: {format(delivery.estimatedArrival, 'h:mm a')}
                      </div>
                    )}
                  </div>
                  
                  {delivery.driver && (
                    <div className="text-sm mb-3">
                      <span className="text-kitchen-muted-foreground">Driver: </span>
                      {delivery.driver}
                    </div>
                  )}
                  
                  {delivery.notes && (
                    <div className="text-sm">
                      <span className="text-kitchen-muted-foreground">Notes: </span>
                      {delivery.notes}
                    </div>
                  )}
                  
                  {delivery.location && (
                    <div className="text-sm">
                      <span className="text-kitchen-muted-foreground">Status: </span>
                      {delivery.location}
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-end gap-2">
                    {delivery.status === 'Pending Confirmation' && (
                      <>
                        <Button variant="outline" size="sm">
                          Request Change
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-carbon-blue-60 hover:bg-carbon-blue-70"
                          onClick={() => handleUpdateDelivery(delivery.id)}
                        >
                          Confirm
                        </Button>
                      </>
                    )}
                    
                    {delivery.status === 'Scheduled' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUpdateDelivery(delivery.id)}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Reschedule
                      </Button>
                    )}
                    
                    {delivery.status === 'In Transit' && (
                      <Button 
                        size="sm" 
                        className="bg-carbon-blue-60 hover:bg-carbon-blue-70"
                      >
                        <Truck className="mr-2 h-4 w-4" />
                        Track
                      </Button>
                    )}
                    
                    {delivery.status === 'Completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-4">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-carbon-blue-60" />
                Delivery Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Fresh Foods</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Premium Meats</span>
                  <span className="text-sm font-medium">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Global Spices</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-carbon-blue-60" />
                Delivery Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-b pb-2">
                <div className="flex items-center">
                  <Badge className="bg-amber-500 mr-2">Delay</Badge>
                  <h3 className="font-medium">Fresh Foods</h3>
                </div>
                <p className="text-sm text-kitchen-muted-foreground mt-1">
                  Delivery may be delayed due to traffic
                </p>
              </div>
              <div>
                <div className="flex items-center">
                  <Badge className="bg-carbon-blue-60 mr-2">Weather</Badge>
                  <h3 className="font-medium">Thursday Deliveries</h3>
                </div>
                <p className="text-sm text-kitchen-muted-foreground mt-1">
                  Possible storm may affect deliveries
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <ArrowUpRight className="h-5 w-5 mr-2 text-carbon-blue-60" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Delivery
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Delivery Driver
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Generate Delivery Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
