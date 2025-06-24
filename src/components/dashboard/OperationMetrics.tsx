
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, RotateCcw, CreditCard } from "lucide-react";

interface OperationMetricsProps {
  selectedPeriod: string;
}

const OperationMetrics = ({ selectedPeriod }: OperationMetricsProps) => {
  // Mock metrics data
  const defaultRateData = [
    { seller: 'Carlos', rate: 1.5, color: '#10b981' },
    { seller: 'Ana', rate: 0.9, color: '#10b981' },
    { seller: 'Roberto', rate: 2.8, color: '#ef4444' },
    { seller: 'Maria', rate: 0.7, color: '#10b981' },
  ];

  const returnRateData = [
    { seller: 'Carlos', rate: 2.1, color: '#f59e0b' },
    { seller: 'Ana', rate: 1.8, color: '#10b981' },
    { seller: 'Roberto', rate: 3.2, color: '#ef4444' },
    { seller: 'Maria', rate: 1.2, color: '#10b981' },
  ];

  const platformPerformance = [
    { platform: 'Pay After', sales: 285600, growth: 12.5, orders: 1247 },
    { platform: 'Cash on Delivery', sales: 156800, growth: -3.2, orders: 892 },
    { platform: 'Credit Card', sales: 198500, growth: 8.7, orders: 743 },
    { platform: 'PIX', sales: 124300, growth: 15.3, orders: 567 },
  ];

  const monthlyComparison = [
    { month: 'Nov', payAfter: 245000, cod: 180000, credit: 165000, pix: 98000 },
    { month: 'Dez', payAfter: 267000, cod: 174000, credit: 182000, pix: 112000 },
    { month: 'Jan', payAfter: 285600, cod: 156800, credit: 198500, pix: 124300 },
  ];

  const operationalMetrics = {
    avgProcessingTime: 2.3,
    approvalRate: 87.5,
    customerSatisfaction: 4.2,
    systemUptime: 99.8
  };

  const getStatusColor = (value: number, type: string) => {
    if (type === 'default' || type === 'return') {
      if (value <= 1.5) return '#10b981'; // Green
      if (value <= 2.5) return '#f59e0b'; // Yellow
      return '#ef4444'; // Red
    }
    return '#3b82f6'; // Blue
  };

  return (
    <div className="space-y-6">
      {/* Key Operational Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Taxa de Aprovação</CardTitle>
            <TrendingUp className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationalMetrics.approvalRate}%</div>
            <div className="text-xs opacity-90 mt-1">+2.3% vs mês anterior</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Tempo Proc. Médio</CardTitle>
            <CreditCard className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationalMetrics.avgProcessingTime}h</div>
            <div className="text-xs opacity-90 mt-1">-0.5h vs mês anterior</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Satisfação Cliente</CardTitle>
            <TrendingUp className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationalMetrics.customerSatisfaction}/5</div>
            <div className="text-xs opacity-90 mt-1">⭐ Excelente avaliação</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Uptime Sistema</CardTitle>
            <AlertTriangle className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationalMetrics.systemUptime}%</div>
            <div className="text-xs opacity-90 mt-1">✅ Sistema estável</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Default Rate by Seller */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Taxa de Inadimplência por Vendedor
            </CardTitle>
            <CardDescription>Monitoramento de riscos por vendedor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {defaultRateData.map((seller, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{seller.seller}</span>
                    <span className={`font-bold ${seller.rate > 2.0 ? 'text-red-600' : 'text-green-600'}`}>
                      {seller.rate}%
                    </span>
                  </div>
                  <Progress 
                    value={seller.rate * 10} 
                    className="h-2"
                  />
                  {seller.rate > 2.0 && (
                    <div className="text-xs text-red-600 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Acima do limite recomendado (2.0%)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Return Rate by Seller */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-yellow-500" />
              Taxa de Devolução por Vendedor
            </CardTitle>
            <CardDescription>Controle de qualidade por vendedor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {returnRateData.map((seller, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{seller.seller}</span>
                    <span className={`font-bold ${seller.rate > 2.5 ? 'text-red-600' : seller.rate > 2.0 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {seller.rate}%
                    </span>
                  </div>
                  <Progress 
                    value={seller.rate * 10} 
                    className="h-2"
                  />
                  {seller.rate > 2.5 && (
                    <div className="text-xs text-red-600 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Taxa elevada - investigar causas
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Plataforma</CardTitle>
          <CardDescription>Comparativo de vendas entre diferentes métodos de pagamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {platformPerformance.map((platform, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium text-sm mb-2">{platform.platform}</div>
                <div className="text-2xl font-bold mb-1">R$ {platform.sales.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mb-2">{platform.orders} pedidos</div>
                <div className={`flex items-center gap-1 text-xs ${platform.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {platform.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(platform.growth)}% vs mês anterior
                </div>
              </div>
            ))}
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`R$ ${value.toLocaleString()}`, '']}
              />
              <Line type="monotone" dataKey="payAfter" stroke="#3b82f6" strokeWidth={3} name="Pay After" />
              <Line type="monotone" dataKey="cod" stroke="#f59e0b" strokeWidth={2} name="Cash on Delivery" />
              <Line type="monotone" dataKey="credit" stroke="#10b981" strokeWidth={2} name="Credit Card" />
              <Line type="monotone" dataKey="pix" stroke="#8b5cf6" strokeWidth={2} name="PIX" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo de Análise de Risco</CardTitle>
          <CardDescription>Indicadores críticos que requerem atenção</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="font-medium text-red-800">Alto Risco</span>
              </div>
              <div className="text-sm text-red-700">
                • Roberto Lima: 2.8% inadimplência<br />
                • Roberto Lima: 3.2% devolução<br />
                • Necessita intervenção imediata
              </div>
            </div>
            
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-yellow-800">Atenção</span>
              </div>
              <div className="text-sm text-yellow-700">
                • Carlos Silva: 2.1% devolução<br />
                • Cash on Delivery: -3.2% crescimento<br />
                • Monitorar de perto
              </div>
            </div>
            
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-800">Baixo Risco</span>
              </div>
              <div className="text-sm text-green-700">
                • Ana Santos: 0.9% inadimplência<br />
                • Maria Costa: 0.7% inadimplência<br />
                • Performance excelente
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationMetrics;
