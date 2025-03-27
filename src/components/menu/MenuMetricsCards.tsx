
import React from 'react';
import { DollarSign, TrendingUp, Utensils, Clock } from 'lucide-react';
import MetricsCard from '@/components/shared/metrics/MetricsCard';
import MetricsCardGrid from '@/components/shared/metrics/MetricsCardGrid';

const MenuMetricsCards: React.FC = () => {
  return (
    <MetricsCardGrid>
      <MetricsCard
        title="Average Profit Margin"
        value="65%"
        description="+3% from last month"
        icon={<DollarSign />}
        iconBgClassName="bg-kitchen-success/10"
        iconClassName="text-kitchen-success"
      />
      
      <MetricsCard
        title="Top Selling Item"
        value="Fish & Chips"
        description="250 orders this week"
        icon={<TrendingUp />}
        iconBgClassName="bg-kitchen-primary/10"
        iconClassName="text-kitchen-primary"
      />
      
      <MetricsCard
        title="Star Performers"
        value="6"
        description="Out of 45 menu items"
        icon={<Utensils />}
        iconBgClassName="bg-yellow-100"
        iconClassName="text-yellow-500"
      />
      
      <MetricsCard
        title="Peak Order Time"
        value="7-9 PM"
        description="35% of daily orders"
        icon={<Clock />}
        iconBgClassName="bg-kitchen-muted"
        iconClassName="text-kitchen-muted-foreground"
      />
    </MetricsCardGrid>
  );
};

export default MenuMetricsCards;
