
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, RefreshCw, EyeOff, Eye, Copy, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  environment: "production" | "sandbox";
  permissions: string[];
}

interface ApiKeyManagementProps {
  onRegenerateKey: (keyId: string) => void;
}

const ApiKeyManagement = ({ onRegenerateKey }: ApiKeyManagementProps) => {
  const { toast } = useToast();
  const [visibleKeyId, setVisibleKeyId] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  
  // Sample API keys
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "key_prod_1",
      name: "Production API Key",
      key: "sk_prod_2x73uhd92jd92jd92jd92jd92jd92j",
      createdAt: "2023-07-15",
      lastUsed: "2023-08-18",
      environment: "production",
      permissions: ["read", "write"]
    },
    {
      id: "key_sandbox_1",
      name: "Sandbox Testing",
      key: "sk_sandbox_8h42jsh27sh27sh27sh27sh27sh27s",
      createdAt: "2023-08-01",
      lastUsed: "2023-08-15",
      environment: "sandbox",
      permissions: ["read", "write"]
    }
  ]);

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeyId(visibleKeyId === keyId ? null : keyId);
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "API Key copied",
      description: "The API key has been copied to your clipboard",
    });
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a name for your API key",
        variant: "destructive",
      });
      return;
    }

    const newKey: ApiKey = {
      id: `key_sandbox_${Math.floor(Math.random() * 1000)}`,
      name: newKeyName,
      key: `sk_sandbox_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: "Never",
      environment: "sandbox",
      permissions: ["read", "write"]
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    
    toast({
      title: "API Key created",
      description: "New sandbox API key has been created successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New API Key</CardTitle>
          <CardDescription>
            Generate API keys to authenticate your API requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="key-name">API Key Name</Label>
                <Input 
                  id="key-name" 
                  placeholder="e.g., Development Environment" 
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreateKey}>
            <Key className="mr-2 h-4 w-4" />
            Generate New API Key
          </Button>
        </CardFooter>
      </Card>

      <h3 className="text-lg font-medium">Your API Keys</h3>
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-md">
                    <Key className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-base">{apiKey.name}</CardTitle>
                </div>
                <Badge variant={apiKey.environment === "production" ? "default" : "outline"}>
                  {apiKey.environment}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary" className="bg-secondary/20 text-xs">
                        {apiKey.permissions.join(", ")}
                      </Badge>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="h-3 w-3" />
                      Created: {apiKey.createdAt}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center bg-muted rounded p-2 gap-2">
                  <code className="text-xs font-mono flex-1 overflow-x-auto">
                    {visibleKeyId === apiKey.id ? apiKey.key : '•'.repeat(Math.min(24, apiKey.key.length))}
                  </code>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="h-7 w-7 p-0"
                  >
                    {visibleKeyId === apiKey.id ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleCopyKey(apiKey.key)}
                    className="h-7 w-7 p-0"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-3">
              <div className="text-xs text-muted-foreground">
                Last used: {apiKey.lastUsed}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onRegenerateKey(apiKey.id)}
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Regenerate
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApiKeyManagement;
