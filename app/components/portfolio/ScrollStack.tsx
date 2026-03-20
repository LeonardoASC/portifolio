'use client';

import { useCallback, useLayoutEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';

export interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
}

export const ScrollStackItem = ({ children, itemClassName = '' }: ScrollStackItemProps) => (
    <div
        className={`scroll-stack-card relative my-6 h-72 w-full origin-top rounded-[30px] p-8 shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border will-change-transform sm:my-8 sm:h-80 sm:rounded-[40px] sm:p-12 ${itemClassName}`.trim()}
        style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
        }}
    >
        {children}
    </div>
);

interface ScrollStackProps {
    className?: string;
    children: ReactNode;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string;
    scaleEndPosition?: string;
    baseScale?: number;
    scaleDuration?: number;
    rotationAmount?: number;
    blurAmount?: number;
    useWindowScroll?: boolean;
    onStackComplete?: () => void;
}

type TransformacaoCard = {
    translateY: number;
    scale: number;
    rotation: number;
    blur: number;
};

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = false,
    onStackComplete,
}: ScrollStackProps) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const stackCompletaRef = useRef(false);
    const frameRef = useRef<number | null>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    const cacheTransformacoesRef = useRef(new Map<number, TransformacaoCard>());
    const emAtualizacaoRef = useRef(false);

    const calcularProgresso = useCallback((scrollTop: number, inicio: number, fim: number) => {
        if (scrollTop < inicio) return 0;
        if (scrollTop > fim) return 1;
        return (scrollTop - inicio) / (fim - inicio);
    }, []);

    const converterPorcentagem = useCallback((valor: string | number, alturaContainer: number) => {
        if (typeof valor === 'string' && valor.includes('%')) {
            return (Number.parseFloat(valor) / 100) * alturaContainer;
        }

        return Number(valor);
    }, []);

    const obterDadosScroll = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                alturaContainer: window.innerHeight,
            };
        }

        const scroller = scrollerRef.current;
        return {
            scrollTop: scroller ? scroller.scrollTop : 0,
            alturaContainer: scroller ? scroller.clientHeight : 0,
        };
    }, [useWindowScroll]);

    const obterOffsetElemento = useCallback(
        (elemento: HTMLElement) => {
            if (useWindowScroll) {
                const rect = elemento.getBoundingClientRect();
                return rect.top + window.scrollY;
            }

            return elemento.offsetTop;
        },
        [useWindowScroll],
    );

    const atualizarTransformacoes = useCallback(() => {
        if (!cardsRef.current.length || emAtualizacaoRef.current) return;

        emAtualizacaoRef.current = true;

        const { scrollTop, alturaContainer } = obterDadosScroll();
        const stackPositionPx = converterPorcentagem(stackPosition, alturaContainer);
        const scaleEndPositionPx = converterPorcentagem(scaleEndPosition, alturaContainer);

        const fimStack = useWindowScroll
            ? (document.querySelector('.scroll-stack-end') as HTMLElement | null)
            : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null);

        const topoFimStack = fimStack ? obterOffsetElemento(fimStack) : 0;

        cardsRef.current.forEach((card, indice) => {
            const topoCard = obterOffsetElemento(card);
            const triggerInicio = topoCard - stackPositionPx - itemStackDistance * indice;
            const triggerFim = topoCard - scaleEndPositionPx;
            const pinInicio = topoCard - stackPositionPx - itemStackDistance * indice;
            const pinFim = topoFimStack - alturaContainer / 2;

            const progressoEscala = calcularProgresso(scrollTop, triggerInicio, triggerFim);
            const escalaAlvo = baseScale + indice * itemScale;
            const escala = 1 - progressoEscala * (1 - escalaAlvo);
            const rotacao = rotationAmount ? indice * rotationAmount * progressoEscala : 0;

            let blur = 0;
            if (blurAmount) {
                let indiceTopo = 0;
                for (let i = 0; i < cardsRef.current.length; i += 1) {
                    const topoCardAtual = obterOffsetElemento(cardsRef.current[i]);
                    const triggerInicioAtual = topoCardAtual - stackPositionPx - itemStackDistance * i;
                    if (scrollTop >= triggerInicioAtual) indiceTopo = i;
                }

                if (indice < indiceTopo) {
                    const profundidade = indiceTopo - indice;
                    blur = Math.max(0, profundidade * blurAmount);
                }
            }

            let translateY = 0;
            const fixado = scrollTop >= pinInicio && scrollTop <= pinFim;

            if (fixado) {
                translateY = scrollTop - topoCard + stackPositionPx + itemStackDistance * indice;
            } else if (scrollTop > pinFim) {
                translateY = pinFim - topoCard + stackPositionPx + itemStackDistance * indice;
            }

            const transformacaoNova: TransformacaoCard = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(escala * 1000) / 1000,
                rotation: Math.round(rotacao * 100) / 100,
                blur: Math.round(blur * 100) / 100,
            };

            const transformacaoAnterior = cacheTransformacoesRef.current.get(indice);
            const mudou =
                !transformacaoAnterior ||
                Math.abs(transformacaoAnterior.translateY - transformacaoNova.translateY) > 0.1 ||
                Math.abs(transformacaoAnterior.scale - transformacaoNova.scale) > 0.001 ||
                Math.abs(transformacaoAnterior.rotation - transformacaoNova.rotation) > 0.1 ||
                Math.abs(transformacaoAnterior.blur - transformacaoNova.blur) > 0.1;

            if (mudou) {
                card.style.transform = `translate3d(0, ${transformacaoNova.translateY}px, 0) scale(${transformacaoNova.scale}) rotate(${transformacaoNova.rotation}deg)`;
                card.style.filter = transformacaoNova.blur > 0 ? `blur(${transformacaoNova.blur}px)` : '';
                cacheTransformacoesRef.current.set(indice, transformacaoNova);
            }

            if (indice === cardsRef.current.length - 1) {
                const visivelNaPilha = scrollTop >= pinInicio && scrollTop <= pinFim;
                if (visivelNaPilha && !stackCompletaRef.current) {
                    stackCompletaRef.current = true;
                    onStackComplete?.();
                } else if (!visivelNaPilha && stackCompletaRef.current) {
                    stackCompletaRef.current = false;
                }
            }
        });

        emAtualizacaoRef.current = false;
    }, [
        baseScale,
        blurAmount,
        calcularProgresso,
        converterPorcentagem,
        itemScale,
        itemStackDistance,
        obterDadosScroll,
        obterOffsetElemento,
        onStackComplete,
        rotationAmount,
        scaleEndPosition,
        stackPosition,
        useWindowScroll,
    ]);

    const tratarScroll = useCallback(() => {
        atualizarTransformacoes();
    }, [atualizarTransformacoes]);

    const configurarLenis = useCallback(() => {
        if (useWindowScroll) {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (tempo) => Math.min(1, 1.001 - 2 ** (-10 * tempo)),
                smoothWheel: true,
                touchMultiplier: 2,
                infinite: false,
                wheelMultiplier: 1,
                lerp: 0.1,
                syncTouch: true,
                syncTouchLerp: 0.075,
            });

            lenis.on('scroll', tratarScroll);

            const animar = (tempo: number) => {
                lenis.raf(tempo);
                frameRef.current = requestAnimationFrame(animar);
            };
            frameRef.current = requestAnimationFrame(animar);

            lenisRef.current = lenis;
            return;
        }

        const scroller = scrollerRef.current;
        if (!scroller) return;

        const lenis = new Lenis({
            wrapper: scroller,
            content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
            duration: 1.2,
            easing: (tempo) => Math.min(1, 1.001 - 2 ** (-10 * tempo)),
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
            gestureOrientation: 'vertical',
            wheelMultiplier: 1,
            lerp: 0.1,
            syncTouch: true,
            syncTouchLerp: 0.075,
        });

        lenis.on('scroll', tratarScroll);

        const animar = (tempo: number) => {
            lenis.raf(tempo);
            frameRef.current = requestAnimationFrame(animar);
        };
        frameRef.current = requestAnimationFrame(animar);

        lenisRef.current = lenis;
    }, [tratarScroll, useWindowScroll]);

    useLayoutEffect(() => {
        if (!useWindowScroll && !scrollerRef.current) return;

        const cacheTransformacoes = cacheTransformacoesRef.current;

        const cards = Array.from(
            useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : (scrollerRef.current?.querySelectorAll('.scroll-stack-card') ?? []),
        ) as HTMLElement[];

        cardsRef.current = cards;

        cards.forEach((card, indice) => {
            if (indice < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }

            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            card.style.transform = 'translateZ(0)';
            card.style.webkitTransform = 'translateZ(0)';
            card.style.perspective = '1000px';
            card.style.webkitPerspective = '1000px';
        });

        configurarLenis();
        atualizarTransformacoes();

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            lenisRef.current?.destroy();
            stackCompletaRef.current = false;
            cardsRef.current = [];
            cacheTransformacoes.clear();
            emAtualizacaoRef.current = false;
        };
    }, [
        atualizarTransformacoes,
        baseScale,
        blurAmount,
        configurarLenis,
        itemDistance,
        itemScale,
        itemStackDistance,
        onStackComplete,
        rotationAmount,
        scaleDuration,
        scaleEndPosition,
        stackPosition,
        useWindowScroll,
    ]);

    return (
        <div
            ref={scrollerRef}
            data-scroll-stack="true"
            className={`relative h-full w-full overflow-x-visible overflow-y-auto ${className}`.trim()}
            style={{
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                willChange: 'scroll-position',
            }}
        >
            <div className="scroll-stack-inner min-h-screen px-4 pt-[12vh] pb-136 sm:px-10 sm:pt-[16vh] sm:pb-200">
                {children}
                <div className="scroll-stack-end h-px w-full" />
            </div>
        </div>
    );
};

export default ScrollStack;
