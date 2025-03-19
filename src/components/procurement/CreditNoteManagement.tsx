
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreditNotesList from './CreditNotesList';
import CreditNoteDetails from './CreditNoteDetails';
import CreateCreditNote from './CreateCreditNote';

const CreditNoteManagement: React.FC = () => {
  const [selectedCreditNoteId, setSelectedCreditNoteId] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const handleSelectCreditNote = (id: string) => {
    setSelectedCreditNoteId(id);
  };
  
  const handleBack = () => {
    setSelectedCreditNoteId(null);
  };
  
  const handleCreateNew = () => {
    setIsCreateDialogOpen(true);
  };
  
  const handleCreateSubmit = () => {
    setIsCreateDialogOpen(false);
    // In a real app, we would fetch the updated credit notes list
  };
  
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header with create button */}
      {!selectedCreditNoteId && (
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Credit Notes</h2>
          <Button 
            onClick={handleCreateNew}
            className="bg-kitchen-primary hover:bg-kitchen-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Credit Note
          </Button>
        </div>
      )}
      
      {/* List or detail view */}
      <div>
        {selectedCreditNoteId ? (
          <CreditNoteDetails 
            creditNoteId={selectedCreditNoteId} 
            onBack={handleBack} 
          />
        ) : (
          <CreditNotesList onSelectCreditNote={handleSelectCreditNote} />
        )}
      </div>
      
      {/* Create credit note dialog */}
      <CreateCreditNote 
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateSubmit}
      />
    </div>
  );
};

export default CreditNoteManagement;
