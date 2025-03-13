
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export type CountryCode = 
  | 'brazil' 
  | 'mexico' 
  | 'argentina' 
  | 'colombia' 
  | 'chile' 
  | 'peru' 
  | 'ecuador' 
  | 'usa' 
  | 'canada' 
  | 'costaRica' 
  | 'panama';

export type PaymentMethodCode = 
  | 'pix' 
  | 'boleto' 
  | 'oxxo' 
  | 'pse' 
  | 'efecty' 
  | 'zelle' 
  | 'creditCard' 
  | 'debitCard' 
  | 'bankTransfer' 
  | 'paypal' 
  | 'venmo' 
  | 'sinpe' 
  | 'yape' 
  | 'nequi' 
  | 'rapipago' 
  | 'pagofacil';

export interface PaymentMethod {
  code: PaymentMethodCode;
  enabled: boolean;
  processingTime: string;
  fee: string;
}

export interface Country {
  code: CountryCode;
  paymentMethods: PaymentMethod[];
}

interface PaymentContextType {
  countries: Country[];
  selectedCountry: CountryCode;
  setSelectedCountry: (country: CountryCode) => void;
  togglePaymentMethod: (methodCode: PaymentMethodCode) => void;
  updatePaymentMethod: (methodCode: PaymentMethodCode, data: Partial<PaymentMethod>) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

// Default payment methods by country configuration
const getDefaultCountries = (): Country[] => {
  return [
    {
      code: 'brazil',
      paymentMethods: [
        { code: 'pix', enabled: true, processingTime: '10m', fee: '0%' },
        { code: 'boleto', enabled: true, processingTime: '1-3d', fee: '1.5%' },
        { code: 'creditCard', enabled: true, processingTime: '1d', fee: '2.5%' },
        { code: 'debitCard', enabled: true, processingTime: '1d', fee: '1.8%' },
        { code: 'bankTransfer', enabled: true, processingTime: '1-2d', fee: '0.5%' }
      ]
    },
    {
      code: 'mexico',
      paymentMethods: [
        { code: 'oxxo', enabled: true, processingTime: '1-2d', fee: '3%' },
        { code: 'creditCard', enabled: true, processingTime: '1d', fee: '2.7%' },
        { code: 'debitCard', enabled: true, processingTime: '1d', fee: '2%' },
        { code: 'bankTransfer', enabled: true, processingTime: '1d', fee: '1%' }
      ]
    },
    {
      code: 'argentina',
      paymentMethods: [
        { code: 'rapipago', enabled: true, processingTime: '1d', fee: '2%' },
        { code: 'pagofacil', enabled: true, processingTime: '1d', fee: '2%' },
        { code: 'creditCard', enabled: true, processingTime: '1d', fee: '3%' },
        { code: 'debitCard', enabled: true, processingTime: '1d', fee: '2.5%' },
        { code: 'bankTransfer', enabled: true, processingTime: '1-2d', fee: '1%' }
      ]
    },
    {
      code: 'colombia',
      paymentMethods: [
        { code: 'pse', enabled: true, processingTime: '1d', fee: '2.8%' },
        { code: 'efecty', enabled: true, processingTime: '1d', fee: '3%' },
        { code: 'nequi', enabled: true, processingTime: '30m', fee: '2%' },
        { code: 'creditCard', enabled: true, processingTime: '1d', fee: '3.2%' },
        { code: 'debitCard', enabled: true, processingTime: '1d', fee: '2.5%' }
      ]
    },
    {
      code: 'chile',
      paymentMethods: [
        { code: 'creditCard', enabled: true, processingTime: '1d', fee: '3%' },
        { code: 'debitCard', enabled: true, processingTime: '1d', fee: '2.2%' },
        { code: 'bankTransfer', enabled: true, processingTime: '1d', fee: '1%' }
      ]
    },
    {
      code: 'peru',
      paymentMethods: [
        { code: 'yape', enabled: true, processingTime: '30m', fee: '1.5%' },
        { code: 'creditCard', enabled: true, processingTime: '1d', fee: '3.5%' },
        { code: 'debitCard', enabled: true, processingTime: '1d', fee: '2.8%' },
        { code: 'bankTransfer', enabled: true, processingTime: '1d', fee: '1.2%' }
      ]
    },
    {
      code: 'ecuador',
      paymentMethods: [
        { code: 'creditCard', enabled: true, processingTime: '1d', fee: '3.8%' },
        { code: 'debitCard', enabled: true, processingTime: '1d', fee: '2.5%' },
        { code: 'bankTransfer', enabled: true, processingTime: '1-2d', fee: '1.2%' }
      ]
    },
    {
      code: 'usa',
      paymentMethods: [
        { code: 'zelle', enabled: true, processingTime: '10m', fee: '0%' },
        { code: 'venmo', enabled: true, processingTime: '30m', fee: '0%' },
        { code: 'creditCard', enabled: true, processingTime: '1d', fee: '2.9% + $0.30' },
        { code: 'debitCard', enabled: true, processingTime: '1d', fee: '1.5%' },
        { code: 'paypal', enabled: true, processingTime: '1d', fee: '2.9% + $0.30' },
        { code: 'bankTransfer', enabled: true, processingTime: '1-3d', fee: '0%' }
      ]
    },
    {
      code: 'canada',
      paymentMethods: [
        { code: 'creditCard', enabled: true, processingTime: '1d', fee: '2.9% + C$0.30' },
        { code: 'debitCard', enabled: true, processingTime: '1d', fee: '1.5%' },
        { code: 'paypal', enabled: true, processingTime: '1d', fee: '2.9% + C$0.30' },
        { code: 'bankTransfer', enabled: true, processingTime: '1-3d', fee: '1.5%' }
      ]
    },
    {
      code: 'costaRica',
      paymentMethods: [
        { code: 'sinpe', enabled: true, processingTime: '1h', fee: '1.5%' },
        { code: 'creditCard', enabled: true, processingTime: '1d', fee: '3.2%' },
        { code: 'debitCard', enabled: true, processingTime: '1d', fee: '2.5%' },
        { code: 'bankTransfer', enabled: true, processingTime: '1-2d', fee: '1%' }
      ]
    },
    {
      code: 'panama',
      paymentMethods: [
        { code: 'creditCard', enabled: true, processingTime: '1d', fee: '3.5%' },
        { code: 'debitCard', enabled: true, processingTime: '1d', fee: '2.8%' },
        { code: 'bankTransfer', enabled: true, processingTime: '1-2d', fee: '1%' }
      ]
    }
  ];
};

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>(getDefaultCountries());
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('brazil');
  
