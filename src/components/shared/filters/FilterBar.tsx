
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  children: ReactNode;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6",
      className
    )}>
      {children}
    </div>
  );
};

export default FilterBar;
