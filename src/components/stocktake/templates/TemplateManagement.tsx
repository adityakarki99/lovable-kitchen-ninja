
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Search, Filter, Plus, PenLine, Copy, Trash, FileText, Calendar, Clock, CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import TemplateList from './TemplateList';
import TemplateEditor from './TemplateEditor';
import TemplateDetail from './TemplateDetail';

export type TemplateItem = {
  id: string;
  name: string;
  category: string;
  location: string;
  unit: string;
  includeInCount: boolean;
};

export type Template = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  lastUsed?: string;
  itemCount: number;
  items: TemplateItem[];
  type: 'full' | 'partial' | 'category' | 'location';
  categories?: string[];
  locations?: string[];
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
    daysOfWeek?: number[];
    dayOfMonth?: number;
    time?: string;
  };
  createdBy: string;
  isDefault?: boolean;
};

// Mock data for templates
const mockTemplates: Template[] = [
  {
    id: 'template-1',
    name: 'Full Inventory Count',
    description: 'Complete stocktake of all inventory items',
    createdAt: '2025-02-15T10:30:00',
    updatedAt: '2025-03-01T14:45:00',
    lastUsed: '2025-03-08T09:00:00',
    itemCount: 120,
    items: [
      { id: 'item-1', name: 'Tomatoes', category: 'Vegetables', location: 'Main Kitchen', unit: 'kg', includeInCount: true },
      { id: 'item-2', name: 'Chicken Breast', category: 'Meat', location: 'Cold Storage', unit: 'kg', includeInCount: true },
      { id: 'item-3', name: 'Flour', category: 'Dry Goods', location: 'Dry Storage', unit: 'kg', includeInCount: true },
    ],
    type: 'full',
    schedule: {
      frequency: 'weekly',
      daysOfWeek: [0], // Sunday
      time: '08:00'
    },
    createdBy: 'Kitchen Manager',
    isDefault: true
  },
  {
    id: 'template-2',
    name: 'Fresh Produce Check',
    description: 'Count of all fresh produce items',
    createdAt: '2025-02-20T11:15:00',
    updatedAt: '2025-02-25T16:30:00',
    lastUsed: '2025-03-05T08:30:00',
    itemCount: 35,
    items: [
      { id: 'item-1', name: 'Tomatoes', category: 'Vegetables', location: 'Main Kitchen', unit: 'kg', includeInCount: true },
      { id: 'item-4', name: 'Lettuce', category: 'Vegetables', location: 'Cold Storage', unit: 'kg', includeInCount: true },
      { id: 'item-5', name: 'Onions', category: 'Vegetables', location: 'Main Kitchen', unit: 'kg', includeInCount: true },
    ],
    type: 'category',
    categories: ['Vegetables', 'Fruits'],
    schedule: {
      frequency: 'daily',
      time: '07:00'
    },
    createdBy: 'Sous Chef'
  },
  {
    id: 'template-3',
    name: 'Bar Inventory',
    description: 'Stocktake of all bar items',
    createdAt: '2025-02-10T09:45:00',
    updatedAt: '2025-02-28T13:20:00',
    lastUsed: '2025-03-07T17:00:00',
    itemCount: 45,
    items: [
      { id: 'item-6', name: 'Vodka', category: 'Spirits', location: 'Bar', unit: 'bottle', includeInCount: true },
      { id: 'item-7', name: 'Gin', category: 'Spirits', location: 'Bar', unit: 'bottle', includeInCount: true },
      { id: 'item-8', name: 'Tonic Water', category: 'Mixers', location: 'Bar', unit: 'bottle', includeInCount: true },
    ],
    type: 'location',
    locations: ['Bar', 'Bar Storage'],
    schedule: {
      frequency: 'weekly',
      daysOfWeek: [5], // Friday
      time: '16:00'
    },
    createdBy: 'Bar Manager'
  },
  {
    id: 'template-4',
    name: 'Mise en Place Count',
    description: 'Check of all prepped items',
    createdAt: '2025-02-25T08:30:00',
    updatedAt: '2025-03-02T10:15:00',
    lastUsed: '2025-03-08T06:30:00',
    itemCount: 28,
    items: [
      { id: 'item-9', name: 'Diced Onions', category: 'Prep', location: 'Prep Area', unit: 'kg', includeInCount: true },
      { id: 'item-10', name: 'Sliced Peppers', category: 'Prep', location: 'Prep Area', unit: 'kg', includeInCount: true },
      { id: 'item-11', name: 'Portioned Protein', category: 'Prep', location: 'Cold Storage', unit: 'portion', includeInCount: true },
    ],
    type: 'category',
    categories: ['Prep'],
    schedule: {
      frequency: 'daily',
      time: '06:00'
    },
    createdBy: 'Head Chef'
  },
  {
    id: 'template-5',
    name: 'Freezer Inventory',
    description: 'Count of all frozen items',
    createdAt: '2025-01-30T14:00:00',
    updatedAt: '2025-02-15T11:45:00',
    lastUsed: '2025-03-01T10:00:00',
    itemCount: 32,
    items: [
      { id: 'item-12', name: 'Frozen Vegetables', category: 'Frozen', location: 'Freezer', unit: 'kg', includeInCount: true },
      { id: 'item-13', name: 'Ice Cream', category: 'Desserts', location: 'Freezer', unit: 'liter', includeInCount: true },
      { id: 'item-14', name: 'Frozen Fish', category: 'Seafood', location: 'Freezer', unit: 'kg', includeInCount: true },
    ],
    type: 'location',
    locations: ['Freezer'],
    schedule: {
      frequency: 'monthly',
      dayOfMonth: 1,
      time: '09:00'
    },
    createdBy: 'Kitchen Manager'
  }
];

