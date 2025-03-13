
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileUp, 
  Database, 
  FileSpreadsheet, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Link as LinkIcon,
  CloudUpload
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const PortfolioUpload = () => {
  const [fileUploadTab, setFileUploadTab] = useState<string>("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [integrationSource, setIntegrationSource] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [showIntegrationDialog, setShowIntegrationDialog] = useState<boolean>(false);
  const [isIntegrating, setIsIntegrating] = useState<boolean>(false);
  const [mappingConfig, setMappingConfig] = useState({
    nameField: "name",
    emailField: "email",
    amountField: "amount",
    statusField: "status"
  });
  const { toast } = useToast();

  // Handler para seleção de arquivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      toast({
        title: "Arquivo selecionado",
        description: `${files[0].name} (${formatFileSize(files[0].size)})`,
      });
    }
  };

  // Handler para upload de arquivo
  const handleFileUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo para fazer upload.",
        variant: "destructive",
      });
      return;
    }

    // Simular upload
    setUploadStatus("uploading");
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("success");
          toast({
            title: "Upload concluído",
            description: "Seu portfólio foi importado com sucesso!",
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  // Handler para integração com sistema externo
  const handleIntegration = () => {
    if (!integrationSource || !apiKey) {
      toast({
        title: "Informações incompletas",
        description: "Por favor, preencha todas as informações de integração.",
        variant: "destructive",
      });
      return;
    }

    // Simular integração
    setIsIntegrating(true);
    setTimeout(() => {
      setIsIntegrating(false);
      toast({
        title: "Integração concluída",
        description: `Integração com ${integrationSource} realizada com sucesso!`,
      });
      setShowIntegrationDialog(false);
    }, 3000);
  };

  // Função para formatar o tamanho do arquivo
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Resetar o upload
  const resetUpload = () => {
    setSelectedFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Upload de Portfólio</CardTitle>
        <CardDescription>
          Importe seus clientes e débitos para o sistema através de upload de arquivos ou integração direta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={fileUploadTab} onValueChange={setFileUploadTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="file">
              <FileUp className="h-4 w-4 mr-2" />
              Upload de Arquivo
            </TabsTrigger>
            <TabsTrigger value="integration">
              <LinkIcon className="h-4 w-4 mr-2" />
              Integração
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="space-y-4">
            {uploadStatus === "idle" && (
              <>
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 bg-muted/50 cursor-pointer"
                  onClick={() => document.getElementById('fileInput')?.click()}>
                  <CloudUpload className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">Arraste e solte seu arquivo ou clique para selecionar</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Suporta CSV, Excel (.xlsx, .xls)
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('fileInput')?.click();
                  }}>
                    Selecionar Arquivo
                  </Button>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                  />
                </div>
              
                {selectedFile && (
                  <div className="border rounded-lg p-4 mt-4 bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileSpreadsheet className="h-8 w-8 mr-3 text-primary" />
                        <div>
                          <h4 className="font-medium">{selectedFile.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(selectedFile.size)}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={resetUpload}>
                        Remover
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="bg-muted/30 p-4 rounded-lg mt-4">
                  <h3 className="font-medium mb-3">Configuração de Mapeamento</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Defina quais colunas do seu arquivo correspondem aos campos do sistema
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nome do Cliente</label>
                      <Input 
                        value={mappingConfig.nameField}
                        onChange={(e) => setMappingConfig({...mappingConfig, nameField: e.target.value})}
                        placeholder="Nome da coluna no arquivo" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input 
                        value={mappingConfig.emailField}
                        onChange={(e) => setMappingConfig({...mappingConfig, emailField: e.target.value})}
                        placeholder="Nome da coluna no arquivo" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Valor da Dívida</label>
                      <Input 
                        value={mappingConfig.amountField}
                        onChange={(e) => setMappingConfig({...mappingConfig, amountField: e.target.value})}
                        placeholder="Nome da coluna no arquivo" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Input 
                        value={mappingConfig.statusField}
                        onChange={(e) => setMappingConfig({...mappingConfig, statusField: e.target.value})}
                        placeholder="Nome da coluna no arquivo" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={resetUpload}>
                    Cancelar
                  </Button>
                  <Button onClick={handleFileUpload} disabled={!selectedFile}>
                    <FileUp className="h-4 w-4 mr-2" />
                    Fazer Upload
                  </Button>
                </div>
              </>
            )}

            {uploadStatus === "uploading" && (
              <div className="space-y-4 py-6">
                <div className="flex justify-center">
                  <RefreshCw className="h-12 w-12 text-primary animate-spin" />
                </div>
                <h3 className="text-lg font-medium text-center">Upload em andamento...</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Seu arquivo está sendo processado. Isso pode levar alguns instantes.
                </p>
                <Progress value={uploadProgress} className="h-2 w-full" />
                <p className="text-sm text-center">{uploadProgress}%</p>
              </div>
            )}

            {uploadStatus === "success" && (
              <div className="space-y-4 py-6">
                <div className="flex justify-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-lg font-medium text-center">Upload Concluído!</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Seu portfólio foi importado com sucesso e está pronto para ser gerenciado.
                </p>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Arquivo:</span>
                      <span className="text-sm font-medium">{selectedFile?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Clientes importados:</span>
                      <span className="text-sm font-medium">157</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Valor total:</span>
                      <span className="text-sm font-medium">R$ 425.890,00</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-3 mt-4">
                  <Button onClick={resetUpload}>
                    Novo Upload
                  </Button>
                </div>
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="space-y-4 py-6">
                <div className="flex justify-center">
                  <AlertTriangle className="h-12 w-12 text-red-500" />
                </div>
                <h3 className="text-lg font-medium text-center">Erro no Upload</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Ocorreu um erro durante o processamento do seu arquivo. Verifique o formato e tente novamente.
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  <Button onClick={resetUpload}>
                    Tentar Novamente
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="integration" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <IntegrationCard 
                title="CRM Integration" 
                description="Connect with your CRM system to import clients and debts"
                icon={<Database className="h-6 w-6" />}
                onClick={() => {
                  setIntegrationSource("CRM System");
                  setShowIntegrationDialog(true);
                }}
              />
              
              <IntegrationCard 
                title="ERP Integration" 
                description="Import financial data directly from your ERP system"
                icon={<Database className="h-6 w-6" />}
                onClick={() => {
                  setIntegrationSource("ERP System");
                  setShowIntegrationDialog(true);
                }}
              />
              
              <IntegrationCard 
                title="Banking API" 
                description="Connect with your banking system to import transactions"
                icon={<Database className="h-6 w-6" />}
                onClick={() => {
                  setIntegrationSource("Banking API");
                  setShowIntegrationDialog(true);
                }}
              />
              
              <IntegrationCard 
                title="Accounting Software" 
                description="Import from popular accounting software platforms"
                icon={<Database className="h-6 w-6" />}
                onClick={() => {
                  setIntegrationSource("Accounting Software");
                  setShowIntegrationDialog(true);
                }}
              />
              
              <IntegrationCard 
                title="Custom API" 
                description="Connect to your custom backend or third-party APIs"
                icon={<Database className="h-6 w-6" />}
                onClick={() => {
                  setIntegrationSource("Custom API");
                  setShowIntegrationDialog(true);
                }}
              />
            </div>
            
            <Dialog open={showIntegrationDialog} onOpenChange={setShowIntegrationDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Integrar com {integrationSource}</DialogTitle>
                  <DialogDescription>
                    Configure a integração para importar dados automaticamente
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Endpoint da API</label>
                    <Input 
                      placeholder="https://api.example.com/v1/" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Key</label>
                    <Input 
                      placeholder="Chave de API" 
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Frequência de Sincronização</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Frequência de sincronização" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="daily">Diária</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-lg text-sm">
                    <h4 className="font-medium mb-1">Dicas para Integração</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Certifique-se de que sua API suporta os campos necessários</li>
                      <li>Configure as permissões corretas no sistema de origem</li>
                      <li>Teste a conexão antes de executar a sincronização completa</li>
                    </ul>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowIntegrationDialog(false)}
                    disabled={isIntegrating}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleIntegration}
                    disabled={isIntegrating}
                  >
                    {isIntegrating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Conectando...
                      </>
                    ) : (
                      'Conectar'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const IntegrationCard = ({ title, description, icon, onClick }: IntegrationCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full">
          <LinkIcon className="h-4 w-4 mr-2" />
          Configurar Integração
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PortfolioUpload;
