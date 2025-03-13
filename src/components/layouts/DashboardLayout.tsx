
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
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Fixed header at top */}
      <DashboardHeader onMenuClick={toggleSidebar} />
      
      {/* Fixed sidebar on left */}
      <DashboardSidebar open={sidebarOpen} />
      
      {/* Main content area with proper offsets */}
      <main 
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`} 
        style={{ paddingTop: '4rem' }}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
