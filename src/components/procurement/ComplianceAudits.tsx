import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Filter, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Download, 
  Calendar,
  Settings,
  ShieldCheck,
  CircleAlert
} from 'lucide-react';

// Mock audit records
const auditRecords = [
  {
    id: 'AUDIT-2023-001',
    date: '2023-11-15',
    type: 'Supplier Compliance',
    status: 'Completed',
    findingCount: 2,
    criticalIssues: 0,
    assignedTo: 'Sarah Johnson',
    nextReview: '2024-05-15',
    compliance: 96
  },
  {
    id: 'AUDIT-2023-002',
    date: '2023-12-05',
    type: 'Food Safety',
    status: 'Completed',
    findingCount: 1,
    criticalIssues: 0,
    assignedTo: 'Michael Brown',
    nextReview: '2024-03-05',
    compliance: 98
  },
  {
    id: 'AUDIT-2024-001',
    date: '2024-02-20',
    type: 'Inventory Accuracy',
    status: 'Completed',
    findingCount: 4,
    criticalIssues: 1,
    assignedTo: 'David Lee',
    nextReview: '2024-05-20',
    compliance: 91
  },
  {
    id: 'AUDIT-2024-002',
    date: '2024-03-10',
    type: 'HACCP Compliance',
    status: 'In Progress',
    findingCount: 0,
    criticalIssues: 0,
    assignedTo: 'Maria Garcia',
    nextReview: null,
    compliance: 75
  },
  {
    id: 'AUDIT-2024-003',
    date: '2024-03-25',
    type: 'Purchasing Policy',
    status: 'Scheduled',
    findingCount: 0,
    criticalIssues: 0,
    assignedTo: 'John Smith',
    nextReview: null,
    compliance: 0
  }
];

// Mock compliance requirements
const complianceRequirements = [
  {
    id: 1,
    category: 'Food Safety',
    requirement: 'Supplier HACCP Certification',
    description: 'All food suppliers must provide current HACCP certification',
    frequency: 'Annual',
    deadline: '2024-06-30',
    status: 'Compliant'
  },
  {
    id: 2,
    category: 'Food Safety',
    requirement: 'Allergen Management Plan',
    description: 'Documentation of allergen control procedures from suppliers',
    frequency: 'Bi-annual',
    deadline: '2024-05-15',
    status: 'Pending Review'
  },
  {
    id: 3,
    category: 'Quality Assurance',
    requirement: 'Product Quality Testing',
    description: 'Regular testing of high-risk ingredients',
    frequency: 'Quarterly',
    deadline: '2024-04-01',
    status: 'Due Soon'
  },
  {
    id: 4,
    category: 'Legal',
    requirement: 'Labor Practices Compliance',
    description: 'Suppliers must certify compliance with fair labor practices',
    frequency: 'Annual',
    deadline: '2024-12-31',
    status: 'Compliant'
  },
  {
    id: 5,
    category: 'Environmental',
    requirement: 'Sustainability Certification',
    description: 'Key suppliers must provide sustainability documentation',
    frequency: 'Annual',
    deadline: '2024-09-15',
    status: 'Not Started'
  }
];

// Mock findings for audits
const auditFindings = [
  {
    id: 'FIND-001',
    auditId: 'AUDIT-2023-001',
    description: 'Missing temperature logs for cold storage',
    severity: 'Medium',
    status: 'Resolved',
    assignedTo: 'David Lee',
    dueDate: '2023-11-30',
    closedDate: '2023-11-28'
  },
  {
    id: 'FIND-002',
    auditId: 'AUDIT-2023-001',
    description: 'Incomplete supplier documentation for new vendor',
    severity: 'Low',
    status: 'Resolved',
    assignedTo: 'Sarah Johnson',
    dueDate: '2023-12-15',
    closedDate: '2023-12-10'
  },
  {
    id: 'FIND-003',
    auditId: 'AUDIT-2023-002',
    description: 'Staff training records not up to date',
    severity: 'Medium',
    status: 'Resolved',
    assignedTo: 'Maria Garcia',
    dueDate: '2023-12-20',
    closedDate: '2023-12-18'
  },
  {
    id: 'FIND-004',
    auditId: 'AUDIT-2024-001',
    description: 'Significant variance in dry goods inventory',
    severity: 'Critical',
    status: 'In Progress',
    assignedTo: 'John Smith',
    dueDate: '2024-03-15',
    closedDate: null
  },
  {
    id: 'FIND-005',
    auditId: 'AUDIT-2024-001',
    description: 'Improper storage of high-value items',
    severity: 'Medium',
    status: 'In Progress',
    assignedTo: 'Michael Brown',
    dueDate: '2024-03-10',
    closedDate: null
  }
];

