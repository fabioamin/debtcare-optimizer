
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface AnalyticsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
}

const AnalyticsCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon
}: AnalyticsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
        <div className="flex items-end">
          <div className="text-2xl font-bold mr-2">{value}</div>
          {change && (
            <div className={cn(
              "text-xs px-2 py-1 rounded-full",
              changeType === "positive" && "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
              changeType === "negative" && "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
              changeType === "neutral" && "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            )}>
              {change}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
