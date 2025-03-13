
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
      
      toast.success(`${title} settings updated`, {
        description: `Your ${title} channel configuration has been saved.`
      });
    }, 800);
  };
  
  const toggleChannel = (checked: boolean) => {
    setIsEnabled(checked);
    toast.info(`${title} channel ${checked ? 'enabled' : 'disabled'}`, {
      description: `The ${title} communication channel has been ${checked ? 'enabled' : 'disabled'}.`
    });
  };
  
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-sm text-muted-foreground">
            {stats.map((stat, index) => (
              <div key={index} className="flex justify-between mb-1">
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
            className="w-full"
            onClick={handleManage}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Manage"}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Icon className="mr-2 h-5 w-5" />
              {title} Settings
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-medium">Channel Status</h4>
                <p className="text-sm text-muted-foreground">Enable or disable this communication channel</p>
              </div>
              <Switch 
                checked={isEnabled}
                onCheckedChange={toggleChannel}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Notification Preferences</Label>
              <div className="space-y-2">
                {["New message alerts", "Delivery receipts", "Read receipts"].map((pref, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input type="checkbox" id={`pref-${idx}`} className="rounded" defaultChecked />
                    <label htmlFor={`pref-${idx}`} className="text-sm">{pref}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Message Delivery</Label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>Immediate</option>
                <option>Scheduled</option>
                <option>Working Hours Only (9AM-5PM)</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetails(false)}>Cancel</Button>
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChannelCard;