  // Load saved data from localStorage
  useEffect(() => {
    const savedCountries = localStorage.getItem('paymentCountries');
    if (savedCountries) {
      setCountries(JSON.parse(savedCountries));
    }
    
    const savedSelectedCountry = localStorage.getItem('selectedPaymentCountry') as CountryCode | null;
    if (savedSelectedCountry && countries.some(c => c.code === savedSelectedCountry)) {
      setSelectedCountry(savedSelectedCountry);
    }
  }, []);
  
  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('paymentCountries', JSON.stringify(countries));
    localStorage.setItem('selectedPaymentCountry', selectedCountry);
  }, [countries, selectedCountry]);

  const togglePaymentMethod = (methodCode: PaymentMethodCode) => {
    setCountries(prevCountries => {
      return prevCountries.map(country => {
        if (country.code === selectedCountry) {
          const updatedMethods = country.paymentMethods.map(method => {
            if (method.code === methodCode) {
              return { ...method, enabled: !method.enabled };
            }
            return method;
          });
          return { ...country, paymentMethods: updatedMethods };
        }
        return country;
      });
    });
  };
  
  const updatePaymentMethod = (methodCode: PaymentMethodCode, data: Partial<PaymentMethod>) => {
    setCountries(prevCountries => {
      return prevCountries.map(country => {
        if (country.code === selectedCountry) {
          const updatedMethods = country.paymentMethods.map(method => {
            if (method.code === methodCode) {
              return { ...method, ...data };
            }
            return method;
          });
          return { ...country, paymentMethods: updatedMethods };
        }
        return country;
      });
    });
  };

  return (
    <PaymentContext.Provider value={{
      countries,
      selectedCountry,
      setSelectedCountry,
      togglePaymentMethod,
      updatePaymentMethod
    }}>
      {children}
    </PaymentContext.Provider>
  );
};
