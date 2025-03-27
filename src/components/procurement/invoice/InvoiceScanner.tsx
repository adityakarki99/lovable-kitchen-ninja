
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ScannerUpload from './ScannerUpload';
import ScanProgress from './ScanProgress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type InvoiceScannerProps = {
  onScanComplete: (result: any) => void;
};

const InvoiceScanner: React.FC<InvoiceScannerProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const handleUpload = async () => {
    if (!file) return;
    
    setIsScanning(true);
    setError(null);
    
    // Start progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90; // Hold at 90% until we get actual response
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      // Convert file to base64
      const fileReader = new FileReader();
      
      const fileLoaded = new Promise<string>((resolve, reject) => {
        fileReader.onload = () => {
          const base64String = fileReader.result as string;
          // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64Data = base64String.split(',')[1];
          resolve(base64Data);
        };
        fileReader.onerror = reject;
      });
      
      fileReader.readAsDataURL(file);
      const base64Data = await fileLoaded;
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('deepseek-ocr', {
        body: { image: base64Data }
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to scan invoice');
      }
      
      // Process completed
      clearInterval(interval);
      setProgress(100);
      
      setTimeout(() => {
        setIsScanning(false);
        if (data?.success && data?.data?.structured_data) {
          // Process successful OCR result
          const invoiceData = data.data.structured_data;
          
          // Format the data to match our application's structure
          const result = {
            invoiceNumber: invoiceData.invoice_number || `INV-${Math.floor(Math.random() * 10000)}`,
            date: invoiceData.date || new Date().toISOString().split('T')[0],
            dueDate: invoiceData.due_date,
            supplier: invoiceData.supplier || 'Unknown Supplier',
            amount: invoiceData.total_amount || '0.00',
            rawText: data.data.text || '',
            items: invoiceData.items?.map(item => ({
              name: item.description || 'Unnamed Item',
              quantity: item.quantity || 0,
              price: item.unit_price || 0,
              total: item.total_price || 0
            })) || []
          };
          
          toast({
            title: "Invoice Scanned Successfully",
            description: `Invoice ${result.invoiceNumber} has been processed.`,
          });
          
          onScanComplete(result);
        } else {
          throw new Error('Invoice data not found in scan results');
        }
      }, 500);
      
    } catch (err) {
      clearInterval(interval);
      setProgress(0);
      setIsScanning(false);
      setError(err.message || 'Failed to scan invoice');
      toast({
        variant: "destructive",
        title: "Scan Failed",
        description: err.message || 'Failed to scan invoice'
      });
    }
  };
  
  const handleFileUpload = (selectedFile: File) => {
    setError(null);
    setFile(selectedFile);
  };
  
  return (
    <div className="space-y-4">
      {!isScanning ? (
        <>
          <ScannerUpload onUpload={handleFileUpload} file={file} />
          {error && (
            <div className="text-kitchen-primary p-2 border border-kitchen-primary bg-kitchen-primary/10 rounded-md">
              {error}
            </div>
          )}
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
