'use client';

import { useEffect, useRef, useState } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';

export type OrigemRaios =
    | 'top-center'
    | 'top-left'
    | 'top-right'
    | 'right'
    | 'left'
    | 'bottom-center'
    | 'bottom-right'
    | 'bottom-left';

type Vetor2 = [number, number];
type Vetor3 = [number, number, number];

interface Uniforms {
    iTime: { value: number };
    iResolution: { value: Vetor2 };
    rayPos: { value: Vetor2 };
    rayDir: { value: Vetor2 };
    raysColor: { value: Vetor3 };
    raysSpeed: { value: number };
    lightSpread: { value: number };
    rayLength: { value: number };
    pulsating: { value: number };
    fadeDistance: { value: number };
    saturation: { value: number };
    mousePos: { value: Vetor2 };
    mouseInfluence: { value: number };
    noiseAmount: { value: number };
    distortion: { value: number };
}

interface LightRaysProps {
    raysOrigin?: OrigemRaios;
    raysColor?: string;
    raysSpeed?: number;
    lightSpread?: number;
    rayLength?: number;
    pulsating?: boolean;
    fadeDistance?: number;
    saturation?: number;
    followMouse?: boolean;
    mouseInfluence?: number;
    noiseAmount?: number;
    distortion?: number;
    className?: string;
}

const COR_PADRAO = '#ffffff';

const hexParaRgb = (hex: string): [number, number, number] => {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return match
        ? [
            Number.parseInt(match[1], 16) / 255,
            Number.parseInt(match[2], 16) / 255,
            Number.parseInt(match[3], 16) / 255,
        ]
        : [1, 1, 1];
};

const obterAncoraEDirecao = (
    origem: OrigemRaios,
    largura: number,
    altura: number,
): { anchor: [number, number]; dir: [number, number] } => {
    const foraTela = 0.2;

    switch (origem) {
        case 'top-left':
            return { anchor: [0, -foraTela * altura], dir: [0, 1] };
        case 'top-right':
            return { anchor: [largura, -foraTela * altura], dir: [0, 1] };
        case 'left':
            return { anchor: [-foraTela * largura, 0.5 * altura], dir: [1, 0] };
        case 'right':
            return { anchor: [(1 + foraTela) * largura, 0.5 * altura], dir: [-1, 0] };
        case 'bottom-left':
            return { anchor: [0, (1 + foraTela) * altura], dir: [0, -1] };
        case 'bottom-center':
            return { anchor: [0.5 * largura, (1 + foraTela) * altura], dir: [0, -1] };
        case 'bottom-right':
            return { anchor: [largura, (1 + foraTela) * altura], dir: [0, -1] };
        default:
            return { anchor: [0.5 * largura, -foraTela * altura], dir: [0, 1] };
    }
};

