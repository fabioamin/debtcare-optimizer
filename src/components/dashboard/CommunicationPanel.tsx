
import { MessageSquare, Calendar, Globe, UserCircle, Layout, Workflow } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplatesTab from "./communication/TemplatesTab";
import SchedulerTab from "./communication/SchedulerTab";
import ChannelsTab from "./communication/ChannelsTab";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";

const CommunicationPanel = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <Card className="overflow-hidden border-muted bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl md:text-2xl">Omnichannel Communication</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Seamlessly engage customers through their preferred channels with empathetic messaging
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="w-full mb-4 md:mb-6 grid grid-cols-6 gap-1">
            <TabsTrigger value="channels" className="flex items-center justify-center">
              <Globe className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4 mr-2'}`} />
              {!isMobile && t('communication.tabs.channels')}
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center justify-center">
              <MessageSquare className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4 mr-2'}`} />
              {!isMobile && t('communication.tabs.templates')}
            </TabsTrigger>
            <TabsTrigger value="scheduler" className="flex items-center justify-center">
              <Calendar className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4 mr-2'}`} />
              {!isMobile && t('communication.tabs.scheduler')}
            </TabsTrigger>
            <TabsTrigger value="self-service" className="flex items-center justify-center">
              <UserCircle className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4 mr-2'}`} />
              {!isMobile && t('communication.tabs.selfService')}
            </TabsTrigger>
            <TabsTrigger value="portal" className="flex items-center justify-center">
              <Layout className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4 mr-2'}`} />
              {!isMobile && t('communication.tabs.portal')}
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center justify-center">
              <Workflow className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4 mr-2'}`} />
              {!isMobile && t('communication.tabs.automation')}
            </TabsTrigger>
          </TabsList>
          
          <div className="p-1 md:p-2">
            <TabsContent value="channels" className="mt-0">
              <ChannelsTab />
            </TabsContent>
            
            <TabsContent value="templates" className="mt-0">
              <TemplatesTab />
            </TabsContent>
            
            <TabsContent value="scheduler" className="mt-0">
              <SchedulerTab />
            </TabsContent>
            
            <TabsContent value="self-service" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Self-Service Portal</h3>
                <p className="text-muted-foreground">
                  Customer-friendly interfaces for debtors to manage and resolve debts without agent intervention.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <Card className="hover:bg-accent/10 transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Customer Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Configure self-service dashboard with debt overviews and payment options
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="hover:bg-accent/10 transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Payment Plans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Create customizable payment plan options for customer self-selection
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="portal" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Configure Portal</h3>
                <p className="text-muted-foreground">
                  White-Label Customization: Fully brandable solution that seamlessly integrates with your existing platforms.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <Card className="hover:bg-accent/10 transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Brand Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Upload logos, set colors, and customize the look and feel of your portal
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="hover:bg-accent/10 transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Custom Domain</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Configure your branded domain for a seamless customer experience
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="automation" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Automated Workflows</h3>
                <p className="text-muted-foreground">
                  Intelligent automation of routine tasks and decision-making processes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <Card className="hover:bg-accent/10 transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Workflow Builder</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Create custom workflows for debt collection processes and communications
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="hover:bg-accent/10 transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Decision Rules</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Configure business rules to automate decision-making based on specific conditions
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommunicationPanel;
