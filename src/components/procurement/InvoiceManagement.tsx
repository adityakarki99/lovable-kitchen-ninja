
import React, { useState } from 'react';
import { Plus, FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InvoiceList from './InvoiceList';
import InvoiceDetails from './InvoiceDetails';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import InvoiceScanner from './InvoiceScanner';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '../shared/DashboardLayout';

const InvoiceManagement: React.FC = () => {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSelectInvoice = (id: string) => {
    setSelectedInvoiceId(id);
  };
  
  const handleBack = () => {
    setSelectedInvoiceId(null);
  };
  
  const handleUploadInvoice = () => {
    setIsUploadDialogOpen(true);
  };
  
  const handleScanComplete = (result: any) => {
    console.log('Scan result:', result);
    setIsUploadDialogOpen(false);
    
    toast({
      title: 'Invoice scanned successfully',
      description: 'The invoice has been processed',
    });
    
    // In a real application, you would save the invoice data to the database
    // and then redirect to the invoice details page
  };
  
  return (
    <DashboardLayout
      title="Invoice Management"
      description="View, upload, and manage invoices with OCR scanning capabilities"
    >
      {selectedInvoiceId ? (
        <InvoiceDetails 
          invoiceId={selectedInvoiceId} 
          onBack={handleBack} 
        />
      ) : (
        <InvoiceList 
          onSelectInvoice={handleSelectInvoice} 
          onUploadInvoice={handleUploadInvoice} 
        />
      )}
      
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Scan and Upload Invoice</DialogTitle>
          </DialogHeader>
          <InvoiceScanner onScanComplete={handleScanComplete} />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default InvoiceManagement;
