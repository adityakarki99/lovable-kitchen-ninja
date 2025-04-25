
import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart } from 'lucide-react';
import { 
  CostAnalyticsChart,
  RatingAnalyticsChart,
  CategoryAnalyticsChart
} from '../charts/ChartComponents';

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
  const chartConfig = {
    cost: {
      label: "Cost per serving",
      theme: {
        light: "#0f62fe",
        dark: "#78a9ff"
      }
    },
    rating: {
      label: "Rating",
      theme: {
        light: "#24a148",
        dark: "#42be65"
      }
    },
    category: {
      label: "Category",
      theme: {
        light: "#8a3ffc",
        dark: "#a56eff"
      }
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="carbon-card">
        <div className="carbon-card-header">
          <h3 className="carbon-card-title flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-carbon-blue-60" />
            Recipe Cost Analysis
          </h3>
        </div>
        <div className="carbon-card-content h-[300px]">
          <CostAnalyticsChart data={costAnalyticsData} config={chartConfig} />
        </div>
      </Card>
      
      <Card className="carbon-card">
        <div className="carbon-card-header">
          <h3 className="carbon-card-title flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-carbon-green-50" />
            Recipe Rating Analysis
          </h3>
        </div>
        <div className="carbon-card-content h-[300px]">
          <RatingAnalyticsChart data={ratingAnalyticsData} config={chartConfig} />
        </div>
      </Card>
      
      <Card className="carbon-card md:col-span-2">
        <div className="carbon-card-header">
          <h3 className="carbon-card-title flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-carbon-purple-50" />
            Recipe Category Distribution
          </h3>
        </div>
        <div className="carbon-card-content h-[300px]">
          <CategoryAnalyticsChart data={categoryDistribution} config={chartConfig} />
        </div>
      </Card>
    </div>
  );
};

export default RecipeAnalytics;
