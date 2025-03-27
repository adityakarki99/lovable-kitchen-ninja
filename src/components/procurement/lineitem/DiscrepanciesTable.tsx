
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type DiscrepanciesTableProps = {
  discrepancies: any[];
  formatCurrency: (amount: number) => string;
};

const DiscrepanciesTable: React.FC<DiscrepanciesTableProps> = ({ 
  discrepancies,
  formatCurrency
}) => {
  if (discrepancies.length === 0) {
    return null;
  }

  return (
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
          {discrepancies.map((discrepancy: any, index: number) => (
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
  );
};

export default DiscrepanciesTable;
