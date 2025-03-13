
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Workflow, GitBranch, Share, Shuffle, Code, Box, ArrowsUpFromLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "draft";
  category: "collection" | "communication" | "payment" | "integration";
  lastRun: string;
  icon: any;
}

const WorkflowsPanel = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");

  const workflows: WorkflowItem[] = [
    {
      id: "wf1",
      name: "Late Payment Reminder",
      description: "Automatically send reminders when payments are overdue",
      status: "active",
      category: "collection",
      lastRun: "2023-08-15",
      icon: Workflow
    },
    {
      id: "wf2",
      name: "Payment Plan Setup",
      description: "Creates payment plans based on customer financial situation",
      status: "active",
      category: "payment",
      lastRun: "2023-08-14",
      icon: Share
    },
    {
      id: "wf3",
      name: "API Integration Flow",
      description: "Connect with external collection systems via API",
      status: "draft",
      category: "integration",
      icon: Code
    },
    {
      id: "wf4",
      name: "Communication Escalation",
      description: "Escalate communication based on customer responsiveness",
      status: "paused",
      category: "communication",
      lastRun: "2023-07-30",
      icon: GitBranch
    },
    {
      id: "wf5",
      name: "Data Sync Workflow",
      description: "Synchronize customer data across multiple systems",
      status: "active",
      category: "integration",
      lastRun: "2023-08-16",
      icon: Shuffle
    },
    {
      id: "wf6",
      name: "Payment Method Update",
      description: "Update customer payment methods when they expire",
      status: "active",
      category: "payment",
      lastRun: "2023-08-10",
      icon: ArrowsUpFromLine
    }
  ];

  const handleActivateWorkflow = (workflowId: string) => {
    toast({
      title: "Workflow Activated",
      description: `Workflow ${workflowId} has been activated successfully.`,
    });
  };

  const handleEditWorkflow = (workflowId: string) => {
    toast({
      title: "Edit Workflow",
      description: `Opening workflow editor for ${workflowId}.`,
    });
  };

  const filteredWorkflows = activeTab === "all" 
    ? workflows 
    : workflows.filter(workflow => workflow.category === activeTab);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Automated Workflows</h1>
            <p className="text-muted-foreground mt-1">
              Create, manage and monitor your business process automations
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Workflow className="mr-2 h-4 w-4" />
            Create New Workflow
          </Button>
        </div>
      </div>

      {/* Workflow Categories */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All Workflows</TabsTrigger>
          <TabsTrigger value="collection">Collection</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkflows.map((workflow) => (
              <Card key={workflow.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <workflow.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    </div>
                    <Badge 
                      variant={
                        workflow.status === "active" ? "default" : 
                        workflow.status === "paused" ? "outline" : "secondary"
                      }
                    >
                      {workflow.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm mt-2">{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  {workflow.lastRun && (
                    <div className="text-xs text-muted-foreground">
                      Last run: {workflow.lastRun}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-3 bg-muted/30">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditWorkflow(workflow.id)}
                  >
                    Edit
                  </Button>
                  {workflow.status !== "active" ? (
                    <Button 
                      size="sm"
                      onClick={() => handleActivateWorkflow(workflow.id)}
                    >
                      Activate
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      Run Now
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowsPanel;
