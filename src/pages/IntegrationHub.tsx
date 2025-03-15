import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Link as LinkIcon, 
  HelpCircle, 
  Check, 
  AlertTriangle, 
  XCircle,
  UserPlus, 
  Settings, 
  PlusCircle, 
  RefreshCcw,
  Building2, 
  CreditCard, 
  Truck, 
  BookOpenCheck
} from 'lucide-react';

// Integration data
const integrations = [
  { 
    id: 'toast', 
    name: 'Toast POS', 
    category: 'pos',
    description: 'Connect to Toast POS system for menu and sales data',
    status: 'connected',
    lastSync: '2023-07-15T14:30:00',
    icon: CreditCard
  },
  { 
    id: 'quickbooks', 
    name: 'QuickBooks', 
    category: 'accounting',
    description: 'Sync financial data with QuickBooks accounting software',
    status: 'disconnected',
    lastSync: null,
    icon: Building2
  },
  { 
    id: 'ubereats', 
    name: 'UberEats', 
    category: 'delivery',
    description: 'Connect to UberEats delivery platform',
    status: 'connected',
    lastSync: '2023-07-14T10:15:00',
    icon: Truck
  },
  { 
    id: 'doordash', 
    name: 'DoorDash', 
    category: 'delivery',
    description: 'Connect to DoorDash delivery platform',
    status: 'disconnected',
    lastSync: null,
    icon: Truck
  },
  { 
    id: 'opentable', 
    name: 'OpenTable', 
    category: 'reservations',
    description: 'Manage reservations with OpenTable',
    status: 'error',
    lastSync: '2023-07-13T08:45:00',
    error: 'API authentication failed',
    icon: BookOpenCheck
  }
];

// Role and permission data
const roles = [
  { id: 'owner', name: 'Owner', description: 'Full access to all features' },
  { id: 'manager', name: 'Manager', description: 'Access to most features except financial data' },
  { id: 'chef', name: 'Chef', description: 'Access to inventory and recipe management' },
  { id: 'server', name: 'Server', description: 'Limited access to order management' }
];

const permissions = [
  { id: 'view_sales', name: 'View Sales Data' },
  { id: 'manage_inventory', name: 'Manage Inventory' },
  { id: 'edit_menu', name: 'Edit Menu' },
  { id: 'view_reports', name: 'View Reports' },
  { id: 'manage_staff', name: 'Manage Staff' },
  { id: 'system_settings', name: 'System Settings' },
];

// Role permission matrix
const rolePermissions = {
  owner: ['view_sales', 'manage_inventory', 'edit_menu', 'view_reports', 'manage_staff', 'system_settings'],
  manager: ['view_sales', 'manage_inventory', 'edit_menu', 'view_reports', 'manage_staff'],
  chef: ['manage_inventory', 'edit_menu'],
  server: []
};

// Activity feed data
const activityFeed = [
  { 
    id: 1, 
    type: 'sync_success', 
    integration: 'Toast POS', 
    timestamp: '2023-07-15T14:30:00',
    message: 'Successfully synced menu items and sales data' 
  },
  { 
    id: 2, 
    type: 'sync_error', 
    integration: 'OpenTable', 
    timestamp: '2023-07-15T09:15:00',
    message: 'Failed to sync reservations: API authentication failed' 
  },
  { 
    id: 3, 
    type: 'connection', 
    integration: 'UberEats', 
    timestamp: '2023-07-14T10:15:00',
    message: 'Successfully connected UberEats integration' 
  }
];

const IntegrationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('connections');
  const [connectWizardOpen, setConnectWizardOpen] = useState(false);
  const [wizardIntegration, setWizardIntegration] = useState<string | null>(null);

  // Function to format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-carbon-green-40 text-white">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="outline" className="border-carbon-gray-50">Disconnected</Badge>;
      case 'error':
        return <Badge className="bg-carbon-red-50 text-white">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Function to start connection wizard
  const startConnectionWizard = (integrationId: string) => {
    setWizardIntegration(integrationId);
    setConnectWizardOpen(true);
  };

  // Function to close connection wizard
  const closeConnectionWizard = () => {
    setWizardIntegration(null);
    setConnectWizardOpen(false);
  };

  // Function to get integration by ID
  const getIntegrationById = (id: string) => {
    return integrations.find(i => i.id === id) || null;
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-carbon-gray-100">Integration Hub & Settings</h1>
        <p className="text-carbon-gray-70 mt-1 text-sm">Connect external systems and manage Culinary OS settings</p>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3 space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="space-y-1 p-4">
                <button 
                  onClick={() => setActiveTab('connections')}
                  className={`w-full flex items-center gap-3 p-2 text-left rounded-none text-sm ${
                    activeTab === 'connections' 
                      ? 'bg-carbon-blue-10 border-l-4 border-carbon-blue-60 font-medium' 
                      : 'hover:bg-carbon-gray-10'
                  }`}
                >
                  <LinkIcon className="h-4 w-4" />
                  <span>System Connections</span>
                </button>
                <button 
                  onClick={() => setActiveTab('roles')}
                  className={`w-full flex items-center gap-3 p-2 text-left rounded-none text-sm ${
                    activeTab === 'roles' 
                      ? 'bg-carbon-blue-10 border-l-4 border-carbon-blue-60 font-medium' 
                      : 'hover:bg-carbon-gray-10'
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>User Roles & Permissions</span>
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 p-2 text-left rounded-none text-sm ${
                    activeTab === 'settings' 
                      ? 'bg-carbon-blue-10 border-l-4 border-carbon-blue-60 font-medium' 
                      : 'hover:bg-carbon-gray-10'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </div>
            </CardContent>
            <CardFooter className="bg-carbon-gray-10 p-4 flex flex-col items-start">
              <h3 className="font-medium text-sm mb-2">Need Help?</h3>
              <p className="text-xs text-carbon-gray-70 mb-3">
                Visit our documentation for help with connecting systems and managing settings.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <HelpCircle className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="border-b border-carbon-gray-20 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-start gap-2">
                      {activity.type === 'sync_success' && (
                        <Check className="h-4 w-4 text-carbon-green-40 mt-0.5" />
                      )}
                      {activity.type === 'sync_error' && (
                        <XCircle className="h-4 w-4 text-carbon-red-50 mt-0.5" />
                      )}
                      {activity.type === 'connection' && (
                        <LinkIcon className="h-4 w-4 text-carbon-blue-60 mt-0.5" />
                      )}
                      <div>
                        <p className="text-xs font-medium">{activity.integration}</p>
                        <p className="text-xs text-carbon-gray-70">{activity.message}</p>
                        <p className="text-xs text-carbon-gray-60 mt-1">
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="col-span-12 md:col-span-9 space-y-6">
          {/* System Connections Tab */}
          {activeTab === 'connections' && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Connect Your Restaurant Ecosystem</h2>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Integration
                </Button>
              </div>
              
              {/* Category tabs for integrations */}
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-carbon-gray-10 w-full">
                  <TabsTrigger value="all">All Systems</TabsTrigger>
                  <TabsTrigger value="pos">POS Systems</TabsTrigger>
                  <TabsTrigger value="accounting">Accounting</TabsTrigger>
                  <TabsTrigger value="delivery">Delivery Services</TabsTrigger>
                  <TabsTrigger value="reservations">Reservations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.map((integration) => {
                      const Icon = integration.icon;
                      return (
                        <Card key={integration.id} className="border border-carbon-gray-20">
                          <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                            <div>
                              <div className="flex items-center gap-2">
                                <Icon className="h-5 w-5 text-carbon-gray-70" />
                                <CardTitle className="text-base">{integration.name}</CardTitle>
                              </div>
                              <CardDescription className="mt-1">{integration.description}</CardDescription>
                            </div>
                            {getStatusBadge(integration.status)}
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="text-xs text-carbon-gray-70">
                              <div className="flex justify-between mb-1">
                                <span>Last synchronized:</span>
                                <span className="font-medium">{formatDate(integration.lastSync)}</span>
                              </div>
                              {integration.status === 'error' && (
                                <div className="flex items-start gap-2 mt-2 text-carbon-red-50">
                                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                  <span>{integration.error}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="border-t border-carbon-gray-20 pt-3">
                            {integration.status === 'connected' && (
                              <div className="flex gap-2 w-full">
                                <Button variant="outline" size="sm" className="flex-1">
                                  <RefreshCcw className="h-3 w-3 mr-1" />
                                  Sync Now
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                  Configure
                                </Button>
                              </div>
                            )}
                            {integration.status === 'disconnected' && (
                              <Button 
                                className="w-full" 
                                size="sm"
                                onClick={() => startConnectionWizard(integration.id)}
                              >
                                Connect
                              </Button>
                            )}
                            {integration.status === 'error' && (
                              <div className="flex gap-2 w-full">
                                <Button variant="outline" size="sm" className="flex-1">
                                  Troubleshoot
                                </Button>
                                <Button size="sm" className="flex-1">
                                  Reconnect
                                </Button>
                              </div>
                            )}
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
                
                {/* Other category tabs would filter the integrations */}
                <TabsContent value="pos" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.filter(i => i.category === 'pos').map(integration => {
                      const Icon = integration.icon;
                      return (
                        <Card key={integration.id} className="border border-carbon-gray-20">
                          <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                            <div>
                              <div className="flex items-center gap-2">
                                <Icon className="h-5 w-5 text-carbon-gray-70" />
                                <CardTitle className="text-base">{integration.name}</CardTitle>
                              </div>
                              <CardDescription className="mt-1">{integration.description}</CardDescription>
                            </div>
                            {getStatusBadge(integration.status)}
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="text-xs text-carbon-gray-70">
                              <div className="flex justify-between mb-1">
                                <span>Last synchronized:</span>
                                <span className="font-medium">{formatDate(integration.lastSync)}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t border-carbon-gray-20 pt-3">
                            <Button className="w-full" size="sm">
                              {integration.status === 'connected' ? 'Configure' : 'Connect'}
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
                
                {/* Similar content for other tabs */}
                <TabsContent value="accounting" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.filter(i => i.category === 'accounting').map(integration => {
                      const Icon = integration.icon;
                      return (
                        <Card key={integration.id} className="border border-carbon-gray-20">
                          <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                            <div>
                              <div className="flex items-center gap-2">
                                <Icon className="h-5 w-5 text-carbon-gray-70" />
                                <CardTitle className="text-base">{integration.name}</CardTitle>
                              </div>
                              <CardDescription className="mt-1">{integration.description}</CardDescription>
                            </div>
                            {getStatusBadge(integration.status)}
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="text-xs text-carbon-gray-70">
                              <div className="flex justify-between mb-1">
                                <span>Last synchronized:</span>
                                <span className="font-medium">{formatDate(integration.lastSync)}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t border-carbon-gray-20 pt-3">
                            <Button 
                              className="w-full" 
                              size="sm"
                              onClick={() => startConnectionWizard(integration.id)}
                            >
                              {integration.status === 'connected' ? 'Configure' : 'Connect'}
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
                
                {/* Content for delivery tab */}
                <TabsContent value="delivery" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.filter(i => i.category === 'delivery').map(integration => {
                      const Icon = integration.icon;
                      return (
                        <Card key={integration.id} className="border border-carbon-gray-20">
                          <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                            <div>
                              <div className="flex items-center gap-2">
                                <Icon className="h-5 w-5 text-carbon-gray-70" />
                                <CardTitle className="text-base">{integration.name}</CardTitle>
                              </div>
                              <CardDescription className="mt-1">{integration.description}</CardDescription>
                            </div>
                            {getStatusBadge(integration.status)}
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="text-xs text-carbon-gray-70">
                              <div className="flex justify-between mb-1">
                                <span>Last synchronized:</span>
                                <span className="font-medium">{formatDate(integration.lastSync)}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t border-carbon-gray-20 pt-3">
                            <Button className="w-full" size="sm">
                              {integration.status === 'connected' ? 'Configure' : 'Connect'}
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
                
                {/* Content for reservations tab */}
                <TabsContent value="reservations" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.filter(i => i.category === 'reservations').map(integration => {
                      const Icon = integration.icon;
                      return (
                        <Card key={integration.id} className="border border-carbon-gray-20">
                          <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                            <div>
                              <div className="flex items-center gap-2">
                                <Icon className="h-5 w-5 text-carbon-gray-70" />
                                <CardTitle className="text-base">{integration.name}</CardTitle>
                              </div>
                              <CardDescription className="mt-1">{integration.description}</CardDescription>
                            </div>
                            {getStatusBadge(integration.status)}
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="text-xs text-carbon-gray-70">
                              <div className="flex justify-between mb-1">
                                <span>Last synchronized:</span>
                                <span className="font-medium">{formatDate(integration.lastSync)}</span>
                              </div>
                              {integration.status === 'error' && (
                                <div className="flex items-start gap-2 mt-2 text-carbon-red-50">
                                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                  <span>{integration.error}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="border-t border-carbon-gray-20 pt-3">
                            {integration.status === 'error' && (
                              <div className="flex gap-2 w-full">
                                <Button variant="outline" size="sm" className="flex-1">
                                  Troubleshoot
                                </Button>
                                <Button size="sm" className="flex-1">
                                  Reconnect
                                </Button>
                              </div>
                            )}
                            {integration.status !== 'error' && (
                              <Button className="w-full" size="sm">
                                {integration.status === 'connected' ? 'Configure' : 'Connect'}
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
          
          {/* User Roles & Permissions Tab */}
          {activeTab === 'roles' && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">User Roles & Permissions</h2>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Custom Role
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Permission Matrix</CardTitle>
                  <CardDescription>Define what each role can access in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Permission</TableHead>
                        {roles.map((role) => (
                          <TableHead key={role.id} className="text-center">{role.name}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {permissions.map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell className="font-medium">{permission.name}</TableCell>
                          {roles.map((role) => (
                            <TableCell key={role.id} className="text-center">
                              {rolePermissions[role.id as keyof typeof rolePermissions].includes(permission.id) ? (
                                <Check className="h-4 w-4 text-carbon-green-40 mx-auto" />
                              ) : (
                                <XCircle className="h-4 w-4 text-carbon-gray-40 mx-auto" />
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <Card key={role.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{role.name}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Permissions:</p>
                        <div className="flex flex-wrap gap-2">
                          {rolePermissions[role.id as keyof typeof rolePermissions].map((permId) => {
                            const perm = permissions.find(p => p.id === permId);
                            return perm ? (
                              <Badge key={perm.id} variant="outline">{perm.name}</Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-carbon-gray-20 pt-3">
                      <Button variant="outline" size="sm" className="w-full">
                        Edit Role
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Settings Configuration</h2>
                <Button>Save Changes</Button>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Restaurant Profile</CardTitle>
                  <CardDescription>Update your restaurant's basic information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Restaurant Name</label>
                      <Input defaultValue="Harbor View Bistro" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input defaultValue="(555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input defaultValue="contact@harborviewbistro.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Website</label>
                      <Input defaultValue="https://harborviewbistro.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input defaultValue="123 Harbor Drive" />
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <Input defaultValue="Baytown" placeholder="City" />
                      <Input defaultValue="CA" placeholder="State" />
                      <Input defaultValue="94123" placeholder="ZIP Code" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">System Preferences</CardTitle>
                  <CardDescription>Configure global system settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="general" className="w-full">
                    <TabsList className="bg-carbon-gray-10 w-full">
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      <TabsTrigger value="data">Data Management</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="general" className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Currency</label>
                          <select className="w-full border border-carbon-gray-50 rounded-none h-10 px-3 py-2">
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                            <option>CAD ($)</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Date Format</label>
                          <select className="w-full border border-carbon-gray-50 rounded-none h-10 px-3 py-2">
                            <option>MM/DD/YYYY</option>
                            <option>DD/MM/YYYY</option>
                            <option>YYYY-MM-DD</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Unit of Measure</label>
                          <select className="w-full border border-carbon-gray-50 rounded-none h-10 px-3 py-2">
                            <option>US Standard</option>
                            <option>Metric</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Time Zone</label>
                          <select className="w-full border border-carbon-gray-50 rounded-none h-10 px-3 py-2">
                            <option>Pacific Time (PT)</option>
                            <option>Mountain Time (MT)</option>
                            <option>Central Time (CT)</option>
                            <option>Eastern Time (ET)</option>
                          </select>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="notifications" className="space-y-4 mt-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-2 hover:bg-carbon-gray-10">
                          <div>
                            <h3 className="text-sm font-medium">Email Notifications</h3>
                            <p className="text-xs text-carbon-gray-70">Receive system alerts via email</p>
                          </div>
                          <div className="flex items-center h-4">
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 hover:bg-carbon-gray-10">
                          <div>
                            <h3 className="text-sm font-medium">Integration Alerts</h3>
                            <p className="text-xs text-carbon-gray-70">Notifications for sync errors</p>
                          </div>
                          <div className="flex items-center h-4">
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 hover:bg-carbon-gray-10">
                          <div>
                            <h3 className="text-sm font-medium">Daily Summary</h3>
                            <p className="text-xs text-carbon-gray-70">Daily recap of system activities</p>
                          </div>
                          <div className="flex items-center h-4">
                            <input type="checkbox" className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="data" className="space-y-4 mt-4">
                      <div className="space-y-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Data Export</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-xs text-carbon-gray-70">
                              Export your restaurant data for backup or analysis
                            </p>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button variant="outline" size="sm">Export All Data</Button>
                          </CardFooter>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Data Import</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-xs text-carbon-gray-70">
                              Import data from external sources or backups
                            </p>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button variant="outline" size="sm">Import Data</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
      
      {/* Connection Wizard Modal */}
      {connectWizardOpen && wizardIntegration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                Connect {getIntegrationById(wizardIntegration)?.name}
              </h2>
              <button onClick={closeConnectionWizard} className="text-carbon-gray-70 hover:text-carbon-gray-100">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-carbon-gray-70">
                Follow these steps to connect your {getIntegrationById(wizardIntegration)?.name} account:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-carbon-blue-60 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Create API credentials</p>
                    <p className="text-sm text-carbon-gray-70">
                      Log in to your {getIntegrationById(wizardIntegration)?.name} account and create an API key.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-carbon-blue-60 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Enter your credentials</p>
                    <div className="mt-2 space-y-3">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">API Key</label>
                        <Input type="password" placeholder="Enter your API key" />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-sm font-medium">API Secret (if required)</label>
                        <Input type="password" placeholder="Enter your API secret" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-carbon-blue-60 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Test connection</p>
                    <p className="text-sm text-carbon-gray-70">
                      Test the connection to ensure your credentials are valid.
                    </p>
                    <Button className="mt-2" size="sm">
                      Test Connection
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={closeConnectionWizard}>
                  Cancel
                </Button>
                <Button>
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationHub;
