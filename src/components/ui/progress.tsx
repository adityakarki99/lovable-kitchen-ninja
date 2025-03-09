
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant = 'default', ...props }, ref) => {
  // Determine indicator color based on variant or value
  let indicatorClass = "bg-primary"; // default color
  
  if (variant === 'success') {
    indicatorClass = "bg-kitchen-success";
  } else if (variant === 'warning') {
    indicatorClass = "bg-kitchen-warning";
  } else if (variant === 'danger') {
    indicatorClass = "bg-kitchen-danger";
  } else if (variant === 'default' && value !== undefined) {
    // If no variant specified, use value-based coloring
    if (value >= 80) {
      indicatorClass = "bg-kitchen-success";
    } else if (value >= 50) {
      indicatorClass = "bg-kitchen-warning";
    } else if (value < 50) {
      indicatorClass = "bg-kitchen-danger";
    }
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all", indicatorClass)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
