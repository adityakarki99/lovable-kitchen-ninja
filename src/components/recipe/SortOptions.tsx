
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export type SortOption = 'name-asc' | 'name-desc' | 'cost-asc' | 'cost-desc' | 'popularity-desc' | 'prep-asc';

interface SortOptionsProps {
  currentSort: SortOption;
  onChange: (value: SortOption) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ currentSort, onChange }) => {
  return (
    <Select value={currentSort} onValueChange={(value) => onChange(value as SortOption)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="name-asc">Name (A to Z)</SelectItem>
          <SelectItem value="name-desc">Name (Z to A)</SelectItem>
          <SelectItem value="cost-asc">Cost (low to high)</SelectItem>
          <SelectItem value="cost-desc">Cost (high to low)</SelectItem>
          <SelectItem value="popularity-desc">Most Popular</SelectItem>
          <SelectItem value="prep-asc">Quickest Prep</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortOptions;
