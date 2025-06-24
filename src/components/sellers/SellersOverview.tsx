
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, DollarSign, Package, AlertTriangle, CheckCircle2 } from "lucide-react";

interface SellersOverviewProps {
  selectedSeller: string;
}

const SellersOverview = ({ selectedSeller }: SellersOverviewProps) => {
  const sellersData = [
    {
      id: "carlos",
      name: "Carlos Silva",
      monthlyGoal: 50000,
      achieved: 42300,
      dailyGoal: 1667,
      todayAchieved: 1890,
      ordersInTransit: 12,
      ordersPendingPayment: 8,
      ordersPaid: 45,
      conversionRate: 85.2
    },
    {
      id: "ana",
      name: "Ana Santos",
      monthlyGoal: 45000,
      achieved: 38900,
      dailyGoal: 1500,
      todayAchieved: 1320,
      ordersInTransit: 9,
      ordersPendingPayment: 5,
      ordersPaid: 38,
      conversionRate: 78.4
    },
    {
      id: "roberto",
      name: "Roberto Lima",
      monthlyGoal: 40000,
      achieved: 28400,
      dailyGoal: 1333,
      todayAchieved: 980,
      ordersInTransit: 15,
      ordersPendingPayment: 12,
      ordersPaid: 28,
      conversionRate: 65.8
    },
    {
      id: "maria",
      name: "Maria Costa",
      monthlyGoal: 55000,
      achieved: 48600,
      dailyGoal: 1833,
      todayAchieved: 2100,
      ordersInTransit: 8,
      ordersPendingPayment: 3,
      ordersPaid: 52,
      conversionRate: 91.3
    }
  ];

  const filteredData = selectedSeller === "all" ? sellersData : sellersData.filter(s => s.id === selectedSeller);
  
  const totalStats = {
    totalGoal: sellersData.reduce((sum, s) => sum + s.monthlyGoal, 0),
    totalAchieved: sellersData.reduce((sum, s) => sum + s.achieved, 0),
    totalInTransit: sellersData.reduce((sum, s) => sum + s.ordersInTransit, 0),
    totalPendingPayment: sellersData.reduce((sum, s) => sum + s.ordersPendingPayment, 0),
    totalPaid: sellersData.reduce((sum, s) => sum + s.ordersPaid, 0),
    avgConversion: sellersData.reduce((sum, s) => sum + s.conversionRate, 0) / sellersData.length
  };

  const displayStats = selectedSeller === "all" ? totalStats : {
    totalGoal: filteredData[0]?.monthlyGoal || 0,
    totalAchieved: filteredData[0]?.achieved || 0,
    totalInTransit: filteredData[0]?.ordersInTransit || 0,
    totalPendingPayment: filteredData[0]?.ordersPendingPayment || 0,
    totalPaid: filteredData[0]?.ordersPaid || 0,
    avgConversion: filteredData[0]?.conversionRate || 0
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Meta Mensal</CardTitle>
            <Target className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {displayStats.totalGoal.toLocaleString()}</div>
            <div className="text-xs opacity-90 mt-1">
              {((displayStats.totalAchieved / displayStats.totalGoal) * 100).toFixed(1)}% alcançado
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Vendas Realizadas</CardTitle>
            <DollarSign className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {displayStats.totalAchieved.toLocaleString()}</div>
            <div className="text-xs opacity-90 mt-1">
              Taxa conversão: {displayStats.avgConversion.toFixed(1)}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Em Trânsito</CardTitle>
            <Package className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayStats.totalInTransit}</div>
            <div className="text-xs opacity-90 mt-1">Pedidos enviados</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Falta Pagar</CardTitle>
            <AlertTriangle className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayStats.totalPendingPayment}</div>
            <div className="text-xs opacity-90 mt-1">Aguardando pagamento</div>
          </CardContent>
        </Card>
      </div>

      {/* Sellers Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredData.map((seller) => (
          <Card key={seller.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{seller.name}</CardTitle>
              <CardDescription>Meta mensal: R$ {seller.monthlyGoal.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progresso da Meta</span>
                  <span className="font-medium">{((seller.achieved / seller.monthlyGoal) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(seller.achieved / seller.monthlyGoal) * 100} className="h-3" />
                <div className="text-xs text-muted-foreground mt-1">
                  R$ {seller.achieved.toLocaleString()} de R$ {seller.monthlyGoal.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-yellow-50 rounded">
                  <div className="text-lg font-bold text-yellow-600">{seller.ordersInTransit}</div>
                  <div className="text-xs text-yellow-800">Em Trânsito</div>
                </div>
                <div className="p-2 bg-red-50 rounded">
                  <div className="text-lg font-bold text-red-600">{seller.ordersPendingPayment}</div>
                  <div className="text-xs text-red-800">Falta Pagar</div>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <div className="text-lg font-bold text-green-600">{seller.ordersPaid}</div>
                  <div className="text-xs text-green-800">Pagos</div>
                </div>
              </div>

              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="text-lg font-bold text-blue-600">R$ {seller.todayAchieved.toLocaleString()}</div>
                <div className="text-xs text-blue-800">Vendas hoje</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      {selectedSeller === "all" && (
        <Card>
          <CardHeader>
            <CardTitle>Comparativo de Performance</CardTitle>
            <CardDescription>Vendas realizadas vs metas mensais por vendedor</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sellersData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `R$ ${value.toLocaleString()}`,
                    name === 'achieved' ? 'Realizado' : 'Meta'
                  ]}
                />
                <Bar dataKey="achieved" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="monthlyGoal" fill="#e5e7eb" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SellersOverview;
