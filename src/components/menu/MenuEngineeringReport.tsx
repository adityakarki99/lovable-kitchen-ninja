
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, FileText, Mail } from 'lucide-react';

// Mock data for category profitability
const categoryProfitData = [
  { name: 'Appetizers', avgMargin: 55, menuMix: 20, sales: 5200 },
  { name: 'Main Courses', avgMargin: 60, menuMix: 45, sales: 12500 },
  { name: 'Desserts', avgMargin: 70, menuMix: 15, sales: 3800 },
  { name: 'Beverages', avgMargin: 75, menuMix: 20, sales: 4500 },
];

// Mock data for sales trends
const salesTrendData = [
  { name: 'Week 1', stars: 5800, puzzles: 1200, plowHorses: 4500, dogs: 800 },
  { name: 'Week 2', stars: 6200, puzzles: 1400, plowHorses: 4700, dogs: 750 },
  { name: 'Week 3', stars: 5900, puzzles: 1300, plowHorses: 4600, dogs: 720 },
  { name: 'Week 4', stars: 6500, puzzles: 1500, plowHorses: 4900, dogs: 680 },
];

// Mock data for action items
const actionItems = [
  { id: 1, action: 'Increase price of Garlic Bread by $0.50', impact: '+$100/week', priority: 'High' },
  { id: 2, action: 'Re-position Wagyu Steak in menu layout', impact: '+$250/week', priority: 'Medium' },
  { id: 3, action: 'Remove Vegetable Soup from menu', impact: '+$50/week', priority: 'Low' },
  { id: 4, action: 'Add combo offer: Burger + Beverage', impact: '+$350/week', priority: 'High' },
  { id: 5, action: 'Update Quinoa Salad recipe to reduce costs', impact: '+$80/week', priority: 'Medium' },
];

const MenuEngineeringReport: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Menu Engineering Report</h2>
          <p className="text-kitchen-muted-foreground">Monthly analysis and recommendations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      {/* Menu Composition */}
      <Card className="shadow-apple-sm">
        <CardHeader>
          <CardTitle className="text-lg">Menu Composition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Quadrant Distribution</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Stars (6)</span>
                    <span>40%</span>
                  </div>
                  <Progress value={40} className="h-2 bg-kitchen-muted" indicatorColor="bg-yellow-500" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Puzzles (3)</span>
                    <span>20%</span>
                  </div>
                  <Progress value={20} className="h-2 bg-kitchen-muted" indicatorColor="bg-blue-500" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Plow Horses (3)</span>
                    <span>20%</span>
                  </div>
                  <Progress value={20} className="h-2 bg-kitchen-muted" indicatorColor="bg-green-500" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Dogs (3)</span>
                    <span>20%</span>
                  </div>
                  <Progress value={20} className="h-2 bg-kitchen-muted" indicatorColor="bg-red-500" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Category Profitability</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryProfitData}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis tickFormatter={(value) => `${value}%`} fontSize={12} />
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, 'Avg. Margin']}
                      labelFormatter={(label) => `Category: ${label}`}
                    />
                    <Bar dataKey="avgMargin" fill="#0071e3" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Sales Trends */}
      <Card className="shadow-apple-sm">
        <CardHeader>
          <CardTitle className="text-lg">Sales Trends by Quadrant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesTrendData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis tickFormatter={(value) => `$${value}`} fontSize={12} />
                <Tooltip formatter={(value: number) => [`$${value}`, '']} />
                <Line type="monotone" dataKey="stars" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="puzzles" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="plowHorses" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="dogs" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Recommended Actions */}
      <Card className="shadow-apple-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {actionItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border border-kitchen-border rounded-md">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-kitchen-primary" />
                    <span className="font-medium">{item.action}</span>
                  </div>
                  <p className="text-kitchen-success ml-6 mt-1 text-sm">Estimated Impact: {item.impact}</p>
                </div>
                <Badge className={`${
                  item.priority === 'High' ? 'bg-kitchen-primary/10 text-kitchen-primary' : 
                  item.priority === 'Medium' ? 'bg-kitchen-warning/10 text-kitchen-warning' : 
                  'bg-kitchen-muted text-kitchen-muted-foreground'
                }`}>
                  {item.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuEngineeringReport;
