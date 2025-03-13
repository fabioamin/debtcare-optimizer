
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  BarChart3, 
  Briefcase, 
  Lightbulb, 
  MessageSquare, 
  Settings, 
  CreditCard,
  Shield,
  Globe,
  Users,
  Layout,
  UserCircle,
  Workflow,
  Zap,
  Code
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  open: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ open }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    { 
      icon: <Home className="h-5 w-5" />, 
      label: "Home", 
      path: "/dashboard" 
    },
    { 
      icon: <Briefcase className="h-5 w-5" />, 
      label: "Portfolio", 
      path: "/dashboard/portfolio" 
    },
    { 
      icon: <Lightbulb className="h-5 w-5" />, 
      label: "Strategy", 
      path: "/dashboard/strategy" 
    },
    { 
      icon: <BarChart3 className="h-5 w-5" />, 
      label: "Insights", 
      path: "/dashboard/insights" 
    },
    { 
      icon: <MessageSquare className="h-5 w-5" />, 
      label: t('dashboard.communications'), 
      path: "/dashboard/communication" 
    },
    { 
      icon: <CreditCard className="h-5 w-5" />, 
      label: t('dashboard.payments'), 
      path: "/dashboard/payments" 
    },
    { 
      icon: <UserCircle className="h-5 w-5" />, 
      label: "Self Service", 
      path: "/dashboard/self-service" 
    },
    { 
      icon: <Layout className="h-5 w-5" />, 
      label: "Portal", 
      path: "/dashboard/portal" 
    },
    { 
      icon: <Workflow className="h-5 w-5" />, 
      label: "Automation", 
      path: "/dashboard/automation" 
    },
    { 
      icon: <Zap className="h-5 w-5" />, 
      label: t('dashboard.automatedWorkflows'), 
      path: "/dashboard/workflows" 
    },
    { 
      icon: <Code className="h-5 w-5" />, 
      label: t('dashboard.apis'), 
      path: "/dashboard/apis" 
    },
    { 
      icon: <Shield className="h-5 w-5" />, 
      label: t('dashboard.compliance'), 
      path: "/dashboard/compliance" 
    },
    { 
      icon: <Globe className="h-5 w-5" />, 
      label: t('dashboard.international'), 
      path: "/dashboard/international" 
    },
    { 
      icon: <Users className="h-5 w-5" />, 
      label: t('dashboard.customers'), 
      path: "/dashboard/customers" 
    },
    { 
      icon: <Settings className="h-5 w-5" />, 
      label: "Settings", 
      path: "/dashboard/settings" 
    }
  ];
  
  if (!open) return null;

  return (
    <div className="h-screen fixed top-16 left-0 z-10 bg-sidebar border-r w-64">
      <div className="overflow-y-auto h-[calc(100vh-4rem)] pt-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
