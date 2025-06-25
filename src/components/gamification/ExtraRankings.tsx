
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, Calendar, CreditCard, TrendingDown, Clock, CheckCircle } from "lucide-react";

interface ExtraRankingsProps {
  selectedPeriod: string;
}

const ExtraRankings = ({ selectedPeriod }: ExtraRankingsProps) => {
  const extraRankingsData = {
    leastChargebacks: [
      { name: "Maria Costa", avatar: "/placeholder.svg", chargebackRate: 0.8, totalSales: 35 },
      { name: "Ana Santos", avatar: "/placeholder.svg", chargebackRate: 1.2, totalSales: 42 },
      { name: "Carlos Silva", avatar: "/placeholder.svg", chargebackRate: 1.5, totalSales: 47 },
      { name: "João Oliveira", avatar: "/placeholder.svg", chargebackRate: 2.1, totalSales: 32 },
      { name: "Roberto Lima", avatar: "/placeholder.svg", chargebackRate: 2.8, totalSales: 38 }
    ],
    mostScheduled: [
      { name: "Carlos Silva", avatar: "/placeholder.svg", scheduledOrders: 28, totalSales: 47 },
      { name: "Ana Santos", avatar: "/placeholder.svg", scheduledOrders: 25, totalSales: 42 },
      { name: "Roberto Lima", avatar: "/placeholder.svg", scheduledOrders: 22, totalSales: 38 },
      { name: "Maria Costa", avatar: "/placeholder.svg", scheduledOrders: 19, totalSales: 35 },
      { name: "João Oliveira", avatar: "/placeholder.svg", scheduledOrders: 18, totalSales: 32 }
    ],
    mostPaidOrders: [
      { name: "Maria Costa", avatar: "/placeholder.svg", paidOrders: 32, totalSales: 35, paymentRate: 91.4 },
      { name: "Carlos Silva", avatar: "/placeholder.svg", paidOrders: 41, totalSales: 47, paymentRate: 87.2 },
      { name: "Ana Santos", avatar: "/placeholder.svg", paidOrders: 36, totalSales: 42, paymentRate: 85.7 },
      { name: "João Oliveira", avatar: "/placeholder.svg", paidOrders: 26, totalSales: 32, paymentRate: 81.2 },
      { name: "Roberto Lima", avatar: "/placeholder.svg", paidOrders: 30, totalSales: 38, paymentRate: 78.9 }
    ]
  };

  const RankingCard = ({ title, description, data, icon, metricKey, metricLabel, metricColor }) => (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription className="text-slate-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((seller, index) => (
            <div key={seller.name} className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
              index === 0 
                ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50" 
                : "bg-slate-700/50 hover:bg-slate-700"
            }`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index === 0 
                  ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                  : index === 1 
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500" 
                  : index === 2
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : "bg-slate-600"
              }`}>
                <span className="text-white font-bold text-sm">#{index + 1}</span>
              </div>
              
              <Avatar className="h-10 w-10">
                <AvatarImage src={seller.avatar} />
                <AvatarFallback className="bg-slate-600 text-white">
                  {seller.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h4 className="font-semibold text-white">{seller.name}</h4>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span>{seller.totalSales} vendas totais</span>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-lg font-bold ${metricColor}`}>
                  {typeof seller[metricKey] === 'number' && metricKey.includes('Rate') 
                    ? `${seller[metricKey]}%` 
                    : metricKey.includes('Rate') && metricKey !== 'chargebackRate'
                    ? `${seller[metricKey]}%`
                    : metricKey === 'chargebackRate'
                    ? `${seller[metricKey]}%`
                    : seller[metricKey]
                  }
                </div>
                <div className="text-xs text-slate-400">{metricLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <RankingCard
          title="Menor Taxa de Calote"
          description="Vendedores com menor índice de inadimplência"
          data={extraRankingsData.leastChargebacks}
          icon={<Shield className="h-5 w-5 text-green-400" />}
          metricKey="chargebackRate"
          metricLabel="Taxa de calote"
          metricColor="text-green-400"
        />

        <RankingCard
          title="Mais Agendados"
          description="Vendedores com mais pedidos agendados"
          data={extraRankingsData.mostScheduled}
          icon={<Calendar className="h-5 w-5 text-blue-400" />}
          metricKey="scheduledOrders"
          metricLabel="Pedidos agendados"
          metricColor="text-blue-400"
        />

        <RankingCard
          title="Mais Pedidos Pagos"
          description="Vendedores com maior taxa de pagamento"
          data={extraRankingsData.mostPaidOrders}
          icon={<CreditCard className="h-5 w-5 text-purple-400" />}
          metricKey="paymentRate"
          metricLabel="Taxa de pagamento"
          metricColor="text-purple-400"
        />
      </div>

      {/* Performance Summary */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-yellow-400" />
            Resumo de Performance Extra
          </CardTitle>
          <CardDescription className="text-slate-300">
            Métricas complementares de qualidade de vendas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-green-400 mb-1">Menor Calote</h3>
              <p className="text-2xl font-bold text-white">Maria Costa</p>
              <p className="text-sm text-green-300">0.8% de inadimplência</p>
            </div>
            
            <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-blue-400 mb-1">Mais Agendamentos</h3>
              <p className="text-2xl font-bold text-white">Carlos Silva</p>
              <p className="text-sm text-blue-300">28 pedidos agendados</p>
            </div>
            
            <div className="text-center p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
              <CheckCircle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-purple-400 mb-1">Melhor Pagamento</h3>
              <p className="text-2xl font-bold text-white">Maria Costa</p>
              <p className="text-sm text-purple-300">91.4% de taxa de pagamento</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExtraRankings;
