
import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PaymentPanel from '@/components/dashboard/PaymentPanel';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/LanguageSelector';

const Payments = () => {
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
        <main className="flex-1 p-6 pt-16 md:pt-20">
          <div className="container mx-auto max-w-7xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">{t('payments.title')}</h1>
                <p className="text-muted-foreground mb-6">
                  {t('payments.subtitle')}
                </p>
              </div>
              <LanguageSelector />
            </div>
            
            <PaymentPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payments;
