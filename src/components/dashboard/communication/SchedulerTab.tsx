
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const SchedulerTab = () => {
  return (
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
  );
};

export default SchedulerTab;
