import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileSearch, Upload } from 'lucide-react';

type InvoiceScannerProps = {
  onScanComplete: (result: any) => void;
};

const InvoiceScanner: React.FC<InvoiceScannerProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
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
  
  return (
    <div className="space-y-4">
      {!isScanning ? (
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
            <label htmlFor="invoice-upload">
              <Button as="span" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Select Invoice
              </Button>
            </label>
            {file && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium">{file.name}</p>
                <Button onClick={handleUpload}>
                  Start Scanning
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
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
            {progress < 30 ? 'Analyzing document...' : 
             progress < 60 ? 'Extracting text...' : 
             progress < 90 ? 'Processing data...' : 
             'Finalizing results...'}
          </p>
        </div>
      )}
    </div>
  );
};

export default InvoiceScanner;
