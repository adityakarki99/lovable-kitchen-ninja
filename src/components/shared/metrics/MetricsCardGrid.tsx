
import React from 'react';
import { cn } from '@/lib/utils';

interface MetricsCardGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

const MetricsCardGrid: React.FC<MetricsCardGridProps> = ({
  children,
  columns = 4,
  className,
}) => {
  return (
    <div className={cn(
      "grid gap-4",
      columns === 4 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" :
      columns === 3 ? "grid-cols-1 md:grid-cols-3" :
      columns === 2 ? "grid-cols-1 md:grid-cols-2" :
      "grid-cols-1",
      className
    )}>
      {children}
    </div>
  );
};

export default MetricsCardGrid;
