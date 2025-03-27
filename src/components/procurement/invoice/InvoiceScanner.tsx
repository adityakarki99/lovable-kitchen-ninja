
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ScannerUpload from './ScannerUpload';
import ScanProgress from './ScanProgress';

type InvoiceScannerProps = {
  onScanComplete: (result: any) => void;
};

const InvoiceScanner: React.FC<InvoiceScannerProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  
  const handleUpload = async () => {
    if (!file) return;
    
    setIsScanning(true);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate API call to OCR service
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Mock result
      const mockResult = {
        invoiceNumber: 'INV-' + Math.floor(Math.random() * 10000),
        date: new Date().toISOString().split('T')[0],
        supplier: 'Sample Supplier',
        amount: (Math.random() * 1000).toFixed(2),
        items: [
          { name: 'Item 1', quantity: 5, price: 10.99 },
          { name: 'Item 2', quantity: 2, price: 24.99 }
        ]
      };
      
      setTimeout(() => {
        setIsScanning(false);
        onScanComplete(mockResult);
      }, 500);
    }, 3000);
  };
  
  const handleFileUpload = (selectedFile: File) => {
    setFile(selectedFile);
  };
  
  return (
    <div className="space-y-4">
      {!isScanning ? (
        <>
          <ScannerUpload onUpload={handleFileUpload} file={file} />
          {file && (
            <div className="flex justify-center">
              <Button onClick={handleUpload}>
                Start Scanning
              </Button>
            </div>
          )}
        </>
      ) : (
        <ScanProgress progress={progress} />
      )}
    </div>
  );
};

export default InvoiceScanner;
