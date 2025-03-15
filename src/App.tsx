
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";
import Inventory from "./pages/Inventory";
import Procurement from "./pages/Procurement";
import Financial from "./pages/Financial";
import IntegrationHub from "./pages/IntegrationHub"; 
import RecipeDetail from "./components/recipe/RecipeDetail";
import RecipeForm from "./components/recipe/RecipeForm";
import RecipeEdit from "./components/recipe/RecipeEdit";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { Suspense } from "react";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-kitchen">
    <Header />
    <main className="container max-w-7xl mx-auto px-4 py-6 md:py-8">
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/dashboard" 
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } 
          />
          <Route 
            path="/recipes" 
            element={
              <AppLayout>
                <Recipes />
              </AppLayout>
            } 
          />
          <Route 
            path="/recipes/new" 
            element={
              <AppLayout>
                <RecipeForm />
              </AppLayout>
            } 
          />
          <Route 
            path="/recipes/:id" 
            element={
              <AppLayout>
                <RecipeDetail />
              </AppLayout>
            } 
          />
          <Route 
            path="/recipes/:id/edit" 
            element={
              <AppLayout>
                <RecipeEdit />
              </AppLayout>
            } 
          />
          <Route 
            path="/inventory/*" 
            element={
              <AppLayout>
                <Inventory />
              </AppLayout>
            } 
          />
          <Route 
            path="/procurement/*" 
            element={
              <AppLayout>
                <Procurement />
              </AppLayout>
            } 
          />
          <Route 
            path="/financial/*" 
            element={
              <AppLayout>
                <Financial />
              </AppLayout>
            } 
          />
          <Route 
            path="/integration-hub" 
            element={
              <AppLayout>
                <IntegrationHub />
              </AppLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
