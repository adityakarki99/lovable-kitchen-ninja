
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Auto-redirect to dashboard after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRedirecting(true);
      navigate('/dashboard');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleEnterDashboard = () => {
    setIsRedirecting(true);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-carbon-gray-10">
      <div className="carbon-fade-in text-center max-w-md">
        <div className="mx-auto bg-carbon-blue-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <ChefHat className="h-8 w-8 text-carbon-blue-60" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Culinary OS</h1>
        <p className="mt-3 text-carbon-text-secondary">
          A comprehensive kitchen management platform for restaurants and catering businesses
        </p>
        <div className="mt-8">
          <Button 
            onClick={handleEnterDashboard} 
            className="bg-carbon-blue-60 hover:bg-carbon-blue-70 px-6"
            disabled={isRedirecting}
          >
            {isRedirecting ? 'Redirecting...' : 'Enter Dashboard'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