const ComplianceAudits: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAudit, setSelectedAudit] = useState<string | null>(null);
  
  const filteredAudits = auditRecords.filter(audit => 
    audit.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    audit.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    audit.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedAuditData = selectedAudit ? 
    auditRecords.find(audit => audit.id === selectedAudit) : null;
  
  const selectedAuditFindings = selectedAudit ? 
    auditFindings.filter(finding => finding.auditId === selectedAudit) : [];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-kitchen-success">{status}</Badge>;
      case 'In Progress':
        return <Badge className="bg-kitchen-warning">{status}</Badge>;
      case 'Scheduled':
        return <Badge className="bg-kitchen-muted-foreground">{status}</Badge>;
      case 'Compliant':
        return <Badge className="bg-kitchen-success">{status}</Badge>;
      case 'Pending Review':
        return <Badge className="bg-kitchen-warning">{status}</Badge>;
      case 'Due Soon':
        return <Badge className="bg-kitchen-warning/90">{status}</Badge>;
      case 'Not Started':
        return <Badge variant="outline">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <Badge className="bg-kitchen-danger">{severity}</Badge>;
      case 'High':
        return <Badge className="bg-kitchen-danger/80">{severity}</Badge>;
      case 'Medium':
        return <Badge className="bg-kitchen-warning">{severity}</Badge>;
      case 'Low':
        return <Badge className="bg-kitchen-muted-foreground">{severity}</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };
  
  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return <Badge className="bg-kitchen-success">{status}</Badge>;
      case 'In Progress':
        return <Badge className="bg-kitchen-warning">{status}</Badge>;
      case 'Open':
        return <Badge variant="outline" className="text-kitchen-danger border-kitchen-danger">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const handleScheduleAudit = () => {
    toast.success("New audit scheduled successfully");
  };
  
  const handleExportAudit = (auditId: string) => {
    toast.success(`Audit ${auditId} report exported`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="audits" className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="audits">Audit Records</TabsTrigger>
          <TabsTrigger value="requirements">Compliance Requirements</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>
        
        {/* Audit Records Tab */}
        <TabsContent value="audits" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Audit Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
                    <Input
                      placeholder="Search audits..."
                      className="pl-9 bg-white border-kitchen-border"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                    {filteredAudits.map(audit => (
                      <div 
                        key={audit.id}
                        className={cn(
                          "p-3 border rounded-md cursor-pointer transition-all",
                          selectedAudit === audit.id 
                            ? "border-kitchen-primary bg-kitchen-primary/5" 
                            : "border-kitchen-border hover:border-kitchen-primary/50"
                        )}
                        onClick={() => setSelectedAudit(audit.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{audit.id}</h3>
                            <p className="text-sm text-kitchen-muted-foreground mt-1">{audit.type}</p>
                          </div>
                          {getStatusBadge(audit.status)}
                        </div>
                        <div className="mt-2 text-sm">
                          <div className="flex justify-between text-kitchen-muted-foreground">
                            <span>Date: {formatDate(audit.date)}</span>
                            <span>Findings: {audit.findingCount}</span>
                          </div>
                        </div>
                        {audit.compliance > 0 && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Compliance</span>
                              <span className={cn(
                                audit.compliance >= 95 ? "text-kitchen-success" :
                                audit.compliance >= 80 ? "text-kitchen-warning" :
                                "text-kitchen-danger"
                              )}>{audit.compliance}%</span>
                            </div>
                            <Progress 
                              value={audit.compliance} 
                              className={cn(
                                "h-1.5",
                                audit.compliance >= 95 ? "bg-kitchen-success" :
                                audit.compliance >= 80 ? "bg-kitchen-warning" :
                                "bg-kitchen-danger"
                              )}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full" onClick={handleScheduleAudit}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule New Audit
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              {selectedAuditData ? (
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-xl">{selectedAuditData.id}: {selectedAuditData.type}</CardTitle>
                      <p className="text-sm text-kitchen-muted-foreground mt-1">
                        {formatDate(selectedAuditData.date)} • Assigned to {selectedAuditData.assignedTo}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleExportAudit(selectedAuditData.id)}>
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-kitchen-muted/30 p-3 rounded-md">
                        <div className="text-kitchen-muted-foreground text-sm">Status</div>
                        <div className="font-medium mt-1">{getStatusBadge(selectedAuditData.status)}</div>
                      </div>
                      <div className="bg-kitchen-muted/30 p-3 rounded-md">
                        <div className="text-kitchen-muted-foreground text-sm">Findings</div>
                        <div className="font-medium mt-1">{selectedAuditData.findingCount}</div>
                      </div>
                      <div className="bg-kitchen-muted/30 p-3 rounded-md">
                        <div className="text-kitchen-muted-foreground text-sm">Critical Issues</div>
                        <div className={cn("font-medium mt-1", selectedAuditData.criticalIssues > 0 ? "text-kitchen-danger" : "")}>
                          {selectedAuditData.criticalIssues}
                        </div>
                      </div>
                      <div className="bg-kitchen-muted/30 p-3 rounded-md">
                        <div className="text-kitchen-muted-foreground text-sm">Next Review</div>
                        <div className="font-medium mt-1">{selectedAuditData.nextReview ? formatDate(selectedAuditData.nextReview) : 'N/A'}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Compliance Score</h3>
                      <div className="flex items-center gap-3">
                        <Progress 
                          value={selectedAuditData.compliance} 
                          className={cn(
                            "h-3 flex-1",
                            selectedAuditData.compliance >= 95 ? "bg-kitchen-success" :
                            selectedAuditData.compliance >= 80 ? "bg-kitchen-warning" :
                            "bg-kitchen-danger"
                          )} 
                        />
                        <span className={cn(
                          "font-medium",
                          selectedAuditData.compliance >= 95 ? "text-kitchen-success" :
                          selectedAuditData.compliance >= 80 ? "text-kitchen-warning" :
                          "text-kitchen-danger"
                        )}>
                          {selectedAuditData.compliance}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Findings & Action Items</h3>
                      {selectedAuditFindings.length > 0 ? (
                        <Table>
                          <TableHeader className="bg-kitchen-muted">
                            <TableRow>
                              <TableHead className="w-[300px]">Description</TableHead>
                              <TableHead>Severity</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Assigned To</TableHead>
                              <TableHead>Due Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedAuditFindings.map(finding => (
                              <TableRow key={finding.id}>
                                <TableCell>{finding.description}</TableCell>
                                <TableCell>{getSeverityBadge(finding.severity)}</TableCell>
                                <TableCell>{getTaskStatusBadge(finding.status)}</TableCell>
                                <TableCell>{finding.assignedTo}</TableCell>
                                <TableCell>{formatDate(finding.dueDate)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-6 text-kitchen-muted-foreground bg-kitchen-muted/20 rounded-md">
                          No findings for this audit
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center py-12">
                  <div className="text-center max-w-md">
                    <FileCheck className="h-12 w-12 mx-auto text-kitchen-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium">Audit Details</h3>
                    <p className="text-kitchen-muted-foreground mt-2">
                      Select an audit from the list to view detailed information, findings, and action items.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Compliance Requirements Tab */}
        <TabsContent value="requirements" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl">Compliance Requirements</CardTitle>
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Configure Requirements
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-kitchen-muted">
                  <TableRow>
                    <TableHead className="w-[200px]">Category</TableHead>
                    <TableHead className="w-[250px]">Requirement</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceRequirements.map(req => (
                    <TableRow key={req.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {req.category === 'Food Safety' ? (
                            <ShieldCheck className="h-4 w-4 text-kitchen-success" />
                          ) : req.category === 'Quality Assurance' ? (
                            <CheckCircle className="h-4 w-4 text-kitchen-primary" />
                          ) : req.category === 'Legal' ? (
                            <FileCheck className="h-4 w-4 text-kitchen-foreground" />
                          ) : (
                            <CircleAlert className="h-4 w-4 text-kitchen-muted-foreground" />
                          )}
                          {req.category}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{req.requirement}</TableCell>
                      <TableCell>{req.description}</TableCell>
                      <TableCell>{req.frequency}</TableCell>
                      <TableCell>{formatDate(req.deadline)}</TableCell>
                      <TableCell>{getStatusBadge(req.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Reports & Analytics Tab */}
        <TabsContent value="reports" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overall Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold mb-2">94%</div>
                  <Progress value={94} className="h-2 w-full bg-kitchen-success" />
                  <p className="text-sm text-kitchen-muted-foreground mt-2">Based on recent 5 audits</p>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Food Safety</span>
                      <span className="font-medium text-kitchen-success">98%</span>
                    </div>
                    <Progress value={98} className="h-1.5 bg-kitchen-success" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Supplier Management</span>
                      <span className="font-medium text-kitchen-success">95%</span>
                    </div>
                    <Progress value={95} className="h-1.5 bg-kitchen-success" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Inventory Accuracy</span>
                      <span className="font-medium text-kitchen-warning">87%</span>
                    </div>
                    <Progress value={87} className="h-1.5 bg-kitchen-warning" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Documentation</span>
                      <span className="font-medium text-kitchen-warning">90%</span>
                    </div>
                    <Progress value={90} className="h-1.5 bg-kitchen-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Open Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-kitchen-danger" />
                      <div>
                        <div className="font-medium">Critical Issues</div>
                        <div className="text-sm text-kitchen-muted-foreground">Require immediate attention</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-kitchen-danger">1</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-kitchen-warning" />
                      <div>
                        <div className="font-medium">Issues Past Due</div>
                        <div className="text-sm text-kitchen-muted-foreground">Past remediation deadline</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-kitchen-warning">3</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-kitchen-muted-foreground" />
                      <div>
                        <div className="font-medium">Issues Due Soon</div>
                        <div className="text-sm text-kitchen-muted-foreground">Due within 7 days</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold">5</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-kitchen-border space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-kitchen-danger font-medium">Variance in dry goods</span>
                    <span>Due: Mar 15</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-kitchen-warning font-medium">Missing supplier documentation</span>
                    <span>Due: Mar 10</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Update HACCP procedures</span>
                    <span>Due: Mar 30</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {complianceRequirements
                    .filter(req => req.status === 'Due Soon' || req.status === 'Not Started')
                    .map(req => (
                      <div key={req.id} className="border-b border-kitchen-border pb-3 last:border-0">
                        <div className="font-medium">{req.requirement}</div>
                        <div className="text-sm text-kitchen-muted-foreground">{req.category}</div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm">Due: {formatDate(req.deadline)}</div>
                          {getStatusBadge(req.status)}
                        </div>
                      </div>
                    ))}
                  
                  <div className="border-b border-kitchen-border pb-3 last:border-0">
                    <div className="font-medium">Quarterly Supplier Review</div>
                    <div className="text-sm text-kitchen-muted-foreground">Supplier Management</div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm">Due: Apr 15, 2024</div>
                      <Badge className="bg-kitchen-warning/90">Due Soon</Badge>
                    </div>
                  </div>
                  
                  <div className="border-b border-kitchen-border pb-3 last:border-0">
                    <div className="font-medium">Staff Training Certification</div>
                    <div className="text-sm text-kitchen-muted-foreground">Food Safety</div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm">Due: Apr 30, 2024</div>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-6">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Full Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceAudits;
