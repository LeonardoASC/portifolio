import type { EstadoSecao } from '../dados';
import { SecaoPortfolio } from '../SecaoPortfolio';

type SobreSecaoProps = {
    estado: EstadoSecao;
};

const metricas = [
    { numero: '40+', label: 'Projetos entregues' },
    { numero: '98%', label: 'Satisfação média' },
    { numero: '12+', label: 'Especialistas parceiros' },
];

const pilares = ['Estratégia', 'Produto', 'Engenharia', 'Operação'];

export function SobreSecao({ estado }: SobreSecaoProps) {
    return (
        <SecaoPortfolio id="s1" estado={estado} classeFundo="bg-[#0d0d0a]" cantos={['tl', 'br']}>
            <div className="relative z-2 grid h-full w-[92%] max-w-285 grid-rows-[auto_1fr_auto] gap-5 px-1 py-18 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-8">
                <div className="lg:col-span-2 flex items-end justify-between border-b border-[#e8e0d0]/10 pb-5">
                    <div>
                        <div className="font-mono text-[9px] font-light tracking-[0.45em] text-[#f0c15a] uppercase">
                            Sobre a Nihil Labs
                        </div>
                        <h2 className="mt-3 max-w-185 text-[clamp(2.25rem,7vw,5rem)] leading-[0.98] font-black tracking-[-0.015em] text-[#e8e0d0]">
                            Engenharia para empresas que precisam escalar com precisão.
                        </h2>
                    </div>

                    <div className="hidden font-mono text-[10px] tracking-[0.35em] text-[#e8e0d0]/25 uppercase md:block">
                        Company profile
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-6">
                    <p className="max-w-150 text-[13px] leading-7 font-light text-[#a9a193] sm:text-[15px] sm:leading-8">
                        A <strong className="font-medium text-[#e8e0d0]">Nihil Labs</strong> combina
                        estratégia digital, arquitetura de software e execução técnica para criar
                        produtos confiáveis, prontos para operação real e crescimento contínuo.
                    </p>

                    <div className="grid grid-cols-2 border-y border-[#e8e0d0]/10 md:grid-cols-4 lg:max-w-160">
                        {pilares.map((pilar, indice) => (
                            <div
                                key={pilar}
                                className="border-[#e8e0d0]/10 px-3 py-4 first:pl-0 even:border-l md:border-l md:first:border-l-0"
                            >
                                    <div className="font-mono text-[9px] tracking-[0.28em] text-[#f0c15a]">
                                    {String(indice + 1).padStart(2, '0')}
                                </div>
                                <div className="mt-2 text-[12px] font-medium tracking-[0.08em] text-[#e8e0d0] uppercase">
                                    {pilar}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid content-start gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
                    {metricas.map((metrica) => (
                        <div
                            key={metrica.label}
                            className="group relative overflow-hidden border border-[#e8e0d0]/10 bg-[#080806]/55 px-5 py-4 sm:px-6 sm:py-5"
                        >
                            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#f0c15a]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="flex items-end justify-between gap-5">
                                <div className="text-[clamp(2rem,6vw,4.2rem)] leading-none font-thin tracking-[-0.02em] text-[#e8e0d0]">
                                    {metrica.numero}
                                </div>
                                <div className="max-w-28 pb-1 text-right font-mono text-[9px] leading-4 tracking-[0.22em] text-[#9b9386] uppercase">
                                    {metrica.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-2 grid gap-4 border-t border-[#e8e0d0]/10 pt-5 text-[12px] leading-6 font-light text-[#8f877b] sm:grid-cols-3">
                    <p>
                        Atuamos da descoberta ao deploy, com tomada de decisão baseada em impacto,
                        risco e custo operacional.
                    </p>
                    <p>
                        Entregamos sistemas sob medida, integrações críticas, automações e bases de
                        dados preparadas para escala.
                    </p>
                    <p>
                        O modelo é direto: diagnóstico claro, roadmap enxuto, execução documentada e
                        evolução contínua.
                    </p>
                </div>
            </div>
        </SecaoPortfolio>
    );
}
