
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selectedPeriod, onPeriodChange }) => {
  return (
    <div className="flex justify-end">
      <Select 
        defaultValue={selectedPeriod} 
        onValueChange={onPeriodChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select time period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3months">Last 3 Months</SelectItem>
          <SelectItem value="6months">Last 6 Months</SelectItem>
          <SelectItem value="12months">Last 12 Months</SelectItem>
          <SelectItem value="ytd">Year to Date</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PeriodSelector;
