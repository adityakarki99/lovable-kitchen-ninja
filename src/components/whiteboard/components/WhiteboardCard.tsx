
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { WhiteboardTemplate } from '@/components/whiteboard/types';
import { getTemplateIcon } from '../data/WhiteboardTemplates';

interface WhiteboardCardProps {
  template: WhiteboardTemplate;
  onClick: () => void;
  boardId: string;
}

const WhiteboardCard: React.FC<WhiteboardCardProps> = ({ 
  template, 
  onClick, 
  boardId 
}) => {
  const getColorClass = (id: string) => {
    switch (id) {
      case 'supplier-order': return 'bg-blue-500';
      case 'weekly-order': return 'bg-green-500';
      case 'quick-reorder': return 'bg-amber-500';
      case 'daily-ops': return 'bg-teal-500';
      case 'weekly-planning': return 'bg-green-500';
      case 'menu-dev': return 'bg-red-500';
      case 'message-board': return 'bg-purple-500';
      default: return 'bg-teal-500';
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className={`h-2 w-full ${getColorClass(boardId)}`} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          {getTemplateIcon(boardId)}
          <span className="text-xs text-kitchen-muted-foreground bg-kitchen-muted px-2 py-1 rounded-full">
            {template.sections.length} sections
          </span>
        </div>
        <h3 className="text-xl font-medium mb-2">{template.name}</h3>
        <p className="text-kitchen-muted-foreground mb-4 text-sm">{template.description}</p>
        <div className="mt-4 flex items-center text-kitchen-muted-foreground text-xs">
          <Users className="h-3 w-3 mr-1" />
          <span>3 team members</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhiteboardCard;
