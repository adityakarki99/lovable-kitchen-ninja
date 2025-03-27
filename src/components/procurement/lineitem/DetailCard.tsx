
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, Package, DollarSign } from 'lucide-react';

type DetailCardProps = {
  selectedMatch: any;
};

const DetailCard: React.FC<DetailCardProps> = ({ selectedMatch }) => {
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

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
  );
};

export default DetailCard;
