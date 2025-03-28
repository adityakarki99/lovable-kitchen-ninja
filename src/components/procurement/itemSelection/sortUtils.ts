
import { StockItem } from './types';

export const sortItems = (
  items: StockItem[],
  sortBy: string | null,
  sortDirection: 'asc' | 'desc'
): StockItem[] => {
  if (!sortBy) return items;

  return [...items].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'category':
        valueA = a.category;
        valueB = b.category;
        break;
      case 'stock':
        valueA = a.currentStock;
        valueB = b.currentStock;
        break;
      case 'par':
        valueA = a.parLevel;
        valueB = b.parLevel;
        break;
      case 'price':
        valueA = a.lastOrderedPrice;
        valueB = b.lastOrderedPrice;
        break;
      default:
        return 0;
    }
    
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterItems = (
  items: StockItem[],
  supplierId: number | null,
  searchQuery: string
): StockItem[] => {
  let filtered = [...items];
  
  // Filter by supplier if a supplier is selected
  if (supplierId) {
    filtered = filtered.filter(item => item.supplier === supplierId.toString());
  }
  
  // Filter by search query
  if (searchQuery) {
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return filtered;
};
