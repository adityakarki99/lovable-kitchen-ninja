
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, Percent, TrendingUp } from 'lucide-react';
import { monthlyCogsData, categoryCogsData, cogsMetrics } from '@/data/financial/cogsData';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const CogsDashboard = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-kitchen-muted-foreground">Total COGS</h3>
                <p className="text-3xl font-bold mt-2">${cogsMetrics.currentPeriod.total.toLocaleString()}</p>
                <div className="flex items-center text-xs mt-1">
                  {cogsMetrics.currentPeriod.trend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-kitchen-danger mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-kitchen-success mr-1" />
                  )}
                  <span className={cogsMetrics.currentPeriod.trend > 0 ? "text-kitchen-danger" : "text-kitchen-success"}>
                    {Math.abs(cogsMetrics.currentPeriod.trend)}% from last period
                  </span>
                </div>
              </div>
              <div className="rounded-full p-2 bg-kitchen-primary/10">
                <DollarSign className="h-5 w-5 text-kitchen-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-kitchen-muted-foreground">COGS % of Sales</h3>
                <p className="text-3xl font-bold mt-2">{cogsMetrics.currentPeriod.percentOfSales}%</p>
                <div className="flex items-center text-xs mt-1">
                  <span className="text-kitchen-muted-foreground">
                    Industry avg: {cogsMetrics.benchmark.industryAverage}%
                  </span>
                </div>
              </div>
              <div className="rounded-full p-2 bg-yellow-100">
                <Percent className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-kitchen-muted-foreground">COGS Per Plate</h3>
                <p className="text-3xl font-bold mt-2">${cogsMetrics.currentPeriod.perPlate}</p>
                <div className="flex items-center text-xs mt-1">
                  <span className="text-kitchen-muted-foreground">
                    Target: ${cogsMetrics.previousPeriod.perPlate}
                  </span>
                </div>
              </div>
              <div className="rounded-full p-2 bg-kitchen-muted">
                <TrendingUp className="h-5 w-5 text-kitchen-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">COGS Trend (Last 12 Months)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyCogsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'COGS']} 
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Line type="monotone" dataKey="cogs" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">COGS by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryCogsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cost"
                    nameKey="category"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryCogsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* COGS to Sales Ratio Chart */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">COGS to Sales Ratio</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyCogsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip formatter={(value, name) => {
                  if (name === 'cogs' || name === 'sales') return [`$${value.toLocaleString()}`, name === 'cogs' ? 'COGS' : 'Sales'];
                  return [`${value}%`, 'COGS %'];
                }} />
                <Bar yAxisId="left" dataKey="cogs" name="COGS" fill="#8884d8" barSize={30} />
                <Bar yAxisId="left" dataKey="sales" name="Sales" fill="#82ca9d" barSize={30} />
                <Line yAxisId="right" type="monotone" dataKey="percentage" name="COGS %" stroke="#ff7300" strokeWidth={3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CogsDashboard;
