
import React, { useState } from 'react';
import { InvoiceScanner } from './invoice';
import InvoiceList from './InvoiceList';
import InvoiceDetails from './InvoiceDetails';
import { toast } from '@/hooks/use-toast';
import { invoices } from '@/data/procurement';

const InvoiceManagement = () => {
  const [view, setView] = useState<'list' | 'details' | 'upload'>('list');
  const [selectedInvoice, setSelectedInvoice] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);
  
  const handleInvoiceSelect = (id: string) => {
    setSelectedInvoice(id);
    setView('details');
  };
  
  const handleUploadInvoice = () => {
    setView('upload');
    setScanning(true);
  };
  
  const handleScanComplete = async (result: any) => {
    console.log('Scan completed:', result);
    
    try {
      // Here we would typically save the invoice to the database
      // For now, we'll just simulate this with a timeout
      toast({
        title: "Saving invoice data",
        description: "Processing invoice information...",
      });
      
      // Simulate API call to save invoice
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, we would save to Supabase here
      // const { data, error } = await supabase
      //   .from('invoices')
      //   .insert({
      //     invoice_number: result.invoiceNumber,
      //     date_issued: result.date,
      //     date_due: result.dueDate,
      //     supplier: result.supplier,
      //     total_amount: result.amount,
      //     raw_text: result.rawText,
      //     status: 'Pending'
      //   })
      //   .select()
      
      toast({
        title: "Invoice saved",
        description: `Invoice ${result.invoiceNumber} has been saved.`,
      });
      
      setScanning(false);
      setView('list');
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast({
        variant: "destructive",
        title: "Error saving invoice",
        description: "There was an error saving the invoice data.",
      });
      setScanning(false);
    }
  };
  
  const handleBack = () => {
    setView('list');
  };
  
  return (
    <div className="space-y-6">
      {view === 'list' && (
        <InvoiceList 
          onSelectInvoice={handleInvoiceSelect} 
          onUploadInvoice={handleUploadInvoice}
        />
      )}
      
      {view === 'details' && (
        <InvoiceDetails 
          invoiceId={selectedInvoice} 
          onBack={handleBack}
        />
      )}
      
      {view === 'upload' && (
        <>
          <div className="flex items-center mb-4">
            <button 
              onClick={handleBack}
              className="text-sm mr-4 hover:underline flex items-center"
            >
              ← Back to invoices
            </button>
            <h2 className="text-xl font-semibold">Scan Invoice</h2>
          </div>
          <InvoiceScanner onScanComplete={handleScanComplete} />
        </>
      )}
    </div>
  );
};

export default InvoiceManagement;
