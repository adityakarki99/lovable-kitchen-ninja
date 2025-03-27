
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

type MatchCardProps = {
  match: any;
  selectedMatch: any;
  setSelectedMatch: (match: any) => void;
};

const MatchCard: React.FC<MatchCardProps> = ({ match, selectedMatch, setSelectedMatch }) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Matched':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'Partial Match':
        return <AlertTriangle className="h-4 w-4 mr-1" />;
      case 'Mismatch':
        return <Info className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  // Calculate total expected from the purchase order
  const getTotalExpected = (match: any) => {
    return match.purchaseOrder.items.reduce((total: number, item: any) => total + item.total, 0);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <Card 
      key={match.id} 
      className={`cursor-pointer hover:border-kitchen-primary transition-colors ${
        selectedMatch?.id === match.id ? 'border-kitchen-primary' : ''
      }`}
      onClick={() => setSelectedMatch(match)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-kitchen-muted-foreground">Match ID</p>
            <CardTitle className="text-lg">{match.id}</CardTitle>
          </div>
          <Badge className={getStatusBadgeClass(match.status)}>
            {getStatusIcon(match.status)}
            {match.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-1">Match Accuracy</p>
            <div className="flex items-center gap-2">
              <Progress value={match.matchPercentage} className="h-2" />
              <span className="text-sm font-medium">{match.matchPercentage}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-kitchen-muted-foreground">PO</p>
              <p className="font-medium">{match.purchaseOrder.id}</p>
            </div>
            <div>
              <p className="text-kitchen-muted-foreground">Items</p>
              <p className="font-medium">{match.purchaseOrder.items.length}</p>
            </div>
            <div>
              <p className="text-kitchen-muted-foreground">Amount</p>
              <p className="font-medium">{formatCurrency(getTotalExpected(match))}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
