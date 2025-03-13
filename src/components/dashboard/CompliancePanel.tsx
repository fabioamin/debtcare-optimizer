
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { AlertCircle, CheckCircle, FileText, Shield, AlertTriangle, Calendar, PieChart, Folder } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CompliancePanel = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("reports");

  const complianceItems = [
    {
      id: "privacy_policy",
      title: "Política de Privacidade",
      type: "document",
      status: "compliant",
      lastUpdated: "15/05/2023",
      icon: FileText,
      dueDate: "15/05/2024"
    },
    {
      id: "security_protocol",
      title: "Protocolo de Segurança",
      type: "document",
      status: "compliant",
      lastUpdated: "03/03/2023",
      icon: Shield,
      dueDate: "03/03/2024"
    },
    {
      id: "data_retention",
      title: "Retenção de Dados",
      type: "requirement",
      status: "warning",
      lastUpdated: "10/09/2023",
      icon: Folder,
      dueDate: "10/12/2023"
    },
    {
      id: "annual_audit",
      title: "Auditoria Anual",
      type: "audit",
      status: "non_compliant",
      lastUpdated: "22/01/2023",
      icon: AlertCircle,
      dueDate: "22/01/2024"
    },
    {
      id: "training_records",
      title: "Registros de Treinamento",
      type: "requirement",
      status: "compliant",
      lastUpdated: "05/07/2023",
      icon: Calendar,
      dueDate: "05/07/2024"
    },
    {
      id: "risk_assessment",
      title: "Avaliação de Risco",
      type: "assessment",
      status: "warning",
      lastUpdated: "30/08/2023",
      icon: AlertTriangle,
      dueDate: "30/11/2023"
    },
  ];

  const handleComplianceAction = (itemId: string) => {
    toast({
      title: "Ação iniciada",
      description: `A ação para o item ${itemId} foi iniciada.`,
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === "compliant") {
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Conforme</Badge>;
    } else if (status === "warning") {
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Atenção</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Não Conforme</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Portal de Compliance</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus requisitos regulatórios e mantenha sua empresa em conformidade
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <FileText className="mr-2 h-4 w-4" />
            Gerar Relatório de Compliance
          </Button>
        </div>
      </div>

      {/* Compliance Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Itens Conformes
            </CardTitle>
            <CardDescription>Items em total conformidade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">de 6 itens</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              Atenção Necessária
            </CardTitle>
            <CardDescription>Items que requerem atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">de 6 itens</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              Não Conformes
            </CardTitle>
            <CardDescription>Items críticos não conformes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-sm text-muted-foreground">de 6 itens</p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Items */}
      <Tabs defaultValue="reports" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="audits">Auditorias</TabsTrigger>
        </TabsList>

        {/* Reports Tab */}
        <TabsContent value="reports" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Conformidade</CardTitle>
              <CardDescription>
                Status atual de todos os itens de conformidade regulatória
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          {getStatusBadge(item.status)}
                          <span className="text-sm text-muted-foreground">
                            Atualizado: {item.lastUpdated}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Vencimento: {item.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleComplianceAction(item.id)}
                    >
                      Revisar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Documentos de Compliance</CardTitle>
              <CardDescription>
                Gerencie seus documentos de conformidade regulatória
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceItems
                  .filter(item => item.type === "document")
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            {getStatusBadge(item.status)}
                            <span className="text-sm text-muted-foreground">
                              Atualizado: {item.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          Visualizar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          Atualizar
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audits Tab */}
        <TabsContent value="audits" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Auditorias e Avaliações</CardTitle>
              <CardDescription>
                Visão geral das auditorias internas e externas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceItems
                  .filter(item => ["audit", "assessment"].includes(item.type))
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded">
                          {item.type === "audit" ? (
                            <PieChart className="h-5 w-5 text-primary" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            {getStatusBadge(item.status)}
                            <span className="text-sm text-muted-foreground">
                              Última: {item.lastUpdated}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Próxima: {item.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleComplianceAction(item.id)}
                      >
                        Programar
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompliancePanel;