const LightRays = ({
    raysOrigin = 'top-center',
    raysColor = COR_PADRAO,
    raysSpeed = 1,
    lightSpread = 1,
    rayLength = 2,
    pulsating = false,
    fadeDistance = 1,
    saturation = 1,
    followMouse = true,
    mouseInfluence = 0.1,
    noiseAmount = 0,
    distortion = 0,
    className = '',
}: LightRaysProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const uniformsRef = useRef<Uniforms | null>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const mouseSuaveRef = useRef({ x: 0.5, y: 0.5 });
    const frameRef = useRef<number | null>(null);
    const meshRef = useRef<Mesh | null>(null);
    const limpezaRef = useRef<(() => void) | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                setVisivel(entry.isIntersecting);
            },
            { threshold: 0.1 },
        );

        observerRef.current.observe(containerRef.current);

        return () => {
            observerRef.current?.disconnect();
            observerRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!visivel || !containerRef.current) return;

        limpezaRef.current?.();
        limpezaRef.current = null;

        const inicializarWebGL = async () => {
            if (!containerRef.current) return;

            await new Promise((resolve) => setTimeout(resolve, 10));
            if (!containerRef.current) return;

            const renderer = new Renderer({
                dpr: Math.min(window.devicePixelRatio, 2),
                alpha: true,
            });
            rendererRef.current = renderer;

            const gl = renderer.gl;
            gl.canvas.style.width = '100%';
            gl.canvas.style.height = '100%';

            while (containerRef.current.firstChild) {
                containerRef.current.removeChild(containerRef.current.firstChild);
            }
            containerRef.current.appendChild(gl.canvas);

            const vertexShader = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

            const fragmentShader = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`;

            const uniforms: Uniforms = {
                iTime: { value: 0 },
                iResolution: { value: [1, 1] },
                rayPos: { value: [0, 0] },
                rayDir: { value: [0, 1] },
                raysColor: { value: hexParaRgb(raysColor) },
                raysSpeed: { value: raysSpeed },
                lightSpread: { value: lightSpread },
                rayLength: { value: rayLength },
                pulsating: { value: pulsating ? 1 : 0 },
                fadeDistance: { value: fadeDistance },
                saturation: { value: saturation },
                mousePos: { value: [0.5, 0.5] },
                mouseInfluence: { value: mouseInfluence },
                noiseAmount: { value: noiseAmount },
                distortion: { value: distortion },
            };
            uniformsRef.current = uniforms;

            const geometry = new Triangle(gl);
            const program = new Program(gl, {
                vertex: vertexShader,
                fragment: fragmentShader,
                uniforms,
            });
            const mesh = new Mesh(gl, { geometry, program });
            meshRef.current = mesh;

            const atualizarPosicionamento = () => {
                if (!containerRef.current) return;

                renderer.dpr = Math.min(window.devicePixelRatio, 2);

                const { clientWidth, clientHeight } = containerRef.current;
                renderer.setSize(clientWidth, clientHeight);

                const dpr = renderer.dpr;
                const largura = clientWidth * dpr;
                const altura = clientHeight * dpr;

                uniforms.iResolution.value = [largura, altura];

                const { anchor, dir } = obterAncoraEDirecao(raysOrigin, largura, altura);
                uniforms.rayPos.value = anchor;
                uniforms.rayDir.value = dir;
            };

            const loop = (tempo: number) => {
                if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;

                uniforms.iTime.value = tempo * 0.001;

                if (followMouse && mouseInfluence > 0) {
                    const suavizacao = 0.92;

                    mouseSuaveRef.current.x =
                        mouseSuaveRef.current.x * suavizacao + mouseRef.current.x * (1 - suavizacao);
                    mouseSuaveRef.current.y =
                        mouseSuaveRef.current.y * suavizacao + mouseRef.current.y * (1 - suavizacao);

                    uniforms.mousePos.value = [mouseSuaveRef.current.x, mouseSuaveRef.current.y];
                }

                try {
                    renderer.render({ scene: mesh });
                    frameRef.current = requestAnimationFrame(loop);
                } catch {
                    return;
                }
            };

            window.addEventListener('resize', atualizarPosicionamento);
            atualizarPosicionamento();
            frameRef.current = requestAnimationFrame(loop);

            limpezaRef.current = () => {
                if (frameRef.current) {
                    cancelAnimationFrame(frameRef.current);
                    frameRef.current = null;
                }

                window.removeEventListener('resize', atualizarPosicionamento);

                try {
                    const canvas = renderer.gl.canvas;
                    const perderContexto = renderer.gl.getExtension('WEBGL_lose_context');
                    perderContexto?.loseContext();

                    if (canvas && canvas.parentNode) {
                        canvas.parentNode.removeChild(canvas);
                    }
                } catch {
                    // noop
                }

                rendererRef.current = null;
                uniformsRef.current = null;
                meshRef.current = null;
            };
        };

        inicializarWebGL();

        return () => {
            limpezaRef.current?.();
            limpezaRef.current = null;
        };
    }, [
        visivel,
        raysOrigin,
        raysColor,
        raysSpeed,
        lightSpread,
        rayLength,
        pulsating,
        fadeDistance,
        saturation,
        followMouse,
        mouseInfluence,
        noiseAmount,
        distortion,
    ]);

    useEffect(() => {
        if (!uniformsRef.current || !containerRef.current || !rendererRef.current) return;

        const u = uniformsRef.current;
        const renderer = rendererRef.current;

        u.raysColor.value = hexParaRgb(raysColor);
        u.raysSpeed.value = raysSpeed;
        u.lightSpread.value = lightSpread;
        u.rayLength.value = rayLength;
        u.pulsating.value = pulsating ? 1 : 0;
        u.fadeDistance.value = fadeDistance;
        u.saturation.value = saturation;
        u.mouseInfluence.value = mouseInfluence;
        u.noiseAmount.value = noiseAmount;
        u.distortion.value = distortion;

        const { clientWidth, clientHeight } = containerRef.current;
        const dpr = renderer.dpr;
        const { anchor, dir } = obterAncoraEDirecao(raysOrigin, clientWidth * dpr, clientHeight * dpr);
        u.rayPos.value = anchor;
        u.rayDir.value = dir;
    }, [
        raysColor,
        raysSpeed,
        lightSpread,
        raysOrigin,
        rayLength,
        pulsating,
        fadeDistance,
        saturation,
        mouseInfluence,
        noiseAmount,
        distortion,
    ]);

    useEffect(() => {
        const aoMoverMouse = (evento: MouseEvent) => {
            if (!containerRef.current || !rendererRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = (evento.clientX - rect.left) / rect.width;
            const y = (evento.clientY - rect.top) / rect.height;
            mouseRef.current = { x, y };
        };

        if (followMouse) {
            window.addEventListener('mousemove', aoMoverMouse);

            return () => {
                window.removeEventListener('mousemove', aoMoverMouse);
            };
        }
    }, [followMouse]);

    return (
        <div
            ref={containerRef}
            className={`pointer-events-none relative z-3 h-full w-full overflow-hidden ${className}`.trim()}
        />
    );
};

export default LightRays;
