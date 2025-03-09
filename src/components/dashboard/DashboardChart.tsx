
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { cn } from '@/lib/utils';

interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

interface DashboardChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-apple-sm border border-kitchen-border">
        <p className="text-xs font-medium text-kitchen-foreground">{label}</p>
        <p className="text-sm font-semibold text-kitchen-foreground">
          ${payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

const DashboardChart: React.FC<DashboardChartProps> = ({
  title,
  description,
  data,
  className,
}) => {
  return (
    <Card className={cn("rounded-2xl shadow-apple-sm overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && (
          <p className="text-sm text-kitchen-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[240px] w-full px-2 pb-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, bottom: 10, left: 20 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#86868b' }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#86868b' }}
                tickFormatter={(value) => `$${value}`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]} 
                barSize={30} 
                fill="#0071e3"
                fillOpacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardChart;
