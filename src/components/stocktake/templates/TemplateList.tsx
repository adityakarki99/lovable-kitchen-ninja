
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, PenLine, Copy, Trash, Calendar, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Template } from './TemplateManagement';

interface TemplateListProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
  onEditTemplate: (template: Template) => void;
  onDuplicateTemplate: (template: Template) => void;
  onDeleteTemplate: (templateId: string) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onSelectTemplate,
  onEditTemplate,
  onDuplicateTemplate,
  onDeleteTemplate
}) => {
  // Format date to be more readable
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get template type badge color
  const getTemplateTypeBadge = (type: string) => {
    switch (type) {
      case 'full':
        return "bg-carbon-blue-20 text-carbon-blue-70";
      case 'partial':
        return "bg-carbon-gray-20 text-carbon-gray-100";
      case 'category':
        return "bg-amber-100 text-amber-800";
      case 'location':
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-carbon-gray-20 text-carbon-gray-100";
    }
  };
  
  // Get template type display name
  const getTemplateTypeDisplay = (type: string) => {
    switch (type) {
      case 'full':
        return "Full Count";
      case 'partial':
        return "Partial";
      case 'category':
        return "By Category";
      case 'location':
        return "By Location";
      default:
        return type;
    }
  };
  
  // Get schedule display text
  const getScheduleDisplay = (template: Template) => {
    if (!template.schedule) return 'Not scheduled';
    
    switch (template.schedule.frequency) {
      case 'daily':
        return `Daily at ${template.schedule.time}`;
      case 'weekly':
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weekDays = template.schedule.daysOfWeek?.map(day => days[day]).join(', ');
        return `Weekly on ${weekDays} at ${template.schedule.time}`;
      case 'monthly':
        return `Monthly on day ${template.schedule.dayOfMonth} at ${template.schedule.time}`;
      case 'custom':
        return 'Custom schedule';
      default:
        return 'Scheduled';
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-carbon-gray-40 mb-4" />
          <h3 className="text-lg font-medium text-carbon-gray-100 mb-2">No templates found</h3>
          <p className="text-carbon-gray-70 mb-4">Create a new template to get started with stocktaking</p>
        </div>
      ) : (
        templates.map(template => (
          <Card key={template.id} className="overflow-hidden transition-all hover:border-carbon-blue-60 cursor-pointer">
            <div 
              className="p-4 cursor-pointer"
              onClick={() => onSelectTemplate(template)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-carbon-gray-100">{template.name}</h3>
                    {template.isDefault && (
                      <Badge className="bg-carbon-blue-60 text-white">Default</Badge>
                    )}
                  </div>
                  <p className="text-sm text-carbon-gray-70">{template.description}</p>
                </div>
                <Badge className={getTemplateTypeBadge(template.type)}>
                  {getTemplateTypeDisplay(template.type)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-carbon-gray-60" />
                  <span className="text-sm text-carbon-gray-100">{template.itemCount} items</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-carbon-gray-60" />
                  <span className="text-sm text-carbon-gray-100">
                    {formatDate(template.lastUsed)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 mb-3">
                <Clock className="h-4 w-4 text-carbon-gray-60" />
                <span className="text-sm text-carbon-gray-100">
                  {getScheduleDisplay(template)}
                </span>
              </div>
            </div>
            
            <CardFooter className="bg-carbon-gray-10 border-t border-carbon-gray-20 p-3 justify-end">
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditTemplate(template);
                  }}
                >
                  <PenLine className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateTemplate(template);
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-kitchen-danger hover:text-kitchen-danger hover:bg-kitchen-danger/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTemplate(template.id);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default TemplateList;
