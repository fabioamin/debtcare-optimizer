
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout, UserCircle } from "lucide-react";

const WhiteLabel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  // Determine which tab is active based on the current route
  const activeTab = currentPath.includes("/dashboard/white-label/self-service") 
    ? "self-service" 
    : "portal";

  const handleTabChange = (value: string) => {
    if (value === "self-service") {
      navigate("/dashboard/white-label/self-service");
    } else if (value === "portal") {
      navigate("/dashboard/white-label/portal");
    }
  };

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
                    <h1 className="text-2xl font-bold">Customer Interface</h1>
                    <p className="text-muted-foreground mt-1">
                      Customize your client experience and self-service options
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Link to="/dashboard">
                      <button className="text-sm text-muted-foreground hover:text-foreground">
                        Dashboard
                      </button>
                    </Link>
                    <span className="text-muted-foreground mx-1">/</span>
                    <span className="text-sm font-medium">Customer Interface</span>
                  </div>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="portal" className="flex items-center gap-2">
                    <Layout className="h-4 w-4" />
                    Client Portal
                  </TabsTrigger>
                  <TabsTrigger value="self-service" className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    Self Service
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              {/* Content from child routes */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default WhiteLabel;
