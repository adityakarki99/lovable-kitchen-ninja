
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const navigate = useNavigate();

  // Auto-redirect to dashboard after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-kitchen-muted">
      <div className="animate-fade-in text-center max-w-md">
        <div className="mx-auto bg-kitchen-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <ChefHat className="h-8 w-8 text-kitchen-primary" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Culinary OS</h1>
        <p className="mt-3 text-kitchen-muted-foreground">
          A comprehensive kitchen management platform for restaurants and catering businesses
        </p>
        <div className="mt-8">
          <Button 
            onClick={() => navigate('/dashboard')} 
            className="bg-kitchen-primary hover:bg-kitchen-primary/90 px-6"
          >
            Enter Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
