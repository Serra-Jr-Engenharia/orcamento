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
        {
          label: "Pág. Front-end (Básico)", type: "select", options: numOpts20, key: "pagFrontendBasico",
          descriptions: {
            "O que é": "É o 'panfleto digital'. São páginas estáticas e simples, como a página 'Quem Somos' ou uma página de contato básica. A informação está lá, mas não muda sozinha."
          }
        },
        {
          label: "Pág. Front-end (Intermediário)", type: "select", options: numOpts20, key: "pagFrontendIntermediario",
          descriptions: {
            "O que é": "São páginas que interagem com o usuário. Imagine formulários com várias etapas, barras de pesquisa que filtram resultados na hora e calculadoras simples."
          }
        },
        {
          label: "Pág. Front-end (Avançado)", type: "select", options: numOpts20, key: "pagFrontendAvancado",
          descriptions: {
            "O que é": "É aqui que a 'mágica' acontece. São telas complexas de aplicativos, como painéis cheios de gráficos financeiros, atualizações em tempo real (como o preço do Uber mudando na tela) e animações visuais fluidas. Dá muito trabalho porque o navegador do usuário tem que processar muitas informações ao mesmo tempo sem travar."
          }
        },
        {
          label: "Design UI/UX (por página)", type: "select", options: numOpts20, key: "designUIUX",
          descriptions: {
            "A Planta da Casa e Decoração (UI/UX)": "É o trabalho visual e estratégico feito no Figma (wireframes, cores, layout). Sem código programado, apenas o desenho estático.",
            "Diferença para Front-end (A Construção)": "Enquanto o UI/UX desenha as telas, o Front-end as programa em código. Se você já tem as telas desenhadas pelo seu designer, esse item não é cobrado. Se precisamos criar a identidade do zero, os dois itens são cobrados."
          }
        },
        {label: "Idiomas Adicionais", type: "select", options: numOpts5, key: "idiomasAdicionais"},
        
        {label: "Rotas Back-end (Simples)", type: "select", options: ["Nenhum", "1 a 3 rotas", "4 a 10 rotas", "Mais de 10 rotas"], key: "rotasSimples"},
        {
          label: "Rotas Back-end (Complexas)", type: "select", options: ["Nenhum", "Básico", "Intermediário", "Complexo"], key: "rotasComplexas",
          descriptions: {
            "Básico": "Rotinas simples executadas no servidor.",
            "Intermediário": "Envio de e-mails, validações em lote.",
            "Complexo": "Processamento pesado, background jobs, websockets (ex: cálculos estruturais)."
          }
        },
        {
          label: "Autenticação", type: "select", options: ["Nenhuma", "Básica (JWT/Firebase)", "Intermediária (OAuth/Google)", "Complexa (Níveis de Acesso ACL/RBAC, 2FA)"], key: "autenticacao",
          descriptions: {
            "Básica (JWT/Firebase)": "Login clássico por e-mail e senha.",
            "Intermediária (OAuth/Google)": "Acesso rápido com contas do Google, Apple ou redes sociais.",
            "Complexa (Níveis de Acesso ACL/RBAC, 2FA)": "Sistema robusto de perfis (Admin, Cliente) e login em duas etapas."
          }
        },
        {
          label: "Banco de Dados", type: "select", options: ["Nenhum", "Básico (1-3 Entidades)", "Intermediário (Relacionamentos Complexos)", "Avançado (Banco Distribuído, Cache, Triggers)"], key: "bancoDados",
          descriptions: {
            "Básico (1-3 Entidades)": "Apenas armazenamento elementar (ex: usuários e posts).",
            "Intermediário (Relacionamentos Complexos)": "Múltiplas tabelas interligadas (ex: orçamentos, produtos e histórico).",
            "Avançado (Banco Distribuído, Cache, Triggers)": "Arquitetura para milhões de dados e alta performance (cache/sharding)."
          }
        },
        {
          label: "Integração de APIs Externas", type: "select", options: ["Nenhuma", "Simples (1 API)", "Intermediária (2-3 APIs)", "Complexa (Múltiplas APIs, Webhooks, Sincronização)"], key: "integracaoAPI",
          descriptions: {
            "Simples (1 API)": "Consulta de dados externos rápidos (ex: cotação de moedas/CEP).",
            "Intermediária (2-3 APIs)": "Integração com serviços como envio de WhatsApp ou mapas.",
            "Complexa (Múltiplas APIs, Webhooks, Sincronização)": "Conexão bidirecional profunda (ex: sincronização em tempo real com seu ERP e Conta Azul)."
          }
        },
        {
          label: "Dashboard / Admin CMS", type: "select", options: ["Nenhum", "Simples", "Completo (Gráficos, Gestão Total)"], key: "dashboardCMS",
          descriptions: {
            "Simples": "Painel para edições rápidas de texto e listas.",
            "Completo (Gráficos, Gestão Total)": "Sistema administrativo completo com relatórios, gráficos e controle de acessos."
          }
        },

        {
          label: "Integração de IA (LLMs)", type: "select", options: ["Nenhuma", "Uso Simples (Prompt Básico via API)", "Intermediária (Agentes com Memória)", "Avançada (Prova de Conceito - PoC RAG/Fine-Tuning)"], key: "integracaoIA",
          descriptions: {
            "Uso Simples (Prompt Básico via API)": "Conexão direta com ChatGPT para gerar textos estáticos.",
            "Intermediária (Agentes com Memória)": "Bots interativos que lembram do contexto da conversa atual.",
            "Avançada (Prova de Conceito - PoC RAG/Fine-Tuning)": "IA especialista que consome PDFs e dados internos da sua empresa para dar respostas precisas."
          }
        },
        {
          label: "Chatbots Automatizados", type: "select", options: ["Nenhum", "Fluxo Estático", "Bot com IA Integrada", "Bot Multicanal (WhatsApp/Insta/Site)"], key: "chatbot",
          descriptions: {
            "Fluxo Estático": "Bot tradicional de menu com opções numéricas.",
            "Bot com IA Integrada": "Atendente virtual inteligente que compreende a digitação livre do cliente.",
            "Bot Multicanal (WhatsApp/Insta/Site)": "Centralização completa de atendimento em várias redes simultâneas."
          }
        },
        {
          label: "Automação (Web Scraping / RPA)", type: "select", options: ["Nenhuma", "Extração Simples de 1 site", "Extração Contínua/Agendada", "Scraping Complexo c/ Quebra de Captcha e Múltiplas Fontes"], key: "automacaoRPA",
          descriptions: {
            "Extração Simples de 1 site": "Coleta de dados pontual de páginas abertas (ex: copiar catálogo de concorrente).",
            "Extração Contínua/Agendada": "Robô que roda diariamente para monitorar preços ou estoques.",
            "Scraping Complexo c/ Quebra de Captcha e Múltiplas Fontes": "Simulação de humanos para burlar bloqueios de segurança avançados."
          }
        },

        {
          label: "Recursos de E-commerce", type: "select", options: ["Nenhum", "Catálogo sem pagamento", "Pagamento (Stripe/MercadoPago) e Carrinho", "Completo (Frete Correios, Cupons, Estoque, Notas Fiscais)"], key: "ecommerce",
          descriptions: {
            "Catálogo sem pagamento": "Vitrine online de produtos apenas para visualização/orçamentos.",
            "Pagamento (Stripe/MercadoPago) e Carrinho": "Vendas diretas com carrinho e checkout de cartão/Pix.",
            "Completo (Frete Correios, Cupons, Estoque, Notas Fiscais)": "Loja virtual absoluta com cálculo de Correios, cupons promocionais e baixa de estoque."
          }
        },

        {
          label: "Arquitetura & Deploy", type: "select", options: ["Nenhum", "Hospedagem Simples (Vercel/Render)", "Configuração Cloud (AWS/GCP/Docker)"], key: "arquiteturaDeploy",
          descriptions: {
            "Hospedagem Simples (Vercel/Render)": "Servidores compartilhados rápidos, ideais para tráfego normal.",
            "Configuração Cloud (AWS/GCP/Docker)": "Infraestrutura dedicada de alto nível para escalabilidade, segurança e picos de acesso."
          }
        },

        
        {
          label: "Tempo de Execução do Projeto (meses)", type: "select", options: numOpts12, key: "tempoExecucaoMensal",
          descriptions: {
            "Custo Operacional": "Garante a manutenção dos servidores de teste e o gerenciamento do projeto durante os meses em que ele está sendo construído."
          }
        },
        {label: "Membros Alocados no Projeto", type: "select", options: numOpts10, key: "membrosAlocados"},
      ],
    }
  ];

  const uniquePriceTables: Record<string, Record<string, number>> = {
    rotasSimples: { "Nenhum": 0, "1 a 3 rotas": 300, "4 a 10 rotas": 800, "Mais de 10 rotas": 1500 },
    rotasComplexas: { "Nenhum": 0, "Básico": 400, "Intermediário": 2500, "Complexo": 5400 },
    autenticacao: { "Nenhuma": 0, "Básica (JWT/Firebase)": 300, "Intermediária (OAuth/Google)": 500, "Complexa (Níveis de Acesso ACL/RBAC, 2FA)": 2500 },
    bancoDados: { "Nenhum": 0, "Básico (1-3 Entidades)": 300, "Intermediário (Relacionamentos Complexos)": 1500, "Avançado (Banco Distribuído, Cache, Triggers)": 4500 },
    integracaoAPI: { "Nenhuma": 0, "Simples (1 API)": 400, "Intermediária (2-3 APIs)": 800, "Complexa (Múltiplas APIs, Webhooks, Sincronização)": 4000 },
    dashboardCMS: { "Nenhum": 0, "Simples": 500, "Completo (Gráficos, Gestão Total)": 3500 },
    integracaoIA: { "Nenhuma": 0, "Uso Simples (Prompt Básico via API)": 600, "Intermediária (Agentes com Memória)": 1200, "Avançada (Prova de Conceito - PoC RAG/Fine-Tuning)": 5000 },
    chatbot: { "Nenhum": 0, "Fluxo Estático": 500, "Bot com IA Integrada": 1200, "Bot Multicanal (WhatsApp/Insta/Site)": 2000 },
    automacaoRPA: { "Nenhuma": 0, "Extração Simples de 1 site": 500, "Extração Contínua/Agendada": 1000, "Scraping Complexo c/ Quebra de Captcha e Múltiplas Fontes": 4500 },
    ecommerce: { "Nenhum": 0, "Catálogo sem pagamento": 1000, "Pagamento (Stripe/MercadoPago) e Carrinho": 4500, "Completo (Frete Correios, Cupons, Estoque, Notas Fiscais)": 12000 },
    arquiteturaDeploy: { "Nenhum": 0, "Hospedagem Simples (Vercel/Render)": 150, "Configuração Cloud (AWS/GCP/Docker)": 800 },
  };

  const numericMultipliers: Record<string, number> = {};
  for (let i = 0; i <= 20; i++) numericMultipliers[String(i)] = i;

  const numericBasePrices: Record<string, number> = {
    pagFrontendBasico: 120,
    pagFrontendIntermediario: 300,
    pagFrontendAvancado: 900,
    designUIUX: 150,
    idiomasAdicionais: 600,
    tempoExecucaoMensal: 250,
    membrosAlocados: 400,
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