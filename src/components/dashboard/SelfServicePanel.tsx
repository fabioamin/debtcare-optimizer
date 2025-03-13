
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Upload, 
  Clock,
  ClipboardList
} from "lucide-react";

const SelfServicePanel = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleAction = (action: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Action completed",
        description: `${action} was successful.`
      });
    }, 1000);
  };

  return (
    <Tabs defaultValue="documents" className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="documents" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Documents</span>
        </TabsTrigger>
        <TabsTrigger value="statements" className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          <span className="hidden sm:inline">Statements</span>
        </TabsTrigger>
        <TabsTrigger value="payments" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Payment History</span>
        </TabsTrigger>
        <TabsTrigger value="requests" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="hidden sm:inline">Service Requests</span>
        </TabsTrigger>
      </TabsList>

      {/* Documents Tab */}
      <TabsContent value="documents">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Documents</CardTitle>
              <CardDescription>
                Access important documents related to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Loan Agreement</p>
                      <p className="text-xs text-muted-foreground">Updated on Jan 15, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleAction("Document download")}>
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Payment Schedule</p>
                      <p className="text-xs text-muted-foreground">Updated on Feb 03, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleAction("Document download")}>
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Tax Certificate</p>
                      <p className="text-xs text-muted-foreground">Updated on Mar 20, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleAction("Document download")}>
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Submit required documents for processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium mb-1">Drag and drop files here</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Support for PDF, JPG, PNG up to 10MB
                  </p>
                  <Button variant="outline" size="sm" className="mx-auto">
                    Browse files
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Required Documents:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Proof of income</li>
                    <li>Identification</li>
                    <li>Proof of address</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Statements Tab */}
      <TabsContent value="statements">
        <Card>
          <CardHeader>
            <CardTitle>Account Statements</CardTitle>
            <CardDescription>
              Access your monthly statements and transaction history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6].map((month) => (
                  <div key={month} className="border rounded-md p-4 text-center">
                    <ClipboardList className="h-6 w-6 mx-auto text-primary mb-2" />
                    <p className="text-sm font-medium">Statement {month}/2023</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 w-full"
                      onClick={() => handleAction("Statement download")}
                    >
                      <Download className="h-3 w-3 mr-1" /> Download
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline">Load Previous Statements</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Payment History Tab */}
      <TabsContent value="payments">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              View your past payments and transaction details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left">Date</th>
                      <th className="py-3 text-left">Description</th>
                      <th className="py-3 text-left">Amount</th>
                      <th className="py-3 text-left">Status</th>
                      <th className="py-3 text-left">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { date: "May 10, 2023", desc: "Monthly Payment", amount: "$250.00", status: "Completed" },
                      { date: "Apr 10, 2023", desc: "Monthly Payment", amount: "$250.00", status: "Completed" },
                      { date: "Mar 10, 2023", desc: "Monthly Payment", amount: "$250.00", status: "Completed" },
                      { date: "Feb 10, 2023", desc: "Monthly Payment", amount: "$250.00", status: "Completed" },
                      { date: "Jan 10, 2023", desc: "Monthly Payment", amount: "$250.00", status: "Completed" }
                    ].map((payment, i) => (
                      <tr key={i}>
                        <td className="py-3">{payment.date}</td>
                        <td className="py-3">{payment.desc}</td>
                        <td className="py-3">{payment.amount}</td>
                        <td className="py-3">
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700">
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleAction("Receipt download")}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline">View More Transactions</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Service Requests Tab */}
      <TabsContent value="requests">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Service Requests</CardTitle>
              <CardDescription>
                Submit and track your service requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Payment Extension Request</p>
                      <p className="text-xs text-muted-foreground mt-1">Submitted on May 5, 2023</p>
                    </div>
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-700">
                      In Progress
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your request for a payment extension is being reviewed. We'll notify you once it's processed.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Address Change</p>
                      <p className="text-xs text-muted-foreground mt-1">Submitted on Apr 15, 2023</p>
                    </div>
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700">
                      Completed
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your address has been updated successfully in our system.
                  </p>
                </div>
                
                <Button className="w-full">Create New Request</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Services</CardTitle>
              <CardDescription>
                Access common self-service actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start" onClick={() => handleAction("Payment calculation")}>
                  <Clock className="h-4 w-4 mr-2" />
                  Calculate payoff amount
                </Button>
                
                <Button variant="outline" className="justify-start" onClick={() => handleAction("Payment schedule")}>
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Request payment schedule
                </Button>
                
                <Button variant="outline" className="justify-start" onClick={() => handleAction("Address update")}>
                  <Upload className="h-4 w-4 mr-2" />
                  Update contact information
                </Button>
                
                <Button variant="outline" className="justify-start" onClick={() => handleAction("Auto-pay")}>
                  <Clock className="h-4 w-4 mr-2" />
                  Set up automatic payments
                </Button>
                
                <Button variant="outline" className="justify-start" onClick={() => handleAction("Hardship")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Request hardship assistance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SelfServicePanel;
