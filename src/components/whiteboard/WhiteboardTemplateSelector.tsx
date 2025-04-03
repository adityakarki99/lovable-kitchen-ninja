
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WhiteboardTemplate } from './types';
import { CalendarCheck, CheckSquare, ClipboardList, Menu, X } from 'lucide-react';

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
  const getTemplateIcon = (id: string) => {
    switch (id) {
      case 'daily-ops':
        return <ClipboardList className="h-8 w-8 text-kitchen-primary" />;
      case 'weekly-planning':
        return <CalendarCheck className="h-8 w-8 text-kitchen-success" />;
      case 'training':
        return <CheckSquare className="h-8 w-8 text-kitchen-warning" />;
      case 'menu-dev':
        return <Menu className="h-8 w-8 text-kitchen-danger" />;
      default:
        return <ClipboardList className="h-8 w-8 text-kitchen-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Select a Whiteboard Template</h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className="hover:border-kitchen-primary cursor-pointer transition-all duration-200 h-full"
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                {getTemplateIcon(template.id)}
              </div>
              <h3 className="text-lg font-medium mb-2">{template.name}</h3>
              <p className="text-sm text-kitchen-muted-foreground mb-4">{template.description}</p>
              
              <div className="mt-auto">
                <p className="text-xs text-kitchen-muted-foreground">
                  {template.sections.length} sections
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WhiteboardTemplateSelector;
