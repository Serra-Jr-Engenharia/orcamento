import React, {useState} from "react";
import Card from "../../components/Card/index.tsx";
import type { Tab } from "../../components/Card/index.tsx";
import Header from "../../components/Header/index.tsx";

interface Selections {
  [key: string]: any;
}

const Computacao: React.FC = () => {
  
  const [selections, setSelections] = useState<Selections>({});
  const [totals, setTotals] = useState<Record<string, number>>({
    Site: 0,
    Aplicativo: 0,
  });

  const tabs: Tab[] = [
    {
      name: "Site",

      fields: [
        {label: "Pág. Front-end (Básico)", type: "select", options: ["0", "1","2", "3", "4", "5", "6", "7", "8", "9", "10"], key: "basico"},
        {label: "Pág. Front-end (Intermediário)", type: "select", options: ["0", "1","2", "3", "4", "5", "6", "7", "8", "9", "10"], key: "intermediario"},
        {label: "Pág. Front-end (Avançado)", type: "select", options: ["0", "1","2", "3", "4", "5", "6", "7", "8", "9", "10"], key: "avancado"},
        {label: "Back-end: Rota Simples", type: "select", options: ["Extremamente Simples","Básico", "Intermediário", "Complexo"], key: "backendSite"},
        {label: "Back-end: Rota Complexa", type: "select", options: ["Básico", "Intermediário", "Complexo"], key: "complexaSite"},
        {label: "Autenticação", type: "select", options: ["Extremamente Simples","Básico", "Intermediário", "Complexo"], key: "autentificacaoSite"},
        {label: "Integração API", type: "select", options: ["Extremamente Simples","Básico", "Intermediário", "Complexo"], key: "IntegracaoSite"},
        {label: "Banco de dados", type: "select", options: ["Extremamente Simples","Básico", "Intermediário", "Complexo"], key: "BdSite"},
        {label: "Dashboard/Admin (CMS)", type: "select", options: ["Extremamente Simples","Básico", "Intermediário", "Complexo"], key: "DashboardSite"},
        {label: "E-commerce", type: "select", options: ["Produtos estáticos, carrinho sem login obrigatório e checkout simulado","Integração de uma API de pagamento, controle básico de estoque e painel admin para adicionar/editar produtos", "Checkout completo, sistema de frete e recursos extras(cupons, wishlist, histórico, notificações por email...)"], key: "EcommerceSite"},
        {label: "Idiomas", type: "select", options: ["1","2","3", "4", "5"], key: "IdiomasSite"},
        {label: "Design(por página)", type: "select", options: ["1","2", "3", "4", "5", "6", "7", "8", "9", "10"], key: "DesignSite"},
        {label: "Manutenção", type: "select", options: ["1 mês","2 meses", "3 meses","4 meses", "5 meses","6 meses", "7 meses", "8 meses", "9 meses","10 meses"], key: "ManutencaoSite"},
        {label: "Suporte/Treinamento", type: "select", options: ["1 mês","2 meses", "3 meses","4 meses", "5 meses","6 meses", "7 meses", "8 meses", "9 meses","10 meses"], key: "SuporteSite"},
        {label: "Membros", type: "select", options: ["1","2", "3", "4", "5", "6", "7", "8", "9", "10"], key: "MembrosSite"},
      
      ],
    },
    {
      name: "Aplicativo",

      fields: [
       {label: "Pág. Front-end (Básico)", type: "select", options: ["0", "1","2", "3", "4", "5", "6", "7", "8", "9", "10"], key: "appbasico"},
        {label: "Pág. Front-end (Intermediário)", type: "select", options: ["0", "1","2", "3", "4", "5", "6", "7", "8", "9", "10"], key: "appintermediario"},
        {label: "Pág. Front-end (Avançado)", type: "select", options: ["0", "1","2", "3", "4", "5", "6", "7", "8", "9", "10"], key: "appavancado"},
        {label: "Autenticação", type: "select", options: ["Extremamente Simples","Básico", "Intermediário", "Complexo"], key: "autentificacaoAplicativo"},
        {label: "Integração API", type: "select", options: ["Extremamente Simples","Básico", "Intermediário", "Complexo"], key: "IntegracaoAplicativo"},
        {label: "Banco de dados", type: "select", options: ["Extremamente Simples","Básico", "Intermediário", "Complexo"], key: "BdAplicativo"},
        {label: "Dashboard/Admin (CMS)", type: "select", options: ["Extremamente Simples","Básico", "Intermediário", "Complexo"], key: "DashboardAplicativo"},
        {label: "E-commerce", type: "select", options: ["Produtos estáticos, carrinho sem login obrigatório e checkout simulado","Integração de uma API de pagamento, controle básico de estoque e painel admin para adicionar/editar produtos", "Checkout completo, sistema de frete e recursos extras(cupons, wishlist, histórico, notificações por email...)"], key: "EcommerceApp"},
        {label: "Idiomas", type: "select", options: ["1","2", "3","4", "5","6", "7", "8", "9","10"], key: "IdiomasAplicativo"},
        {label: "Design(por página)", type: "select", options: ["1","2", "3", "4", "5", "6", "7", "8", "9", "10"], key: "DesignAplicativo"},
        {label: "Publicação nas lojas", type: "radio", options: ["Sim","Não"], key: "PublicacaoAplicativo"},
        {label: "Funcionalidade extra", type: "radio", options: ["Sim","Não"], key: "ExtraAplicativo"},
        {label: "Manutenção", type: "select", options: ["1 mês","2 meses", "3 meses","4 meses", "5 meses","6 meses", "7 meses", "8 meses", "9 meses","10 meses"], key: "EcommerceAplicativo"},
        {label: "Suporte/Treinamento", type: "select", options: ["1 mês","2 meses", "3 meses","4 meses", "5 meses","6 meses", "7 meses", "8 meses", "9 meses","10 meses"], key: "SuporteAplicativo"},
        {label: "Membros", type: "select", options: ["1","2", "3","4", "5","6", "7", "8", "9","10"], key: "MembrosAplicativo"},
      

      ],
    },
  ];


  const complexityMultipliers: Record<string, number> = {
    "Extremamente Simples": 1,
    "Básico": 2,
    "Intermediário": 3,
    "Complexo": 4,
  };

  const complexityBasePrices: Record<string, number> = {
      
      backendSite: 150,
      complexaSite: 350,
      autentificacaoSite: 400,
      IntegracaoSite: 425,
      BdSite: 300,
      DashboardSite: 500,

      frontendAplicativo: 150,
      backendAplicativo: 200,
      complexaAplicativo: 450,
      autentificacaoAplicativo: 350,
      IntegracaoAplicativo: 450,
      BdAplicativo: 375,
      DashboardAplicativo: 600,
  };

  const numericMultipliers: Record<string, number> = {
    "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "1 mês": 1, "2 meses": 2, "3 meses": 3, "4 meses": 4, "5 meses": 5, "6 meses": 6,
    "7 meses": 7, "8 meses": 8, "9 meses": 9, "10 meses": 10
  };

  const numericBasePrices: Record<string, number> = {
    IdiomasSite: 300, DesignSite: 200, ManutencaoSite: 200, SuporteSite: 250, MembrosSite: 50,
    IdiomasAplicativo: 300, DesignAplicativo: 250, ManutencaoAplicativo: 400,
    SuporteAplicativo: 350, MembrosAplicativo: 75,basico: 200,
    intermediario: 300, avancado: 400, appbasico: 300, appintermediario: 450, appavancado: 600,
  };

  const uniquePriceTables: Record<string, Record<string, number>> = {
    EcommerceSite: {
      "Produtos estáticos, carrinho sem login obrigatório e checkout simulado": 1200,
      "Integração de uma API de pagamento, controle básico de estoque e painel admin para adicionar/editar produtos": 1800,
      "Checkout completo, sistema de frete e recursos extras(cupons, wishlist, histórico, notificações por email...)": 2400,
    },
    EcommerceApp: {
      "Produtos estáticos, carrinho sem login obrigatório e checkout simulado": 1500,
      "Integração de uma API de pagamento, controle básico de estoque e painel admin para adicionar/editar produtos": 2250,
      "Checkout completo, sistema de frete e recursos extras(cupons, wishlist, histórico, notificações por email...)": 2400,
    },
    HospedagemSite: {
      "Sim": 0, "Não": 0,
    },
    DomínioSite: {
      "Sim": 0, "Não": 0,
    },
    PublicacaoAplicativo: {
      "Sim": 600, "Não": 0,
    },
    ExtraAplicativo: {
      "Sim": 500, "Não": 0,
    },
  };

  const generatedPriceTable: Record<string, Record<string, number>> = {};
  tabs.forEach(tab => {
    tab.fields.forEach(field => {
      if (field.type === 'select' && field.options) {
        if (complexityBasePrices[field.key]) {
          generatedPriceTable[field.key] = {};
          field.options.forEach(option => {
            if (complexityMultipliers[option]) {
              generatedPriceTable[field.key][option] = complexityBasePrices[field.key] * complexityMultipliers[option];
            }
          });
        } else if (numericBasePrices[field.key]) {
          generatedPriceTable[field.key] = {};
          field.options.forEach(option => {
            if (numericMultipliers[option]) {
              generatedPriceTable[field.key][option] = numericBasePrices[field.key] * numericMultipliers[option];
            }
          });
        }
      }
    });
  });

  const priceTable: Record<string, Record<string, number>> = {
    ...generatedPriceTable,
    ...uniquePriceTables,
  };

  const calcTotals = (newSelection: Selections) => {
    const newTotals: Record<string, number> = {}

    tabs.forEach(tab => {
      let tabTotal = 0;
      const tabKeys = tab.fields.map(field => field.key);

      for (const [key, value] of Object.entries(newSelection)) {
        if (tabKeys.includes(key) && priceTable[key] && priceTable[key][value]) {
          tabTotal += priceTable[key][value];
        }
    }

    newTotals[tab.name] = tabTotal;
    });

    setTotals(newTotals);
  }

  const handleChange = (key: string, value: any) => {
    const newSelection = {...selections, [key]: value};
    setSelections(newSelection);
    calcTotals(newSelection);
  }

  
  return (
    <div className="w-full min-h-screen flex items-center flex-col bg-gray-100">
      <Header title="Computação"></Header>
      <Card tabs={tabs} selections={selections} handleChange={handleChange} totals={totals} priceTable={priceTable} />
    </div>
  );
}

export default Computacao;