
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

interface SeasonalPatternsChartProps {
  data: Array<{
    month: string;
    avg: number;
  }>;
}

const SeasonalPatternsChart: React.FC<SeasonalPatternsChartProps> = ({ data }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Seasonal Patterns</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0.8, 1.4]} />
              <Tooltip formatter={(value) => {
                // Fix the type issue by checking if value is a number before calling toFixed
                const formattedValue = typeof value === 'number' ? value.toFixed(2) : value;
                return [`${formattedValue}x`, 'Seasonal Factor'];
              }} />
              <Line type="monotone" dataKey="avg" name="Seasonal Factor" stroke="#ff7300" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonalPatternsChart;
