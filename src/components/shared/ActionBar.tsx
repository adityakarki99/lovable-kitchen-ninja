
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ActionBarProps {
  children: ReactNode;
  className?: string;
  position?: 'top' | 'bottom';
  alignment?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

/**
 * A standardized action bar component for consistently positioning
 * action buttons and controls across the application
 */
const ActionBar: React.FC<ActionBarProps> = ({
  children,
  className,
  position = 'top',
  alignment = 'between',
  wrap = true,
}) => {
  const alignmentClasses = {
    'start': 'justify-start',
    'center': 'justify-center',
    'end': 'justify-end',
    'between': 'justify-between',
    'around': 'justify-around',
    'evenly': 'justify-evenly',
  };
  
  const positionClasses = {
    'top': 'mb-6',
    'bottom': 'mt-6',
  };
  
  return (
    <div 
      className={cn(
        'flex items-center gap-2',
        wrap ? 'flex-wrap' : 'flex-nowrap',
        alignmentClasses[alignment],
        positionClasses[position],
        className
      )}
    >
      {children}
    </div>
  );
};

export default ActionBar;
