
import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, Database } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PortfolioManagement from "@/components/dashboard/PortfolioManagement";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioUpload from "@/components/dashboard/PortfolioUpload";

const Portfolio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("manage");

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
            {/* Page Header */}
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Portfolio Management</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your client portfolio and collection strategies
                  </p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Link to="/dashboard">
                    <button className="text-sm text-muted-foreground hover:text-foreground">
                      Dashboard
                    </button>
                  </Link>
                  <span className="text-muted-foreground mx-1">/</span>
                  <span className="text-sm font-medium">Portfolio</span>
                </div>
              </div>
            </div>
            
            {/* Portfolio Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manage">
                  <Database className="h-4 w-4 mr-2" />
                  Manage Portfolio
                </TabsTrigger>
                <TabsTrigger value="upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Portfolio
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="manage" className="mt-6">
                <PortfolioManagement />
              </TabsContent>
              
              <TabsContent value="upload" className="mt-6">
                <PortfolioUpload />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Portfolio;
