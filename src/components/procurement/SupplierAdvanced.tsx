
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Package, 
  Truck, 
  Calendar, 
  BarChart3, 
  Search,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  PenLine,
  Plus,
  Send,
  Paperclip,
  Image as ImageIcon,
  ArrowUpRight,
  Filter,
  Bell,
  RefreshCw,
  Grid,
  ListFilter
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { suppliers } from '@/data/procurementData';

// Sample data for demonstration purposes
const orderData = [
  {
    id: 'PO-4201',
    supplier: 'Fresh Foods',
    items: [
      { name: 'Tomatoes', quantity: '10kg', price: 48.50 },
      { name: 'Lettuce', quantity: '5kg', price: 22.75 }
    ],
    status: 'Pending Confirmation',
    createdAt: new Date(2023, 6, 20),
    deliveryDate: new Date(2023, 6, 25),
    urgency: 'High',
    total: 71.25
  },
  {
    id: 'PO-4200',
    supplier: 'Premium Meats',
    items: [
      { name: 'Chicken Breast', quantity: '15kg', price: 187.50 },
      { name: 'Ground Beef', quantity: '10kg', price: 152.00 }
    ],
    status: 'Confirmed',
    createdAt: new Date(2023, 6, 19),
    deliveryDate: new Date(2023, 6, 24),
    urgency: 'Normal',
    total: 339.50
  },
  {
    id: 'PO-4198',
    supplier: 'Fresh Foods',
    items: [
      { name: 'Onions', quantity: '20kg', price: 60.00 },
      { name: 'Bell Peppers', quantity: '8kg', price: 64.00 }
    ],
    status: 'In Transit',
    createdAt: new Date(2023, 6, 18),
    deliveryDate: new Date(2023, 6, 23),
    urgency: 'Normal',
    total: 124.00
  },
  {
    id: 'PO-4195',
    supplier: 'Global Spices',
    items: [
      { name: 'Paprika', quantity: '2kg', price: 44.80 },
      { name: 'Black Pepper', quantity: '3kg', price: 56.70 }
    ],
    status: 'Delivered',
    createdAt: new Date(2023, 6, 15),
    deliveryDate: new Date(2023, 6, 20),
    urgency: 'Normal',
    total: 101.50
  }
];

const messages = [
  {
    id: 1,
    supplier: 'Fresh Foods',
    topic: 'Delivery Time Change Request',
    messages: [
      {
        id: 1,
        sender: 'Harbor View Bistro',
        content: 'Could we change tomorrow\'s delivery to the afternoon instead of morning?',
        timestamp: new Date(2023, 6, 20, 9, 30),
        read: true
      },
      {
        id: 2,
        sender: 'Fresh Foods',
        content: 'Yes, we can reschedule for 2pm. Does that work for you?',
        timestamp: new Date(2023, 6, 20, 10, 15),
        read: true
      },
      {
        id: 3,
        sender: 'Harbor View Bistro',
        content: '2pm works perfectly. Thank you!',
        timestamp: new Date(2023, 6, 20, 10, 30),
        read: true
      }
    ],
    unread: 0
  },
  {
    id: 2,
    supplier: 'Premium Meats',
    topic: 'Special Order Request',
    messages: [
      {
        id: 1,
        sender: 'Harbor View Bistro',
        content: 'Do you have prime rib available for a special event this weekend?',
        timestamp: new Date(2023, 6, 19, 14, 0),
        read: true
      },
      {
        id: 2,
        sender: 'Premium Meats',
        content: 'We can get that for you. How many kg do you need?',
        timestamp: new Date(2023, 6, 19, 15, 30),
        read: false
      }
    ],
    unread: 1
  },
  {
    id: 3,
    supplier: 'Global Spices',
    topic: 'Bulk Order Discount',
    messages: [
      {
        id: 1,
        sender: 'Harbor View Bistro',
        content: 'We\'re planning to place a large spice order for the quarter. Are bulk discounts available?',
        timestamp: new Date(2023, 6, 18, 11, 45),
        read: true
      }
    ],
    unread: 0
  }
];

