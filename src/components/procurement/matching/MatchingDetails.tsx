
import React from 'react';
import { 
  Card, CardContent, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import SummaryTab from './SummaryTab';
import LineItemsTab from './LineItemsTab';
import DocumentsTab from './DocumentsTab';

type MatchingDetailsProps = {
  selectedMatch: any;
  expandedDiscrepancies: string[];
  toggleDiscrepancy: (id: string) => void;
  handleGenerateCreditNote: (matchId: string) => void;
  handleAcceptVariance: (matchId: string) => void;
  handleDisputeInvoice: (matchId: string) => void;
};

const MatchingDetails: React.FC<MatchingDetailsProps> = ({
  selectedMatch,
  expandedDiscrepancies,
  toggleDiscrepancy,
  handleGenerateCreditNote,
  handleAcceptVariance,
  handleDisputeInvoice,
}) => {
  // Get status icon and class
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Matched':
        return "bg-kitchen-success/10 text-kitchen-success";
      case 'Partial Match':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      case 'No Match':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      default:
        return "bg-kitchen-muted text-kitchen-muted-foreground";
    }
  };

  return (
    <Card className="shadow-apple-sm md:col-span-3">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Match Details: {selectedMatch.id}</CardTitle>
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium gap-1"
            style={{ backgroundColor: getStatusClass(selectedMatch.status).split(' ')[0], color: getStatusClass(selectedMatch.status).split(' ')[1] }}
          >
            {selectedMatch.status}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="bg-kitchen-muted mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="lineItems">Line Items</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <SummaryTab 
              selectedMatch={selectedMatch}
              expandedDiscrepancies={expandedDiscrepancies}
              toggleDiscrepancy={toggleDiscrepancy}
              handleGenerateCreditNote={handleGenerateCreditNote}
              handleAcceptVariance={handleAcceptVariance}
            />
          </TabsContent>

          <TabsContent value="lineItems">
            <LineItemsTab selectedMatch={selectedMatch} />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab selectedMatch={selectedMatch} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t bg-kitchen-muted/10 flex justify-between">
        <div className="text-sm text-kitchen-muted-foreground">
          Approval Status: 
          <span className={
            selectedMatch.approvalStatus === 'Approved' ? 'text-kitchen-success ml-1' : 
            selectedMatch.approvalStatus === 'Rejected' ? 'text-kitchen-danger ml-1' : 
            'text-kitchen-warning ml-1'
          }>
            {selectedMatch.approvalStatus}
          </span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-kitchen-danger text-kitchen-danger hover:bg-kitchen-danger/10"
            onClick={() => handleDisputeInvoice(selectedMatch.id)}
          >
            Dispute
          </Button>
          <Button 
            className="bg-kitchen-primary hover:bg-kitchen-primary/90"
            onClick={() => handleAcceptVariance(selectedMatch.id)}
          >
            Approve for Payment
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MatchingDetails;
