import { useState } from "react";
import { Search, Filter, Download, ArrowUpDown, AlertTriangle, CheckCircle2, Clock, CreditCard, Landmark, Receipt, DollarSign, ShoppingBag, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const clients = [
  { 
    id: 1, 
    name: "Carlos Silva", 
    email: "carlos@example.com", 
    amount: 12500, 
    daysOverdue: 0, 
    status: "current", 
    riskScore: "low",
    product: "credit-card",
    productName: "Cartão de Crédito Premium" 
  },
  { 
    id: 2, 
    name: "Maria Santos", 
    email: "maria@example.com", 
    amount: 7800, 
    daysOverdue: 15, 
    status: "pre-delinquent", 
    riskScore: "medium",
    product: "personal-loan",
    productName: "Empréstimo Pessoal" 
  },
  { 
    id: 3, 
    name: "João Oliveira", 
    email: "joao@example.com", 
    amount: 24300, 
    daysOverdue: 45, 
    status: "delinquent", 
    riskScore: "high",
    product: "secured-loan",
    productName: "Empréstimo Consignado" 
  },
  { 
    id: 4, 
    name: "Ana Costa", 
    email: "ana@example.com", 
    amount: 5200, 
    daysOverdue: 0, 
    status: "current", 
    riskScore: "low",
    product: "product-sale",
    productName: "Smart TV Samsung" 
  },
  { 
    id: 5, 
    name: "Paulo Ferreira", 
    email: "paulo@example.com", 
    amount: 18700, 
    daysOverdue: 30, 
    status: "delinquent", 
    riskScore: "medium",
    product: "credit-card",
    productName: "Cartão de Crédito Business" 
  },
  { 
    id: 6, 
    name: "Sofia Martins", 
    email: "sofia@example.com", 
    amount: 3600, 
    daysOverdue: 7, 
    status: "pre-delinquent", 
    riskScore: "low",
    product: "mortgage",
    productName: "Financiamento Imobiliário" 
  },
  { 
    id: 7, 
    name: "Ricardo Almeida", 
    email: "ricardo@example.com", 
    amount: 9200, 
    daysOverdue: 60, 
    status: "delinquent", 
    riskScore: "high",
    product: "vehicle-loan",
    productName: "Financiamento de Veículo" 
  },
  { 
    id: 8, 
    name: "Carla Ribeiro", 
    email: "carla@example.com", 
    amount: 15400, 
    daysOverdue: 0, 
    status: "current", 
    riskScore: "medium",
    product: "insurance",
    productName: "Seguro Residencial" 
  },
];

const productTypes = [
  { id: "all", name: "Todos os Produtos", icon: DollarSign },
  { id: "credit-card", name: "Cartão de Crédito", icon: CreditCard },
  { id: "personal-loan", name: "Empréstimo Pessoal", icon: DollarSign },
  { id: "secured-loan", name: "Empréstimo Consignado", icon: Landmark },
  { id: "mortgage", name: "Financiamento Imobiliário", icon: Landmark },
  { id: "vehicle-loan", name: "Financiamento de Veículo", icon: DollarSign },
  { id: "insurance", name: "Seguros", icon: Receipt },
  { id: "product-sale", name: "Venda de Produtos", icon: ShoppingBag },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "current":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "pre-delinquent":
      return <Clock className="h-5 w-5 text-amber-500" />;
    case "delinquent":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "current":
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Em dia</Badge>;
    case "pre-delinquent":
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pré-inadimplente</Badge>;
    case "delinquent":
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Inadimplente</Badge>;
    default:
      return null;
  }
};

