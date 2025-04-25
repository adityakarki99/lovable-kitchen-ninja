
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartDataItem {
  name: string;
  value: number;
}

interface StandardPieChartProps {
  title: string;
  description?: string;
  data: ChartDataItem[];
  colors?: string[];
  height?: number;
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
}

/**
 * A standardized pie chart component for consistent data visualization
 */
const StandardPieChart: React.FC<StandardPieChartProps> = ({
  title,
  description,
  data,
  colors = ["#0f62fe", "#6929c4", "#1192e8", "#005d5d", "#9f1853"],
  height = 300,
  valueFormatter = (value) => `${value}`,
  showLegend = true
}) => {
  const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <Card className="carbon-card">
      <CardHeader className="carbon-card-header">
        <CardTitle className="carbon-card-title">{title}</CardTitle>
        {description && <p className="text-sm text-carbon-gray-70">{description}</p>}
      </CardHeader>
      <CardContent className={`carbon-card-content h-[${height}px]`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [valueFormatter(Number(value)), 'Value']} />
            {showLegend && <Legend />}
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StandardPieChart;
