
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecipeManagement from '@/components/recipe/RecipeManagement';
import ProductionModule from '@/components/production/ProductionModule';
import MenuEngineeringModule from '@/components/menu/MenuEngineeringModule';
import DashboardLayout from '@/components/shared/DashboardLayout';

const Recipes: React.FC = () => {
  return (
    <DashboardLayout 
      title="Recipe Management"
      description="Manage your recipes, production, and menu engineering"
    >
      <Tabs defaultValue="recipes" className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="recipes">Recipe Management</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="menu">Menu Engineering</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recipes" className="pt-4">
          <RecipeManagement />
        </TabsContent>
        
        <TabsContent value="production" className="pt-4">
          <ProductionModule />
        </TabsContent>
        
        <TabsContent value="menu" className="pt-4">
          <MenuEngineeringModule />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Recipes;
