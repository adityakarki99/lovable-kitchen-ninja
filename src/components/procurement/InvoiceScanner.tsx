
import React, { useState } from 'react';
import { Upload, File, Scanner, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ScanResult {
  invoice_number?: string;
  date?: string;
  due_date?: string;
  supplier?: string;
  total_amount?: string;
  items?: Array<{
    description?: string;
    quantity?: number;
    unit_price?: number;
    total_price?: number;
  }>;
}

interface InvoiceScannerProps {
  onScanComplete: (result: ScanResult) => void;
}

const InvoiceScanner: React.FC<InvoiceScannerProps> = ({ onScanComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setScanError(null);
    
    if (selectedFile) {
      // Create a preview URL for the selected image
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleScan = async () => {
    if (!file) {
      setScanError('Please select a file first');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setScanError('File size must be less than 5MB');
      return;
    }

    try {
      setIsScanning(true);
      setScanError(null);

      // Convert file to base64
      const base64Image = await convertFileToBase64(file);

      // Call the DeepSeek OCR Edge Function
      const { data, error } = await supabase.functions.invoke('deepseek-ocr', {
        body: { image: base64Image }
      });

      if (error) {
        throw new Error(error.message || 'Failed to scan invoice');
      }

      if (!data.success) {
        throw new Error(data.error || 'OCR processing failed');
      }

      // Pass the structured data to the parent component
      if (data.data?.structured_data) {
        onScanComplete(data.data.structured_data);
        
        toast({
          title: 'Invoice scanned successfully',
          description: 'The invoice data has been extracted',
        });
      } else {
        throw new Error('No structured data was returned from OCR');
      }
    } catch (error) {
      console.error('Error scanning invoice:', error);
      setScanError(error.message || 'Failed to scan invoice');
      
      toast({
        title: 'Error scanning invoice',
        description: error.message || 'Failed to scan the invoice',
        variant: 'destructive',
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Card className="w-full shadow-apple-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Scanner className="mr-2 h-5 w-5 text-kitchen-primary" />
          Invoice Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="invoice-file">Select Invoice Image</Label>
          <Input
            id="invoice-file"
            type="file"
            accept="image/png, image/jpeg, image/jpg, application/pdf"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <p className="text-sm text-kitchen-muted-foreground">
            Supported formats: JPG, JPEG, PNG, PDF (max 5MB)
          </p>
        </div>

        {previewUrl && (
          <div className="flex justify-center border border-dashed border-kitchen-border p-2 rounded-md">
            <img 
              src={previewUrl} 
              alt="Invoice preview" 
              className="max-h-[300px] object-contain" 
            />
          </div>
        )}

        {scanError && (
          <div className="flex items-center gap-2 p-2 text-kitchen-danger bg-kitchen-danger/10 rounded">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">{scanError}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => {
            setFile(null);
            setPreviewUrl(null);
            setScanError(null);
          }}
          disabled={!file || isScanning}
        >
          Clear
        </Button>
        <Button 
          onClick={handleScan} 
          disabled={!file || isScanning}
          className="bg-kitchen-primary hover:bg-kitchen-primary/90"
        >
          {isScanning ? 
            'Scanning...' : 
            <>
              <Scanner className="mr-2 h-4 w-4" />
              Scan Invoice
            </>
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InvoiceScanner;
