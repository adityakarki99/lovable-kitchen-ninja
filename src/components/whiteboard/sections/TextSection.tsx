
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface TextSectionProps {
  content: string;
  isEditing: boolean;
  onChange: (content: string) => void;
  placeholder: string;
}

const TextSection: React.FC<TextSectionProps> = ({
  content,
  isEditing,
  onChange,
  placeholder
}) => {
  return (
    <Textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      disabled={!isEditing}
      className="min-h-[150px]"
      placeholder={placeholder}
    />
  );
};

export default TextSection;
