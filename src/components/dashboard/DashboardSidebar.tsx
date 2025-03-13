
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
  Users
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
    <Sidebar side="left" variant="sidebar" collapsible="none" className="z-10 top-16 border-t-0 rounded-none">
      <SidebarContent className="pt-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.path}
              >
                <Link to={item.path} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
