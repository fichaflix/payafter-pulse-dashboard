
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle2, Clock, AlertCircle, DollarSign } from "lucide-react";

interface PaymentControlProps {
  selectedPeriod: string;
}

const PaymentControl = ({ selectedPeriod }: PaymentControlProps) => {
  // Mock payment data
  const paymentStats = {
    approved: 245600,
    pending: 87300,
    processing: 32100,
    rejected: 8900
  };

  const recentPayments = [
    { id: 'PAY001', seller: 'Carlos Silva', amount: 2500, status: 'approved', date: '2024-01-15', customer: 'João Santos' },
    { id: 'PAY002', seller: 'Ana Santos', amount: 1800, status: 'pending', date: '2024-01-15', customer: 'Maria Lima' },
    { id: 'PAY003', seller: 'Roberto Lima', amount: 3200, status: 'processing', date: '2024-01-14', customer: 'Pedro Costa' },
    { id: 'PAY004', seller: 'Maria Costa', amount: 1950, status: 'approved', date: '2024-01-14', customer: 'Ana Silva' },
    { id: 'PAY005', seller: 'Carlos Silva', amount: 4100, status: 'rejected', date: '2024-01-13', customer: 'Lucas Oliveira' },
  ];

  const paymentHistory = [
    { date: '10/01', approved: 18500, pending: 12300, processing: 8900 },
    { date: '11/01', approved: 22100, pending: 15600, processing: 10200 },
    { date: '12/01', approved: 19800, pending: 11400, processing: 7800 },
    { date: '13/01', approved: 25300, pending: 18700, processing: 12100 },
    { date: '14/01', approved: 28900, pending: 16200, processing: 9500 },
    { date: '15/01', approved: 31200, pending: 19800, processing: 11300 },
  ];

  const pieData = [
    { name: 'Aprovados', value: paymentStats.approved, color: '#10b981' },
    { name: 'Pendentes', value: paymentStats.pending, color: '#f59e0b' },
    { name: 'Processando', value: paymentStats.processing, color: '#3b82f6' },
    { name: 'Rejeitados', value: paymentStats.rejected, color: '#ef4444' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case 'processing': return <Badge className="bg-blue-100 text-blue-800">Processando</Badge>;
      case 'rejected': return <Badge className="bg-red-100 text-red-800">Rejeitado</Badge>;
      default: return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processing': return <DollarSign className="h-4 w-4 text-blue-500" />;
      case 'rejected': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Pagamentos Aprovados</CardTitle>
            <CheckCircle2 className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {paymentStats.approved.toLocaleString()}</div>
            <div className="text-xs opacity-90 mt-1">✓ Processados com sucesso</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Pagamentos Pendentes</CardTitle>
            <Clock className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {paymentStats.pending.toLocaleString()}</div>
            <div className="text-xs opacity-90 mt-1">⏳ Aguardando aprovação</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Em Processamento</CardTitle>
            <DollarSign className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {paymentStats.processing.toLocaleString()}</div>
            <div className="text-xs opacity-90 mt-1">🔄 Sendo processados</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Pagamentos Rejeitados</CardTitle>
            <AlertCircle className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {paymentStats.rejected.toLocaleString()}</div>
            <div className="text-xs opacity-90 mt-1">❌ Requer atenção</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Payment History Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pagamentos</CardTitle>
            <CardDescription>Evolução dos pagamentos por status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={paymentHistory}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`R$ ${value.toLocaleString()}`, '']}
                />
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="processing" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Pagamentos</CardTitle>
            <CardDescription>Status atual dos pagamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pagamentos Recentes</CardTitle>
          <CardDescription>Últimas transações processadas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pagamento</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.seller}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell className="font-bold">R$ {payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      {getStatusBadge(payment.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {payment.status === 'pending' && (
                        <>
                          <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Aprovar
                          </button>
                          <button className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            Rejeitar
                          </button>
                        </>
                      )}
                      <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Detalhes
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentControl;
