
import React from 'react';
import StandardBarChart from '@/components/shared/charts/StandardBarChart';
import StandardPieChart from '@/components/shared/charts/StandardPieChart';

interface RecipeAnalyticsProps {
  costAnalyticsData: { name: string; value: number }[];
  ratingAnalyticsData: { name: string; value: number }[];
  categoryDistribution: { name: string; value: number }[];
}

const RecipeAnalytics: React.FC<RecipeAnalyticsProps> = ({ 
  costAnalyticsData,
  ratingAnalyticsData,
  categoryDistribution
}) => {
  // Currency formatter for cost values
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
  
  // Rating formatter for rating values
  const formatRating = (value: number) => `${value.toFixed(1)}`;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StandardBarChart
        title="Recipe Cost Analysis"
        data={costAnalyticsData}
        color="#0f62fe" 
        valueFormatter={formatCurrency}
      />
      
      <StandardBarChart
        title="Recipe Rating Analysis"
        data={ratingAnalyticsData}
        color="#24a148"
        valueFormatter={formatRating}
      />
      
      <div className="md:col-span-2">
        <StandardPieChart
          title="Recipe Category Distribution"
          data={categoryDistribution}
          colors={["#8a3ffc", "#0f62fe", "#24a148", "#ff7c43", "#f94144"]}
        />
      </div>
    </div>
  );
};

export default RecipeAnalytics;