const getProductIcon = (productType: string) => {
  const product = productTypes.find(p => p.id === productType);
  if (!product) return <DollarSign className="h-5 w-5" />;
  
  const Icon = product.icon;
  return <Icon className="h-5 w-5" />;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const getRiskColor = (riskScore: string) => {
  switch (riskScore) {
    case "high":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "medium":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    case "low":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const PortfolioManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const { toast } = useToast();
  
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedTab === "all" || client.status === selectedTab;
    
    const matchesProduct = selectedProduct === "all" || client.product === selectedProduct;
    
    return matchesSearch && matchesStatus && matchesProduct;
  });

  const sortedClients = [...filteredClients].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === "name" || sortField === "email") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleClientAction = (action: string, client: any) => {
    toast({
      title: `Ação: ${action}`,
      description: `Executando ${action} para ${client.name}`,
    });
  };

  const portfolioTotal = clients.reduce((sum, client) => sum + client.amount, 0);
  const overdueTotal = clients
    .filter(client => client.status === "pre-delinquent" || client.status === "delinquent")
    .reduce((sum, client) => sum + client.amount, 0);
  const expectedRecovery = overdueTotal * 0.877;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestão de Portfólio</CardTitle>
        <CardDescription>
          Monitore o status dos clientes e as estratégias de cobrança automáticas baseadas em análise de risco
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente ou email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o produto" />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex items-center">
                        <product.icon className="mr-2 h-4 w-4" />
                        <span>{product.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="current">Em dia</TabsTrigger>
              <TabsTrigger value="pre-delinquent">Pré-inadimplentes</TabsTrigger>
              <TabsTrigger value="delinquent">Inadimplentes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="rounded-md border">
                <ClientsTable 
                  clients={sortedClients} 
                  toggleSort={toggleSort} 
                  sortField={sortField} 
                  sortDirection={sortDirection} 
                  onClientSelect={setSelectedClient}
                  onClientAction={handleClientAction}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="current" className="mt-0">
              <div className="rounded-md border">
                <ClientsTable 
                  clients={sortedClients} 
                  toggleSort={toggleSort} 
                  sortField={sortField} 
                  sortDirection={sortDirection} 
                  onClientSelect={setSelectedClient}
                  onClientAction={handleClientAction}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="pre-delinquent" className="mt-0">
              <div className="rounded-md border">
                <ClientsTable 
                  clients={sortedClients} 
                  toggleSort={toggleSort} 
                  sortField={sortField} 
                  sortDirection={sortDirection} 
                  onClientSelect={setSelectedClient}
                  onClientAction={handleClientAction}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="delinquent" className="mt-0">
              <div className="rounded-md border">
                <ClientsTable 
                  clients={sortedClients} 
                  toggleSort={toggleSort} 
                  sortField={sortField} 
                  sortDirection={sortDirection} 
                  onClientSelect={setSelectedClient}
                  onClientAction={handleClientAction}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total do Portfólio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{formatCurrency(portfolioTotal)}</p>
                <p className="text-sm text-muted-foreground mt-1">{clients.length} clientes</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total em Atraso</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-600">{formatCurrency(overdueTotal)}</p>
                <p className="text-sm text-muted-foreground mt-1">{Math.round((overdueTotal / portfolioTotal) * 100)}% do portfólio</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recuperação Prevista</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(expectedRecovery)}</p>
                <p className="text-sm text-muted-foreground mt-1">87.7% do total em atraso</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Produtos Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{productTypes.length - 1}</p>
                <p className="text-sm text-muted-foreground mt-1">Tipos de produtos</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-secondary/40 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-medium mb-4">Distribuição por Produto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {productTypes.filter(p => p.id !== "all").map((product) => {
                const productClients = clients.filter(c => c.product === product.id);
                const productTotal = productClients.reduce((sum, client) => sum + client.amount, 0);
                return (
                  <div key={product.id} className="bg-background p-4 rounded-lg border flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <product.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {productClients.length} clientes
                      </p>
                      <p className="text-sm font-medium">
                        {formatCurrency(productTotal)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-secondary/40 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-medium mb-4">Distribuição por Nível de Risco</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["low", "medium", "high"].map((risk) => {
                const riskClients = clients.filter(c => c.riskScore === risk);
                const riskTotal = riskClients.reduce((sum, client) => sum + client.amount, 0);
                
                let riskLabel, riskColor, riskIcon;
                switch(risk) {
                  case "low":
                    riskLabel = "Baixo Risco";
                    riskColor = "text-green-600";
                    riskIcon = <CheckCircle2 className="h-5 w-5 text-green-600" />;
                    break;
                  case "medium":
                    riskLabel = "Médio Risco";
                    riskColor = "text-amber-600";
                    riskIcon = <Clock className="h-5 w-5 text-amber-600" />;
                    break;
                  case "high":
                    riskLabel = "Alto Risco";
                    riskColor = "text-red-600";
                    riskIcon = <AlertTriangle className="h-5 w-5 text-red-600" />;
                    break;
                }
                
                return (
                  <div key={risk} className="bg-background p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      {riskIcon}
                      <h4 className={`font-medium ${riskColor}`}>{riskLabel}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Clientes</p>
                        <p className="text-xl font-bold">{riskClients.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Valor</p>
                        <p className="text-xl font-bold">{formatCurrency(riskTotal)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-secondary/40 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-medium mb-4">Estratégias Automáticas de Cobrança por Produto</h3>
            <div className="space-y-4">
              <div className="bg-background p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Cartão de Crédito</h4>
                      <p className="text-sm text-muted-foreground">Lembretes proativos, negociação de dívidas, parcelamento especial</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Editar Estratégia</Button>
                </div>
              </div>
              
              <div className="bg-background p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Empréstimos Pessoais</h4>
                      <p className="text-sm text-muted-foreground">Contato proativo, planos de pagamento flexíveis, sistema de alerta</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Editar Estratégia</Button>
                </div>
              </div>
              
              <div className="bg-background p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Financiamentos</h4>
                      <p className="text-sm text-muted-foreground">Intervenção imediata, contato multicanal, propostas personalizadas de refinanciamento</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Editar Estratégia</Button>
                </div>
              </div>
              
              <div className="bg-background p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Venda de Produtos</h4>
                      <p className="text-sm text-muted-foreground">Lembretes amigáveis, oferta de descontos para quitação à vista, renegociação</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Editar Estratégia</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      {selectedClient && (
        <Dialog open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Cliente</DialogTitle>
              <DialogDescription>
                Informações e ações para o cliente {selectedClient.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <h3 className="text-lg font-medium mb-3">Informações do Cliente</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nome:</span>
                    <span className="font-medium">{selectedClient.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{selectedClient.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Produto:</span>
                    <div className="flex items-center gap-2">
                      {getProductIcon(selectedClient.product)}
                      <span>{selectedClient.productName}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valor:</span>
                    <span className="font-medium">{formatCurrency(selectedClient.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedClient.status)}
                      {getStatusLabel(selectedClient.status)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dias em Atraso:</span>
                    <span className={selectedClient.daysOverdue > 0 ? 
                      `text-${selectedClient.daysOverdue > 30 ? 'red' : 'amber'}-600` : 
                      'text-green-600'}>
                      {selectedClient.daysOverdue > 0 ? `${selectedClient.daysOverdue} dias` : 'Em dia'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nível de Risco:</span>
                    <Badge variant="outline" className={getRiskColor(selectedClient.riskScore)}>
                      {selectedClient.riskScore === 'high' ? 'Alto' : 
                        selectedClient.riskScore === 'medium' ? 'Médio' : 'Baixo'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Ações de Cobrança</h3>
                <div className="space-y-3">
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <h4 className="font-medium mb-1">Estratégia Atual</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedClient.status === 'current' ? 'Monitoramento' : 
                       selectedClient.status === 'pre-delinquent' ? 'Prevenção' : 'Recuperação'}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleClientAction("Enviar Comunicação", selectedClient)}
                    >
                      <MessageIcon className="mr-2 h-4 w-4" />
                      Enviar Comunicação
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleClientAction("Propor Acordo", selectedClient)}
                    >
                      <HandshakeIcon className="mr-2 h-4 w-4" />
                      Propor Acordo
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleClientAction("Registrar Pagamento", selectedClient)}
                    >
                      <CreditCardIcon className="mr-2 h-4 w-4" />
                      Registrar Pagamento
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleClientAction("Ajustar Nível de Risco", selectedClient)}
                    >
                      <AdjustmentsIcon className="mr-2 h-4 w-4" />
                      Ajustar Nível de Risco
                    </Button>
                    
                    {selectedClient.status === "delinquent" && (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleClientAction("Escalar para Jurídico", selectedClient)}
                      >
                        <ScaleIcon className="mr-2 h-4 w-4" />
                        Escalar para Jurídico
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setSelectedClient(null)}
              >
                Fechar
              </Button>
              <Button 
                onClick={() => {
                  handleClientAction("Ver Histórico Completo", selectedClient);
                  setSelectedClient(null);
                }}
              >
                Ver Histórico Completo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

interface ClientsTableProps {
  clients: any[];
  toggleSort: (field: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  onClientSelect: (client: any) => void;
  onClientAction: (action: string, client: any) => void;
}

const ClientsTable = ({ 
  clients, 
  toggleSort, 
  sortField, 
  sortDirection,
  onClientSelect,
  onClientAction
}: ClientsTableProps) => {
  const SortArrow = ({ field }: { field: string }) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sortDirection === "asc" ? 
      <ArrowUp className="ml-2 h-4 w-4" /> : 
      <ArrowDown className="ml-2 h-4 w-4" />;
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">
            <Button 
              variant="ghost" 
              className="p-0 hover:bg-transparent"
              onClick={() => toggleSort("name")}
            >
              <span>Cliente</span>
              <SortArrow field="name" />
            </Button>
          </TableHead>
          <TableHead>Produto</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <Button 
              variant="ghost" 
              className="p-0 hover:bg-transparent"
              onClick={() => toggleSort("amount")}
            >
              <span>Valor</span>
              <SortArrow field="amount" />
            </Button>
          </TableHead>
          <TableHead>
            <Button 
              variant="ghost" 
              className="p-0 hover:bg-transparent"
              onClick={() => toggleSort("daysOverdue")}
            >
              <span>Dias em Atraso</span>
              <SortArrow field="daysOverdue" />
            </Button>
          </TableHead>
          <TableHead>
            <Button 
              variant="ghost" 
              className="p-0 hover:bg-transparent"
              onClick={() => toggleSort("riskScore")}
            >
              <span>Nível de Risco</span>
              <SortArrow field="riskScore" />
            </Button>
          </TableHead>
          <TableHead>Estratégia</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
              Nenhum cliente encontrado com os filtros selecionados
            </TableCell>
          </TableRow>
        ) : (
          clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">
                <div>
                  {client.name}
                  <p className="text-xs text-muted-foreground">{client.email}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getProductIcon(client.product)}
                  <span>{client.productName}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(client.status)}
                  {getStatusLabel(client.status)}
                </div>
              </TableCell>
              <TableCell>{formatCurrency(client.amount)}</TableCell>
              <TableCell>
                {client.daysOverdue > 0 ? (
                  <span className={`text-${client.daysOverdue > 30 ? 'red' : 'amber'}-600`}>
                    {client.daysOverdue} dias
                  </span>
                ) : (
                  <span className="text-green-600">Em dia</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getRiskColor(client.riskScore)}>
                  {client.riskScore === 'high' ? 'Alto' : 
                    client.riskScore === 'medium' ? 'Médio' : 'Baixo'}
                </Badge>
              </TableCell>
              <TableCell>
                {client.status === 'current' ? 'Monitoramento' : 
                 client.status === 'pre-delinquent' ? 'Prevenção' : 'Recuperação'}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onClientSelect(client)}
                  >
                    Detalhes
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="p-2"
                    onClick={() => onClientAction("Ações Rápidas", client)}
                  >
                    <MoreVerticalIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

const MessageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const HandshakeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
  </svg>
);

const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

const AdjustmentsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ScaleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="3" x2="12" y2="21" />
    <polyline points="6 9 12 3 18 9" />
    <line x1="3" y1="15" x2="21" y2="15" />
  </svg>
);

const ArrowUp = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const ArrowDown = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

const MoreVerticalIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

export default PortfolioManagement;
