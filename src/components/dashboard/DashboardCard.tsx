
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'danger' | 'success' | 'warning';
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  variant = 'default',
  className,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-br from-kitchen-primary/10 to-kitchen-primary/5 border-kitchen-primary/20';
      case 'danger':
        return 'bg-gradient-to-br from-kitchen-danger/10 to-kitchen-danger/5 border-kitchen-danger/20';
      case 'success':
        return 'bg-gradient-to-br from-kitchen-success/10 to-kitchen-success/5 border-kitchen-success/20';
      case 'warning':
        return 'bg-gradient-to-br from-kitchen-warning/10 to-kitchen-warning/5 border-kitchen-warning/20';
      default:
        return 'bg-white';
    }
  };

  return (
    <Card className={cn(
      "rounded-2xl shadow-apple-sm transition-all duration-300 hover:shadow-apple-md overflow-hidden border", 
      getVariantClasses(),
      className
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-kitchen-muted-foreground">{title}</CardTitle>
          {icon && <div className="text-kitchen-foreground opacity-70">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-2xl font-semibold">{value}</div>
          {(description || trend) && (
            <div className="flex items-center gap-2 text-xs">
              {trend && (
                <span className={cn(
                  "pill-badge",
                  trend.isPositive 
                    ? "bg-kitchen-success/10 text-kitchen-success" 
                    : "bg-kitchen-danger/10 text-kitchen-danger"
                )}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
              {description && (
                <span className="text-kitchen-muted-foreground">{description}</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
