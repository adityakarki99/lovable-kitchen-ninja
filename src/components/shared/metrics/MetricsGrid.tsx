
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import MetricsCard from './MetricsCard';

interface MetricItem {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconClassName?: string;
  iconBgClassName?: string;
}

interface MetricsGridProps {
  metrics: MetricItem[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

/**
 * A reusable grid component for displaying metric cards
 * with consistent layout and styling
 */
const MetricsGrid: React.FC<MetricsGridProps> = ({
  metrics,
  className,
  columns = 4
}) => {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
  }[columns];
  
  return (
    <div className={cn(`grid ${gridClass} gap-4`, className)}>
      {metrics.map((metric, index) => (
        <MetricsCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          description={metric.description}
          trend={metric.trend}
          iconClassName={metric.iconClassName}
          iconBgClassName={metric.iconBgClassName}
        />
      ))}
    </div>
  );
};

export default MetricsGrid;
