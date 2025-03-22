
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type PeriodValue = '3months' | '6months' | '12months' | 'ytd' | 'custom';

interface PeriodSelectorProps {
  selectedPeriod: PeriodValue;
  onPeriodChange: (value: PeriodValue) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selectedPeriod, onPeriodChange }) => {
  return (
    <div className="flex justify-end">
      <Select 
        defaultValue={selectedPeriod} 
        onValueChange={(value) => onPeriodChange(value as PeriodValue)}
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
