import type { EstadoSecao } from '../dados';
import { SecaoPortfolio } from '../SecaoPortfolio';

type ContatoSecaoProps = {
    estado: EstadoSecao;
};

const contatos = [
    { label: 'E-mail', valor: 'contato@nihillabs.com.br', href: 'mailto:contato@nihillabs.com.br' },
    { label: 'Operação', valor: 'Remoto / Brasil', href: null },
    { label: 'Resposta', valor: 'Até 1 dia útil', href: null },
];

const etapas = ['Diagnóstico', 'Proposta técnica', 'Execução'];

export function ContatoSecao({ estado }: ContatoSecaoProps) {
    return (
        <SecaoPortfolio id="s4" estado={estado} classeFundo="bg-[#0d0d0a]">
            <div className="relative z-2 grid h-full w-[92%] max-w-285 grid-rows-[auto_1fr_auto] gap-6 px-1 py-18 sm:py-20">
                <div className="flex items-end justify-between gap-8 border-b border-[#e8e0d0]/10 pb-5">
                    <div>
                        <div className="font-mono text-[9px] font-light tracking-[0.45em] text-[#f0c15a] uppercase">
                            Contato comercial
                        </div>
                        <h2 className="mt-3 max-w-210 text-[clamp(2.5rem,8vw,6.2rem)] leading-[0.96] font-black tracking-[-0.02em] text-[#e8e0d0]">
                            Vamos estruturar seu próximo produto digital.
                        </h2>
                    </div>

                    <div className="hidden font-mono text-[10px] tracking-[0.35em] text-[#e8e0d0]/25 uppercase md:block">
                        New business
                    </div>
                </div>

                <div className="grid min-h-0 gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
                    <div className="flex flex-col justify-between border border-[#e8e0d0]/10 bg-[#080806]/65 p-5 sm:p-7">
                        <div>
                            <p className="max-w-130 text-[13px] leading-7 font-light text-[#a9a193] sm:text-[15px] sm:leading-8">
                                Conte o contexto, o objetivo e o estágio atual do projeto. A partir
                                disso, retornamos com uma leitura técnica clara e próximos passos.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="mailto:contato@nihillabs.com.br"
                                    className="border border-[#f0c15a] bg-[#f0c15a] px-6 py-3.5 text-center text-[9px] font-semibold tracking-[0.28em] text-[#080806] uppercase shadow-[0_0_28px_rgba(240,193,90,0.18)] transition-colors duration-300 hover:bg-transparent hover:text-[#f0c15a]"
                                >
                                    Iniciar projeto
                                </a>
                                <a
                                    href="https://www.linkedin.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="border border-[#f0c15a]/25 px-6 py-3.5 text-center text-[9px] font-medium tracking-[0.28em] text-[#f3d18a] uppercase transition-colors duration-300 hover:border-[#f0c15a] hover:text-[#f0c15a]"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-px bg-[#e8e0d0]/10 sm:grid-cols-3">
                            {etapas.map((etapa, indice) => (
                                <div key={etapa} className="bg-[#080806] px-4 py-3">
                                    <div className="font-mono text-[8px] tracking-[0.24em] text-[#777066]">
                                        {String(indice + 1).padStart(2, '0')}
                                    </div>
                                    <div className="mt-1 text-[11px] font-medium tracking-[0.08em] text-[#f3d18a] uppercase">
                                        {etapa}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-px bg-[#e8e0d0]/10">
                        {contatos.map((contato) => (
                            <div
                                key={contato.label}
                                className="grid bg-[#0d0d0a] p-5 sm:grid-cols-[0.35fr_1fr] sm:items-center sm:p-6"
                            >
                                <div className="font-mono text-[9px] tracking-[0.32em] text-[#f0c15a] uppercase">
                                    {contato.label}
                                </div>
                                {contato.href ? (
                                    <a
                                        href={contato.href}
                                        className="mt-2 break-all text-[18px] font-light tracking-[-0.01em] text-[#e8e0d0] transition-colors duration-300 hover:text-[#f0c15a] sm:mt-0 sm:text-[clamp(1.25rem,3vw,2.45rem)]"
                                    >
                                        {contato.valor}
                                    </a>
                                ) : (
                                    <div className="mt-2 text-[18px] font-light tracking-[-0.01em] text-[#e8e0d0] sm:mt-0 sm:text-[clamp(1.25rem,3vw,2.45rem)]">
                                        {contato.valor}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-[#e8e0d0]/10 pt-5 font-mono text-[9px] tracking-[0.28em] text-[#777066] uppercase">
                    NIHIL LABS · Technology & Innovation · Est. 2024
                </div>
            </div>
        </SecaoPortfolio>
    );
}
