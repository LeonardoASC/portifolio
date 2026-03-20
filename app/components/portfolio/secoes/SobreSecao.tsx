import type { EstadoSecao } from '../dados';
import { SecaoPortfolio } from '../SecaoPortfolio';

type SobreSecaoProps = {
    estado: EstadoSecao;
};

const metricas = [
    { numero: '40+', label: 'Projetos entregues' },
    { numero: '98%', label: 'Taxa de satisfação' },
    { numero: '12+', label: 'Especialistas' },
];

export function SobreSecao({ estado }: SobreSecaoProps) {
    return (
        <SecaoPortfolio id="s1" estado={estado} classeFundo="bg-[#0e0e0b]" cantos={['tl', 'br']}>
            <div className="relative z-2 grid w-[92%] max-w-270 items-start gap-12 px-1 py-20 lg:grid-cols-2 lg:items-center lg:gap-28">
                <div>
                    <div className="font-mono text-[9px] font-light tracking-[0.45em] text-[#c9b99a] uppercase">
                        Sobre nós
                    </div>
                    <h2 className="mt-4 mb-7 text-[clamp(2.2rem,8vw,4.1rem)] leading-[1.05] font-bold tracking-[-0.015em] text-[#e8e0d0]">
                        Quem
                        <br />
                        somos
                    </h2>
                    <p className="text-[13px] leading-7 font-light text-[#9b9386] sm:text-[14px] sm:leading-[1.95]">
                        A <strong className="font-normal text-[#d6c9b5]">Nihil Labs</strong> é uma
                        empresa de tecnologia construída sobre a crença de que{' '}
                        <strong className="font-normal text-[#d6c9b5]">excelência de engenharia</strong>{' '}
                        e visão estratégica são inseparáveis.
                        <br />
                        <br />
                        Atuamos da concepção ao deploy — com um time enxuto, multidisciplinar e
                        obcecado por qualidade. Sem ruído. Sem atalhos.
                    </p>
                </div>

                <div className="grid gap-7 sm:grid-cols-3 sm:gap-4 lg:grid-cols-1 lg:gap-10">
                    {metricas.map((metrica) => (
                        <div key={metrica.label}>
                            <div className="text-[clamp(2.6rem,11vw,4.9rem)] leading-none font-thin tracking-[-0.02em] text-[#e8e0d0]">
                                {metrica.numero.slice(0, -1)}
                                <sup className="align-super text-[0.38em] font-light text-[#c9b99a]">
                                    {metrica.numero.slice(-1)}
                                </sup>
                            </div>
                            <div className="mt-1 font-mono text-[9px] tracking-[0.3em] text-[#9b9386] uppercase">
                                {metrica.label}
                            </div>
                            <div className="mt-2 h-px w-7 bg-[#c9b99a]/30" />
                        </div>
                    ))}
                </div>
            </div>
        </SecaoPortfolio>
    );
}
