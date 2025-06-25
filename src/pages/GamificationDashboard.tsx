
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import SalesRanking from "@/components/gamification/SalesRanking";
import BonusPanel from "@/components/gamification/BonusPanel";
import BonusConfiguration from "@/components/gamification/BonusConfiguration";
import ExtraRankings from "@/components/gamification/ExtraRankings";
import { Trophy, Gift, Settings, Star, Target, Zap } from "lucide-react";

const GamificationDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Pay After PRO
              </h1>
              <p className="text-slate-300 text-lg">Dashboard de Gamificação da Equipe de Vendas</p>
            </div>
          </div>
          <div className="flex gap-2">
            {["today", "week", "month"].map((period) => (
              <Badge 
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 capitalize transition-all ${
                  selectedPeriod === period 
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg" 
                    : "border-slate-600 text-slate-300 hover:bg-slate-700"
                }`}
                onClick={() => setSelectedPeriod(period)}
              >
                {period === "today" ? "Hoje" : period === "week" ? "Semana" : "Mês"}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="ranking" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-slate-700">
            <TabsTrigger 
              value="ranking" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              <Trophy className="h-4 w-4" />
              Ranking
            </TabsTrigger>
            <TabsTrigger 
              value="bonus" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              <Gift className="h-4 w-4" />
              Bônus
            </TabsTrigger>
            <TabsTrigger 
              value="config" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              Configuração
            </TabsTrigger>
            <TabsTrigger 
              value="extras" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              <Star className="h-4 w-4" />
              Extras
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ranking" className="space-y-6 mt-6">
            <SalesRanking selectedPeriod={selectedPeriod} />
          </TabsContent>

          <TabsContent value="bonus" className="space-y-6 mt-6">
            <BonusPanel selectedPeriod={selectedPeriod} />
          </TabsContent>

          <TabsContent value="config" className="space-y-6 mt-6">
            <BonusConfiguration />
          </TabsContent>

          <TabsContent value="extras" className="space-y-6 mt-6">
            <ExtraRankings selectedPeriod={selectedPeriod} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GamificationDashboard;
