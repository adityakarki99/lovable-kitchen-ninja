
import React from 'react';
import MenuEngineeringModule from '@/components/menu/MenuEngineeringModule';

const MenuEngineering: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-semibold">Menu Engineering</h1>
        <p className="text-kitchen-muted-foreground mt-1">Analyze menu performance and optimize profitability</p>
      </div>
      
      <MenuEngineeringModule />
    </div>
  );
};

export default MenuEngineering;
