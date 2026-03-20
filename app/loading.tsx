export default function Loading() {
    return (
        <main className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-[#080806] text-[#e8e0d0]">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(232,224,208,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,224,208,0.03) 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                }}
            />

            <div className="relative flex w-[min(88vw,420px)] flex-col items-center text-center">
                <div className="mb-3 text-[14px] font-light tracking-[0.5em] text-[#e8e0d0] uppercase">
                    <strong className="font-bold">NIHIL</strong> LABS
                </div>

                <div className="mb-5 font-mono text-[9px] tracking-[0.3em] text-[#ffffff] uppercase">
                    Carregando experiência
                </div>

                <div className="relative h-px w-full overflow-hidden bg-[#e8e0d0]/15">
                    <div className="absolute inset-y-0 left-[-40%] w-[40%] bg-linear-to-r from-transparent via-[#c9b99a] to-transparent animate-scan" />
                </div>
            </div>
        </main>
    );
}