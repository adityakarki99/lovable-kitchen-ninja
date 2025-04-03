
import React, { useState } from 'react';
import { WhiteboardTemplate } from '@/components/whiteboard/types';
import WhiteboardPanel from '@/components/whiteboard/WhiteboardPanel';
import WhiteboardTemplateSelector from '@/components/whiteboard/WhiteboardTemplateSelector';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, ArrowLeft, CheckSquare, CalendarCheck, ClipboardList, Menu, MessageSquare, Users } from 'lucide-react';

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
  },
  {
    id: 'message-board',
    name: 'Message Board',
    description: 'Team communication hub',
    sections: [
      { id: 'announcements', title: 'Announcements', type: 'text' },
      { id: 'general', title: 'General Discussion', type: 'text' },
      { id: 'ideas', title: 'Ideas & Suggestions', type: 'text' }
    ]
  },
  {
    id: 'to-dos',
    name: 'To-Do Lists',
    description: 'Manage tasks and assignments',
    sections: [
      { id: 'kitchen-prep', title: 'Kitchen Prep Tasks', type: 'checklist' },
      { id: 'inventory', title: 'Inventory Tasks', type: 'checklist' },
      { id: 'cleaning', title: 'Cleaning & Maintenance', type: 'checklist' }
    ]
  }
];

const getTemplateIcon = (id: string) => {
  switch (id) {
    case 'daily-ops':
      return <ClipboardList className="h-8 w-8 text-blue-500" />;
    case 'weekly-planning':
      return <CalendarCheck className="h-8 w-8 text-green-500" />;
    case 'training':
      return <CheckSquare className="h-8 w-8 text-orange-500" />;
    case 'menu-dev':
      return <Menu className="h-8 w-8 text-red-500" />;
    case 'message-board':
      return <MessageSquare className="h-8 w-8 text-purple-500" />;
    case 'to-dos':
      return <CheckSquare className="h-8 w-8 text-teal-500" />;
    default:
      return <ClipboardList className="h-8 w-8 text-blue-500" />;
  }
};

const WhiteboardHub: React.FC = () => {
  const [boards, setBoards] = useState<string[]>(['daily-ops', 'weekly-planning']);
  const [activeBoard, setActiveBoard] = useState<string | null>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState<boolean>(false);
  
  const handleAddBoard = (templateId: string) => {
    if (!boards.includes(templateId)) {
      setBoards([...boards, templateId]);
    }
    setShowTemplateSelector(false);
  };
  
  const handleOpenBoard = (boardId: string) => {
    setActiveBoard(boardId);
  };
  
  const handleBackToHome = () => {
    setActiveBoard(null);
  };

  // Basecamp-style activity stream
  const recentActivity = [
    { id: 1, user: 'Alex', action: 'updated', board: 'Daily Operations', time: '2 hours ago' },
    { id: 2, user: 'Jamie', action: 'commented on', board: 'Weekly Planning', time: 'Yesterday' },
    { id: 3, user: 'Taylor', action: 'created', board: 'Menu Development', time: '2 days ago' },
  ];
  
  // If a specific board is active, show that board's panel
  if (activeBoard) {
    const template = TEMPLATES.find(t => t.id === activeBoard);
    
    if (!template) {
      return <div>Board not found</div>;
    }
    
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={handleBackToHome} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Whiteboards
          </Button>
          <h2 className="text-2xl font-medium">{template.name}</h2>
        </div>
        
        <WhiteboardPanel template={template} />
      </div>
    );
  }
  
  return (
    <div className="space-y-8 animate-fade-in">
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
              <h2 className="text-2xl font-medium mb-1">Your Whiteboards</h2>
              <p className="text-kitchen-muted-foreground">
                Collaborate with your team using digital whiteboards
              </p>
            </div>
            <Button onClick={() => setShowTemplateSelector(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Whiteboard
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map(boardId => {
              const template = TEMPLATES.find(t => t.id === boardId);
              if (!template) return null;
              
              return (
                <Card 
                  key={boardId}
                  className="hover:shadow-md transition-all duration-200 overflow-hidden"
                  onClick={() => handleOpenBoard(boardId)}
                >
                  <div className={`h-2 w-full bg-${boardId === 'daily-ops' ? 'blue' : boardId === 'weekly-planning' ? 'green' : boardId === 'training' ? 'orange' : boardId === 'menu-dev' ? 'red' : boardId === 'message-board' ? 'purple' : 'teal'}-500`} />
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
            })}
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-medium mb-4">Recent Activity</h3>
            <Card>
              <CardContent className="p-4">
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <div className="flex items-center py-3">
                      <div className="h-8 w-8 rounded-full bg-kitchen-muted flex items-center justify-center text-kitchen-foreground mr-3">
                        {activity.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.action}{' '}
                          <span className="font-medium">{activity.board}</span>
                        </p>
                        <p className="text-xs text-kitchen-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    {index < recentActivity.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default WhiteboardHub;
