
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown, Medal, Star, TrendingUp, DollarSign } from "lucide-react";

interface SalesRankingProps {
  selectedPeriod: string;
}

const SalesRanking = ({ selectedPeriod }: SalesRankingProps) => {
  const salesData = [
    {
      id: 1,
      name: "Carlos Silva",
      avatar: "/placeholder.svg",
      totalSales: 47,
      totalValue: 142500,
      goal: 50,
      goalProgress: 94,
      isTopPerformer: true
    },
    {
      id: 2,
      name: "Ana Santos",
      avatar: "/placeholder.svg",
      totalSales: 42,
      totalValue: 126000,
      goal: 45,
      goalProgress: 93.3
    },
    {
      id: 3,
      name: "Roberto Lima",
      avatar: "/placeholder.svg",
      totalSales: 38,
      totalValue: 114000,
      goal: 40,
      goalProgress: 95
    },
    {
      id: 4,
      name: "Maria Costa",
      avatar: "/placeholder.svg",
      totalSales: 35,
      totalValue: 105000,
      goal: 40,
      goalProgress: 87.5
    },
    {
      id: 5,
      name: "João Oliveira",
      avatar: "/placeholder.svg",
      totalSales: 32,
      totalValue: 96000,
      goal: 35,
      goalProgress: 91.4
    }
  ];

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <Star className="h-6 w-6 text-slate-500" />;
    }
  };

  const getRankBackground = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-600";
      case 3:
        return "bg-gradient-to-r from-amber-500 to-amber-700";
      default:
        return "bg-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Performer Highlight */}
      <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 border-none text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse" />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-yellow-200" />
              <div>
                <CardTitle className="text-2xl">🏆 Top Performer do {selectedPeriod === "today" ? "Dia" : selectedPeriod === "week" ? "Semana" : "Mês"}</CardTitle>
                <CardDescription className="text-yellow-100">Líder em vendas</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{salesData[0].totalSales}</div>
              <div className="text-sm text-yellow-100">vendas</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-yellow-200">
              <AvatarImage src={salesData[0].avatar} />
              <AvatarFallback className="bg-yellow-600 text-white text-xl font-bold">
                {salesData[0].name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-yellow-100">{salesData[0].name}</h3>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-semibold">R$ {salesData[0].totalValue.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>{salesData[0].goalProgress.toFixed(1)}% da meta</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Ranking */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Ranking de Vendas
          </CardTitle>
          <CardDescription className="text-slate-300">
            Classificação por {selectedPeriod === "today" ? "dia" : selectedPeriod === "week" ? "semana" : "mês"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {salesData.map((seller, index) => (
            <div key={seller.id} className={`p-4 rounded-lg border transition-all hover:scale-105 ${
              index === 0 
                ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50" 
                : "bg-slate-700/50 border-slate-600 hover:bg-slate-700"
            }`}>
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getRankBackground(index + 1)}`}>
                  <span className="text-white font-bold text-lg">#{index + 1}</span>
                </div>
                
                <Avatar className="h-12 w-12">
                  <AvatarImage src={seller.avatar} />
                  <AvatarFallback className="bg-slate-600 text-white">
                    {seller.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white">{seller.name}</h4>
                    {index < 3 && getRankIcon(index + 1)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-300">
                    <span>{seller.totalSales} vendas</span>
                    <span>R$ {seller.totalValue.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-right min-w-[120px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-slate-300">Meta:</span>
                    <Badge variant={seller.goalProgress >= 100 ? "default" : "outline"} 
                           className={seller.goalProgress >= 100 ? "bg-green-600" : "border-slate-500"}>
                      {seller.goalProgress.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="w-full">
                    <Progress 
                      value={seller.goalProgress} 
                      className="h-2 bg-slate-600"
                    />
                    <div className="text-xs text-slate-400 mt-1">
                      {seller.totalSales}/{seller.goal} vendas
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesRanking;
