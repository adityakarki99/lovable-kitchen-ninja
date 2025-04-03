
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import WhiteboardPanel from '@/components/whiteboard/WhiteboardPanel';
import { WhiteboardTemplate } from '@/components/whiteboard/types';

interface WhiteboardViewProps {
  template: WhiteboardTemplate;
  onBackClick: () => void;
}

const WhiteboardView: React.FC<WhiteboardViewProps> = ({ template, onBackClick }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBackClick} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Whiteboards
        </Button>
        <h2 className="text-2xl font-medium">{template.name}</h2>
      </div>
      
      <WhiteboardPanel template={template} />
    </div>
  );
};

export default WhiteboardView;
