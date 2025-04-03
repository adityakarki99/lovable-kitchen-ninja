
import React, { useEffect, useState } from 'react';
import { WhiteboardSection as SectionType } from './types';
import TextSection from './sections/TextSection';
import ChecklistSection from './sections/ChecklistSection';
import TableSection from './sections/TableSection';

interface WhiteboardSectionProps {
  section: SectionType;
  isEditing: boolean;
  content: any;
  onChange: (content: any) => void;
}

const WhiteboardSection: React.FC<WhiteboardSectionProps> = ({
  section,
  isEditing,
  content,
  onChange
}) => {
  const [localContent, setLocalContent] = useState<any>(null);
  
  useEffect(() => {
    // Initialize content based on section type if none exists
    if (!content) {
      if (section.type === 'checklist') {
        onChange([{ id: '1', text: '', completed: false }]);
      } else if (section.type === 'table') {
        onChange({
          columns: [
            { id: 'col1', name: 'Name' },
            { id: 'col2', name: 'Role' }
          ],
          rows: [{ id: '1', cells: { col1: '', col2: '' } }]
        });
      } else {
        onChange('');
      }
    } else {
      setLocalContent(content);
    }
  }, [section, content, onChange]);
  
  useEffect(() => {
    if (content) {
      setLocalContent(content);
    }
  }, [content]);
  
  if (!localContent) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-lg">{section.title}</h3>
      
      {section.type === 'text' && (
        <TextSection 
          content={localContent}
          isEditing={isEditing}
          onChange={(value) => {
            setLocalContent(value);
            onChange(value);
          }}
          placeholder={`Add ${section.title.toLowerCase()} here...`}
        />
      )}
      
      {section.type === 'checklist' && (
        <ChecklistSection 
          items={localContent}
          isEditing={isEditing}
          onChange={(items) => {
            setLocalContent(items);
            onChange(items);
          }}
        />
      )}
      
      {section.type === 'table' && (
        <TableSection 
          tableData={localContent}
          isEditing={isEditing}
          onChange={(tableData) => {
            setLocalContent(tableData);
            onChange(tableData);
          }}
        />
      )}
    </div>
  );
};

export default WhiteboardSection;
