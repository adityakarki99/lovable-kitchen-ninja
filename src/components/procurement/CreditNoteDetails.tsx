
import React from 'react';
import { BarChart, User, FileText, CalendarDays, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { creditNotes, CreditNote, CreditNoteStatus } from '@/data/procurement/creditNotes';
import { purchaseOrders } from '@/data/procurement/purchaseOrders';

interface CreditNoteDetailsProps {
  creditNoteId: string | null;
  onBack: () => void;
}

const CreditNoteDetails: React.FC<CreditNoteDetailsProps> = ({ creditNoteId, onBack }) => {
  const { toast } = useToast();
  
  // Find the credit note
  const creditNote = creditNoteId ? creditNotes.find(note => note.id === creditNoteId) : null;
  
  // Find the related purchase order
  const purchaseOrder = creditNote 
    ? purchaseOrders.find(po => po.id === creditNote.purchaseOrderId) 
    : null;

  const handleApprove = () => {
    toast({
      title: "Credit note approved",
      description: `Credit note ${creditNoteId} has been approved`,
    });
  };

  const handleReject = () => {
    toast({
      title: "Credit note rejected",
      description: `Credit note ${creditNoteId} has been rejected`,
    });
  };

  const getStatusBadge = (status: CreditNoteStatus) => {
    const statusConfig = {
      'Approved': {
        icon: <CheckCircle className="h-4 w-4" />,
        class: "bg-kitchen-success/10 text-kitchen-success"
      },
      'Rejected': {
        icon: <XCircle className="h-4 w-4" />,
        class: "bg-kitchen-danger/10 text-kitchen-danger"
      },
      'Pending': {
        icon: <CalendarDays className="h-4 w-4" />,
        class: "bg-kitchen-warning/10 text-kitchen-warning"
      }
    };
    
    const config = statusConfig[status];
    
    return (
      <Badge className={`flex items-center gap-1 ${config.class}`}>
        {config.icon}
        {status}
      </Badge>
    );
  };

  if (!creditNote) {
    return (
      <Card className="shadow-apple-sm flex items-center justify-center p-6 h-full">
        <div className="text-center text-kitchen-muted-foreground">
          <BarChart className="h-12 w-12 mx-auto mb-3 text-kitchen-muted" />
          <h3 className="font-medium text-lg text-kitchen-foreground">Select a Credit Note</h3>
          <p className="mt-1">
            Choose a credit note from the list to view details and take action.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-apple-sm">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" className="mb-2" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <CardTitle className="text-lg">{creditNote.id} Details</CardTitle>
        </div>
        {getStatusBadge(creditNote.status)}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-kitchen-muted-foreground">Credit Note Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-kitchen-muted-foreground">Purchase Order:</span>
                <span className="font-medium">{creditNote.purchaseOrderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-kitchen-muted-foreground">Date Issued:</span>
                <span>{creditNote.dateIssued}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-kitchen-muted-foreground">Supplier Reference:</span>
                <span>{creditNote.supplierRef}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-kitchen-muted-foreground">Total Amount:</span>
                <span className="font-medium">${creditNote.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-kitchen-muted-foreground">Approval Information</h3>
            <div className="space-y-2">
              {creditNote.status !== 'Pending' ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-kitchen-muted-foreground">Approver:</span>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-kitchen-muted-foreground" />
                      <span>{creditNote.approver}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-kitchen-muted-foreground">Approval Date:</span>
                    <span>{creditNote.approvalDate}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center h-16 text-kitchen-muted-foreground text-sm">
                  Awaiting approval
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">Credit Note Items</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {creditNote.items.map((item, index) => (
              <div key={index} className="border rounded-md p-3">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{item.item.name}</span>
                  <span className="font-medium">${item.total.toFixed(2)}</span>
                </div>
                <div className="text-sm text-kitchen-muted-foreground mb-1">
                  {item.quantity} {item.item.unit} × ${item.price.toFixed(2)} = ${item.total.toFixed(2)}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-kitchen-muted-foreground">Reason:</span>
                  <span className="font-medium">{item.reason}</span>
                </div>
                {item.notes && (
                  <div className="mt-2 text-sm bg-kitchen-muted/10 p-2 rounded">
                    <span className="text-kitchen-muted-foreground">Notes: </span>
                    {item.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {creditNote.notes && (
          <div className="bg-kitchen-muted/10 p-3 rounded">
            <h3 className="font-medium mb-1 text-sm">Notes</h3>
            <p className="text-sm">{creditNote.notes}</p>
          </div>
        )}
        
        {creditNote.status === 'Pending' && (
          <div className="flex gap-3 pt-2">
            <Button 
              className="flex-1 bg-kitchen-success hover:bg-kitchen-success/90"
              onClick={handleApprove}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve Credit Note
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-kitchen-danger text-kitchen-danger hover:bg-kitchen-danger/10"
              onClick={handleReject}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject Credit Note
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditNoteDetails;
