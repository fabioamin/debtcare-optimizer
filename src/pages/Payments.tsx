
import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PaymentPanel from "@/components/dashboard/PaymentPanel";

const Payments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-muted/40 flex w-full">
        <DashboardSidebar open={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-6 pt-16 md:pt-20">
            <div className="container mx-auto max-w-7xl space-y-6">
              {/* Page Header */}
              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">Payment Management</h1>
                    <p className="text-muted-foreground mt-1">
                      Configure and manage payment methods and transactions
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Link to="/dashboard">
                      <button className="text-sm text-muted-foreground hover:text-foreground">
                        Dashboard
                      </button>
                    </Link>
                    <span className="text-muted-foreground mx-1">/</span>
                    <span className="text-sm font-medium">Payments</span>
                  </div>
                </div>
              </div>
              
              {/* Payment Panel Component */}
              <PaymentPanel />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Payments;
