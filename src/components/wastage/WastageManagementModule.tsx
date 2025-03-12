
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WastageTrackingDashboard from './WastageTrackingDashboard';
import WasteLogInterface from './WasteLogInterface';
import WasteAnalysisReports from './WasteAnalysisReports';
import WasteRecommendations from './WasteRecommendations';

const WastageManagementModule: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Wastage Management</h1>
        <p className="text-kitchen-muted-foreground mt-1">Track, analyze, and reduce food waste across your operations</p>
      </div>
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="log">Log Waste</TabsTrigger>
          <TabsTrigger value="analysis">Analysis & Reports</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="pt-4">
          <WastageTrackingDashboard />
        </TabsContent>
        
        <TabsContent value="log" className="pt-4">
          <WasteLogInterface />
        </TabsContent>
        
        <TabsContent value="analysis" className="pt-4">
          <WasteAnalysisReports />
        </TabsContent>
        
        <TabsContent value="recommendations" className="pt-4">
          <WasteRecommendations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WastageManagementModule;
