
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import { TableDefinition } from '../types';

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

  return (
    <div className="border rounded overflow-hidden">
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
                  <Input
                    value={row.cells[col.id] || ''}
                    onChange={(e) => handleCellChange(rowIndex, col.id, e.target.value)}
                    disabled={!isEditing}
                    className="h-8 text-sm"
                  />
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
            Add Row
          </Button>
        </div>
      )}
    </div>
  );
};

export default TableSection;
