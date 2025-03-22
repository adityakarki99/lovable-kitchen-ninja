import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ProjectionData } from '../types/chartDataTypes';

interface ProjectionsChartProps {
  data: ProjectionData[];
}

const ProjectionsChart: React.FC<ProjectionsChartProps> = ({ data }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">COGS Projections (Next 6 Months)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name, props) => {
                  const formatted = [`$${value.toLocaleString()}`, name === 'cogs' ? 'COGS' : 'Sales'];
                  // Add a note for projected values
                  if (props.payload.isProjected) {
                    formatted.push('(Projected)');
                  }
                  return formatted;
                }}
              />
              <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="cogs" 
                name="COGS" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#splitColor)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="h-3 w-3 bg-[#8884d8] rounded-full"></div>
          <span className="text-sm text-kitchen-muted-foreground">Historical Data</span>
          <div className="h-3 w-3 bg-[#8884d8] opacity-50 rounded-full ml-4"></div>
          <span className="text-sm text-kitchen-muted-foreground">Projected Data</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectionsChart;
