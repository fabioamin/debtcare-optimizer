
import { useState } from "react";
import { Search, Filter, Download, ArrowUpDown, AlertTriangle, CheckCircle2, Clock, CreditCard, Landmark, Receipt, DollarSign, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data - would come from API in a real app
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

// Product types
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

// Get status icon
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

// Get status label
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

// Get product icon
const getProductIcon = (productType: string) => {
  const product = productTypes.find(p => p.id === productType);
  if (!product) return <DollarSign className="h-5 w-5" />;
  
  const Icon = product.icon;
  return <Icon className="h-5 w-5" />;
};

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const PortfolioManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("all");
  
  // Filter clients based on search term and selected tab
  const filteredClients = clients.filter(client => {
    // Search filter
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Tab filter (status)
    const matchesStatus = selectedTab === "all" || client.status === selectedTab;
    
    // Product filter
    const matchesProduct = selectedProduct === "all" || client.product === selectedProduct;
    
    return matchesSearch && matchesStatus && matchesProduct;
  });

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
          {/* Search and filter bar */}
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

          {/* Debt status tabs */}
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="current">Em dia</TabsTrigger>
              <TabsTrigger value="pre-delinquent">Pré-inadimplentes</TabsTrigger>
              <TabsTrigger value="delinquent">Inadimplentes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="rounded-md border">
                <ClientsTable clients={filteredClients} />
              </div>
            </TabsContent>
            
            <TabsContent value="current" className="mt-0">
              <div className="rounded-md border">
                <ClientsTable clients={filteredClients} />
              </div>
            </TabsContent>
            
            <TabsContent value="pre-delinquent" className="mt-0">
              <div className="rounded-md border">
                <ClientsTable clients={filteredClients} />
              </div>
            </TabsContent>
            
            <TabsContent value="delinquent" className="mt-0">
              <div className="rounded-md border">
                <ClientsTable clients={filteredClients} />
              </div>
            </TabsContent>
          </Tabs>

          {/* Portfolio summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total do Portfólio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">R$ 96.700,00</p>
                <p className="text-sm text-muted-foreground mt-1">8 clientes</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total em Atraso</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-600">R$ 52.200,00</p>
                <p className="text-sm text-muted-foreground mt-1">54% do portfólio</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recuperação Prevista</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">R$ 45.800,00</p>
                <p className="text-sm text-muted-foreground mt-1">87.7% do total em atraso</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Produtos Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">7</p>
                <p className="text-sm text-muted-foreground mt-1">Tipos de produtos</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Product distribution */}
          <div className="bg-secondary/40 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-medium mb-4">Distribuição por Produto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {productTypes.filter(p => p.id !== "all").map((product) => (
                <div key={product.id} className="bg-background p-4 rounded-lg border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <product.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {clients.filter(c => c.product === product.id).length} clientes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Risk strategy section */}
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
    </Card>
  );
};

// Clients table component for better organization
const ClientsTable = ({ clients }: { clients: any[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[200px]">
          <Button variant="ghost" className="p-0 hover:bg-transparent">
            <span>Cliente</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead>Produto</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>
          <Button variant="ghost" className="p-0 hover:bg-transparent">
            <span>Valor</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" className="p-0 hover:bg-transparent">
            <span>Dias em Atraso</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead>Nível de Risco</TableHead>
        <TableHead>Estratégia</TableHead>
        <TableHead>Ações</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {clients.map((client) => (
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
            <Badge variant="outline" className={`
              ${client.riskScore === 'high' ? 'bg-red-100 text-red-800 hover:bg-red-100' : 
                client.riskScore === 'medium' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : 
                'bg-green-100 text-green-800 hover:bg-green-100'}`}>
              {client.riskScore === 'high' ? 'Alto' : 
                client.riskScore === 'medium' ? 'Médio' : 'Baixo'}
            </Badge>
          </TableCell>
          <TableCell>
            {client.status === 'current' ? 'Monitoramento' : 
             client.status === 'pre-delinquent' ? 'Prevenção' : 'Recuperação'}
          </TableCell>
          <TableCell>
            <Button variant="outline" size="sm">Detalhes</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default PortfolioManagement;
