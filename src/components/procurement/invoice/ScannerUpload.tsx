
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileSearch, Upload } from 'lucide-react';

type ScannerUploadProps = {
  onUpload: (file: File) => void;
  file: File | null;
};

const ScannerUpload: React.FC<ScannerUploadProps> = ({ onUpload, file }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };
  
  return (
    <div className="border-2 border-dashed border-kitchen-border rounded-lg p-8 text-center">
      <FileSearch className="mx-auto h-12 w-12 text-kitchen-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Upload Invoice for Scanning</h3>
      <p className="text-kitchen-muted-foreground mb-4">
        Upload your invoice document (PDF, JPEG, PNG) to automatically extract information
      </p>
      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          id="invoice-upload"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        <label htmlFor="invoice-upload" className="cursor-pointer">
          <Button className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Select Invoice
          </Button>
        </label>
        {file && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium">{file.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScannerUpload;
