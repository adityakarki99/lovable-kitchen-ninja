
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash, ShoppingCart } from 'lucide-react';
import { TableDefinition } from '../types';
import { Badge } from '@/components/ui/badge';

interface TableSectionProps {
  tableData: TableDefinition;
  isEditing: boolean;
  onChange: (tableData: TableDefinition) => void;
}

const TableSection: React.FC<TableSectionProps> = ({
  tableData,
  isEditing,
  onChange
}) => {
  const handleColumnNameChange = (colId: string, newName: string) => {
    const newCols = [...tableData.columns];
    const colIndex = newCols.findIndex(c => c.id === colId);
    newCols[colIndex].name = newName;
    onChange({
      ...tableData,
      columns: newCols
    });
  };

  const handleCellChange = (rowIndex: number, colId: string, value: string) => {
    const newRows = [...tableData.rows];
    newRows[rowIndex].cells[colId] = value;
    onChange({
      ...tableData,
      rows: newRows
    });
  };

  const handleDeleteRow = (rowIndex: number) => {
    const newRows = tableData.rows.filter((_, i) => i !== rowIndex);
    onChange({
      ...tableData,
      rows: newRows
    });
  };

  const handleAddRow = () => {
    const newRow = {
      id: Date.now().toString(),
      cells: {}
    };
    tableData.columns.forEach((col) => {
      newRow.cells[col.id] = '';
    });
    onChange({
      ...tableData,
      rows: [...tableData.rows, newRow]
    });
  };

  // Check if this is likely an order table based on column names
  const isOrderTable = tableData.columns.some(col => 
    col.name.toLowerCase().includes('item') || 
    col.name.toLowerCase().includes('product') ||
    col.name.toLowerCase().includes('quantity') ||
    col.name.toLowerCase().includes('price') ||
    col.name.toLowerCase().includes('total')
  );

  // Calculate total if price and quantity columns exist
  const calculateRowTotal = (row: any) => {
    const priceColId = tableData.columns.find(col => 
      col.name.toLowerCase().includes('price') || 
      col.name.toLowerCase().includes('cost')
    )?.id;
    
    const qtyColId = tableData.columns.find(col => 
      col.name.toLowerCase().includes('qty') || 
      col.name.toLowerCase().includes('quantity')
    )?.id;
    
    if (priceColId && qtyColId) {
      const price = parseFloat(row.cells[priceColId] || '0');
      const qty = parseFloat(row.cells[qtyColId] || '0');
      if (!isNaN(price) && !isNaN(qty)) {
        return (price * qty).toFixed(2);
      }
    }
    return null;
  };

  // Find the total column if it exists
  const totalColId = tableData.columns.find(col => 
    col.name.toLowerCase().includes('total') || 
    col.name.toLowerCase().includes('amount')
  )?.id;

  return (
    <div className="border rounded overflow-hidden">
      {isOrderTable && (
        <div className="bg-blue-50 p-2 border-b flex items-center">
          <ShoppingCart className="h-4 w-4 mr-2 text-blue-500" />
          <span className="text-sm font-medium text-blue-700">Order Items</span>
          {tableData.rows.length > 0 && (
            <Badge className="ml-auto bg-blue-100 text-blue-700 hover:bg-blue-200">
              {tableData.rows.length} {tableData.rows.length === 1 ? 'item' : 'items'}
            </Badge>
          )}
        </div>
      )}
      
      <table className="w-full">
        <thead className="bg-kitchen-muted/50">
          <tr>
            {tableData.columns.map((col) => (
              <th key={col.id} className="p-2 text-left text-sm font-medium">
                {isEditing ? (
                  <Input
                    value={col.name}
                    onChange={(e) => handleColumnNameChange(col.id, e.target.value)}
                    className="h-8 text-sm"
                  />
                ) : (
                  col.name
                )}
              </th>
            ))}
            {isEditing && <th className="w-10"></th>}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row, rowIndex) => (
            <tr key={row.id} className="border-t">
              {tableData.columns.map((col) => (
                <td key={`${row.id}-${col.id}`} className="p-2">
                  {totalColId && col.id === totalColId && isOrderTable ? (
                    <div className="relative">
                      <Input
                        value={row.cells[col.id] || calculateRowTotal(row) || ''}
                        onChange={(e) => handleCellChange(rowIndex, col.id, e.target.value)}
                        disabled={!isEditing}
                        className={`h-8 text-sm ${!isEditing && calculateRowTotal(row) ? 'bg-kitchen-muted/20 font-medium' : ''}`}
                      />
                      {!isEditing && calculateRowTotal(row) && !row.cells[col.id] && (
                        <div className="absolute inset-0 flex items-center justify-start pl-3 pointer-events-none">
                          <span className="text-kitchen-muted-foreground font-medium">${calculateRowTotal(row)}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Input
                      value={row.cells[col.id] || ''}
                      onChange={(e) => handleCellChange(rowIndex, col.id, e.target.value)}
                      disabled={!isEditing}
                      className="h-8 text-sm"
                    />
                  )}
                </td>
              ))}
              {isEditing && (
                <td className="p-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteRow(rowIndex)}
                  >
                    <Trash className="h-4 w-4 text-kitchen-muted-foreground" />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      {isEditing && (
        <div className="p-2 border-t">
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={handleAddRow}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add {isOrderTable ? 'Item' : 'Row'}
          </Button>
        </div>
      )}
      
      {isOrderTable && tableData.rows.length > 0 && (
        <div className="p-2 border-t bg-kitchen-muted/20">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Order Total:</span>
            <span className="font-medium">
              $
              {tableData.rows.reduce((sum, row) => {
                const total = calculateRowTotal(row);
                return sum + (total ? parseFloat(total) : 0);
              }, 0).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSection;
