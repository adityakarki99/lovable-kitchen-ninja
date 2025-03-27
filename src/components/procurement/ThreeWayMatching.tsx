
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { matchingData } from '@/data/procurementData';
import MatchingTable from './matching/MatchingTable';
import MatchingDetails from './matching/MatchingDetails';

const ThreeWayMatching: React.FC = () => {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [expandedDiscrepancies, setExpandedDiscrepancies] = useState<string[]>([]);

  // Handler for toggling discrepancy expansion
  const toggleDiscrepancy = (id: string) => {
    setExpandedDiscrepancies(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // Handler for generating a credit note
  const handleGenerateCreditNote = (matchId: string) => {
    console.log(`Generating credit note for match: ${matchId}`);
    alert(`Credit note generated for match ${matchId}`);
  };

  // Handler for accepting variance
  const handleAcceptVariance = (matchId: string) => {
    console.log(`Accepting variance for match: ${matchId}`);
    alert(`Variance accepted for match ${matchId}`);
  };

  // Handler for disputing invoice
  const handleDisputeInvoice = (matchId: string) => {
    console.log(`Disputing invoice for match: ${matchId}`);
    alert(`Invoice disputed for match ${matchId}`);
  };

  // Get selected match
  const selectedMatch = selectedMatchId 
    ? matchingData.find(match => match.id === selectedMatchId) 
    : null;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-apple-sm md:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Three-Way Matching</CardTitle>
            <CardDescription>
              Match purchase orders, receiving orders, and invoices to identify and resolve discrepancies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MatchingTable 
              matchingData={matchingData}
              selectedMatchId={selectedMatchId}
              setSelectedMatchId={setSelectedMatchId}
            />
          </CardContent>
        </Card>

        {selectedMatch && (
          <MatchingDetails
            selectedMatch={selectedMatch}
            expandedDiscrepancies={expandedDiscrepancies}
            toggleDiscrepancy={toggleDiscrepancy}
            handleGenerateCreditNote={handleGenerateCreditNote}
            handleAcceptVariance={handleAcceptVariance}
            handleDisputeInvoice={handleDisputeInvoice}
          />
        )}
      </div>
    </div>
  );
};

export default ThreeWayMatching;
