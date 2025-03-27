
/**
 * Utility functions for formatting values consistently across the application
 */

export const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatQuantity = (value: number): string => {
  return value.toLocaleString();
};

export const formatTrend = (value: number): { text: string, isPositive: boolean } => {
  const isPositive = value >= 0;
  const text = `${isPositive ? '+' : ''}${value.toFixed(1)}%`;
  return { text, isPositive };
};

export const getStatusClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'success':
    case 'approved':
    case 'completed':
    case 'active':
    case 'preferred':
      return "bg-kitchen-success/10 text-kitchen-success";
    case 'warning':
    case 'pending':
    case 'in progress':
    case 'waiting':
      return "bg-kitchen-warning/10 text-kitchen-warning";
    case 'error':
    case 'rejected':
    case 'failed':
    case 'inactive':
      return "bg-kitchen-danger/10 text-kitchen-danger";
    case 'info':
    case 'under review':
    case 'new':
      return "bg-kitchen-primary/10 text-kitchen-primary";
    default:
      return "bg-kitchen-muted text-kitchen-muted-foreground";
  }
};
