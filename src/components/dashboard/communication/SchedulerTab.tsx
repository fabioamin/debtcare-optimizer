
import { Calendar, Clock, Users, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SchedulerTab = () => {
  const [showSetup, setShowSetup] = useState(false);
  const { toast } = useToast();
  
  const handleSetup = () => {
    setShowSetup(true);
  };
  
  const handleCreate = () => {
    toast.success("Sequence created", {
      description: "Your automated sequence has been scheduled."
    });
    setShowSetup(false);
  };
  
  return (
    <div>
      {!showSetup ? (
        <div className="bg-secondary/50 p-6 rounded-lg flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Communication Scheduler</h3>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              Schedule automated communications based on customer behavior, payment status, and optimal contact times.
            </p>
            <Button onClick={handleSetup}>Set Up Automated Sequences</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-card p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Create Automated Sequence</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sequence Name</label>
                  <input 
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    placeholder="Payment Reminder Sequence"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Trigger Event</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>Payment Due Date</option>
                    <option>Missed Payment</option>
                    <option>Account Creation</option>
                    <option>Initial Contact</option>
                  </select>
                </div>
              </div>
              
              <div className="border rounded-lg">
                <div className="p-3 border-b bg-muted/50 flex justify-between items-center">
                  <h4 className="font-medium">Sequence Steps</h4>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Step
                  </Button>
                </div>
                
                <div className="p-3 border-b">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h5 className="font-medium">7-Day Payment Reminder</h5>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          7 days before due date
                        </div>
                      </div>
                      <div className="flex space-x-3 text-sm">
                        <div className="bg-primary/10 text-primary rounded-full px-2 py-0.5">Email</div>
                        <div className="bg-primary/10 text-primary rounded-full px-2 py-0.5">SMS</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border-b">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h5 className="font-medium">3-Day Payment Reminder</h5>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          3 days before due date
                        </div>
                      </div>
                      <div className="flex space-x-3 text-sm">
                        <div className="bg-primary/10 text-primary rounded-full px-2 py-0.5">Email</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h5 className="font-medium">1-Day Payment Reminder</h5>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          1 day before due date
                        </div>
                      </div>
                      <div className="flex space-x-3 text-sm">
                        <div className="bg-primary/10 text-primary rounded-full px-2 py-0.5">Email</div>
                        <div className="bg-primary/10 text-primary rounded-full px-2 py-0.5">SMS</div>
                        <div className="bg-primary/10 text-primary rounded-full px-2 py-0.5">Phone Call</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>All customers with payment plans</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowSetup(false)}>Cancel</Button>
              <Button onClick={handleCreate}>
                <Check className="h-4 w-4 mr-2" />
                Create Sequence
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulerTab;
