
import React, { useState, useEffect } from 'react';
import { InvoiceScanner } from './invoice';
import InvoiceList from './InvoiceList';
import InvoiceDetails from './InvoiceDetails';
import { toast } from '@/hooks/use-toast';
import { invoices } from '@/data/procurement';
import { autoMatchInvoiceItems } from '@/utils/invoiceStockMatcher';

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
      // Parse invoice items from the scan result
      const invoiceItems = result.items || [];
      
      // Auto match items with stock items
      const matchedItems = autoMatchInvoiceItems(invoiceItems);
      const matchPercentage = (matchedItems.filter(item => item.matchedStockItem).length / matchedItems.length) * 100;
      
      toast({
        title: "Saving invoice data",
        description: "Processing invoice information...",
      });
      
      // Simulate API call to save invoice
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, we would save to Supabase here
      // including the stock_item_id matches for each line item
      
      toast({
        title: "Invoice saved",
        description: `Invoice ${result.invoiceNumber} saved with ${matchPercentage.toFixed(0)}% items auto-matched.`,
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
