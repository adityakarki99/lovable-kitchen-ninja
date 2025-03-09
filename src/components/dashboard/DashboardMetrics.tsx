
import React from 'react';
import { ChefHat, AlertTriangle, ShoppingCart, DollarSign } from 'lucide-react';
import DashboardCard from './DashboardCard';

const DashboardMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
      <DashboardCard 
        title="Total Recipes" 
        value="125" 
        icon={<ChefHat className="h-4 w-4" />} 
        description="5 new this week"
        trend={{ value: 4, isPositive: true }}
        variant="primary"
      />
      
      <DashboardCard 
        title="Low Stock Alerts" 
        value="3" 
        icon={<AlertTriangle className="h-4 w-4" />} 
        description="Tomatoes (5kg remaining)"
        variant="warning"
      />
      
      <DashboardCard 
        title="Pending Purchase Orders" 
        value="15" 
        icon={<ShoppingCart className="h-4 w-4" />} 
        description="4 awaiting approval"
        trend={{ value: 20, isPositive: true }}
        variant="success"
      />
      
      <DashboardCard 
        title="Budget Remaining" 
        value="$61,529.68" 
        icon={<DollarSign className="h-4 w-4" />} 
        description="Under monthly target"
        trend={{ value: 8, isPositive: false }}
        variant="danger"
      />
    </div>
  );
};

export default DashboardMetrics;
