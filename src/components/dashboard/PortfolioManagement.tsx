
import { useState } from "react";
import { Search, Filter, Download, ArrowUpDown, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data - would come from API in a real app
const clients = [
  { id: 1, name: "Carlos Silva", email: "carlos@example.com", amount: 12500, daysOverdue: 0, status: "current", riskScore: "low" },
  { id: 2, name: "Maria Santos", email: "maria@example.com", amount: 7800, daysOverdue: 15, status: "pre-delinquent", riskScore: "medium" },
  { id: 3, name: "João Oliveira", email: "joao@example.com", amount: 24300, daysOverdue: 45, status: "delinquent", riskScore: "high" },
  { id: 4, name: "Ana Costa", email: "ana@example.com", amount: 5200, daysOverdue: 0, status: "current", riskScore: "low" },
  { id: 5, name: "Paulo Ferreira", email: "paulo@example.com", amount: 18700, daysOverdue: 30, status: "delinquent", riskScore: "medium" },
  { id: 6, name: "Sofia Martins", email: "sofia@example.com", amount: 3600, daysOverdue: 7, status: "pre-delinquent", riskScore: "low" },
  { id: 7, name: "Ricardo Almeida", email: "ricardo@example.com", amount: 9200, daysOverdue: 60, status: "delinquent", riskScore: "high" },
  { id: 8, name: "Carla Ribeiro", email: "carla@example.com", amount: 15400, daysOverdue: 0, status: "current", riskScore: "medium" },
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
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Em dia</span>;
    case "pre-delinquent":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Pré-inadimplente</span>;
    case "delinquent":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Inadimplente</span>;
    default:
      return null;
  }
};

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const PortfolioManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  
  // Filter clients based on search term and selected tab
  const filteredClients = clients.filter(client => {
    // Search filter
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Tab filter
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "current") return matchesSearch && client.status === "current";
    if (selectedTab === "pre-delinquent") return matchesSearch && client.status === "pre-delinquent";
    if (selectedTab === "delinquent") return matchesSearch && client.status === "delinquent";
    
    return matchesSearch;
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
            <div className="flex gap-2">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
          </div>
          
          {/* Risk strategy section */}
          <div className="bg-secondary/40 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-medium mb-4">Estratégias Automáticas de Cobrança</h3>
            <div className="space-y-4">
              <div className="bg-background p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Risco Baixo</h4>
                    <p className="text-sm text-muted-foreground">Lembretes suaves, oferecimento de incentivos para pagamento antecipado</p>
                  </div>
                  <Button variant="outline" size="sm">Editar Estratégia</Button>
                </div>
              </div>
              
              <div className="bg-background p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Risco Médio</h4>
                    <p className="text-sm text-muted-foreground">Contato proativo, planos de pagamento flexíveis, sistema de alerta</p>
                  </div>
                  <Button variant="outline" size="sm">Editar Estratégia</Button>
                </div>
              </div>
              
              <div className="bg-background p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Risco Alto</h4>
                    <p className="text-sm text-muted-foreground">Intervenção imediata, contato multicanal, propostas personalizadas de liquidação</p>
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
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
              ${client.riskScore === 'high' ? 'bg-red-100 text-red-800' : 
                client.riskScore === 'medium' ? 'bg-amber-100 text-amber-800' : 
                'bg-green-100 text-green-800'}`}>
              {client.riskScore === 'high' ? 'Alto' : 
                client.riskScore === 'medium' ? 'Médio' : 'Baixo'}
            </span>
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