const products = [
  {
    id: 1,
    name: 'Tomatoes (Roma)',
    supplier: 'Fresh Foods',
    price: 4.85,
    unit: 'kg',
    category: 'Produce',
    availability: 'In Stock',
    image: '🍅',
    organic: true,
    restockDate: null
  },
  {
    id: 2,
    name: 'Lettuce (Iceberg)',
    supplier: 'Fresh Foods',
    price: 4.55,
    unit: 'kg',
    category: 'Produce',
    availability: 'In Stock',
    image: '🥬',
    organic: true,
    restockDate: null
  },
  {
    id: 3,
    name: 'Chicken Breast (Boneless)',
    supplier: 'Premium Meats',
    price: 12.50,
    unit: 'kg',
    category: 'Meat',
    availability: 'In Stock',
    image: '🍗',
    organic: false,
    restockDate: null
  },
  {
    id: 4,
    name: 'Ground Beef (85/15)',
    supplier: 'Premium Meats',
    price: 15.20,
    unit: 'kg',
    category: 'Meat',
    availability: 'In Stock',
    image: '🥩',
    organic: false,
    restockDate: null
  },
  {
    id: 5,
    name: 'Paprika (Smoked)',
    supplier: 'Global Spices',
    price: 22.40,
    unit: 'kg',
    category: 'Spices',
    availability: 'Low Stock',
    image: '🌶️',
    organic: false,
    restockDate: new Date(2023, 6, 30)
  },
  {
    id: 6,
    name: 'Black Pepper (Whole)',
    supplier: 'Global Spices',
    price: 18.90,
    unit: 'kg',
    category: 'Spices',
    availability: 'In Stock',
    image: '⚫',
    organic: true,
    restockDate: null
  },
  {
    id: 7,
    name: 'Onions (Yellow)',
    supplier: 'Fresh Foods',
    price: 3.00,
    unit: 'kg',
    category: 'Produce',
    availability: 'In Stock',
    image: '🧅',
    organic: false,
    restockDate: null
  },
  {
    id: 8,
    name: 'Bell Peppers (Mixed)',
    supplier: 'Fresh Foods',
    price: 8.00,
    unit: 'kg',
    category: 'Produce',
    availability: 'In Stock',
    image: '🫑',
    organic: true,
    restockDate: null
  }
];

const deliveries = [
  {
    id: 'DEL-3021',
    orderId: 'PO-4195',
    supplier: 'Global Spices',
    status: 'Completed',
    scheduledDate: new Date(2023, 6, 20),
    actualDate: new Date(2023, 6, 20, 10, 15),
    driver: 'Michael Chen',
    notes: 'Delivered to back entrance'
  },
  {
    id: 'DEL-3022',
    orderId: 'PO-4198',
    supplier: 'Fresh Foods',
    status: 'In Transit',
    scheduledDate: new Date(2023, 6, 23),
    estimatedArrival: new Date(2023, 6, 23, 14, 30),
    driver: 'Sarah Johnson',
    location: 'Approaching destination'
  },
  {
    id: 'DEL-3023',
    orderId: 'PO-4200',
    supplier: 'Premium Meats',
    status: 'Scheduled',
    scheduledDate: new Date(2023, 6, 24, 9, 0),
    driver: 'David Williams',
    notes: 'Please have loading dock clear'
  },
  {
    id: 'DEL-3024',
    orderId: 'PO-4201',
    supplier: 'Fresh Foods',
    status: 'Pending Confirmation',
    scheduledDate: new Date(2023, 6, 25),
    notes: 'Awaiting supplier confirmation'
  }
];

// Status badge colors
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending Confirmation':
      return "bg-carbon-gray-20 text-carbon-gray-100";
    case 'Confirmed':
      return "bg-carbon-blue-20 text-carbon-blue-70";
    case 'In Transit':
      return "bg-amber-100 text-amber-800";
    case 'Delivered':
    case 'Completed':
      return "bg-green-100 text-green-800";
    case 'Scheduled':
      return "bg-purple-100 text-purple-800";
    case 'Low Stock':
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-carbon-gray-20 text-carbon-gray-100";
  }
};

