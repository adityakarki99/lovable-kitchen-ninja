
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { WhiteboardTemplate } from '@/components/whiteboard/types';
import WhiteboardCard from './WhiteboardCard';
import RecentActivityFeed from './RecentActivityFeed';

interface WhiteboardDashboardProps {
  boards: string[];
  templates: WhiteboardTemplate[];
  onOpenBoard: (boardId: string) => void;
  onNewWhiteboard: () => void;
}

const WhiteboardDashboard: React.FC<WhiteboardDashboardProps> = ({ 
  boards, 
  templates, 
  onOpenBoard, 
  onNewWhiteboard 
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-medium mb-1">Your Whiteboards</h2>
          <p className="text-kitchen-muted-foreground">
            Streamline ordering and collaboration with team whiteboards
          </p>
        </div>
        <Button onClick={onNewWhiteboard}>
          <Plus className="h-4 w-4 mr-2" />
          New Whiteboard
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map(boardId => {
          const template = templates.find(t => t.id === boardId);
          if (!template) return null;
          
          return (
            <WhiteboardCard 
              key={boardId} 
              template={template} 
              boardId={boardId}
              onClick={() => onOpenBoard(boardId)}
            />
          );
        })}
      </div>
      
      <RecentActivityFeed />
    </>
  );
};

export default WhiteboardDashboard;
