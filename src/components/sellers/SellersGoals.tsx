
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, TrendingDown, Clock, CheckCircle2 } from "lucide-react";

interface SellersGoalsProps {
  selectedSeller: string;
}

const SellersGoals = ({ selectedSeller }: SellersGoalsProps) => {
  const goalsData = [
    {
      id: "carlos",
      name: "Carlos Silva",
      monthlyGoal: 50000,
      dailyGoal: 1667,
      weeklyGoal: 11667,
      achieved: 42300,
      dailyAchieved: 1890,
      weeklyAchieved: 8340,
      daysLeft: 8,
      trend: "up",
      projectedEnd: 52100,
      onTrack: true
    },
    {
      id: "ana",
      name: "Ana Santos",
      monthlyGoal: 45000,
      dailyGoal: 1500,
      weeklyGoal: 10500,
      achieved: 38900,
      dailyAchieved: 1320,
      weeklyAchieved: 7680,
      daysLeft: 8,
      trend: "down",
      projectedEnd: 43200,
      onTrack: true
    },
    {
      id: "roberto",
      name: "Roberto Lima",
      monthlyGoal: 40000,
      dailyGoal: 1333,
      weeklyGoal: 9333,
      achieved: 28400,
      dailyAchieved: 980,
      weeklyAchieved: 5880,
      daysLeft: 8,
      trend: "down",
      projectedEnd: 36240,
      onTrack: false
    },
    {
      id: "maria",
      name: "Maria Costa",
      monthlyGoal: 55000,
      dailyGoal: 1833,
      weeklyGoal: 12833,
      achieved: 48600,
      dailyAchieved: 2100,
      weeklyAchieved: 10200,
      daysLeft: 8,
      trend: "up",
      projectedEnd: 65400,
      onTrack: true
    }
  ];

  const weeklyProgress = [
    { week: 'Sem 1', carlos: 11200, ana: 9800, roberto: 7200, maria: 12400 },
    { week: 'Sem 2', carlos: 12800, ana: 10200, roberto: 6800, maria: 13200 },
    { week: 'Sem 3', carlos: 9960, ana: 9720, roberto: 8520, maria: 12800 },
    { week: 'Sem 4', carlos: 8340, ana: 7680, roberto: 5880, maria: 10200 }
  ];

  const filteredData = selectedSeller === "all" ? goalsData : goalsData.filter(s => s.id === selectedSeller);

  const getStatusBadge = (onTrack: boolean, trend: string) => {
    if (onTrack && trend === "up") {
      return <Badge className="bg-green-100 text-green-800">Acima da Meta</Badge>;
    } else if (onTrack) {
      return <Badge className="bg-blue-100 text-blue-800">No Alvo</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Abaixo da Meta</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Goals Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredData.map((seller) => (
          <Card key={seller.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{seller.name}</CardTitle>
                {getStatusBadge(seller.onTrack, seller.trend)}
              </div>
              <CardDescription>Meta mensal: R$ {seller.monthlyGoal.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progresso Mensal</span>
                  <span className="font-medium">{((seller.achieved / seller.monthlyGoal) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(seller.achieved / seller.monthlyGoal) * 100} className="h-3" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <div className="text-sm font-medium">Meta Diária</div>
                    <div className="text-xs text-muted-foreground">R$ {seller.dailyGoal.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">R$ {seller.dailyAchieved.toLocaleString()}</div>
                    <div className="flex items-center text-xs">
                      {seller.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      {seller.dailyAchieved > seller.dailyGoal ? "Acima" : "Abaixo"}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <div className="text-sm font-medium">Meta Semanal</div>
                    <div className="text-xs text-muted-foreground">R$ {seller.weeklyGoal.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600">R$ {seller.weeklyAchieved.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {((seller.weeklyAchieved / seller.weeklyGoal) * 100).toFixed(0)}% da meta
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Projeção Final</div>
                <div className="text-lg font-bold text-blue-600">R$ {seller.projectedEnd.toLocaleString()}</div>
                <div className="text-xs text-blue-700">
                  {seller.projectedEnd >= seller.monthlyGoal ? "Meta será atingida" : "Meta em risco"}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso Semanal das Metas</CardTitle>
          <CardDescription>Acompanhamento do desempenho semanal por vendedor</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Vendas']} />
              <Line type="monotone" dataKey="carlos" stroke="#3b82f6" strokeWidth={2} name="Carlos Silva" />
              <Line type="monotone" dataKey="ana" stroke="#10b981" strokeWidth={2} name="Ana Santos" />
              <Line type="monotone" dataKey="roberto" stroke="#f59e0b" strokeWidth={2} name="Roberto Lima" />
              <Line type="monotone" dataKey="maria" stroke="#8b5cf6" strokeWidth={2} name="Maria Costa" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Goals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento das Metas</CardTitle>
          <CardDescription>Análise completa do progresso de cada vendedor</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendedor</TableHead>
                <TableHead>Meta Mensal</TableHead>
                <TableHead>Realizado</TableHead>
                <TableHead>% Meta</TableHead>
                <TableHead>Meta Diária</TableHead>
                <TableHead>Hoje</TableHead>
                <TableHead>Projeção</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell className="font-medium">{seller.name}</TableCell>
                  <TableCell>R$ {seller.monthlyGoal.toLocaleString()}</TableCell>
                  <TableCell>R$ {seller.achieved.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {((seller.achieved / seller.monthlyGoal) * 100).toFixed(1)}%
                      {seller.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>R$ {seller.dailyGoal.toLocaleString()}</TableCell>
                  <TableCell className={seller.dailyAchieved >= seller.dailyGoal ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    R$ {seller.dailyAchieved.toLocaleString()}
                  </TableCell>
                  <TableCell className={seller.projectedEnd >= seller.monthlyGoal ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>
                    R$ {seller.projectedEnd.toLocaleString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(seller.onTrack, seller.trend)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellersGoals;
