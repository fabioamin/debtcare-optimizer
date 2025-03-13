
import { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, Database, Activity, BarChart4, ChartLine, Sparkles } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AiInsightsPanel from "@/components/dashboard/AiInsightsPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import InsightChart from "@/components/dashboard/InsightChart";
import { toast } from "@/components/ui/sonner";

const Insights = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("customer");
  const [loading, setLoading] = useState({
    targetedStrategy: false,
    applyInsight: false
  });

  // Demo data for portfolio charts
  const portfolioSegmentationData = [
    { name: "Recent (<30 days)", value: 35 },
    { name: "Medium (30-90 days)", value: 40 },
    { name: "Aging (90-180 days)", value: 15 },
    { name: "Legacy (>180 days)", value: 10 }
  ];

  const collectionProbabilityData = [
    { segment: "Recent", probability: 85 },
    { segment: "Medium", probability: 60 },
    { segment: "Aging", probability: 35 },
    { segment: "Legacy", probability: 15 }
  ];

  const strategyEffectivenessData = [
    { strategy: "Email", effectiveness: 45 },
    { strategy: "SMS", effectiveness: 75 },
    { strategy: "Phone", effectiveness: 60 },
    { strategy: "Legal", effectiveness: 90 }
  ];

  // Demo data for predictive charts
  const paymentTimelineData = [
    { day: 1, probability: 10 },
    { day: 7, probability: 25 },
    { day: 14, probability: 45 },
    { day: 30, probability: 65 },
    { day: 60, probability: 75 },
    { day: 90, probability: 80 }
  ];

  const communicationResponseData = [
    { channel: "Morning", email: 35, sms: 45, phone: 25 },
    { channel: "Afternoon", email: 40, sms: 50, phone: 30 },
    { channel: "Evening", email: 50, sms: 70, phone: 45 },
    { channel: "Weekend", email: 30, sms: 60, phone: 20 }
  ];

  const handleApplyAction = (action: string) => {
    toast.success(`Applied action: ${action}`, {
      description: "The recommended action has been applied to your strategy."
    });
  };

  const handleGenerateTargetedStrategy = () => {
    setLoading(prev => ({ ...prev, targetedStrategy: true }));
    
    // Simulate strategy generation
    setTimeout(() => {
      setLoading(prev => ({ ...prev, targetedStrategy: false }));
      toast.success("Targeted Strategy Generated", {
        description: "A new collection strategy has been created for the medium-sized balances segment."
      });
    }, 2000);
  };

  const handleApplyInsight = () => {
    setLoading(prev => ({ ...prev, applyInsight: true }));
    
    // Simulate insight application
    setTimeout(() => {
      setLoading(prev => ({ ...prev, applyInsight: false }));
      toast.success("Insight Applied to Strategy", {
        description: "Communication schedule updated for optimal evening delivery."
      });
    }, 2000);
  };

  return (
    <div className="h-screen bg-background flex">
      <DashboardSidebar open={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">AI Insights</h1>
                  <p className="text-muted-foreground mt-1">
                    Leverage machine learning and behavioral analytics for smarter debt recovery
                  </p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Link to="/dashboard">
                    <button className="text-sm text-muted-foreground hover:text-foreground">
                      Dashboard
                    </button>
                  </Link>
                  <span className="text-muted-foreground mx-1">/</span>
                  <span className="text-sm font-medium">AI Insights</span>
                </div>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="customer">
                  <Database className="h-4 w-4 mr-2" />
                  Customer Analysis
                </TabsTrigger>
                <TabsTrigger value="portfolio">
                  <BarChart4 className="h-4 w-4 mr-2" />
                  Portfolio Intelligence
                </TabsTrigger>
                <TabsTrigger value="predictive">
                  <Activity className="h-4 w-4 mr-2" />
                  Predictive Analytics
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="customer" className="mt-6">
                <AiInsightsPanel />
                
                <div className="mt-8 bg-secondary/30 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">AI Action Recommendations</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Based on the customer analysis, our AI recommends the following actions:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-background p-3 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">Switch primary contact method to SMS</p>
                            <Button size="sm" variant="outline" onClick={() => handleApplyAction("Switch to SMS")}>Apply</Button>
                          </div>
                        </div>
                        <div className="bg-background p-3 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">Offer mobile payment options prominently</p>
                            <Button size="sm" variant="outline" onClick={() => handleApplyAction("Mobile payment options")}>Apply</Button>
                          </div>
                        </div>
                        <div className="bg-background p-3 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">Schedule communications for weekday evenings</p>
                            <Button size="sm" variant="outline" onClick={() => handleApplyAction("Evening communications")}>Apply</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="portfolio" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Intelligence</CardTitle>
                    <CardDescription>
                      AI-powered analysis of your entire debt portfolio to identify patterns and optimization opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-secondary/40 p-4 rounded-lg">
                          <h3 className="font-medium mb-3">Portfolio Segmentation</h3>
                          <div className="h-48">
                            <InsightChart 
                              type="pie" 
                              data={portfolioSegmentationData} 
                              dataKey="value" 
                              nameKey="name" 
                              height={180}
                            />
                          </div>
                          <div className="mt-3 text-sm text-muted-foreground">
                            AI-generated segmentation based on debt age, amount, and customer behavior
                          </div>
                        </div>
                        
                        <div className="bg-secondary/40 p-4 rounded-lg">
                          <h3 className="font-medium mb-3">Collection Probability</h3>
                          <div className="h-48">
                            <InsightChart 
                              type="bar" 
                              data={collectionProbabilityData} 
                              dataKey="probability" 
                              nameKey="segment" 
                              height={180}
                            />
                          </div>
                          <div className="mt-3 text-sm text-muted-foreground">
                            ML-predicted likelihood of successful collection for each segment
                          </div>
                        </div>
                        
                        <div className="bg-secondary/40 p-4 rounded-lg">
                          <h3 className="font-medium mb-3">Strategy Effectiveness</h3>
                          <div className="h-48">
                            <InsightChart 
                              type="bar" 
                              data={strategyEffectivenessData} 
                              dataKey="effectiveness" 
                              nameKey="strategy" 
                              height={180}
                            />
                          </div>
                          <div className="mt-3 text-sm text-muted-foreground">
                            Comparison of different collection strategies by segment
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Brain className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">AI Portfolio Insight</h3>
                        </div>
                        <p className="mt-2 text-sm">
                          Your portfolio has a significant concentration (38%) of accounts with medium-sized balances 
                          ($1,000-$5,000) that are 30-60 days past due. Our AI model predicts that targeting these accounts 
                          with a customized SMS payment reminder strategy could improve recovery rates by approximately 23%.
                        </p>
                        <div className="mt-3 flex justify-end">
                          <Button 
                            onClick={handleGenerateTargetedStrategy}
                            disabled={loading.targetedStrategy}
                          >
                            {loading.targetedStrategy ? "Generating..." : "Generate Targeted Strategy"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="predictive" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Predictive Analytics</CardTitle>
                    <CardDescription>
                      Forward-looking insights to anticipate payment behavior and optimize collection strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-secondary/40 p-4 rounded-lg">
                          <h3 className="font-medium mb-3">Payment Probability Timeline</h3>
                          <div className="h-48">
                            <InsightChart 
                              type="line" 
                              data={paymentTimelineData} 
                              dataKey="probability" 
                              nameKey="day" 
                              height={180}
                            />
                          </div>
                          <div className="mt-3 text-sm text-muted-foreground">
                            AI prediction of payment probability over time based on historical patterns
                          </div>
                        </div>
                        
                        <div className="bg-secondary/40 p-4 rounded-lg">
                          <h3 className="font-medium mb-3">Communication Response Forecast</h3>
                          <div className="h-48">
                            <InsightChart 
                              type="bar" 
                              data={communicationResponseData} 
                              dataKey="sms" 
                              nameKey="channel" 
                              height={180}
                            />
                          </div>
                          <div className="mt-3 text-sm text-muted-foreground">
                            Predicted response rates for different communication methods and timing
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-secondary/30 p-4 rounded-lg">
                        <h3 className="font-medium mb-3">Collection Forecast</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="bg-background p-3 rounded-lg border">
                              <p className="text-sm text-muted-foreground">7-Day Forecast</p>
                              <p className="text-xl font-bold">$123,567</p>
                              <p className="text-xs text-green-600">↑ 8.2% from prediction</p>
                            </div>
                            <div className="bg-background p-3 rounded-lg border">
                              <p className="text-sm text-muted-foreground">30-Day Forecast</p>
                              <p className="text-xl font-bold">$489,230</p>
                              <p className="text-xs text-yellow-600">↓ 2.1% from prediction</p>
                            </div>
                            <div className="bg-background p-3 rounded-lg border">
                              <p className="text-sm text-muted-foreground">90-Day Forecast</p>
                              <p className="text-xl font-bold">$1,243,500</p>
                              <p className="text-xs text-green-600">↑ 5.7% from prediction</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <ChartLine className="h-5 w-5 text-primary mt-1" />
                          <div>
                            <h3 className="font-medium">Trend Analysis</h3>
                            <p className="mt-1 text-sm">
                              Our AI has detected an emerging pattern in your recent collections: payments made after 
                              business hours (6PM-9PM) have increased by 34% in the last 30 days. This suggests an 
                              opportunity to optimize your SMS and email communications for evening delivery.
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button 
                            onClick={handleApplyInsight}
                            disabled={loading.applyInsight}
                          >
                            {loading.applyInsight ? "Applying..." : "Apply Insight to Strategy"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Insights;
