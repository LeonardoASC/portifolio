import { projetos, type EstadoSecao } from '../dados';
import { SecaoPortfolio } from '../SecaoPortfolio';

type ProjetosSecaoProps = {
    estado: EstadoSecao;
};

const projetosEmDestaque = projetos.slice(0, 4);

export function ProjetosSecao({ estado }: ProjetosSecaoProps) {
    return (
        <SecaoPortfolio id="s3" estado={estado} classeFundo="bg-[#10100d]" cantos={['tl', 'br']}>
            <div className="relative z-2 grid h-full w-[92%] max-w-285 grid-rows-[auto_1fr_auto] gap-5 px-1 py-18 sm:py-20">
                <div className="flex items-end justify-between gap-8 border-b border-[#e8e0d0]/10 pb-5">
                    <div>
                        <div className="font-mono text-[9px] font-light tracking-[0.45em] text-[#f0c15a] uppercase">
                            Cases selecionados
                        </div>
                        <h2 className="mt-3 text-[clamp(2.25rem,7vw,4.8rem)] leading-none font-black tracking-[-0.015em] text-[#e8e0d0]">
                            Projetos
                        </h2>
                    </div>

                    <div className="hidden text-right md:block">
                        <div className="text-[56px] leading-none font-thin tracking-[-0.03em] text-[#e8e0d0]/25">
                            {String(projetos.length).padStart(2, '0')}
                        </div>
                        <div className="mt-1 font-mono text-[9px] tracking-[0.28em] text-[#777066] uppercase">
                            Produtos e sistemas
                        </div>
                    </div>
                </div>

                <div className="grid min-h-0 gap-px overflow-hidden bg-[#e8e0d0]/10 lg:grid-cols-[1.15fr_0.85fr]">
                    <article className="relative flex flex-col justify-between bg-[#080806] p-5 sm:p-7">
                        <div>
                            <div className="mb-8 flex items-center justify-between font-mono text-[9px] tracking-[0.28em] text-[#f0c15a]">
                                <span>{projetos[0].numero}</span>
                                <span>{projetos[0].ano}</span>
                            </div>
                            <h3 className="max-w-150 text-[clamp(1.9rem,5vw,4.2rem)] leading-none font-black tracking-[-0.02em] text-[#e8e0d0]">
                                {projetos[0].nome}
                            </h3>
                            <p className="mt-5 max-w-150 text-[13px] leading-7 font-light text-[#9b9386] sm:text-[14px]">
                                {projetos[0].subtitulo}
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-2">
                            {projetos[0].tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="border border-[#f0c15a]/20 bg-[#f0c15a]/5 px-3 py-2 font-mono text-[8px] tracking-[0.2em] text-[#f3d18a] uppercase"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </article>

                    <div className="grid bg-[#e8e0d0]/10 lg:grid-rows-3">
                        {projetosEmDestaque.slice(1).map((projeto) => (
                            <article
                                key={projeto.numero}
                                className="group grid grid-cols-[auto_1fr] gap-5 bg-[#10100d] p-4 transition-colors duration-300 hover:bg-[#15140f] sm:p-5"
                            >
                                <div className="font-mono text-[9px] tracking-[0.25em] text-[#f0c15a]">
                                    {projeto.numero}
                                </div>
                                <div>
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-[15px] font-medium text-[#e8e0d0] sm:text-[17px]">
                                            {projeto.nome}
                                        </h3>
                                        <span className="font-mono text-[9px] tracking-[0.2em] text-[#777066]">
                                            {projeto.ano}
                                        </span>
                                    </div>
                                    <p className="mt-2 line-clamp-2 text-[12px] leading-6 font-light text-[#9b9386]">
                                        {projeto.subtitulo}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[8px] tracking-[0.18em] text-[#777066] uppercase">
                                        {projeto.tags.slice(0, 3).map((tag) => (
                                            <span key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 border-t border-[#e8e0d0]/10 pt-5 text-[12px] leading-6 font-light text-[#8f877b] sm:grid-cols-[0.75fr_1.25fr]">
                    <div className="font-mono text-[9px] tracking-[0.35em] text-[#f0c15a] uppercase">
                        Resultado esperado
                    </div>
                    <p>
                        Interfaces sólidas, backends sustentáveis, automações conectadas ao negócio e
                        documentação suficiente para manter a operação evoluindo depois da entrega.
                    </p>
                </div>
            </div>
        </SecaoPortfolio>
    );
}
