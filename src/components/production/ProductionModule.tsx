import React, { useState } from 'react';
import { Search, Filter, Calendar, CheckCircle, Clock, AlertTriangle, ChefHat, Thermometer, Utensils, Clipboard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const productionTasks = [
  { 
    id: 1, 
    task: 'Prep Fish Batter', 
    recipe: 'Beer Battered Fish & Chips',
    assignedTo: 'Chef Aditya', 
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    status: 'completed',
    ingredients: [
      { name: 'Beer Batter Mix', quantity: '5kg' },
      { name: 'Salt', quantity: '0.5kg' }
    ],
    equipment: ['Mixing Bowl', 'Whisk'],
    progress: 100
  },
  { 
    id: 2, 
    task: 'Chop Vegetables', 
    recipe: 'Caesar Salad',
    assignedTo: 'Line Cook Sam', 
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    status: 'in-progress',
    ingredients: [
      { name: 'Lettuce', quantity: '3kg' },
      { name: 'Tomatoes', quantity: '2kg' },
      { name: 'Onions', quantity: '1kg' }
    ],
    equipment: ['Cutting Board', 'Chef Knife'],
    progress: 60
  },
  { 
    id: 3, 
    task: 'Prepare Dough', 
    recipe: 'Pizza Margherita',
    assignedTo: 'Baker Jordan', 
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    status: 'delayed',
    ingredients: [
      { name: 'Flour', quantity: '10kg' },
      { name: 'Yeast', quantity: '0.2kg' },
      { name: 'Salt', quantity: '0.3kg' },
      { name: 'Olive Oil', quantity: '0.5L' }
    ],
    equipment: ['Stand Mixer', 'Proofing Baskets'],
    progress: 10
  },
  { 
    id: 4, 
    task: 'Marinate Steaks', 
    recipe: 'Grilled T-Bone Steak',
    assignedTo: 'Chef Sophia', 
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    status: 'scheduled',
    ingredients: [
      { name: 'T-Bone Steaks', quantity: '15kg' },
      { name: 'Herbs', quantity: '0.2kg' },
      { name: 'Garlic', quantity: '0.3kg' },
      { name: 'Olive Oil', quantity: '1L' }
    ],
    equipment: ['Food Container', 'Vacuum Sealer'],
    progress: 0
  },
  { 
    id: 5, 
    task: 'Stock Reduction', 
    recipe: 'Beef Bourguignon',
    assignedTo: 'Sous Chef Marcus', 
    startTime: '10:30 AM',
    endTime: '01:30 PM',
    status: 'completed',
    ingredients: [
      { name: 'Beef Stock', quantity: '10L' },
      { name: 'Red Wine', quantity: '2L' },
      { name: 'Vegetables', quantity: '2kg' }
    ],
    equipment: ['Stock Pot', 'Strainer'],
    progress: 100
  },
];

const equipmentStatus = [
  { id: 1, name: 'Walk-in Fridge #1', temp: '3.8°C', status: 'normal', lastChecked: '09:15 AM' },
  { id: 2, name: 'Deep Fryer #1', oilQuality: '85%', status: 'normal', lastChecked: '09:30 AM' },
  { id: 3, name: 'Walk-in Freezer', temp: '-18.2°C', status: 'normal', lastChecked: '09:15 AM' },
  { id: 4, name: 'Deep Fryer #2', oilQuality: '45%', status: 'warning', lastChecked: '09:30 AM' },
  { id: 5, name: 'Oven #1', temp: '180°C', status: 'normal', lastChecked: '10:00 AM' },
  { id: 6, name: 'Prep Fridge #2', temp: '7.2°C', status: 'alert', lastChecked: '09:15 AM' },
];

const haccpLogs = [
  { id: 1, item: 'Walk-in Fridge #1', checkType: 'Temperature', value: '3.8°C', limit: '<5°C', time: '09:15 AM', checkedBy: 'Chef Aditya', status: 'compliant' },
  { id: 2, item: 'Cooked Chicken', checkType: 'Core Temperature', value: '74°C', limit: '>74°C', time: '12:30 PM', checkedBy: 'Sous Chef Marcus', status: 'compliant' },
  { id: 3, item: 'Prep Fridge #2', checkType: 'Temperature', value: '7.2°C', limit: '<5°C', time: '09:15 AM', checkedBy: 'Chef Sophia', status: 'non-compliant' },
  { id: 4, item: 'Beef Soup', checkType: 'Cooling Time', value: '3 hours', limit: '<2 hours', time: '02:45 PM', checkedBy: 'Line Cook Sam', status: 'non-compliant' },
  { id: 5, item: 'Deep Fryer #1', checkType: 'Oil Quality', value: '85%', limit: '>60%', time: '09:30 AM', checkedBy: 'Chef Aditya', status: 'compliant' },
];

const productionMetrics = [
  {
    title: "Active Tasks",
    value: "8",
    description: "Production tasks in progress",
    icon: ChefHat,
  },
  {
    title: "Compliance",
    value: "92%",
    description: "HACCP compliance rate",
    icon: Clipboard,
  },
  {
    title: "Equipment",
    value: "2",
    description: "Alerts requiring attention",
    icon: Thermometer,
    alert: true
  },
  {
    title: "Prep Time",
    value: "85%",
    description: "Tasks completed on schedule",
    icon: Clock,
  }
];

const ProductionModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('tasks');
  
  const filteredTasks = productionTasks.filter(task => 
    task.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.recipe.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-kitchen-success" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-kitchen-warning" />;
      case 'delayed':
        return <AlertTriangle className="h-4 w-4 text-kitchen-danger" />;
      case 'scheduled':
        return <Calendar className="h-4 w-4 text-kitchen-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return "bg-kitchen-success/10 text-kitchen-success";
      case 'in-progress':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      case 'delayed':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      case 'scheduled':
        return "bg-kitchen-muted text-kitchen-muted-foreground";
      case 'normal':
        return "bg-kitchen-success/10 text-kitchen-success";
      case 'warning':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      case 'alert':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      case 'compliant':
        return "bg-kitchen-success/10 text-kitchen-success";
      case 'non-compliant':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {productionMetrics.map((metric, index) => (
          <Card key={index} className={cn("h-full", metric.alert && "border-kitchen-danger/50")}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-kitchen-muted-foreground">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                  {metric.description && <p className="text-sm text-kitchen-muted-foreground mt-1">{metric.description}</p>}
                </div>
                <div className={cn(
                  "rounded-full p-2",
                  metric.alert ? "bg-kitchen-danger/10" : "bg-kitchen-muted"
                )}>
                  <metric.icon className={cn(
                    "h-5 w-5",
                    metric.alert ? "text-kitchen-danger" : "text-kitchen-primary"
                  )} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search tasks, recipes, staff..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-kitchen-foreground">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="bg-kitchen-primary hover:bg-kitchen-primary/90">
            New Production Task
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="tasks">Production Tasks</TabsTrigger>
          <TabsTrigger value="mise">Mise en Place</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="haccp">HACCP Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="pt-4">
          <Card className="shadow-apple-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-kitchen-muted">
                <TableRow>
                  <TableHead className="font-medium">Task</TableHead>
                  <TableHead className="font-medium">Recipe</TableHead>
                  <TableHead className="font-medium">Assigned To</TableHead>
                  <TableHead className="font-medium">Time</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-kitchen-muted/30 cursor-pointer">
                    <TableCell className="font-medium">{task.task}</TableCell>
                    <TableCell>{task.recipe}</TableCell>
                    <TableCell>{task.assignedTo}</TableCell>
                    <TableCell>{task.startTime} - {task.endTime}</TableCell>
                    <TableCell>
                      <div className={cn(
                        "pill-badge inline-flex items-center gap-1",
                        getStatusClass(task.status)
                      )}>
                        {getStatusIcon(task.status)}
                        <span className="capitalize">{task.status.replace('-', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={task.progress} 
                          className="h-2"
                          indicatorColor={cn(
                            task.status === 'completed' ? "bg-kitchen-success" :
                            task.status === 'in-progress' ? "bg-kitchen-warning" :
                            task.status === 'delayed' ? "bg-kitchen-danger" :
                            "bg-kitchen-muted-foreground"
                          )}
                        />
                        <span className="text-xs font-medium">{task.progress}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        <TabsContent value="mise" className="pt-4">
          <div className="grid gap-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="shadow-apple-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{task.task}</CardTitle>
                    <div className={cn(
                      "pill-badge inline-flex items-center gap-1",
                      getStatusClass(task.status)
                    )}>
                      {getStatusIcon(task.status)}
                      <span className="capitalize">{task.status.replace('-', ' ')}</span>
                    </div>
                  </div>
                  <div className="text-sm text-kitchen-muted-foreground">
                    <span>{task.recipe}</span> • <span>{task.assignedTo}</span> • <span>{task.startTime} - {task.endTime}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Ingredients</h3>
                      <div className="space-y-1">
                        {task.ingredients.map((ingredient, idx) => (
                          <div key={idx} className="flex justify-between py-2 border-b border-kitchen-border last:border-0">
                            <span>{ingredient.name}</span>
                            <span className="font-medium">{ingredient.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Equipment</h3>
                      <div className="flex flex-wrap gap-2">
                        {task.equipment.map((item, idx) => (
                          <div key={idx} className="pill-badge bg-kitchen-muted text-kitchen-muted-foreground">
                            <Utensils className="mr-1 h-3 w-3" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Task Progress</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <Progress 
                      value={task.progress} 
                      className="h-2"
                      indicatorColor={cn(
                        task.status === 'completed' ? "bg-kitchen-success" :
                        task.status === 'in-progress' ? "bg-kitchen-warning" :
                        task.status === 'delayed' ? "bg-kitchen-danger" :
                        "bg-kitchen-muted-foreground"
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="equipment" className="pt-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {equipmentStatus.map((equipment) => (
              <Card key={equipment.id} className={cn(
                "shadow-apple-sm",
                equipment.status === 'alert' && "border-kitchen-danger/50",
                equipment.status === 'warning' && "border-kitchen-warning/50"
              )}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{equipment.name}</h3>
                      <div className="mt-2 space-y-1">
                        {equipment.temp && (
                          <div className="flex items-center gap-2">
                            <Thermometer className="h-4 w-4 text-kitchen-muted-foreground" />
                            <span>{equipment.temp}</span>
                          </div>
                        )}
                        {equipment.oilQuality && (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 flex items-center justify-center text-kitchen-muted-foreground">💧</div>
                            <span>Oil Quality: {equipment.oilQuality}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-kitchen-muted-foreground" />
                          <span>Last checked: {equipment.lastChecked}</span>
                        </div>
                      </div>
                    </div>
                    <div className={cn(
                      "pill-badge",
                      getStatusClass(equipment.status)
                    )}>
                      {equipment.status === 'normal' ? 'Normal' : 
                       equipment.status === 'warning' ? 'Warning' : 'Alert'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="haccp" className="pt-4">
          <Card className="shadow-apple-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-kitchen-muted">
                <TableRow>
                  <TableHead className="font-medium">Item</TableHead>
                  <TableHead className="font-medium">Check Type</TableHead>
                  <TableHead className="font-medium">Value</TableHead>
                  <TableHead className="font-medium">Safe Limit</TableHead>
                  <TableHead className="font-medium">Time</TableHead>
                  <TableHead className="font-medium">Checked By</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {haccpLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-kitchen-muted/30">
                    <TableCell className="font-medium">{log.item}</TableCell>
                    <TableCell>{log.checkType}</TableCell>
                    <TableCell>{log.value}</TableCell>
                    <TableCell>{log.limit}</TableCell>
                    <TableCell>{log.time}</TableCell>
                    <TableCell>{log.checkedBy}</TableCell>
                    <TableCell>
                      <div className={cn(
                        "pill-badge inline-flex items-center gap-1",
                        getStatusClass(log.status)
                      )}>
                        {log.status === 'compliant' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                        <span className="capitalize">{log.status}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductionModule;
