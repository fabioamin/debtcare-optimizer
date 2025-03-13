
import { Home, CreditCard, MessageSquareText, Brain, ChartLine, ShieldCheck, Settings, Globe, Zap, HelpCircle, LogOut, Target, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  open: boolean;
}

const DashboardSidebar = ({ open }: DashboardSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Portfolio", icon: Briefcase, path: "/dashboard/portfolio" },
    { name: "Strategy Creation", icon: Target, path: "/dashboard/strategy" },
    { name: "AI Insights", icon: Brain, path: "/dashboard/insights" },
    { name: "Communication", icon: MessageSquareText, path: "/dashboard/communication" },
    { name: "Payment Options", icon: CreditCard, path: "/dashboard/payments" },
    { name: "Analytics", icon: ChartLine, path: "/dashboard/analytics" },
    { name: "Compliance", icon: ShieldCheck, path: "/dashboard/compliance" },
    { name: "Self-Service", icon: Globe, path: "/dashboard/self-service" },
    { name: "White-Label", icon: Settings, path: "/dashboard/branding" },
    { name: "Workflows", icon: Zap, path: "/dashboard/workflows" },
  ];

  return (
    <aside className={cn(
      "bg-card border-r border-border h-screen transition-all duration-300 z-20",
      open ? "w-64" : "w-0 md:w-16 overflow-hidden"
    )}>
      <div className="h-full flex flex-col">
        <div className={cn(
          "flex items-center h-16 px-4 border-b border-border",
          !open && "justify-center"
        )}>
          {open ? (
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">DC</span>
              </div>
              <span className="font-semibold">DebtCare</span>
            </Link>
          ) : (
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">DC</span>
            </div>
          )}
        </div>
        
        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || 
                (item.path !== "/dashboard" && currentPath.startsWith(item.path));
              
              return (
                <li key={item.name}>
                  <Link to={item.path} className="flex items-center">
                    <Button variant={isActive ? "secondary" : "ghost"} className={cn(
                      "w-full justify-start",
                      !open && "justify-center px-2"
                    )}>
                      <item.icon className={cn("h-5 w-5", open && "mr-2")} />
                      {open && <span>{item.name}</span>}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-2 border-t border-border mt-auto">
          <div className="space-y-1.5">
            <Link to="/dashboard/help">
              <Button variant="ghost" className={cn(
                "w-full justify-start",
                !open && "justify-center px-2"
              )}>
                <HelpCircle className={cn("h-5 w-5", open && "mr-2")} />
                {open && <span>Help & Support</span>}
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className={cn(
                "w-full justify-start",
                !open && "justify-center px-2"
              )}>
                <LogOut className={cn("h-5 w-5", open && "mr-2")} />
                {open && <span>Back to Home</span>}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
