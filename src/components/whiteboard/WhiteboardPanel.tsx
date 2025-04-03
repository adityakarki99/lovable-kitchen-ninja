
import React, { useState } from 'react';
import { WhiteboardTemplate } from './types';
import WhiteboardSection from './WhiteboardSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Save } from 'lucide-react';

interface WhiteboardPanelProps {
  template: WhiteboardTemplate;
}

const WhiteboardPanel: React.FC<WhiteboardPanelProps> = ({ template }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [sectionContents, setSectionContents] = useState<Record<string, any>>({});
  
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
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">{template.name}</h2>
        <Button 
          variant="outline"
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {template.sections.map((section) => (
          <Card key={section.id} className="h-full">
            <CardContent className="p-4">
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
    </div>
  );
};

export default WhiteboardPanel;
