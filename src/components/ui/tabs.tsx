
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center border-b border-carbon-gray-20 bg-carbon-gray-10",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  variant?: 'default' | 'owner' | 'manager' | 'chef' | 'general';
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant = 'default', ...props }, ref) => {
  // Carbon Design System uses underlines for tabs rather than different backgrounds
  // Also uses heavier font weights for active tabs
  const variantClasses = {
    default: "data-[state=active]:border-carbon-blue-60 data-[state=active]:text-carbon-gray-100 data-[state=active]:font-semibold",
    owner: "data-[state=active]:border-carbon-blue-60 data-[state=active]:text-carbon-gray-100 data-[state=active]:font-semibold",
    manager: "data-[state=active]:border-carbon-blue-60 data-[state=active]:text-carbon-gray-100 data-[state=active]:font-semibold",
    chef: "data-[state=active]:border-carbon-blue-60 data-[state=active]:text-carbon-gray-100 data-[state=active]:font-semibold",
    general: "data-[state=active]:border-carbon-blue-60 data-[state=active]:text-carbon-gray-100 data-[state=active]:font-semibold",
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex h-full items-center justify-center whitespace-nowrap border-b-2 border-transparent px-4 py-1.5 text-sm font-medium text-carbon-gray-70 transition-all hover:text-carbon-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon-blue-60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon-blue-60 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
