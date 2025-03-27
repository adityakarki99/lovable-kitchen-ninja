
import React from 'react';
import MenuAnalysisDashboard from './MenuAnalysisDashboard';
import MenuItemAnalysis from './MenuItemAnalysis';
import MenuEngineeringReport from './MenuEngineeringReport';
import MenuCreator from './MenuCreator';
import ModuleLayout from '@/components/shared/ModuleLayout';

const MenuEngineeringModule: React.FC = () => {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Analysis Dashboard',
      content: <MenuAnalysisDashboard />
    },
    {
      id: 'items',
      label: 'Menu Items',
      content: <MenuItemAnalysis />
    },
    {
      id: 'reports',
      label: 'Engineering Reports',
      content: <MenuEngineeringReport />
    },
    {
      id: 'creator',
      label: 'Menu Creator',
      content: <MenuCreator />
    }
  ];

  return (
    <ModuleLayout
      title="Menu Engineering"
      description="Analyze menu performance and optimize profitability"
      tabs={tabs}
      defaultTab="dashboard"
    />
  );
};

export default MenuEngineeringModule;
