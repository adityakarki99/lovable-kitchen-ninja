
import React from 'react';
import { FileSearch } from 'lucide-react';

type ScanProgressProps = {
  progress: number;
};

const ScanProgress: React.FC<ScanProgressProps> = ({ progress }) => {
  const getProgressMessage = (progress: number): string => {
    if (progress < 30) return 'Analyzing document...';
    if (progress < 60) return 'Extracting text...';
    if (progress < 90) return 'Processing data...';
    return 'Finalizing results...';
  };

  return (
    <div className="border rounded-lg p-8 text-center">
      <div className="animate-pulse mb-4">
        <FileSearch className="mx-auto h-12 w-12 text-kitchen-primary" />
      </div>
      <h3 className="text-lg font-medium mb-4">Scanning Invoice...</h3>
      <div className="w-full bg-kitchen-muted rounded-full h-2.5 mb-2">
        <div 
          className="bg-kitchen-primary h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-kitchen-muted-foreground">
        {getProgressMessage(progress)}
      </p>
    </div>
  );
};

export default ScanProgress;
