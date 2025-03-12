
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const TimeAnalysis = () => {
  // Sample data for hourly sales
  const hourlySales = [
    { hour: '9 AM', sales: 450 },
    { hour: '10 AM', sales: 680 },
    { hour: '11 AM', sales: 1200 },
    { hour: '12 PM', sales: 2400 },
    { hour: '1 PM', sales: 2100 },
    { hour: '2 PM', sales: 1300 },
    { hour: '3 PM', sales: 890 },
    { hour: '4 PM', sales: 780 },
    { hour: '5 PM', sales: 1400 },
    { hour: '6 PM', sales: 2300 },
    { hour: '7 PM', sales: 2600 },
    { hour: '8 PM', sales: 2100 },
    { hour: '9 PM', sales: 1800 },
    { hour: '10 PM', sales: 1100 },
  ];
  
  // Sample data for day of week comparison
  const dayOfWeekData = [
    { name: 'Monday', sales: 14500 },
    { name: 'Tuesday', sales: 13200 },
    { name: 'Wednesday', sales: 15800 },
    { name: 'Thursday', sales: 16700 },
    { name: 'Friday', sales: 25400 },
    { name: 'Saturday', sales: 32600 },
    { name: 'Sunday', sales: 21800 },
  ];

  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Hourly Sales Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={hourlySales}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Day of Week Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dayOfWeekData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                  <Line type="monotone" dataKey="sales" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Peak Hours</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time Period</TableHead>
                  <TableHead className="text-right">Average Sales</TableHead>
                  <TableHead className="text-right">% of Daily</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Lunch (11 AM - 2 PM)</TableCell>
                  <TableCell className="text-right">$5,700</TableCell>
                  <TableCell className="text-right">28%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dinner (5 PM - 9 PM)</TableCell>
                  <TableCell className="text-right">$8,900</TableCell>
                  <TableCell className="text-right">44%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Off-Peak (Other hours)</TableCell>
                  <TableCell className="text-right">$5,600</TableCell>
                  <TableCell className="text-right">28%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeAnalysis;
