import type { EstadoSecao } from '../dados';
import LightRays from '../LightRays';
import { SecaoPortfolio } from '../SecaoPortfolio';

type HeroSecaoProps = {
    estado: EstadoSecao;
};

export function HeroSecao({ estado }: HeroSecaoProps) {
    return (
        <SecaoPortfolio id="s0" estado={estado} classeFundo="bg-[#080806]">
            <div className="pointer-events-none absolute inset-0 z-1 opacity-70">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={0.5}
                    lightSpread={1}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0}
                    distortion={0}
                    pulsating={false}
                    fadeDistance={100}
                    saturation={1}
                />
            </div>

            <div className="relative z-2 flex w-full max-w-5xl flex-col items-center px-6 text-center sm:px-8">
                <div className="mb-8 font-mono text-xs font-light tracking-[0.34em] text-[#c9b99a] uppercase sm:mb-11 sm:text-[9px] sm:tracking-[0.5em]">
                    Technology &amp; Innovation — Est. 2024
                </div>

                <h1 className="text-9xl sm:text-[clamp(3.4rem,17vw,11.8rem)] leading-[0.92] font-black tracking-[-0.015em] text-[#e8e0d0]">
                    NIHIL
                    <span className="block font-thin text-[#d0c3ad]">LABS</span>
                </h1>

                <div className="my-7 h-14 w-px bg-linear-to-b from-[#c9b99a] to-transparent opacity-50 sm:my-9" />

                <p className="max-w-84 text-[11px] leading-7 font-light tracking-[0.14em] text-[#9b9386] uppercase sm:text-[12px] sm:leading-[1.9] sm:tracking-[0.2em]">
                    Soluções de alto desempenho para negócios que não aceitam o ordinário
                </p>

                <div className="pointer-events-none absolute -right-6 -bottom-20 hidden select-none text-[150px] leading-none font-black tracking-[-0.04em] text-[#e8e0d0]/2.5 lg:block">
                    24
                </div>
            </div>
        </SecaoPortfolio>
    );
}
