
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Calendar, Clock, PenLine, CheckCircle, X, User, BarChart, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Template } from './TemplateManagement';

interface TemplateDetailProps {
  template: Template;
  onEdit: () => void;
}

const TemplateDetail: React.FC<TemplateDetailProps> = ({ template, onEdit }) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get template type badge color
  const getTemplateTypeBadge = (type: string) => {
    switch (type) {
      case 'full':
        return "bg-carbon-blue-20 text-carbon-blue-70";
      case 'partial':
        return "bg-carbon-gray-20 text-carbon-gray-100";
      case 'category':
        return "bg-amber-100 text-amber-800";
      case 'location':
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-carbon-gray-20 text-carbon-gray-100";
    }
  };
  
  // Get template type display name
  const getTemplateTypeDisplay = (type: string) => {
    switch (type) {
      case 'full':
        return "Full Count";
      case 'partial':
        return "Partial";
      case 'category':
        return "By Category";
      case 'location':
        return "By Location";
      default:
        return type;
    }
  };
  
  // Get schedule display text
  const getScheduleDisplay = (template: Template) => {
    if (!template.schedule) return 'Not scheduled';
    
    switch (template.schedule.frequency) {
      case 'daily':
        return `Daily at ${template.schedule.time}`;
      case 'weekly':
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weekDays = template.schedule.daysOfWeek?.map(day => days[day]).join(', ');
        return `Weekly on ${weekDays} at ${template.schedule.time}`;
      case 'monthly':
        return `Monthly on day ${template.schedule.dayOfMonth} at ${template.schedule.time}`;
      case 'custom':
        return 'Custom schedule';
      default:
        return 'Scheduled';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Template overview card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{template.name}</CardTitle>
              <CardDescription className="mt-1">{template.description}</CardDescription>
            </div>
            <Badge className={getTemplateTypeBadge(template.type)}>
              {getTemplateTypeDisplay(template.type)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-carbon-gray-100">Template Details</h3>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-28 flex-shrink-0 text-carbon-gray-70 text-sm">Created</div>
                  <div className="text-sm">{formatDate(template.createdAt)}</div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-28 flex-shrink-0 text-carbon-gray-70 text-sm">Last Updated</div>
                  <div className="text-sm">{formatDate(template.updatedAt)}</div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-28 flex-shrink-0 text-carbon-gray-70 text-sm">Last Used</div>
                  <div className="text-sm">
                    {template.lastUsed ? formatDate(template.lastUsed) : 'Never used'}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-28 flex-shrink-0 text-carbon-gray-70 text-sm">Created By</div>
                  <div className="text-sm flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {template.createdBy}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-28 flex-shrink-0 text-carbon-gray-70 text-sm">Default</div>
                  <div className="text-sm">
                    {template.isDefault ? (
                      <span className="flex items-center gap-1 text-kitchen-success">
                        <CheckCircle className="h-4 w-4" /> Yes
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <X className="h-4 w-4" /> No
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-carbon-gray-100">Scope</h3>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-28 flex-shrink-0 text-carbon-gray-70 text-sm">Item Count</div>
                  <div className="text-sm font-medium">{template.itemCount} items</div>
                </div>
                
                {template.type === 'category' && template.categories && (
                  <div className="flex items-start">
                    <div className="w-28 flex-shrink-0 text-carbon-gray-70 text-sm">Categories</div>
                    <div className="flex flex-wrap gap-1">
                      {template.categories.map(category => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {template.type === 'location' && template.locations && (
                  <div className="flex items-start">
                    <div className="w-28 flex-shrink-0 text-carbon-gray-70 text-sm">Locations</div>
                    <div className="flex flex-wrap gap-1">
                      {template.locations.map(location => (
                        <Badge key={location} variant="outline" className="text-xs">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-carbon-gray-100">Schedule</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-carbon-gray-60" />
                  {getScheduleDisplay(template)}
                </div>
                
                <div className="text-sm text-carbon-gray-70">
                  {template.schedule?.frequency === 'weekly' && template.schedule.daysOfWeek && (
                    <div className="flex items-center mt-2 gap-1">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                        <div 
                          key={index}
                          className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                            template.schedule?.daysOfWeek?.includes(index)
                              ? "bg-carbon-blue-60 text-white"
                              : "bg-carbon-gray-20 text-carbon-gray-70"
                          )}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={onEdit}
              >
                <PenLine className="mr-2 h-4 w-4" />
                Edit Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Template items table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Template Items</CardTitle>
          <CardDescription>Items included in this stocktake template</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-carbon-gray-10">
                <TableRow>
                  <TableHead className="font-medium">Item Name</TableHead>
                  <TableHead className="font-medium">Category</TableHead>
                  <TableHead className="font-medium">Location</TableHead>
                  <TableHead className="font-medium">Unit</TableHead>
                  <TableHead className="font-medium text-center">Include in Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {template.items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell className="text-center">
                      {item.includeInCount ? (
                        <CheckCircle className="h-4 w-4 text-kitchen-success mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-kitchen-danger mx-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                
                {/* If we have fewer items than the itemCount, show a message */}
                {template.items.length < template.itemCount && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-carbon-gray-70">
                      <AlertTriangle className="h-4 w-4 mx-auto mb-2" />
                      <p className="text-sm">
                        Showing {template.items.length} of {template.itemCount} items
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateDetail;
