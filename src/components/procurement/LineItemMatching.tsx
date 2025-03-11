import React, { useState } from 'react';
import { Check, X, AlertTriangle, Eye, DollarSign, FileText, Edit, Save, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { matchingData, purchaseOrders } from '@/data/procurementData';

const LineItemMatching: React.FC = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedPO, setSelectedPO] = useState(purchaseOrders[0].id);
  const selectedMatch = matchingData.find(match => match.purchaseOrder.id === selectedPO);
  const { toast } = useToast();

  const getTotalVariance = () => {
    if (!selectedMatch) return 0;
    return selectedMatch.discrepancies.reduce((sum, item) => sum + (item.difference || 0), 0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'matched':
        return <Check className="h-4 w-4 text-kitchen-success" />;
      case 'quantity-mismatch':
        return <AlertTriangle className="h-4 w-4 text-kitchen-warning" />;
      case 'price-mismatch':
        return <DollarSign className="h-4 w-4 text-kitchen-warning" />;
      case 'both-mismatch':
        return <X className="h-4 w-4 text-kitchen-danger" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'matched':
        return "bg-kitchen-success/10 text-kitchen-success";
      case 'quantity-mismatch':
      case 'price-mismatch':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      case 'both-mismatch':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      default:
        return "";
    }
  };

  const getQtyVarianceClass = (variance: number) => {
    if (variance === 0) return "text-kitchen-success";
    if (variance < 0) return "text-kitchen-danger";
    return "text-kitchen-warning";
  };

  const getPriceVarianceClass = (variance: number) => {
    if (variance === 0) return "text-kitchen-success";
    if (Math.abs(variance) <= 0.05) return "text-kitchen-success"; // 5 cents tolerance
    return "text-kitchen-warning";
  };

  const handleAcceptAll = () => {
    toast({
      title: "All variances accepted",
      description: "The invoice has been approved for payment",
    });
  };

  const handleGenerateCreditNote = () => {
    toast({
      title: "Credit note generated",
      description: `Credit note for $${Math.abs(getTotalVariance()).toFixed(2)} has been created`,
    });
  };

  const handleResolveVariance = (itemId: number) => {
    // setLineItems(prevItems => 
    //   prevItems.map(item => 
    //     item.id === itemId 
    //       ? { ...item, status: 'matched', qtyVariance: 0, priceVariance: 0, totalVariance: 0 } 
    //       : item
    //   )
    // );
    
    toast({
      title: "Variance resolved",
      description: "Item variance has been manually resolved",
    });
  };

  const matchedPercent = 100; //(lineItems.filter(item => item.status === 'matched').length / lineItems.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Three-Way Matching</h3>
          <p className="text-kitchen-muted-foreground text-sm">
            Match purchase orders, receiving orders, and invoices to verify accuracy
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedPO} onValueChange={setSelectedPO}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select PO" />
            </SelectTrigger>
            <SelectContent>
              {purchaseOrders.map(po => (
                <SelectItem key={po.id} value={po.id}>{po.id}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            View Documents
          </Button>
          
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Purchase Order</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {selectedMatch ? (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">PO Number:</span>
                  <span className="text-sm font-medium">{selectedMatch.purchaseOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Date Ordered:</span>
                  <span className="text-sm">{selectedMatch.purchaseOrder.dateOrdered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Expected Delivery:</span>
                  <span className="text-sm">{selectedMatch.purchaseOrder.dateDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Payment Terms:</span>
                  <span className="text-sm">{selectedMatch.purchaseOrder.paymentTerms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Total:</span>
                  <span className="text-sm font-medium">${selectedMatch.purchaseOrder.totalExpected.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <div>No matching data found</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Receiving Order</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {selectedMatch ? (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">RO Number:</span>
                  <span className="text-sm font-medium">{selectedMatch.receivingOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Date Received:</span>
                  <span className="text-sm">{selectedMatch.receivingOrder.dateReceived}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Received By:</span>
                  <span className="text-sm">{selectedMatch.receivingOrder.receivedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Condition:</span>
                  <span className="text-sm">{selectedMatch.receivingOrder.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Notes:</span>
                  <span className="text-sm">{selectedMatch.receivingOrder.notes}</span>
                </div>
              </div>
            ) : (
              <div>No matching data found</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Invoice</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {selectedMatch ? (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Invoice Number:</span>
                  <span className="text-sm font-medium">{selectedMatch.invoice.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Date Issued:</span>
                  <span className="text-sm">{selectedMatch.invoice.dateIssued}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Date Due:</span>
                  <span className="text-sm">{selectedMatch.invoice.dateDue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Supplier Ref:</span>
                  <span className="text-sm">{selectedMatch.invoice.supplierRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-kitchen-muted-foreground">Total:</span>
                  <span className="text-sm font-medium">${selectedMatch.invoice.total.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <div>No matching data found</div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Matching Status</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{matchedPercent.toFixed(0)}% Matched</span>
              <Progress value={matchedPercent} className="w-24 h-2" />
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-kitchen-muted">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="line-items">Line Items</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="summary" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-kitchen-muted-foreground mb-1">Total Variance</div>
                    <div className={`text-xl font-semibold ${getTotalVariance() === 0 ? 'text-kitchen-success' : 'text-kitchen-danger'}`}>
                      ${getTotalVariance().toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-kitchen-muted-foreground mb-1">PO Total</div>
                    <div className="text-xl font-semibold">${selectedMatch?.purchaseOrder.totalExpected.toFixed(2)}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-kitchen-muted-foreground mb-1">Invoice Total</div>
                    <div className="text-xl font-semibold">${selectedMatch?.invoice.total.toFixed(2)}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-kitchen-muted-foreground mb-1">Status</div>
                    <div className="flex items-center">
                      {matchedPercent === 100 ? (
                        <Badge className="bg-kitchen-success">Fully Matched</Badge>
                      ) : matchedPercent >= 80 ? (
                        <Badge className="bg-kitchen-warning">Partially Matched</Badge>
                      ) : (
                        <Badge className="bg-kitchen-danger">Significant Variances</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Variance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* {lineItems.filter(item => item.status !== 'matched').map(item => (
                      <div key={item.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-kitchen-muted-foreground">
                            {item.status === 'quantity-mismatch' ? (
                              <span>Quantity discrepancy: PO {item.poQty} vs. Received {item.roQty}</span>
                            ) : item.status === 'price-mismatch' ? (
                              <span>Price discrepancy: PO ${item.poPrice.toFixed(2)} vs. Invoice ${item.invoicePrice.toFixed(2)}</span>
                            ) : (
                              <span>Multiple discrepancies found</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={item.totalVariance < 0 ? 'text-kitchen-danger' : 'text-kitchen-warning'}>
                            ${item.totalVariance.toFixed(2)}
                          </span>
                          <Button size="sm" variant="outline" onClick={() => handleResolveVariance(item.id)}>
                            Resolve
                          </Button>
                        </div>
                      </div>
                    ))} */}
                    
                    {/* {lineItems.every(item => item.status === 'matched') && (
                      <div className="flex justify-center items-center py-6 text-kitchen-success">
                        <Check className="h-5 w-5 mr-2" />
                        All items matched successfully
                      </div>
                    )} */}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={handleAcceptAll}>
                    <Check className="mr-2 h-4 w-4" />
                    Accept All & Approve
                  </Button>
                  <Button variant="outline" onClick={handleGenerateCreditNote} disabled={getTotalVariance() >= 0}>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Credit Note
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add notes for resolution..."
                    className="w-full sm:w-64"
                  />
                  <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="line-items" className="mt-0">
            <Table>
              <TableHeader className="bg-kitchen-muted">
                <TableRow>
                  <TableHead className="w-[180px]">Item</TableHead>
                  <TableHead className="text-center">PO Qty</TableHead>
                  <TableHead className="text-center">PO Price</TableHead>
                  <TableHead className="text-center">RO Qty</TableHead>
                  <TableHead className="text-center">Invoice Qty</TableHead>
                  <TableHead className="text-center">Invoice Price</TableHead>
                  <TableHead className="text-center">Qty Variance</TableHead>
                  <TableHead className="text-center">Price Variance</TableHead>
                  <TableHead className="text-right">Total Variance</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {lineItems.map(item => (
                  <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-center">{item.poQty}</TableCell>
                    <TableCell className="text-center">${item.poPrice.toFixed(2)}</TableCell>
                    <TableCell className={`text-center ${item.poQty !== item.roQty ? 'text-kitchen-warning font-medium' : ''}`}>
                      {item.roQty}
                    </TableCell>
                    <TableCell className={`text-center ${item.poQty !== item.invoiceQty ? 'text-kitchen-warning font-medium' : ''}`}>
                      {item.invoiceQty}
                    </TableCell>
                    <TableCell className={`text-center ${item.poPrice !== item.invoicePrice ? 'text-kitchen-warning font-medium' : ''}`}>
                      ${item.invoicePrice.toFixed(2)}
                    </TableCell>
                    <TableCell className={`text-center ${getQtyVarianceClass(item.qtyVariance)}`}>
                      {item.qtyVariance > 0 ? `+${item.qtyVariance}` : item.qtyVariance}
                    </TableCell>
                    <TableCell className={`text-center ${getPriceVarianceClass(item.priceVariance)}`}>
                      {item.priceVariance === 0 ? '$0.00' : item.priceVariance > 0 ? `+$${item.priceVariance.toFixed(2)}` : `-$${Math.abs(item.priceVariance).toFixed(2)}`}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${item.totalVariance === 0 ? 'text-kitchen-success' : item.totalVariance < 0 ? 'text-kitchen-danger' : 'text-kitchen-warning'}`}>
                      ${item.totalVariance.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className={`pill-badge inline-flex items-center gap-1 justify-center w-full ${getStatusClass(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status === 'matched' ? 'Matched' : 'Variance'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.status !== 'matched' && (
                        <Button size="sm" variant="outline" className="w-full" onClick={() => handleResolveVariance(item.id)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <div className="flex justify-center items-center py-10 text-kitchen-muted-foreground">
              <FileText className="h-10 w-10 mr-3 opacity-40" />
              <div>
                <h3 className="text-lg font-medium">Document Viewer</h3>
                <p>PDF viewer would be loaded here to view original documents</p>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default LineItemMatching;
