
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const WasteCostTracking = () => {
  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold">Waste Cost Tracking</h2>
          <p className="text-kitchen-muted-foreground">Track and analyze costs associated with waste</p>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium">Total Waste Cost</h3>
                <p className="text-3xl font-bold mt-2">$1,245.67</p>
                <p className="text-sm text-kitchen-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium">Waste as % of Sales</h3>
                <p className="text-3xl font-bold mt-2">2.4%</p>
                <p className="text-sm text-kitchen-muted-foreground">Target: &lt;2%</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WasteCostTracking;
