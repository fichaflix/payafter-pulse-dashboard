
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import OverviewSection from "@/components/dashboard/OverviewSection";
import SalesAnalysis from "@/components/dashboard/SalesAnalysis";
import PaymentControl from "@/components/dashboard/PaymentControl";
import OperationMetrics from "@/components/dashboard/OperationMetrics";
import IntegrationStatus from "@/components/dashboard/IntegrationStatus";
import { CalendarDays, TrendingUp, Users, CreditCard, BarChart3, Zap, UserCheck, Trophy } from "lucide-react";

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Dashboard Pay After</h1>
            <p className="text-slate-600 text-lg">Controle completo da operação em tempo real</p>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <Link to="/vendedores">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserCheck className="h-4 w-4 mr-2" />
                Painel Vendedores
              </Button>
            </Link>
            <Link to="/gamificacao">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                <Trophy className="h-4 w-4 mr-2" />
                Gamificação PRO
              </Button>
            </Link>
            <div className="flex gap-2">
              {["today", "week", "month"].map((period) => (
                <Badge 
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1 capitalize"
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period === "today" ? "Hoje" : period === "week" ? "Semana" : "Mês"}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Vendedores
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Pagamentos
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Métricas
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Integrações
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Agenda
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <OverviewSection selectedPeriod={selectedPeriod} />
          </TabsContent>

          <TabsContent value="sales" className="space-y-6 mt-6">
            <SalesAnalysis selectedPeriod={selectedPeriod} />
          </TabsContent>

          <TabsContent value="payments" className="space-y-6 mt-6">
            <PaymentControl selectedPeriod={selectedPeriod} />
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6 mt-6">
            <OperationMetrics selectedPeriod={selectedPeriod} />
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6 mt-6">
            <IntegrationStatus />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Valores Agendados</CardTitle>
                <CardDescription>Previsão de pagamentos por período</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Próximos 7 dias</h3>
                    <p className="text-3xl font-bold text-blue-600">R$ 45.280,00</p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Próximas 4 semanas</h3>
                    <p className="text-3xl font-bold text-green-600">R$ 180.540,00</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Próximos 3 meses</h3>
                    <p className="text-3xl font-bold text-purple-600">R$ 650.720,00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
