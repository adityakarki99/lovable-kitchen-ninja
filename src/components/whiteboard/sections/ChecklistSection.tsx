
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash, CheckSquare } from 'lucide-react';
import { ChecklistItem } from '../types';
import { Badge } from '@/components/ui/badge';

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
  
  // Check if this is likely an order verification checklist
  const isOrderVerification = items.some(item => 
    item.text.toLowerCase().includes('verify') || 
    item.text.toLowerCase().includes('check') || 
    item.text.toLowerCase().includes('confirm') ||
    item.text.toLowerCase().includes('approve') ||
    item.text.toLowerCase().includes('order')
  );
  
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-2">
      {isOrderVerification && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <CheckSquare className="h-4 w-4 mr-2 text-green-600" />
            <span className="text-sm font-medium">Order Verification</span>
          </div>
          <Badge className={`${progress === 100 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
            {progress}% Complete
          </Badge>
        </div>
      )}
      
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className={`flex items-center gap-2 p-2 rounded-md ${
            item.completed ? 'bg-kitchen-muted/20' : ''
          }`}
        >
          <Checkbox
            checked={item.completed}
            onCheckedChange={(checked) => handleCheckChange(index, checked as boolean)}
            disabled={!isEditing}
            className={item.completed ? 'text-green-600' : ''}
          />
          <Input
            value={item.text}
            onChange={(e) => handleTextChange(index, e.target.value)}
            disabled={!isEditing}
            placeholder="Task or item..."
            className={`flex-1 ${
              item.completed ? 'line-through text-kitchen-muted-foreground' : ''
            }`}
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
      
      {isOrderVerification && items.length > 0 && !isEditing && (
        <div className="h-2 w-full bg-kitchen-muted rounded-full mt-4 overflow-hidden">
          <div 
            className={`h-full ${progress === 100 ? 'bg-green-500' : 'bg-amber-500'}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ChecklistSection;
