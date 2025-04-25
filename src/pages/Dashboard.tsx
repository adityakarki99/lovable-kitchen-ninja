
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ShoppingCart, PackageCheck, DollarSign } from 'lucide-react';
import AppLayout from '@/components/shared/layout/AppLayout';
import MetricsGrid from '@/components/shared/metrics/MetricsGrid';
import StandardBarChart from '@/components/shared/charts/StandardBarChart';
import StandardPieChart from '@/components/shared/charts/StandardPieChart';
import ChefHat from '@/components/icons/ChefHat';
import ChefDashboard from '@/components/dashboard/roles/ChefDashboard';
import DutyManagerDashboard from '@/components/dashboard/roles/DutyManagerDashboard';
import OwnerDashboard from '@/components/dashboard/roles/OwnerDashboard';

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
  
  const generalMetrics = [
    {
      title: "Recipes",
      value: "34",
      description: "Total standardized recipes",
      icon: <ChefHat className="h-5 w-5" />,
      iconBgClassName: "bg-carbon-blue-10",
      iconClassName: "text-carbon-blue-60"
    },
    {
      title: "Avg. Cost",
      value: "$3.87",
      description: "Per serving",
      icon: <DollarSign className="h-5 w-5" />,
      iconBgClassName: "bg-carbon-green-10",
      iconClassName: "text-carbon-green-50"
    },
    {
      title: "Low Stock Items",
      value: "8",
      description: "Affected recipes",
      icon: <PackageCheck className="h-5 w-5" />,
      iconBgClassName: "bg-carbon-red-10",
      iconClassName: "text-carbon-red-50",
      trend: {
        value: 12,
        isPositive: false
      }
    },
    {
      title: "Most Popular",
      value: "Fish & Chips",
      description: "250 orders this week",
      icon: <ShoppingCart className="h-5 w-5" />,
      iconBgClassName: "bg-carbon-purple-10",
      iconClassName: "text-carbon-purple-50"
    }
  ];
  
  const headerActions = (
    <>
      <Button 
        size="sm" 
        className="carbon-btn-primary"
        onClick={handleAddRecipe}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        New Recipe
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="carbon-btn-tertiary"
        onClick={handleNewProcurement}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        New Order
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className="carbon-btn-tertiary"
        onClick={handleUpdateInventory}
      >
        <PackageCheck className="mr-2 h-4 w-4" />
        Update Inventory
      </Button>
    </>
  );
  
  const GeneralDashboardContent = () => (
    <div className="space-y-6 animate-fade-in">
      <MetricsGrid metrics={generalMetrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StandardBarChart
          title="Monthly Spend Analysis"
          description="Procurement spend by month"
          data={monthlySpendData}
          color="#0f62fe"
          valueFormatter={(value) => `$${value.toLocaleString()}`}
        />
        
        <StandardPieChart
          title="Category Spend Distribution"
          description="Procurement spend by category"
          data={categorySpendData}
          valueFormatter={(value) => `$${value.toLocaleString()}`}
        />
      </div>
    </div>
  );

  return (
    <AppLayout
      title="Dashboard"
      description="Good morning, welcome to your kitchen overview"
      headerActions={headerActions}
    >
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="chef">Chef</TabsTrigger>
          <TabsTrigger value="dutyManager">Duty Manager</TabsTrigger>
          <TabsTrigger value="owner">Owner/Manager</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <GeneralDashboardContent />
        </TabsContent>
        
        <TabsContent value="chef">
          <ChefDashboard />
        </TabsContent>
        
        <TabsContent value="dutyManager">
          <DutyManagerDashboard />
        </TabsContent>
        
        <TabsContent value="owner">
          <OwnerDashboard />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Dashboard;
