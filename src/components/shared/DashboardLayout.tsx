
import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className={`space-y-8 animate-fade-in pb-12 ${className}`}>
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        {description && <p className="text-kitchen-muted-foreground mt-1">{description}</p>}
      </div>
      
      {children}
    </div>
  );
};

export default DashboardLayout;
