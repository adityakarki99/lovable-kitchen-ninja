
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Plus, Save, FileDown, Eye, Settings, DollarSign, Layout, Move } from 'lucide-react';

const MenuCreator: React.FC = () => {
  const [menuName, setMenuName] = useState('Main Dinner Menu');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="w-full sm:w-auto">
          <Input 
            value={menuName} 
            onChange={(e) => setMenuName(e.target.value)} 
            className="font-medium text-lg sm:w-80"
          />
          <p className="text-kitchen-muted-foreground mt-1">Last edited: Today at 2:35 PM</p>
        </div>
        <div className="flex items-center gap-2 self-end">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Menu
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="layout" className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="layout">
            <Layout className="mr-2 h-4 w-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="pricing">
            <DollarSign className="mr-2 h-4 w-4" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="layout" className="pt-4">
          <Card className="shadow-apple-sm">
            <CardHeader>
              <CardTitle className="text-lg">Menu Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Menu Sections */}
                <div className="lg:col-span-1 border border-kitchen-border rounded-md p-4">
                  <h3 className="font-medium mb-3">Menu Sections</h3>
                  <div className="space-y-2">
                    <Card className="shadow-none border border-kitchen-muted hover:shadow-sm transition-shadow cursor-move">
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Move className="h-4 w-4 text-kitchen-muted-foreground" />
                          <span>Appetizers</span>
                        </div>
                        <span className="text-sm text-kitchen-muted-foreground">5 items</span>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-none border border-kitchen-muted hover:shadow-sm transition-shadow cursor-move">
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Move className="h-4 w-4 text-kitchen-muted-foreground" />
                          <span>Main Courses</span>
                        </div>
                        <span className="text-sm text-kitchen-muted-foreground">8 items</span>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-none border border-kitchen-muted hover:shadow-sm transition-shadow cursor-move">
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Move className="h-4 w-4 text-kitchen-muted-foreground" />
                          <span>Desserts</span>
                        </div>
                        <span className="text-sm text-kitchen-muted-foreground">3 items</span>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-none border border-kitchen-muted hover:shadow-sm transition-shadow cursor-move">
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Move className="h-4 w-4 text-kitchen-muted-foreground" />
                          <span>Beverages</span>
                        </div>
                        <span className="text-sm text-kitchen-muted-foreground">4 items</span>
                      </CardContent>
                    </Card>
                    
                    <Button variant="outline" className="w-full mt-2">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Section
                    </Button>
                  </div>
                </div>
                
                {/* Menu Canvas */}
                <div className="lg:col-span-2 border border-kitchen-border rounded-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Menu Canvas</h3>
                    <Button variant="outline" size="sm">
                      <FileDown className="mr-2 h-4 w-4" />
                      Export PDF
                    </Button>
                  </div>
                  
                  <div className="bg-white p-6 min-h-[600px] border border-dashed border-kitchen-border rounded-md">
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold">{menuName}</h2>
                      <p className="italic text-kitchen-muted-foreground mt-1">Culinary Delights for Every Palate</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-bold border-b border-kitchen-border pb-1 mb-3">Appetizers</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Caesar Salad</p>
                            <p className="text-sm text-kitchen-muted-foreground">Romaine lettuce, parmesan, croutons, Caesar dressing</p>
                          </div>
                          <p className="font-medium">$10.00</p>
                        </div>
                        
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Garlic Bread</p>
                            <p className="text-sm text-kitchen-muted-foreground">Toasted French bread with garlic butter and herbs</p>
                          </div>
                          <p className="font-medium">$5.50</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-bold border-b border-kitchen-border pb-1 mb-3">Main Courses</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Beer Battered Fish & Chips</p>
                            <p className="text-sm text-kitchen-muted-foreground">Crispy cod with thick-cut fries and tartar sauce</p>
                          </div>
                          <p className="font-medium">$16.50</p>
                        </div>
                        
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Ribeye Steak</p>
                            <p className="text-sm text-kitchen-muted-foreground">Grilled to perfection with garlic butter and roasted vegetables</p>
                          </div>
                          <p className="font-medium">$32.00</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Placeholder for drag and drop content */}
                    <div className="border-2 border-dashed border-kitchen-border/50 rounded-md p-6 text-center text-kitchen-muted-foreground">
                      Drag menu sections or items here to add to the canvas
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing" className="pt-4">
          <Card className="shadow-apple-sm">
            <CardHeader>
              <CardTitle className="text-lg">Menu Pricing Simulator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-kitchen-muted-foreground mb-4">Adjust prices and see how they affect your overall profitability</p>
              
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <Card className="shadow-none border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Current Menu Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-kitchen-muted-foreground">Average Profit Margin:</span>
                        <span className="font-medium">58%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-kitchen-muted-foreground">Weekly Revenue:</span>
                        <span className="font-medium">$15,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-kitchen-muted-foreground">Weekly Profit:</span>
                        <span className="font-medium">$8,845</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-kitchen-muted-foreground">Menu Price Perception:</span>
                        <span className="font-medium">Moderate</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-none border border-kitchen-primary/20 bg-kitchen-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Simulated Menu Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-kitchen-muted-foreground">Average Profit Margin:</span>
                        <span className="font-medium text-kitchen-success">62% (+4%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-kitchen-muted-foreground">Weekly Revenue:</span>
                        <span className="font-medium text-kitchen-success">$16,100 (+$850)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-kitchen-muted-foreground">Weekly Profit:</span>
                        <span className="font-medium text-kitchen-success">$9,982 (+$1,137)</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-kitchen-muted-foreground">Menu Price Perception:</span>
                        <span className="font-medium text-kitchen-warning">Moderate-High</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-kitchen-border">
                  <thead className="bg-kitchen-muted">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-kitchen-muted-foreground uppercase tracking-wider">Item</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-kitchen-muted-foreground uppercase tracking-wider">Current Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-kitchen-muted-foreground uppercase tracking-wider">New Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-kitchen-muted-foreground uppercase tracking-wider">Margin Impact</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-kitchen-muted-foreground uppercase tracking-wider">Volume Impact</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-kitchen-border">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Fish & Chips</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">$16.50</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Input type="number" className="w-20 h-8" value="18.00" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-kitchen-success">+3%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-kitchen-danger">-5%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Ribeye Steak</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">$32.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Input type="number" className="w-20 h-8" value="34.00" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-kitchen-success">+2%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-kitchen-danger">-2%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Caesar Salad</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">$10.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Input type="number" className="w-20 h-8" value="10.00" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">0%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button variant="outline" className="mr-2">Reset Simulation</Button>
                <Button>Apply New Prices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="pt-4">
          <Card className="shadow-apple-sm">
            <CardHeader>
              <CardTitle className="text-lg">Menu Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-kitchen-muted-foreground mb-4">Configure your menu appearance and behavior</p>
              
              <div className="max-w-3xl space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Menu Name</label>
                    <Input value={menuName} onChange={(e) => setMenuName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Menu Type</label>
                    <select className="w-full rounded-md border border-kitchen-border px-3 py-2">
                      <option>Dinner Menu</option>
                      <option>Lunch Menu</option>
                      <option>Breakfast Menu</option>
                      <option>Dessert Menu</option>
                      <option>Bar Menu</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Menu Description</label>
                  <textarea 
                    className="w-full rounded-md border border-kitchen-border px-3 py-2 min-h-[100px]"
                    placeholder="Enter a description for your menu..."
                    defaultValue="Our signature dinner menu featuring classic favorites and seasonal specialties."
                  />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Currency Symbol</label>
                    <select className="w-full rounded-md border border-kitchen-border px-3 py-2">
                      <option>$ (USD)</option>
                      <option>€ (EUR)</option>
                      <option>£ (GBP)</option>
                      <option>¥ (JPY)</option>
                      <option>A$ (AUD)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price Display</label>
                    <select className="w-full rounded-md border border-kitchen-border px-3 py-2">
                      <option>With Decimal ($10.50)</option>
                      <option>No Decimal ($10)</option>
                      <option>European Format (10,50 €)</option>
                    </select>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Menu Display Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" id="showDesc" className="mr-2" checked />
                      <label htmlFor="showDesc">Show item descriptions</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="showAllergens" className="mr-2" checked />
                      <label htmlFor="showAllergens">Show allergen information</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="showCalories" className="mr-2" />
                      <label htmlFor="showCalories">Show calorie counts</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="showPopular" className="mr-2" checked />
                      <label htmlFor="showPopular">Highlight popular items</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuCreator;
