
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, AlertCircle, Clock, Zap, Database, Webhook, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IntegrationStatus = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const { toast } = useToast();

  // Mock integration data
  const integrations = [
    {
      id: 1,
      name: 'Make.com',
      type: 'Automação',
      status: 'connected',
      lastSync: '2024-01-15 14:30',
      description: 'Automação de fluxos de pagamento',
      webhook: 'https://hook.integromat.com/xxx',
      errors: 0
    },
    {
      id: 2,
      name: 'Airtable',
      type: 'Database',
      status: 'connected',
      lastSync: '2024-01-15 14:28',
      description: 'Sincronização de dados de vendas',
      webhook: 'https://api.airtable.com/webhook/xxx',
      errors: 0
    },
    {
      id: 3,
      name: 'Log System',
      type: 'Monitoring',
      status: 'warning',
      lastSync: '2024-01-15 13:45',
      description: 'Sistema de logs e monitoramento',
      webhook: 'https://logs.company.com/webhook/xxx',
      errors: 3
    },
    {
      id: 4,
      name: 'Payment Gateway',
      type: 'Payment',
      status: 'error',
      lastSync: '2024-01-15 12:15',
      description: 'Gateway de pagamentos principal',
      webhook: 'https://payments.gateway.com/webhook/xxx',
      errors: 12
    }
  ];

  const recentLogs = [
    { timestamp: '2024-01-15 14:30:15', level: 'info', source: 'Make.com', message: 'Pagamento processado com sucesso - ID: PAY001' },
    { timestamp: '2024-01-15 14:28:42', level: 'info', source: 'Airtable', message: 'Dados de vendas sincronizados - 23 registros' },
    { timestamp: '2024-01-15 14:25:18', level: 'error', source: 'Payment Gateway', message: 'Timeout na conexão - tentativa 3/3' },
    { timestamp: '2024-01-15 14:20:33', level: 'warning', source: 'Log System', message: 'Limite de requisições próximo do máximo' },
    { timestamp: '2024-01-15 14:15:07', level: 'info', source: 'Make.com', message: 'Webhook recebido - processando dados' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">Conectado</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Atenção</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Erro</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      toast({
        title: "Erro",
        description: "Por favor, insira a URL do webhook",
        variant: "destructive",
      });
      return;
    }

    setIsTestingWebhook(true);
    console.log("Testando webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          data: {
            event: "webhook_test",
            dashboard: "pay_after_dashboard",
            message: "Teste de integração do dashboard"
          }
        }),
      });

      toast({
        title: "Webhook Testado",
        description: "O webhook foi chamado com sucesso. Verifique os logs da sua integração.",
      });
    } catch (error) {
      console.error("Erro ao testar webhook:", error);
      toast({
        title: "Erro",
        description: "Falha ao testar o webhook. Verifique a URL e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Integration Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Integrações Ativas</CardTitle>
            <CheckCircle2 className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.filter(i => i.status === 'connected').length}
            </div>
            <div className="text-xs opacity-90 mt-1">Funcionando normalmente</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Com Alertas</CardTitle>
            <AlertCircle className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.filter(i => i.status === 'warning').length}
            </div>
            <div className="text-xs opacity-90 mt-1">Requer monitoramento</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Com Erros</CardTitle>
            <AlertCircle className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.filter(i => i.status === 'error').length}
            </div>
            <div className="text-xs opacity-90 mt-1">Requer ação imediata</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total de Erros</CardTitle>
            <Database className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.reduce((sum, i) => sum + i.errors, 0)}
            </div>
            <div className="text-xs opacity-90 mt-1">Últimas 24 horas</div>
          </CardContent>
        </Card>
      </div>

      {/* Webhook Tester */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            Teste de Webhook
          </CardTitle>
          <CardDescription>
            Teste suas integrações enviando dados para um webhook personalizado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="https://seu-webhook.com/endpoint"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleTestWebhook} 
              disabled={isTestingWebhook}
              className="flex items-center gap-2"
            >
              {isTestingWebhook ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
              {isTestingWebhook ? "Testando..." : "Testar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integrations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Status das Integrações</CardTitle>
          <CardDescription>Monitoramento de todas as integrações ativas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Integração</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Sincronização</TableHead>
                <TableHead>Erros</TableHead>
                <TableHead>Webhook</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {integrations.map((integration) => (
                <TableRow key={integration.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{integration.name}</div>
                      <div className="text-sm text-muted-foreground">{integration.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{integration.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(integration.status)}
                      {getStatusBadge(integration.status)}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(integration.lastSync).toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className={`font-medium ${integration.errors > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {integration.errors}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-mono">
                    {integration.webhook.substring(0, 30)}...
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Testar
                      </Button>
                      <Button size="sm" variant="outline">
                        Logs
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Logs Recentes</CardTitle>
          <CardDescription>Histórico de eventos das integrações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-0.5">
                  {getLevelIcon(log.level)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{log.source}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        log.level === 'error' ? 'border-red-200 text-red-800' :
                        log.level === 'warning' ? 'border-yellow-200 text-yellow-800' :
                        'border-blue-200 text-blue-800'
                      }`}
                    >
                      {log.level.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">{log.message}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationStatus;
