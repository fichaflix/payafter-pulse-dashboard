
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gift, CheckCircle2, Clock, Star, Zap, Target } from "lucide-react";

interface BonusPanelProps {
  selectedPeriod: string;
}

const BonusPanel = ({ selectedPeriod }: BonusPanelProps) => {
  const bonusData = [
    {
      id: 1,
      name: "Starter Pack",
      description: "Primeiras 5 vendas",
      requiredSales: 5,
      bonusValue: 50,
      period: "day",
      isActive: true
    },
    {
      id: 2,
      name: "Vendedor Ninja",
      description: "10 vendas em um dia",
      requiredSales: 10,
      bonusValue: 100,
      period: "day",
      isActive: true
    },
    {
      id: 3,
      name: "Máquina de Vendas",
      description: "50 vendas na semana",
      requiredSales: 50,
      bonusValue: 300,
      period: "week",
      isActive: true
    },
    {
      id: 4,
      name: "Lenda das Vendas",
      description: "200 vendas no mês",
      requiredSales: 200,
      bonusValue: 1000,
      period: "month",
      isActive: true
    }
  ];

  const sellerBonusProgress = [
    {
      sellerId: 1,
      sellerName: "Carlos Silva",
      bonuses: [
        { bonusId: 1, currentSales: 7, unlocked: true, unlockedAt: "2024-01-15" },
        { bonusId: 2, currentSales: 7, unlocked: false, unlockedAt: null },
        { bonusId: 3, currentSales: 42, unlocked: false, unlockedAt: null },
        { bonusId: 4, currentSales: 142, unlocked: false, unlockedAt: null }
      ]
    },
    {
      sellerId: 2,
      sellerName: "Ana Santos",
      bonuses: [
        { bonusId: 1, currentSales: 8, unlocked: true, unlockedAt: "2024-01-14" },
        { bonusId: 2, currentSales: 8, unlocked: false, unlockedAt: null },
        { bonusId: 3, currentSales: 38, unlocked: false, unlockedAt: null },
        { bonusId: 4, currentSales: 128, unlocked: false, unlockedAt: null }
      ]
    }
  ];

  const getBonusIcon = (bonusId: number) => {
    switch (bonusId) {
      case 1:
        return <Star className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Zap className="h-5 w-5 text-purple-400" />;
      case 3:
        return <Target className="h-5 w-5 text-blue-400" />;
      case 4:
        return <Gift className="h-5 w-5 text-pink-400" />;
      default:
        return <Gift className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Available Bonuses */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Gift className="h-5 w-5 text-purple-400" />
            Bônus Disponíveis
          </CardTitle>
          <CardDescription className="text-slate-300">
            Metas e recompensas por período
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bonusData.map((bonus) => (
              <div key={bonus.id} className="p-4 bg-slate-700/50 border border-slate-600 rounded-lg hover:bg-slate-700 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  {getBonusIcon(bonus.id)}
                  <h4 className="font-semibold text-white">{bonus.name}</h4>
                </div>
                <p className="text-sm text-slate-300 mb-3">{bonus.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Meta:</span>
                    <Badge variant="outline" className="border-slate-500">
                      {bonus.requiredSales} vendas
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Bônus:</span>
                    <span className="font-bold text-green-400">R$ {bonus.bonusValue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Período:</span>
                    <Badge variant="outline" className="border-slate-500 capitalize">
                      {bonus.period === "day" ? "Diário" : bonus.period === "week" ? "Semanal" : "Mensal"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seller Progress */}
      <div className="space-y-4">
        {sellerBonusProgress.map((seller) => (
          <Card key={seller.sellerId} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">{seller.sellerName}</CardTitle>
              <CardDescription className="text-slate-300">
                Progresso dos bônus disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {seller.bonuses.map((progress) => {
                  const bonus = bonusData.find(b => b.id === progress.bonusId);
                  if (!bonus) return null;
                  
                  const progressPercentage = (progress.currentSales / bonus.requiredSales) * 100;
                  const isUnlocked = progress.unlocked;
                  const isNearUnlock = progressPercentage >= 80 && !isUnlocked;
                  
                  return (
                    <div key={progress.bonusId} className={`p-4 rounded-lg border transition-all ${
                      isUnlocked 
                        ? "bg-green-500/20 border-green-500/50" 
                        : isNearUnlock 
                        ? "bg-yellow-500/20 border-yellow-500/50 animate-pulse"
                        : "bg-slate-700/50 border-slate-600"
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getBonusIcon(progress.bonusId)}
                          <span className="font-semibold text-white">{bonus.name}</span>
                        </div>
                        {isUnlocked && (
                          <div className="flex items-center gap-1 text-green-400">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-xs">Desbloqueado!</span>
                          </div>
                        )}
                        {isNearUnlock && (
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Clock className="h-4 w-4" />
                            <span className="text-xs">Quase lá!</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">
                            {progress.currentSales} / {bonus.requiredSales} vendas
                          </span>
                          <span className="text-slate-300">
                            {Math.min(progressPercentage, 100).toFixed(0)}%
                          </span>
                        </div>
                        <Progress 
                          value={Math.min(progressPercentage, 100)} 
                          className={`h-2 ${isUnlocked ? "bg-green-900" : "bg-slate-600"}`}
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">
                            Faltam {Math.max(0, bonus.requiredSales - progress.currentSales)} vendas
                          </span>
                          <span className="text-xs font-bold text-green-400">
                            +R$ {bonus.bonusValue}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BonusPanel;
