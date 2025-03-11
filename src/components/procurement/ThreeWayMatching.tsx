
import React, { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, XCircle, AlertCircle, HelpCircle, CreditCard, 
  FileText, Package, Receipt, ChevronDown, ChevronUp
} from 'lucide-react';
import { matchingData } from '@/data/procurementData';

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
        </Card>

        {selectedMatch && (
          <Card className="shadow-apple-sm md:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Match Details: {selectedMatch.id}</CardTitle>
                <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium gap-1"
                  style={{ backgroundColor: getStatusClass(selectedMatch.status).split(' ')[0], color: getStatusClass(selectedMatch.status).split(' ')[1] }}
                >
                  {getStatusIcon(selectedMatch.status)}
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

                <TabsContent value="summary" className="space-y-6">
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
                      {selectedMatch.discrepancies.map((disc, index) => {
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
                </TabsContent>

                <TabsContent value="lineItems">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Line Item Comparison</CardTitle>
                    </CardHeader>
                    <Table>
                      <TableHeader className="bg-kitchen-muted">
                        <TableRow>
                          <TableHead className="font-medium">Item</TableHead>
                          <TableHead className="font-medium">PO Qty</TableHead>
                          <TableHead className="font-medium">PO Price</TableHead>
                          <TableHead className="font-medium">RO Qty</TableHead>
                          <TableHead className="font-medium">Invoice Qty</TableHead>
                          <TableHead className="font-medium">Invoice Price</TableHead>
                          <TableHead className="font-medium">Variance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedMatch.purchaseOrder.items.map((poItem, index) => {
                          const roItem = selectedMatch.receivingOrder.items.find(
                            item => item.item.id === poItem.item.id
                          );
                          const invItem = selectedMatch.invoice.items.find(
                            item => item.item.id === poItem.item.id
                          );
                          
                          const qtyVariance = roItem && 
                            roItem.quantityReceived !== poItem.quantity;
                            
                          const priceVariance = invItem && 
                            invItem.price !== poItem.price;
                          
                          return (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{poItem.item.name}</TableCell>
                              <TableCell>{poItem.quantity}{poItem.item.unit}</TableCell>
                              <TableCell>${poItem.price.toFixed(2)}/{poItem.item.unit}</TableCell>
                              <TableCell className={qtyVariance ? 'text-kitchen-danger font-medium' : ''}>
                                {roItem ? `${roItem.quantityReceived}${poItem.item.unit}` : 'N/A'}
                              </TableCell>
                              <TableCell>
                                {invItem ? `${invItem.quantity}${poItem.item.unit}` : 'N/A'}
                              </TableCell>
                              <TableCell className={priceVariance ? 'text-kitchen-warning font-medium' : ''}>
                                {invItem ? `$${invItem.price.toFixed(2)}/${poItem.item.unit}` : 'N/A'}
                              </TableCell>
                              <TableCell>
                                {qtyVariance && (
                                  <div className="text-kitchen-danger whitespace-nowrap">
                                    <AlertCircle className="h-3 w-3 inline-block mr-1" />
                                    {roItem && (roItem.quantityReceived - poItem.quantity)}{poItem.item.unit}
                                  </div>
                                )}
                                {priceVariance && (
                                  <div className="text-kitchen-warning whitespace-nowrap mt-1">
                                    <AlertCircle className="h-3 w-3 inline-block mr-1" />
                                    {invItem && (invItem.price - poItem.price > 0 ? '+' : '')}{invItem && (invItem.price - poItem.price).toFixed(2)}/{poItem.item.unit}
                                  </div>
                                )}
                                {!qtyVariance && !priceVariance && (
                                  <CheckCircle className="h-4 w-4 text-kitchen-success" />
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>

                <TabsContent value="documents">
                  <div className="space-y-4">
                    <p className="text-kitchen-muted-foreground">View and download the original documents for this match.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                        <Package className="h-8 w-8 mb-2 text-kitchen-primary" />
                        <span className="font-medium">Purchase Order</span>
                        <span className="text-sm text-kitchen-muted-foreground mt-1">
                          {selectedMatch.purchaseOrder.id}.pdf
                        </span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                        <FileText className="h-8 w-8 mb-2 text-kitchen-primary" />
                        <span className="font-medium">Receiving Order</span>
                        <span className="text-sm text-kitchen-muted-foreground mt-1">
                          {selectedMatch.receivingOrder.id}.pdf
                        </span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                        <Receipt className="h-8 w-8 mb-2 text-kitchen-primary" />
                        <span className="font-medium">Invoice</span>
                        <span className="text-sm text-kitchen-muted-foreground mt-1">
                          {selectedMatch.invoice.id}.pdf
                        </span>
                      </Button>
                    </div>
                  </div>
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
        )}
      </div>
    </div>
  );
};

export default ThreeWayMatching;
