
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, TrendingUp, DollarSign, AlertCircle, FileBarChart, ChefHat, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const OwnerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const financialMetrics = [
    {
      title: "Monthly Revenue",
      value: "$142,384",
      change: "+4.6%",
      isPositive: true,
      icon: DollarSign
    },
    {
      title: "Food Cost %",
      value: "28.4%",
      change: "-1.2%",
      isPositive: true,
      icon: BarChart3
    },
    {
      title: "Labor Cost %",
      value: "32.1%",
      change: "+0.8%",
      isPositive: false,
      icon: TrendingUp
    },
    {
      title: "Profit Margin",
      value: "15.2%",
      change: "+2.1%",
      isPositive: true,
      icon: TrendingUp
    }
  ];

  const topPerformingItems = [
    { name: "Signature Steak", revenue: "$5,280", profit: "$2,112", margin: "40%" },
    { name: "Truffle Pasta", revenue: "$4,750", profit: "$2,375", margin: "50%" },
    { name: "Seafood Platter", revenue: "$4,200", profit: "$1,680", margin: "40%" }
  ];

  const lowPerformingItems = [
    { name: "Garden Salad", revenue: "$1,200", profit: "$240", margin: "20%" },
    { name: "House Soup", revenue: "$980", profit: "$196", margin: "20%" }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialMetrics.map((metric, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-kitchen-muted-foreground">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                  <p className={cn(
                    "text-xs font-medium mt-1 flex items-center",
                    metric.isPositive ? "text-kitchen-success" : "text-kitchen-danger"
                  )}>
                    {metric.change}
                    <span className="ml-1">vs last month</span>
                  </p>
                </div>
                <div className={cn(
                  "rounded-full p-2",
                  metric.isPositive ? "bg-kitchen-success/10" : "bg-kitchen-danger/10"
                )}>
                  <metric.icon className={cn(
                    "h-5 w-5",
                    metric.isPositive ? "text-kitchen-success" : "text-kitchen-danger"
                  )} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profit & Loss Summary</CardTitle>
            <CardDescription>Monthly financial performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Revenue</span>
                  <span className="text-sm font-medium">$142,384</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Food Cost</span>
                  <span className="text-sm font-medium">$40,437 (28.4%)</span>
                </div>
                <Progress value={28.4} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Labor Cost</span>
                  <span className="text-sm font-medium">$45,705 (32.1%)</span>
                </div>
                <Progress value={32.1} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overhead</span>
                  <span className="text-sm font-medium">$34,608 (24.3%)</span>
                </div>
                <Progress value={24.3} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold">Net Profit</span>
                  <span className="text-sm font-semibold">$21,634 (15.2%)</span>
                </div>
                <Progress value={15.2} className="h-2 bg-kitchen-muted/50" indicatorColor="bg-kitchen-success" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={() => navigate('/financial')}>
              View Detailed Reports
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-kitchen-success" />
                <span>Top Performing Menu Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingItems.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <Badge variant="outline" className="text-kitchen-success bg-kitchen-success/5">
                        {item.margin}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-kitchen-muted-foreground mt-1">
                      <span>Revenue: {item.revenue}</span>
                      <span>Profit: {item.profit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-kitchen-danger" />
                <span>Low Performing Menu Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowPerformingItems.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <Badge variant="outline" className="text-kitchen-danger bg-kitchen-danger/5">
                        {item.margin}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-kitchen-muted-foreground mt-1">
                      <span>Revenue: {item.revenue}</span>
                      <span>Profit: {item.profit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <FileBarChart className="h-5 w-5 text-kitchen-primary" />
              <span>Monthly Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full mb-2" onClick={() => navigate('/financial')}>
              P&L Statement
            </Button>
            <Button variant="outline" className="w-full mb-2" onClick={() => navigate('/financial')}>
              Food Cost Analysis
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/financial')}>
              Labor Cost Report
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-kitchen-primary" />
              <span>Menu Engineering</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-kitchen-primary hover:bg-kitchen-primary/90" onClick={() => navigate('/recipes')}>
              Optimize Menu
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-kitchen-primary" />
              <span>Scheduling</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" onClick={() => navigate('#')}>
              Staff Scheduling
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;
