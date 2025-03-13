
import CommunicationPanel from "@/components/dashboard/CommunicationPanel";
import { useTranslation } from "react-i18next";

const Communication = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2 md:mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{t('communication.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('communication.subtitle')}
          </p>
        </div>
      </div>
      
      <CommunicationPanel />
    </div>
  );
};

export default Communication;
