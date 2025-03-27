
import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertCircle, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { getCreditNotes, CreditNote } from '@/services/supabase/creditNoteService';

interface CreditNotesListProps {
  onSelectCreditNote: (creditNoteId: string) => void;
}

const CreditNotesList: React.FC<CreditNotesListProps> = ({ onSelectCreditNote }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [creditNotes, setCreditNotes] = useState<CreditNote[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCreditNotes = async () => {
      setLoading(true);
      try {
        const response = await getCreditNotes();
        
        if (response.success && response.data) {
          setCreditNotes(response.data);
        } else {
          toast({
            variant: "destructive",
            title: "Error loading credit notes",
            description: response.error?.message || "An error occurred while loading the credit notes",
          });
        }
      } catch (error) {
        console.error('Error fetching credit notes:', error);
        toast({
          variant: "destructive",
          title: "Error loading credit notes",
          description: "An unexpected error occurred",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCreditNotes();
  }, [toast]);

  const filteredCreditNotes = creditNotes.filter(note => 
    note.credit_note_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.purchase_order?.id?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-4 w-4 text-kitchen-success" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-kitchen-danger" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-kitchen-warning" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return "bg-kitchen-success/10 text-kitchen-success";
      case 'Rejected':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      case 'Pending':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search credit notes..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-kitchen-foreground">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <Card className="shadow-apple-sm overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Credit Notes</CardTitle>
        </CardHeader>
        
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-kitchen-primary" />
            <span className="ml-2">Loading credit notes...</span>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-kitchen-muted">
              <TableRow>
                <TableHead className="font-medium">Credit Note No.</TableHead>
                <TableHead className="font-medium">PO Reference</TableHead>
                <TableHead className="font-medium">Date Issued</TableHead>
                <TableHead className="font-medium">Supplier Ref</TableHead>
                <TableHead className="font-medium text-right">Amount</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Approver</TableHead>
                <TableHead className="font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCreditNotes.length > 0 ? (
                filteredCreditNotes.map((note) => (
                  <TableRow 
                    key={note.id} 
                    className="hover:bg-kitchen-muted/30 cursor-pointer" 
                    onClick={() => onSelectCreditNote(note.id?.toString() || '')}
                  >
                    <TableCell className="font-medium">{note.credit_note_number}</TableCell>
                    <TableCell>{note.purchase_order?.id || note.purchase_order_id}</TableCell>
                    <TableCell>{new Date(note.date_issued).toLocaleDateString()}</TableCell>
                    <TableCell>{note.supplier_ref || '-'}</TableCell>
                    <TableCell className="text-right">${note.total_amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "flex items-center gap-1 w-fit",
                        getStatusClass(note.status)
                      )}>
                        {getStatusIcon(note.status)}
                        {note.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{note.approver || '-'}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCreditNote(note.id?.toString() || '');
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-kitchen-muted-foreground">
                    {searchQuery ? 'No credit notes found matching your search' : 'No credit notes found'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Card>
    </>
  );
};

export default CreditNotesList;
