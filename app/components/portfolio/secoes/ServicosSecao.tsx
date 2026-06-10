import { servicos, type EstadoSecao } from '../dados';
import { SecaoPortfolio } from '../SecaoPortfolio';

type ServicosSecaoProps = {
    estado: EstadoSecao;
};

const trilhas = ['Discovery', 'Arquitetura', 'Implementação', 'Evolução'];

export function ServicosSecao({ estado }: ServicosSecaoProps) {
    return (
        <SecaoPortfolio id="s2" estado={estado} classeFundo="bg-[#080806]" cantos={['tl', 'br']}>
            <div className="relative z-2 grid h-full w-[92%] max-w-285 grid-rows-[auto_1fr_auto] gap-5 px-1 py-18 sm:py-20">
                <div className="flex items-end justify-between gap-8 border-b border-[#e8e0d0]/10 pb-5">
                    <div>
                        <div className="font-mono text-[9px] font-light tracking-[0.45em] text-[#f0c15a] uppercase">
                            O que fazemos
                        </div>
                        <h2 className="mt-3 text-[clamp(2.25rem,7vw,4.8rem)] leading-none font-black tracking-[-0.015em] text-[#e8e0d0]">
                            Serviços
                        </h2>
                    </div>

                    <p className="hidden max-w-110 text-right text-[12px] leading-6 font-light text-[#9b9386] md:block">
                        Portfólio técnico para criar, modernizar e sustentar plataformas digitais
                        com padrão corporativo.
                    </p>
                </div>

                <div className="grid min-h-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {servicos.map((servico) => (
                        <article
                            key={servico.numero}
                            className="group relative flex min-h-33 flex-col justify-between overflow-hidden border border-[#e8e0d0]/10 bg-[#0d0d0a]/80 p-4 transition-colors duration-300 hover:border-[#f0c15a]/55 sm:min-h-40 sm:p-5"
                        >
                            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-[#f0c15a]/0 via-[#f0c15a]/85 to-[#f0c15a]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="flex items-start justify-between gap-4">
                                <span className="font-mono text-[9px] tracking-[0.28em] text-[#f0c15a]">
                                    {servico.numero}
                                </span>
                                <span className="h-2 w-2 border border-[#e8e0d0]/30 transition-colors duration-300 group-hover:border-[#f0c15a]" />
                            </div>

                            <div>
                                <h3 className="mb-2 text-[15px] leading-tight font-medium text-[#e8e0d0] sm:text-[17px]">
                                    {servico.titulo}
                                </h3>
                                <p className="text-[12px] leading-6 font-light text-[#9b9386] sm:text-[13px]">
                                    {servico.descricao}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="grid border-t border-[#e8e0d0]/10 pt-5 sm:grid-cols-[0.72fr_1.28fr] sm:items-center">
                    <div className="font-mono text-[9px] tracking-[0.35em] text-[#f0c15a] uppercase">
                        Método de entrega
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-px bg-[#e8e0d0]/10 sm:mt-0 sm:grid-cols-4">
                        {trilhas.map((trilha, indice) => (
                            <div key={trilha} className="bg-[#080806] px-3 py-3 sm:px-4">
                                <div className="font-mono text-[8px] tracking-[0.24em] text-[#777066]">
                                    {String(indice + 1).padStart(2, '0')}
                                </div>
                                <div className="mt-1 text-[11px] font-medium tracking-[0.1em] text-[#f3d18a] uppercase">
                                    {trilha}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SecaoPortfolio>
    );
}
