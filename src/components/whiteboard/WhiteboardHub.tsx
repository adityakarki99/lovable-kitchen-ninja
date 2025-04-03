
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WhiteboardPanel from '@/components/whiteboard/WhiteboardPanel';
import { WhiteboardTemplate } from '@/components/whiteboard/types';
import WhiteboardTemplateSelector from '@/components/whiteboard/WhiteboardTemplateSelector';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const TEMPLATES: WhiteboardTemplate[] = [
  {
    id: 'daily-ops',
    name: 'Daily Operations',
    description: 'Track daily tasks and assignments',
    sections: [
      { id: 'tasks', title: 'Daily Tasks', type: 'checklist' },
      { id: 'staff', title: 'Staff Assignments', type: 'table' },
      { id: 'specials', title: "Today's Specials", type: 'text' },
      { id: 'notes', title: 'Notes & Reminders', type: 'text' }
    ]
  },
  {
    id: 'weekly-planning',
    name: 'Weekly Planning',
    description: 'Plan your week ahead',
    sections: [
      { id: 'mon', title: 'Monday', type: 'text' },
      { id: 'tue', title: 'Tuesday', type: 'text' },
      { id: 'wed', title: 'Wednesday', type: 'text' },
      { id: 'thu', title: 'Thursday', type: 'text' },
      { id: 'fri', title: 'Friday', type: 'text' },
      { id: 'sat', title: 'Saturday', type: 'text' },
      { id: 'sun', title: 'Sunday', type: 'text' }
    ]
  },
  {
    id: 'training',
    name: 'Training Board',
    description: 'Track staff training and skills',
    sections: [
      { id: 'trainees', title: 'Trainees', type: 'table' },
      { id: 'skills', title: 'Required Skills', type: 'checklist' },
      { id: 'materials', title: 'Training Materials', type: 'text' },
      { id: 'feedback', title: 'Feedback', type: 'text' }
    ]
  },
  {
    id: 'menu-dev',
    name: 'Menu Development',
    description: 'Collaborate on new menu items',
    sections: [
      { id: 'ideas', title: 'Ideas & Concepts', type: 'text' },
      { id: 'ingredients', title: 'Key Ingredients', type: 'text' },
      { id: 'testing', title: 'Testing Notes', type: 'text' },
      { id: 'feedback', title: 'Feedback', type: 'text' }
    ]
  }
];

const WhiteboardHub: React.FC = () => {
  const [boards, setBoards] = useState<string[]>(['daily-ops', 'weekly-planning']);
  const [activeBoard, setActiveBoard] = useState<string>('daily-ops');
  const [showTemplateSelector, setShowTemplateSelector] = useState<boolean>(false);
  
  const handleAddBoard = (templateId: string) => {
    if (!boards.includes(templateId)) {
      setBoards([...boards, templateId]);
      setActiveBoard(templateId);
    }
    setShowTemplateSelector(false);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      {showTemplateSelector ? (
        <WhiteboardTemplateSelector 
          templates={TEMPLATES} 
          onSelectTemplate={handleAddBoard}
          onCancel={() => setShowTemplateSelector(false)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-kitchen-muted-foreground">
                Collaborate with your team using digital whiteboards
              </p>
            </div>
            <Button onClick={() => setShowTemplateSelector(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Whiteboard
            </Button>
          </div>
          
          {boards.length > 0 ? (
            <Tabs value={activeBoard} onValueChange={setActiveBoard}>
              <TabsList className="w-full bg-kitchen-muted mb-4">
                {boards.map(boardId => {
                  const template = TEMPLATES.find(t => t.id === boardId);
                  return (
                    <TabsTrigger key={boardId} value={boardId}>
                      {template?.name || 'Untitled'}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              
              {boards.map(boardId => {
                const template = TEMPLATES.find(t => t.id === boardId);
                return (
                  <TabsContent key={boardId} value={boardId}>
                    {template && <WhiteboardPanel template={template} />}
                  </TabsContent>
                );
              })}
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-kitchen-muted/20 rounded-lg border border-dashed border-kitchen-border">
              <p className="text-kitchen-muted-foreground mb-4">No whiteboards created yet</p>
              <Button onClick={() => setShowTemplateSelector(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Whiteboard
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WhiteboardHub;
