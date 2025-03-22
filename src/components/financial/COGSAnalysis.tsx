
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CogsDashboard from './cogs/CogsDashboard';
import ItemCostAnalysis from './cogs/ItemCostAnalysis';
import CategoryAnalysis from './cogs/CategoryAnalysis';
import TrendAnalysis from './cogs/TrendAnalysis';
import { Calendar, ChartPieIcon, LineChart, ListFilter } from 'lucide-react';

const COGSAnalysis = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="space-y-6 mt-4 animate-fade-in">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <ChartPieIcon className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="items" className="flex items-center gap-2">
            <ListFilter className="h-4 w-4" />
            <span>Item Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <ChartPieIcon className="h-4 w-4" />
            <span>Category Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Trend Analysis</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <CogsDashboard />
        </TabsContent>
        
        <TabsContent value="items" className="mt-6">
          <ItemCostAnalysis />
        </TabsContent>
        
        <TabsContent value="categories" className="mt-6">
          <CategoryAnalysis />
        </TabsContent>
        
        <TabsContent value="trends" className="mt-6">
          <TrendAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default COGSAnalysis;
