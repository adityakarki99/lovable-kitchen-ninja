
import React, { useState, useMemo } from 'react';
import { monthlyCogsData } from '@/data/financial/cogsData';
import PeriodSelector from './charts/PeriodSelector';
import CogsVsSalesChart from './charts/CogsVsSalesChart';
import YearOverYearChart from './charts/YearOverYearChart';
import SeasonalPatternsChart from './charts/SeasonalPatternsChart';
import ProjectionsChart from './charts/ProjectionsChart';
import { calculateProjectedData } from './utils/projectionCalculator';

const TrendAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('12months');
  
  // Generate year-over-year comparison data
  const previousYearData = useMemo(() => monthlyCogsData.map(item => ({
    ...item,
    previousYearCogs: item.cogs * (Math.random() * 0.4 + 0.8), // 80-120% of current
    previousYearSales: item.sales * (Math.random() * 0.4 + 0.8), // 80-120% of current
  })), []);
  
  // Seasonal patterns data
  const seasonalData = useMemo(() => [
    { month: 'Jan', avg: 0.95 },
    { month: 'Feb', avg: 0.90 },
    { month: 'Mar', avg: 0.95 },
    { month: 'Apr', avg: 1.00 },
    { month: 'May', avg: 1.05 },
    { month: 'Jun', avg: 1.15 },
    { month: 'Jul', avg: 1.20 },
    { month: 'Aug', avg: 1.25 },
    { month: 'Sep', avg: 1.15 },
    { month: 'Oct', avg: 1.05 },
    { month: 'Nov', avg: 1.00 },
    { month: 'Dec', avg: 1.25 },
  ], []);
  
  // Calculate projected data using our utility function
  const projectedData = useMemo(() => calculateProjectedData(monthlyCogsData), []);
  
  // Filter data based on selected period
  const filteredData = useMemo(() => {
    switch (selectedPeriod) {
      case '3months':
        return monthlyCogsData.slice(-3);
      case '6months':
        return monthlyCogsData.slice(-6);
      case 'ytd':
        // Simplified YTD for demo purposes
        return monthlyCogsData.slice(-new Date().getMonth() - 1);
      default:
        return monthlyCogsData;
    }
  }, [selectedPeriod]);

  return (
    <div className="space-y-6">
      {/* Time Period Selector */}
      <PeriodSelector 
        selectedPeriod={selectedPeriod} 
        onPeriodChange={setSelectedPeriod} 
      />
      
      {/* COGS vs Sales Trend */}
      <CogsVsSalesChart data={filteredData} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Year-over-Year Comparison */}
        <YearOverYearChart data={previousYearData} />
        
        {/* Seasonal Patterns */}
        <SeasonalPatternsChart data={seasonalData} />
      </div>
      
      {/* Projections */}
      <ProjectionsChart data={[...monthlyCogsData.slice(-6), ...projectedData]} />
    </div>
  );
};

export default TrendAnalysis;
