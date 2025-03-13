
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  
  const handleManage = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.info(`Managing ${title} channel`, {
        description: `Channel settings for ${title} have been loaded.`
      });
    }, 800);
  };
  
  return (
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
  );
};

export default ChannelCard;
