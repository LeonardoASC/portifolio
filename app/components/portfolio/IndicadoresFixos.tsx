type IndicadoresFixosProps = {
    indiceAtual: number;
    totalSecoes: number;
};

export function IndicadoresFixos({ indiceAtual, totalSecoes }: IndicadoresFixosProps) {
    return (
        <>
            <div className="fixed bottom-5 left-5 z-[200] font-mono text-[9px] font-light tracking-[0.3em] text-[#6a6458] md:bottom-10 md:left-11">
                <em className="not-italic text-[#b8ad9e]">
                    {String(indiceAtual + 1).padStart(2, '0')}
                </em>{' '}
                — {String(totalSecoes).padStart(2, '0')}
            </div>

            <div className="fixed bottom-10 right-11 z-[200] hidden items-center gap-2.5 font-mono text-[9px] tracking-[0.35em] text-[#6a6458] uppercase md:flex">
                <span className="h-px w-[18px] bg-[#c9b99a]/45" />
                Scroll
            </div>

            <div className="fixed bottom-14 right-1/2 z-[200] -translate-x-1/2 font-mono text-[9px] tracking-[0.24em] text-[#6a6458] uppercase md:hidden">
                Swipe
            </div>
        </>
    );
}
