
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartDataItem {
  name: string;
  value: number;
}

interface StandardBarChartProps {
  title: string;
  description?: string;
  data: ChartDataItem[];
  color?: string;
  height?: number;
  valueFormatter?: (value: number) => string;
  horizontal?: boolean;
  showGrid?: boolean;
}

/**
 * A standardized bar chart component for consistent data visualization
 */
const StandardBarChart: React.FC<StandardBarChartProps> = ({
  title,
  description,
  data,
  color = "#0f62fe",
  height = 300,
  valueFormatter = (value) => `${value}`,
  horizontal = false,
  showGrid = true
}) => {
  return (
    <Card className="carbon-card">
      <CardHeader className="carbon-card-header">
        <CardTitle className="carbon-card-title">{title}</CardTitle>
        {description && <p className="text-sm text-carbon-gray-70">{description}</p>}
      </CardHeader>
      <CardContent className={`carbon-card-content h-[${height}px]`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout={horizontal ? 'vertical' : 'horizontal'}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis 
              dataKey={horizontal ? 'value' : 'name'} 
              type={horizontal ? 'number' : 'category'}
            />
            <YAxis 
              dataKey={horizontal ? 'name' : 'value'} 
              type={horizontal ? 'category' : 'number'} 
              tickFormatter={horizontal ? undefined : valueFormatter}
            />
            <Tooltip formatter={(value) => [valueFormatter(Number(value)), title]} />
            <Bar dataKey="value" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StandardBarChart;
