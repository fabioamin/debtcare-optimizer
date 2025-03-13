
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, FileText, UserCheck, Globe2, Building, RefreshCcw } from 'lucide-react';

const InternationalPanel = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("regions");

  // Mock data for regions
  const regions = [
    { id: 1, name: 'Latin America', countries: 8, active: true, growth: '+14%' },
    { id: 2, name: 'North America', countries: 2, active: true, growth: '+5%' },
    { id: 3, name: 'Europe', countries: 12, active: false, growth: '0%' },
    { id: 4, name: 'Asia Pacific', countries: 6, active: false, growth: '0%' },
  ];

  // Mock data for regulations
  const regulations = [
    { id: 1, name: 'GDPR', regions: ['Europe'], status: 'Compliant', lastUpdate: '2023-12-01' },
    { id: 2, name: 'LGPD', regions: ['Latin America'], status: 'Compliant', lastUpdate: '2023-11-15' },
    { id: 3, name: 'CCPA', regions: ['North America'], status: 'Compliant', lastUpdate: '2023-10-20' },
    { id: 4, name: 'PIPEDA', regions: ['North America'], status: 'In Progress', lastUpdate: '2023-12-10' },
  ];

  // Mock data for partners
  const partners = [
    { id: 1, name: 'Global Collections Ltd', regions: ['Latin America', 'North America'], active: true },
    { id: 2, name: 'European Recovery Partners', regions: ['Europe'], active: false },
    { id: 3, name: 'APAC Financial Services', regions: ['Asia Pacific'], active: false },
    { id: 4, name: 'Latam Debt Solutions', regions: ['Latin America'], active: true },
  ];

  // Toggle region status
  const toggleRegionStatus = (id: number) => {
    // In a real application, this would update the backend
    console.log(`Toggled status for region with ID: ${id}`);
  };

  // Toggle partner status
  const togglePartnerStatus = (id: number) => {
    // In a real application, this would update the backend
    console.log(`Toggled status for partner with ID: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('international.title', 'International Operations')}</h1>
        <p className="text-muted-foreground">
          {t('international.description', 'Manage your global debt recovery operations across multiple regions and jurisdictions.')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('international.activeRegions', 'Active Regions')}</CardTitle>
            <Globe2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('international.countriesSupported', 'Countries Supported')}</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('international.complianceRate', 'Compliance Rate')}</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93%</div>
            <p className="text-xs text-muted-foreground">
              +4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('international.activePartners', 'Active Partners')}</CardTitle>
            <RefreshCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Same as last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="regions" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="regions">
            <Globe2 className="h-4 w-4 mr-2" />
            {t('international.tabs.regions', 'Regions')}
          </TabsTrigger>
          <TabsTrigger value="regulations">
            <FileText className="h-4 w-4 mr-2" />
            {t('international.tabs.regulations', 'Regulations')}
          </TabsTrigger>
          <TabsTrigger value="partners">
            <Building className="h-4 w-4 mr-2" />
            {t('international.tabs.partners', 'Partners')}
          </TabsTrigger>
          <TabsTrigger value="performance">
            <BarChart className="h-4 w-4 mr-2" />
            {t('international.tabs.performance', 'Performance')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('international.globalRegions', 'Global Regions')}</CardTitle>
              <CardDescription>
                {t('international.regionsDescription', 'Manage your operations across different regions worldwide.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regions.map((region) => (
                  <div key={region.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {region.name}
                        {region.active ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{region.countries} countries</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium">
                        Growth: <span className={region.growth.includes('+') ? 'text-green-600' : 'text-gray-600'}>{region.growth}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleRegionStatus(region.id)}
                      >
                        {region.active ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regulations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('international.regulatoryCompliance', 'Regulatory Compliance')}</CardTitle>
              <CardDescription>
                {t('international.regulationsDescription', 'Monitor and manage compliance with international regulations.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulations.map((regulation) => (
                  <div key={regulation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{regulation.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {regulation.regions.join(', ')}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        variant="outline" 
                        className={regulation.status === 'Compliant' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                        }
                      >
                        {regulation.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground mt-1">
                        Updated: {regulation.lastUpdate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="partners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('international.collectionPartners', 'Collection Partners')}</CardTitle>
              <CardDescription>
                {t('international.partnersDescription', 'Manage relationships with international collection partners.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{partner.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {partner.regions.join(', ')}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="outline" 
                        className={partner.active 
                          ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                        }
                      >
                        {partner.active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => togglePartnerStatus(partner.id)}
                      >
                        {partner.active ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('international.globalPerformance', 'Global Performance Metrics')}</CardTitle>
              <CardDescription>
                {t('international.performanceDescription', 'Track debt recovery performance across international regions.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <LineChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">{t('international.comingSoon', 'Performance data visualization coming soon')}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('international.workingOn', 'We\'re working on integrating international performance metrics.')}
                </p>
                <Button className="mt-4" variant="outline">
                  {t('international.requestFeature', 'Request Early Access')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InternationalPanel;
