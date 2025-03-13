
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { Copy } from "lucide-react";

interface ApiEndpointCardProps {
  title: string;
  description: string;
  endpoint: string;
  icon: LucideIcon;
  tags: string[];
  status: "active" | "beta" | "deprecated";
  onCopy: (endpoint: string) => void;
}

const ApiEndpointCard = ({
  title,
  description,
  endpoint,
  icon: Icon,
  tags,
  status,
  onCopy
}: ApiEndpointCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge 
            variant={
              status === "active" ? "default" : 
              status === "beta" ? "outline" : "secondary"
            }
          >
            {status}
          </Badge>
        </div>
        <CardDescription className="text-sm mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex space-x-2 mb-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-secondary/30">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="p-2 bg-muted rounded-md font-mono text-xs overflow-x-auto">
          {endpoint}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3 bg-muted/30">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open("/dashboard/apis/docs" + endpoint, "_blank")}
        >
          View Docs
        </Button>
        <Button 
          size="sm"
          variant="ghost"
          onClick={() => onCopy(endpoint)}
        >
          <Copy className="h-4 w-4 mr-1" />
          Copy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiEndpointCard;
