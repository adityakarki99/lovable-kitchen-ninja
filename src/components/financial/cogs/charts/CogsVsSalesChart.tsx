import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { MonthlyCogsData } from '../types/chartDataTypes';

interface CogsVsSalesChartProps {
  data: MonthlyCogsData[];
}

const CogsVsSalesChart: React.FC<CogsVsSalesChartProps> = ({ data }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">COGS vs Sales Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" domain={[20, 40]} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'cogs' || name === 'sales') return [`$${value.toLocaleString()}`, name === 'cogs' ? 'COGS' : 'Sales'];
                  return [`${value}%`, 'COGS %'];
                }}
              />
              <Line yAxisId="left" type="monotone" dataKey="cogs" name="COGS" stroke="#8884d8" />
              <Line yAxisId="left" type="monotone" dataKey="sales" name="Sales" stroke="#82ca9d" />
              <Line yAxisId="right" type="monotone" dataKey="percentage" name="COGS %" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CogsVsSalesChart;
