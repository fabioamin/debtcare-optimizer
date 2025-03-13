
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FileEdit, Users, Palette, Globe, Shield, Code } from "lucide-react";

const PortalPanel = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  const handleSave = (section: string) => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: `${section} settings have been updated successfully.`,
      });
    }, 800);
  };

  return (
    <Tabs defaultValue="appearance" className="space-y-4">
      <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden md:inline">Appearance</span>
        </TabsTrigger>
        <TabsTrigger value="content" className="flex items-center gap-2">
          <FileEdit className="h-4 w-4" />
          <span className="hidden md:inline">Content</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden md:inline">Users</span>
        </TabsTrigger>
        <TabsTrigger value="domains" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">Domains</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="hidden md:inline">Security</span>
        </TabsTrigger>
        <TabsTrigger value="integrations" className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          <span className="hidden md:inline">Integrations</span>
        </TabsTrigger>
      </TabsList>

      {/* Appearance Tab */}
      <TabsContent value="appearance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Portal Theme</CardTitle>
            <CardDescription>Customize the look and feel of your client portal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="primary-color" 
                    type="color" 
                    defaultValue="#6366F1"
                    className="w-16 h-10" 
                  />
                  <Input id="primary-color-text" defaultValue="#6366F1" className="flex-1" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="secondary-color" 
                    type="color" 
                    defaultValue="#0EA5E9"
                    className="w-16 h-10" 
                  />
                  <Input id="secondary-color-text" defaultValue="#0EA5E9" className="flex-1" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Logo Upload</Label>
                <Input id="logo" type="file" accept="image/*" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="dark-mode" defaultChecked />
                <Label htmlFor="dark-mode">Allow Dark Mode</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="custom-css" />
                <Label htmlFor="custom-css">Enable Custom CSS</Label>
              </div>
            </div>
            
            <Button onClick={() => handleSave("Appearance")} disabled={saving}>
              {saving ? "Saving..." : "Save Theme Settings"}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Layout Settings</CardTitle>
            <CardDescription>Configure the layout of your client portal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="layout-style">Layout Style</Label>
                <select 
                  id="layout-style" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  defaultValue="sidebar"
                >
                  <option value="sidebar">Sidebar Navigation</option>
                  <option value="topnav">Top Navigation</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="welcome-banner" defaultChecked />
                <Label htmlFor="welcome-banner">Show Welcome Banner</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="show-footer" defaultChecked />
                <Label htmlFor="show-footer">Show Footer</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="responsive" defaultChecked />
                <Label htmlFor="responsive">Responsive Layout</Label>
              </div>
            </div>
            
            <Button onClick={() => handleSave("Layout")} disabled={saving}>
              {saving ? "Saving..." : "Save Layout Settings"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Content Tab */}
      <TabsContent value="content" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Portal Content</CardTitle>
            <CardDescription>Manage the content displayed in your client portal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="portal-name">Portal Name</Label>
                <Input id="portal-name" defaultValue="DebtCare Client Portal" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <textarea 
                  id="welcome-message" 
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  defaultValue="Welcome to your personal debt management portal. Here you can view your account details, make payments, and communicate with our team."
                />
              </div>
              
              <div className="space-y-2">
                <Label>Visible Modules</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {["Dashboard", "Account Overview", "Payment History", "Documents", "Messages", "Support"].map((module) => (
                    <div key={module} className="flex items-center space-x-2">
                      <input type="checkbox" id={`module-${module}`} defaultChecked className="rounded" />
                      <Label htmlFor={`module-${module}`}>{module}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="custom-links">Custom Links</Label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input placeholder="Link Title" defaultValue="Resources" />
                    <Input placeholder="URL" defaultValue="https://example.com/resources" />
                  </div>
                  <div className="flex space-x-2">
                    <Input placeholder="Link Title" defaultValue="FAQ" />
                    <Input placeholder="URL" defaultValue="https://example.com/faq" />
                  </div>
                  <Button variant="outline" size="sm">+ Add Link</Button>
                </div>
              </div>
            </div>
            
            <Button onClick={() => handleSave("Content")} disabled={saving}>
              {saving ? "Saving..." : "Save Content Settings"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Users Tab */}
      <TabsContent value="users" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Configure user access and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="registration">Registration Settings</Label>
                <select 
                  id="registration" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  defaultValue="invite"
                >
                  <option value="open">Open Registration</option>
                  <option value="invite">Invitation Only</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label>User Roles</Label>
                <div className="space-y-2 border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Client</h4>
                      <p className="text-sm text-muted-foreground">Standard client access</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                </div>
                <div className="space-y-2 border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Support</h4>
                      <p className="text-sm text-muted-foreground">Customer support access</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                </div>
                <div className="space-y-2 border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Administrator</h4>
                      <p className="text-sm text-muted-foreground">Full administrative access</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="email-verification" defaultChecked />
                <Label htmlFor="email-verification">Require Email Verification</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="auto-deactivate" />
                <Label htmlFor="auto-deactivate">Auto-deactivate Inactive Users</Label>
              </div>
            </div>
            
            <Button onClick={() => handleSave("Users")} disabled={saving}>
              {saving ? "Saving..." : "Save User Settings"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Domains Tab */}
      <TabsContent value="domains" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Domain Configuration</CardTitle>
            <CardDescription>Manage domains and URLs for your client portal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-domain">Primary Domain</Label>
                <Input id="primary-domain" defaultValue="portal.debtcare.com" />
              </div>
              
              <div className="space-y-2">
                <Label>Custom Domains</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input defaultValue="client.example.com" className="flex-1" />
                    <Button variant="outline" size="sm">Verify</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                  <Button variant="outline" size="sm">+ Add Domain</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ssl">SSL Certificate</Label>
                <select 
                  id="ssl" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  defaultValue="auto"
                >
                  <option value="auto">Auto (Let's Encrypt)</option>
                  <option value="custom">Custom Certificate</option>
                  <option value="none">None</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="force-https" defaultChecked />
                <Label htmlFor="force-https">Force HTTPS</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="www-redirect" defaultChecked />
                <Label htmlFor="www-redirect">Redirect www to non-www</Label>
              </div>
            </div>
            
            <Button onClick={() => handleSave("Domains")} disabled={saving}>
              {saving ? "Saving..." : "Save Domain Settings"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security Tab */}
      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure security features for your client portal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <select 
                  id="password-policy" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  defaultValue="strong"
                >
                  <option value="basic">Basic (min 8 characters)</option>
                  <option value="medium">Medium (min 10 characters, alphanumeric)</option>
                  <option value="strong">Strong (min 12 characters, special characters)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout</Label>
                <select 
                  id="session-timeout" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  defaultValue="30"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="240">4 hours</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="2fa" defaultChecked />
                <Label htmlFor="2fa">Two-Factor Authentication</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="ip-restriction" />
                <Label htmlFor="ip-restriction">IP Restriction</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="failed-login" defaultChecked />
                <Label htmlFor="failed-login">Account Lockout (after failed logins)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="sensitive-data" defaultChecked />
                <Label htmlFor="sensitive-data">Sensitive Data Masking</Label>
              </div>
            </div>
            
            <Button onClick={() => handleSave("Security")} disabled={saving}>
              {saving ? "Saving..." : "Save Security Settings"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Integrations Tab */}
      <TabsContent value="integrations" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>API & Integrations</CardTitle>
            <CardDescription>Manage API access and third-party integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>API Access</Label>
                  <Switch id="api-enabled" defaultChecked />
                </div>
                <div className="p-4 border rounded-md bg-muted/50">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">API Key:</span>
                      <Button variant="outline" size="sm">Generate New Key</Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input defaultValue="••••••••••••••••••••••••••••••" type="password" className="font-mono" />
                      <Button variant="ghost" size="sm">Show</Button>
                      <Button variant="ghost" size="sm">Copy</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Connected Services</Label>
                <div className="space-y-2">
                  {[
                    { name: "Slack", connected: true },
                    { name: "Google Analytics", connected: true },
                    { name: "Zendesk", connected: false },
                    { name: "Stripe", connected: true }
                  ].map((service) => (
                    <div key={service.name} className="flex justify-between items-center p-2 border rounded-md">
                      <span>{service.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs ${service.connected ? 'text-green-500' : 'text-muted-foreground'}`}>
                          {service.connected ? 'Connected' : 'Not Connected'}
                        </span>
                        <Button variant="outline" size="sm">
                          {service.connected ? 'Disconnect' : 'Connect'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Webhooks</Label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border rounded-md">
                    <div>
                      <p className="font-medium">User Activity</p>
                      <p className="text-xs text-muted-foreground">https://example.com/webhooks/user-activity</p>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <Button variant="outline" size="sm">+ Add Webhook</Button>
                </div>
              </div>
            </div>
            
            <Button onClick={() => handleSave("Integrations")} disabled={saving}>
              {saving ? "Saving..." : "Save Integration Settings"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PortalPanel;
