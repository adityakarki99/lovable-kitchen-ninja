
import React from 'react';
import { FileSearch } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type ScanProgressProps = {
  progress: number;
};

const ScanProgress: React.FC<ScanProgressProps> = ({ progress }) => {
  const getProgressMessage = (progress: number): string => {
    if (progress < 20) return 'Preparing document...';
    if (progress < 40) return 'Uploading to OCR service...';
    if (progress < 60) return 'Analyzing document...';
    if (progress < 80) return 'Extracting invoice data...';
    if (progress < 95) return 'Processing structured data...';
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
      <p className="text-sm text-kitchen-muted-foreground mb-4">
        {getProgressMessage(progress)}
      </p>
      
      {progress > 60 && (
        <div className="mt-4 text-left">
          <p className="text-sm font-medium mb-2">Detected Information:</p>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-xs w-24 text-kitchen-muted-foreground">Invoice #:</span>
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="flex items-center">
              <span className="text-xs w-24 text-kitchen-muted-foreground">Date:</span>
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center">
              <span className="text-xs w-24 text-kitchen-muted-foreground">Supplier:</span>
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-center">
              <span className="text-xs w-24 text-kitchen-muted-foreground">Amount:</span>
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanProgress;
