
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { wasteRecommendations, wasteItems, calculateWasteMetrics } from '@/data/wastageData';
import { Sparkles, CheckCheck, PlayCircle, ThumbsUp, ArrowRight, Clock, BarChart, Lightbulb } from 'lucide-react';

const WasteRecommendations: React.FC = () => {
  const metrics = calculateWasteMetrics();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-kitchen-primary/10 text-kitchen-primary border-kitchen-primary';
      case 'In Progress':
        return 'bg-kitchen-warning/10 text-kitchen-warning border-kitchen-warning';
      case 'Implemented':
        return 'bg-kitchen-success/10 text-kitchen-success border-kitchen-success';
      default:
        return 'bg-kitchen-muted text-kitchen-muted-foreground';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New':
        return <Lightbulb className="h-4 w-4 mr-1" />;
      case 'In Progress':
        return <PlayCircle className="h-4 w-4 mr-1" />;
      case 'Implemented':
        return <CheckCheck className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6 animate-slide-up">
      {/* AI Insights Banner */}
      <Card className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] text-white">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/20 p-3">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">AI-Powered Waste Reduction Insights</h3>
              <p className="text-white/80">
                Our system has analyzed your waste patterns and identified opportunities to reduce waste by up to 15% based on historical data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Key Recommendations Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wasteRecommendations.slice(0, 3).map((recommendation) => (
          <Card key={recommendation.id} className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                <Badge variant="outline" className={getStatusColor(recommendation.status)}>
                  {getStatusIcon(recommendation.status)}
                  {recommendation.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-kitchen-muted-foreground mb-4">{recommendation.description}</p>
              <div className="flex items-center gap-2 text-sm text-kitchen-success">
                <ThumbsUp className="h-4 w-4" />
                <span>{recommendation.impact}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={recommendation.status === 'Implemented' ? 'outline' : 'default'} 
                className="w-full"
                disabled={recommendation.status === 'Implemented'}
              >
                {recommendation.status === 'Implemented' ? 'Implemented' : 'Implement Now'}
                {recommendation.status !== 'Implemented' && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Waste Reduction Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Top Waste Reduction Opportunities</CardTitle>
          <CardDescription>These items represent your biggest opportunities for cost savings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Current Waste</TableHead>
                <TableHead>Potential Savings</TableHead>
                <TableHead>Recommended Action</TableHead>
                <TableHead className="text-right">Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.topWastedItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">${item.value.toFixed(2)}</span>
                      <span className="text-kitchen-muted-foreground">({item.quantity} {item.unit})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-kitchen-success">${(item.value * 0.7).toFixed(2)}</span>
                      <span className="text-kitchen-muted-foreground">(70% reduction)</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {index === 0 && "Reduce prep quantity by 20%"}
                    {index === 1 && "Improve storage conditions"}
                    {index === 2 && "Use trim for staff meals"}
                    {index === 3 && "Adjust ordering frequency"}
                    {index === 4 && "Review portion sizing"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={
                      index < 2 ? "bg-kitchen-danger/10 text-kitchen-danger" :
                      index < 4 ? "bg-kitchen-warning/10 text-kitchen-warning" :
                      "bg-kitchen-muted text-kitchen-muted-foreground"
                    }>
                      {index < 2 ? "High" : index < 4 ? "Medium" : "Low"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Waste Reduction Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Waste Reduction Progress</CardTitle>
          <CardDescription>Track your progress towards waste reduction goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Overall Waste Reduction</span>
                <span className="font-medium text-kitchen-success">8.2% Reduction</span>
              </div>
              <Progress value={8.2} max={15} className="h-2" />
              <div className="flex justify-between text-xs text-kitchen-muted-foreground">
                <span>Current: 8.2%</span>
                <span>Goal: 15%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Overproduction Waste</span>
                <span className="font-medium text-kitchen-success">12.5% Reduction</span>
              </div>
              <Progress value={12.5} max={25} className="h-2" />
              <div className="flex justify-between text-xs text-kitchen-muted-foreground">
                <span>Current: 12.5%</span>
                <span>Goal: 25%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Spoilage Waste</span>
                <span className="font-medium text-kitchen-warning">5.3% Reduction</span>
              </div>
              <Progress value={5.3} max={20} className="h-2" />
              <div className="flex justify-between text-xs text-kitchen-muted-foreground">
                <span>Current: 5.3%</span>
                <span>Goal: 20%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Trim Waste Recovery</span>
                <span className="font-medium text-kitchen-success">18.7% Recovered</span>
              </div>
              <Progress value={18.7} max={30} className="h-2" />
              <div className="flex justify-between text-xs text-kitchen-muted-foreground">
                <span>Current: 18.7%</span>
                <span>Goal: 30%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* All Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>All Recommendations</CardTitle>
          <CardDescription>Complete list of system-generated recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recommendation</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wasteRecommendations.map((recommendation) => (
                <TableRow key={recommendation.id}>
                  <TableCell>
                    <div className="font-medium">{recommendation.title}</div>
                    <div className="text-sm text-kitchen-muted-foreground">{recommendation.description}</div>
                  </TableCell>
                  <TableCell className="font-medium text-kitchen-success">{recommendation.impact}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(recommendation.status)}>
                      {getStatusIcon(recommendation.status)}
                      {recommendation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      {recommendation.status === 'Implemented' ? 'View Details' : 'Implement'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WasteRecommendations;
