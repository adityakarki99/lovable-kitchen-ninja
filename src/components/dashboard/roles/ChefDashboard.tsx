
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChefHat, 
  UtensilsCrossed, 
  Soup, 
  ShoppingCart, 
  AlertTriangle, 
  ClipboardList, 
  PackageCheck, 
  BarChart3, 
  Clock 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const ChefDashboard: React.FC = () => {
  const navigate = useNavigate();

  const popularDishes = [
    { name: "Signature Steak", ordersToday: 28, preparationTime: "12 min", status: "excellent" },
    { name: "Truffle Pasta", ordersToday: 22, preparationTime: "8 min", status: "good" },
    { name: "Seafood Platter", ordersToday: 16, preparationTime: "18 min", status: "good" }
  ];

  const inventoryAlerts = [
    { item: "Ribeye Steak", remaining: "2kg", par: "10kg", status: "critical", kitchenImpact: "High" },
    { item: "Fresh Salmon", remaining: "3kg", par: "8kg", status: "critical", kitchenImpact: "High" },
    { item: "Fresh Herbs", remaining: "1 bunch", par: "5 bunches", status: "warning", kitchenImpact: "Medium" }
  ];

  const prepTasks = [
    { task: "Chop vegetables", assignedTo: "Sous Chef", status: "in-progress", completionPercentage: 65 },
    { task: "Prepare sauces", assignedTo: "Line Cook", status: "pending", completionPercentage: 0 },
    { task: "Portion protein", assignedTo: "You", status: "completed", completionPercentage: 100 }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Active Orders</p>
                <h3 className="text-2xl font-bold mt-1">14</h3>
                <p className="text-xs text-kitchen-muted-foreground mt-1">3 urgent, 11 normal</p>
              </div>
              <div className="rounded-full p-2 bg-kitchen-primary/10">
                <UtensilsCrossed className="h-5 w-5 text-kitchen-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Prep Completion</p>
                <h3 className="text-2xl font-bold mt-1">65%</h3>
                <p className="text-xs text-kitchen-muted-foreground mt-1">2 tasks remaining</p>
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
                <p className="text-sm font-medium text-kitchen-muted-foreground">Recipe Efficiency</p>
                <h3 className="text-2xl font-bold mt-1">92%</h3>
                <p className="text-xs text-kitchen-muted-foreground mt-1">+2% from last week</p>
              </div>
              <div className="rounded-full p-2 bg-kitchen-success/10">
                <ChefHat className="h-5 w-5 text-kitchen-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">Ingredient Alerts</p>
                <h3 className="text-2xl font-bold mt-1">3</h3>
                <p className="text-xs text-kitchen-muted-foreground mt-1">2 critical, 1 warning</p>
              </div>
              <div className="rounded-full p-2 bg-kitchen-danger/10">
                <AlertTriangle className="h-5 w-5 text-kitchen-danger" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Popular Dishes Today</CardTitle>
            <CardDescription>Most ordered items requiring preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularDishes.map((dish, index) => (
                <div key={index} className="p-4 border rounded-lg border-kitchen-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{dish.name}</h3>
                    <Badge className={cn(
                      dish.status === "excellent" ? "bg-kitchen-success" : "bg-kitchen-primary"
                    )}>
                      {dish.ordersToday} orders
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-kitchen-muted-foreground mt-2">
                    <span>Prep time: {dish.preparationTime}</span>
                  </div>
                  <Button variant="link" className="text-kitchen-primary p-0 h-auto mt-2" size="sm" onClick={() => navigate('/recipes')}>
                    View Recipe
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full" 
              onClick={() => navigate('/recipes')}
            >
              View All Recipes
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Inventory Alerts</CardTitle>
            <CardDescription>Low stock items affecting kitchen operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryAlerts.map((alert, index) => (
                <div key={index} className={cn(
                  "p-4 border rounded-lg",
                  alert.status === "critical" ? "border-kitchen-danger/30 bg-kitchen-danger/5" : "border-kitchen-warning/30 bg-kitchen-warning/5"
                )}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{alert.item}</h3>
                    <Badge variant={alert.status === "critical" ? "destructive" : "outline"} className={
                      alert.status === "critical" ? "" : "text-kitchen-warning"
                    }>
                      {alert.kitchenImpact} Impact
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-kitchen-muted-foreground mt-2">
                    <span>Remaining: {alert.remaining}</span>
                    <span>PAR: {alert.par}</span>
                  </div>
                  <Button 
                    variant="link" 
                    className="text-kitchen-primary p-0 h-auto mt-2" 
                    size="sm"
                    onClick={() => navigate('/procurement')}
                  >
                    Request Order
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate('/inventory')}
            >
              View All Inventory
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Prep Tasks</CardTitle>
            <CardDescription>Kitchen preparation tasks status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prepTasks.map((task, index) => (
                <div key={index} className={cn(
                  "p-4 border rounded-lg border-kitchen-border",
                  task.status === "completed" ? "bg-kitchen-success/5" : ""
                )}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{task.task}</h3>
                    <Badge className={cn(
                      task.status === "completed" ? "bg-kitchen-success" :
                      task.status === "in-progress" ? "bg-kitchen-primary" :
                      "bg-kitchen-muted-foreground"
                    )}>
                      {task.status === "completed" ? "Complete" : 
                       task.status === "in-progress" ? "In Progress" : 
                       "Pending"}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-kitchen-muted-foreground mt-2">
                    <span>Assigned to: {task.assignedTo}</span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={task.completionPercentage} 
                      className="h-2"
                      indicatorColor={
                        task.status === "completed" ? "bg-kitchen-success" :
                        task.status === "in-progress" ? "bg-kitchen-primary" :
                        "bg-kitchen-muted-foreground"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Manage Prep Tasks
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-kitchen-primary" />
              <span>Recipe Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full mb-2 bg-kitchen-primary hover:bg-kitchen-primary/90"
              onClick={() => navigate('/recipes')}
            >
              Browse Recipes
            </Button>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => navigate('/recipes')}
            >
              Create New Recipe
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Soup className="h-5 w-5 text-kitchen-primary" />
              <span>Prep Lists</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full mb-2" variant="outline">
              View Today's Prep
            </Button>
            <Button className="w-full" variant="outline">
              Plan Tomorrow
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-kitchen-primary" />
              <span>Inventory</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full mb-2" 
              variant="outline"
              onClick={() => navigate('/inventory')}
            >
              Check Inventory
            </Button>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => navigate('/inventory')}
            >
              Request Items
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChefDashboard;
