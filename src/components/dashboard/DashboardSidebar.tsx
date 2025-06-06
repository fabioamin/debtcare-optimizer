
import React, { useState, useEffect } from "react";
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
  Workflow,
  Code,
  EyeOff,
  Eye,
  PenTool
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";

interface DashboardSidebarProps {
  open: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ open }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [autoHideEnabled, setAutoHideEnabled] = useState(true);
  
  useEffect(() => {
    if (!open || !autoHideEnabled) return;
    
    const timer = setTimeout(() => {
      if (!isHovered && open) {
        setIsExpanded(false);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isHovered, open, autoHideEnabled]);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (autoHideEnabled) {
      setIsExpanded(true);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleAutoHide = () => {
    setAutoHideEnabled(!autoHideEnabled);
    if (!autoHideEnabled) {
      setIsExpanded(true);
    }
  };

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
      icon: <Workflow className="h-5 w-5" />, 
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
      icon: <PenTool className="h-5 w-5" />, 
      label: "Customer Interface", 
      path: "/dashboard/white-label" 
    },
    { 
      icon: <Settings className="h-5 w-5" />, 
      label: "Settings", 
      path: "/dashboard/settings" 
    }
  ];
  
  if (!open) return null;

  return (
    <div 
      className={cn(
        "h-screen fixed top-16 left-0 z-20 bg-sidebar border-r transition-all duration-300",
        isExpanded ? "w-64" : "w-20"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-y-auto h-[calc(100vh-4rem)] pt-4">
        <div className="px-3 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {autoHideEnabled ? 
              <EyeOff className="h-5 w-5 text-sidebar-foreground/70" /> : 
              <Eye className="h-5 w-5 text-sidebar-foreground/70" />
            }
            {isExpanded && <span className="text-xs font-medium text-sidebar-foreground/70">Auto-hide</span>}
          </div>
          <Switch 
            checked={autoHideEnabled} 
            onCheckedChange={toggleAutoHide} 
            className="data-[state=checked]:bg-sidebar-accent"
          />
        </div>
        
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                title={!isExpanded ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  (location.pathname === item.path || 
                   (item.path === "/dashboard/white-label" && location.pathname.includes("/dashboard/white-label")))
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
                )}
              >
                <div className="flex-shrink-0">
                  {React.cloneElement(item.icon, { className: "h-6 w-6" })}
                </div>
                <span className={cn("truncate transition-opacity duration-300", !isExpanded && "opacity-0 w-0 overflow-hidden")}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
