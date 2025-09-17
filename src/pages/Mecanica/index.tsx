import React, { useState } from "react";
import Card from "../../components/Card/index.tsx";
import type { Tab } from "../../components/Card/index.tsx";
import Header from "../../components/Header/index.tsx";

interface Selections {
  [key: string]: string | string[];
}

const Mecanica: React.FC = () => { 
  const [totals, setTotals] = useState<Record<string, number>>({
    "Mão de Obra": 0,
    "Prototipagem": 0,
  });
  const [selections, setSelections] = useState<Selections>({});

  const tabs: Tab[] = [
    {
      name: "Mão de Obra",
      fields: [
        { label: "Desenho Técnico", type: "multiselect", options: ["Vistas ortogonais básicas de uma peça simples", "Desenho com cortes e cotas para fabricação", "Conjuntos com detalhes de montagem", "Projetos com normas técnicas, materiais e tolerâncias específicas"], key: "desenhoTecnico"},
        { label: "Modelagem 3D", type: "multiselect", options: ["Peças geométricas simples, sem encaixes", "Componentes com furos, encaixes e pequenas tolerâncias", "Conjuntos com movimentação ou múltiplas peças interligadas", "Modelagem complexa com montagem e simulação de funcionamento"], key: "modelagem3d"},
        { label: "Automação", type: "multiselect", options: ["Ajustes simples de sensores ou atuadores já existentes", "Programação básica com arduíno", "Integração de sensores e motores com controle lógico"], key: "automacao" },
        { label: "Reparos e Manutenções", type: "multiselect", options: ["Inspeção e reaperto de componentes", "Troca de peças simples", "Substituição e alinhamento de componentes mecânicos", "Reparo com desmontagem parcial e diagnóstico"], key: "reparos" },
        { label: "Análises Estruturais", type: "multiselect", options: ["Verificação manual simples", "Cálculo de esforços em vigas ou suportes", "Simulação em software com cargas estáticas", "Análise FEM com múltiplos cenários e otimização"], key: "analiseEstrutural" },
      ],
    },
    {
      name: "Prototipagem",
      fields: [
        { label: "Desenho Técnico", type: "multiselect", options: ["Esboço técnico de apoio ao protótipo", "Documento para fabricação simples", "Modelos funcionais com acabamento", "Desenho técnico final com revisão de projeto"], key: "desenhoTecnicoProto" },
        { label: "Modelagem 3D", type: "multiselect", options: ["Impressão de modelo simples", "Peça com encaixes e precisão razoável", "Conjuntos com movimentação ou múltiplas peças interligadas", "Protótipo completo com múltiplas peças e testes"], key: "modelagem3dProto" },
        { label: "Automação", type: "multiselect", options: ["Ligação básica de sensor e atuador", "Protótipo funcional com controle básico", "Integração com interface ou controle remoto", "Protótipo de sistema automatizado com validação"], key: "automacaoProto" },
        { label: "Análises Estruturais", type: "multiselect", options: ["Análise visual/empírica", "Teste com pesos controlados", "Medição de deformações", "Validação com sensores e software"], key: "analiseEstruturalProto" },
      ],
    },
  ];

  const priceTable: Record<string, Record<string, number>> = {
    desenhoTecnico: {
      "Vistas ortogonais básicas de uma peça simples": 100,
      "Desenho com cortes e cotas para fabricação": 200,
      "Conjuntos com detalhes de montagem": 300,
      "Projetos com normas técnicas, materiais e tolerâncias específicas": 400,
    },
    modelagem3d: {
      "Peças geométricas simples, sem encaixes": 190,
      "Componentes com furos, encaixes e pequenas tolerâncias": 380,
      "Conjuntos com movimentação ou múltiplas peças interligadas": 570,
      "Modelagem complexa com montagem e simulação de funcionamento": 760,
    },
    automacao: {
      "Ajustes simples de sensores ou atuadores já existentes": 900,
      "Programação básica com arduíno": 1200,
      "Integração de sensores e motores com controle lógico": 1800,
    },
    reparos: {
      "Inspeção e reaperto de componentes": 625,
      "Troca de peças simples": 1250,
      "Substituição e alinhamento de componentes mecânicos": 1875,
      "Reparo com desmontagem parcial e diagnóstico": 2500,
    },
    analiseEstrutural: {
      "Verificação manual simples": 110,
      "Cálculo de esforços em vigas ou suportes": 220,
      "Simulação em software com cargas estáticas": 330,
      "Análise FEM com múltiplos cenários e otimização": 440,
    },
    desenhoTecnicoProto: {
      "Esboço técnico de apoio ao protótipo": 200,
      "Documento para fabricação simples": 400,
      "Modelos funcionais com acabamento": 600,
      "Desenho técnico final com revisão de projeto": 800,
    },
    modelagem3dProto: {
      "Impressão de modelo simples": 40,
      "Peça com encaixes e precisão razoável": 80,
      "Conjuntos com movimentação ou múltiplas peças interligadas": 120,
      "Protótipo completo com múltiplas peças e testes": 160,
    },
    automacaoProto: {
      "Ligação básica de sensor e atuador": 75,
      "Protótipo funcional com controle básico": 150,
      "Integração com interface ou controle remoto": 225,
      "Protótipo de sistema automatizado com validação": 300,
    },
    analiseEstruturalProto: {
      "Análise visual/empírica": 450,
      "Teste com pesos controlados": 900,
      "Medição de deformações": 1350,
      "Validação com sensores e software": 1800,
    },
  };

  const calcTotals = (newSelection: Selections) => {
    const newTotals: Record<string, number> = {};

    tabs.forEach(tab => {
      let tabTotal = 0;
      const tabKeys = tab.fields.map(field => field.key);

      for (const [key, value] of Object.entries(newSelection)) {
        if (tabKeys.includes(key) && priceTable[key]) {
          if (Array.isArray(value)) {
            value.forEach(v => {
              if (priceTable[key][v]) {
                tabTotal += priceTable[key][v];
              }
            });
          } else {
            if (priceTable[key][value]) {
              tabTotal += priceTable[key][value];
            }
          }
        }
      }

      newTotals[tab.name] = tabTotal;
    });

    setTotals(newTotals);
  };

  const handleChange = (key: string, value: string | string[]) => {
  const newSelections = {
    ...selections,
    [key]: value,
  };

  setSelections(newSelections);
  calcTotals(newSelections);
};

  return (
    <div className="w-full min-h-screen flex items-center flex-col bg-gray-100">
      <Header title="Mecânica" />

      <Card
        tabs={tabs}
        selections={selections}
        handleChange={handleChange}
        totals={totals}
        priceTable={priceTable}
      />
    </div>
  );
};

export default Mecanica;