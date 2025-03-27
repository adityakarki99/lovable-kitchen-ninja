
import React, { useState, useEffect } from 'react';
import { BarChart, User, FileText, CalendarDays, ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  getCreditNoteById, 
  updateCreditNoteStatus, 
  CreditNote, 
  CreditNoteItem
} from '@/services/supabase/creditNoteService';
import { getStockItemById } from '@/services/supabase/stockItemService';

interface CreditNoteDetailsProps {
  creditNoteId: string | null;
  onBack: () => void;
}

const CreditNoteDetails: React.FC<CreditNoteDetailsProps> = ({ creditNoteId, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [creditNote, setCreditNote] = useState<(CreditNote & { items: CreditNoteItem[] }) | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCreditNote = async () => {
      if (!creditNoteId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await getCreditNoteById(creditNoteId);
        
        if (response.success && response.data) {
          setCreditNote(response.data);
        } else {
          toast({
            variant: "destructive",
            title: "Error loading credit note",
            description: response.error?.message || "An error occurred while loading the credit note",
          });
        }
      } catch (error) {
        console.error(`Error fetching credit note ${creditNoteId}:`, error);
        toast({
          variant: "destructive",
          title: "Error loading credit note",
          description: "An unexpected error occurred",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCreditNote();
  }, [creditNoteId, toast]);

  const handleApprove = async () => {
    if (!creditNoteId) return;
    
    setSubmitting(true);
    try {
      const result = await updateCreditNoteStatus(creditNoteId, 'Approved', 'Current User');
      
      if (result.success) {
        toast({
          title: "Credit note approved",
          description: `Credit note ${creditNoteId} has been approved`,
        });
        
        // Refresh the credit note data
        const response = await getCreditNoteById(creditNoteId);
        if (response.success && response.data) {
          setCreditNote(response.data);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error approving credit note",
          description: result.error?.message || "An error occurred while approving the credit note",
        });
      }
    } catch (error) {
      console.error(`Error approving credit note ${creditNoteId}:`, error);
      toast({
        variant: "destructive",
        title: "Error approving credit note",
        description: "An unexpected error occurred",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!creditNoteId) return;
    
    setSubmitting(true);
    try {
      const result = await updateCreditNoteStatus(creditNoteId, 'Rejected', 'Current User');
      
      if (result.success) {
        toast({
          title: "Credit note rejected",
          description: `Credit note ${creditNoteId} has been rejected`,
        });
        
        // Refresh the credit note data
        const response = await getCreditNoteById(creditNoteId);
        if (response.success && response.data) {
          setCreditNote(response.data);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error rejecting credit note",
          description: result.error?.message || "An error occurred while rejecting the credit note",
        });
      }
    } catch (error) {
      console.error(`Error rejecting credit note ${creditNoteId}:`, error);
      toast({
        variant: "destructive",
        title: "Error rejecting credit note",
        description: "An unexpected error occurred",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
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
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Pending'];
    
    return (
      <Badge className={`flex items-center gap-1 ${config.class}`}>
        {config.icon}
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card className="shadow-apple-sm">
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-kitchen-primary" />
          <span className="ml-2">Loading credit note details...</span>
        </div>
      </Card>
    );
  }

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
          <CardTitle className="text-lg">{creditNote.credit_note_number} Details</CardTitle>
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
                <span className="font-medium">
                  {creditNote.purchase_order?.id || creditNote.purchase_order_id}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-kitchen-muted-foreground">Date Issued:</span>
                <span>{new Date(creditNote.date_issued).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-kitchen-muted-foreground">Supplier Reference:</span>
                <span>{creditNote.supplier_ref || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-kitchen-muted-foreground">Total Amount:</span>
                <span className="font-medium">${creditNote.total_amount.toFixed(2)}</span>
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
                    <span>
                      {creditNote.approval_date 
                        ? new Date(creditNote.approval_date).toLocaleDateString() 
                        : '-'}
                    </span>
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
                  <span className="font-medium">{item.item?.name || `Item #${item.item_id}`}</span>
                  <span className="font-medium">${item.total.toFixed(2)}</span>
                </div>
                <div className="text-sm text-kitchen-muted-foreground mb-1">
                  {item.quantity} × ${item.price.toFixed(2)} = ${item.total.toFixed(2)}
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
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Approve Credit Note
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-kitchen-danger text-kitchen-danger hover:bg-kitchen-danger/10"
              onClick={handleReject}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="mr-2 h-4 w-4" />
              )}
              Reject Credit Note
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditNoteDetails;
