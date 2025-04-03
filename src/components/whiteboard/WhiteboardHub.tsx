
import React, { useState } from 'react';
import { WhiteboardTemplate } from '@/components/whiteboard/types';
import WhiteboardTemplateSelector from '@/components/whiteboard/WhiteboardTemplateSelector';
import { TEMPLATES } from './data/WhiteboardTemplates';
import WhiteboardDashboard from './components/WhiteboardDashboard';
import WhiteboardView from './components/WhiteboardView';

const WhiteboardHub: React.FC = () => {
  const [boards, setBoards] = useState<string[]>(['supplier-order', 'weekly-order', 'quick-reorder', 'daily-ops']);
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

  if (activeBoard) {
    const template = TEMPLATES.find(t => t.id === activeBoard);
    
    if (!template) {
      return <div>Board not found</div>;
    }
    
    return <WhiteboardView template={template} onBackClick={handleBackToHome} />;
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
        <WhiteboardDashboard 
          boards={boards}
          templates={TEMPLATES}
          onOpenBoard={handleOpenBoard}
          onNewWhiteboard={() => setShowTemplateSelector(true)}
        />
      )}
    </div>
  );
};

export default WhiteboardHub;
