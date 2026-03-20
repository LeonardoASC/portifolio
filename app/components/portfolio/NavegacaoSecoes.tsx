type NavegacaoSecoesProps = {
    totalSecoes: number;
    indiceAtual: number;
    aoSelecionar: (indice: number) => void;
};

export function NavegacaoSecoes({ totalSecoes, indiceAtual, aoSelecionar }: NavegacaoSecoesProps) {
    return (
        <div className="fixed right-5 top-1/2 z-[200] flex -translate-y-1/2 flex-col gap-3 max-md:bottom-5 max-md:right-1/2 max-md:top-auto max-md:w-max max-md:translate-y-0 max-md:translate-x-1/2 max-md:flex-row md:right-9">
            {Array.from({ length: totalSecoes }).map((_, indice) => {
                const ativa = indiceAtual === indice;

                return (
                    <button
                        key={indice}
                        type="button"
                        onClick={() => aoSelecionar(indice)}
                        aria-label={`Ir para seção ${indice + 1}`}
                        className={`border-none outline-none transition-all duration-300 ${ativa
                            ? 'h-[18px] w-[3px] rounded-[2px] bg-[#e8e0d0] max-md:h-[3px] max-md:w-6'
                            : 'h-[3px] w-[3px] rounded-full bg-[#6a6458] hover:bg-[#b8ad9e] max-md:w-4'
                            }`}
                    />
                );
            })}
        </div>
    );
}
