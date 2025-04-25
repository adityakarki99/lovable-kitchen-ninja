
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Carbon Design System badges have specific styles and color treatments
const badgeVariants = cva(
  "inline-flex items-center rounded-sm text-xs font-medium px-2 py-1",
  {
    variants: {
      variant: {
        default: "bg-carbon-blue-20 text-carbon-blue-70",
        secondary: "bg-carbon-gray-20 text-carbon-gray-100",
        outline: "bg-transparent text-carbon-gray-100 border border-carbon-gray-40",
        destructive: "bg-[#fff1f1] text-carbon-red-50",
        success: "bg-[#defbe6] text-carbon-green-50",
        warning: "bg-[#fff8e1] text-[#f1c21b]",
        info: "bg-carbon-blue-10 text-carbon-blue-70",
        purple: "bg-[#f6f2ff] text-carbon-purple-50",
        teal: "bg-[#d9fbfb] text-carbon-teal-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
