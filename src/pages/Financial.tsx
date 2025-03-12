
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';

import SalesAnalytics from '@/components/financial/SalesAnalytics';
import COGSAnalysis from '@/components/financial/COGSAnalysis';
import WasteCostTracking from '@/components/financial/WasteCostTracking';
import FinancialReports from '@/components/financial/FinancialReports';

const Financial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split('/')[2] || 'sales';

  const handleTabChange = (value: string) => {
    navigate(`/financial/${value}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Financial Management</h1>
        <p className="text-kitchen-muted-foreground mt-1">
          Track and analyze your financial performance
        </p>
      </div>
      
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
          <TabsTrigger value="cogs">COGS Analysis</TabsTrigger>
          <TabsTrigger value="waste">Waste Cost Tracking</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>
        
        <Routes>
          <Route path="/" element={<Navigate to="/financial/sales" replace />} />
          <Route path="/sales/*" element={<SalesAnalytics />} />
          <Route path="/cogs" element={<COGSAnalysis />} />
          <Route path="/waste" element={<WasteCostTracking />} />
          <Route path="/reports" element={<FinancialReports />} />
        </Routes>
      </Tabs>
    </div>
  );
};

export default Financial;
