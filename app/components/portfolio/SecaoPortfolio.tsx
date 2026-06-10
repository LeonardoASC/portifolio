import type { ReactNode } from 'react';

import type { EstadoSecao } from './dados';

type Canto = 'tl' | 'tr' | 'bl' | 'br';

type SecaoPortfolioProps = {
    id: string;
    estado: EstadoSecao;
    children: ReactNode;
    classeFundo: string;
    cantos?: Canto[];
};

const classesEstado: Record<EstadoSecao, string> = {
    ativa: 'z-[3] opacity-100 pointer-events-auto',
    entrando: 'z-[4] pointer-events-none animacao-camera-entrando',
    saindo: 'z-[2] pointer-events-none animacao-camera-saindo',
    oculta: 'z-[1] opacity-0 pointer-events-none [transform:translate3d(-18vw,0,-120px)_scale(0.94)] blur-[3px]',
};

const classesCanto: Record<Canto, string> = {
    tl: 'top-5 left-5 md:top-11 md:left-11 border-t border-l',
    tr: 'top-5 right-5 md:top-11 md:right-11 border-t border-r',
    bl: 'bottom-5 left-5 md:bottom-11 md:left-11 border-b border-l',
    br: 'bottom-5 right-5 md:bottom-11 md:right-11 border-b border-r',
};

export function SecaoPortfolio({
    id,
    estado,
    children,
    classeFundo,
    cantos = ['tl', 'tr', 'bl', 'br'],
}: SecaoPortfolioProps) {
    return (
        <section
            id={id}
            className={`absolute inset-0 flex items-center justify-center overflow-hidden ${classeFundo} origin-center will-change-transform backface-hidden ${classesEstado[estado]}`}
        >
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(232,224,208,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(232,224,208,0.025) 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                }}
            />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#f0c15a]/45 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-[#f0c15a]/18 to-transparent" />

            {cantos.map((canto) => (
                <div
                    key={canto}
                    className={`pointer-events-none absolute z-1 h-7 w-7 border-[#f0c15a]/18 ${classesCanto[canto]}`}
                />
            ))}

            {children}
        </section>
    );
}
