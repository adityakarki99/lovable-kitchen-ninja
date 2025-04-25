
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerContent?: ReactNode;
  headerActions?: ReactNode;
}

/**
 * A unified layout component that replaces both DashboardLayout and ModuleLayout
 * for consistent page structure throughout the application
 */
const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  description,
  children,
  className,
  headerContent,
  headerActions,
}) => {
  return (
    <div className={cn("space-y-8 animate-fade-in pb-12", className)}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          {description && <p className="text-kitchen-muted-foreground mt-1">{description}</p>}
          {headerContent}
        </div>
        
        {headerActions && (
          <div className="flex flex-wrap gap-2">
            {headerActions}
          </div>
        )}
      </div>
      
      {children}
    </div>
  );
};

export default AppLayout;
