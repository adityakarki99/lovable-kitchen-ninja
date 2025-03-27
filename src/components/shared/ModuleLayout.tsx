
import React, { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface ModuleLayoutProps {
  title: string;
  description?: string;
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (value: string) => void;
  activeTab?: string;
  className?: string;
}

const ModuleLayout: React.FC<ModuleLayoutProps> = ({
  title,
  description,
  tabs,
  defaultTab,
  onTabChange,
  activeTab,
  className,
}) => {
  return (
    <div className={`space-y-6 animate-fade-in ${className}`}>
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="text-kitchen-muted-foreground mt-1">{description}</p>}
      </div>
      
      <Tabs 
        defaultValue={defaultTab || tabs[0].id} 
        value={activeTab}
        onValueChange={onTabChange}
        className="w-full"
      >
        <TabsList className="bg-kitchen-muted">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>
        
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="pt-4">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ModuleLayout;
