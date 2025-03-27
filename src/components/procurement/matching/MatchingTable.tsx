
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, HelpCircle } from 'lucide-react';

type MatchingTableProps = {
  matchingData: any[];
  selectedMatchId: string | null;
  setSelectedMatchId: (id: string) => void;
};

const MatchingTable: React.FC<MatchingTableProps> = ({
  matchingData,
  selectedMatchId,
  setSelectedMatchId
}) => {
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Matched':
        return <CheckCircle className="h-4 w-4 text-kitchen-success" />;
      case 'Partial Match':
        return <AlertCircle className="h-4 w-4 text-kitchen-warning" />;
      case 'No Match':
        return <XCircle className="h-4 w-4 text-kitchen-danger" />;
      default:
        return <HelpCircle className="h-4 w-4 text-kitchen-muted-foreground" />;
    }
  };

  // Get status class
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
    <Table>
      <TableHeader className="bg-kitchen-muted">
        <TableRow>
          <TableHead className="font-medium">Match ID</TableHead>
          <TableHead className="font-medium">Purchase Order</TableHead>
          <TableHead className="font-medium">Supplier</TableHead>
          <TableHead className="font-medium">Receiving Date</TableHead>
          <TableHead className="font-medium">Invoice No.</TableHead>
          <TableHead className="font-medium">Status</TableHead>
          <TableHead className="font-medium">Match %</TableHead>
          <TableHead className="font-medium">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matchingData.map((match) => (
          <TableRow 
            key={match.id} 
            className={`hover:bg-kitchen-muted/30 cursor-pointer ${selectedMatchId === match.id ? 'bg-kitchen-muted/20' : ''}`}
            onClick={() => setSelectedMatchId(match.id)}
          >
            <TableCell className="font-medium">{match.id}</TableCell>
            <TableCell>{match.purchaseOrder.id}</TableCell>
            <TableCell>{match.purchaseOrder.supplier.name}</TableCell>
            <TableCell>{match.receivingOrder.dateReceived}</TableCell>
            <TableCell>{match.invoice.id}</TableCell>
            <TableCell>
              <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium gap-1"
                style={{ backgroundColor: getStatusClass(match.status).split(' ')[0], color: getStatusClass(match.status).split(' ')[1] }}
              >
                {getStatusIcon(match.status)}
                {match.status}
              </div>
            </TableCell>
            <TableCell>
              <div className="w-full bg-kitchen-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    match.matchPercentage === 100 ? 'bg-kitchen-success' : 
                    match.matchPercentage >= 80 ? 'bg-kitchen-warning' : 'bg-kitchen-danger'
                  }`}
                  style={{ width: `${match.matchPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium">{match.matchPercentage}%</span>
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
              >
                Review
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MatchingTable;
