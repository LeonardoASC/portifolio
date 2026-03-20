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
        numero: '003',
        nome: 'Portal Institucional',
        subtitulo: 'Portal institucional moderno com foco em presença digital, comunicação pública e experiência do usuário',
        tags: ['Next.js', 'React', 'Tailwind', 'UI/UX'],
        ano: '2026',
    },
    {
        numero: '001',
        nome: 'QRFOODS',
        subtitulo: 'Plataforma web para restaurantes com foco em gestão digital, pedidos e operação SaaS multi-tenant',
        tags: ['Laravel', 'React', 'SaaS', 'Multi-tenant'],
        ano: '2025',
    },
    {
        numero: '002',
        nome: 'Dentora',
        subtitulo: 'SaaS para clínicas odontológicas com agenda, prontuário, anamnese, chat e odontograma interativo',
        tags: ['Laravel', 'React', 'Inertia', 'PostgreSQL'],
        ano: '2026',
    },
    {
        numero: '004',
        nome: 'Sistema de Estacionamento',
        subtitulo: 'Sistema de controle de entrada e saída de veículos com impressão de comprovante, OCR e dashboard operacional',
        tags: ['Laravel', 'React', 'OCR', 'Dashboard'],
        ano: '2025',
    },
    {
        numero: '005',
        nome: 'Sistema de Atendimento',
        subtitulo: 'Solução de atendimento com emissão de senhas, autoatendimento e acompanhamento de filas em tempo real',
        tags: ['Laravel', 'React', 'API', 'Tempo Real'],
        ano: '2025',
    },
    {
        numero: '007',
        nome: 'Chat Corporativo',
        subtitulo: 'Módulo de comunicação interna para interação entre usuários, suporte e colaboração em ambiente organizacional',
        tags: ['Chat', 'Laravel', 'React', 'Realtime'],
        ano: '2026',
    },
];
