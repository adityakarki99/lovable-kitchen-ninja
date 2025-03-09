
import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, AlertCircle, FileCheck, FileText, Truck, Clock, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock data for Three-Way Matching
const matchingData = [
  {
    id: 'MATCH-1001',
    poNumber: 'PO-2305',
    roNumber: 'RO-4501',
    invoiceNumber: 'INV-7801',
    supplier: 'Fresh Produce Co.',
    dateOrdered: '2023-07-15',
    dateDelivered: '2023-07-18',
    dateInvoiced: '2023-07-19',
    status: 'Matched',
    poTotal: 445.18,
    roTotal: 445.18,
    invoiceTotal: 445.18,
    matchPercentage: 100,
    discrepancies: [],
    approver: 'James Wilson',
    approvalStatus: 'Approved',
    paymentStatus: 'Paid'
  },
  {
    id: 'MATCH-1002',
    poNumber: 'PO-2304',
    roNumber: 'RO-4502',
    invoiceNumber: 'INV-7802',
    supplier: 'Premium Meats',
    dateOrdered: '2023-07-14',
    dateDelivered: '2023-07-19',
    dateInvoiced: '2023-07-20',
    status: 'Partial Match',
    poTotal: 1255.70,
    roTotal: 1180.30,
    invoiceTotal: 1255.70,
    matchPercentage: 70,
    discrepancies: [
      { type: 'Quantity', item: 'Beef Sirloin', expected: '15kg', received: '12kg', difference: -75.40 }
    ],
    approver: 'Michael Brown',
    approvalStatus: 'Pending',
    paymentStatus: 'On Hold'
  },
  {
    id: 'MATCH-1003',
    poNumber: 'PO-2303',
    roNumber: 'RO-4503',
    invoiceNumber: 'INV-7803',
    supplier: 'Seafood Direct',
    dateOrdered: '2023-07-13',
    dateDelivered: '2023-07-16',
    dateInvoiced: '2023-07-17',
    status: 'Discrepancy',
    poTotal: 852.35,
    roTotal: 852.35,
    invoiceTotal: 895.60,
    matchPercentage: 30,
    discrepancies: [
      { type: 'Price', item: 'Salmon Fillet', expected: '$15.50/kg', billed: '$17.20/kg', difference: 43.25 }
    ],
    approver: 'Sarah Davis',
    approvalStatus: 'Rejected',
    paymentStatus: 'Disputed'
  },
  {
    id: 'MATCH-1004',
    poNumber: 'PO-2302',
    roNumber: 'RO-4504',
    invoiceNumber: 'INV-7804',
    supplier: 'Global Spices',
    dateOrdered: '2023-07-12',
    dateDelivered: '2023-07-19',
    dateInvoiced: '2023-07-21',
    status: 'Incomplete',
    poTotal: 320.80,
    roTotal: 320.80,
    invoiceTotal: null,
    matchPercentage: 50,
    discrepancies: [
      { type: 'Missing Invoice', item: 'N/A', expected: 'Invoice Document', received: 'Not Received', difference: null }
    ],
    approver: 'Pending',
    approvalStatus: 'Awaiting Invoice',
    paymentStatus: 'Not Started'
  },
  {
    id: 'MATCH-1005',
    poNumber: 'PO-2301',
    roNumber: 'RO-4505',
    invoiceNumber: 'INV-7805',
    supplier: 'Bakery Supplies Inc.',
    dateOrdered: '2023-07-11',
    dateDelivered: '2023-07-14',
    dateInvoiced: '2023-07-15',
    status: 'Matched',
    poTotal: 645.90,
    roTotal: 645.90,
    invoiceTotal: 645.90,
    matchPercentage: 100,
    discrepancies: [],
    approver: 'James Wilson',
    approvalStatus: 'Approved',
    paymentStatus: 'Paid'
  },
];

