
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecipeManagement from '@/components/recipe/RecipeManagement';
import ProductionModule from '@/components/production/ProductionModule';
import MenuEngineeringModule from '@/components/menu/MenuEngineeringModule';

const Recipes: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-semibold">Recipe Management</h1>
        <p className="text-kitchen-muted-foreground mt-1">Manage your recipes, production, and menu engineering</p>
      </div>
      
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
    </div>
  );
};

export default Recipes;
