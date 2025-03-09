
import React from 'react';
import { Star, Truck, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Mock data
const suppliers = [
  {
    id: 1,
    name: 'Fresh Produce Co.',
    rating: 4.8,
    timeliness: 95,
    accuracy: 98,
    costVariance: 2,
    lastDelivery: '2023-07-15',
    totalOrders: 156,
    status: 'Preferred',
  },
  {
    id: 2,
    name: 'Premium Meats',
    rating: 4.3,
    timeliness: 87,
    accuracy: 95,
    costVariance: 4,
    lastDelivery: '2023-07-14',
    totalOrders: 92,
    status: 'Approved',
  },
  {
    id: 3,
    name: 'Seafood Direct',
    rating: 3.9,
    timeliness: 75,
    accuracy: 90,
    costVariance: 7,
    lastDelivery: '2023-07-13',
    totalOrders: 48,
    status: 'Under Review',
  },
  {
    id: 4,
    name: 'Global Spices',
    rating: 4.6,
    timeliness: 92,
    accuracy: 99,
    costVariance: 1,
    lastDelivery: '2023-07-12',
    totalOrders: 71,
    status: 'Preferred',
  },
];

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend,
  className
}) => {
  return (
    <Card className={cn("h-full", className)}>
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
              "text-kitchen-muted-foreground"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SupplierCard: React.FC<{supplier: typeof suppliers[0]}> = ({ supplier }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Preferred':
        return "bg-kitchen-success/10 text-kitchen-success";
      case 'Approved':
        return "bg-kitchen-primary/10 text-kitchen-primary";
      case 'Under Review':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      default:
        return "bg-kitchen-muted text-kitchen-muted-foreground";
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold">{supplier.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 text-kitchen-warning fill-kitchen-warning" />
              <span className="text-sm">{supplier.rating}</span>
              <span className={cn(
                "pill-badge ml-2 text-xs",
                getStatusClass(supplier.status)
              )}>
                {supplier.status}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-kitchen-muted-foreground">Timeliness</span>
              <span className="font-medium">{supplier.timeliness}%</span>
            </div>
            <Progress value={supplier.timeliness} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-kitchen-muted-foreground">Order Accuracy</span>
              <span className="font-medium">{supplier.accuracy}%</span>
            </div>
            <Progress value={supplier.accuracy} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-kitchen-muted-foreground">Cost Variance</span>
              <span className={cn(
                "font-medium",
                supplier.costVariance > 5 ? "text-kitchen-danger" : 
                supplier.costVariance > 3 ? "text-kitchen-warning" : 
                "text-kitchen-success"
              )}>+{supplier.costVariance}%</span>
            </div>
            <Progress 
              value={20 * supplier.costVariance} 
              className={cn(
                "h-2",
                supplier.costVariance > 5 ? "bg-kitchen-danger/30" : 
                supplier.costVariance > 3 ? "bg-kitchen-warning/30" : 
                "bg-kitchen-success/30"
              )} 
            />
          </div>
        </div>

        <div className="flex justify-between text-sm mt-4 pt-4 border-t border-kitchen-border">
          <span className="text-kitchen-muted-foreground">Total Orders</span>
          <span className="font-medium">{supplier.totalOrders}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const SupplierPerformance: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-xl font-semibold">Supplier Performance</h2>
        <p className="text-kitchen-muted-foreground mt-1">Track and analyze supplier metrics and performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Supplier Rating"
          value="4.6"
          description="Average across all suppliers"
          icon={Star}
          trend="up"
        />
        <MetricCard
          title="Delivery Timeliness"
          value="91%"
          description="On-time deliveries"
          icon={Truck}
          trend="neutral"
        />
        <MetricCard
          title="Order Accuracy"
          value="95%"
          description="Error-free orders"
          icon={ShieldCheck}
          trend="up"
        />
        <MetricCard
          title="Cost Variance"
          value="+3.2%"
          description="Price increases flagged"
          icon={TrendingUp}
          trend="down"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="all">All Suppliers</TabsTrigger>
          <TabsTrigger value="preferred">Preferred</TabsTrigger>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {suppliers.map(supplier => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="preferred" className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {suppliers
              .filter(s => s.status === 'Preferred')
              .map(supplier => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="flagged" className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {suppliers
              .filter(s => s.status === 'Under Review')
              .map(supplier => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierPerformance;