// Status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Pending Confirmation':
      return <Clock className="h-4 w-4" />;
    case 'Confirmed':
      return <CheckCircle className="h-4 w-4" />;
    case 'In Transit':
      return <Truck className="h-4 w-4" />;
    case 'Delivered':
    case 'Completed':
      return <CheckCircle className="h-4 w-4" />;
    case 'Scheduled':
      return <Calendar className="h-4 w-4" />;
    case 'Low Stock':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const SupplierAdvanced: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newMessage, setNewMessage] = useState('');
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [productView, setProductView] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the supplier.",
    });
    
    setNewMessage('');
  };

  const handlePlaceOrder = (productId: number) => {
    toast({
      title: "Product added to order",
      description: "The product has been added to your current order.",
    });
  };

  const handleUpdateDelivery = (deliveryId: string) => {
    toast({
      title: "Delivery updated",
      description: "The delivery schedule has been updated.",
    });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-xl font-semibold">Supplier Portal & Communication Interface</h2>
        <p className="text-kitchen-muted-foreground mt-1">
          Centralized hub for restaurant and supplier collaboration
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="orders">Order Management</TabsTrigger>
          <TabsTrigger value="communication">Communication Hub</TabsTrigger>
          <TabsTrigger value="products">Product Catalog</TabsTrigger>
          <TabsTrigger value="deliveries">Delivery Scheduling</TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-carbon-blue-60" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderData.slice(0, 3).map((order, index) => (
                    <div key={order.id} className="flex items-start border-b last:border-0 pb-3 last:pb-0">
                      <div className={`p-2 rounded-full mr-3 ${getStatusColor(order.status)} bg-opacity-20`}>
                        {getStatusIcon(order.status)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Order {order.id}</h3>
                          <span className="text-sm text-kitchen-muted-foreground">
                            {format(order.createdAt, 'MMM d, h:mm a')}
                          </span>
                        </div>
                        <p className="text-sm text-kitchen-muted-foreground">
                          {order.status} - {order.supplier}
                        </p>
                        <p className="text-sm mt-1">
                          {order.items.length} items · ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-carbon-blue-60" />
                      Recent Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {messages.slice(0, 2).map((conversation) => (
                      <div key={conversation.id} className="border-b last:border-0 pb-2 last:pb-0">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{conversation.supplier}</h3>
                          {conversation.unread > 0 && (
                            <Badge className="bg-carbon-blue-60">{conversation.unread}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-kitchen-muted-foreground truncate">
                          {conversation.topic}
                        </p>
                        <p className="text-sm mt-1 truncate">
                          {conversation.messages[conversation.messages.length - 1].content}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setActiveTab('communication')}
                    >
                      Open Communication Hub
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-carbon-blue-60" />
                      Upcoming Deliveries
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {deliveries.filter(d => ['Scheduled', 'In Transit'].includes(d.status)).slice(0, 2).map((delivery) => (
                      <div key={delivery.id} className="border-b last:border-0 pb-2 last:pb-0">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{delivery.supplier}</h3>
                          <Badge className={getStatusColor(delivery.status)}>
                            {delivery.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-kitchen-muted-foreground">
                          Order {delivery.orderId}
                        </p>
                        <p className="text-sm mt-1">
                          {format(delivery.scheduledDate, 'MMM d, yyyy')}
                          {delivery.status === 'In Transit' && delivery.estimatedArrival && (
                            <span> · ETA: {format(delivery.estimatedArrival, 'h:mm a')}</span>
                          )}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setActiveTab('deliveries')}
                    >
                      View All Deliveries
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            <div className="md:col-span-4 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-carbon-blue-60" />
                    Supplier Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">On-Time Delivery</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Order Accuracy</span>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Response Time</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-carbon-blue-60" />
                    Action Required
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="border-b pb-2">
                    <div className="flex items-center">
                      <Badge className="bg-carbon-red-50 mr-2">Urgent</Badge>
                      <h3 className="font-medium">Confirm PO-4201</h3>
                    </div>
                    <p className="text-sm text-kitchen-muted-foreground mt-1">
                      Fresh Foods needs confirmation
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Badge className="bg-amber-500 mr-2">Review</Badge>
                      <h3 className="font-medium">Price Update</h3>
                    </div>
                    <p className="text-sm text-kitchen-muted-foreground mt-1">
                      Global Spices updated pricing
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full bg-carbon-blue-60 hover:bg-carbon-blue-70">
                    Take Action
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Order Management Tab */}
        <TabsContent value="orders" className="pt-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
            <div className="relative w-full sm:w-72 lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-9 bg-white border-kitchen-border"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-kitchen-foreground">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button 
                size="sm" 
                className="bg-kitchen-primary hover:bg-kitchen-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Order
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {orderData.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <div className={`h-1 ${
                  order.status === 'Pending Confirmation' ? 'bg-carbon-gray-50' :
                  order.status === 'Confirmed' ? 'bg-carbon-blue-60' :
                  order.status === 'In Transit' ? 'bg-amber-500' :
                  'bg-green-500'
                }`} />
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold">Order {order.id}</h3>
                      {order.urgency === 'High' && (
                        <Badge className="ml-2 bg-carbon-red-50">Urgent</Badge>
                      )}
                    </div>
                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 mt-1 text-sm text-kitchen-muted-foreground">
                    <div>Supplier: {order.supplier}</div>
                    <div>Ordered: {format(order.createdAt, 'MMM d, yyyy')}</div>
                    <div>Delivery: {format(order.deliveryDate, 'MMM d, yyyy')}</div>
                    <div className="font-medium text-kitchen-foreground">Total: ${order.total.toFixed(2)}</div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="border rounded-md">
                    <div className="bg-kitchen-muted px-4 py-2 text-sm font-medium border-b">
                      Order Items
                    </div>
                    <div className="divide-y">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="px-4 py-3 flex justify-between">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-kitchen-muted-foreground">Quantity: {item.quantity}</div>
                          </div>
                          <div className="text-right">
                            <div>${item.price.toFixed(2)}</div>
                            <div className="text-sm text-kitchen-muted-foreground">
                              ${(item.price * parseInt(item.quantity)).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  
                  {order.status === 'Pending Confirmation' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <PenLine className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button size="sm" className="bg-carbon-blue-60 hover:bg-carbon-blue-70">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirm
                      </Button>
                    </div>
                  )}
                  
                  {order.status === 'Confirmed' && (
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                      <Truck className="mr-2 h-4 w-4" />
                      Track
                    </Button>
                  )}
                  
                  {order.status === 'In Transit' && (
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Receive
                    </Button>
                  )}
                  
                  {order.status === 'Delivered' && (
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Supplier
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Communication Hub Tab */}
        <TabsContent value="communication" className="pt-4">
          <div className="bg-white border border-kitchen-border h-[calc(100vh-300px)] min-h-[500px] rounded-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 h-full">
              {/* Conversation List */}
              <div className="border-r">
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-9 bg-white border-kitchen-border"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto h-[calc(100%-56px)]">
                  {messages.map((conversation) => (
                    <div 
                      key={conversation.id}
                      className={`p-3 border-b hover:bg-kitchen-muted/30 cursor-pointer ${
                        activeConversation === conversation.id ? 'bg-kitchen-muted/50' : ''
                      }`}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{conversation.supplier}</h3>
                        <div className="flex items-center gap-1">
                          {conversation.unread > 0 && (
                            <Badge className="bg-carbon-blue-60">{conversation.unread}</Badge>
                          )}
                          <span className="text-xs text-kitchen-muted-foreground">
                            {format(conversation.messages[conversation.messages.length - 1].timestamp, 'MMM d')}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-kitchen-muted-foreground mt-1">
                        {conversation.topic}
                      </div>
                      <p className="text-sm text-kitchen-muted-foreground mt-1 truncate">
                        {conversation.messages[conversation.messages.length - 1].content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Conversation */}
              <div className="col-span-2 flex flex-col h-full">
                {activeConversation ? (
                  <>
                    <div className="p-3 border-b flex justify-between items-center">
                      <div>
                        <h2 className="font-medium">
                          {messages.find(m => m.id === activeConversation)?.supplier}
                        </h2>
                        <p className="text-sm text-kitchen-muted-foreground">
                          {messages.find(m => m.id === activeConversation)?.topic}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                      {messages
                        .find(m => m.id === activeConversation)
                        ?.messages.map((message) => (
                          <div 
                            key={message.id}
                            className={`flex ${
                              message.sender !== 'Harbor View Bistro' ? 'justify-start' : 'justify-end'
                            }`}
                          >
                            <div 
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.sender !== 'Harbor View Bistro' 
                                  ? 'bg-kitchen-muted' 
                                  : 'bg-carbon-blue-60 text-white'
                              }`}
                            >
                              <div className="text-sm">
                                {message.content}
                              </div>
                              <div className={`text-xs mt-1 ${
                                message.sender !== 'Harbor View Bistro' 
                                  ? 'text-kitchen-muted-foreground' 
                                  : 'text-white/80'
                              }`}>
                                {format(message.timestamp, 'h:mm a')}
                                {message.read && message.sender === 'Harbor View Bistro' && (
                                  <span className="ml-1">· Read</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    
                    <div className="p-3 border-t">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="shrink-0">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Type your message..."
                          className="bg-white border-kitchen-border"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button 
                          className="bg-carbon-blue-60 hover:bg-carbon-blue-70 shrink-0" 
                          size="icon"
                          onClick={handleSendMessage}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MessageSquare className="h-12 w-12 text-kitchen-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-medium">No Conversation Selected</h3>
                      <p className="text-kitchen-muted-foreground mt-2">
                        Select a conversation from the list or start a new one
                      </p>
                      <Button className="mt-4 bg-carbon-blue-60 hover:bg-carbon-blue-70">
                        <Plus className="mr-2 h-4 w-4" />
                        New Conversation
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Product Catalog Tab */}
        <TabsContent value="products" className="pt-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
            <div className="relative w-full sm:w-72 lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9 bg-white border-kitchen-border"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-kitchen-foreground">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <div className="flex border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  className={productView === 'grid' ? 'bg-kitchen-muted' : ''}
                  onClick={() => setProductView('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={productView === 'list' ? 'bg-kitchen-muted' : ''}
                  onClick={() => setProductView('list')}
                >
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {productView === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square bg-kitchen-muted flex items-center justify-center text-4xl">
                    {product.image}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{product.name}</h3>
                      {product.organic && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Organic
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>
                      <span className="text-sm text-kitchen-muted-foreground">per {product.unit}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge className={getStatusColor(product.availability)}>
                        {product.availability}
                      </Badge>
                      <span className="text-sm text-kitchen-muted-foreground">{product.supplier}</span>
                    </div>
                    {product.availability === 'Low Stock' && product.restockDate && (
                      <p className="text-sm text-kitchen-muted-foreground mt-2">
                        Restock: {format(product.restockDate, 'MMM d, yyyy')}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      className="w-full bg-carbon-blue-60 hover:bg-carbon-blue-70"
                      onClick={() => handlePlaceOrder(product.id)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Order
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="divide-y">
                {products.map((product) => (
                  <div key={product.id} className="p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                    <div className="w-16 h-16 bg-kitchen-muted flex items-center justify-center text-2xl shrink-0">
                      {product.image}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{product.name}</h3>
                            {product.organic && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Organic
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-kitchen-muted-foreground">{product.supplier}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
                          <div className="text-sm text-kitchen-muted-foreground">per {product.unit}</div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge className={getStatusColor(product.availability)}>
                          {product.availability}
                        </Badge>
                        
                        {product.availability === 'Low Stock' && product.restockDate && (
                          <span className="text-sm text-kitchen-muted-foreground">
                            Restock: {format(product.restockDate, 'MMM d, yyyy')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Button 
                        className="w-full bg-carbon-blue-60 hover:bg-carbon-blue-70"
                        onClick={() => handlePlaceOrder(product.id)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Order
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>
        
        {/* Delivery Scheduling Tab */}
        <TabsContent value="deliveries" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-carbon-blue-60" />
                    Delivery Schedule
                  </CardTitle>
                  <CardDescription>
                    View and manage upcoming and past deliveries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deliveries.map((delivery) => (
                      <div 
                        key={delivery.id} 
                        className={`border p-4 rounded-md ${
                          delivery.status === 'In Transit' ? 'border-amber-400 bg-amber-50' : ''
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center">
                            <h3 className="font-medium">Delivery {delivery.id}</h3>
                            <Badge className={`ml-2 ${getStatusColor(delivery.status)}`}>
                              {delivery.status}
                            </Badge>
                          </div>
                          <span className="text-sm">
                            Order: {delivery.orderId}
                          </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-sm text-kitchen-muted-foreground mb-3">
                          <div>Supplier: {delivery.supplier}</div>
                          <div>
                            {delivery.status === 'Completed' ? 'Delivered' : 'Scheduled'}: {' '}
                            {format(delivery.scheduledDate, 'MMM d, yyyy')}
                            {delivery.status === 'Scheduled' && ' - Expected AM'}
                          </div>
                          {delivery.status === 'In Transit' && delivery.estimatedArrival && (
                            <div className="font-medium text-amber-800">
                              ETA: {format(delivery.estimatedArrival, 'h:mm a')}
                            </div>
                          )}
                        </div>
                        
                        {delivery.driver && (
                          <div className="text-sm mb-3">
                            <span className="text-kitchen-muted-foreground">Driver: </span>
                            {delivery.driver}
                          </div>
                        )}
                        
                        {delivery.notes && (
                          <div className="text-sm">
                            <span className="text-kitchen-muted-foreground">Notes: </span>
                            {delivery.notes}
                          </div>
                        )}
                        
                        {delivery.location && (
                          <div className="text-sm">
                            <span className="text-kitchen-muted-foreground">Status: </span>
                            {delivery.location}
                          </div>
                        )}
                        
                        <div className="mt-4 flex justify-end gap-2">
                          {delivery.status === 'Pending Confirmation' && (
                            <>
                              <Button variant="outline" size="sm">
                                Request Change
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-carbon-blue-60 hover:bg-carbon-blue-70"
                                onClick={() => handleUpdateDelivery(delivery.id)}
                              >
                                Confirm
                              </Button>
                            </>
                          )}
                          
                          {delivery.status === 'Scheduled' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUpdateDelivery(delivery.id)}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              Reschedule
                            </Button>
                          )}
                          
                          {delivery.status === 'In Transit' && (
                            <Button 
                              size="sm" 
                              className="bg-carbon-blue-60 hover:bg-carbon-blue-70"
                            >
                              <Truck className="mr-2 h-4 w-4" />
                              Track
                            </Button>
                          )}
                          
                          {delivery.status === 'Completed' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-4">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <RefreshCw className="h-5 w-5 mr-2 text-carbon-blue-60" />
                      Delivery Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Fresh Foods</span>
                        <span className="text-sm font-medium">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Premium Meats</span>
                        <span className="text-sm font-medium">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Global Spices</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-carbon-blue-60" />
                      Delivery Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="border-b pb-2">
                      <div className="flex items-center">
                        <Badge className="bg-amber-500 mr-2">Delay</Badge>
                        <h3 className="font-medium">Fresh Foods</h3>
                      </div>
                      <p className="text-sm text-kitchen-muted-foreground mt-1">
                        Delivery may be delayed due to traffic
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <Badge className="bg-carbon-blue-60 mr-2">Weather</Badge>
                        <h3 className="font-medium">Thursday Deliveries</h3>
                      </div>
                      <p className="text-sm text-kitchen-muted-foreground mt-1">
                        Possible storm may affect deliveries
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <ArrowUpRight className="h-5 w-5 mr-2 text-carbon-blue-60" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule New Delivery
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Delivery Driver
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Delivery Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierAdvanced;
