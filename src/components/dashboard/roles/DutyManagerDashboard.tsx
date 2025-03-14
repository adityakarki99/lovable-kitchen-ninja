
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ClipboardList, AlertTriangle, Users, CalendarClock, Clock, PackageCheck, Truck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const DutyManagerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const pendingTasks = [
    {
      title: "Weekly Stocktake",
      description: "Due today",
      status: "urgent",
      icon: ClipboardList
    },
    {
      title: "Approve Purchase Orders",
      description: "3 orders pending",
      status: "normal",
      icon: ShoppingBag
    },
    {
      title: "Staff Shift Handover",
      description: "2 hours remaining",
      status: "normal",
      icon: Users
    }
  ];

  const stockAlerts = [
    { item: "Ribeye Steak", remaining: "2kg", par: "10kg", status: "critical" },
    { item: "Fresh Salmon", remaining: "3kg", par: "8kg", status: "critical" },
    { item: "White Wine", remaining: "4 bottles", par: "12 bottles", status: "warning" }
  ];

  const upcomingDeliveries = [
    { supplier: "Seafood Direct", items: 12, time: "Today, 2:00 PM", status: "on-time" },
    { supplier: "Fresh Produce Co.", items: 24, time: "Tomorrow, 9:00 AM", status: "on-time" },
    { supplier: "Premium Meats", items: 8, time: "Tomorrow, 11:30 AM", status: "pending" }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Pending Tasks</p>
                <h3 className="text-2xl font-bold mt-1">8</h3>
                <p className="text-xs text-kitchen-muted-foreground mt-1">3 urgent, 5 normal</p>
              </div>
              <div className="rounded-full p-2 bg-kitchen-warning/10">
                <ClipboardList className="h-5 w-5 text-kitchen-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Low Stock Alerts</p>
                <h3 className="text-2xl font-bold mt-1">3</h3>
                <p className="text-xs text-kitchen-muted-foreground mt-1">2 critical, 1 warning</p>
              </div>
              <div className="rounded-full p-2 bg-kitchen-danger/10">
                <AlertTriangle className="h-5 w-5 text-kitchen-danger" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Staff On Shift</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
                <p className="text-xs text-kitchen-muted-foreground mt-1">4 kitchen, 8 FOH</p>
              </div>
              <div className="rounded-full p-2 bg-kitchen-primary/10">
                <Users className="h-5 w-5 text-kitchen-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Upcoming Deliveries</p>
                <h3 className="text-2xl font-bold mt-1">3</h3>
                <p className="text-xs text-kitchen-muted-foreground mt-1">First due at 2:00 PM</p>
              </div>
              <div className="rounded-full p-2 bg-kitchen-success/10">
                <Truck className="h-5 w-5 text-kitchen-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>Urgent tasks requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((task, index) => (
                <div key={index} className={cn(
                  "p-4 border rounded-lg",
                  task.status === "urgent" ? "border-kitchen-danger/30 bg-kitchen-danger/5" : "border-kitchen-border"
                )}>
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "rounded-full p-2 mt-1",
                      task.status === "urgent" ? "bg-kitchen-danger/10" : "bg-kitchen-muted"
                    )}>
                      <task.icon className={cn(
                        "h-4 w-4",
                        task.status === "urgent" ? "text-kitchen-danger" : "text-kitchen-primary"
                      )} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{task.title}</h3>
                        {task.status === "urgent" && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                      </div>
                      <p className="text-sm text-kitchen-muted-foreground mt-1">{task.description}</p>
                      <Button variant="link" className="text-kitchen-primary p-0 h-auto mt-2" size="sm">
                        Complete Task
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Tasks
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>Items below minimum stock level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockAlerts.map((alert, index) => (
                <div key={index} className={cn(
                  "p-4 border rounded-lg",
                  alert.status === "critical" ? "border-kitchen-danger/30 bg-kitchen-danger/5" : "border-kitchen-warning/30 bg-kitchen-warning/5"
                )}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{alert.item}</h3>
                    <Badge variant={alert.status === "critical" ? "destructive" : "outline"} className={
                      alert.status === "critical" ? "" : "text-kitchen-warning"
                    }>
                      {alert.status === "critical" ? "Critical" : "Warning"}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-kitchen-muted-foreground mt-2">
                    <span>Remaining: {alert.remaining}</span>
                    <span>PAR: {alert.par}</span>
                  </div>
                  <Button variant="link" className="text-kitchen-primary p-0 h-auto mt-2" size="sm" onClick={() => navigate('/procurement')}>
                    Create Order
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/inventory')}>
              View All Stock
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Deliveries</CardTitle>
            <CardDescription>Expected supplier deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeliveries.map((delivery, index) => (
                <div key={index} className="p-4 border rounded-lg border-kitchen-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{delivery.supplier}</h3>
                    <Badge variant="outline" className="text-kitchen-success">
                      {delivery.status === "on-time" ? "On Time" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-kitchen-muted-foreground mt-2">
                    <span>{delivery.items} items</span>
                    <span>{delivery.time}</span>
                  </div>
                  <Button variant="link" className="text-kitchen-primary p-0 h-auto mt-2" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Deliveries
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-kitchen-primary" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full mb-2 bg-kitchen-primary hover:bg-kitchen-primary/90" onClick={() => navigate('/inventory')}>
              Start Stocktake
            </Button>
            <Button className="w-full" variant="outline" onClick={() => navigate('/procurement')}>
              Create Purchase Order
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-kitchen-primary" />
              <span>Shift Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Staff Handover
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-kitchen-primary" />
              <span>Inventory</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={() => navigate('/inventory')}>
              Review Stock Levels
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DutyManagerDashboard;
