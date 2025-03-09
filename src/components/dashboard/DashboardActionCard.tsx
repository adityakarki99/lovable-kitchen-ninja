
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action: string;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'primary';
}

const DashboardActionCard: React.FC<DashboardActionCardProps> = ({
  title,
  description,
  icon: Icon,
  action,
  onClick,
  className,
  variant = 'default',
}) => {
  return (
    <div 
      className={cn(
        "rounded-2xl shadow-apple-sm p-5 transition-all duration-300 hover:shadow-apple-md border",
        variant === 'primary' 
          ? "bg-gradient-to-br from-kitchen-primary/10 to-kitchen-primary/5 border-kitchen-primary/20" 
          : "bg-white border-kitchen-border",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "rounded-full p-2",
            variant === 'primary' 
              ? "bg-kitchen-primary/10 text-kitchen-primary" 
              : "bg-kitchen-muted text-kitchen-foreground"
          )}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-kitchen-muted-foreground">{description}</p>
          </div>
        </div>
        <Button 
          onClick={onClick} 
          className={cn(
            "mt-auto w-full",
            variant === 'primary' ? "bg-kitchen-primary hover:bg-kitchen-primary/90" : ""
          )}
        >
          {action}
        </Button>
      </div>
    </div>
  );
};

export default DashboardActionCard;
