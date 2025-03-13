
import { MessageSquare, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const TemplatesTab = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("reminder-7");
  const [subject, setSubject] = useState("Your payment is due in 7 days");
  const [content, setContent] = useState(`Dear {{customer.name}},

We hope this message finds you well. This is a friendly reminder that your payment of {{payment.amount}} is due on {{payment.dueDate}}. 

You can easily make your payment through our secure portal at {{payment.link}} or contact us to discuss flexible payment options.

Thank you for your prompt attention to this matter.

Best regards,
The DebtCare Team`);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSaveTemplate = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Template saved successfully", {
        description: "Your template has been updated and is ready to use."
      });
    }, 1000);
  };
  
  const handlePreview = () => {
    setIsPreviewOpen(true);
    toast({
      title: subject,
      description: content.substring(0, 100) + "...",
      className: "bg-secondary border-secondary",
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 space-y-4">
        <div className="bg-secondary/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Template Categories</h3>
          <ul className="space-y-1">
            <li className="px-3 py-2 bg-primary text-primary-foreground rounded-md">
              Payment Reminders
            </li>
            <li className="px-3 py-2 hover:bg-secondary rounded-md transition-colors cursor-pointer">
              Initial Contact
            </li>
            <li className="px-3 py-2 hover:bg-secondary rounded-md transition-colors cursor-pointer">
              Follow-up Messages
            </li>
            <li className="px-3 py-2 hover:bg-secondary rounded-md transition-colors cursor-pointer">
              Payment Confirmation
            </li>
            <li className="px-3 py-2 hover:bg-secondary rounded-md transition-colors cursor-pointer">
              Plan Options
            </li>
          </ul>
        </div>
        
        <div className="bg-secondary/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Channel Type</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="email" className="rounded" checked readOnly />
              <label htmlFor="email" className="text-sm">Email</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="sms" className="rounded" checked readOnly />
              <label htmlFor="sms" className="text-sm">SMS</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="phone" className="rounded" />
              <label htmlFor="phone" className="text-sm">Phone Script</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="portal" className="rounded" />
              <label htmlFor="portal" className="text-sm">Portal Notification</label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2 space-y-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Edit Template</h3>
            <Select 
              defaultValue="reminder-7" 
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reminder-7">7-Day Payment Reminder</SelectItem>
                <SelectItem value="reminder-3">3-Day Payment Reminder</SelectItem>
                <SelectItem value="reminder-1">1-Day Payment Reminder</SelectItem>
                <SelectItem value="reminder-overdue">Overdue Payment Reminder</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
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
        
        <div className="flex justify-end space-x-2">
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
  );
};

export default TemplatesTab;
