import { useState } from "react";
import { 
  Target, 
  ChevronRight, 
  ArrowRight, 
  Plus, 
  Save, 
  Copy, 
  Trash, 
  Settings, 
  Lightbulb,
  WandSparkles
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Types for strategy model
interface StrategyStep {
  id: string;
  type: string;
  action: string;
  delay: number;
  delayUnit: string;
  condition?: string;
  message?: string;
}

interface Strategy {
  id: string;
  name: string;
  description: string;
  productType: string;
  riskLevel: string;
  steps: StrategyStep[];
  isActive: boolean;
  createdAt: Date;
}

// Sample strategy templates
const strategyTemplates = [
  {
    id: "template-1",
    name: "Basic Reminder Sequence",
    description: "A simple sequence of reminders with increasing urgency",
    productType: "credit-card",
    riskLevel: "low",
    steps: [
      { id: "step-1", type: "email", action: "send-reminder", delay: 3, delayUnit: "days", message: "Your payment is due in 3 days" },
      { id: "step-2", type: "sms", action: "send-reminder", delay: 1, delayUnit: "days", message: "Your payment is due tomorrow" },
      { id: "step-3", type: "email", action: "send-overdue", delay: 1, delayUnit: "days", message: "Your payment is now overdue" },
      { id: "step-4", type: "phone", action: "make-call", delay: 3, delayUnit: "days" }
    ]
  },
  {
    id: "template-2",
    name: "High Risk Collection",
    description: "An aggressive strategy for high-risk accounts",
    productType: "personal-loan",
    riskLevel: "high",
    steps: [
      { id: "step-1", type: "email", action: "send-reminder", delay: 1, delayUnit: "days", message: "Your payment is due tomorrow" },
      { id: "step-2", type: "sms", action: "send-overdue", delay: 1, delayUnit: "days", message: "Your payment is now overdue" },
      { id: "step-3", type: "phone", action: "make-call", delay: 1, delayUnit: "days" },
      { id: "step-4", type: "legal", action: "send-notice", delay: 7, delayUnit: "days" }
    ]
  },
  {
    id: "template-3",
    name: "Product Purchase Follow-up",
    description: "Follow-up strategy for product purchases with installments",
    productType: "product-sale",
    riskLevel: "medium",
    steps: [
      { id: "step-1", type: "email", action: "send-thank-you", delay: 1, delayUnit: "days", message: "Thank you for your purchase" },
      { id: "step-2", type: "email", action: "send-reminder", delay: 3, delayUnit: "days", message: "Your first payment is coming up" },
      { id: "step-3", type: "sms", action: "send-reminder", delay: 1, delayUnit: "days", message: "Payment due tomorrow" }
    ]
  }
];

// Sample existing strategies
const sampleStrategies = [
  {
    id: "strategy-1",
    name: "Credit Card Default Strategy",
    description: "Standard strategy for credit card defaults",
    productType: "credit-card",
    riskLevel: "medium",
    steps: [
      { id: "step-1", type: "email", action: "send-reminder", delay: 3, delayUnit: "days", message: "Your payment is due in 3 days" },
      { id: "step-2", type: "sms", action: "send-reminder", delay: 1, delayUnit: "days", message: "Your payment is due tomorrow" },
      { id: "step-3", type: "email", action: "send-overdue", delay: 1, delayUnit: "days", message: "Your payment is now overdue" },
      { id: "step-4", type: "phone", action: "make-call", delay: 3, delayUnit: "days" }
    ],
    isActive: true,
    createdAt: new Date(2023, 5, 15)
  },
  {
    id: "strategy-2",
    name: "Personal Loan Recovery",
    description: "Recovery strategy for personal loans",
    productType: "personal-loan",
    riskLevel: "high",
    steps: [
      { id: "step-1", type: "email", action: "send-reminder", delay: 5, delayUnit: "days", message: "Your loan payment is due soon" },
      { id: "step-2", type: "phone", action: "make-call", delay: 2, delayUnit: "days" },
      { id: "step-3", type: "legal", action: "send-notice", delay: 10, delayUnit: "days" }
    ],
    isActive: true,
    createdAt: new Date(2023, 7, 20)
  }
];

// Action step types
const stepTypes = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS Message" },
  { value: "phone", label: "Phone Call" },
  { value: "letter", label: "Physical Letter" },
  { value: "visit", label: "In-person Visit" },
  { value: "legal", label: "Legal Action" }
];

