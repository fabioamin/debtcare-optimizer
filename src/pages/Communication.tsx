
import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import CommunicationPanel from "@/components/dashboard/CommunicationPanel";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Communication = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { t } = useTranslation();
  
  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <DashboardHeader onMenuClick={handleMenuClick} />
      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />
        <main className={`flex-1 p-4 md:p-6 pt-16 md:pt-20 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2 md:mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{t('communication.title')}</h1>
                <p className="text-muted-foreground mt-1">
                  {t('communication.subtitle')}
                </p>
              </div>
              {/* Removing LanguageSelector since it requires LanguageProvider context */}
            </div>
            
            <CommunicationPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Communication;
