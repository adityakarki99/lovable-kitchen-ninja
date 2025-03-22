
import { MonthlyCogsData, ProjectionData } from '../types/chartDataTypes';

/**
 * Calculates projected COGS and sales data for future months
 * based on historical data and average growth rate.
 */
export const calculateProjectedData = (historicalData: MonthlyCogsData[], monthsToProject: number = 6): ProjectionData[] => {
  // First, calculate the average growth rate from the last 6 months
  const lastSixMonths = historicalData.slice(-6);
  const avgGrowthRate = lastSixMonths.reduce((sum, item, index) => {
    if (index === 0) return sum;
    return sum + ((lastSixMonths[index].cogs / lastSixMonths[index-1].cogs) - 1);
  }, 0) / (lastSixMonths.length - 1);
  
  // Base value for projections (last month's actual data)
  const baseCogs = historicalData[historicalData.length - 1].cogs;
  const baseSales = historicalData[historicalData.length - 1].sales;
  
  // Month names for projection (cyclic)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const lastMonthIndex = monthNames.indexOf(historicalData[historicalData.length - 1].month);
  
  // Build the projected data
  const projectedData: ProjectionData[] = [];
  for (let i = 0; i < monthsToProject; i++) {
    const monthIndex = (lastMonthIndex + i + 1) % 12;
    const month = monthNames[monthIndex];
    
    // Calculate based on compound growth from the base values
    const cogsGrowthFactor = Math.pow(1 + avgGrowthRate, i + 1);
    const projectedCogs = baseCogs * cogsGrowthFactor;
    const projectedSales = baseSales * cogsGrowthFactor;
    
    projectedData.push({
      month: month,
      cogs: Math.round(projectedCogs),
      sales: Math.round(projectedSales),
      percentage: Math.round((projectedCogs / projectedSales) * 1000) / 10,
      isProjected: true
    });
  }
  
  return projectedData;
};
