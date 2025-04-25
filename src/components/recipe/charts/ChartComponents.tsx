
import React, { ReactElement } from 'react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const ChartContainer = ({ 
  children, 
  config 
}: { 
  children: ReactElement; 
  config: any 
}) => (
  <ResponsiveContainer width="100%" height="100%">
    {children}
  </ResponsiveContainer>
);

export const ChartTooltipContent = ({ active, payload, label, formatter = (value: any) => value }: any) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-2 border border-gray-200 shadow-md">
      <p className="font-medium">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} style={{ color: entry.color }}>
          {formatter(entry.value)}
        </p>
      ))}
    </div>
  );
};

interface CostChartProps {
  data: { name: string; value: number }[];
  config: any;
}

export const CostAnalyticsChart: React.FC<CostChartProps> = ({ data, config }) => {
  return (
    <ChartContainer config={config}>
      <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 50 }}>
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }} 
          tickLine={{ stroke: '#e0e0e0' }}
          axisLine={{ stroke: '#e0e0e0' }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          tick={{ fontSize: 12 }} 
          tickFormatter={(value) => `$${value}`}
          tickLine={{ stroke: '#e0e0e0' }}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <Tooltip
          content={
            <ChartTooltipContent 
              formatter={(value: any) => `$${value}`}
            />
          }
        />
        <Bar 
          dataKey="value" 
          name="cost" 
          fill="#0f62fe" 
          radius={[0, 0, 0, 0]}
        />
      </RechartsBarChart>
    </ChartContainer>
  );
};

interface RatingChartProps {
  data: { name: string; value: number }[];
  config: any;
}

export const RatingAnalyticsChart: React.FC<RatingChartProps> = ({ data, config }) => {
  return (
    <ChartContainer config={config}>
      <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }} 
          tickLine={{ stroke: '#e0e0e0' }}
          axisLine={{ stroke: '#e0e0e0' }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          tick={{ fontSize: 12 }} 
          domain={[0, 5]}
          tickLine={{ stroke: '#e0e0e0' }}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <Tooltip
          content={
            <ChartTooltipContent />
          }
        />
        <Bar 
          dataKey="value" 
          name="rating" 
          fill="#24a148" 
          radius={[0, 0, 0, 0]}
        />
      </RechartsBarChart>
    </ChartContainer>
  );
};

interface CategoryChartProps {
  data: { name: string; value: number }[];
  config: any;
}

export const CategoryAnalyticsChart: React.FC<CategoryChartProps> = ({ data, config }) => {
  return (
    <ChartContainer config={config}>
      <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }} 
          tickLine={{ stroke: '#e0e0e0' }}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <YAxis 
          tick={{ fontSize: 12 }} 
          tickLine={{ stroke: '#e0e0e0' }}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <Tooltip
          content={
            <ChartTooltipContent 
              formatter={(value: any) => `${value} recipes`}
            />
          }
        />
        <Bar 
          dataKey="value" 
          name="category" 
          fill="#8a3ffc" 
          radius={[0, 0, 0, 0]}
        />
      </RechartsBarChart>
    </ChartContainer>
  );
};
