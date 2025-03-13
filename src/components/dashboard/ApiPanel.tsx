
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Code, Webhook, Network, Key, GitBranch, Puzzle, Terminal, Share } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import ApiEndpointCard from "./api/ApiEndpointCard";
import ApiKeyManagement from "./api/ApiKeyManagement";
import ApiDocumentation from "./api/ApiDocumentation";

const ApiPanel = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("endpoints");

  const handleCopyEndpoint = (endpoint: string) => {
    navigator.clipboard.writeText(endpoint);
    toast({
      title: "Endpoint copied",
      description: "API endpoint URL copied to clipboard",
    });
  };

  const handleRegenerateKey = (keyId: string) => {
    toast({
      title: "Key Regenerated",
      description: `API key ${keyId} has been regenerated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">API Integration Portal</h1>
            <p className="text-muted-foreground mt-1">
              Connect your systems directly to our platform with secure API access
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Terminal className="mr-2 h-4 w-4" />
            Request API Access
          </Button>
        </div>
      </div>

      {/* API Tabs */}
      <Tabs defaultValue="endpoints" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        {/* Endpoints Tab */}
        <TabsContent value="endpoints" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ApiEndpointCard 
              title="Collection API"
              description="Access and manage collection accounts, payment plans, and activities"
              endpoint="/api/v1/collections"
              icon={Network}
              tags={["REST", "JSON"]}
              status="active"
              onCopy={handleCopyEndpoint}
            />
            
            <ApiEndpointCard 
              title="Payment Processing"
              description="Process payments, manage payment methods, and payment status"
              endpoint="/api/v1/payments"
              icon={Share}
              tags={["REST", "JSON"]}
              status="active"
              onCopy={handleCopyEndpoint}
            />
            
            <ApiEndpointCard 
              title="Communication Webhook"
              description="Receive notifications about customer communications and events"
              endpoint="/api/v1/webhooks/communications"
              icon={Webhook}
              tags={["Webhook", "JSON"]}
              status="active"
              onCopy={handleCopyEndpoint}
            />
            
            <ApiEndpointCard 
              title="Integration Management"
              description="Manage system integrations, connections, and data flows"
              endpoint="/api/v1/integrations"
              icon={Puzzle}
              tags={["REST", "JSON"]}
              status="beta"
              onCopy={handleCopyEndpoint}
            />
            
            <ApiEndpointCard 
              title="Customer Data Service"
              description="Access and manage customer information and profiles"
              endpoint="/api/v1/customers"
              icon={GitBranch}
              tags={["REST", "GraphQL"]}
              status="active"
              onCopy={handleCopyEndpoint}
            />
            
            <ApiEndpointCard 
              title="Reporting API"
              description="Generate and access collection performance reports"
              endpoint="/api/v1/reports"
              icon={Code}
              tags={["REST", "CSV", "JSON"]}
              status="beta"
              onCopy={handleCopyEndpoint}
            />
          </div>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="keys" className="mt-0">
          <ApiKeyManagement onRegenerateKey={handleRegenerateKey} />
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="docs" className="mt-0">
          <ApiDocumentation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiPanel;
