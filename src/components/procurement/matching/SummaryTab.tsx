
import React from 'react';
import { 
  CheckCircle, AlertCircle, ChevronDown, ChevronUp, CreditCard, 
  Package, FileText, Receipt 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type SummaryTabProps = {
  selectedMatch: any;
  expandedDiscrepancies: string[];
  toggleDiscrepancy: (id: string) => void;
  handleGenerateCreditNote: (matchId: string) => void;
  handleAcceptVariance: (matchId: string) => void;
};

const SummaryTab: React.FC<SummaryTabProps> = ({
  selectedMatch,
  expandedDiscrepancies,
  toggleDiscrepancy,
  handleGenerateCreditNote,
  handleAcceptVariance,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-kitchen-primary" />
            <h3 className="font-medium">Purchase Order</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">PO Number:</span>
              <span className="font-medium">{selectedMatch.purchaseOrder.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Date Ordered:</span>
              <span>{selectedMatch.purchaseOrder.dateOrdered}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Supplier:</span>
              <span>{selectedMatch.purchaseOrder.supplier.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Payment Terms:</span>
              <span>{selectedMatch.purchaseOrder.paymentTerms}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Expected Total:</span>
              <span className="font-medium">${selectedMatch.purchaseOrder.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-kitchen-primary" />
            <h3 className="font-medium">Receiving Order</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">RO Number:</span>
              <span className="font-medium">{selectedMatch.receivingOrder.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Date Received:</span>
              <span>{selectedMatch.receivingOrder.dateReceived}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Received By:</span>
              <span>{selectedMatch.receivingOrder.receivedBy}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Condition:</span>
              <span>{selectedMatch.receivingOrder.condition}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Notes:</span>
              <span className="text-right">{selectedMatch.receivingOrder.notes || 'None'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Receipt className="h-5 w-5 text-kitchen-primary" />
            <h3 className="font-medium">Invoice</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Invoice Number:</span>
              <span className="font-medium">{selectedMatch.invoice.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Date Issued:</span>
              <span>{selectedMatch.invoice.dateIssued}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Due Date:</span>
              <span>{selectedMatch.invoice.dateDue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Supplier Ref:</span>
              <span>{selectedMatch.invoice.supplierRef}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-kitchen-muted-foreground">Total Amount:</span>
              <span className="font-medium">${selectedMatch.invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {selectedMatch.discrepancies.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-medium">Discrepancies</h3>
          {selectedMatch.discrepancies.map((disc: any, index: number) => {
            const isExpanded = expandedDiscrepancies.includes(disc.item.id);
            return (
              <Card key={index} className="bg-kitchen-warning/5 border-kitchen-warning/20">
                <CardHeader className="p-3">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleDiscrepancy(disc.item.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-kitchen-warning" />
                      <span className="font-medium">{disc.type} Discrepancy: {disc.item.name}</span>
                    </div>
                    {isExpanded ? 
                      <ChevronUp className="h-4 w-4 text-kitchen-muted-foreground" /> : 
                      <ChevronDown className="h-4 w-4 text-kitchen-muted-foreground" />
                    }
                  </div>
                </CardHeader>
                {isExpanded && (
                  <CardContent className="pt-0 px-3 pb-3">
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-kitchen-muted-foreground">Expected</p>
                          <p className="font-medium">{disc.expected}</p>
                        </div>
                        <div>
                          <p className="text-kitchen-muted-foreground">Received</p>
                          <p className="font-medium">{disc.received}</p>
                        </div>
                        <div>
                          <p className="text-kitchen-muted-foreground">Difference</p>
                          <p className={`font-medium ${disc.difference < 0 ? 'text-kitchen-danger' : 'text-kitchen-success'}`}>
                            ${disc.difference.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          className="bg-kitchen-primary hover:bg-kitchen-primary/90"
                          onClick={() => handleGenerateCreditNote(selectedMatch.id)}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Generate Credit Note
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleAcceptVariance(selectedMatch.id)}
                        >
                          Accept Variance
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="bg-kitchen-success/5 border border-kitchen-success/20 rounded-md p-4 flex items-center">
          <CheckCircle className="h-5 w-5 text-kitchen-success mr-2" />
          <p>No discrepancies found. All documents match perfectly.</p>
        </div>
      )}
    </div>
  );
};

export default SummaryTab;
