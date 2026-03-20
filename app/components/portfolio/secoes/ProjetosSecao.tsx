import { projetos, type EstadoSecao } from '../dados';
import MagicBento, { type BentoCardProps } from '../MagicBento';
import { SecaoPortfolio } from '../SecaoPortfolio';

type ProjetosSecaoProps = {
    estado: EstadoSecao;
};

export function ProjetosSecao({ estado }: ProjetosSecaoProps) {
    const cardsProjetos: BentoCardProps[] = projetos.map((projeto) => ({
        color: '#09080b',
        title: projeto.nome,
        description: projeto.subtitulo,
        label: `${projeto.numero} · ${projeto.tags.join(' • ')} · ${projeto.ano}`,
    }));

    return (
        <SecaoPortfolio id="s3" estado={estado} classeFundo="bg-[#111110]" cantos={['tl', 'br']}>
            <div className="relative z-2 mx-auto w-[92%] max-w-270 px-1 py-20">
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

                <div className="mt-6 flex justify-center">
                    <MagicBento
                        cards={cardsProjetos}
                        textAutoHide={true}
                        enableStars
                        enableSpotlight
                        enableBorderGlow={true}
                        enableTilt={false}
                        enableMagnetism={false}
                        clickEffect
                        spotlightRadius={400}
                        particleCount={12}
                        glowColor="132, 0, 255"
                        disableAnimations={false}
                    />
                </div>
            </div>
        </SecaoPortfolio>
    );
}
