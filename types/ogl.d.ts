declare module 'ogl' {
    export class Renderer {
        constructor(options?: { dpr?: number; alpha?: boolean });
        dpr: number;
        gl: WebGLRenderingContext & {
            canvas: HTMLCanvasElement;
            getExtension(name: string): { loseContext?: () => void } | null;
        };
        setSize(width: number, height: number): void;
        render(options: { scene: Mesh }): void;
    }

    export class Program {
        constructor(
            gl: WebGLRenderingContext,
            options: {
                vertex: string;
                fragment: string;
                uniforms?: unknown;
            },
        );
    }

    export class Triangle {
        constructor(gl: WebGLRenderingContext);
    }

    export class Mesh {
        constructor(
            gl: WebGLRenderingContext,
            options: { geometry: Triangle; program: Program },
        );
    }
}
