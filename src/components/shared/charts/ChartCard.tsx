
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  children,
  className,
  contentClassName,
}) => {
  return (
    <Card className={cn("shadow-apple-sm", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && (
          <p className="text-sm text-kitchen-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className={cn("p-0", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
