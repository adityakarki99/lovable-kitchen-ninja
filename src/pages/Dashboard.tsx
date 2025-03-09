
import React from 'react';
import { PlusCircle, ShoppingCart, PackageCheck, DollarSign } from 'lucide-react';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import DashboardChart from '@/components/dashboard/DashboardChart';
import DashboardActionCard from '@/components/dashboard/DashboardActionCard';
import { useNavigate } from 'react-router-dom';

const monthlySpendData = [
  { name: 'Jan', value: 19500 },
  { name: 'Feb', value: 21300 },
  { name: 'Mar', value: 18200 },
  { name: 'Apr', value: 22400 },
  { name: 'May', value: 20100 },
  { name: 'Jun', value: 23500 },
  { name: 'Jul', value: 25200 },
];

const categorySpendData = [
  { name: 'Meat', value: 8500 },
  { name: 'Seafood', value: 6700 },
  { name: 'Produce', value: 4200 },
  { name: 'Dairy', value: 3100 },
  { name: 'Dry Goods', value: 2800 },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleAddRecipe = () => {
    navigate('/recipes');
  };

  const handleNewProcurement = () => {
    navigate('/procurement');
  };

  const handleUpdateInventory = () => {
    navigate('/inventory');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-kitchen-muted-foreground mt-1">Good morning, welcome back to your kitchen overview</p>
      </div>
      
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
          onClick={handleAddRecipe}
          variant="primary"
        />
        <DashboardActionCard 
          title="Create Purchase Order" 
          description="Generate a new purchase order for your suppliers"
          icon={ShoppingCart}
          action="New Order"
          onClick={handleNewProcurement}
        />
        <DashboardActionCard 
          title="Update Inventory" 
          description="Update your current stock levels and prices"
          icon={PackageCheck}
          action="Update Stock"
          onClick={handleUpdateInventory}
        />
      </div>
    </div>
  );
};

export default Dashboard;
