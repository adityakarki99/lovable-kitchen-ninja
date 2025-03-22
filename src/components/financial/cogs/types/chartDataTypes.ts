
/**
 * Shared TypeScript interfaces for COGS chart data
 */

// Base monthly data interface
export interface MonthlyCogsData {
  month: string;
  cogs: number;
  sales: number;
  percentage: number;
}

// Interface for year-over-year comparison data
export interface YearOverYearData extends MonthlyCogsData {
  previousYearCogs: number;
  previousYearSales: number;
}

// Interface for seasonal patterns data
export interface SeasonalPatternData {
  month: string;
  avg: number;
}

// Interface for projections data
export interface ProjectionData extends MonthlyCogsData {
  isProjected?: boolean;
}
