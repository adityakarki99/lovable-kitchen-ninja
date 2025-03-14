import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ClipboardList, 
  Calendar, 
  BarChart3, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  CalendarDays, 
  PackageCheck, 
  ArrowUpRight, 
  CalendarClock, 
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stocktakeStats = {
  completedThisMonth: 8,
  scheduledThisMonth: 12,
  stockAccuracy: 96.5,
  averageDuration: '1h 45m',
  lastCompleted: '2025-03-15',
  nextScheduled: '2025-03-22',
  variances: {
    underCount: '$345.20',
    overCount: '$125.80',
    netVariance: '-$219.40'
  }
};

const upcomingStocktakes = [
  {
    id: 1,
    name: 'Weekly Fridge Count',
    dueDate: '2025-03-22',
    type: 'recurring',
    itemCount: 45,
    priority: 'high',
    assignee: 'John Smith'
  },
  {
    id: 2,
    name: 'Monthly Dry Goods',
    dueDate: '2025-03-31',
    type: 'recurring',
    itemCount: 120,
    priority: 'medium',
    assignee: 'Emma Johnson'
  },
  {
    id: 3,
    name: 'Bar Inventory',
    dueDate: '2025-03-24',
    type: 'recurring',
    itemCount: 35,
    priority: 'medium',
    assignee: 'Michael Davis'
  }
];

const recentStocktakes = [
  {
    id: 101,
    name: 'Weekly Fridge Count',
    completedDate: '2025-03-15',
    duration: '1h 30m',
    accuracy: 97.2,
    variance: '-$85.40',
    conductedBy: 'John Smith'
  },
  {
    id: 102,
    name: 'Bar Inventory',
    completedDate: '2025-03-17',
    duration: '45m',
    accuracy: 99.1,
    variance: '+$12.25',
    conductedBy: 'Sarah Williams'
  },
  {
    id: 103,
    name: 'Freezer Inventory',
    completedDate: '2025-03-14',
    duration: '1h 15m',
    accuracy: 95.8,
    variance: '-$145.60',
    conductedBy: 'Emma Johnson'
  }
];

