"use client";

interface Particle {
    id: number;
    left: number;
    top: number;
    duration: number;
}

export default function PaginaInicial() {
    const particles: Particle[] = Array.from({ length: 8 }, (_, index) => {
        const sequence = index + 1;

        return {
            id: index,
            left: (sequence * 17.5) % 100,
            top: (sequence * 23.5) % 100,
            duration: 3 + (sequence % 5) * 0.45,
        };
    });

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-20 text-foreground">
            {/* Background animado com gradientes e malha */}
            <div className="pointer-events-none absolute inset-0">
                {/* Camada de fundo com gradiente */}
                <div className="absolute inset-0 bg-linear-to-b from-foreground/5 via-background to-background" />

                {/* Glows animados no background */}
                <div className="animate-orbitSlow absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-foreground/8 blur-3xl" />
                <div className="animate-orbitMedium absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-foreground/10 blur-3xl" />
                <div className="animate-orbitFast absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-foreground/6 blur-3xl" />

                {/* Grid animado */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[56px_56px] opacity-[0.04]" />

                {/* Linha de varredura horizontal */}
                <div className="absolute left-0 top-1/3 h-px w-full animate-scan bg-linear-to-r from-transparent via-foreground/40 to-transparent" />
            </div>

            {/* Partículas flutuantes */}
            <div className="pointer-events-none absolute inset-0">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="animate-float absolute h-1 w-1 rounded-full bg-foreground/30"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            animationDelay: `${particle.id * 0.3}s`,
                            animationDuration: `${particle.duration}s`,
                        }}
                    />
                ))}
            </div>

            {/* Painel principal com animação */}
            <div
                className="animate-fadeInUp animate-glowPulse relative w-full max-w-5xl border border-foreground/30 bg-background/60 p-10 backdrop-blur-xl sm:p-14"
                style={{
                    borderRadius: "8px",
                }}
            >
                {/* Label superior */}
                <p
                    className="mb-8 inline-flex items-center gap-3 border border-foreground/40 px-4 py-2 text-xs font-mono uppercase tracking-[0.35em] text-foreground/90 animate-fadeInUp"
                    style={{
                        animationDelay: "0.1s",
                    }}
                >
                    <span className="animate-pulseBright h-2 w-2 rounded-full bg-foreground" />
                    Nihil Labs
                </p>

                {/* Título principal */}
                <h1
                    className="animate-fadeInUp text-5xl font-black uppercase tracking-[0.25em] sm:text-7xl leading-tight"
                    style={{
                        animationDelay: "0.2s",
                        letterSpacing: "0.25em",
                    }}
                >
                    NIHIL
                    <br className="hidden sm:block" />
                    LABS
                </h1>

                {/* Descrição */}
                <p
                    className="animate-fadeInUp mt-8 max-w-2xl text-base leading-8 text-foreground/80 sm:text-xl"
                    style={{
                        animationDelay: "0.3s",
                    }}
                >
                    Arquitetamos experiências digitais com estética de laboratório
                    avançado, precisão de engenharia e visão de futuro.
                </p>

                {/* Linha divisória com animação */}
                <div
                    className="animate-fadeInUp mt-10 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-foreground/60"
                    style={{
                        animationDelay: "0.4s",
                    }}
                >
                    <span className="relative">
                        Future Protocol
                        <span
                            className="animate-scan absolute bottom-0 left-0 h-px w-full bg-foreground/50"
                            style={{
                                animationDuration: "3s",
                            }}
                        />
                    </span>
                    <span className="h-px flex-1 bg-foreground/20" />
                    <span>2026</span>
                </div>
            </div>
        </section>
    );
}
