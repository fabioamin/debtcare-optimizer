
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PortfolioManagement from "@/components/dashboard/PortfolioManagement";

const Portfolio = () => {
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
            
            {/* Portfolio Management Component */}
            <PortfolioManagement />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Portfolio;
