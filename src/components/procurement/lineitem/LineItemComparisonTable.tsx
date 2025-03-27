
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type LineItemComparisonTableProps = {
  selectedMatch: any;
  getStatusBadgeClass: (status: string) => string;
};

const LineItemComparisonTable: React.FC<LineItemComparisonTableProps> = ({ 
  selectedMatch, 
  getStatusBadgeClass 
}) => {
  return (
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
  );
};

export default LineItemComparisonTable;
