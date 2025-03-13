
import { Calendar, Clock, Users, Check, Plus, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SequenceStep {
  id: string;
  name: string;
  timing: string;
  channels: string[];
}

interface Sequence {
  id: string;
  name: string;
  trigger: string;
  steps: SequenceStep[];
  audience: string;
  active: boolean;
}

const SchedulerTab = () => {
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [showSetupDialog, setShowSetupDialog] = useState(false);
  const [currentSequence, setCurrentSequence] = useState<Sequence | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  // Form states
  const [sequenceName, setSequenceName] = useState("Payment Reminder Sequence");
  const [triggerEvent, setTriggerEvent] = useState("Payment Due Date");
  const [audience, setAudience] = useState("All customers with payment plans");
  const [steps, setSteps] = useState<SequenceStep[]>([
    {
      id: "step-1",
      name: "7-Day Payment Reminder",
      timing: "7 days before due date",
      channels: ["Email", "SMS"]
    },
    {
      id: "step-2",
      name: "3-Day Payment Reminder",
      timing: "3 days before due date",
      channels: ["Email"]
    },
    {
      id: "step-3",
      name: "1-Day Payment Reminder",
      timing: "1 day before due date",
      channels: ["Email", "SMS", "Phone Call"]
    }
  ]);
  
  const handleSetup = () => {
    setIsEditing(false);
    setCurrentSequence(null);
    resetForm();
    setShowSetupDialog(true);
  };
  
  const resetForm = () => {
    setSequenceName("Payment Reminder Sequence");
    setTriggerEvent("Payment Due Date");
    setAudience("All customers with payment plans");
    setSteps([
      {
        id: "step-1",
        name: "7-Day Payment Reminder",
        timing: "7 days before due date",
        channels: ["Email", "SMS"]
      },
      {
        id: "step-2",
        name: "3-Day Payment Reminder",
        timing: "3 days before due date",
        channels: ["Email"]
      },
      {
        id: "step-3",
        name: "1-Day Payment Reminder",
        timing: "1 day before due date",
        channels: ["Email", "SMS", "Phone Call"]
      }
    ]);
  };
  
  const handleEdit = (sequence: Sequence) => {
    setIsEditing(true);
    setCurrentSequence(sequence);
    setSequenceName(sequence.name);
    setTriggerEvent(sequence.trigger);
    setAudience(sequence.audience);
    setSteps(sequence.steps);
    setShowSetupDialog(true);
  };
  
  const handleCreate = () => {
    const newSequence: Sequence = {
      id: isEditing && currentSequence ? currentSequence.id : `seq-${Date.now()}`,
      name: sequenceName,
      trigger: triggerEvent,
      steps: steps,
      audience: audience,
      active: true
    };
    
    if (isEditing && currentSequence) {
      // Update existing sequence
      setSequences(sequences.map(seq => 
        seq.id === currentSequence.id ? newSequence : seq
      ));
      toast.success("Sequence updated", {
        description: "Your automated sequence has been updated."
      });
    } else {
      // Create new sequence
      setSequences([...sequences, newSequence]);
      toast.success("Sequence created", {
        description: "Your automated sequence has been scheduled."
      });
    }
    
    setShowSetupDialog(false);
  };
  
  const handleDelete = (id: string) => {
    setSequences(sequences.filter(seq => seq.id !== id));
    toast.success("Sequence deleted", {
      description: "The automation sequence has been removed."
    });
  };
  
  const toggleSequenceStatus = (id: string) => {
    setSequences(sequences.map(seq => 
      seq.id === id ? { ...seq, active: !seq.active } : seq
    ));
    
    const sequence = sequences.find(seq => seq.id === id);
    if (sequence) {
      toast.info(`Sequence ${sequence.active ? 'disabled' : 'enabled'}`, {
        description: `"${sequence.name}" is now ${sequence.active ? 'disabled' : 'enabled'}.`
      });
    }
  };
  
  const addStep = () => {
    const newStep: SequenceStep = {
      id: `step-${Date.now()}`,
      name: "New Step",
      timing: "Custom timing",
      channels: ["Email"]
    };
    setSteps([...steps, newStep]);
  };
  
  const removeStep = (stepId: string) => {
    setSteps(steps.filter(step => step.id !== stepId));
  };
  
  return (
    <div>
      {sequences.length === 0 ? (
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
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Active Sequences</h3>
            <Button onClick={handleSetup}>
              <Plus className="h-4 w-4 mr-2" />
              New Sequence
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sequences.map(sequence => (
              <Card key={sequence.id} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{sequence.name}</h3>
                    <p className="text-sm text-muted-foreground">Trigger: {sequence.trigger}</p>
                  </div>
                  <Badge variant={sequence.active ? "default" : "secondary"}>
                    {sequence.active ? "Active" : "Disabled"}
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-4">
                  {sequence.steps.map((step, idx) => (
                    <div key={step.id} className="text-sm flex">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-medium">{step.name}</div>
                        <div className="text-muted-foreground text-xs">{step.timing}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {step.channels.map(channel => (
                            <Badge key={channel} variant="outline" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2 justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleSequenceStatus(sequence.id)}
                  >
                    {sequence.active ? "Disable" : "Enable"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(sequence)}
                  >
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(sequence.id)}
                  >
                    <Trash className="h-3.5 w-3.5 mr-1" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <Dialog open={showSetupDialog} onOpenChange={setShowSetupDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Sequence" : "Create Automated Sequence"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sequence Name</label>
                <Input 
                  value={sequenceName}
                  onChange={(e) => setSequenceName(e.target.value)}
                  placeholder="Payment Reminder Sequence"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Trigger Event</label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={triggerEvent}
                  onChange={(e) => setTriggerEvent(e.target.value)}
                >
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
                <Button variant="outline" size="sm" onClick={addStep}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Step
                </Button>
              </div>
              
              {steps.map((step, idx) => (
                <div key={step.id} className="p-3 border-b">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <Input 
                          value={step.name}
                          onChange={(e) => {
                            const updatedSteps = [...steps];
                            updatedSteps[idx].name = e.target.value;
                            setSteps(updatedSteps);
                          }}
                          className="w-[60%]"
                        />
                        <div className="flex items-center gap-2">
                          <select
                            className="text-sm rounded-md border border-input bg-background px-2 py-1"
                            value={step.timing}
                            onChange={(e) => {
                              const updatedSteps = [...steps];
                              updatedSteps[idx].timing = e.target.value;
                              setSteps(updatedSteps);
                            }}
                          >
                            <option>7 days before due date</option>
                            <option>3 days before due date</option>
                            <option>1 day before due date</option>
                            <option>On due date</option>
                            <option>1 day after due date</option>
                            <option>3 days after due date</option>
                            <option>7 days after due date</option>
                          </select>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0" 
                            onClick={() => removeStep(step.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["Email", "SMS", "WhatsApp", "Telegram", "Phone Call"].map((channel) => (
                          <Badge 
                            key={channel} 
                            variant={step.channels.includes(channel) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              const updatedSteps = [...steps];
                              if (step.channels.includes(channel)) {
                                updatedSteps[idx].channels = step.channels.filter(c => c !== channel);
                              } else {
                                updatedSteps[idx].channels = [...step.channels, channel];
                              }
                              setSteps(updatedSteps);
                            }}
                          >
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Audience</label>
              <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
                <Users className="h-5 w-5 text-muted-foreground" />
                <select 
                  className="flex-1 bg-transparent border-none focus:outline-none"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                >
                  <option>All customers with payment plans</option>
                  <option>High-risk customers</option>
                  <option>Customers with pending payments</option>
                  <option>New customers</option>
                  <option>Customers with missed payments</option>
                </select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSetupDialog(false)}>Cancel</Button>
            <Button onClick={handleCreate}>
              <Check className="h-4 w-4 mr-2" />
              {isEditing ? "Update Sequence" : "Create Sequence"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchedulerTab;