// Product types
const productTypes = [
  { value: "credit-card", label: "Credit Card" },
  { value: "personal-loan", label: "Personal Loan" },
  { value: "secured-loan", label: "Secured Loan" },
  { value: "mortgage", label: "Mortgage" },
  { value: "vehicle-financing", label: "Vehicle Financing" },
  { value: "insurance", label: "Insurance" },
  { value: "product-sale", label: "Product Sale" },
  { value: "service", label: "Service" }
];

// Risk levels
const riskLevels = [
  { value: "low", label: "Low Risk" },
  { value: "medium", label: "Medium Risk" },
  { value: "high", label: "High Risk" }
];

const StrategyCreation = () => {
  const [strategies, setStrategies] = useState<Strategy[]>(sampleStrategies);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("existing");
  const [currentStrategyId, setCurrentStrategyId] = useState<string | null>(null);
  
  // New strategy state
  const [strategy, setStrategy] = useState<Omit<Strategy, 'id' | 'createdAt' | 'isActive'>>({
    name: "",
    description: "",
    productType: "",
    riskLevel: "medium",
    steps: []
  });

  const resetStrategy = () => {
    setStrategy({
      name: "",
      description: "",
      productType: "",
      riskLevel: "medium",
      steps: []
    });
    setCurrentStrategyId(null);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = strategyTemplates.find(t => t.id === templateId);
    if (template) {
      setStrategy({
        name: template.name + " (Copy)",
        description: template.description,
        productType: template.productType,
        riskLevel: template.riskLevel,
        steps: [...template.steps]
      });
      setSelectedTemplate(templateId);
    }
  };

  const handleStrategyEdit = (strategyId: string) => {
    const strategyToEdit = strategies.find(s => s.id === strategyId);
    if (strategyToEdit) {
      setStrategy({
        name: strategyToEdit.name,
        description: strategyToEdit.description,
        productType: strategyToEdit.productType,
        riskLevel: strategyToEdit.riskLevel,
        steps: [...strategyToEdit.steps]
      });
      setCurrentStrategyId(strategyId);
      setActiveTab("create");
    }
  };

  const handleStrategyDelete = (strategyId: string) => {
    setStrategies(strategies.filter(s => s.id !== strategyId));
    toast.success("Strategy deleted successfully");
  };

  const handleStrategyDuplicate = (strategyId: string) => {
    const strategyToDuplicate = strategies.find(s => s.id === strategyId);
    if (strategyToDuplicate) {
      const newStrategy = {
        ...strategyToDuplicate,
        id: `strategy-${Date.now()}`,
        name: `${strategyToDuplicate.name} (Copy)`,
        createdAt: new Date(),
        isActive: false
      };
      setStrategies([...strategies, newStrategy]);
      toast.success("Strategy duplicated successfully");
    }
  };

  const handleToggleActive = (strategyId: string) => {
    setStrategies(strategies.map(s => 
      s.id === strategyId ? { ...s, isActive: !s.isActive } : s
    ));
    
    const strategy = strategies.find(s => s.id === strategyId);
    if (strategy) {
      toast.success(`Strategy ${strategy.isActive ? 'deactivated' : 'activated'} successfully`);
    }
  };

  const handleAddStep = () => {
    const newStep: StrategyStep = {
      id: `step-${strategy.steps.length + 1}`,
      type: "email",
      action: "send-reminder",
      delay: 3,
      delayUnit: "days",
      message: ""
    };
    setStrategy({
      ...strategy,
      steps: [...strategy.steps, newStep]
    });
  };

  const handleUpdateStep = (stepId: string, field: string, value: any) => {
    setStrategy({
      ...strategy,
      steps: strategy.steps.map(step => 
        step.id === stepId ? { ...step, [field]: value } : step
      )
    });
  };

  const handleRemoveStep = (stepId: string) => {
    setStrategy({
      ...strategy,
      steps: strategy.steps.filter(step => step.id !== stepId)
    });
  };

  const handleSaveStrategy = () => {
    if (!strategy.name || !strategy.productType) {
      toast.error("Strategy name and product type are required");
      return;
    }

    if (strategy.steps.length === 0) {
      toast.error("At least one step is required in the strategy");
      return;
    }

    if (currentStrategyId) {
      // Update existing strategy
      setStrategies(strategies.map(s => 
        s.id === currentStrategyId ? {
          ...s,
          name: strategy.name,
          description: strategy.description,
          productType: strategy.productType,
          riskLevel: strategy.riskLevel,
          steps: strategy.steps
        } : s
      ));
      toast.success("Strategy updated successfully");
    } else {
      // Create new strategy
      const newStrategy: Strategy = {
        id: `strategy-${Date.now()}`,
        name: strategy.name,
        description: strategy.description,
        productType: strategy.productType,
        riskLevel: strategy.riskLevel,
        steps: strategy.steps,
        isActive: false,
        createdAt: new Date()
      };
      setStrategies([...strategies, newStrategy]);
      toast.success("Strategy created successfully");
    }

    resetStrategy();
    setActiveTab("existing");
  };

  const handleMoveStep = (stepId: string, direction: 'up' | 'down') => {
    const stepIndex = strategy.steps.findIndex(step => step.id === stepId);
    if (
      (direction === 'up' && stepIndex === 0) || 
      (direction === 'down' && stepIndex === strategy.steps.length - 1)
    ) {
      return;
    }

    const newSteps = [...strategy.steps];
    const newIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;
    const step = newSteps[stepIndex];
    newSteps.splice(stepIndex, 1);
    newSteps.splice(newIndex, 0, step);

    setStrategy({
      ...strategy,
      steps: newSteps
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2">
        <TabsTrigger value="existing">Existing Strategies</TabsTrigger>
        <TabsTrigger value="create">Create Strategy</TabsTrigger>
      </TabsList>

      {/* Existing Strategies Tab */}
      <TabsContent value="existing" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Manage Strategies</h2>
          <Button onClick={() => { resetStrategy(); setActiveTab("create"); }}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Strategy
          </Button>
        </div>

        {strategies.length === 0 ? (
          <Card className="border-dashed border-2 text-center p-6">
            <CardContent className="pt-6 flex flex-col items-center">
              <Target className="h-12 w-12 text-muted-foreground mb-4" />
              <CardTitle className="text-xl mb-2">No Strategies Yet</CardTitle>
              <CardDescription className="max-w-md mx-auto mb-4">
                Create your first collection strategy to automate your debt recovery process.
              </CardDescription>
              <Button onClick={() => setActiveTab("create")}>
                <Plus className="h-4 w-4 mr-2" />
                Create Strategy
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {strategies.map(strategy => (
              <Card key={strategy.id} className="relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-20 h-20 ${strategy.isActive ? 'bg-green-500' : 'bg-gray-300'} transform rotate-45 translate-x-8 -translate-y-8`}></div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-primary" />
                      <CardTitle>{strategy.name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStrategyEdit(strategy.id)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStrategyDuplicate(strategy.id)}>
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(strategy.id)}>
                          {strategy.isActive ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleStrategyDelete(strategy.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Product Type:</span>
                      <span className="font-medium">
                        {productTypes.find(p => p.value === strategy.productType)?.label || strategy.productType}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Risk Level:</span>
                      <span className="font-medium">
                        {riskLevels.find(r => r.value === strategy.riskLevel)?.label || strategy.riskLevel}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Steps:</span>
                      <span className="font-medium">{strategy.steps.length}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleStrategyEdit(strategy.id)}>
                    Edit Strategy
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    Created: {strategy.createdAt.toLocaleDateString()}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      {/* Create Strategy Tab */}
      <TabsContent value="create" className="space-y-6">
        {/* Strategy General Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              {currentStrategyId ? 'Edit Strategy' : 'New Strategy'}
            </CardTitle>
            <CardDescription>
              {currentStrategyId 
                ? 'Update your existing collection strategy' 
                : 'Define a new collection strategy for your portfolio'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="strategy-name">Strategy Name</Label>
                <Input
                  id="strategy-name"
                  placeholder="Enter strategy name"
                  value={strategy.name}
                  onChange={(e) => setStrategy({ ...strategy, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-type">Product Type</Label>
                <Select
                  value={strategy.productType}
                  onValueChange={(value) => setStrategy({ ...strategy, productType: value })}
                >
                  <SelectTrigger id="product-type">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="strategy-description">Description</Label>
              <Input
                id="strategy-description"
                placeholder="Enter strategy description"
                value={strategy.description}
                onChange={(e) => setStrategy({ ...strategy, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="risk-level">Risk Level</Label>
              <Select
                value={strategy.riskLevel}
                onValueChange={(value) => setStrategy({ ...strategy, riskLevel: value })}
              >
                <SelectTrigger id="risk-level">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  {riskLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Templates */}
        {!currentStrategyId && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Strategy Templates
              </CardTitle>
              <CardDescription>
                Use a template to quickly start with a pre-defined strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {strategyTemplates.map(template => (
                  <Card 
                    key={template.id} 
                    className={`border cursor-pointer transition-all hover:border-primary ${selectedTemplate === template.id ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription className="text-xs">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Product:</span>
                          <span>
                            {productTypes.find(p => p.value === template.productType)?.label || template.productType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Risk Level:</span>
                          <span>
                            {riskLevels.find(r => r.value === template.riskLevel)?.label || template.riskLevel}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Steps:</span>
                          <span>{template.steps.length}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 justify-end">
                      <Button size="sm" variant="ghost">
                        Use Template
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Strategy Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <WandSparkles className="h-5 w-5 mr-2" />
              Strategy Steps
            </CardTitle>
            <CardDescription>
              Configure the sequence of steps in your collection strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {strategy.steps.length === 0 ? (
              <div className="text-center p-6 border-dashed border-2 rounded-lg">
                <p className="text-muted-foreground mb-4">No steps defined yet. Add your first step to get started.</p>
                <Button onClick={handleAddStep}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Step
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {strategy.steps.map((step, index) => (
                  <div key={step.id} className="p-4 border rounded-lg bg-card relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1 bg-primary/30"></div>
                    <div className="ml-3 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium flex items-center">
                          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs mr-2">
                            {index + 1}
                          </span>
                          Step {index + 1}: {stepTypes.find(t => t.value === step.type)?.label}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleMoveStep(step.id, 'up')}
                            disabled={index === 0}
                          >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                              <path d="M7.5 3C7.77614 3 8 3.22386 8 3.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 3.5C7 3.22386 7.22386 3 7.5 3Z" fill="currentColor" transform="rotate(180, 7.5, 8)"></path>
                            </svg>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleMoveStep(step.id, 'down')}
                            disabled={index === strategy.steps.length - 1}
                          >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                              <path d="M7.5 3C7.77614 3 8 3.22386 8 3.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 3.5C7 3.22386 7.22386 3 7.5 3Z" fill="currentColor"></path>
                            </svg>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive"
                            onClick={() => handleRemoveStep(step.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`step-${step.id}-type`}>Action Type</Label>
                          <Select
                            value={step.type}
                            onValueChange={(value) => handleUpdateStep(step.id, 'type', value)}
                          >
                            <SelectTrigger id={`step-${step.id}-type`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {stepTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`step-${step.id}-action`}>Action</Label>
                          <Select
                            value={step.action}
                            onValueChange={(value) => handleUpdateStep(step.id, 'action', value)}
                          >
                            <SelectTrigger id={`step-${step.id}-action`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="send-reminder">Send Reminder</SelectItem>
                              <SelectItem value="send-overdue">Send Overdue Notice</SelectItem>
                              <SelectItem value="send-thank-you">Send Thank You</SelectItem>
                              <SelectItem value="make-call">Make Phone Call</SelectItem>
                              <SelectItem value="send-notice">Send Legal Notice</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex space-x-2">
                          <div className="space-y-2 flex-1">
                            <Label htmlFor={`step-${step.id}-delay`}>Wait</Label>
                            <Input
                              id={`step-${step.id}-delay`}
                              type="number"
                              min="0"
                              value={step.delay}
                              onChange={(e) => handleUpdateStep(step.id, 'delay', parseInt(e.target.value))}
                            />
                          </div>
                          
                          <div className="space-y-2 flex-1">
                            <Label htmlFor={`step-${step.id}-delay-unit`}>Unit</Label>
                            <Select
                              value={step.delayUnit}
                              onValueChange={(value) => handleUpdateStep(step.id, 'delayUnit', value)}
                            >
                              <SelectTrigger id={`step-${step.id}-delay-unit`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hours">Hours</SelectItem>
                                <SelectItem value="days">Days</SelectItem>
                                <SelectItem value="weeks">Weeks</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      {(step.type === 'email' || step.type === 'sms') && (
                        <div className="space-y-2">
                          <Label htmlFor={`step-${step.id}-message`}>Message</Label>
                          <Input
                            id={`step-${step.id}-message`}
                            placeholder="Enter message content"
                            value={step.message || ''}
                            onChange={(e) => handleUpdateStep(step.id, 'message', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    
                    {index < strategy.steps.length - 1 && (
                      <div className="flex justify-center my-2">
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleAddStep}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Next Step
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => { setActiveTab("existing"); resetStrategy(); }}>
            Cancel
          </Button>
          <div className="space-x-2">
            <Button variant="default" onClick={handleSaveStrategy}>
              <Save className="h-4 w-4 mr-2" />
              {currentStrategyId ? 'Update Strategy' : 'Save Strategy'}
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default StrategyCreation;