// Create a view mode enum
type ViewMode = 'list' | 'detail' | 'edit' | 'create';

const TemplateManagement: React.FC = () => {
  // State variables
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  
  // Filtered templates based on search and filter
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterType || template.type === filterType;
    return matchesSearch && matchesFilter;
  });
  
  // Handle template selection
  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setViewMode('detail');
  };
  
  // Handle edit template
  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setViewMode('edit');
  };
  
  // Handle create new template
  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setViewMode('create');
  };
  
  // Handle delete template
  const handleDeleteTemplate = (templateId: string) => {
    // Show confirmation toast
    toast(
      <div className="flex flex-col gap-2">
        <p className="font-medium">Delete this template?</p>
        <p className="text-sm text-kitchen-muted-foreground">This action cannot be undone.</p>
        <div className="flex gap-2 mt-2">
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => {
              // Actual delete happens here
              setTemplates(prev => prev.filter(t => t.id !== templateId));
              if (selectedTemplate?.id === templateId) {
                setSelectedTemplate(null);
                setViewMode('list');
              }
              toast.dismiss();
              toast.success("Template deleted successfully");
            }}
          >
            Delete
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </Button>
        </div>
      </div>, 
      { duration: 5000 }
    );
  };
  
  // Handle duplicate template
  const handleDuplicateTemplate = (template: Template) => {
    const newTemplate: Template = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastUsed: undefined,
      isDefault: false
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    toast.success(`Template "${template.name}" duplicated successfully`);
  };
  
  // Handle save template (for both edit and create)
  const handleSaveTemplate = (template: Template) => {
    if (viewMode === 'edit') {
      // Update existing template
      setTemplates(prev => prev.map(t => t.id === template.id ? template : t));
      toast.success(`Template "${template.name}" updated successfully`);
    } else {
      // Create new template
      const newTemplate: Template = {
        ...template,
        id: `template-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Kitchen Manager' // In a real app, this would be the current user
      };
      setTemplates(prev => [...prev, newTemplate]);
      toast.success(`Template "${template.name}" created successfully`);
    }
    setSelectedTemplate(template);
    setViewMode('detail');
  };
  
  // Cancel edit/create and go back
  const handleCancel = () => {
    if (selectedTemplate) {
      setViewMode('detail');
    } else {
      setViewMode('list');
    }
  };
  
  // Handle back button to return to list view
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedTemplate(null);
  };
  
  // Render based on the current view mode
  return (
    <div className="space-y-4">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-stretch sm:items-center">
        <div>
          <h2 className="text-xl font-semibold text-carbon-gray-100">
            {viewMode === 'list' ? 'Stocktake Templates' : 
             viewMode === 'detail' ? selectedTemplate?.name : 
             viewMode === 'edit' ? `Edit: ${selectedTemplate?.name}` : 
             'Create New Template'}
          </h2>
          <p className="text-sm text-carbon-gray-70 mt-1">
            {viewMode === 'list' ? 'Manage and organize your stocktake templates' : 
             viewMode === 'detail' ? selectedTemplate?.description : 
             viewMode === 'edit' ? 'Modify template details and items' : 
             'Create a new stocktake template'}
          </p>
        </div>
        
        {viewMode === 'list' && (
          <Button
            onClick={handleCreateTemplate}
            className="bg-carbon-blue-60 hover:bg-carbon-blue-70"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        )}
        
        {viewMode === 'detail' && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleEditTemplate(selectedTemplate!)}
            >
              <PenLine className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDuplicateTemplate(selectedTemplate!)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDeleteTemplate(selectedTemplate!.id)}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
      </div>
      
      {/* Back button for detail/edit/create views */}
      {viewMode !== 'list' && (
        <Button 
          variant="outline" 
          className="mb-4" 
          onClick={handleBackToList}
        >
          ← Back to Templates
        </Button>
      )}
      
      {/* Search and filter (only shown in list view) */}
      {viewMode === 'list' && (
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-4">
          <div className="relative w-full sm:w-72 lg:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-gray-70" />
            <Input
              placeholder="Search templates..."
              className="pl-9 bg-white border-carbon-gray-20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant={filterType === null ? 'default' : 'outline'} 
              onClick={() => setFilterType(null)}
              className={filterType === null ? "bg-carbon-blue-60" : ""}
            >
              All
            </Button>
            <Button 
              size="sm" 
              variant={filterType === 'full' ? 'default' : 'outline'} 
              onClick={() => setFilterType('full')}
              className={filterType === 'full' ? "bg-carbon-blue-60" : ""}
            >
              Full Count
            </Button>
            <Button 
              size="sm" 
              variant={filterType === 'partial' ? 'default' : 'outline'} 
              onClick={() => setFilterType('partial')}
              className={filterType === 'partial' ? "bg-carbon-blue-60" : ""}
            >
              Partial
            </Button>
            <Button 
              size="sm" 
              variant={filterType === 'category' ? 'default' : 'outline'} 
              onClick={() => setFilterType('category')}
              className={filterType === 'category' ? "bg-carbon-blue-60" : ""}
            >
              By Category
            </Button>
            <Button 
              size="sm" 
              variant={filterType === 'location' ? 'default' : 'outline'} 
              onClick={() => setFilterType('location')}
              className={filterType === 'location' ? "bg-carbon-blue-60" : ""}
            >
              By Location
            </Button>
          </div>
        </div>
      )}
      
      {/* Main content based on view mode */}
      {viewMode === 'list' && (
        <TemplateList 
          templates={filteredTemplates} 
          onSelectTemplate={handleSelectTemplate}
          onEditTemplate={handleEditTemplate}
          onDuplicateTemplate={handleDuplicateTemplate}
          onDeleteTemplate={handleDeleteTemplate}
        />
      )}
      
      {viewMode === 'detail' && selectedTemplate && (
        <TemplateDetail 
          template={selectedTemplate}
          onEdit={() => handleEditTemplate(selectedTemplate)}
        />
      )}
      
      {(viewMode === 'edit' || viewMode === 'create') && (
        <TemplateEditor 
          template={viewMode === 'edit' ? selectedTemplate : undefined} 
          onSave={handleSaveTemplate}
          onCancel={handleCancel}
          isNew={viewMode === 'create'}
        />
      )}
    </div>
  );
};

export default TemplateManagement;
