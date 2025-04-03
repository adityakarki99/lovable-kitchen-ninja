
import React, { useState, useEffect } from 'react';
import { WhiteboardTemplate } from './types';
import WhiteboardSection from './WhiteboardSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Save, MessageSquare, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface WhiteboardPanelProps {
  template: WhiteboardTemplate;
}

const WhiteboardPanel: React.FC<WhiteboardPanelProps> = ({ template }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [sectionContents, setSectionContents] = useState<Record<string, any>>({});
  const [showComments, setShowComments] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize section contents from template if available
    const initialContents: Record<string, any> = {};
    template.sections.forEach(section => {
      if (section.content !== undefined) {
        initialContents[section.id] = section.content;
      }
    });
    setSectionContents(initialContents);
  }, [template]);
  
  const handleSectionChange = (sectionId: string, content: any) => {
    setSectionContents(prev => ({
      ...prev,
      [sectionId]: content
    }));
  };
  
  const handleSave = () => {
    // Here you would save the whiteboard data to your backend
    console.log('Saving whiteboard data:', {
      templateId: template.id,
      sections: sectionContents
    });
    setIsEditing(false);
    
    toast({
      title: "Whiteboard updated",
      description: "Your changes have been saved successfully.",
      duration: 3000,
    });
  };

  // Mock comments data (would come from a database in a real app)
  const comments = [
    { id: 1, user: 'Chef Alex', text: 'Make sure we get the highest quality tomatoes for this weekend.', time: '2 hours ago' },
    { id: 2, user: 'Jamie', text: 'I updated the quantities based on last week\'s usage.', time: 'Yesterday' },
    { id: 3, user: 'Kitchen Manager', text: 'Order approved. Please send confirmation to supplier ASAP.', time: 'Today at 10:35 AM' }
  ];
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-medium">{template.name}</h2>
          <p className="text-kitchen-muted-foreground text-sm mt-1">{template.description}</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Comments
          </Button>
          <Button 
            variant={isEditing ? "default" : "outline"}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Whiteboard
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {template.sections.map((section) => (
            <Card key={section.id} className="overflow-hidden">
              <div className={`h-1 w-full bg-${template.id === 'supplier-order' ? 'blue' : template.id === 'weekly-order' ? 'green' : template.id === 'quick-reorder' ? 'amber' : template.id === 'daily-ops' ? 'teal' : template.id === 'weekly-planning' ? 'green' : template.id === 'menu-dev' ? 'red' : 'teal'}-500`} />
              <CardContent className="p-6">
                <WhiteboardSection
                  section={section}
                  isEditing={isEditing}
                  content={sectionContents[section.id]}
                  onChange={(content) => handleSectionChange(section.id, content)}
                />
              </CardContent>
            </Card>
          ))}
        </div>
        
        {showComments && (
          <div className="w-80 shrink-0">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Comments</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowComments(false)}>
                    ×
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-kitchen-muted flex items-center justify-center text-kitchen-foreground mr-2">
                          {comment.user.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{comment.user}</p>
                          <p className="text-xs text-kitchen-muted-foreground">{comment.time}</p>
                        </div>
                      </div>
                      <p className="text-sm pl-10">{comment.text}</p>
                      {index < comments.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <textarea 
                    className="w-full p-2 border rounded-md text-sm" 
                    placeholder="Add a comment..."
                    rows={3}
                  />
                  <Button className="mt-2" size="sm">Post Comment</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <Card className="bg-kitchen-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-kitchen-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span>3 team members collaborating</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhiteboardPanel;
