
import React, { useState } from 'react';
import { PlusCircle, ShoppingCart, PackageCheck, DollarSign } from 'lucide-react';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import DashboardChart from '@/components/dashboard/DashboardChart';
import DashboardActionCard from '@/components/dashboard/DashboardActionCard';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OwnerDashboard from '@/components/dashboard/roles/OwnerDashboard';
import DutyManagerDashboard from '@/components/dashboard/roles/DutyManagerDashboard';
import ChefDashboard from '@/components/dashboard/roles/ChefDashboard';
import GeneralDashboard from '@/components/dashboard/roles/GeneralDashboard';

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
  const [activeTab, setActiveTab] = useState("general");

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
      
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="owner">Owner/Manager</TabsTrigger>
          <TabsTrigger value="dutyManager">Duty Manager</TabsTrigger>
          <TabsTrigger value="chef">Chef</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>
        
        <TabsContent value="owner">
          <OwnerDashboard />
        </TabsContent>
        
        <TabsContent value="dutyManager">
          <DutyManagerDashboard />
        </TabsContent>
        
        <TabsContent value="chef">
          <ChefDashboard />
        </TabsContent>
        
        <TabsContent value="general">
          <GeneralDashboard 
            monthlySpendData={monthlySpendData}
            categorySpendData={categorySpendData}
            onAddRecipe={handleAddRecipe}
            onNewProcurement={handleNewProcurement}
            onUpdateInventory={handleUpdateInventory}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
