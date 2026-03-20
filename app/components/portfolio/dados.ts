export const nomesSecoes = ['Hero', 'Sobre', 'Serviços', 'Projetos', 'Contato'] as const;

export type EstadoSecao = 'ativa' | 'entrando' | 'saindo' | 'oculta';

type Servico = {
    numero: string;
    titulo: string;
    descricao: string;
};

type Projeto = {
    numero: string;
    nome: string;
    subtitulo: string;
    tags: string[];
    ano: string;
};

export const servicos: Servico[] = [
    {
        numero: '01',
        titulo: 'Desenvolvimento de Software',
        descricao: 'Sistemas web e mobile robustos, escaláveis e de alta performance.',
    },
    {
        numero: '02',
        titulo: 'Inteligência Artificial',
        descricao: 'Automação inteligente, modelos preditivos e LLMs aplicados ao negócio.',
    },
    {
        numero: '03',
        titulo: 'Cloud & Infraestrutura',
        descricao: 'Arquitetura em nuvem, DevOps e sistemas de alta disponibilidade.',
    },
    {
        numero: '04',
        titulo: 'Data Engineering',
        descricao: 'Pipelines de dados, analytics e dashboards para decisões em tempo real.',
    },
    {
        numero: '05',
        titulo: 'Segurança Digital',
        descricao: 'Pentest, auditorias e compliance para proteger seus ativos digitais.',
    },
    {
        numero: '06',
        titulo: 'Consultoria Tech',
        descricao: 'Estratégia tecnológica, arquitetura de sistemas e roadmap de produto.',
    },
];

export const projetos: Projeto[] = [
    {
        numero: '001',
        nome: 'Nexus Platform',
        subtitulo: 'Plataforma SaaS B2B',
        tags: ['AI', 'React'],
        ano: '2024',
    },
    {
        numero: '002',
        nome: 'Vórtex Analytics',
        subtitulo: 'Dashboard de dados em tempo real',
        tags: ['Data', 'Cloud'],
        ano: '2024',
    },
    {
        numero: '003',
        nome: 'Cipher Security',
        subtitulo: 'Monitoramento e resposta a incidentes',
        tags: ['Security', 'API'],
        ano: '2025',
    },
    {
        numero: '004',
        nome: 'Aether Infra',
        subtitulo: 'Migração e arquitetura cloud-native',
        tags: ['AWS', 'DevOps'],
        ano: '2025',
    },
];
