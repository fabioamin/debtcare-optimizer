
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Code, Terminal, ArrowRight } from "lucide-react";

const ApiDocumentation = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Comprehensive guides and references for integrating with our API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="getting-started">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="examples">Code Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="getting-started" className="space-y-4 pt-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Introduction to Our API</h3>
                <p className="text-muted-foreground mb-4">
                  Our REST API lets you integrate our collection management system directly into your applications. 
                  You can create and track collection accounts, process payments, and automate workflows.
                </p>
                
                <h4 className="text-base font-medium mb-2">Base URL</h4>
                <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                  https://api.yourdomain.com/v1
                </div>
                
                <h4 className="text-base font-medium mb-2">Request Format</h4>
                <p className="text-muted-foreground mb-2">
                  All requests should be encoded as JSON with the Content-Type header set to application/json.
                </p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                  Content-Type: application/json
                </div>
                
                <h4 className="text-base font-medium mb-2">Response Format</h4>
                <p className="text-muted-foreground mb-2">
                  All responses will be returned in JSON format with appropriate HTTP status codes.
                </p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
{`{
  "status": "success",
  "data": {
    // Response data here
  }
}`}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="authentication" className="space-y-4 pt-4">
              <div>
                <h3 className="text-lg font-medium mb-2">API Authentication</h3>
                <p className="text-muted-foreground mb-4">
                  All API requests must include your API key in the Authorization header.
                </p>
                
                <h4 className="text-base font-medium mb-2">API Key Authentication</h4>
                <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                  Authorization: Bearer your_api_key_here
                </div>
                
                <h4 className="text-base font-medium mb-2">Environments</h4>
                <p className="text-muted-foreground mb-2">
                  We provide two environments for API integration:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>
                    <strong>Sandbox:</strong> For testing and development (prefix: sk_sandbox_)
                  </li>
                  <li>
                    <strong>Production:</strong> For live applications (prefix: sk_prod_)
                  </li>
                </ul>
                
                <h4 className="text-base font-medium mb-2">Security Best Practices</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Never expose your API keys in client-side code</li>
                  <li>Rotate your API keys periodically</li>
                  <li>Use environment-specific keys for different environments</li>
                  <li>Implement proper error handling for authentication failures</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="examples" className="space-y-4 pt-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Code Examples</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-medium mb-2 flex items-center">
                      <Terminal className="h-4 w-4 mr-2" />
                      JavaScript / Node.js
                    </h4>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
{`// Get all collection accounts
const fetchCollections = async () => {
  try {
    const response = await fetch('https://api.yourdomain.com/v1/collections', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer your_api_key_here',
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching collections:', error);
  }
};`}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-2 flex items-center">
                      <Code className="h-4 w-4 mr-2" />
                      Python
                    </h4>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
{`# Process a payment
import requests
import json

def process_payment(account_id, amount, payment_method):
    url = "https://api.yourdomain.com/v1/payments"
    headers = {
        "Authorization": "Bearer your_api_key_here",
        "Content-Type": "application/json"
    }
    payload = {
        "account_id": account_id,
        "amount": amount,
        "payment_method": payment_method
    }
    
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    return response.json()`}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center text-primary">
                  <a href="#" className="flex items-center text-sm font-medium">
                    View full API reference documentation
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <h3 className="text-lg font-medium">API Endpoints Reference</h3>
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Collections API</CardTitle>
            <CardDescription>Manage collection accounts and related data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center text-sm font-medium">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded text-xs mr-2">GET</span>
                  <code className="text-sm">/collections</code>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Get a list of all collection accounts</p>
                <Separator className="my-2" />
              </div>
              
              <div>
                <div className="flex items-center text-sm font-medium">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded text-xs mr-2">GET</span>
                  <code className="text-sm">/collections/{'{account_id}'}</code>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Get details of a specific collection account</p>
                <Separator className="my-2" />
              </div>
              
              <div>
                <div className="flex items-center text-sm font-medium">
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded text-xs mr-2">POST</span>
                  <code className="text-sm">/collections</code>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Create a new collection account</p>
                <Separator className="my-2" />
              </div>
              
              <div>
                <div className="flex items-center text-sm font-medium">
                  <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-0.5 rounded text-xs mr-2">PUT</span>
                  <code className="text-sm">/collections/{'{account_id}'}</code>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Update an existing collection account</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Payments API</CardTitle>
            <CardDescription>Process and manage payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center text-sm font-medium">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded text-xs mr-2">GET</span>
                  <code className="text-sm">/payments</code>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Get a list of all payment transactions</p>
                <Separator className="my-2" />
              </div>
              
              <div>
                <div className="flex items-center text-sm font-medium">
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded text-xs mr-2">POST</span>
                  <code className="text-sm">/payments</code>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Process a new payment</p>
                <Separator className="my-2" />
              </div>
              
              <div>
                <div className="flex items-center text-sm font-medium">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded text-xs mr-2">GET</span>
                  <code className="text-sm">/payments/{'{payment_id}'}</code>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Get details of a specific payment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiDocumentation;
