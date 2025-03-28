
export interface StockItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
  parLevel: number;
  lastOrderedPrice: number;
  supplier: string;
}

export interface ParLevelAlert {
  id: number;
  name: string;
  currentStock: string;
  parLevel: string;
  supplier: string;
  suggestedOrder: string;
}
