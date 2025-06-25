import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Settings, Plus, Edit, Trash2, Save, Gift } from "lucide-react";

const BonusConfiguration = () => {
  const [bonuses, setBonuses] = useState([
    {
      id: 1,
      name: "Starter Pack",
      description: "Primeiras 5 vendas",
      requiredSales: 5,
      bonusValue: 50,
      period: "day",
      isActive: true,
      observations: "Bônus de incentivo para novos vendedores"
    },
    {
      id: 2,
      name: "Vendedor Ninja",
      description: "10 vendas em um dia",
      requiredSales: 10,
      bonusValue: 100,
      period: "day",
      isActive: true,
      observations: ""
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingBonus, setEditingBonus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    requiredSales: "",
    bonusValue: "",
    period: "day",
    isActive: true,
    observations: ""
  });

  const handleEdit = (bonus) => {
    setEditingBonus(bonus.id);
    setFormData({
      name: bonus.name,
      description: bonus.description,
      requiredSales: bonus.requiredSales.toString(),
      bonusValue: bonus.bonusValue.toString(),
      period: bonus.period,
      isActive: bonus.isActive,
      observations: bonus.observations
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingBonus) {
      // Update existing bonus
      setBonuses(bonuses.map(bonus => 
        bonus.id === editingBonus 
          ? {
              ...bonus,
              name: formData.name,
              description: formData.description,
              requiredSales: parseInt(formData.requiredSales),
              bonusValue: parseInt(formData.bonusValue),
              period: formData.period,
              isActive: formData.isActive,
              observations: formData.observations
            }
          : bonus
      ));
    } else {
      // Add new bonus
      const newBonus = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        requiredSales: parseInt(formData.requiredSales),
        bonusValue: parseInt(formData.bonusValue),
        period: formData.period,
        isActive: formData.isActive,
        observations: formData.observations
      };
      setBonuses([...bonuses, newBonus]);
    }
    
    setIsEditing(false);
    setEditingBonus(null);
    setFormData({
      name: "",
      description: "",
      requiredSales: "",
      bonusValue: "",
      period: "day",
      isActive: true,
      observations: ""
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingBonus(null);
    setFormData({
      name: "",
      description: "",
      requiredSales: "",
      bonusValue: "",
      period: "day",
      isActive: true,
      observations: ""
    });
  };

  const handleDelete = (bonusId) => {
    setBonuses(bonuses.filter(bonus => bonus.id !== bonusId));
  };

  const toggleBonusStatus = (bonusId) => {
    setBonuses(bonuses.map(bonus => 
      bonus.id === bonusId 
        ? { ...bonus, isActive: !bonus.isActive }
        : bonus
    ));
  };

  return (
    <div className="space-y-6">
      {/* Configuration Form */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-400" />
            {isEditing ? "Editar Bônus" : "Configurar Novo Bônus"}
          </CardTitle>
          <CardDescription className="text-slate-300">
            Configure metas e recompensas para motivar sua equipe
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nome do Bônus
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Vendedor do Mês"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Descrição
              </label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Ex: Melhor vendedor do mês"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Quantidade Mínima de Vendas
              </label>
              <Input
                type="number"
                value={formData.requiredSales}
                onChange={(e) => setFormData({...formData, requiredSales: e.target.value})}
                placeholder="Ex: 10"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Valor do Bônus (R$)
              </label>
              <Input
                type="number"
                value={formData.bonusValue}
                onChange={(e) => setFormData({...formData, bonusValue: e.target.value})}
                placeholder="Ex: 100"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Período Válido
            </label>
            <ToggleGroup 
              type="single" 
              value={formData.period}
              onValueChange={(value) => value && setFormData({...formData, period: value})}
              className="bg-slate-700 p-1 rounded-lg"
            >
              <ToggleGroupItem value="day" className="text-white">
                Diário
              </ToggleGroupItem>
              <ToggleGroupItem value="week" className="text-white">
                Semanal
              </ToggleGroupItem>
              <ToggleGroupItem value="month" className="text-white">
                Mensal
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Observações
            </label>
            <Textarea
              value={formData.observations}
              onChange={(e) => setFormData({...formData, observations: e.target.value})}
              placeholder="Ex: Bônus especial de sexta-feira"
              className="bg-slate-700 border-slate-600 text-white"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
            />
            <span className="text-slate-300">Bônus ativo</span>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? "Salvar Alterações" : "Criar Bônus"}
            </Button>
            {isEditing && (
              <Button onClick={handleCancel} variant="outline" className="border-slate-600 text-slate-300">
                Cancelar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Existing Bonuses */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Gift className="h-5 w-5 text-purple-400" />
            Bônus Configurados
          </CardTitle>
          <CardDescription className="text-slate-300">
            Gerencie os bônus ativos e inativos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bonuses.map((bonus) => (
              <div key={bonus.id} className={`p-4 rounded-lg border transition-all ${
                bonus.isActive 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-slate-800/50 border-slate-700 opacity-60"
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-white">{bonus.name}</h4>
                    <Badge variant={bonus.isActive ? "default" : "outline"} 
                           className={bonus.isActive ? "bg-green-600" : "border-slate-500"}>
                      {bonus.isActive ? "Ativo" : "Inativo"}
                    </Badge>
                    <Badge variant="outline" className="border-slate-500 capitalize">
                      {bonus.period === "day" ? "Diário" : bonus.period === "week" ? "Semanal" : "Mensal"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={bonus.isActive}
                      onCheckedChange={() => toggleBonusStatus(bonus.id)}
                    />
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEdit(bonus)}
                      className="border-slate-600 text-slate-300"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDelete(bonus.id)}
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-2">{bonus.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>Meta: {bonus.requiredSales} vendas</span>
                  <span>Bônus: R$ {bonus.bonusValue}</span>
                </div>
                
                {bonus.observations && (
                  <div className="mt-2 p-2 bg-slate-700 rounded text-sm text-slate-300">
                    <strong>Observação:</strong> {bonus.observations}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BonusConfiguration;
