
import React, { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Search, Filter, ChevronRight, CheckCircle, XCircle, 
  AlertTriangle, Clock, BarChart, DollarSign, User
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { purchaseOrders, approvalMatrix } from '@/data/procurementData';

const PurchaseOrderApproval: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('All');
  const [selectedPO, setSelectedPO] = useState<string | null>(null);
  
  // Filter POs based on search and urgency
  const filteredPOs = purchaseOrders.filter(po => {
    const matchesSearch = !searchQuery || 
      po.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.requestor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUrgency = urgencyFilter === 'All' || po.urgency === urgencyFilter;
    
    return matchesSearch && matchesUrgency && po.status === 'Pending Approval';
  });

  // Get selected PO details
  const selectedPODetails = selectedPO 
    ? purchaseOrders.find(po => po.id === selectedPO) 
    : null;

  // Handle approval action
  const handleApprove = (poId: string) => {
    console.log(`Approving PO: ${poId}`);
    // In a real app, this would send the approval to the backend
    alert(`Purchase Order ${poId} approved successfully!`);
    setSelectedPO(null);
  };

  // Handle rejection action
  const handleReject = (poId: string) => {
    console.log(`Rejecting PO: ${poId}`);
    // In a real app, this would send the rejection to the backend
    alert(`Purchase Order ${poId} rejected.`);
    setSelectedPO(null);
  };

  // Get urgency icon and class
  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return <AlertTriangle className="h-4 w-4 text-kitchen-danger" />;
      case 'Medium':
        return <Clock className="h-4 w-4 text-kitchen-warning" />;
      case 'Low':
        return <Clock className="h-4 w-4 text-kitchen-success" />;
      default:
        return null;
    }
  };

  const getUrgencyClass = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      case 'Medium':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      case 'Low':
        return "bg-kitchen-success/10 text-kitchen-success";
      default:
        return "";
    }
  };

  // Get approval limit for current user (mocked)
  const getCurrentUserApprovalLimit = () => {
    // In a real app, this would come from the authenticated user's role
    return approvalMatrix[2].approvalLimit; // Kitchen Manager
  };

  const isWithinApprovalLimit = (amount: number) => {
    return amount <= getCurrentUserApprovalLimit();
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search purchase orders..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Urgencies</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="text-kitchen-foreground">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-apple-sm overflow-hidden lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Purchase Orders Awaiting Approval</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader className="bg-kitchen-muted">
              <TableRow>
                <TableHead className="font-medium">PO No.</TableHead>
                <TableHead className="font-medium">Supplier</TableHead>
                <TableHead className="font-medium text-right">Total</TableHead>
                <TableHead className="font-medium">Requestor</TableHead>
                <TableHead className="font-medium">Urgency</TableHead>
                <TableHead className="font-medium">Budget Impact</TableHead>
                <TableHead className="font-medium">Age</TableHead>
                <TableHead className="font-medium w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPOs.length > 0 ? filteredPOs.map((po) => (
                <TableRow 
                  key={po.id} 
                  className={`hover:bg-kitchen-muted/30 cursor-pointer ${selectedPO === po.id ? 'bg-kitchen-muted/20' : ''}`}
                  onClick={() => setSelectedPO(po.id)}
                >
                  <TableCell className="font-medium">{po.id}</TableCell>
                  <TableCell>{po.supplier.name}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${po.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>{po.requestor}</TableCell>
                  <TableCell>
                    <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium gap-1"
                      style={{ backgroundColor: getUrgencyClass(po.urgency).split(' ')[0], color: getUrgencyClass(po.urgency).split(' ')[1] }}
                    >
                      {getUrgencyIcon(po.urgency)}
                      {po.urgency}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={po.budgetImpact > 5 ? 'text-kitchen-warning' : 'text-kitchen-success'}>
                      {po.budgetImpact}% of weekly
                    </span>
                  </TableCell>
                  <TableCell>{po.age}</TableCell>
                  <TableCell>
                    <ChevronRight className="h-4 w-4 text-kitchen-muted-foreground" />
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-kitchen-muted-foreground">
                    No purchase orders awaiting approval
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {selectedPODetails ? (
          <Card className="shadow-apple-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{selectedPODetails.id} Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-kitchen-muted-foreground">Supplier:</span>
                  <span className="font-medium">{selectedPODetails.supplier.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-kitchen-muted-foreground">Date Ordered:</span>
                  <span>{selectedPODetails.dateOrdered}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-kitchen-muted-foreground">Delivery Date:</span>
                  <span>{selectedPODetails.dateDelivery}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-kitchen-muted-foreground">Payment Terms:</span>
                  <span>{selectedPODetails.paymentTerms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-kitchen-muted-foreground">Requestor:</span>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-kitchen-muted-foreground" />
                    <span>{selectedPODetails.requestor}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Items</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {selectedPODetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-kitchen-border">
                      <span className="text-sm">{item.item.name}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">{item.quantity}{item.item.unit} × ${item.price.toFixed(2)}</div>
                        <div className="text-xs text-kitchen-muted-foreground">${item.total.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-kitchen-muted/20 p-3 rounded-md">
                <div className="flex items-start gap-2">
                  <DollarSign className="h-5 w-5 text-kitchen-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Budget Impact</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-full bg-kitchen-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            selectedPODetails.budgetImpact > 5 ? 'bg-kitchen-warning' : 'bg-kitchen-success'
                          }`}
                          style={{ width: `${Math.min(100, selectedPODetails.budgetImpact * 5)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{selectedPODetails.budgetImpact}%</span>
                    </div>
                    <p className="text-xs text-kitchen-muted-foreground mt-1">
                      This order represents {selectedPODetails.budgetImpact}% of your weekly procurement budget.
                    </p>
                  </div>
                </div>
              </div>

              {selectedPODetails.notes && (
                <div>
                  <Label className="text-sm">Order Notes</Label>
                  <div className="mt-1 p-2 bg-kitchen-muted/10 rounded-md text-sm">
                    {selectedPODetails.notes}
                  </div>
                </div>
              )}
              
              <div className="flex gap-3 pt-2">
                <Button 
                  className="flex-1 bg-kitchen-success hover:bg-kitchen-success/90"
                  disabled={!isWithinApprovalLimit(selectedPODetails.totalAmount)}
                  onClick={() => handleApprove(selectedPODetails.id)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-kitchen-danger text-kitchen-danger hover:bg-kitchen-danger/10"
                  onClick={() => handleReject(selectedPODetails.id)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
              
              {!isWithinApprovalLimit(selectedPODetails.totalAmount) && (
                <p className="text-xs text-kitchen-danger">
                  This order exceeds your approval limit of ${getCurrentUserApprovalLimit().toFixed(2)}. 
                  Please forward to a manager with higher approval authority.
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-apple-sm flex items-center justify-center p-6 h-full">
            <div className="text-center text-kitchen-muted-foreground">
              <BarChart className="h-12 w-12 mx-auto mb-3 text-kitchen-muted" />
              <h3 className="font-medium text-lg text-kitchen-foreground">Select an Order</h3>
              <p className="mt-1">
                Choose a purchase order from the list to view details and take action.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PurchaseOrderApproval;
