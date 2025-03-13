
import { BarChart4, Circle, Phone, Mail, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import InsightChart from "./InsightChart";
import { toast } from "@/components/ui/toast";

const AiInsightsPanel = () => {
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);

  const behavioralInsights = [
    {
      title: "Payment Preference",
      value: "Mobile Payments",
      score: 87,
      recommendation: "Prioritize mobile payment options in communications"
    },
    {
      title: "Best Contact Method",
      value: "SMS",
      score: 92,
      recommendation: "Use SMS for initial contact and reminders"
    },
    {
      title: "Best Time to Contact",
      value: "Weekday Evenings",
      score: 78,
      recommendation: "Schedule communications between 6-8pm on weekdays"
    }
  ];

  const contactMethods = [
    { method: "Phone", icon: Phone, percentage: 30 },
    { method: "Email", icon: Mail, percentage: 25 },
    { method: "SMS", icon: MessageSquare, percentage: 45 }
  ];

  // Demo data for charts
  const paymentProbabilityData = [
    { day: "Mon", probability: 42 },
    { day: "Tue", probability: 55 },
    { day: "Wed", probability: 50 },
    { day: "Thu", probability: 65 },
    { day: "Fri", probability: 72 },
    { day: "Sat", probability: 60 },
    { day: "Sun", probability: 45 },
  ];

  const handleGenerateStrategy = () => {
    setIsGeneratingStrategy(true);
    
    // Simulate strategy generation
    setTimeout(() => {
      setIsGeneratingStrategy(false);
      toast({
        title: "Strategy Generated",
        description: "Custom strategy has been created based on customer insights.",
      });
    }, 2000);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>
            Behavioral analytics and machine learning predictions for personalized debt recovery strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {behavioralInsights.map((insight, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">{insight.title}</h4>
                    <p className="text-lg font-semibold">{insight.value}</p>
                  </div>
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                    {insight.score}% Match
                  </div>
                </div>
                <Progress value={insight.score} className="h-2" />
                <p className="text-xs text-muted-foreground">{insight.recommendation}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-3">Payment Probability by Day</h4>
              <InsightChart 
                type="bar" 
                data={paymentProbabilityData} 
                dataKey="probability" 
                nameKey="day" 
              />
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-3">Contact Method Effectiveness</h4>
              <InsightChart 
                type="pie" 
                data={contactMethods.map(c => ({ name: c.method, value: c.percentage }))} 
                dataKey="value" 
                nameKey="name" 
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            disabled={isGeneratingStrategy}
            onClick={handleGenerateStrategy}
          >
            {isGeneratingStrategy ? "Generating..." : "Generate Custom Strategy"}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Customer Engagement Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <BarChart4 className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">76%</div>
                <div className="text-sm text-muted-foreground">Likelihood of payment within 7 days</div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Contact Responsiveness</span>
                  <span className="font-medium">High</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Payment History</span>
                  <span className="font-medium">Medium</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Financial Capacity</span>
                  <span className="font-medium">Medium-High</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Optimal Contact Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <method.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{method.method}</span>
                      <span className="text-sm">{method.percentage}%</span>
                    </div>
                    <Progress value={method.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-secondary/50 p-4 rounded-lg">
              <div className="flex items-start">
                <Circle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">AI Recommendation</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Begin with SMS outreach, followed by email with payment link, and phone call only if no response after 3 days.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AiInsightsPanel;
