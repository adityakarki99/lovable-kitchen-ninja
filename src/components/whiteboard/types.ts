
export interface WhiteboardSection {
  id: string;
  title: string;
  type: 'text' | 'checklist' | 'table';
  content?: any;
}

export interface WhiteboardTemplate {
  id: string;
  name: string;
  description: string;
  sections: WhiteboardSection[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TableRow {
  id: string;
  cells: Record<string, string>;
}

export interface TableDefinition {
  columns: {
    id: string;
    name: string;
  }[];
  rows: TableRow[];
}
