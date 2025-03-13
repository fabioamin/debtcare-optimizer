
import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SelfServicePanel from "@/components/dashboard/SelfServicePanel";

const SelfService = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-muted/40 flex w-full">
        <DashboardSidebar open={sidebarOpen} />
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-6 pt-16 md:pt-20">
            <div className="container mx-auto max-w-7xl space-y-6">
              {/* Page Header */}
              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">Self Service Portal</h1>
                    <p className="text-muted-foreground mt-1">
                      Manage your account preferences and settings
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Link to="/dashboard">
                      <button className="text-sm text-muted-foreground hover:text-foreground">
                        Dashboard
                      </button>
                    </Link>
                    <span className="text-muted-foreground mx-1">/</span>
                    <span className="text-sm font-medium">Self Service</span>
                  </div>
                </div>
              </div>
              
              {/* Self Service Panel Component */}
              <SelfServicePanel />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SelfService;
