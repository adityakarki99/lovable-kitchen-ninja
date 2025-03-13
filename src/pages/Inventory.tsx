
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Routes, Route } from 'react-router-dom';
import InventoryTable from '@/components/inventory/InventoryTable';
import RecipeManagement from '@/components/recipe/RecipeManagement';
import WastageManagementModule from '@/components/wastage/WastageManagementModule';
import StocktakeModule from '@/components/stocktake/StocktakeModule';
import StartStocktakeFlow from '@/components/stocktake/StartStocktakeFlow';
import StocktakeAdvanced from '@/components/stocktake/StocktakeAdvanced';

const Inventory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-semibold">Inventory Management <span className="text-sm bg-kitchen-primary text-white px-2 py-0.5 rounded-full ml-2">3</span></h1>
        <p className="text-kitchen-muted-foreground mt-1">Track inventory levels, manage recipes, handle waste, and conduct stocktakes</p>
      </div>
      
      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
          <TabsTrigger value="recipes">Recipe Management</TabsTrigger>
          <TabsTrigger value="waste">Waste Management</TabsTrigger>
          <TabsTrigger value="stocktake">Stocktake</TabsTrigger>
          <TabsTrigger value="stocktake-advanced">Stocktake Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="pt-4">
          <InventoryTable />
        </TabsContent>
        <TabsContent value="recipes" className="pt-4">
          <RecipeManagement />
        </TabsContent>
        <TabsContent value="waste" className="pt-4">
          <WastageManagementModule />
        </TabsContent>
        <TabsContent value="stocktake" className="pt-4">
          <Routes>
            <Route index element={<StocktakeModule />} />
            <Route path="start" element={<StartStocktakeFlow />} />
          </Routes>
        </TabsContent>
        <TabsContent value="stocktake-advanced" className="pt-4">
          <StocktakeAdvanced />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
