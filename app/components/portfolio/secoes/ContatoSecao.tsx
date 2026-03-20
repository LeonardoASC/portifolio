import type { EstadoSecao } from '../dados';
import { SecaoPortfolio } from '../SecaoPortfolio';

type ContatoSecaoProps = {
    estado: EstadoSecao;
};

export function ContatoSecao({ estado }: ContatoSecaoProps) {
    return (
        <SecaoPortfolio id="s4" estado={estado} classeFundo="bg-[#0e0e0b]">
            <div className="relative z-[2] w-[92%] max-w-[660px] px-2 text-center">
                <span className="mb-6 block font-mono text-[9px] font-light tracking-[0.45em] text-[#c9b99a] uppercase">
                    Fale conosco
                </span>

                <h2 className="mb-2 text-[clamp(3rem,14vw,7.4rem)] leading-[0.93] font-black tracking-[-0.02em] text-[#e8e0d0]">
                    Vamos
                    <span className="block font-thin text-transparent [text-stroke:1px_rgba(232,224,208,0.28)] [-webkit-text-stroke:1px_rgba(232,224,208,0.28)]">
                        construir
                    </span>
                </h2>

                <p className="mx-auto mt-5 mb-8 max-w-[420px] text-[12px] leading-7 font-light tracking-[0.02em] text-[#6a6458] sm:mt-7 sm:mb-11 sm:text-[13px] sm:leading-[1.9]">
                    Tem um projeto em mente? Startup ou grande empresa — estamos prontos
                    para o próximo nível.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-3.5">
                    <a
                        href="mailto:contato@nihillabs.com.br"
                        className="border border-[#e8e0d0] bg-[#e8e0d0] px-8 py-3.5 text-center text-[9px] font-medium tracking-[0.3em] text-[#080806] uppercase transition-colors duration-300 hover:bg-transparent hover:text-[#e8e0d0] sm:px-9"
                    >
                        Iniciar projeto
                    </a>
                    <a
                        href="#"
                        className="border border-[#e8e0d0]/10 bg-transparent px-8 py-3.5 text-center text-[9px] font-medium tracking-[0.3em] text-[#b8ad9e] uppercase transition-colors duration-300 hover:border-[#b8ad9e] hover:text-[#e8e0d0] sm:px-9"
                    >
                        Ver LinkedIn
                    </a>
                </div>

                <div className="mt-8 break-all font-mono text-[10px] font-light tracking-[0.11em] text-[#6a6458] sm:mt-9 sm:text-[11px] sm:tracking-[0.12em]">
                    contato@nihillabs.br
                </div>
            </div>
        </SecaoPortfolio>
    );
}
