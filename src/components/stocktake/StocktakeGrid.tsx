
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Clock, PackageCheck, ArrowUpDown, Barcode, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock inventory data for stocktake
export interface StocktakeItem {
  id: number;
  name: string;
  category: string;
  unit: string;
  theoreticalStock: number;
  actualStock: number;
  parLevel: number;
  location: string;
  expiryDate: string;
  batchNumber: string;
  supplier: string;
  lastStocktake: string;
  status: 'low' | 'good' | 'expiring';
  variance: number;
  temperature?: number; // For IoT sensors
}

interface StocktakeGridProps {
  items: StocktakeItem[];
  onUpdateStock: (id: number, newValue: number) => void;
  showBarcodeScannerButton?: boolean;
}

const StocktakeGrid: React.FC<StocktakeGridProps> = ({ 
  items, 
  onUpdateStock,
  showBarcodeScannerButton = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low':
        return <AlertTriangle className="h-4 w-4" />;
      case 'expiring':
        return <Clock className="h-4 w-4" />;
      case 'good':
        return <PackageCheck className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'low':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      case 'expiring':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      case 'good':
        return "bg-kitchen-success/10 text-kitchen-success";
      default:
        return "";
    }
  };

  const getVarianceClass = (variance: number) => {
    if (variance === 0) return "text-kitchen-success";
    if (variance > 0) return "text-kitchen-success";
    return "text-kitchen-danger";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleStockUpdate = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onUpdateStock(id, newValue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Filter items..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {showBarcodeScannerButton && (
          <Button className="gap-2 bg-kitchen-primary hover:bg-kitchen-primary/90">
            <Barcode className="h-4 w-4" />
            Scan Barcode
          </Button>
        )}
      </div>
      
      <Card className="shadow-apple-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-kitchen-muted">
            <TableRow>
              <TableHead className="font-medium">Item Name</TableHead>
              <TableHead className="font-medium">Category</TableHead>
              <TableHead className="font-medium">Location</TableHead>
              <TableHead className="font-medium text-right">Theoretical</TableHead>
              <TableHead className="font-medium text-right">Actual Count</TableHead>
              <TableHead className="font-medium text-right">PAR Level</TableHead>
              <TableHead className="font-medium">Expiry Date</TableHead>
              <TableHead className="font-medium text-right">Variance</TableHead>
              <TableHead className="font-medium text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => {
              const isExpiringSoon = new Date(item.expiryDate).getTime() - new Date().getTime() <= 7 * 24 * 60 * 60 * 1000;
              
              return (
                <TableRow key={item.id} className="hover:bg-kitchen-muted/30">
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      {item.name}
                      {item.temperature && (
                        <span className={cn(
                          "text-xs mt-1",
                          item.temperature > 8 ? "text-kitchen-danger" : 
                          item.temperature > 5 ? "text-kitchen-warning" : 
                          "text-kitchen-success"
                        )}>
                          🌡️ {item.temperature}°C
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-right">{item.theoreticalStock} {item.unit}</TableCell>
                  <TableCell className="text-right">
                    <Input 
                      type="number" 
                      className="w-20 h-8 text-right" 
                      defaultValue={item.actualStock} 
                      onChange={(e) => handleStockUpdate(item.id, e)}
                      min="0"
                      step="0.1"
                    />
                    <span className="ml-1">{item.unit}</span>
                  </TableCell>
                  <TableCell className="text-right">{item.parLevel} {item.unit}</TableCell>
                  <TableCell>
                    <span className={cn(
                      isExpiringSoon ? "text-kitchen-warning font-medium" : ""
                    )}>
                      {formatDate(item.expiryDate)}
                      {isExpiringSoon && " (Soon)"}
                    </span>
                  </TableCell>
                  <TableCell className={cn("text-right font-medium", getVarianceClass(item.variance))}>
                    {item.variance > 0 ? "+" : ""}{item.variance} {item.unit}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={cn(
                      "pill-badge inline-flex items-center gap-1",
                      getStatusClass(item.status)
                    )}>
                      {getStatusIcon(item.status)}
                      {item.status === 'low' ? (
                        <span>Low Stock</span>
                      ) : item.status === 'expiring' ? (
                        <span>Expiring Soon</span>
                      ) : (
                        <span>Good</span>
                      )}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default StocktakeGrid;
