
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Routes, Route } from 'react-router-dom';
import InventoryTable from '@/components/inventory/InventoryTable';
import RecipeManagement from '@/components/recipe/RecipeManagement';
import WastageManagementModule from '@/components/wastage/WastageManagementModule';
import StocktakeModule from '@/components/stocktake/StocktakeModule';
import StartStocktakeFlow from '@/components/stocktake/StartStocktakeFlow';
import StocktakeAdvanced from '@/components/stocktake/StocktakeAdvanced';
import StocktakeHub from '@/components/stocktake/StocktakeHub';

const Inventory: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-carbon-gray-100">Inventory Management <span className="text-xs bg-carbon-blue-60 text-white px-2 py-0.5 ml-2">3</span></h1>
        <p className="text-carbon-gray-70 mt-1 text-sm">Track inventory levels, manage recipes, handle waste, and conduct stocktakes</p>
      </div>
      
      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="bg-carbon-gray-10 w-full">
          <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
          <TabsTrigger value="recipes">Recipe Management</TabsTrigger>
          <TabsTrigger value="waste">Waste Management</TabsTrigger>
          <TabsTrigger value="stocktake">Stocktake</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="pt-6">
          <InventoryTable />
        </TabsContent>
        <TabsContent value="recipes" className="pt-6">
          <RecipeManagement />
        </TabsContent>
        <TabsContent value="waste" className="pt-6">
          <WastageManagementModule />
        </TabsContent>
        <TabsContent value="stocktake" className="pt-6">
          <Tabs defaultValue="hub" className="w-full">
            <TabsList className="bg-carbon-gray-10 w-full">
              <TabsTrigger value="hub">Stocktake Hub</TabsTrigger>
              <TabsTrigger value="start">Start Stocktake</TabsTrigger>
              <TabsTrigger value="active">Active Stocktake</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="hub" className="pt-6">
              <StocktakeHub />
            </TabsContent>
            <TabsContent value="start" className="pt-6">
              <StartStocktakeFlow />
            </TabsContent>
            <TabsContent value="active" className="pt-6">
              <StocktakeModule />
            </TabsContent>
            <TabsContent value="advanced" className="pt-6">
              <StocktakeAdvanced />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
