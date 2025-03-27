
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

type LineItemsTabProps = {
  selectedMatch: any;
};

const LineItemsTab: React.FC<LineItemsTabProps> = ({ selectedMatch }) => {
  return (
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
          {selectedMatch.purchaseOrder.items.map((poItem: any, index: number) => {
            const roItem = selectedMatch.receivingOrder.items.find(
              (item: any) => item.item.id === poItem.item.id
            );
            const invItem = selectedMatch.invoice.items.find(
              (item: any) => item.item.id === poItem.item.id
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
  );
};

export default LineItemsTab;
