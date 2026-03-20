'use client';

import { useEffect, useRef } from 'react';

export function CursorPersonalizado() {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const anelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const anel = anelRef.current;

        if (!cursor || !anel) return;

        let mouseX = 0;
        let mouseY = 0;
        let anelX = 0;
        let anelY = 0;
        let quadro = 0;

        const aoMoverMouse = (evento: MouseEvent) => {
            mouseX = evento.clientX;
            mouseY = evento.clientY;
        };

        const animar = () => {
            anelX += (mouseX - anelX) * 0.1;
            anelY += (mouseY - anelY) * 0.1;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
            anel.style.left = `${anelX}px`;
            anel.style.top = `${anelY}px`;

            quadro = requestAnimationFrame(animar);
        };

        document.addEventListener('mousemove', aoMoverMouse);
        animar();

        return () => {
            document.removeEventListener('mousemove', aoMoverMouse);
            cancelAnimationFrame(quadro);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="pointer-events-none fixed z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8e0d0] md:block"
            />
            <div
                ref={anelRef}
                className="pointer-events-none fixed z-[9998] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e8e0d0]/20 md:block"
            />
        </>
    );
}
