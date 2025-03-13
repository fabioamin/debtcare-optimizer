
import React from 'react';
import { usePayment, CountryCode } from '@/contexts/PaymentContext';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PaymentMethodCard } from './payment/PaymentMethodCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PaymentPanel = () => {
  const { t } = useTranslation();
  const { countries, selectedCountry, setSelectedCountry } = usePayment();

  const currentCountry = countries.find(country => country.code === selectedCountry);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value as CountryCode);
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <label htmlFor="country-select" className="block text-sm font-medium mb-2">
          {t('payments.selectCountry')}
        </label>
        <Select value={selectedCountry} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder={t('payments.selectCountry')} />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {t(`payments.countries.${country.code}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        {t('payments.availableMethods')} - {t(`payments.countries.${selectedCountry}`)}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCountry?.paymentMethods.map((method) => (
          <PaymentMethodCard 
            key={method.code}
            method={method}
            countryCode={selectedCountry}
          />
        ))}
      </div>
    </Card>
  );
};

export default PaymentPanel;
