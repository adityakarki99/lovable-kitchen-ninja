
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { stockItems } from '@/data/procurement/stockItems';
import ActionBar from '@/components/shared/ActionBar';
import { Check, AlertCircle, Link as LinkIcon, Pencil } from 'lucide-react';

interface LineItemStockMatcherProps {
  invoiceId: string;
  invoiceItems: any[];
  onItemMatched?: (lineItemId: string, stockItemId: string) => void;
  readOnly?: boolean;
}

const LineItemStockMatcher: React.FC<LineItemStockMatcherProps> = ({ 
  invoiceId, 
  invoiceItems, 
  onItemMatched,
  readOnly = false 
}) => {
  const [items, setItems] = useState(invoiceItems);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const updateItemMatch = (itemIndex: number, stockItemId: string) => {
    const updatedItems = [...items];
    const matchedStockItem = stockItems.find(item => item.id === stockItemId);
    
    if (matchedStockItem) {
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        matchedStockItem,
        matchType: 'manual',
        stockItemId
      };
      setItems(updatedItems);
      
      if (onItemMatched) {
        onItemMatched(updatedItems[itemIndex].id, stockItemId);
      }
    }
    
    setIsLinkModalOpen(false);
  };

  const openLinkModal = (index: number) => {
    setSelectedItemIndex(index);
    setIsLinkModalOpen(true);
  };

  const getMatchStatusBadge = (item: any) => {
    if (item.matchedStockItem) {
      return item.matchType === 'auto' ? (
        <Badge variant="success">
          <Check className="h-3 w-3 mr-1" />
          Auto-matched
        </Badge>
      ) : (
        <Badge variant="info">
          <Check className="h-3 w-3 mr-1" />
          Manually matched
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline">
          <AlertCircle className="h-3 w-3 mr-1" />
          Unmatched
        </Badge>
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Line Item Stock Matching</CardTitle>
      </CardHeader>
      <CardContent>
        <ActionBar position="top" alignment="end">
          <div className="text-sm text-muted-foreground">
            {items.filter(item => item.matchedStockItem).length} of {items.length} items matched
          </div>
        </ActionBar>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Invoice Line Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Matched Stock Item</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.unit_price?.toFixed(2) || 0}</TableCell>
                <TableCell>
                  {item.matchedStockItem ? (
                    <div className="flex items-center gap-2">
                      {item.matchedStockItem.name}
                      <span className="text-xs text-muted-foreground">
                        ({item.matchedStockItem.unit})
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Not matched</span>
                  )}
                </TableCell>
                <TableCell>{getMatchStatusBadge(item)}</TableCell>
                <TableCell className="text-right">
                  {!readOnly && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openLinkModal(index)}
                    >
                      {item.matchedStockItem ? (
                        <>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </>
                      ) : (
                        <>
                          <LinkIcon className="h-4 w-4 mr-1" />
                          Link
                        </>
                      )}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Link to Stock Item</DialogTitle>
            </DialogHeader>
            
            {selectedItemIndex !== null && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Line Item Description</h4>
                  <p>{items[selectedItemIndex]?.description}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Select Stock Item</h4>
                  <Select 
                    defaultValue={items[selectedItemIndex]?.stockItemId || ''}
                    onValueChange={(value) => updateItemMatch(selectedItemIndex, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stock item..." />
                    </SelectTrigger>
                    <SelectContent>
                      {stockItems.map((stockItem) => (
                        <SelectItem key={stockItem.id} value={stockItem.id}>
                          {stockItem.name} ({stockItem.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Match this line item to an existing stock item
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default LineItemStockMatcher;
