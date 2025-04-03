
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, ShoppingCart, Clock, AlertTriangle } from 'lucide-react';

interface TextSectionProps {
  content: string;
  isEditing: boolean;
  onChange: (content: string) => void;
  placeholder: string;
}

const TextSection: React.FC<TextSectionProps> = ({
  content,
  isEditing,
  onChange,
  placeholder
}) => {
  // Check if content might be order-related based on keywords
  const isOrderRelated = content?.toLowerCase().includes('order') || 
                          content?.toLowerCase().includes('supplier') ||
                          placeholder?.toLowerCase().includes('order');

  // Extract potential order details if it appears to be order-related
  const extractOrderDetails = () => {
    if (!content || content.trim() === '') return null;
    
    const lines = content.split('\n');
    const orderDetails = {
      orderNumber: null as string | null,
      supplier: null as string | null,
      date: null as string | null,
      urgent: false,
    };
    
    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes('order') && lowerLine.includes('#')) {
        const match = line.match(/#\s*([a-z0-9-]+)/i);
        if (match) orderDetails.orderNumber = match[1];
      }
      if (lowerLine.includes('supplier:') || lowerLine.includes('from:')) {
        const match = line.match(/(?:supplier|from):\s*(.+)/i);
        if (match) orderDetails.supplier = match[1].trim();
      }
      if (lowerLine.includes('date:') || lowerLine.includes('delivery:')) {
        const match = line.match(/(?:date|delivery):\s*(.+)/i);
        if (match) orderDetails.date = match[1].trim();
      }
      if (lowerLine.includes('urgent') || lowerLine.includes('priority') || lowerLine.includes('asap')) {
        orderDetails.urgent = true;
      }
    });
    
    return (orderDetails.orderNumber || orderDetails.supplier || orderDetails.date || orderDetails.urgent) 
      ? orderDetails 
      : null;
  };
  
  const orderDetails = isOrderRelated ? extractOrderDetails() : null;
  
  return (
    <div className="space-y-2">
      {orderDetails && (
        <div className="bg-kitchen-muted p-2 rounded-md mb-2 flex flex-wrap gap-2 items-center text-sm">
          {orderDetails.orderNumber && (
            <div className="flex items-center">
              <ShoppingCart className="h-4 w-4 mr-1 text-kitchen-muted-foreground" />
              <span>Order #{orderDetails.orderNumber}</span>
            </div>
          )}
          {orderDetails.supplier && (
            <Badge variant="outline" className="font-normal">
              {orderDetails.supplier}
            </Badge>
          )}
          {orderDetails.date && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-kitchen-muted-foreground" />
              <span>{orderDetails.date}</span>
            </div>
          )}
          {orderDetails.urgent && (
            <Badge className="bg-kitchen-danger text-white font-normal flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Urgent
            </Badge>
          )}
        </div>
      )}
      
      <Textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        disabled={!isEditing}
        className={`min-h-[150px] ${isOrderRelated ? 'border-kitchen-primary/30' : ''}`}
        placeholder={placeholder}
      />
      
      {isOrderRelated && isEditing && (
        <div className="text-xs text-kitchen-muted-foreground mt-1">
          <p>Tip: Include "Order #", "Supplier:", "Date:" and mark as "URGENT" if needed.</p>
        </div>
      )}
    </div>
  );
};

export default TextSection;
