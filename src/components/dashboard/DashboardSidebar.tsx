
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
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
  Users
} from "lucide-react";
import { useTranslation } from "react-i18next";

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
    <Card className="h-screen w-64 fixed left-0 top-16 border-t-0 rounded-none pt-4 animate-fade-in overflow-auto z-10">
      <nav className="space-y-1 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors",
              location.pathname === item.path ? "bg-muted font-medium" : ""
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </Card>
  );
};

export default DashboardSidebar;
