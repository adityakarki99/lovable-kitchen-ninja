
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

type ApprovalFooterProps = {
  selectedMatch: any;
};

const ApprovalFooter: React.FC<ApprovalFooterProps> = ({ selectedMatch }) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <div className="space-y-1">
        <p className="text-sm font-medium">Approval Status: 
          <Badge className="ml-2 bg-kitchen-muted text-kitchen-muted-foreground">
            {selectedMatch.approvalStatus}
          </Badge>
        </p>
        <p className="text-sm font-medium">Payment Status:
          <Badge className="ml-2 bg-kitchen-muted text-kitchen-muted-foreground">
            {selectedMatch.paymentStatus}
          </Badge>
        </p>
      </div>
      <div className="space-x-2">
        <Button variant="outline">Reject</Button>
        <Button>
          Approve
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ApprovalFooter;
