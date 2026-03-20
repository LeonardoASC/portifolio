'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { CamadaRuido } from './components/portfolio/CamadaRuido';
import { ContatoSecao } from './components/portfolio/secoes/ContatoSecao';
import { CursorPersonalizado } from './components/portfolio/CursorPersonalizado';
import { HeroSecao } from './components/portfolio/secoes/HeroSecao';
import { IndicadoresFixos } from './components/portfolio/IndicadoresFixos';
import { LogoFixo } from './components/portfolio/LogoFixo';
import { NavegacaoSecoes } from './components/portfolio/NavegacaoSecoes';
import { ProjetosSecao } from './components/portfolio/secoes/ProjetosSecao';
import { ServicosSecao } from './components/portfolio/secoes/ServicosSecao';
import { SobreSecao } from './components/portfolio/secoes/SobreSecao';
import { nomesSecoes, type EstadoSecao } from './components/portfolio/dados';

const DURACAO_TRANSICAO_MS = 860;
const INTERVALO_ROLAGEM_MS = 950;
const DURACAO_LOADING_MS = 1800;
const DURACAO_ENTRADA_LOGO_MS = 1300;

export default function Page() {
    const [carregandoInicial, setCarregandoInicial] = useState(true);
    const [animarEntradaLogo, setAnimarEntradaLogo] = useState(false);
    const [progressoCarregamento, setProgressoCarregamento] = useState(0);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [ocupado, setOcupado] = useState(false);
    const [indiceAnterior, setIndiceAnterior] = useState<number | null>(null);
    const [emTransicao, setEmTransicao] = useState(false);

    const tempoRodaMouse = useRef<number>(0);
    const posicaoInicialToque = useRef(0);

    useEffect(() => {
        if (!carregandoInicial) return;

        let quadro = 0;
        let timeoutFinalizar = 0;
        const inicio = performance.now();

        const atualizar = (agora: number) => {
            const tempoDecorrido = agora - inicio;
            const progresso = Math.min(100, Math.round((tempoDecorrido / DURACAO_LOADING_MS) * 100));

            setProgressoCarregamento(progresso);

            if (progresso < 100) {
                quadro = requestAnimationFrame(atualizar);
                return;
            }

            setAnimarEntradaLogo(true);

            timeoutFinalizar = window.setTimeout(() => {
                setCarregandoInicial(false);
            }, DURACAO_ENTRADA_LOGO_MS);
        };

        quadro = requestAnimationFrame(atualizar);

        return () => {
            cancelAnimationFrame(quadro);
            window.clearTimeout(timeoutFinalizar);
        };
    }, [carregandoInicial]);

    const navegarPara = useCallback(
        (proximoIndice: number) => {
            if (ocupado) return;
            if (proximoIndice === indiceAtual) return;
            if (proximoIndice < 0 || proximoIndice >= nomesSecoes.length) return;

            setIndiceAnterior(indiceAtual);
            setOcupado(true);
            setEmTransicao(true);
            setIndiceAtual(proximoIndice);

            window.setTimeout(() => {
                setOcupado(false);
                setEmTransicao(false);
                setIndiceAnterior(null);
            }, DURACAO_TRANSICAO_MS);
        },
        [ocupado, indiceAtual],
    );

    const obterEstadoSecao = useCallback(
        (indice: number): EstadoSecao => {
            if (indice === indiceAtual) return emTransicao ? 'entrando' : 'ativa';
            if (emTransicao && indiceAnterior === indice) return 'saindo';
            return 'oculta';
        },
        [emTransicao, indiceAnterior, indiceAtual],
    );

    useEffect(() => {
        if (carregandoInicial) return;

        const aoRolar = (evento: WheelEvent) => {
            if (Math.abs(evento.deltaY) < 10) return;

            const agora = Date.now();
            if (agora - tempoRodaMouse.current < INTERVALO_ROLAGEM_MS) return;
            tempoRodaMouse.current = agora;

            if (evento.deltaY > 0) navegarPara(indiceAtual + 1);
            else navegarPara(indiceAtual - 1);
        };

        const aoIniciarToque = (evento: TouchEvent) => {
            posicaoInicialToque.current = evento.touches[0].clientY;
        };

        const aoFinalizarToque = (evento: TouchEvent) => {
            const delta = posicaoInicialToque.current - evento.changedTouches[0].clientY;

            if (Math.abs(delta) < 44) return;
            navegarPara(delta > 0 ? indiceAtual + 1 : indiceAtual - 1);
        };

        const aoPressionarTecla = (evento: KeyboardEvent) => {
            if (evento.key === 'ArrowDown' || evento.key === 'PageDown') {
                navegarPara(indiceAtual + 1);
            }

            if (evento.key === 'ArrowUp' || evento.key === 'PageUp') {
                navegarPara(indiceAtual - 1);
            }
        };

        window.addEventListener('wheel', aoRolar, { passive: true });
        window.addEventListener('touchstart', aoIniciarToque, { passive: true });
        window.addEventListener('touchend', aoFinalizarToque, { passive: true });
        window.addEventListener('keydown', aoPressionarTecla);

        return () => {
            window.removeEventListener('wheel', aoRolar);
            window.removeEventListener('touchstart', aoIniciarToque);
            window.removeEventListener('touchend', aoFinalizarToque);
            window.removeEventListener('keydown', aoPressionarTecla);
        };
    }, [carregandoInicial, indiceAtual, navegarPara]);

    if (carregandoInicial) {
        return (
            <TelaCarregamentoInicial
                progresso={progressoCarregamento}
                animarEntradaLogo={animarEntradaLogo}
            />
        );
    }

    return (
        <main className="relative h-dvh w-full overflow-hidden bg-[#080806] text-[#e8e0d0] cursor-auto md:cursor-none">
            <CursorPersonalizado />
            <CamadaRuido />
            <LogoFixo />

            <NavegacaoSecoes
                totalSecoes={nomesSecoes.length}
                indiceAtual={indiceAtual}
                aoSelecionar={navegarPara}
            />

            <IndicadoresFixos indiceAtual={indiceAtual} totalSecoes={nomesSecoes.length} />

            <div className="fixed inset-0 overflow-hidden perspective-[1400px] perspective-origin-[50%_50%]">
                <HeroSecao estado={obterEstadoSecao(0)} />
                <SobreSecao estado={obterEstadoSecao(1)} />
                <ServicosSecao estado={obterEstadoSecao(2)} />
                <ProjetosSecao estado={obterEstadoSecao(3)} />
                <ContatoSecao estado={obterEstadoSecao(4)} />
            </div>
        </main>
    );
}

