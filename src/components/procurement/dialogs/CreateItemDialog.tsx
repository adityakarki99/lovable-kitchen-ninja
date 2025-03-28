
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateSupplierForm from '@/components/procurement/supplier/CreateSupplierForm';
import CreateStockItemForm from '@/components/procurement/stockItem/CreateStockItemForm';

interface CreateItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'supplier' | 'item';
  onSuccess?: () => void;
}

const CreateItemDialog: React.FC<CreateItemDialogProps> = ({ 
  open, 
  onOpenChange, 
  defaultTab = 'supplier',
  onSuccess
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="supplier" className="flex-1">Supplier</TabsTrigger>
            <TabsTrigger value="item" className="flex-1">Stock Item</TabsTrigger>
          </TabsList>
          <TabsContent value="supplier">
            <CreateSupplierForm onSuccess={onSuccess} />
          </TabsContent>
          <TabsContent value="item">
            <CreateStockItemForm onSuccess={onSuccess} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateItemDialog;
