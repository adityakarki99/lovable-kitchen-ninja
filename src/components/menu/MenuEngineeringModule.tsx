
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuAnalysisDashboard from './MenuAnalysisDashboard';
import MenuItemAnalysis from './MenuItemAnalysis';
import MenuEngineeringReport from './MenuEngineeringReport';
import MenuCreator from './MenuCreator';

const MenuEngineeringModule: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Menu Engineering</h1>
        <p className="text-kitchen-muted-foreground mt-1">Analyze menu performance and optimize profitability</p>
      </div>
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="dashboard">Analysis Dashboard</TabsTrigger>
          <TabsTrigger value="items">Menu Items</TabsTrigger>
          <TabsTrigger value="reports">Engineering Reports</TabsTrigger>
          <TabsTrigger value="creator">Menu Creator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="pt-4">
          <MenuAnalysisDashboard />
        </TabsContent>
        
        <TabsContent value="items" className="pt-4">
          <MenuItemAnalysis />
        </TabsContent>
        
        <TabsContent value="reports" className="pt-4">
          <MenuEngineeringReport />
        </TabsContent>
        
        <TabsContent value="creator" className="pt-4">
          <MenuCreator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuEngineeringModule;
