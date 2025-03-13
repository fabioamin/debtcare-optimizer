
import { useState, ReactNode } from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardHeader onMenuClick={toggleSidebar} />
      <DashboardSidebar open={sidebarOpen} />
      
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`} style={{ marginTop: '4rem' }}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