function TelaCarregamentoInicial({
    progresso,
    animarEntradaLogo,
}: {
    progresso: number;
    animarEntradaLogo: boolean;
}) {
    return (
        <main className="fixed inset-0 z-9999 overflow-hidden bg-[#080806] text-[#e8e0d0]">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(232,224,208,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,224,208,0.03) 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                }}
            />

            <div
                className={`fixed z-20 uppercase transition-all ease-[cubic-bezier(0.34,1.26,0.64,1)] ${animarEntradaLogo
                    ? 'top-5 left-5 text-[11px] tracking-[0.35em] md:top-9 md:left-11 md:text-[14px] md:tracking-[0.5em]'
                    : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] tracking-[0.5em] md:text-[20px]'
                    }`}
                style={{ transitionDuration: `${DURACAO_ENTRADA_LOGO_MS}ms` }}
            >
                <div className="text-[#e8e0d0] font-light">
                    <strong className="font-bold">NIHIL</strong> LABS
                </div>
            </div>

            <div
                className={`absolute inset-x-0 bottom-[20vh] mx-auto flex w-[min(88vw,420px)] flex-col items-center text-center transition-opacity duration-300 ${animarEntradaLogo ? 'opacity-0' : 'opacity-100'}`}
            >
                <div className="mb-4 font-mono text-[9px] tracking-[0.3em] text-[#b8ad9e] uppercase">
                    Carregando experiência
                </div>

                <div className="mb-2 flex w-full items-center justify-between font-mono text-[9px] tracking-[0.24em] text-[#6a6458] uppercase">
                    <span>Loading</span>
                    <span>{String(progresso).padStart(2, '0')}%</span>
                </div>

                <div className="relative h-px w-full overflow-hidden bg-[#e8e0d0]/15">
                    <div
                        className="absolute inset-y-0 left-0 bg-linear-to-r from-[#c9b99a] to-[#e8e0d0] transition-[width] duration-150"
                        style={{ width: `${progresso}%` }}
                    />
                </div>
            </div>
        </main>
    );
}