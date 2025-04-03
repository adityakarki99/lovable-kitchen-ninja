
import React, { useEffect, useState } from 'react';
import { WhiteboardSection as SectionType, ChecklistItem, TableDefinition } from './types';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';

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
  
  const handleTextChange = (value: string) => {
    setLocalContent(value);
    onChange(value);
  };
  
  const handleChecklistChange = (items: ChecklistItem[]) => {
    setLocalContent(items);
    onChange(items);
  };
  
  const handleTableChange = (tableData: TableDefinition) => {
    setLocalContent(tableData);
    onChange(tableData);
  };
  
  if (!localContent) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-lg">{section.title}</h3>
      
      {section.type === 'text' && (
        <Textarea
          value={localContent}
          onChange={(e) => handleTextChange(e.target.value)}
          disabled={!isEditing}
          className="min-h-[150px]"
          placeholder={`Add ${section.title.toLowerCase()} here...`}
        />
      )}
      
      {section.type === 'checklist' && (
        <div className="space-y-2">
          {localContent.map((item: ChecklistItem, index: number) => (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox
                checked={item.completed}
                onCheckedChange={(checked) => {
                  const newItems = [...localContent];
                  newItems[index].completed = checked === true;
                  handleChecklistChange(newItems);
                }}
                disabled={!isEditing}
              />
              <Input
                value={item.text}
                onChange={(e) => {
                  const newItems = [...localContent];
                  newItems[index].text = e.target.value;
                  handleChecklistChange(newItems);
                }}
                disabled={!isEditing}
                placeholder="Task or item..."
                className="flex-1"
              />
              {isEditing && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    const newItems = localContent.filter((_: any, i: number) => i !== index);
                    handleChecklistChange(newItems);
                  }}
                >
                  <Trash className="h-4 w-4 text-kitchen-muted-foreground" />
                </Button>
              )}
            </div>
          ))}
          
          {isEditing && (
            <Button
              size="sm"
              variant="outline"
              className="w-full mt-2"
              onClick={() => {
                const newItems = [
                  ...localContent,
                  { id: Date.now().toString(), text: '', completed: false }
                ];
                handleChecklistChange(newItems);
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          )}
        </div>
      )}
      
      {section.type === 'table' && (
        <div className="border rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-kitchen-muted/50">
              <tr>
                {localContent.columns.map((col: any) => (
                  <th key={col.id} className="p-2 text-left text-sm font-medium">
                    {isEditing ? (
                      <Input
                        value={col.name}
                        onChange={(e) => {
                          const newCols = [...localContent.columns];
                          const colIndex = newCols.findIndex(c => c.id === col.id);
                          newCols[colIndex].name = e.target.value;
                          handleTableChange({
                            ...localContent,
                            columns: newCols
                          });
                        }}
                        className="h-8 text-sm"
                      />
                    ) : (
                      col.name
                    )}
                  </th>
                ))}
                {isEditing && <th className="w-10"></th>}
              </tr>
            </thead>
            <tbody>
              {localContent.rows.map((row: any, rowIndex: number) => (
                <tr key={row.id} className="border-t">
                  {localContent.columns.map((col: any) => (
                    <td key={`${row.id}-${col.id}`} className="p-2">
                      <Input
                        value={row.cells[col.id] || ''}
                        onChange={(e) => {
                          const newRows = [...localContent.rows];
                          newRows[rowIndex].cells[col.id] = e.target.value;
                          handleTableChange({
                            ...localContent,
                            rows: newRows
                          });
                        }}
                        disabled={!isEditing}
                        className="h-8 text-sm"
                      />
                    </td>
                  ))}
                  {isEditing && (
                    <td className="p-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          const newRows = localContent.rows.filter((_: any, i: number) => i !== rowIndex);
                          handleTableChange({
                            ...localContent,
                            rows: newRows
                          });
                        }}
                      >
                        <Trash className="h-4 w-4 text-kitchen-muted-foreground" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
          {isEditing && (
            <div className="p-2 border-t">
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => {
                  const newRow = {
                    id: Date.now().toString(),
                    cells: {}
                  };
                  localContent.columns.forEach((col: any) => {
                    newRow.cells[col.id] = '';
                  });
                  handleTableChange({
                    ...localContent,
                    rows: [...localContent.rows, newRow]
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Row
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WhiteboardSection;
