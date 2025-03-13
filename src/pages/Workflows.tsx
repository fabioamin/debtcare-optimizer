
import WorkflowsPanel from "@/components/dashboard/WorkflowsPanel";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useState } from "react";

const Workflows = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onMenuClick={handleMenuClick} />
      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />
        <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} p-6 transition-all duration-300`}>
          <WorkflowsPanel />
        </main>
      </div>
    </div>
  );
};

export default Workflows;
