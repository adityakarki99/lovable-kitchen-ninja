import React, { useState } from 'react';
import { WhiteboardTemplate } from '@/components/whiteboard/types';
import WhiteboardPanel from '@/components/whiteboard/WhiteboardPanel';
import WhiteboardTemplateSelector from '@/components/whiteboard/WhiteboardTemplateSelector';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, ArrowLeft, CheckSquare, CalendarCheck, ClipboardList, Menu, MessageSquare, Users, ShoppingCart } from 'lucide-react';

const TEMPLATES: WhiteboardTemplate[] = [
  {
    id: 'supplier-order',
    name: 'Supplier Order Template',
    description: 'Create and track supplier orders',
    sections: [
      { id: 'order-details', title: 'Order Details', type: 'text' },
      { id: 'order-items', title: 'Order Items', type: 'table' },
      { id: 'delivery-notes', title: 'Delivery Notes', type: 'text' },
      { id: 'verification', title: 'Order Verification', type: 'checklist' }
    ]
  },
  {
    id: 'weekly-order',
    name: 'Weekly Order Planner',
    description: 'Plan weekly ordering across departments',
    sections: [
      { id: 'produce', title: 'Produce Order', type: 'text' },
      { id: 'meat', title: 'Meat & Poultry', type: 'text' },
      { id: 'seafood', title: 'Seafood', type: 'text' },
      { id: 'dry-goods', title: 'Dry Goods', type: 'text' },
      { id: 'beverage', title: 'Beverages', type: 'text' },
      { id: 'verification', title: 'Order Checklist', type: 'checklist' }
    ]
  },
  {
    id: 'quick-reorder',
    name: 'Quick Reorder Form',
    description: 'Fast reordering of commonly used items',
    sections: [
      { id: 'urgent-items', title: 'Urgent Reorder Items', type: 'checklist' },
      { id: 'quantities', title: 'Quantities', type: 'table' },
      { id: 'notes', title: 'Special Instructions', type: 'text' }
    ]
  },
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

const getTemplateIcon = (id: string) => {
  switch (id) {
    case 'supplier-order':
      return <ShoppingCart className="h-8 w-8 text-blue-500" />;
    case 'weekly-order':
      return <ClipboardList className="h-8 w-8 text-green-500" />;
    case 'quick-reorder':
      return <Plus className="h-8 w-8 text-amber-500" />;
    case 'daily-ops':
      return <ClipboardList className="h-8 w-8 text-teal-500" />;
    case 'weekly-planning':
      return <CalendarCheck className="h-8 w-8 text-green-500" />;
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
  const [boards, setBoards] = useState<string[]>(['supplier-order', 'weekly-order']);
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

  const recentActivity = [
    { id: 1, user: 'Alex', action: 'updated', board: 'Supplier Order Template', time: '2 hours ago' },
    { id: 2, user: 'Jamie', action: 'commented on', board: 'Weekly Order Planner', time: 'Yesterday' },
    { id: 3, user: 'Taylor', action: 'created', board: 'Quick Reorder Form', time: '2 days ago' },
  ];
  
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
                Streamline ordering and collaboration with team whiteboards
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
                  className="hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
                  onClick={() => handleOpenBoard(boardId)}
                >
                  <div className={`h-2 w-full bg-${boardId === 'supplier-order' ? 'blue' : boardId === 'weekly-order' ? 'green' : boardId === 'quick-reorder' ? 'amber' : boardId === 'daily-ops' ? 'teal' : boardId === 'weekly-planning' ? 'green' : boardId === 'menu-dev' ? 'red' : boardId === 'message-board' ? 'purple' : 'teal'}-500`} />
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
