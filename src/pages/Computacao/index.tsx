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
    "Desenvolvimento": 0,
  });

  const numOpts20 = Array.from({length: 21}, (_, i) => String(i));
  const numOpts12 = Array.from({length: 13}, (_, i) => String(i));
  const numOpts10 = Array.from({length: 11}, (_, i) => String(i));
  const numOpts5 = Array.from({length: 6}, (_, i) => String(i));

  const tabs: Tab[] = [
    {
      name: "Desenvolvimento",
      fields: [
        {label: "Pág. Front-end (Básico)", type: "select", options: numOpts20, key: "pagFrontendBasico"},
        {label: "Pág. Front-end (Intermediário)", type: "select", options: numOpts20, key: "pagFrontendIntermediario"},
        {label: "Pág. Front-end (Avançado)", type: "select", options: numOpts20, key: "pagFrontendAvancado"},
        {label: "Design UI/UX (por página)", type: "select", options: numOpts20, key: "designUIUX"},
        {label: "Idiomas Adicionais", type: "select", options: numOpts5, key: "idiomasAdicionais"},
        
        {label: "Rotas Back-end (Simples)", type: "select", options: ["Nenhum", "1 a 3 rotas", "4 a 10 rotas", "Mais de 10 rotas"], key: "rotasSimples"},
        {label: "Rotas Back-end (Complexas)", type: "select", options: ["Nenhum", "Básico", "Intermediário", "Complexo"], key: "rotasComplexas"},
        {label: "Autenticação", type: "select", options: ["Nenhuma", "Básica (JWT/Firebase)", "Intermediária (OAuth/Google)", "Complexa (Níveis de Acesso ACL/RBAC, 2FA)"], key: "autenticacao"},
        {label: "Banco de Dados", type: "select", options: ["Nenhum", "Básico (1-3 Entidades)", "Intermediário (Relacionamentos Complexos)", "Avançado (Banco Distribuído, Cache, Triggers)"], key: "bancoDados"},
        {label: "Integração de APIs Externas", type: "select", options: ["Nenhuma", "Simples (1 API)", "Intermediária (2-3 APIs)", "Complexa (Múltiplas APIs, Webhooks, Sincronização)"], key: "integracaoAPI"},
        {label: "Dashboard / Admin CMS", type: "select", options: ["Nenhum", "Simples", "Completo (Gráficos, Gestão Total)"], key: "dashboardCMS"},

        {label: "Integração de IA (LLMs)", type: "select", options: ["Nenhuma", "Uso Simples (Prompt Básico via API)", "Intermediária (Agentes com Memória)", "Avançada (RAG, Fine-Tuning, Contexto Próprio)"], key: "integracaoIA"},
        {label: "Chatbots Automatizados", type: "select", options: ["Nenhum", "Fluxo Estático", "Bot com IA Integrada", "Bot Multicanal (WhatsApp/Insta/Site)"], key: "chatbot"},
        {label: "Automação (Web Scraping / RPA)", type: "select", options: ["Nenhuma", "Extração Simples de 1 site", "Extração Contínua/Agendada", "Scraping Complexo c/ Quebra de Captcha e Múltiplas Fontes"], key: "automacaoRPA"},

        {label: "Recursos de E-commerce", type: "select", options: ["Nenhum", "Catálogo sem pagamento", "Pagamento (Stripe/MercadoPago) e Carrinho", "Completo (Frete Correios, Cupons, Estoque, Notas Fiscais)"], key: "ecommerce"},

        {label: "Arquitetura & Deploy", type: "select", options: ["Nenhum", "Hospedagem Simples (Vercel/Render)", "Configuração Cloud (AWS/GCP/Docker)"], key: "arquiteturaDeploy"},
        {label: "Tecnologia / Stack Utilizada", type: "select", options: ["Indiferente", "MERN / Next.js", "Python / Django / FastAPI"], key: "stackTecnologica"},
        
        {label: "Manutenção (Mensal)", type: "select", options: numOpts12, key: "manutencaoMensal"},
        {label: "Membros Alocados no Projeto", type: "select", options: numOpts10, key: "membrosAlocados"},
      ],
    }
  ];

  const uniquePriceTables: Record<string, Record<string, number>> = {
    rotasSimples: { "Nenhum": 0, "1 a 3 rotas": 300, "4 a 10 rotas": 800, "Mais de 10 rotas": 1500 },
    rotasComplexas: { "Nenhum": 0, "Básico": 400, "Intermediário": 900, "Complexo": 1800 },
    autenticacao: { "Nenhuma": 0, "Básica (JWT/Firebase)": 300, "Intermediária (OAuth/Google)": 500, "Complexa (Níveis de Acesso ACL/RBAC, 2FA)": 900 },
    bancoDados: { "Nenhum": 0, "Básico (1-3 Entidades)": 300, "Intermediário (Relacionamentos Complexos)": 700, "Avançado (Banco Distribuído, Cache, Triggers)": 1200 },
    integracaoAPI: { "Nenhuma": 0, "Simples (1 API)": 400, "Intermediária (2-3 APIs)": 800, "Complexa (Múltiplas APIs, Webhooks, Sincronização)": 1500 },
    dashboardCMS: { "Nenhum": 0, "Simples": 500, "Completo (Gráficos, Gestão Total)": 1200 },
    integracaoIA: { "Nenhuma": 0, "Uso Simples (Prompt Básico via API)": 600, "Intermediária (Agentes com Memória)": 1200, "Avançada (RAG, Fine-Tuning, Contexto Próprio)": 2500 },
    chatbot: { "Nenhum": 0, "Fluxo Estático": 500, "Bot com IA Integrada": 1200, "Bot Multicanal (WhatsApp/Insta/Site)": 2000 },
    automacaoRPA: { "Nenhuma": 0, "Extração Simples de 1 site": 500, "Extração Contínua/Agendada": 1000, "Scraping Complexo c/ Quebra de Captcha e Múltiplas Fontes": 2200 },
    ecommerce: { "Nenhum": 0, "Catálogo sem pagamento": 1000, "Pagamento (Stripe/MercadoPago) e Carrinho": 1800, "Completo (Frete Correios, Cupons, Estoque, Notas Fiscais)": 3500 },
    arquiteturaDeploy: { "Nenhum": 0, "Hospedagem Simples (Vercel/Render)": 150, "Configuração Cloud (AWS/GCP/Docker)": 800 },
    stackTecnologica: { "Indiferente": 0, "MERN / Next.js": 0, "Python / Django / FastAPI": 0 },
  };

  const numericMultipliers: Record<string, number> = {};
  for (let i = 0; i <= 20; i++) numericMultipliers[String(i)] = i;

  const numericBasePrices: Record<string, number> = {
    pagFrontendBasico: 120,
    pagFrontendIntermediario: 250,
    pagFrontendAvancado: 450,
    designUIUX: 150,
    idiomasAdicionais: 300,
    manutencaoMensal: 250,
    membrosAlocados: 100,
  };

  const generatedPriceTable: Record<string, Record<string, number>> = {};
  tabs.forEach(tab => {
    tab.fields.forEach(field => {
      if (field.type === 'select' && field.options) {
        if (numericBasePrices[field.key]) {
          generatedPriceTable[field.key] = {};
          field.options.forEach(option => {
            if (numericMultipliers[option] !== undefined) {
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