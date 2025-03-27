
import React from 'react';
import WastageTrackingDashboard from './WastageTrackingDashboard';
import WasteLogInterface from './WasteLogInterface';
import WasteAnalysisReports from './WasteAnalysisReports';
import WasteRecommendations from './WasteRecommendations';
import ModuleLayout from '@/components/shared/ModuleLayout';

const WastageManagementModule: React.FC = () => {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      content: <WastageTrackingDashboard />
    },
    {
      id: 'log',
      label: 'Log Waste',
      content: <WasteLogInterface />
    },
    {
      id: 'analysis',
      label: 'Analysis & Reports',
      content: <WasteAnalysisReports />
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      content: <WasteRecommendations />
    }
  ];

  return (
    <ModuleLayout
      title="Wastage Management"
      description="Track, analyze, and reduce food waste across your operations"
      tabs={tabs}
      defaultTab="dashboard"
    />
  );
};

export default WastageManagementModule;
