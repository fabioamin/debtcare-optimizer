import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import UserRoleManagement from "./UserRoleManagement";
import { ROLE_PERMISSIONS, useAuth } from "@/contexts/AuthContext";
import { 
  UserCircle, 
  Lock, 
  BellRing, 
  CreditCard, 
  HelpCircle,
  UserCog,
  Shield
} from "lucide-react";

const SettingsPanel = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const { user, hasPermission } = useAuth();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your account settings have been updated successfully."
      });
    }, 1000);
  };

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid grid-cols-6 mb-8">
        <TabsTrigger value="account" className="flex items-center gap-2">
          <UserCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Account</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span className="hidden sm:inline">Security</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <BellRing className="h-4 w-4" />
          <span className="hidden sm:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="billing" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Billing</span>
        </TabsTrigger>
        <TabsTrigger value="support" className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Support</span>
        </TabsTrigger>
        {hasPermission('users.view') && (
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span className="hidden sm:inline">Usuários</span>
          </TabsTrigger>
        )}
      </TabsList>

      {/* Account Tab */}
      <TabsContent value="account">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-2 mb-4">
            <CardHeader>
              <CardTitle>Perfil de Acesso</CardTitle>
              <CardDescription>
                Seu perfil de acesso atual e permissões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-md">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-lg font-medium">
                      {ROLE_PERMISSIONS.find(r => r.role === user?.role)?.displayName || 'Usuário'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {ROLE_PERMISSIONS.find(r => r.role === user?.role)?.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Permissões disponíveis:</h4>
                  <div className="flex flex-wrap gap-2">
                    {ROLE_PERMISSIONS.find(r => r.role === user?.role)?.permissions.map(permission => (
                      <span key={permission} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Acme Inc." />
                  </div>
                  <Button disabled={saving}>
                    {saving ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="language">Language</Label>
                  <select 
                    id="language"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="pt">Português</option>
                  </select>
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="timeZone">Time Zone</Label>
                  <select 
                    id="timeZone"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="utc">UTC</option>
                    <option value="est">Eastern (EST)</option>
                    <option value="cst">Central (CST)</option>
                    <option value="pst">Pacific (PST)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Toggle the app between light and dark mode
                    </p>
                  </div>
                  <Switch id="darkMode" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Security Tab */}
      <TabsContent value="security">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to enhance security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button disabled={saving}>
                    {saving ? "Updating..." : "Update password"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Two-factor authentication</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable two-factor authentication for your account
                    </p>
                  </div>
                  <Switch id="twoFactor" />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Recovery codes</Label>
                    <p className="text-xs text-muted-foreground">
                      Generate recovery codes for account access
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Generate</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Notifications Tab */}
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Manage how you receive notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Account updates</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive emails about your account activity
                    </p>
                  </div>
                  <Switch defaultChecked id="accountNotify" />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Payment reminders</Label>
                    <p className="text-xs text-muted-foreground">
                      Get notified about upcoming payment due dates
                    </p>
                  </div>
                  <Switch defaultChecked id="paymentNotify" />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Marketing emails</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive promotional offers and updates
                    </p>
                  </div>
                  <Switch id="marketingNotify" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Application Notifications</h3>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>In-app notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Show notifications within the application
                    </p>
                  </div>
                  <Switch defaultChecked id="inAppNotify" />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Browser push notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive alerts even when the app is closed
                    </p>
                  </div>
                  <Switch id="pushNotify" />
                </div>
              </div>
              <Button onClick={handleSubmit} disabled={saving}>
                {saving ? "Saving..." : "Save preferences"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Billing Tab */}
      <TabsContent value="billing">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your saved payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 04/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <Button variant="outline" className="w-full">
                  Add new payment method
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Update your billing address and information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingName">Name on invoice</Label>
                    <Input id="billingName" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingEmail">Billing email</Label>
                    <Input id="billingEmail" type="email" defaultValue="billing@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Billing address</Label>
                    <Input id="billingAddress" defaultValue="123 Main St, City" />
                  </div>
                  <Button disabled={saving}>
                    {saving ? "Saving..." : "Save billing info"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Support Tab */}
      <TabsContent value="support">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
              <CardDescription>
                Access customer support and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Contact Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is available Monday-Friday, 9AM-5PM EST.
                  </p>
                  <Button className="mb-2 w-full">Submit a ticket</Button>
                  <p className="text-sm">
                    Or email us at:{" "}
                    <a href="mailto:support@example.com" className="text-primary underline">
                      support@example.com
                    </a>
                  </p>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with a support representative in real-time.
                  </p>
                  <Button variant="outline" className="w-full">Start chat</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>
                Find answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Frequently Asked Questions</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        How do I update my account information?
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Setting up two-factor authentication
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Managing payment methods
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Subscription and billing questions
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Documentation</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Browse our comprehensive documentation for detailed guides.
                  </p>
                  <Button variant="outline" className="w-full">View documentation</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      {/* Users Tab */}
      <TabsContent value="users">
        <div className="space-y-6">
          <UserRoleManagement />
          
          <Card>
            <CardHeader>
              <CardTitle>Permissões por Perfil</CardTitle>
              <CardDescription>
                Visão geral das permissões disponíveis para cada perfil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">Permissão</th>
                      {ROLE_PERMISSIONS.map(role => (
                        <th key={role.role} className="py-2 px-4 text-center">
                          {role.displayName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(new Set(ROLE_PERMISSIONS.flatMap(r => r.permissions))).map(permission => (
                      <tr key={permission} className="border-b">
                        <td className="py-2 px-4">{permission}</td>
                        {ROLE_PERMISSIONS.map(role => (
                          <td key={role.role} className="py-2 px-4 text-center">
                            {role.permissions.includes(permission) ? (
                              <span className="text-green-500">✓</span>
                            ) : (
                              <span className="text-red-500">✗</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsPanel;
