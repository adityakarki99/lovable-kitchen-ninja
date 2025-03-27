
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
  iconBgClassName?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
  iconClassName,
  iconBgClassName,
}) => {
  return (
    <Card className={cn("shadow-apple-sm", className)}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-kitchen-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && <p className="text-sm text-kitchen-muted-foreground mt-1">{description}</p>}
            {trend && (
              <p className={cn("text-sm mt-1", 
                trend.isPositive ? "text-kitchen-success" : "text-kitchen-danger"
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}% from last period
              </p>
            )}
          </div>
          {icon && (
            <div className={cn("rounded-full p-2", iconBgClassName || "bg-kitchen-muted")}>
              <div className={cn("h-5 w-5", iconClassName || "text-kitchen-muted-foreground")}>
                {icon}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
