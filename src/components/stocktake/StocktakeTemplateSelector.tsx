
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Template types and mock data
export type StocktakeTemplate = {
  id: number;
  name: string;
  itemCount: number;
  parCompliance: number;
  lastVariance: string;
  variantValue: number;
  type: 'system' | 'custom';
  lastUsed?: string;
};

const templateData: StocktakeTemplate[] = [
  { id: 1, name: 'Weekly Fridge Check', itemCount: 45, parCompliance: 80, lastVariance: '-$50 (2kg)', variantValue: -50, type: 'system', lastUsed: '2025-03-01' },
  { id: 2, name: 'Monthly Production Items', itemCount: 120, parCompliance: 95, lastVariance: '+$300 (5kg)', variantValue: 300, type: 'system', lastUsed: '2025-02-15' },
  { id: 3, name: 'Dry Storage Audit', itemCount: 65, parCompliance: 92, lastVariance: '-$25 (1kg)', variantValue: -25, type: 'system', lastUsed: '2025-03-05' },
  { id: 4, name: 'Mise en Place Count', itemCount: 30, parCompliance: 75, lastVariance: '-$120 (4kg)', variantValue: -120, type: 'custom', lastUsed: '2025-03-07' },
  { id: 5, name: 'Bar Inventory', itemCount: 85, parCompliance: 88, lastVariance: '+$45 (3 bottles)', variantValue: 45, type: 'custom', lastUsed: '2025-03-06' },
];

interface StocktakeTemplateSelectorProps {
  onSelectTemplate: (template: StocktakeTemplate) => void;
  selectedTemplateId?: number;
}

const StocktakeTemplateSelector: React.FC<StocktakeTemplateSelectorProps> = ({ 
  onSelectTemplate,
  selectedTemplateId
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filter, setFilter] = React.useState<'all' | 'system' | 'custom'>('all');
  
  const filteredTemplates = templateData.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || template.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold mb-4">Stocktake Templates</h3>
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-9 bg-white border-kitchen-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant={filter === 'all' ? 'default' : 'outline'} 
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              size="sm" 
              variant={filter === 'system' ? 'default' : 'outline'} 
              onClick={() => setFilter('system')}
            >
              System
            </Button>
            <Button 
              size="sm" 
              variant={filter === 'custom' ? 'default' : 'outline'} 
              onClick={() => setFilter('custom')}
            >
              Custom
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {filteredTemplates.map(template => (
          <Card 
            key={template.id} 
            className={cn(
              "cursor-pointer transition-all hover:border-kitchen-primary",
              selectedTemplateId === template.id && "border-kitchen-primary border-2"
            )}
            onClick={() => onSelectTemplate(template)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <div className="flex items-center text-sm text-kitchen-muted-foreground">
                    <span>{template.itemCount} items</span>
                    <span className="mx-2">•</span>
                    <span>Last used: {template.lastUsed}</span>
                  </div>
                </div>
                <Badge className={template.type === 'system' ? "bg-kitchen-muted" : "bg-kitchen-primary/20 text-kitchen-primary"}>
                  {template.type === 'system' ? 'System' : 'Custom'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <p className="text-xs text-kitchen-muted-foreground">PAR Compliance</p>
                  <p className={cn(
                    "font-medium",
                    template.parCompliance >= 90 ? "text-kitchen-success" :
                    template.parCompliance >= 75 ? "text-kitchen-warning" :
                    "text-kitchen-danger"
                  )}>
                    {template.parCompliance}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-kitchen-muted-foreground">Last Variance</p>
                  <p className={cn(
                    "font-medium",
                    template.variantValue > 0 ? "text-kitchen-success" :
                    template.variantValue < 0 ? "text-kitchen-danger" :
                    "text-kitchen-muted-foreground"
                  )}>
                    {template.lastVariance}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="cursor-pointer border-dashed border-2 hover:border-kitchen-primary">
          <CardContent className="p-4 flex items-center justify-center">
            <Button variant="ghost" className="w-full h-20 flex flex-col gap-2">
              <Plus className="h-6 w-6" />
              <span>Create New Template</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StocktakeTemplateSelector;
