
import React from 'react';
import { ChefHat, AlertTriangle, ShoppingCart, DollarSign } from 'lucide-react';
import MetricsCard from '@/components/shared/metrics/MetricsCard';
import MetricsCardGrid from '@/components/shared/metrics/MetricsCardGrid';

const DashboardMetrics: React.FC = () => {
  return (
    <MetricsCardGrid className="animate-slide-up">
      <MetricsCard
        title="Total Recipes"
        value="125"
        description="5 new this week"
        icon={<ChefHat />}
        trend={{ value: 4, isPositive: true }}
        className="bg-gradient-to-br from-kitchen-primary/10 to-kitchen-primary/5 border-kitchen-primary/20"
      />
      
      <MetricsCard
        title="Low Stock Alerts"
        value="3"
        description="Tomatoes (5kg remaining)"
        icon={<AlertTriangle />}
        className="bg-gradient-to-br from-kitchen-warning/10 to-kitchen-warning/5 border-kitchen-warning/20"
      />
      
      <MetricsCard
        title="Pending Purchase Orders"
        value="15"
        description="4 awaiting approval"
        icon={<ShoppingCart />}
        trend={{ value: 20, isPositive: true }}
        className="bg-gradient-to-br from-kitchen-success/10 to-kitchen-success/5 border-kitchen-success/20"
      />
      
      <MetricsCard
        title="Budget Remaining"
        value="$61,529.68"
        description="Under monthly target"
        icon={<DollarSign />}
        trend={{ value: 8, isPositive: false }}
        className="bg-gradient-to-br from-kitchen-danger/10 to-kitchen-danger/5 border-kitchen-danger/20"
      />
    </MetricsCardGrid>
  );
};

export default DashboardMetrics;