const highVarianceItems = [
  {
    id: 201,
    name: 'Ribeye Steak',
    category: 'Meat',
    location: 'Walk-in Cooler',
    expected: '15 kg',
    actual: '12.2 kg',
    variance: '-2.8 kg',
    value: '-$112.00'
  },
  {
    id: 202,
    name: 'Premium Vodka',
    category: 'Spirits',
    location: 'Bar',
    expected: '4 bottles',
    actual: '2 bottles',
    variance: '-2 bottles',
    value: '-$85.90'
  },
  {
    id: 203,
    name: 'Fresh Lobster',
    category: 'Seafood',
    location: 'Walk-in Cooler',
    expected: '5 kg',
    actual: '4.2 kg',
    variance: '-0.8 kg',
    value: '-$76.00'
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const getDaysRemaining = (dateString: string) => {
  const dueDate = new Date(dateString);
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const StockTakeStatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType; 
  description?: string; 
  trend?: 'up' | 'down' | 'neutral';
}) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-kitchen-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && <p className="text-sm text-kitchen-muted-foreground mt-1">{description}</p>}
          </div>
          <div className={cn(
            "rounded-full p-2",
            trend === 'up' ? "bg-kitchen-success/10" : 
            trend === 'down' ? "bg-kitchen-danger/10" : 
            "bg-kitchen-muted"
          )}>
            <Icon className={cn(
              "h-5 w-5",
              trend === 'up' ? "text-kitchen-success" : 
              trend === 'down' ? "text-kitchen-danger" : 
              "text-kitchen-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StocktakeHub: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Stocktake Hub</h2>
          <p className="text-kitchen-muted-foreground mt-1">
            Centralized dashboard for managing inventory counts and analyzing variances
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </Button>
          <Button className="bg-kitchen-primary hover:bg-kitchen-primary/90 flex items-center gap-1">
            <ClipboardList className="h-4 w-4" />
            <span>New Stocktake</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StockTakeStatCard
          title="Stocktake Completion"
          value={`${stocktakeStats.completedThisMonth}/${stocktakeStats.scheduledThisMonth}`}
          description="Stocktakes this month"
          icon={CheckCircle2}
          trend="up"
        />
        <StockTakeStatCard
          title="Stock Accuracy"
          value={`${stocktakeStats.stockAccuracy}%`}
          description="Based on last stocktake"
          icon={BarChart3}
          trend={stocktakeStats.stockAccuracy > 95 ? "up" : "down"}
        />
        <StockTakeStatCard
          title="Net Variance"
          value={stocktakeStats.variances.netVariance}
          description="From completed stocktakes"
          icon={TrendingDown}
          trend={stocktakeStats.variances.netVariance.startsWith('-') ? "down" : "up"}
        />
        <StockTakeStatCard
          title="Average Duration"
          value={stocktakeStats.averageDuration}
          description="Per stocktake session"
          icon={Clock}
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Upcoming Stocktakes</CardTitle>
                <Badge variant="outline" className="text-kitchen-primary">
                  {upcomingStocktakes.length} scheduled
                </Badge>
              </div>
              <CardDescription>Scheduled inventory counts for the next 14 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingStocktakes.map(stocktake => {
                const daysRemaining = getDaysRemaining(stocktake.dueDate);
                return (
                  <div 
                    key={stocktake.id}
                    className="p-4 border rounded-md transition-all border-kitchen-border hover:border-kitchen-primary/50 hover:bg-kitchen-muted/10"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{stocktake.name}</h3>
                      <Badge 
                        className={cn(
                          daysRemaining <= 2 ? "bg-kitchen-danger/10 text-kitchen-danger" :
                          daysRemaining <= 5 ? "bg-kitchen-warning/10 text-kitchen-warning" :
                          "bg-kitchen-primary/10 text-kitchen-primary"
                        )}
                      >
                        {daysRemaining <= 0 ? "Due today" : `Due in ${daysRemaining} days`}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-kitchen-muted-foreground">
                      <div className="flex justify-between">
                        <span>Items to count:</span>
                        <span className="font-medium">{stocktake.itemCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assigned to:</span>
                        <span className="font-medium">{stocktake.assignee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Due date:</span>
                        <span className="font-medium">{formatDate(stocktake.dueDate)}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-kitchen-primary hover:text-kitchen-primary/90 hover:bg-kitchen-primary/10 flex items-center gap-1"
                      >
                        Start now
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("#")}>
                View All Scheduled Stocktakes
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Recent Stocktakes</CardTitle>
                <Button variant="ghost" size="sm" className="text-kitchen-primary flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>View All</span>
                </Button>
              </div>
              <CardDescription>Latest completed inventory counts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-kitchen-muted">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Stocktake Name</th>
                      <th className="text-left py-3 px-4 font-medium">Completed</th>
                      <th className="text-center py-3 px-4 font-medium">Duration</th>
                      <th className="text-center py-3 px-4 font-medium">Accuracy</th>
                      <th className="text-right py-3 px-4 font-medium">Variance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentStocktakes.map(stocktake => (
                      <tr key={stocktake.id} className="border-t hover:bg-kitchen-muted/10">
                        <td className="py-3 px-4 font-medium">{stocktake.name}</td>
                        <td className="py-3 px-4">{formatDate(stocktake.completedDate)}</td>
                        <td className="py-3 px-4 text-center">{stocktake.duration}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Progress 
                              value={stocktake.accuracy} 
                              className="h-2 w-24" 
                              indicatorColor={
                                stocktake.accuracy >= 95 ? "bg-kitchen-success" :
                                stocktake.accuracy >= 90 ? "bg-kitchen-warning" :
                                "bg-kitchen-danger"
                              }
                            />
                            <span className="text-sm">{stocktake.accuracy}%</span>
                          </div>
                        </td>
                        <td className={cn(
                          "py-3 px-4 text-right font-medium",
                          stocktake.variance.startsWith('-') ? "text-kitchen-danger" : "text-kitchen-success"
                        )}>
                          {stocktake.variance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">High Variance Items</CardTitle>
                <Badge variant="outline" className="text-kitchen-danger">
                  Requires attention
                </Badge>
              </div>
              <CardDescription>Items with significant discrepancies in the last count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-kitchen-muted">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Item Name</th>
                      <th className="text-left py-3 px-4 font-medium">Location</th>
                      <th className="text-center py-3 px-4 font-medium">Expected</th>
                      <th className="text-center py-3 px-4 font-medium">Actual</th>
                      <th className="text-right py-3 px-4 font-medium">Variance</th>
                      <th className="text-right py-3 px-4 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {highVarianceItems.map(item => (
                      <tr key={item.id} className="border-t hover:bg-kitchen-muted/10">
                        <td className="py-3 px-4 font-medium">{item.name}</td>
                        <td className="py-3 px-4">{item.location}</td>
                        <td className="py-3 px-4 text-center">{item.expected}</td>
                        <td className="py-3 px-4 text-center">{item.actual}</td>
                        <td className="py-3 px-4 text-right font-medium text-kitchen-danger">
                          {item.variance}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-kitchen-danger">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center gap-2 text-kitchen-muted-foreground">
                  <AlertCircle className="h-4 w-4 text-kitchen-warning" />
                  <span className="text-sm">These items require investigation for potential loss or theft</span>
                </div>
                <Button size="sm" className="bg-kitchen-primary hover:bg-kitchen-primary/90">
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-kitchen-primary/5 border-kitchen-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-kitchen-primary" />
              <span>Next Stocktake</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium text-lg mb-1">Weekly Fridge Count</h3>
            <p className="text-sm text-kitchen-muted-foreground mb-3">
              Due on {formatDate(upcomingStocktakes[0].dueDate)}
            </p>
            <Button size="sm" className="w-full bg-kitchen-primary hover:bg-kitchen-primary/90">
              Start Now
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-kitchen-muted/20 border-kitchen-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-kitchen-muted-foreground" />
              <span>Last Completed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium text-lg mb-1">{recentStocktakes[0].name}</h3>
            <p className="text-sm text-kitchen-muted-foreground mb-3">
              Completed on {formatDate(recentStocktakes[0].completedDate)}
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Report
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-kitchen-warning/5 border-kitchen-warning/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-kitchen-warning" />
              <span>Urgent Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium text-lg mb-1">3 High Variance Items</h3>
            <p className="text-sm text-kitchen-muted-foreground mb-3">
              Require investigation and reconciliation
            </p>
            <Button variant="outline" size="sm" className="w-full text-kitchen-warning border-kitchen-warning/20">
              Reconcile Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StocktakeHub;
