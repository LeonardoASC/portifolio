import { projetos, type EstadoSecao } from '../dados';
import { SecaoPortfolio } from '../SecaoPortfolio';

type ProjetosSecaoProps = {
    estado: EstadoSecao;
};

export function ProjetosSecao({ estado }: ProjetosSecaoProps) {
    return (
        <SecaoPortfolio id="s3" estado={estado} classeFundo="bg-[#111110]" cantos={['tl', 'br']}>
            <div className="relative z-2 w-[92%] max-w-270 px-1 py-20">
                <div className="mb-8 flex items-end justify-between border-b border-[#e8e0d0]/10 pb-6">
                    <div>
                        <div className="font-mono text-[9px] font-light tracking-[0.45em] text-[#c9b99a] uppercase">
                            Cases selecionados
                        </div>
                        <h2 className="mt-2 text-[clamp(2rem,8vw,3.5rem)] font-bold tracking-[-0.015em] text-[#e8e0d0]">
                            Projetos
                        </h2>
                    </div>
                    <div className="text-6xl leading-none font-black tracking-[-0.03em] text-[#e8e0d0]/4 sm:text-[80px]">
                        04
                    </div>
                </div>

                <div className="flex flex-col">
                    {projetos.map((projeto, indice) => (
                        <article
                            key={projeto.numero}
                            className={`group grid gap-3 border-[#e8e0d0]/10 py-4 transition-all duration-300 md:grid-cols-[52px_1fr_auto_76px_20px] md:items-center md:gap-6 md:py-5 ${indice === 0 ? 'border-y' : 'border-b'} hover:md:pl-3`}
                        >
                            <div className="font-mono text-[9px] font-light tracking-[0.2em] text-[#6a6458] transition-colors group-hover:text-[#c9b99a]">
                                {projeto.numero}
                            </div>

                            <div>
                                <div className="text-lg leading-tight font-medium tracking-[0.01em] text-[#e8e0d0] sm:text-xl">
                                    {projeto.nome}
                                </div>
                                <div className="mt-1 text-[11px] font-light tracking-[0.07em] text-[#6a6458] sm:text-[12px]">
                                    {projeto.subtitulo}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 md:justify-end">
                                {projeto.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-xs border border-[#c9b99a]/20 px-2 py-0.5 font-mono text-[8px] tracking-[0.18em] text-[#c9b99a] uppercase"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="font-mono text-[10px] font-light tracking-widest text-[#6a6458] md:text-right">
                                {projeto.ano}
                            </div>

                            <div className="hidden text-[12px] text-[#6a6458] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#c9b99a] md:block">
                                →
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </SecaoPortfolio>
    );
}
