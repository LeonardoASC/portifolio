import { servicos, type EstadoSecao } from '../dados';
import { SecaoPortfolio } from '../SecaoPortfolio';

type ServicosSecaoProps = {
    estado: EstadoSecao;
};

export function ServicosSecao({ estado }: ServicosSecaoProps) {
    const cardsDeslizantes = [...servicos, ...servicos];

    return (
        <SecaoPortfolio id="s2" estado={estado} classeFundo="bg-[#080806]" cantos={['tl', 'br']}>
            <div className="relative z-2 w-[92%] max-w-270 px-1 py-16 sm:py-20">
                <div className="mb-9 flex items-end justify-between border-b border-[#e8e0d0]/10 pb-6">
                    <div>
                        <div className="font-mono text-[9px] font-light tracking-[0.45em] text-[#c9b99a] uppercase">
                            O que fazemos
                        </div>
                        <h2 className="mt-2 text-[clamp(2rem,8vw,3.5rem)] font-bold tracking-[-0.015em] text-[#e8e0d0]">
                            Serviços
                        </h2>
                    </div>
                    <div className="text-6xl leading-none font-black tracking-[-0.03em] text-[#e8e0d0]/4 sm:text-[80px]">
                        06
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-linear-to-r from-[#080806] to-transparent sm:w-24" />
                    <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-linear-to-l from-[#080806] to-transparent sm:w-24" />

                    <div className="flex w-max gap-3 sm:gap-4 animate-servicosSlideLeft hover:[animation-play-state:paused]">
                        {cardsDeslizantes.map((servico, indice) => (
                            <article
                                key={`${servico.numero}-${indice}`}
                                aria-hidden={indice >= servicos.length}
                                className="relative h-52 w-70 shrink-0 perspective-distant sm:h-56 sm:w-80 md:h-60 md:w-88"
                            >
                                <div
                                    className="relative h-full w-full transform-3d animate-servicoFlip"
                                    style={{ animationDelay: `${(indice % servicos.length) * 0.55}s` }}
                                >
                                    <div className="absolute inset-0 overflow-hidden border border-[#e8e0d0]/14 bg-[#080806]/92 p-5 backface-hidden sm:p-6">
                                        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#c9b99a] to-transparent opacity-75" />

                                        <div className="relative z-2 flex h-full flex-col justify-between gap-4">
                                            <div className="font-mono text-[9px] font-light tracking-[0.3em] text-[#6a6458]">
                                                {servico.numero}
                                            </div>

                                            <div>
                                                <h3 className="mb-2 text-[15px] leading-tight font-medium tracking-[0.01em] text-[#e8e0d0] sm:text-[17px]">
                                                    {servico.titulo}
                                                </h3>
                                                <p className="line-clamp-3 text-[12px] leading-6 font-light text-[#6a6458] sm:text-[13px] sm:leading-7">
                                                    {servico.descricao}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 overflow-hidden border border-[#c9b99a]/30 bg-[#0b0b08] p-5 transform-[rotateY(180deg)] backface-hidden sm:p-6">
                                        <div className="absolute inset-0 bg-radial-[circle_at_20%_10%] from-[#c9b99a]/15 via-transparent to-transparent" />

                                        <div className="relative z-2 flex h-full flex-col justify-between">
                                            <div className="font-mono text-[8px] tracking-[0.2em] text-[#c9b99a] uppercase">
                                                {servico.numero} · NIHIL LABS
                                            </div>

                                            <div>
                                                <h4 className="mb-2 text-[13px] font-medium tracking-[0.08em] text-[#e8e0d0] uppercase">
                                                    Solução sob medida
                                                </h4>
                                                <p className="line-clamp-2 text-[12px] leading-6 font-light text-[#6a6458]">
                                                    Engenharia focada em resultado com implementação
                                                    rápida, estável e escalável.
                                                </p>
                                            </div>

                                            <div className="font-mono text-[9px] tracking-[0.18em] text-[#c9b99a] uppercase">
                                                Ver detalhes →
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </SecaoPortfolio>
    );
}
