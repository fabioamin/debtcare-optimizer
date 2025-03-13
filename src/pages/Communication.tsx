
import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import CommunicationPanel from "@/components/dashboard/CommunicationPanel";
import { useToast } from "@/hooks/use-toast";

const Communication = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <DashboardHeader onMenuClick={handleMenuClick} />
      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />
        <main className="flex-1 p-6 pt-16 md:pt-20">
          <div className="container mx-auto max-w-7xl space-y-6">
            <h1 className="text-3xl font-bold">Communications</h1>
            <p className="text-muted-foreground mb-6">
              Manage all customer communications across multiple channels
            </p>
            
            <CommunicationPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Communication;
