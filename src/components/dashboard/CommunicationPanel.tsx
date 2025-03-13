
import { Phone, Mail, MessageSquare, Globe, Users, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CommunicationPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Omnichannel Communication</CardTitle>
        <CardDescription>
          Seamlessly engage customers through their preferred channels with empathetic messaging
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="templates">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="templates" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Templates
            </TabsTrigger>
            <TabsTrigger value="scheduler" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Communication Scheduler
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex-1">
              <Globe className="h-4 w-4 mr-2" />
              Channel Management
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Template Categories</h3>
                  <ul className="space-y-1">
                    <li className="px-3 py-2 bg-primary text-primary-foreground rounded-md">
                      Payment Reminders
                    </li>
                    <li className="px-3 py-2 hover:bg-secondary rounded-md transition-colors cursor-pointer">
                      Initial Contact
                    </li>
                    <li className="px-3 py-2 hover:bg-secondary rounded-md transition-colors cursor-pointer">
                      Follow-up Messages
                    </li>
                    <li className="px-3 py-2 hover:bg-secondary rounded-md transition-colors cursor-pointer">
                      Payment Confirmation
                    </li>
                    <li className="px-3 py-2 hover:bg-secondary rounded-md transition-colors cursor-pointer">
                      Plan Options
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Channel Type</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email" className="rounded" checked readOnly />
                      <label htmlFor="email" className="text-sm">Email</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sms" className="rounded" checked readOnly />
                      <label htmlFor="sms" className="text-sm">SMS</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="phone" className="rounded" />
                      <label htmlFor="phone" className="text-sm">Phone Script</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="portal" className="rounded" />
                      <label htmlFor="portal" className="text-sm">Portal Notification</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Edit Template</h3>
                    <Select defaultValue="reminder-7">
                      <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reminder-7">7-Day Payment Reminder</SelectItem>
                        <SelectItem value="reminder-3">3-Day Payment Reminder</SelectItem>
                        <SelectItem value="reminder-1">1-Day Payment Reminder</SelectItem>
                        <SelectItem value="reminder-overdue">Overdue Payment Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Subject Line</label>
                      <Input defaultValue="Your payment is due in 7 days" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Message Content</label>
                      <Textarea 
                        rows={8} 
                        defaultValue="Dear {{customer.name}},

We hope this message finds you well. This is a friendly reminder that your payment of {{payment.amount}} is due on {{payment.dueDate}}. 

You can easily make your payment through our secure portal at {{payment.link}} or contact us to discuss flexible payment options.

Thank you for your prompt attention to this matter.

Best regards,
The DebtCare Team" 
                      />
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Available Variables</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-secondary px-2 py-1 rounded-md">{{'{{'}}customer.name{{'}}'}}</span>
                        <span className="text-xs bg-secondary px-2 py-1 rounded-md">{{'{{'}}payment.amount{{'}}'}}</span>
                        <span className="text-xs bg-secondary px-2 py-1 rounded-md">{{'{{'}}payment.dueDate{{'}}'}}</span>
                        <span className="text-xs bg-secondary px-2 py-1 rounded-md">{{'{{'}}payment.link{{'}}'}}</span>
                        <span className="text-xs bg-secondary px-2 py-1 rounded-md">{{'{{'}}company.name{{'}}'}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Preview</Button>
                  <Button>Save Template</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="scheduler">
            <div className="bg-secondary/50 p-6 rounded-lg flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Communication Scheduler</h3>
                <p className="text-sm text-muted-foreground max-w-md mb-4">
                  Schedule automated communications based on customer behavior, payment status, and optimal contact times.
                </p>
                <Button>Set Up Automated Sequences</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="channels">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Mail className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">Email</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-muted-foreground">
                    <div className="flex justify-between mb-1">
                      <span>Open Rate:</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Response Rate:</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Templates:</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">Manage</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">SMS</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-muted-foreground">
                    <div className="flex justify-between mb-1">
                      <span>Open Rate:</span>
                      <span className="font-medium">98%</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Response Rate:</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Templates:</span>
                      <span className="font-medium">8</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">Manage</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Phone className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">Phone</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-muted-foreground">
                    <div className="flex justify-between mb-1">
                      <span>Connect Rate:</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Resolution Rate:</span>
                      <span className="font-medium">38%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scripts:</span>
                      <span className="font-medium">6</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">Manage</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Globe className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">Portal</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-muted-foreground">
                    <div className="flex justify-between mb-1">
                      <span>Visit Rate:</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Action Rate:</span>
                      <span className="font-medium">22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Notifications:</span>
                      <span className="font-medium">10</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">Manage</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommunicationPanel;
