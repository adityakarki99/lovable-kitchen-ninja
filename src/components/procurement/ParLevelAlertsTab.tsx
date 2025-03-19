
import React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ParLevelAlert {
  id: number;
  name: string;
  currentStock: string;
  parLevel: string;
  supplier: string;
  suggestedOrder: string;
}

interface ParLevelAlertsTabProps {
  parLevelAlerts: ParLevelAlert[];
}

const ParLevelAlertsTab: React.FC<ParLevelAlertsTabProps> = ({ parLevelAlerts }) => {
  const { toast } = useToast();

  const generatePAROrders = () => {
    toast({
      title: "PAR orders generated",
      description: "Orders for items below PAR levels have been created",
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium">Items Below PAR Level</h3>
          <p className="text-kitchen-muted-foreground text-sm">
            These items are below your minimum stock level and need to be reordered
          </p>
        </div>
        <Button 
          className="bg-kitchen-primary hover:bg-kitchen-primary/90"
          onClick={generatePAROrders}
        >
          Generate PAR Orders
        </Button>
      </div>
      
      <Card className="shadow-apple-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-kitchen-muted">
            <TableRow>
              <TableHead className="font-medium">Item Name</TableHead>
              <TableHead className="font-medium text-right">Current Stock</TableHead>
              <TableHead className="font-medium text-right">PAR Level</TableHead>
              <TableHead className="font-medium">Preferred Supplier</TableHead>
              <TableHead className="font-medium text-right">Suggested Order</TableHead>
              <TableHead className="font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parLevelAlerts.map((item) => (
              <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right text-kitchen-danger font-medium">{item.currentStock}</TableCell>
                <TableCell className="text-right">{item.parLevel}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell className="text-right">{item.suggestedOrder}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Add to Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default ParLevelAlertsTab;
