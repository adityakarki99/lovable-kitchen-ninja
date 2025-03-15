
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Calendar, Clock, Save, CheckCircle, X, Plus, Trash, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Template, TemplateItem } from './TemplateManagement';

interface TemplateEditorProps {
  template?: Template;
  onSave: (template: Template) => void;
  onCancel: () => void;
  isNew?: boolean;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ template, onSave, onCancel, isNew = false }) => {
  // Define default template as a starting point for new templates
  const defaultTemplate: Template = {
    id: '',
    name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    itemCount: 0,
    items: [],
    type: 'full',
    createdBy: '',
    isDefault: false
  };
  
  // State to manage the form
  const [formState, setFormState] = useState<Template>(template || defaultTemplate);
  const [activeTab, setActiveTab] = useState('details');
  
  // Update form state when template changes
  useEffect(() => {
    if (template) {
      setFormState(template);
    }
  }, [template]);
  
  // Handle input change
  const handleInputChange = (field: keyof Template, value: any) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle type change
  const handleTypeChange = (type: 'full' | 'partial' | 'category' | 'location') => {
    setFormState(prev => ({
      ...prev,
      type,
      // Reset category/location specific fields when changing type
      ...(type !== 'category' ? { categories: undefined } : {}),
      ...(type !== 'location' ? { locations: undefined } : {})
    }));
  };
  
  // Handle schedule frequency change
  const handleScheduleFrequencyChange = (frequency: 'daily' | 'weekly' | 'monthly' | 'custom') => {
    const currentSchedule = formState.schedule || { frequency: 'weekly', daysOfWeek: [1], time: '09:00' };
    
    let newSchedule = { ...currentSchedule, frequency };
    
    // Set default values based on frequency
    if (frequency === 'daily') {
      newSchedule = { ...newSchedule, time: '09:00' };
    } else if (frequency === 'weekly') {
      newSchedule = { ...newSchedule, daysOfWeek: [1], time: '09:00' }; // Monday by default
    } else if (frequency === 'monthly') {
      newSchedule = { ...newSchedule, dayOfMonth: 1, time: '09:00' }; // 1st of month by default
    }
    
    setFormState(prev => ({
      ...prev,
      schedule: newSchedule
    }));
  };
  
  // Handle schedule day of week toggle
  const handleDayOfWeekToggle = (dayIndex: number) => {
    if (!formState.schedule) return;
    
    const currentDays = formState.schedule.daysOfWeek || [];
    let newDays: number[];
    
    if (currentDays.includes(dayIndex)) {
      // Remove day if already selected
      newDays = currentDays.filter(day => day !== dayIndex);
    } else {
      // Add day if not selected
      newDays = [...currentDays, dayIndex].sort();
    }
    
    setFormState(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule!,
        daysOfWeek: newDays
      }
    }));
  };
  
  // Handle add item
  const handleAddItem = () => {
    const newItem: TemplateItem = {
      id: `item-${Date.now()}`,
      name: 'New Item',
      category: 'General',
      location: 'Main Kitchen',
      unit: 'kg',
      includeInCount: true
    };
    
    setFormState(prev => ({
      ...prev,
      items: [...prev.items, newItem],
      itemCount: prev.itemCount + 1
    }));
  };
  
  // Handle remove item
  const handleRemoveItem = (itemId: string) => {
    setFormState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId),
      itemCount: prev.itemCount - 1
    }));
  };
  
  // Handle item change
  const handleItemChange = (itemId: string, field: keyof TemplateItem, value: any) => {
    setFormState(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }));
  };
  
  // Handle toggle item include
  const handleToggleItemInclude = (itemId: string) => {
    setFormState(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, includeInCount: !item.includeInCount } : item
      )
    }));
  };
  
  // Handle save
  const handleSave = () => {
    // Validation
    if (!formState.name) {
      alert('Template name is required');
      return;
    }
    
    onSave({
      ...formState,
      updatedAt: new Date().toISOString()
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-carbon-gray-10">
          <TabsTrigger value="details">Template Details</TabsTrigger>
          <TabsTrigger value="items">Template Items</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        
        {/* Details Tab */}
        <TabsContent value="details" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Details</CardTitle>
              <CardDescription>Basic information about the stocktake template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name">Template Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter template name"
                  value={formState.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter template description"
                  value={formState.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-3">
                <Label>Template Type</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={formState.type === 'full' ? 'default' : 'outline'}
                    onClick={() => handleTypeChange('full')}
                    className={formState.type === 'full' ? 'bg-carbon-blue-60' : ''}
                  >
                    Full Count
                  </Button>
                  <Button
                    type="button"
                    variant={formState.type === 'partial' ? 'default' : 'outline'}
                    onClick={() => handleTypeChange('partial')}
                    className={formState.type === 'partial' ? 'bg-carbon-blue-60' : ''}
                  >
                    Partial Count
                  </Button>
                  <Button
                    type="button"
                    variant={formState.type === 'category' ? 'default' : 'outline'}
                    onClick={() => handleTypeChange('category')}
                    className={formState.type === 'category' ? 'bg-carbon-blue-60' : ''}
                  >
                    By Category
                  </Button>
                  <Button
                    type="button"
                    variant={formState.type === 'location' ? 'default' : 'outline'}
                    onClick={() => handleTypeChange('location')}
                    className={formState.type === 'location' ? 'bg-carbon-blue-60' : ''}
                  >
                    By Location
                  </Button>
                </div>
              </div>
              
              {formState.type === 'category' && (
                <div className="space-y-3">
                  <Label>Categories to Include</Label>
                  <div className="flex flex-wrap gap-2 border p-3 rounded-md">
                    {(formState.categories || []).map(category => (
                      <Badge key={category} className="bg-carbon-blue-20 text-carbon-blue-70">
                        {category}
                        <button
                          className="ml-1"
                          onClick={() => {
                            const newCategories = (formState.categories || []).filter(c => c !== category);
                            handleInputChange('categories', newCategories);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <div className="flex-1">
                      <Input
                        placeholder="Add a category and press Enter"
                        className="w-full"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.currentTarget;
                            const value = input.value.trim();
                            if (value && !(formState.categories || []).includes(value)) {
                              const newCategories = [...(formState.categories || []), value];
                              handleInputChange('categories', newCategories);
                              input.value = '';
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {formState.type === 'location' && (
                <div className="space-y-3">
                  <Label>Locations to Include</Label>
                  <div className="flex flex-wrap gap-2 border p-3 rounded-md">
                    {(formState.locations || []).map(location => (
                      <Badge key={location} className="bg-purple-100 text-purple-800">
                        {location}
                        <button
                          className="ml-1"
                          onClick={() => {
                            const newLocations = (formState.locations || []).filter(l => l !== location);
                            handleInputChange('locations', newLocations);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <div className="flex-1">
                      <Input
                        placeholder="Add a location and press Enter"
                        className="w-full"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.currentTarget;
                            const value = input.value.trim();
                            if (value && !(formState.locations || []).includes(value)) {
                              const newLocations = [...(formState.locations || []), value];
                              handleInputChange('locations', newLocations);
                              input.value = '';
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={!!formState.isDefault}
                  onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                  className="rounded border-carbon-gray-20"
                />
                <Label htmlFor="isDefault">Set as default template</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Items Tab */}
        <TabsContent value="items" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Template Items</CardTitle>
                <CardDescription>Items included in this stocktake template</CardDescription>
              </div>
              <Button onClick={handleAddItem}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-carbon-gray-10">
                    <TableRow>
                      <TableHead className="font-medium">Item Name</TableHead>
                      <TableHead className="font-medium">Category</TableHead>
                      <TableHead className="font-medium">Location</TableHead>
                      <TableHead className="font-medium">Unit</TableHead>
                      <TableHead className="font-medium text-center">Include</TableHead>
                      <TableHead className="font-medium text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formState.items.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-carbon-gray-70">
                          <AlertTriangle className="h-5 w-5 mx-auto mb-2" />
                          <p>No items added to this template yet</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-4"
                            onClick={handleAddItem}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Item
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : (
                      formState.items.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Input
                              value={item.name}
                              onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={item.category}
                              onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={item.location}
                              onChange={(e) => handleItemChange(item.id, 'location', e.target.value)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={item.unit}
                              onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <button 
                              type="button"
                              onClick={() => handleToggleItemInclude(item.id)}
                              className="mx-auto block"
                            >
                              {item.includeInCount ? (
                                <CheckCircle className="h-5 w-5 text-kitchen-success" />
                              ) : (
                                <X className="h-5 w-5 text-kitchen-danger" />
                              )}
                            </button>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-kitchen-danger hover:bg-kitchen-danger/10"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Schedule Tab */}
        <TabsContent value="schedule" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Settings</CardTitle>
              <CardDescription>Configure when this stocktake should be performed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Schedule Frequency</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={formState.schedule?.frequency === 'daily' ? 'default' : 'outline'}
                    onClick={() => handleScheduleFrequencyChange('daily')}
                    className={formState.schedule?.frequency === 'daily' ? 'bg-carbon-blue-60' : ''}
                  >
                    Daily
                  </Button>
                  <Button
                    type="button"
                    variant={formState.schedule?.frequency === 'weekly' ? 'default' : 'outline'}
                    onClick={() => handleScheduleFrequencyChange('weekly')}
                    className={formState.schedule?.frequency === 'weekly' ? 'bg-carbon-blue-60' : ''}
                  >
                    Weekly
                  </Button>
                  <Button
                    type="button"
                    variant={formState.schedule?.frequency === 'monthly' ? 'default' : 'outline'}
                    onClick={() => handleScheduleFrequencyChange('monthly')}
                    className={formState.schedule?.frequency === 'monthly' ? 'bg-carbon-blue-60' : ''}
                  >
                    Monthly
                  </Button>
                  <Button
                    type="button"
                    variant={!formState.schedule ? 'default' : 'outline'}
                    onClick={() => handleInputChange('schedule', undefined)}
                    className={!formState.schedule ? 'bg-carbon-blue-60' : ''}
                  >
                    None
                  </Button>
                </div>
              </div>
              
              {formState.schedule?.frequency === 'weekly' && (
                <div className="space-y-3">
                  <Label>Days of the Week</Label>
                  <div className="flex gap-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <button
                        key={index}
                        type="button"
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          (formState.schedule?.daysOfWeek || []).includes(index)
                            ? "bg-carbon-blue-60 text-white"
                            : "bg-carbon-gray-20 text-carbon-gray-70 hover:bg-carbon-gray-30"
                        )}
                        onClick={() => handleDayOfWeekToggle(index)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {formState.schedule?.frequency === 'monthly' && (
                <div className="space-y-3">
                  <Label htmlFor="dayOfMonth">Day of Month</Label>
                  <Input
                    id="dayOfMonth"
                    type="number"
                    min="1"
                    max="31"
                    value={formState.schedule?.dayOfMonth || 1}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 1 && value <= 31) {
                        setFormState(prev => ({
                          ...prev,
                          schedule: {
                            ...prev.schedule!,
                            dayOfMonth: value
                          }
                        }));
                      }
                    }}
                    className="w-20"
                  />
                </div>
              )}
              
              {formState.schedule && (
                <div className="space-y-3">
                  <Label htmlFor="scheduleTime">Time</Label>
                  <Input
                    id="scheduleTime"
                    type="time"
                    value={formState.schedule.time || '09:00'}
                    onChange={(e) => {
                      setFormState(prev => ({
                        ...prev,
                        schedule: {
                          ...prev.schedule!,
                          time: e.target.value
                        }
                      }));
                    }}
                    className="w-40"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          {isNew ? 'Create Template' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default TemplateEditor;
