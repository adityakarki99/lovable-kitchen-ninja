
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, ShoppingCart, Clock, AlertTriangle, User, MapPin, Phone } from 'lucide-react';

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
      contact: null as string | null,
      phone: null as string | null,
      urgent: false,
      location: null as string | null,
    };
    
    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes('order') && (lowerLine.includes('#') || lowerLine.includes('number'))) {
        const match = line.match(/#?\s*([a-z0-9-]+)/i);
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
      if (lowerLine.includes('contact:')) {
        const match = line.match(/contact:\s*(.+)/i);
        if (match) orderDetails.contact = match[1].trim();
      }
      if (lowerLine.includes('phone:')) {
        const match = line.match(/phone:\s*(.+)/i);
        if (match) orderDetails.phone = match[1].trim();
      }
      if (lowerLine.includes('location:') || lowerLine.includes('address:')) {
        const match = line.match(/(?:location|address):\s*(.+)/i);
        if (match) orderDetails.location = match[1].trim();
      }
      if (lowerLine.includes('urgent') || lowerLine.includes('priority') || lowerLine.includes('asap')) {
        orderDetails.urgent = true;
      }
    });
    
    return (orderDetails.orderNumber || orderDetails.supplier || orderDetails.date || orderDetails.urgent || orderDetails.contact) 
      ? orderDetails 
      : null;
  };
  
  const orderDetails = isOrderRelated ? extractOrderDetails() : null;

  // Check if content could be menu-related
  const isMenuRelated = content?.toLowerCase().includes('appetizer') || 
                        content?.toLowerCase().includes('entree') || 
                        content?.toLowerCase().includes('dessert') ||
                        content?.toLowerCase().includes('special');
  
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
          {orderDetails.contact && (
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1 text-kitchen-muted-foreground" />
              <span>{orderDetails.contact}</span>
            </div>
          )}
          {orderDetails.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1 text-kitchen-muted-foreground" />
              <span>{orderDetails.phone}</span>
            </div>
          )}
          {orderDetails.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-kitchen-muted-foreground" />
              <span>{orderDetails.location}</span>
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
      
      {isMenuRelated && !isEditing ? (
        <div className="whitespace-pre-wrap bg-white p-4 border rounded-md">
          {content.split('\n').map((line, index) => {
            // Check if line is a header
            if (line.toUpperCase() === line && line.trim().length > 0) {
              return <h4 key={index} className="font-bold mt-4 first:mt-0 text-kitchen-primary-dark">{line}</h4>;
            }
            // Check if line contains price
            else if (line.includes('$')) {
              const [itemName, price] = line.split('- $');
              if (price) {
                return (
                  <div key={index} className="flex justify-between py-1 border-b border-dashed border-kitchen-muted last:border-0">
                    <span>{itemName.trim()}</span>
                    <span className="font-medium">${price.trim()}</span>
                  </div>
                );
              }
            }
            // Regular line or empty line
            return line.trim() ? <p key={index} className="my-1">{line}</p> : <br key={index} />;
          })}
        </div>
      ) : (
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          disabled={!isEditing}
          className={`min-h-[150px] ${isOrderRelated ? 'border-kitchen-primary/30' : ''} ${isMenuRelated ? 'font-mono text-sm' : ''}`}
          placeholder={placeholder}
        />
      )}
      
      {isOrderRelated && isEditing && (
        <div className="text-xs text-kitchen-muted-foreground mt-1">
          <p>Tip: Include "Order #", "Supplier:", "Date:", "Contact:" and mark as "URGENT" if needed.</p>
        </div>
      )}
    </div>
  );
};

export default TextSection;
