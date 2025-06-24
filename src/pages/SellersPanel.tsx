
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import SellersOverview from "@/components/sellers/SellersOverview";
import OrdersTracking from "@/components/sellers/OrdersTracking";
import SellersGoals from "@/components/sellers/SellersGoals";
import { Users, Target, Package, TrendingUp } from "lucide-react";

const SellersPanel = () => {
  const [selectedSeller, setSelectedSeller] = useState("all");

  const sellers = [
    { id: "all", name: "Todos os Vendedores" },
    { id: "carlos", name: "Carlos Silva" },
    { id: "ana", name: "Ana Santos" },
    { id: "roberto", name: "Roberto Lima" },
    { id: "maria", name: "Maria Costa" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Painel de Vendedores</h1>
            <p className="text-slate-600 text-lg">Acompanhe metas, pedidos e entregas em tempo real</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {sellers.map((seller) => (
              <Badge 
                key={seller.id}
                variant={selectedSeller === seller.id ? "default" : "outline"}
                className="cursor-pointer px-3 py-1"
                onClick={() => setSelectedSeller(seller.id)}
              >
                {seller.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main Panel Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Metas
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <SellersOverview selectedSeller={selectedSeller} />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6 mt-6">
            <SellersGoals selectedSeller={selectedSeller} />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6 mt-6">
            <OrdersTracking selectedSeller={selectedSeller} />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Detalhada</CardTitle>
                <CardDescription>Análise completa de performance por vendedor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Relatórios detalhados de performance em desenvolvimento
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellersPanel;
