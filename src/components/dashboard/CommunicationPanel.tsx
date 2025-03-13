
import { MessageSquare, Calendar, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplatesTab from "./communication/TemplatesTab";
import SchedulerTab from "./communication/SchedulerTab";
import ChannelsTab from "./communication/ChannelsTab";

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
            <TemplatesTab />
          </TabsContent>
          
          <TabsContent value="scheduler">
            <SchedulerTab />
          </TabsContent>
          
          <TabsContent value="channels">
            <ChannelsTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommunicationPanel;
