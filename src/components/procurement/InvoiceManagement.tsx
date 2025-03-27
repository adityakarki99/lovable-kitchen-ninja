
import React, { useState } from 'react';
import InvoiceScanner from './invoice/InvoiceScanner';
import InvoiceList from './InvoiceList';
import InvoiceDetails from './InvoiceDetails';

const InvoiceManagement = () => {
  const [view, setView] = useState<'list' | 'details' | 'upload'>('list');
  const [selectedInvoice, setSelectedInvoice] = useState<string>('');
  
  const handleInvoiceSelect = (id: string) => {
    setSelectedInvoice(id);
    setView('details');
  };
  
  const handleUploadInvoice = () => {
    setView('upload');
  };
  
  const handleScanComplete = (result: any) => {
    console.log('Scan completed:', result);
    setView('list');
    // Here you would typically save the invoice and update the list
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
          <h2 className="text-xl font-semibold mb-4">Scan Invoice</h2>
          <InvoiceScanner onScanComplete={handleScanComplete} />
        </>
      )}
    </div>
  );
};

export default InvoiceManagement;
