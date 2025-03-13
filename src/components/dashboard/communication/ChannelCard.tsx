
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface ChannelCardProps {
  icon: LucideIcon;
  title: string;
  stats: {
    label: string;
    value: string;
  }[];
}

const ChannelCard = ({ icon: Icon, title, stats }: ChannelCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const handleManage = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowDetails(true);
    }, 600);
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowDetails(false);
      
      toast.success(t('communication.channelCard.success.updated', { channel: title }), {
        description: t('communication.channelCard.success.description', { channel: title })
      });
    }, 800);
  };
  
  const toggleChannel = (checked: boolean) => {
    setIsEnabled(checked);
    toast.info(
      t(checked ? 'communication.channelCard.status.enabled' : 'communication.channelCard.status.disabled', { channel: title }), 
      {
        description: t('communication.channelCard.status.description', { 
          channel: title, 
          status: t(checked ? 'enabled' : 'disabled') 
        })
      }
    );
  };
  
  return (
    <>
      <Card className="group overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
        <CardHeader className="pb-2 space-y-2">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center mb-1",
            "bg-primary/10 text-primary",
            "group-hover:bg-primary group-hover:text-primary-foreground", 
            "transition-colors duration-300"
          )}>
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-sm text-muted-foreground space-y-1">
            {stats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{stat.label}:</span>
                <span className="font-medium">{stat.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full group-hover:bg-primary/10 transition-colors"
            onClick={handleManage}
            disabled={isLoading}
          >
            {isLoading ? t('communication.channelCard.loading') : t('communication.channelCard.manage')}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Icon className="mr-2 h-5 w-5" />
              {title} {t('communication.channelCard.settings')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-medium">{t('communication.channelCard.channelStatus')}</h4>
                <p className="text-sm text-muted-foreground">{t('communication.channelCard.enableDisable')}</p>
              </div>
              <Switch 
                checked={isEnabled}
                onCheckedChange={toggleChannel}
              />
            </div>
            
            <div className="space-y-2">
              <Label>{t('communication.channelCard.notificationPrefs')}</Label>
              <div className="space-y-2">
                {[
                  t('communication.channelCard.notifications.newMessage'),
                  t('communication.channelCard.notifications.delivery'),
                  t('communication.channelCard.notifications.read')
                ].map((pref, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input type="checkbox" id={`pref-${idx}`} className="rounded" defaultChecked />
                    <label htmlFor={`pref-${idx}`} className="text-sm">{pref}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>{t('communication.channelCard.messageDelivery')}</Label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>{t('communication.channelCard.deliveryOptions.immediate')}</option>
                <option>{t('communication.channelCard.deliveryOptions.scheduled')}</option>
                <option>{t('communication.channelCard.deliveryOptions.workingHours')}</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetails(false)}>
              {t('communication.channelCard.cancel')}
            </Button>
            <Button onClick={handleSaveSettings}>
              {t('communication.channelCard.saveChanges')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChannelCard;
