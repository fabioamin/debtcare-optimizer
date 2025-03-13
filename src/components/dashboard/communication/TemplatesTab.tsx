
import { MessageSquare, Save, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
  channels: string[];
}

const TemplatesTab = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "reminder-7",
      name: "7-Day Payment Reminder",
      subject: "Your payment is due in 7 days",
      content: `Dear {{customer.name}},

We hope this message finds you well. This is a friendly reminder that your payment of {{payment.amount}} is due on {{payment.dueDate}}. 

You can easily make your payment through our secure portal at {{payment.link}} or contact us to discuss flexible payment options.

Thank you for your prompt attention to this matter.

Best regards,
The DebtCare Team`,
      category: "Payment Reminders",
      channels: ["Email", "SMS"]
    },
    {
      id: "reminder-3",
      name: "3-Day Payment Reminder",
      subject: "Payment reminder: Due in 3 days",
      content: `Dear {{customer.name}},

This is a reminder that your payment of {{payment.amount}} is due in 3 days on {{payment.dueDate}}.

Please ensure timely payment to avoid any late fees. You can pay online at {{payment.link}}.

Thank you,
The DebtCare Team`,
      category: "Payment Reminders",
      channels: ["Email"]
    },
    {
      id: "reminder-1",
      name: "1-Day Payment Reminder",
      subject: "URGENT: Payment due tomorrow",
      content: `Dear {{customer.name}},

Your payment of {{payment.amount}} is due TOMORROW. Please make your payment promptly to avoid late fees.

Pay now: {{payment.link}}

The DebtCare Team`,
      category: "Payment Reminders",
      channels: ["Email", "SMS", "WhatsApp"]
    }
  ]);
  
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("reminder-7");
  const [selectedCategory, setSelectedCategory] = useState<string>("Payment Reminders");
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const { toast } = useToast();
  
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  
  const categories = [
    "Payment Reminders",
    "Initial Contact",
    "Follow-up Messages",
    "Payment Confirmation",
    "Plan Options"
  ];
  
  const channelOptions = ["Email", "SMS", "WhatsApp", "Telegram", "Portal", "Phone"];
  
  useEffect(() => {
    if (!isCreatingNew) {
      const template = templates.find(t => t.id === selectedTemplateId);
      if (template) {
        setSubject(template.subject);
        setContent(template.content);
        setTemplateName(template.name);
        setSelectedChannels(template.channels);
      }
    }
  }, [selectedTemplateId, templates, isCreatingNew]);
  
  const handleSaveTemplate = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isCreatingNew) {
        // Create new template
        const newTemplate: Template = {
          id: `template-${Date.now()}`,
          name: templateName,
          subject,
          content,
          category: selectedCategory,
          channels: selectedChannels
        };
        
        setTemplates([...templates, newTemplate]);
        setSelectedTemplateId(newTemplate.id);
        setIsCreatingNew(false);
      } else {
        // Update existing template
        setTemplates(templates.map(template => 
          template.id === selectedTemplateId 
            ? { ...template, subject, content, name: templateName, channels: selectedChannels } 
            : template
        ));
      }
      
      setIsSaving(false);
      toast.success("Template saved successfully", {
        description: "Your template has been updated and is ready to use."
      });
    }, 1000);
  };
  
  const handlePreview = () => {
    toast({
      title: subject,
      description: content.substring(0, 100) + "...",
      className: "bg-secondary border-secondary",
    });
  };
  
  const handleNewTemplate = () => {
    setIsCreatingNew(true);
    setSubject("");
    setContent("");
    setTemplateName("New Template");
    setSelectedChannels(["Email"]);
  };
  
  const handleDeleteTemplate = () => {
    if (templates.length <= 1) {
      toast.error("Cannot delete", {
        description: "You must have at least one template."
      });
      return;
    }
    
    setTemplates(templates.filter(t => t.id !== selectedTemplateId));
    setSelectedTemplateId(templates[0].id !== selectedTemplateId ? templates[0].id : templates[1].id);
    
    toast.success("Template deleted", {
      description: "The template has been removed."
    });
  };
  
  const toggleChannel = (channel: string) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 space-y-4">
        <div className="bg-secondary/50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Template Categories</h3>
            <Button variant="ghost" size="sm" onClick={handleNewTemplate}>
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
          <ul className="space-y-1">
            {categories.map((category, idx) => (
              <li 
                key={idx} 
                className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${selectedCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-secondary/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Channel Type</h3>
          <div className="space-y-2">
            {channelOptions.map((channel, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id={`channel-${idx}`} 
                  className="rounded" 
                  checked={selectedChannels.includes(channel)}
                  onChange={() => toggleChannel(channel)}
                />
                <label htmlFor={`channel-${idx}`} className="text-sm">{channel}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2 space-y-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">
              {isCreatingNew ? "Create New Template" : "Edit Template"}
            </h3>
            {!isCreatingNew && (
              <Select 
                value={selectedTemplateId}
                onValueChange={setSelectedTemplateId}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {templates
                    .filter(t => t.category === selectedCategory)
                    .map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Template Name</label>
              <Input 
                value={templateName} 
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Subject Line</label>
              <Input 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Message Content</label>
              <Textarea 
                rows={8} 
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            
            <div className="bg-secondary/50 p-3 rounded-lg">
              <h4 className="text-sm font-medium mb-1">Available Variables</h4>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-secondary px-2 py-1 rounded-md">{'{{customer.name}}'}</span>
                <span className="text-xs bg-secondary px-2 py-1 rounded-md">{'{{payment.amount}}'}</span>
                <span className="text-xs bg-secondary px-2 py-1 rounded-md">{'{{payment.dueDate}}'}</span>
                <span className="text-xs bg-secondary px-2 py-1 rounded-md">{'{{payment.link}}'}</span>
                <span className="text-xs bg-secondary px-2 py-1 rounded-md">{'{{company.name}}'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          {!isCreatingNew && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleDeleteTemplate}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          
          <div className="ml-auto flex space-x-2">
            <Button variant="outline" onClick={handlePreview}>Preview</Button>
            <Button 
              onClick={handleSaveTemplate}
              disabled={isSaving}
            >
              {isSaving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Template
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesTab;
