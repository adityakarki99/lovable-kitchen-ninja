
import React, { useState } from 'react';
import { matchingData } from '@/data/procurementData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertTriangle, Info, ArrowRight, DollarSign, Package, FileCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  if (!selectedMatch) {
    return <div>No matching data available</div>;
  }

  // Calculate total expected from the purchase order
  const getTotalExpected = (match: any) => {
    return match.purchaseOrder.items.reduce((total: number, item: any) => total + item.total, 0);
  };

  // Calculate total received
  const getTotalReceived = (match: any) => {
    if (!match.receivingOrder) return 0;
    
    return match.receivingOrder.items.reduce((total: number, item: any) => {
      const poItem = match.purchaseOrder.items.find((poItem: any) => 
        poItem.item.id === item.item.id
      );
      return total + (poItem ? item.quantityReceived * poItem.price : 0);
    }, 0);
  };

  // Calculate total invoiced
  const getTotalInvoiced = (match: any) => {
    return match.invoice ? match.invoice.total : 0;
  };

  const totalExpected = getTotalExpected(selectedMatch);
  const totalReceived = getTotalReceived(selectedMatch);
  const totalInvoiced = getTotalInvoiced(selectedMatch);

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {matchingData.map((match) => (
          <Card 
            key={match.id} 
            className={`cursor-pointer hover:border-kitchen-primary transition-colors ${
              selectedMatch.id === match.id ? 'border-kitchen-primary' : ''
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
        ))}
      </div>

      {selectedMatch && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Three-Way Match Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm text-kitchen-muted-foreground">Purchase Order</p>
                    <CardTitle className="text-lg">{selectedMatch.purchaseOrder.id}</CardTitle>
                  </div>
                  <FileCheck className="h-5 w-5 text-kitchen-primary" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Supplier:</span>
                      <span className="font-medium">{selectedMatch.purchaseOrder.supplier.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Date Ordered:</span>
                      <span className="font-medium">{selectedMatch.purchaseOrder.dateOrdered}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Expected Delivery:</span>
                      <span className="font-medium">{selectedMatch.purchaseOrder.dateDelivery}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total:</span>
                      <span className="font-medium">{formatCurrency(totalExpected)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm text-kitchen-muted-foreground">Receiving Order</p>
                    <CardTitle className="text-lg">{selectedMatch.receivingOrder?.id || "N/A"}</CardTitle>
                  </div>
                  <Package className="h-5 w-5 text-kitchen-primary" />
                </CardHeader>
                <CardContent>
                  {selectedMatch.receivingOrder ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Date Received:</span>
                        <span className="font-medium">{selectedMatch.receivingOrder.dateReceived}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Received By:</span>
                        <span className="font-medium">{selectedMatch.receivingOrder.receivedBy}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Condition:</span>
                        <span className="font-medium">{selectedMatch.receivingOrder.condition}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Value:</span>
                        <span className="font-medium">{formatCurrency(totalReceived)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-kitchen-muted-foreground text-sm">No receiving data available</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm text-kitchen-muted-foreground">Invoice</p>
                    <CardTitle className="text-lg">{selectedMatch.invoice?.id || "N/A"}</CardTitle>
                  </div>
                  <DollarSign className="h-5 w-5 text-kitchen-primary" />
                </CardHeader>
                <CardContent>
                  {selectedMatch.invoice ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Date Issued:</span>
                        <span className="font-medium">{selectedMatch.invoice.dateIssued}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Date Due:</span>
                        <span className="font-medium">{selectedMatch.invoice.dateDue}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Supplier Ref:</span>
                        <span className="font-medium">{selectedMatch.invoice.supplierRef}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Amount:</span>
                        <span className="font-medium">{formatCurrency(totalInvoiced)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-kitchen-muted-foreground text-sm">No invoice data available</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Line Item Comparison</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">PO Quantity</TableHead>
                    <TableHead className="text-right">Received Quantity</TableHead>
                    <TableHead className="text-right">Invoiced Quantity</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedMatch.purchaseOrder.items.map((item: any) => {
                    const receivedItem = selectedMatch.receivingOrder?.items.find(
                      (ri: any) => ri.item.id === item.item.id
                    );
                    
                    const invoicedItem = selectedMatch.invoice?.items.find(
                      (ii: any) => ii.item.id === item.item.id
                    );
                    
                    const isMatched = 
                      item.quantity === (receivedItem?.quantityReceived || 0) && 
                      item.quantity === (invoicedItem?.quantity || 0);
                    
                    const isPartialMatch = 
                      receivedItem || invoicedItem ? true : false;
                    
                    let status = 'Not Processed';
                    if (isMatched) status = 'Matched';
                    else if (isPartialMatch) status = 'Partial Match';
                    
                    return (
                      <TableRow key={item.item.id}>
                        <TableCell className="font-medium">{item.item.name}</TableCell>
                        <TableCell className="text-right">{item.quantity} {item.item.unit}</TableCell>
                        <TableCell className="text-right">
                          {receivedItem ? `${receivedItem.quantityReceived} ${item.item.unit}` : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          {invoicedItem ? `${invoicedItem.quantity} ${item.item.unit}` : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge className={getStatusBadgeClass(status)}>
                            {status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {selectedMatch.discrepancies.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-medium mb-4">Discrepancies</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Expected</TableHead>
                        <TableHead className="text-right">Received</TableHead>
                        <TableHead className="text-right">Difference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedMatch.discrepancies.map((discrepancy: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge variant="outline" className="bg-kitchen-warning/10 text-kitchen-warning border-kitchen-warning">
                              {discrepancy.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{discrepancy.item.name}</TableCell>
                          <TableCell className="text-right">{discrepancy.expected}</TableCell>
                          <TableCell className="text-right">{discrepancy.received}</TableCell>
                          <TableCell className="text-right text-kitchen-danger">{
                            discrepancy.difference > 0 
                              ? `+${formatCurrency(discrepancy.difference)}` 
                              : formatCurrency(discrepancy.difference)
                          }</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}

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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LineItemMatching;
