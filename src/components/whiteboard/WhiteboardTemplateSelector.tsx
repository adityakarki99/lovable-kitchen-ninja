
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WhiteboardTemplate } from './types';
import { X } from 'lucide-react';
import { getTemplateIcon } from './data/WhiteboardTemplates';

interface WhiteboardTemplateSelectorProps {
  templates: WhiteboardTemplate[];
  onSelectTemplate: (templateId: string) => void;
  onCancel: () => void;
}

const WhiteboardTemplateSelector: React.FC<WhiteboardTemplateSelectorProps> = ({
  templates,
  onSelectTemplate,
  onCancel
}) => {
  const getColorClass = (id: string) => {
    switch (id) {
      case 'supplier-order': return 'border-blue-500';
      case 'weekly-order': return 'border-green-500';
      case 'quick-reorder': return 'border-amber-500';
      case 'daily-ops': return 'border-teal-500';
      case 'weekly-planning': return 'border-green-500';
      case 'training': return 'border-orange-500';
      case 'menu-dev': return 'border-red-500';
      case 'message-board': return 'border-purple-500';
      case 'to-dos': return 'border-teal-500';
      default: return 'border-blue-500';
    }
  };

  // Group templates into categories
  const orderTemplates = templates.filter(t => 
    t.id === 'supplier-order' || t.id === 'weekly-order' || t.id === 'quick-reorder'
  );
  
  const otherTemplates = templates.filter(t => 
    t.id !== 'supplier-order' && t.id !== 'weekly-order' && t.id !== 'quick-reorder'
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Select a Template</h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <p className="text-kitchen-muted-foreground">
        Choose a template to start with. You can customize it after creation.
      </p>
      
      {orderTemplates.length > 0 && (
        <>
          <h3 className="text-lg font-medium mt-6">Order Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orderTemplates.map((template) => (
              <Card 
                key={template.id}
                className={`hover:shadow-md cursor-pointer transition-all duration-200 border-l-4 ${getColorClass(template.id)}`}
                onClick={() => onSelectTemplate(template.id)}
              >
                <CardContent className="p-6 flex">
                  <div className="mr-5">
                    {getTemplateIcon(template.id)}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{template.name}</h3>
                    <p className="text-sm text-kitchen-muted-foreground mb-4">{template.description}</p>
                    <div className="flex items-center text-xs text-kitchen-muted-foreground">
                      <span>{template.sections.length} sections</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
      
      {otherTemplates.length > 0 && (
        <>
          <h3 className="text-lg font-medium mt-6">Other Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherTemplates.map((template) => (
              <Card 
                key={template.id}
                className={`hover:shadow-md cursor-pointer transition-all duration-200 border-l-4 ${getColorClass(template.id)}`}
                onClick={() => onSelectTemplate(template.id)}
              >
                <CardContent className="p-6 flex">
                  <div className="mr-5">
                    {getTemplateIcon(template.id)}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{template.name}</h3>
                    <p className="text-sm text-kitchen-muted-foreground mb-4">{template.description}</p>
                    <div className="flex items-center text-xs text-kitchen-muted-foreground">
                      <span>{template.sections.length} sections</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
      
      <div className="flex justify-end mt-6">
        <Button variant="ghost" onClick={onCancel} className="mr-2">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default WhiteboardTemplateSelector;
