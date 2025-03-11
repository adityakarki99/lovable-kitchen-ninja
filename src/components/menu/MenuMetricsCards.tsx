
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, Utensils, Clock } from 'lucide-react';

const MenuMetricsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="shadow-apple-sm">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-kitchen-muted-foreground">Average Profit Margin</p>
              <h3 className="text-2xl font-bold mt-1">65%</h3>
              <p className="text-sm text-kitchen-success mt-1">+3% from last month</p>
            </div>
            <div className="rounded-full p-2 bg-kitchen-success/10">
              <DollarSign className="h-5 w-5 text-kitchen-success" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-apple-sm">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-kitchen-muted-foreground">Top Selling Item</p>
              <h3 className="text-xl font-bold mt-1">Fish & Chips</h3>
              <p className="text-sm text-kitchen-muted-foreground mt-1">250 orders this week</p>
            </div>
            <div className="rounded-full p-2 bg-kitchen-primary/10">
              <TrendingUp className="h-5 w-5 text-kitchen-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-apple-sm">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-kitchen-muted-foreground">Star Performers</p>
              <h3 className="text-2xl font-bold mt-1">6</h3>
              <p className="text-sm text-kitchen-muted-foreground mt-1">Out of 45 menu items</p>
            </div>
            <div className="rounded-full p-2 bg-yellow-100">
              <Utensils className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-apple-sm">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-kitchen-muted-foreground">Peak Order Time</p>
              <h3 className="text-2xl font-bold mt-1">7-9 PM</h3>
              <p className="text-sm text-kitchen-muted-foreground mt-1">35% of daily orders</p>
            </div>
            <div className="rounded-full p-2 bg-kitchen-muted">
              <Clock className="h-5 w-5 text-kitchen-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuMetricsCards;
