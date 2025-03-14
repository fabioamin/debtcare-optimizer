
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
  Target,
  Wand2,
  Briefcase,
  Receipt,
  Clock,
  AlertTriangle,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import AiInsightsPanel from "@/components/dashboard/AiInsightsPanel";
import PaymentOptionsCard from "@/components/dashboard/PaymentOptionsCard";
import CommunicationPanel from "@/components/dashboard/CommunicationPanel";
import PortfolioManagement from "@/components/dashboard/PortfolioManagement";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  // Portfolio summary data (previously from PortfolioManagement)
  const portfolioTotal = 96700;
  const clientCount = 8;
  const overdueTotal = 63600;
  const overduePercentage = Math.round((overdueTotal / portfolioTotal) * 100);
  const expectedRecovery = Math.round(overdueTotal * 0.877 * 100) / 100;
  const recoveryPercentage = Math.round((expectedRecovery / overdueTotal) * 100 * 10) / 10;
  const activeProducts = 7;

  // Format currency function
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-6">
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
            <Link to="/dashboard/settings">Take a tour</Link>
          </Button>
        </div>
      </div>
      
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Total do Portfólio</span>
              <Receipt className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{formatCurrency(portfolioTotal)}</div>
              <div className="text-sm text-muted-foreground">{clientCount} clientes</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Total em Atraso</span>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{formatCurrency(overdueTotal)}</div>
              <div className="text-sm text-muted-foreground">{overduePercentage}% do portfólio</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Recuperação Prevista</span>
              <Target className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{formatCurrency(expectedRecovery)}</div>
              <div className="text-sm text-muted-foreground">{recoveryPercentage}% do total em atraso</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Produtos Ativos</span>
              <ShoppingBag className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{activeProducts}</div>
              <div className="text-sm text-muted-foreground">Tipos de produtos</div>
            </div>
          </CardContent>
        </Card>
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
          icon={<Clock className="h-5 w-5" />} 
        />
      </div>
      
      {/* Main Functionality Tabs */}
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="w-full flex flex-wrap md:flex-nowrap mb-4">
          <TabsTrigger value="portfolio" className="flex-1">
            <Briefcase className="h-4 w-4 mr-2" />
            Portfólio
          </TabsTrigger>
          <TabsTrigger value="strategy" className="flex-1">
            <Target className="h-4 w-4 mr-2" />
            Strategy Creation
          </TabsTrigger>
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

        {/* Portfolio Management Tab */}
        <TabsContent value="portfolio" className="space-y-4 py-2">
          <PortfolioManagement />
        </TabsContent>
        
        {/* Strategy Creation Tab */}
        <TabsContent value="strategy" className="space-y-4 py-2">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Creation</CardTitle>
              <CardDescription>
                Create and manage custom debt recovery strategies tailored to your specific needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <Wand2 className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">Automated Strategy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Let our AI create an optimized strategy based on your portfolio characteristics.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to="/dashboard/strategy">Generate Strategy</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <Target className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">Custom Strategy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Build your own strategy with our intuitive strategy builder tool.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to="/dashboard/strategy">Start Building</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <BarChart className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">Strategy Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        View performance metrics and insights for your active strategies.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to="/dashboard/insights">View Insights</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="bg-secondary/40 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Active Strategies</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg border">
                      <div>
                        <h4 className="font-medium">High-Value Accounts Strategy</h4>
                        <p className="text-sm text-muted-foreground">For accounts over $10,000</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/dashboard/strategy">Edit</Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg border">
                      <div>
                        <h4 className="font-medium">Gentle Reminder Campaign</h4>
                        <p className="text-sm text-muted-foreground">For accounts 1-30 days past due</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/dashboard/strategy">Edit</Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg border">
                      <div>
                        <h4 className="font-medium">Payment Plan Strategy</h4>
                        <p className="text-sm text-muted-foreground">Accounts with scheduled payment plans</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Paused</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/dashboard/strategy">Edit</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
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
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-secondary/40 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Recovery Performance</h3>
                    <div className="bg-secondary/60 h-48 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Recovery performance chart</p>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/40 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Communication Effectiveness</h3>
                    <div className="bg-secondary/60 h-48 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Communication effectiveness chart</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/40 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Key Metrics Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-background p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Total Recovered</p>
                      <p className="text-2xl font-bold">$1,243,567</p>
                      <p className="text-xs text-green-600">↑ 12.5% from last month</p>
                    </div>
                    <div className="bg-background p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Active Accounts</p>
                      <p className="text-2xl font-bold">3,421</p>
                      <p className="text-xs text-green-600">↑ 3.2% from last month</p>
                    </div>
                    <div className="bg-background p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Avg. Collection Time</p>
                      <p className="text-2xl font-bold">27.3 days</p>
                      <p className="text-xs text-green-600">↓ 2.1 days from last month</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button asChild>
                    <Link to="/dashboard/insights">Download Full Report</Link>
                  </Button>
                </div>
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
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">Compliance Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Monitor compliance status and receive alerts for potential issues.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to="/dashboard/compliance">View Dashboard</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <Target className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">Compliance Audit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Run comprehensive compliance audits and generate reports.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to="/dashboard/compliance">Run Audit</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <Settings className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Configure compliance rules and security settings.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to="/dashboard/settings">Configure Settings</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="bg-secondary/40 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Compliance Status</h3>
                  <div className="space-y-3">
                    <div className="bg-background p-3 rounded-lg border flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">FDCPA Compliance</h4>
                        <p className="text-sm text-muted-foreground">Fair Debt Collection Practices Act</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Compliant</span>
                    </div>
                    
                    <div className="bg-background p-3 rounded-lg border flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">TCPA Compliance</h4>
                        <p className="text-sm text-muted-foreground">Telephone Consumer Protection Act</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Compliant</span>
                    </div>
                    
                    <div className="bg-background p-3 rounded-lg border flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">HIPAA Compliance</h4>
                        <p className="text-sm text-muted-foreground">Health Insurance Portability and Accountability Act</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Needs Review</span>
                    </div>
                  </div>
                </div>
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
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/dashboard/white-label/self-service">Configure Portal</Link>
            </Button>
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
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/dashboard/white-label">Customize Branding</Link>
            </Button>
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
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/dashboard/workflows">Setup Workflows</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
