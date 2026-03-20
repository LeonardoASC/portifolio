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
    ativa: 'z-[3] opacity-100 pointer-events-auto [transform:translateZ(0)_scale(1)] blur-none',
    entrando:
        'z-[4] pointer-events-none animate-[portalIn_0.86s_cubic-bezier(0.16,1,0.3,1)_both]',
    saindo:
        'z-[2] pointer-events-none animate-[portalOut_0.86s_cubic-bezier(0.16,1,0.3,1)_both]',
    oculta: 'z-[1] opacity-0 pointer-events-none [transform:translateZ(-520px)_scale(0.56)] blur-[4px]',
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
            className={`absolute inset-0 flex items-center justify-center ${classeFundo} origin-center will-change-transform backface-hidden ${classesEstado[estado]}`}
        >
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(232,224,208,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(232,224,208,0.025) 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                }}
            />

            {cantos.map((canto) => (
                <div
                    key={canto}
                    className={`pointer-events-none absolute z-1 h-7 w-7 border-[#e8e0d0]/10 ${classesCanto[canto]}`}
                />
            ))}

            {children}
        </section>
    );
}
