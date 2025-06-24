
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Target, TrendingUp, AlertTriangle } from "lucide-react";

interface SalesAnalysisProps {
  selectedPeriod: string;
}

const SalesAnalysis = ({ selectedPeriod }: SalesAnalysisProps) => {
  // Mock data for sellers
  const sellers = [
    {
      id: 1,
      name: "Carlos Silva",
      monthlyGoal: 50000,
      currentSales: 42300,
      dailyGoal: 1667,
      todaySales: 1890,
      returnRate: 2.1,
      defaultRate: 1.5,
      receivedPayments: 38500,
      pendingPayments: 3800,
      status: "excellent"
    },
    {
      id: 2,
      name: "Ana Santos",
      monthlyGoal: 45000,
      currentSales: 38900,
      dailyGoal: 1500,
      todaySales: 1320,
      returnRate: 1.8,
      defaultRate: 0.9,
      receivedPayments: 35200,
      pendingPayments: 3700,
      status: "good"
    },
    {
      id: 3,
      name: "Roberto Lima",
      monthlyGoal: 40000,
      currentSales: 28400,
      dailyGoal: 1333,
      todaySales: 980,
      returnRate: 3.2,
      defaultRate: 2.8,
      receivedPayments: 25100,
      pendingPayments: 3300,
      status: "attention"
    },
    {
      id: 4,
      name: "Maria Costa",
      monthlyGoal: 55000,
      currentSales: 48600,
      dailyGoal: 1833,
      todaySales: 2100,
      returnRate: 1.2,
      defaultRate: 0.7,
      receivedPayments: 44200,
      pendingPayments: 4400,
      status: "excellent"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-500";
      case "good": return "bg-blue-500";
      case "attention": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent": return <Badge className="bg-green-100 text-green-800">Excelente</Badge>;
      case "good": return <Badge className="bg-blue-100 text-blue-800">Bom</Badge>;
      case "attention": return <Badge className="bg-yellow-100 text-yellow-800">Atenção</Badge>;
      default: return <Badge variant="outline">Normal</Badge>;
    }
  };

  const chartData = sellers.map(seller => ({
    name: seller.name.split(' ')[0],
    vendas: seller.currentSales,
    meta: seller.monthlyGoal,
    percentual: (seller.currentSales / seller.monthlyGoal) * 100
  }));

  return (
    <div className="space-y-6">
      {/* Sellers Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sellers.map((seller) => (
          <Card key={seller.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{seller.name}</CardTitle>
                {getStatusBadge(seller.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Meta Mensal</span>
                  <span>{((seller.currentSales / seller.monthlyGoal) * 100).toFixed(1)}%</span>
                </div>
                <Progress 
                  value={(seller.currentSales / seller.monthlyGoal) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  R$ {seller.currentSales.toLocaleString()} / R$ {seller.monthlyGoal.toLocaleString()}
                </div>
              </div>
              
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg font-bold text-green-600">R$ {seller.todaySales.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Vendas hoje</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Performance Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Comparativo de Vendedores</CardTitle>
            <CardDescription>Vendas realizadas vs metas mensais</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `R$ ${value.toLocaleString()}`,
                    name === 'vendas' ? 'Vendas' : 'Meta'
                  ]}
                />
                <Bar dataKey="vendas" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="meta" fill="#e5e7eb" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Ranking de Performance</CardTitle>
            <CardDescription>Melhores vendedores do período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sellers
                .sort((a, b) => (b.currentSales / b.monthlyGoal) - (a.currentSales / a.monthlyGoal))
                .map((seller, index) => (
                  <div key={seller.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 ${getStatusColor(seller.status)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{seller.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {((seller.currentSales / seller.monthlyGoal) * 100).toFixed(1)}% da meta
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">R$ {seller.currentSales.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        Inadimplência: {seller.defaultRate}%
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Sellers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Análise Detalhada por Vendedor</CardTitle>
          <CardDescription>Métricas completas de desempenho</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendedor</TableHead>
                <TableHead>Meta Mensal</TableHead>
                <TableHead>Vendas Realizadas</TableHead>
                <TableHead>% da Meta</TableHead>
                <TableHead>Taxa Devolução</TableHead>
                <TableHead>Taxa Inadimplência</TableHead>
                <TableHead>Valor Recebido</TableHead>
                <TableHead>Valor Pendente</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell className="font-medium">{seller.name}</TableCell>
                  <TableCell>R$ {seller.monthlyGoal.toLocaleString()}</TableCell>
                  <TableCell>R$ {seller.currentSales.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {((seller.currentSales / seller.monthlyGoal) * 100).toFixed(1)}%
                      {seller.currentSales >= seller.monthlyGoal && (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {seller.returnRate}%
                      {seller.returnRate > 2.5 && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {seller.defaultRate}%
                      {seller.defaultRate > 2.0 && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-green-600 font-medium">
                    R$ {seller.receivedPayments.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-yellow-600 font-medium">
                    R$ {seller.pendingPayments.toLocaleString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(seller.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesAnalysis;
