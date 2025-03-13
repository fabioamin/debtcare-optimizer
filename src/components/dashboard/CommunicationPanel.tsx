
import { MessageSquare, Calendar, Globe } from "lucide-react";
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
          <TabsList className="w-full mb-4 md:mb-6 grid grid-cols-3 gap-1">
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
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommunicationPanel;
