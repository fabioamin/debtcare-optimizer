
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Brain, 
  MessageSquareText, 
  CreditCard, 
  ShieldCheck, 
  ChartLine, 
  Globe, 
  Settings, 
  Zap, 
  BarChart, 
  Users, 
  Home, 
  Menu,
  Bell,
  Search,
  UserCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import AiInsightsPanel from "@/components/dashboard/AiInsightsPanel";
import PaymentOptionsCard from "@/components/dashboard/PaymentOptionsCard";
import CommunicationPanel from "@/components/dashboard/CommunicationPanel";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen bg-background flex">
      {/* Dashboard Sidebar */}
      <DashboardSidebar open={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header */}
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Banner */}
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Welcome to DebtCare Dashboard</h1>
                  <p className="text-muted-foreground mt-1">
                    Access all our powerful debt recovery features in one place
                  </p>
                </div>
                <Button className="mt-4 md:mt-0" size="sm" asChild>
                  <Link to="/dashboard/tour">Take a tour</Link>
                </Button>
              </div>
            </div>
            
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AnalyticsCard 
                title="Recovery Rate" 
                value="87%" 
                change="+12%" 
                changeType="positive" 
                icon={<BarChart className="h-5 w-5" />} 
              />
              <AnalyticsCard 
                title="Response Rate" 
                value="76%" 
                change="+8%" 
                changeType="positive" 
                icon={<Users className="h-5 w-5" />} 
              />
              <AnalyticsCard 
                title="Avg. Time to Pay" 
                value="4.2 days" 
                change="-1.5 days" 
                changeType="positive" 
                icon={<Zap className="h-5 w-5" />} 
              />
            </div>
            
            {/* Main Functionality Tabs */}
            <Tabs defaultValue="ai-insights" className="w-full">
              <TabsList className="w-full flex flex-wrap md:flex-nowrap mb-4">
                <TabsTrigger value="ai-insights" className="flex-1">
                  <Brain className="h-4 w-4 mr-2" />
                  AI Insights
                </TabsTrigger>
                <TabsTrigger value="communication" className="flex-1">
                  <MessageSquareText className="h-4 w-4 mr-2" />
                  Communication
                </TabsTrigger>
                <TabsTrigger value="payment-options" className="flex-1">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Options
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex-1">
                  <ChartLine className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="compliance" className="flex-1">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Compliance
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ai-insights" className="space-y-4 py-2">
                <AiInsightsPanel />
              </TabsContent>
              
              <TabsContent value="communication" className="space-y-4 py-2">
                <CommunicationPanel />
              </TabsContent>
              
              <TabsContent value="payment-options" className="space-y-4 py-2">
                <PaymentOptionsCard />
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4 py-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Analytics</CardTitle>
                    <CardDescription>
                      Comprehensive reporting and dashboards with actionable insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-secondary/50 p-8 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Analytics charts and reports will display here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="compliance" className="space-y-4 py-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance & Security</CardTitle>
                    <CardDescription>
                      Built-in compliance controls and bank-level security
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-secondary/50 p-8 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Compliance dashboard and reports will display here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Additional Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Globe className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Self-Service Portal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Customer-friendly interfaces for debtors to manage and resolve debts without agent intervention.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">Configure Portal</Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Settings className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">White-Label Customization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Fully brandable solution that seamlessly integrates with your existing platforms.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">Customize Branding</Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Zap className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Automated Workflows</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Intelligent automation of routine tasks and decision-making processes.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">Setup Workflows</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
