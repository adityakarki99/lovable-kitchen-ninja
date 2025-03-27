
import React, { useState } from 'react';
import { matchingData } from '@/data/procurementData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MatchCard from './lineitem/MatchCard';
import DetailCard from './lineitem/DetailCard';
import LineItemComparisonTable from './lineitem/LineItemComparisonTable';
import DiscrepanciesTable from './lineitem/DiscrepanciesTable';
import ApprovalFooter from './lineitem/ApprovalFooter';

const LineItemMatching: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState(matchingData.length > 0 ? matchingData[0] : null);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Matched':
        return 'bg-kitchen-success text-kitchen-success-foreground';
      case 'Partial Match':
        return 'bg-kitchen-warning text-kitchen-warning-foreground';
      case 'Mismatch':
        return 'bg-kitchen-danger text-kitchen-danger-foreground';
      default:
        return 'bg-kitchen-muted text-kitchen-muted-foreground';
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  if (!selectedMatch) {
    return <div>No matching data available</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {matchingData.map((match) => (
          <MatchCard 
            key={match.id}
            match={match}
            selectedMatch={selectedMatch}
            setSelectedMatch={setSelectedMatch}
          />
        ))}
      </div>

      {selectedMatch && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Three-Way Match Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <DetailCard selectedMatch={selectedMatch} />

            <Separator />

            <LineItemComparisonTable 
              selectedMatch={selectedMatch} 
              getStatusBadgeClass={getStatusBadgeClass} 
            />

            {selectedMatch.discrepancies.length > 0 && (
              <>
                <Separator />
                <DiscrepanciesTable 
                  discrepancies={selectedMatch.discrepancies} 
                  formatCurrency={formatCurrency}
                />
              </>
            )}

            <ApprovalFooter selectedMatch={selectedMatch} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LineItemMatching;
