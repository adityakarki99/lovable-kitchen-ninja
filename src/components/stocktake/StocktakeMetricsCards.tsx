
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clipboard, ArrowUpDown, AlertTriangle, Clock } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
}

// Stocktake metrics
const stocktakeMetrics = [
  {
    title: "Last Stocktake",
    value: "March 8, 2025",
    description: "93% accuracy rate",
    icon: Clipboard,
  },
  {
    title: "Variance Value",
    value: "$345.20",
    description: "2.75% of inventory value",
    icon: ArrowUpDown,
  },
  {
    title: "Low Stock Items",
    value: "6",
    description: "Items below PAR level",
    icon: AlertTriangle,
  },
  {
    title: "Expiring Soon",
    value: "3",
    description: "Items expiring in 7 days",
    icon: Clock,
  }
];

const StocktakeMetricsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stocktakeMetrics.map((metric, index) => (
        <Card key={index} className="h-full">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-kitchen-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                {metric.description && <p className="text-sm text-kitchen-muted-foreground mt-1">{metric.description}</p>}
              </div>
              <div className="rounded-full p-2 bg-kitchen-muted">
                <metric.icon className="h-5 w-5 text-kitchen-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StocktakeMetricsCards;
