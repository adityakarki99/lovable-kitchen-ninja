
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import { ChecklistItem } from '../types';

interface ChecklistSectionProps {
  items: ChecklistItem[];
  isEditing: boolean;
  onChange: (items: ChecklistItem[]) => void;
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  items,
  isEditing,
  onChange
}) => {
  const handleCheckChange = (index: number, checked: boolean) => {
    const newItems = [...items];
    newItems[index].completed = checked === true;
    onChange(newItems);
  };

  const handleTextChange = (index: number, text: string) => {
    const newItems = [...items];
    newItems[index].text = text;
    onChange(newItems);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleAddItem = () => {
    const newItems = [
      ...items,
      { id: Date.now().toString(), text: '', completed: false }
    ];
    onChange(newItems);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center gap-2">
          <Checkbox
            checked={item.completed}
            onCheckedChange={(checked) => handleCheckChange(index, checked as boolean)}
            disabled={!isEditing}
          />
          <Input
            value={item.text}
            onChange={(e) => handleTextChange(index, e.target.value)}
            disabled={!isEditing}
            placeholder="Task or item..."
            className="flex-1"
          />
          {isEditing && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleDeleteItem(index)}
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
          onClick={handleAddItem}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Item
        </Button>
      )}
    </div>
  );
};

export default ChecklistSection;
