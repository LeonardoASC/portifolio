import {
    Children,
    cloneElement,
    createRef,
    forwardRef,
    isValidElement,
    type ReactElement,
    type ReactNode,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
    width?: number | string;
    height?: number | string;
    cardDistance?: number;
    verticalDistance?: number;
    delay?: number;
    pauseOnHover?: boolean;
    onCardClick?: (indice: number) => void;
    skewAmount?: number;
    easing?: 'linear' | 'elastic';
    children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
    <div
        ref={ref}
        {...rest}
        className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black transform-3d will-change-transform backface-hidden ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    />
));
Card.displayName = 'Card';

type ReferenciaCard = React.RefObject<HTMLDivElement | null>;

interface Slot {
    x: number;
    y: number;
    z: number;
    zIndex: number;
}

const criarSlot = (indice: number, distanciaX: number, distanciaY: number, total: number): Slot => ({
    x: indice * distanciaX,
    y: -indice * distanciaY,
    z: -indice * distanciaX * 1.5,
    zIndex: total - indice,
});

const posicionarAgora = (elemento: HTMLElement, slot: Slot, skew: number) =>
    gsap.set(elemento, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true,
    });

const CardSwap = ({
    width = 500,
    height = 400,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    onCardClick,
    skewAmount = 6,
    easing = 'elastic',
    children,
}: CardSwapProps) => {
    const configAnimacao = useMemo(
        () =>
            easing === 'elastic'
                ? {
                    ease: 'elastic.out(0.6,0.9)',
                    durDrop: 2,
                    durMove: 2,
                    durReturn: 2,
                    promoteOverlap: 0.9,
                    returnDelay: 0.05,
                }
                : {
                    ease: 'power1.inOut',
                    durDrop: 0.8,
                    durMove: 0.8,
                    durReturn: 0.8,
                    promoteOverlap: 0.45,
                    returnDelay: 0.2,
                },
        [easing],
    );

    const cardsFilhos = useMemo(
        () => Children.toArray(children) as ReactElement<CardProps>[],
        [children],
    );
    const referencias = useMemo<ReferenciaCard[]>(
        () => cardsFilhos.map(() => createRef<HTMLDivElement>()),
        [cardsFilhos],
    );

    const ordemAtual = useRef<number[]>(Array.from({ length: cardsFilhos.length }, (_, i) => i));
    const timelineAtual = useRef<gsap.core.Timeline | null>(null);
    const intervaloAtual = useRef<number>(0);
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ordemAtual.current.length !== cardsFilhos.length) {
            ordemAtual.current = Array.from({ length: cardsFilhos.length }, (_, i) => i);
        }

        const total = referencias.length;

        referencias.forEach((referencia, indice) => {
            if (!referencia.current) return;
            posicionarAgora(
                referencia.current,
                criarSlot(indice, cardDistance, verticalDistance, total),
                skewAmount,
            );
        });

        const alternar = () => {
            if (ordemAtual.current.length < 2) return;

            const [frente, ...restante] = ordemAtual.current;
            const elementoFrente = referencias[frente]?.current;
            if (!elementoFrente) return;

            const timeline = gsap.timeline();
            timelineAtual.current = timeline;

            timeline.to(elementoFrente, {
                y: '+=500',
                duration: configAnimacao.durDrop,
                ease: configAnimacao.ease,
            });

            timeline.addLabel('promove', `-=${configAnimacao.durDrop * configAnimacao.promoteOverlap}`);
            restante.forEach((indice, posicao) => {
                const elemento = referencias[indice]?.current;
                if (!elemento) return;

                const slot = criarSlot(posicao, cardDistance, verticalDistance, referencias.length);
                timeline.set(elemento, { zIndex: slot.zIndex }, 'promove');
                timeline.to(
                    elemento,
                    {
                        x: slot.x,
                        y: slot.y,
                        z: slot.z,
                        duration: configAnimacao.durMove,
                        ease: configAnimacao.ease,
                    },
                    `promove+=${posicao * 0.15}`,
                );
            });

            const slotFinal = criarSlot(
                referencias.length - 1,
                cardDistance,
                verticalDistance,
                referencias.length,
            );

            timeline.addLabel('retorno', `promove+=${configAnimacao.durMove * configAnimacao.returnDelay}`);
            timeline.call(
                () => {
                    gsap.set(elementoFrente, { zIndex: slotFinal.zIndex });
                },
                undefined,
                'retorno',
            );

            timeline.to(
                elementoFrente,
                {
                    x: slotFinal.x,
                    y: slotFinal.y,
                    z: slotFinal.z,
                    duration: configAnimacao.durReturn,
                    ease: configAnimacao.ease,
                },
                'retorno',
            );

            timeline.call(() => {
                ordemAtual.current = [...restante, frente];
            });
        };

        alternar();
        intervaloAtual.current = window.setInterval(alternar, delay);

        const node = container.current;
        if (pauseOnHover && node) {
            const pausar = () => {
                timelineAtual.current?.pause();
                clearInterval(intervaloAtual.current);
            };

            const continuar = () => {
                timelineAtual.current?.play();
                intervaloAtual.current = window.setInterval(alternar, delay);
            };

            node.addEventListener('mouseenter', pausar);
            node.addEventListener('mouseleave', continuar);

            return () => {
                node.removeEventListener('mouseenter', pausar);
                node.removeEventListener('mouseleave', continuar);
                timelineAtual.current?.kill();
                clearInterval(intervaloAtual.current);
            };
        }

        return () => {
            timelineAtual.current?.kill();
            clearInterval(intervaloAtual.current);
        };
    }, [
        cardDistance,
        configAnimacao,
        delay,
        pauseOnHover,
        cardsFilhos.length,
        referencias,
        skewAmount,
        verticalDistance,
    ]);

    const renderizados = cardsFilhos.map((filho, indice) =>
        isValidElement<CardProps>(filho)
            ? cloneElement(filho, {
                key: indice,
                ref: referencias[indice],
                style: { width, height, ...(filho.props.style ?? {}) },
                onClick: (evento: React.MouseEvent<HTMLDivElement>) => {
                    filho.props.onClick?.(evento);
                    onCardClick?.(indice);
                },
            } as CardProps & React.RefAttributes<HTMLDivElement>)
            : filho,
    );

    return (
        <div
            ref={container}
            className="absolute right-0 bottom-0 origin-bottom-right translate-x-[5%] translate-y-[18%] perspective-[900px] overflow-visible max-[900px]:translate-x-[14%] max-[900px]:translate-y-[20%] max-[900px]:scale-[0.78] max-[640px]:translate-x-[18%] max-[640px]:translate-y-[22%] max-[640px]:scale-[0.62]"
            style={{ width, height }}
        >
            {renderizados}
        </div>
    );
};

export default CardSwap;