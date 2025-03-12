
import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SalesDashboard from './sales/SalesDashboard';
import MenuPerformance from './sales/MenuPerformance';
import TimeAnalysis from './sales/TimeAnalysis';

const SalesAnalytics = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split('/')[3] || 'dashboard';

  const handleTabChange = (value: string) => {
    navigate(`/financial/sales/${value}`);
  };

  return (
    <div className="space-y-6 mt-4">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="menu">Menu Performance</TabsTrigger>
          <TabsTrigger value="time">Time Analysis</TabsTrigger>
        </TabsList>

        <Routes>
          <Route path="/" element={<SalesDashboard />} />
          <Route path="/dashboard" element={<SalesDashboard />} />
          <Route path="/menu" element={<MenuPerformance />} />
          <Route path="/time" element={<TimeAnalysis />} />
        </Routes>
      </Tabs>
    </div>
  );
};

export default SalesAnalytics;
