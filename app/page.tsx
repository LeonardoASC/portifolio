'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const sections = ['Hero', 'Sobre', 'Serviços', 'Projetos', 'Contato'];
type EstadoSecao = 'ativa' | 'entrando' | 'saindo' | 'oculta';

export default function Page() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [busy, setBusy] = useState(false);
    const [indiceAnterior, setIndiceAnterior] = useState<number | null>(null);
    const [emTransicao, setEmTransicao] = useState(false);

    const cursorRef = useRef<HTMLDivElement | null>(null);
    const ringRef = useRef<HTMLDivElement | null>(null);
    const wheelTimeoutRef = useRef<number>(0);
    const touchStartY = useRef(0);

    useEffect(() => {
        const cursor = cursorRef.current;
        const ring = ringRef.current;

        if (!cursor || !ring) return;

        let mx = 0;
        let my = 0;
        let rx = 0;
        let ry = 0;
        let raf = 0;

        const onMouseMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
        };

        const tick = () => {
            rx += (mx - rx) * 0.1;
            ry += (my - ry) * 0.1;

            cursor.style.left = `${mx}px`;
            cursor.style.top = `${my}px`;
            ring.style.left = `${rx}px`;
            ring.style.top = `${ry}px`;

            raf = requestAnimationFrame(tick);
        };

        document.addEventListener('mousemove', onMouseMove);
        tick();

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    const go = useCallback((nextIndex: number) => {
        if (busy) return;
        if (nextIndex === currentIndex) return;
        if (nextIndex < 0 || nextIndex >= sections.length) return;

        setIndiceAnterior(currentIndex);
        setBusy(true);
        setEmTransicao(true);
        setCurrentIndex(nextIndex);

        window.setTimeout(() => {
            setBusy(false);
            setEmTransicao(false);
            setIndiceAnterior(null);
        }, 870);
    }, [busy, currentIndex]);

    const obterEstadoSecao = (indice: number): EstadoSecao => {
        if (indice === currentIndex) return emTransicao ? 'entrando' : 'ativa';
        if (emTransicao && indiceAnterior === indice) return 'saindo';
        return 'oculta';
    };

    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            const now = Date.now();
            if (now - wheelTimeoutRef.current < 950) return;
            wheelTimeoutRef.current = now;

            if (e.deltaY > 0) go(currentIndex + 1);
            else go(currentIndex - 1);
        };

        const onTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const onTouchEnd = (e: TouchEvent) => {
            const delta = touchStartY.current - e.changedTouches[0].clientY;
            if (Math.abs(delta) > 40) {
                go(delta > 0 ? currentIndex + 1 : currentIndex - 1);
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') go(currentIndex + 1);
            if (e.key === 'ArrowUp' || e.key === 'PageUp') go(currentIndex - 1);
        };

        window.addEventListener('wheel', onWheel, { passive: true });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchend', onTouchEnd, { passive: true });
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [currentIndex, go]);

    return (
        <main className="page-root">
            <div ref={cursorRef} id="cursor" />
            <div ref={ringRef} id="cursor-ring" />
            <div id="noise" />

            <div id="fixed-logo">
                <strong>NIHIL</strong> LABS
            </div>

            <div id="nav-dots">
                {sections.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        className={`dot ${currentIndex === i ? 'active' : ''}`}
                        onClick={() => go(i)}
                        aria-label={`Ir para seção ${i + 1}`}
                    />
                ))}
            </div>

            <div id="sec-counter">
                <em>{String(currentIndex + 1).padStart(2, '0')}</em> — 05
            </div>

            <div id="scroll-hint">Scroll</div>

            <div id="viewport">
                <Section id="s0" estado={obterEstadoSecao(0)}>
                    <div className="bg-lines" />
                    <div className="c tl" />
                    <div className="c tr" />
                    <div className="c bl" />
                    <div className="c br" />

                    <div className="hero-wrap">
                        <div className="hero-tag">Technology &amp; Innovation — Est. 2024</div>
                        <h1 className="hero-name">
                            NIHIL
                            <span className="thin">LABS</span>
                        </h1>
                        <div className="hero-div" />
                        <p className="hero-sub">
                            Soluções de alto desempenho para negócios que não aceitam o
                            ordinário
                        </p>
                        <div className="hero-ghost">24</div>
                    </div>
                </Section>

                <Section id="s1" estado={obterEstadoSecao(1)}>
                    <div className="bg-lines" />
                    <div className="c tl" />
                    <div className="c br" />

                    <div className="sobre-wrap">
                        <div>
                            <div className="lbl">Sobre nós</div>
                            <h2 className="sec-title">
                                Quem
                                <br />
                                somos
                            </h2>
                            <p className="body">
                                A <strong>Nihil Labs</strong> é uma empresa de tecnologia
                                construída sobre a crença de que{' '}
                                <strong>excelência de engenharia</strong> e visão estratégica são
                                inseparáveis.
                                <br />
                                <br />
                                Atuamos da concepção ao deploy — com um time enxuto,
                                multidisciplinar e obcecado por qualidade. Sem ruído. Sem
                                atalhos.
                            </p>
                        </div>

                        <div className="stats">
                            <div>
                                <div className="stat-n">
                                    40<sup>+</sup>
                                </div>
                                <div className="stat-l">Projetos entregues</div>
                                <div className="stat-hr" />
                            </div>
                            <div>
                                <div className="stat-n">
                                    98<sup>%</sup>
                                </div>
                                <div className="stat-l">Taxa de satisfação</div>
                                <div className="stat-hr" />
                            </div>
                            <div>
                                <div className="stat-n">
                                    12<sup>+</sup>
                                </div>
                                <div className="stat-l">Especialistas</div>
                                <div className="stat-hr" />
                            </div>
                        </div>
                    </div>
                </Section>

                <Section id="s2" estado={obterEstadoSecao(2)}>
                    <div className="bg-lines" />
                    <div className="c tl" />
                    <div className="c br" />

                    <div className="srv-wrap">
                        <div className="sec-head">
                            <div>
                                <div className="lbl">O que fazemos</div>
                                <div className="ttl">Serviços</div>
                            </div>
                            <div className="ghost-n">06</div>
                        </div>

                        <div className="cards">
                            {[
                                {
                                    n: '01',
                                    t: 'Desenvolvimento de Software',
                                    d: 'Sistemas web e mobile robustos, escaláveis e de alta performance.',
                                },
                                {
                                    n: '02',
                                    t: 'Inteligência Artificial',
                                    d: 'Automação inteligente, modelos preditivos e LLMs aplicados ao negócio.',
                                },
                                {
                                    n: '03',
                                    t: 'Cloud & Infraestrutura',
                                    d: 'Arquitetura em nuvem, DevOps e sistemas de alta disponibilidade.',
                                },
                                {
                                    n: '04',
                                    t: 'Data Engineering',
                                    d: 'Pipelines de dados, analytics e dashboards para decisões em tempo real.',
                                },
                                {
                                    n: '05',
                                    t: 'Segurança Digital',
                                    d: 'Pentest, auditorias e compliance para proteger seus ativos digitais.',
                                },
                                {
                                    n: '06',
                                    t: 'Consultoria Tech',
                                    d: 'Estratégia tecnológica, arquitetura de sistemas e roadmap de produto.',
                                },
                            ].map((item) => (
                                <div className="card" key={item.n}>
                                    <div className="card-n">{item.n}</div>
                                    <div className="card-t">{item.t}</div>
                                    <div className="card-d">{item.d}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                <Section id="s3" estado={obterEstadoSecao(3)}>
                    <div className="bg-lines" />
                    <div className="c tl" />
                    <div className="c br" />

                    <div className="proj-wrap">
                        <div className="sec-head">
                            <div>
                                <div className="lbl">Cases selecionados</div>
                                <div className="ttl">Projetos</div>
                            </div>
                            <div className="ghost-n">04</div>
                        </div>

                        <div className="proj-list">
                            {[
                                {
                                    n: '001',
                                    name: 'Nexus Platform',
                                    sub: 'Plataforma SaaS B2B',
                                    tags: ['AI', 'React'],
                                    year: '2024',
                                },
                                {
                                    n: '002',
                                    name: 'Vórtex Analytics',
                                    sub: 'Dashboard de dados em tempo real',
                                    tags: ['Data', 'Cloud'],
                                    year: '2024',
                                },
                                {
                                    n: '003',
                                    name: 'Cipher Security',
                                    sub: 'Monitoramento e resposta a incidentes',
                                    tags: ['Security', 'API'],
                                    year: '2025',
                                },
                                {
                                    n: '004',
                                    name: 'Aether Infra',
                                    sub: 'Migração e arquitetura cloud-native',
                                    tags: ['AWS', 'DevOps'],
                                    year: '2025',
                                },
                            ].map((project) => (
                                <div className="pr" key={project.n}>
                                    <div className="pn">{project.n}</div>
                                    <div>
                                        <div className="pm">{project.name}</div>
                                        <div className="ps">{project.sub}</div>
                                    </div>
                                    <div className="pt">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="ptg">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="py">{project.year}</div>
                                    <div className="pa">→</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                <Section id="s4" estado={obterEstadoSecao(4)}>
                    <div className="bg-lines" />
                    <div className="c tl" />
                    <div className="c tr" />
                    <div className="c bl" />
                    <div className="c br" />

                    <div className="ct-wrap">
                        <span className="lbl">Fale conosco</span>
                        <h2 className="ct-title">
                            Vamos
                            <span className="outline">construir</span>
                        </h2>
                        <p className="ct-sub">
                            Tem um projeto em mente? Startup ou grande empresa — estamos
                            prontos para o próximo nível.
                        </p>

                        <div className="btn-row">
                            <a href="mailto:contato@nihillabs.com.br" className="btn btn-p">
                                Iniciar projeto
                            </a>
                            <a href="#" className="btn btn-g">
                                Ver LinkedIn
                            </a>
                        </div>

                        <div className="ct-mail">contato@nihillabs.br</div>
                    </div>
                </Section>
            </div>

            <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --cream: #e8e0d0;
          --cream-dim: #b8ad9e;
          --cream-line: rgba(232, 224, 208, 0.1);
          --black: #080806;
          --black-2: #0e0e0b;
          --black-3: #111110;
          --accent: #c9b99a;
          --muted: #6a6458;
        }

        html,
        body {
          width: 100%;
          height: 100%;
          background: var(--black);
          color: var(--cream);
          font-family: var(--font-roboto), sans-serif;
          overflow: hidden;
          cursor: none;
        }

        .page-root {
          width: 100%;
          height: 100%;
          background: var(--black);
        }

        #cursor {
          position: fixed;
          width: 8px;
          height: 8px;
          background: var(--cream);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
        }

        #cursor-ring {
          position: fixed;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(232, 224, 208, 0.22);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
        }

        #viewport {
          position: fixed;
          inset: 0;
          perspective: 1400px;
          perspective-origin: 50% 50%;
          overflow: hidden;
        }

        .section {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transform-origin: center center;
          will-change: transform, opacity, filter;
          transform: translateZ(-520px) scale(0.56);
          filter: blur(4px);
          backface-visibility: hidden;
        }

        .section-ativa {
          opacity: 1;
          pointer-events: all;
          transform: translateZ(0) scale(1);
          filter: blur(0);
          z-index: 3;
        }

        .section-entrando {
          pointer-events: none;
          z-index: 4;
          animation: portalIn 0.86s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .section-saindo {
          pointer-events: none;
          z-index: 2;
          animation: portalOut 0.86s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .section-oculta {
          opacity: 0;
          pointer-events: none;
          transform: translateZ(-520px) scale(0.56);
          filter: blur(4px);
          z-index: 1;
        }

        @keyframes portalIn {
          0% {
            opacity: 0;
            transform: translateZ(-560px) scale(0.5);
            filter: blur(6px);
          }

          55% {
            opacity: 0.74;
          }

          100% {
            opacity: 1;
            transform: translateZ(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes portalOut {
          0% {
            opacity: 1;
            transform: translateZ(0) scale(1);
            filter: blur(0);
          }

          100% {
            opacity: 0;
            transform: translateZ(-680px) scale(0.42);
            filter: blur(6px);
          }
        }

        #noise {
          position: fixed;
          inset: 0;
          z-index: 100;
          pointer-events: none;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }

        #fixed-logo {
          position: fixed;
          top: 36px;
          left: 44px;
          z-index: 200;
          font-weight: 300;
          font-size: 14px;
          letter-spacing: 0.5em;
          color: var(--cream);
          text-transform: uppercase;
        }

        #fixed-logo strong {
          font-weight: 700;
        }

        #nav-dots {
          position: fixed;
          right: 36px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 200;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--muted);
          border: none;
          outline: none;
          cursor: none;
          transition: background 0.3s, height 0.3s, border-radius 0.3s;
        }

        .dot.active {
          background: var(--cream);
          height: 18px;
          border-radius: 2px;
        }

        #sec-counter {
          position: fixed;
          left: 44px;
          bottom: 40px;
          z-index: 200;
          font-family: var(--font-roboto-mono), monospace;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.3em;
          color: var(--muted);
        }

        #sec-counter em {
          color: var(--cream-dim);
          font-style: normal;
        }

        #scroll-hint {
          position: fixed;
          right: 44px;
          bottom: 40px;
          z-index: 200;
          font-family: var(--font-roboto-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.35em;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 10px;
          text-transform: uppercase;
        }

        #scroll-hint::before {
          content: '';
          width: 18px;
          height: 1px;
          background: var(--accent);
          opacity: 0.45;
        }

        .bg-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(232, 224, 208, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232, 224, 208, 0.025) 1px, transparent 1px);
          background-size: 100px 100px;
        }

        .c {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          width: 28px;
          height: 28px;
        }

        .c.tl {
          top: 44px;
          left: 44px;
          border-top: 1px solid var(--cream-line);
          border-left: 1px solid var(--cream-line);
        }

        .c.tr {
          top: 44px;
          right: 44px;
          border-top: 1px solid var(--cream-line);
          border-right: 1px solid var(--cream-line);
        }

        .c.bl {
          bottom: 44px;
          left: 44px;
          border-bottom: 1px solid var(--cream-line);
          border-left: 1px solid var(--cream-line);
        }

        .c.br {
          bottom: 44px;
          right: 44px;
          border-bottom: 1px solid var(--cream-line);
          border-right: 1px solid var(--cream-line);
        }

        .lbl {
          font-family: var(--font-roboto-mono), monospace;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.5em;
          color: var(--accent);
          text-transform: uppercase;
        }

        #s0 {
          background: var(--black);
        }

        .hero-wrap {
          position: relative;
          z-index: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-tag {
          font-family: var(--font-roboto-mono), monospace;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.5em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 44px;
        }

        .hero-name {
          font-size: clamp(80px, 14vw, 190px);
          font-weight: 900;
          letter-spacing: -0.015em;
          line-height: 0.92;
          color: var(--cream);
        }

        .hero-name .thin {
          font-weight: 100;
          color: var(--cream-dim);
          display: block;
        }

        .hero-div {
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          margin: 36px auto;
          opacity: 0.5;
        }

        .hero-sub {
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: var(--muted);
          text-transform: uppercase;
          max-width: 340px;
          line-height: 1.9;
        }

        .hero-ghost {
          position: absolute;
          bottom: -110px;
          right: -60px;
          font-size: 150px;
          font-weight: 900;
          color: rgba(232, 224, 208, 0.025);
          line-height: 1;
          letter-spacing: -0.04em;
          pointer-events: none;
          user-select: none;
        }

        #s1 {
          background: var(--black-2);
        }

        .sobre-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 110px;
          max-width: 1080px;
          width: 90%;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .sec-title {
          font-size: clamp(40px, 5vw, 66px);
          font-weight: 700;
          letter-spacing: -0.015em;
          line-height: 1.05;
          color: var(--cream);
          margin: 16px 0 28px;
        }

        .body {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.95;
          color: var(--muted);
        }

        .body strong {
          color: var(--cream-dim);
          font-weight: 400;
        }

        .stats {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .stat-n {
          font-size: clamp(52px, 6vw, 78px);
          font-weight: 100;
          color: var(--cream);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .stat-n sup {
          font-size: 0.38em;
          font-weight: 300;
          color: var(--accent);
          vertical-align: super;
        }

        .stat-l {
          font-family: var(--font-roboto-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.35em;
          color: var(--muted);
          text-transform: uppercase;
          margin-top: 5px;
        }

        .stat-hr {
          width: 28px;
          height: 1px;
          background: var(--accent);
          opacity: 0.3;
          margin-top: 9px;
        }

        #s2 {
          background: var(--black);
        }

        .srv-wrap {
          max-width: 1080px;
          width: 90%;
          position: relative;
          z-index: 2;
        }

        .sec-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--cream-line);
          margin-bottom: 44px;
        }

        .sec-head .ttl {
          font-size: clamp(36px, 4.5vw, 56px);
          font-weight: 700;
          letter-spacing: -0.015em;
          color: var(--cream);
          margin-top: 10px;
        }

        .ghost-n {
          font-size: 80px;
          font-weight: 900;
          color: rgba(232, 224, 208, 0.04);
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--cream-line);
          border: 1px solid var(--cream-line);
        }

        .card {
          background: var(--black);
          padding: 30px 26px;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }

        .card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0;
          transition: opacity 0.35s;
        }

        .card:hover {
          background: rgba(232, 224, 208, 0.02);
        }

        .card:hover::after {
          opacity: 1;
        }

        .card-n {
          font-family: var(--font-roboto-mono), monospace;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.3em;
          color: var(--muted);
          margin-bottom: 28px;
        }

        .card-t {
          font-size: 14px;
          font-weight: 500;
          color: var(--cream);
          letter-spacing: 0.01em;
          margin-bottom: 10px;
        }

        .card-d {
          font-size: 12px;
          font-weight: 300;
          line-height: 1.75;
          color: var(--muted);
        }

        #s3 {
          background: var(--black-3);
        }

        .proj-wrap {
          max-width: 1080px;
          width: 90%;
          position: relative;
          z-index: 2;
        }

        .proj-list {
          display: flex;
          flex-direction: column;
        }

        .pr {
          display: grid;
          grid-template-columns: 52px 1fr auto 76px 20px;
          align-items: center;
          gap: 24px;
          padding: 20px 0;
          border-bottom: 1px solid var(--cream-line);
          transition: padding-left 0.3s;
        }

        .pr:first-child {
          border-top: 1px solid var(--cream-line);
        }

        .pr:hover {
          padding-left: 12px;
        }

        .pr:hover .pn {
          color: var(--accent);
        }

        .pr:hover .pa {
          color: var(--accent);
          transform: translateX(4px);
        }

        .pn {
          font-family: var(--font-roboto-mono), monospace;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: var(--muted);
          transition: color 0.3s;
        }

        .pm {
          font-size: 20px;
          font-weight: 500;
          color: var(--cream);
          letter-spacing: 0.01em;
          line-height: 1;
        }

        .ps {
          font-size: 11px;
          font-weight: 300;
          color: var(--muted);
          letter-spacing: 0.07em;
          margin-top: 3px;
        }

        .pt {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .ptg {
          font-family: var(--font-roboto-mono), monospace;
          font-size: 8px;
          letter-spacing: 0.18em;
          padding: 3px 8px;
          border: 1px solid rgba(201, 185, 154, 0.18);
          color: var(--accent);
          text-transform: uppercase;
          border-radius: 1px;
        }

        .py {
          font-family: var(--font-roboto-mono), monospace;
          font-size: 10px;
          font-weight: 300;
          color: var(--muted);
          letter-spacing: 0.1em;
          text-align: right;
        }

        .pa {
          font-size: 12px;
          color: var(--muted);
          transition: transform 0.3s, color 0.3s;
        }

        #s4 {
          background: var(--black-2);
        }

        .ct-wrap {
          text-align: center;
          max-width: 660px;
          width: 90%;
          position: relative;
          z-index: 2;
        }

        .ct-wrap .lbl {
          display: block;
          margin-bottom: 26px;
        }

        .ct-title {
          font-size: clamp(60px, 10vw, 118px);
          font-weight: 900;
          line-height: 0.93;
          letter-spacing: -0.02em;
          color: var(--cream);
          margin-bottom: 10px;
        }

        .ct-title .outline {
          font-weight: 100;
          -webkit-text-stroke: 1px rgba(232, 224, 208, 0.28);
          color: transparent;
          display: block;
        }

        .ct-sub {
          font-size: 13px;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.9;
          max-width: 420px;
          margin: 28px auto 44px;
          letter-spacing: 0.02em;
        }

        .btn-row {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          font-family: var(--font-roboto), sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          padding: 14px 34px;
          text-decoration: none;
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }

        .btn-p {
          background: var(--cream);
          color: var(--black);
          border: 1px solid var(--cream);
        }

        .btn-p:hover {
          background: transparent;
          color: var(--cream);
        }

        .btn-g {
          background: transparent;
          color: var(--cream-dim);
          border: 1px solid var(--cream-line);
        }

        .btn-g:hover {
          border-color: var(--cream-dim);
          color: var(--cream);
        }

        .ct-mail {
          margin-top: 36px;
          font-family: var(--font-roboto-mono), monospace;
          font-size: 11px;
          font-weight: 300;
          color: var(--muted);
          letter-spacing: 0.12em;
        }

        @media (max-width: 980px) {
          .sobre-wrap {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .cards {
            grid-template-columns: 1fr;
          }

          .pr {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .pt,
          .py {
            justify-content: flex-start;
            text-align: left;
          }

          .hero-ghost {
            display: none;
          }
        }

        @media (max-width: 768px) {
          #fixed-logo,
          #sec-counter {
            left: 20px;
          }

          #nav-dots,
          #scroll-hint {
            right: 20px;
          }

          .c.tl,
          .c.tr {
            top: 20px;
          }

          .c.bl,
          .c.br {
            bottom: 20px;
          }

          .c.tl,
          .c.bl {
            left: 20px;
          }

          .c.tr,
          .c.br {
            right: 20px;
          }

          html,
          body {
            cursor: auto;
          }

          #cursor,
          #cursor-ring {
            display: none;
          }
        }
      `}</style>
        </main>
    );
}

function Section({
    id,
    estado,
    children,
}: {
    id: string;
    estado: EstadoSecao;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className={`section section-${estado}`}>
            {children}
        </section>
    );
}