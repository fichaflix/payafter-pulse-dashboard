
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Package, Truck, CreditCard, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface OrdersTrackingProps {
  selectedSeller: string;
}

const OrdersTracking = ({ selectedSeller }: OrdersTrackingProps) => {
  const [statusFilter, setStatusFilter] = useState("all");

  const ordersData = [
    {
      id: "PED001",
      seller: "carlos",
      sellerName: "Carlos Silva",
      customer: "João Silva",
      value: 299.90,
      status: "in_transit",
      createdAt: "2024-01-15",
      expectedDelivery: "2024-01-18",
      paymentStatus: "pending"
    },
    {
      id: "PED002",
      seller: "ana",
      sellerName: "Ana Santos",
      customer: "Maria Costa",
      value: 450.00,
      status: "pending_payment",
      createdAt: "2024-01-14",
      expectedDelivery: "2024-01-19",
      paymentStatus: "pending"
    },
    {
      id: "PED003",
      seller: "carlos",
      sellerName: "Carlos Silva",
      customer: "Pedro Santos",
      value: 180.50,
      status: "paid",
      createdAt: "2024-01-13",
      expectedDelivery: "2024-01-17",
      paymentStatus: "paid"
    },
    {
      id: "PED004",
      seller: "roberto",
      sellerName: "Roberto Lima",
      customer: "Ana Oliveira",
      value: 320.00,
      status: "in_transit",
      createdAt: "2024-01-16",
      expectedDelivery: "2024-01-20",
      paymentStatus: "pending"
    },
    {
      id: "PED005",
      seller: "maria",
      sellerName: "Maria Costa",
      customer: "Carlos Ferreira",
      value: 520.90,
      status: "paid",
      createdAt: "2024-01-12",
      expectedDelivery: "2024-01-16",
      paymentStatus: "paid"
    },
    {
      id: "PED006",
      seller: "ana",
      sellerName: "Ana Santos",
      customer: "Lucas Silva",
      value: 280.00,
      status: "pending_payment",
      createdAt: "2024-01-17",
      expectedDelivery: "2024-01-21",
      paymentStatus: "pending"
    }
  ];

  const filteredOrders = selectedSeller === "all" 
    ? ordersData 
    : ordersData.filter(order => order.seller === selectedSeller);

  const statusFilteredOrders = statusFilter === "all"
    ? filteredOrders
    : filteredOrders.filter(order => order.status === statusFilter);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "in_transit":
        return { 
          label: "Em Trânsito", 
          color: "bg-yellow-100 text-yellow-800", 
          icon: <Truck className="h-4 w-4" /> 
        };
      case "pending_payment":
        return { 
          label: "Falta Pagar", 
          color: "bg-red-100 text-red-800", 
          icon: <AlertTriangle className="h-4 w-4" /> 
        };
      case "paid":
        return { 
          label: "Pedido Pago", 
          color: "bg-green-100 text-green-800", 
          icon: <CheckCircle2 className="h-4 w-4" /> 
        };
      default:
        return { 
          label: "Desconhecido", 
          color: "bg-gray-100 text-gray-800", 
          icon: <Package className="h-4 w-4" /> 
        };
    }
  };

  const statusCounts = {
    in_transit: filteredOrders.filter(o => o.status === "in_transit").length,
    pending_payment: filteredOrders.filter(o => o.status === "pending_payment").length,
    paid: filteredOrders.filter(o => o.status === "paid").length
  };

  const chartData = [
    { name: 'Em Trânsito', value: statusCounts.in_transit, color: '#f59e0b' },
    { name: 'Falta Pagar', value: statusCounts.pending_payment, color: '#ef4444' },
    { name: 'Pedido Pago', value: statusCounts.paid, color: '#10b981' }
  ];

  const totalValue = {
    in_transit: filteredOrders.filter(o => o.status === "in_transit").reduce((sum, o) => sum + o.value, 0),
    pending_payment: filteredOrders.filter(o => o.status === "pending_payment").reduce((sum, o) => sum + o.value, 0),
    paid: filteredOrders.filter(o => o.status === "paid").reduce((sum, o) => sum + o.value, 0)
  };

  return (
    <div className="space-y-6">
      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Em Trânsito</CardTitle>
            <Truck className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.in_transit}</div>
            <div className="text-xs opacity-90 mt-1">
              R$ {totalValue.in_transit.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Falta Pagar</CardTitle>
            <AlertTriangle className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.pending_payment}</div>
            <div className="text-xs opacity-90 mt-1">
              R$ {totalValue.pending_payment.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Pedido Pago</CardTitle>
            <CheckCircle2 className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.paid}</div>
            <div className="text-xs opacity-90 mt-1">
              R$ {totalValue.paid.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Status Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição dos Pedidos</CardTitle>
            <CardDescription>Status dos pedidos por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros Rápidos</CardTitle>
            <CardDescription>Filtre pedidos por status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Badge 
                variant={statusFilter === "all" ? "default" : "outline"}
                className="cursor-pointer justify-center p-2"
                onClick={() => setStatusFilter("all")}
              >
                Todos ({filteredOrders.length})
              </Badge>
              <Badge 
                variant={statusFilter === "in_transit" ? "default" : "outline"}
                className="cursor-pointer justify-center p-2"
                onClick={() => setStatusFilter("in_transit")}
              >
                Em Trânsito ({statusCounts.in_transit})
              </Badge>
              <Badge 
                variant={statusFilter === "pending_payment" ? "default" : "outline"}
                className="cursor-pointer justify-center p-2"
                onClick={() => setStatusFilter("pending_payment")}
              >
                Falta Pagar ({statusCounts.pending_payment})
              </Badge>
              <Badge 
                variant={statusFilter === "paid" ? "default" : "outline"}
                className="cursor-pointer justify-center p-2"
                onClick={() => setStatusFilter("paid")}
              >
                Pagos ({statusCounts.paid})
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes dos Pedidos</CardTitle>
          <CardDescription>
            Lista completa de pedidos {statusFilter !== "all" && `com status: ${getStatusInfo(statusFilter).label}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Pedido</TableHead>
                <TableHead>Entrega Prevista</TableHead>
                <TableHead>Pagamento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statusFilteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.sellerName}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="font-medium text-green-600">
                      R$ {order.value.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusInfo.color}>
                        <div className="flex items-center gap-1">
                          {statusInfo.icon}
                          {statusInfo.label}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{new Date(order.expectedDelivery).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Badge variant={order.paymentStatus === "paid" ? "default" : "outline"}>
                        {order.paymentStatus === "paid" ? "Pago" : "Pendente"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersTracking;
