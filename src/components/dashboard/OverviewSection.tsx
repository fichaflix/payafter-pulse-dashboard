
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Clock, CheckCircle2 } from "lucide-react";

interface OverviewSectionProps {
  selectedPeriod: string;
}

const OverviewSection = ({ selectedPeriod }: OverviewSectionProps) => {
  // Mock data - in real app this would come from API
  const dailyRevenue = [
    { day: 'Seg', value: 12500, orders: 45 },
    { day: 'Ter', value: 15200, orders: 52 },
    { day: 'Qua', value: 18700, orders: 67 },
    { day: 'Qui', value: 16800, orders: 58 },
    { day: 'Sex', value: 21300, orders: 78 },
    { day: 'Sáb', value: 19600, orders: 71 },
    { day: 'Dom', value: 14200, orders: 49 }
  ];

  const todayStats = {
    revenue: 21300,
    orders: 78,
    pendingApproval: 12,
    pendingPayment: 8
  };

  const monthlyProjection = {
    current: 387500,
    projected: 580000,
    percentage: 66.8
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Faturamento Hoje</CardTitle>
            <DollarSign className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {todayStats.revenue.toLocaleString()}</div>
            <div className="flex items-center text-xs opacity-90 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% vs ontem
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Pedidos Hoje</CardTitle>
            <ShoppingCart className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.orders}</div>
            <div className="flex items-center text-xs opacity-90 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% vs ontem
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Aguardando Aprovação</CardTitle>
            <Clock className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.pendingApproval}</div>
            <div className="text-xs opacity-90 mt-1">Requer atenção</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Pagamento Pendente</CardTitle>
            <CheckCircle2 className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.pendingPayment}</div>
            <div className="text-xs opacity-90 mt-1">Em processamento</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Daily Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Faturamento dos Últimos 7 Dias</CardTitle>
            <CardDescription>Comparativo diário de receita e pedidos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'value' ? `R$ ${value.toLocaleString()}` : value,
                    name === 'value' ? 'Faturamento' : 'Pedidos'
                  ]}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Projection */}
        <Card>
          <CardHeader>
            <CardTitle>Fechamento Mensal</CardTitle>
            <CardDescription>Faturamento atual vs projeção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Faturamento Atual</span>
                <span className="font-medium">R$ {monthlyProjection.current.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Projeção Total</span>
                <span className="font-medium">R$ {monthlyProjection.projected.toLocaleString()}</span>
              </div>
            </div>
            
            <Progress value={monthlyProjection.percentage} className="h-3" />
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{monthlyProjection.percentage}%</div>
              <div className="text-sm text-muted-foreground">da meta mensal</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-800">
                <strong>Restam R$ {(monthlyProjection.projected - monthlyProjection.current).toLocaleString()}</strong> para atingir a meta
              </div>
              <div className="text-xs text-green-600 mt-1">
                Baseado no ritmo atual, meta será atingida em 18 dias
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewSection;