// Mock metrics for Three-Way Matching dashboard
const matchingMetrics = [
  {
    title: "Matched Invoices",
    value: "87%",
    description: "Last 30 days",
    trend: "up"
  },
  {
    title: "Average Resolution Time",
    value: "1.5 days",
    description: "For discrepancies",
    trend: "down"
  },
  {
    title: "Cost Savings",
    value: "$1,245.82",
    description: "From invoice corrections",
    trend: "up"
  },
  {
    title: "Pending Approvals",
    value: "3",
    description: "Requiring attention",
    trend: "neutral"
  }
];

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  description, 
  trend,
  className
}) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-kitchen-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && <p className="text-sm text-kitchen-muted-foreground mt-1">{description}</p>}
          </div>
          <div className={cn(
            "rounded-full p-2",
            trend === 'up' ? "bg-kitchen-success/10" : 
            trend === 'down' ? "bg-kitchen-danger/10" : 
            "bg-kitchen-muted"
          )}>
            {trend === 'up' && <CheckCircle className="h-5 w-5 text-kitchen-success" />}
            {trend === 'down' && <Clock className="h-5 w-5 text-kitchen-danger" />}
            {trend === 'neutral' && <AlertCircle className="h-5 w-5 text-kitchen-muted-foreground" />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ThreeWayMatching: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const { toast } = useToast();
  
  const filteredMatches = matchingData.filter(match => 
    match.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase() || '')
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Matched':
        return <CheckCircle className="h-4 w-4 text-kitchen-success" />;
      case 'Partial Match':
        return <AlertCircle className="h-4 w-4 text-kitchen-warning" />;
      case 'Discrepancy':
        return <XCircle className="h-4 w-4 text-kitchen-danger" />;
      case 'Incomplete':
        return <Clock className="h-4 w-4 text-kitchen-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Matched':
        return "bg-kitchen-success/10 text-kitchen-success";
      case 'Partial Match':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      case 'Discrepancy':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      case 'Incomplete':
        return "bg-kitchen-muted text-kitchen-muted-foreground";
      default:
        return "";
    }
  };

  const getApprovalStatusClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return "bg-kitchen-success/10 text-kitchen-success";
      case 'Pending':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      case 'Rejected':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      case 'Awaiting Invoice':
        return "bg-kitchen-muted text-kitchen-muted-foreground";
      default:
        return "";
    }
  };

  const getPaymentStatusClass = (status: string) => {
    switch (status) {
      case 'Paid':
        return "bg-kitchen-success/10 text-kitchen-success";
      case 'On Hold':
        return "bg-kitchen-warning/10 text-kitchen-warning";
      case 'Disputed':
        return "bg-kitchen-danger/10 text-kitchen-danger";
      case 'Not Started':
        return "bg-kitchen-muted text-kitchen-muted-foreground";
      default:
        return "";
    }
  };

  const handleRowClick = (id: string) => {
    setSelectedMatch(id === selectedMatch ? null : id);
  };

  const handleApprove = (id: string) => {
    toast({
      title: "Invoice Approved",
      description: `Match ID ${id} has been approved for payment.`,
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Invoice Rejected",
      description: `Match ID ${id} has been rejected and returned to supplier.`,
      variant: "destructive"
    });
  };

  const handleResolution = (id: string) => {
    toast({
      title: "Discrepancy Resolved",
      description: `A credit note has been generated for the discrepancy in ${id}.`,
    });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {matchingMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            trend={metric.trend as 'up' | 'down' | 'neutral'}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-72 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
          <Input
            placeholder="Search matching records..."
            className="pl-9 bg-white border-kitchen-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-kitchen-foreground">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="bg-kitchen-primary hover:bg-kitchen-primary/90">
            Manual Match
          </Button>
        </div>
      </div>
      
      <Card className="shadow-apple-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-kitchen-muted">
            <TableRow>
              <TableHead className="font-medium">Match ID</TableHead>
              <TableHead className="font-medium">Supplier</TableHead>
              <TableHead className="font-medium">PO Number</TableHead>
              <TableHead className="font-medium">RO Number</TableHead>
              <TableHead className="font-medium">Invoice</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium text-right">Match %</TableHead>
              <TableHead className="font-medium"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMatches.map((match) => (
              <React.Fragment key={match.id}>
                <TableRow 
                  className={cn(
                    "hover:bg-kitchen-muted/30 cursor-pointer",
                    selectedMatch === match.id ? "bg-kitchen-muted/30" : ""
                  )}
                  onClick={() => handleRowClick(match.id)}
                >
                  <TableCell className="font-medium">{match.id}</TableCell>
                  <TableCell>{match.supplier}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5 text-kitchen-muted-foreground" />
                      {match.poNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5 text-kitchen-muted-foreground" />
                      {match.roNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FileCheck className="h-3.5 w-3.5 text-kitchen-muted-foreground" />
                      {match.invoiceNumber || "Not Received"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={cn(
                      "pill-badge inline-flex items-center gap-1",
                      getStatusClass(match.status)
                    )}>
                      {getStatusIcon(match.status)}
                      {match.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={match.matchPercentage} className="h-2 w-20" />
                      <span className="text-xs font-medium">{match.matchPercentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMatch(match.id === selectedMatch ? null : match.id);
                      }}
                    >
                      <svg 
                        width="15" 
                        height="15" 
                        viewBox="0 0 15 15" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className={cn(
                          "transition-transform duration-200",
                          selectedMatch === match.id ? "rotate-180" : ""
                        )}
                      >
                        <path 
                          d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
                
                {selectedMatch === match.id && (
                  <TableRow className="bg-kitchen-muted/10">
                    <TableCell colSpan={8} className="p-0">
                      <div className="px-4 py-4 border-t border-kitchen-border">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="space-y-4">
                            <h3 className="text-sm font-semibold flex items-center">
                              <FileText className="h-4 w-4 mr-2" />
                              Purchase Order Details
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-kitchen-muted-foreground">PO Number:</span>
                                <span className="font-medium">{match.poNumber}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-kitchen-muted-foreground">Date Ordered:</span>
                                <span>{match.dateOrdered}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-kitchen-muted-foreground">Total Value:</span>
                                <span className="font-medium">${match.poTotal.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-sm font-semibold flex items-center">
                              <Truck className="h-4 w-4 mr-2" />
                              Receiving Order Details
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-kitchen-muted-foreground">RO Number:</span>
                                <span className="font-medium">{match.roNumber}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-kitchen-muted-foreground">Date Delivered:</span>
                                <span>{match.dateDelivered}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-kitchen-muted-foreground">Received Value:</span>
                                <span className="font-medium">${match.roTotal.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-sm font-semibold flex items-center">
                              <FileCheck className="h-4 w-4 mr-2" />
                              Invoice Details
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-kitchen-muted-foreground">Invoice Number:</span>
                                <span className="font-medium">{match.invoiceNumber || "Not Received"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-kitchen-muted-foreground">Date Invoiced:</span>
                                <span>{match.dateInvoiced || "N/A"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-kitchen-muted-foreground">Invoiced Value:</span>
                                <span className="font-medium">
                                  {match.invoiceTotal ? `$${match.invoiceTotal.toFixed(2)}` : "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {match.discrepancies.length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-sm font-semibold mb-3">Discrepancies Found</h3>
                            <div className="bg-kitchen-danger/5 border border-kitchen-danger/20 rounded-md p-3">
                              {match.discrepancies.map((d, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                                  <div>
                                    <span className="font-medium">{d.type}</span>
                                    {d.item !== 'N/A' && <span className="text-kitchen-muted-foreground"> in {d.item}</span>}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span>Expected: {d.expected}</span>
                                    <span>•</span>
                                    <span>Actual: {d.received || d.billed}</span>
                                    {d.difference && (
                                      <>
                                        <span>•</span>
                                        <span className="text-kitchen-danger font-medium">
                                          Difference: ${d.difference.toFixed(2)}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col space-y-1">
                            <span className="text-xs text-kitchen-muted-foreground">Approval Status</span>
                            <Badge 
                              className={cn(
                                "w-fit",
                                getApprovalStatusClass(match.approvalStatus)
                              )}
                            >
                              {match.approvalStatus}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-col space-y-1">
                            <span className="text-xs text-kitchen-muted-foreground">Payment Status</span>
                            <Badge 
                              className={cn(
                                "w-fit",
                                getPaymentStatusClass(match.paymentStatus)
                              )}
                            >
                              {match.paymentStatus}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-col space-y-1">
                            <span className="text-xs text-kitchen-muted-foreground">Approver</span>
                            <div className="flex items-center">
                              <User className="h-3.5 w-3.5 mr-1 text-kitchen-muted-foreground" />
                              <span>{match.approver}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end gap-2">
                          {match.status === 'Discrepancy' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleResolution(match.id)}
                            >
                              Resolve Discrepancy
                            </Button>
                          )}
                          {match.approvalStatus === 'Pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleReject(match.id)}
                                className="text-kitchen-danger border-kitchen-danger/20 hover:bg-kitchen-danger/10"
                              >
                                Reject
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-kitchen-success hover:bg-kitchen-success/90"
                                onClick={() => handleApprove(match.id)}
                              >
                                Approve
                              </Button>
                            </>
                          )}
                          {match.status === 'Matched' && match.approvalStatus === 'Approved' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-kitchen-success"
                              disabled
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Fully Matched & Approved
                            </Button>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ThreeWayMatching;
