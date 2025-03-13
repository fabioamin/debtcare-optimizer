
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PaymentMethodCode, CountryCode, PaymentMethod, usePayment } from '@/contexts/PaymentContext';
import { Shield, Clock, DollarSign, CreditCard, Receipt, Building } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  countryCode: CountryCode;
}

type FormValues = {
  processingTime: string;
  fee: string;
};

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ method, countryCode }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { togglePaymentMethod, updatePaymentMethod } = usePayment();
  
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      processingTime: method.processingTime,
      fee: method.fee
    }
  });

  const getPaymentIcon = (code: PaymentMethodCode) => {
    switch (code) {
      case 'creditCard':
      case 'debitCard':
        return <CreditCard className="h-6 w-6" />;
      case 'bankTransfer':
      case 'zelle':
        return <Building className="h-6 w-6" />; // Using Building icon instead of Bank
      case 'boleto':
      case 'oxxo':
      case 'rapipago':
      case 'pagofacil':
      case 'pix':
        return <Receipt className="h-6 w-6" />;
      default:
        return <DollarSign className="h-6 w-6" />;
    }
  };

  const handleToggle = () => {
    togglePaymentMethod(method.code);
    
    const status = !method.enabled ? 'enabled' : 'disabled';
    const statusTranslation = !method.enabled ? 'status.enabled' : 'status.disabled';
    
    toast({
      title: t(`payments.${statusTranslation}`, { method: t(`payments.methods.${method.code}`) }),
      description: t('payments.status.description', { 
        method: t(`payments.methods.${method.code}`),
        status: status === 'enabled' ? t('enabled') : t('disabled')
      })
    });
  };

  const openSettings = () => {
    form.reset({
      processingTime: method.processingTime,
      fee: method.fee
    });
    setSettingsOpen(true);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  const onSubmit = (data: FormValues) => {
    updatePaymentMethod(method.code, {
      processingTime: data.processingTime,
      fee: data.fee
    });
    
    toast({
      title: t('payments.success.updated', { method: t(`payments.methods.${method.code}`) }),
      description: t('payments.success.description')
    });
    
    closeSettings();
  };

  return (
    <>
      <Card className={`${!method.enabled ? 'opacity-75' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {getPaymentIcon(method.code)}
              <CardTitle>{t(`payments.methods.${method.code}`)}</CardTitle>
            </div>
            <Switch 
              checked={method.enabled} 
              onCheckedChange={handleToggle}
              aria-label={`Toggle ${method.code}`}
            />
          </div>
        </CardHeader>
        <CardContent className="pb-2 space-y-2">
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{t('payments.processing')}:</span>
            </div>
            <span className="font-medium">{method.processingTime}</span>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>{t('payments.fees')}:</span>
            </div>
            <span className="font-medium">{method.fee}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={openSettings}
            disabled={!method.enabled}
          >
            {t('payments.settings')}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {t('payments.settings')} - {t(`payments.methods.${method.code}`)}
            </DialogTitle>
            <DialogDescription>
              {t('payments.enableDisable')}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('payments.generalSettings')}</h3>
                
                <FormField
                  control={form.control}
                  name="processingTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('payments.processing')}</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 1d, 10m, 1-3d" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('payments.fees')}</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 1.5%, 2.9% + $0.30" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeSettings}>
                {t('payments.cancel')}
              </Button>
              <Button type="submit">
                {t('payments.save')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
