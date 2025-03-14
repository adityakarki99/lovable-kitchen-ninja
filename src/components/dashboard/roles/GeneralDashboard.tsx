
import React from 'react';
import { PlusCircle, ShoppingCart, PackageCheck } from 'lucide-react';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import DashboardChart from '@/components/dashboard/DashboardChart';
import DashboardActionCard from '@/components/dashboard/DashboardActionCard';

interface GeneralDashboardProps {
  monthlySpendData: { name: string; value: number }[];
  categorySpendData: { name: string; value: number }[];
  onAddRecipe: () => void;
  onNewProcurement: () => void;
  onUpdateInventory: () => void;
}

const GeneralDashboard: React.FC<GeneralDashboardProps> = ({
  monthlySpendData,
  categorySpendData,
  onAddRecipe,
  onNewProcurement,
  onUpdateInventory
}) => {
  return (
    <div className="space-y-8">
      <DashboardMetrics />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <DashboardChart 
          title="Monthly Spend" 
          description="Total spend by month"
          data={monthlySpendData} 
        />
        <DashboardChart 
          title="Spend by Category" 
          description="Total spend by category this month"
          data={categorySpendData} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardActionCard 
          title="Create New Recipe" 
          description="Add a new recipe with ingredients, costs, and instructions"
          icon={PlusCircle}
          action="Add Recipe"
          onClick={onAddRecipe}
          variant="primary"
        />
        <DashboardActionCard 
          title="Create Purchase Order" 
          description="Generate a new purchase order for your suppliers"
          icon={ShoppingCart}
          action="New Order"
          onClick={onNewProcurement}
        />
        <DashboardActionCard 
          title="Update Inventory" 
          description="Update your current stock levels and prices"
          icon={PackageCheck}
          action="Update Stock"
          onClick={onUpdateInventory}
        />
      </div>
    </div>
  );
};

export default GeneralDashboard;
