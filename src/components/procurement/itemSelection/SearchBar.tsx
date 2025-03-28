
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchQuery, 
  onSearchChange, 
  disabled = false 
}) => {
  return (
    <div className="relative mt-2">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
      <Input
        placeholder="Search items..."
        className="pl-9 bg-white border-kitchen-border"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default SearchBar;
