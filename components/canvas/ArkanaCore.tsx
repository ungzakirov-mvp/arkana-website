"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { arkanaCoreState } from "@/lib/arkana-state";

// ─── Constants ────────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 2800;
const SPHERE_RADIUS = 2.6;
const ACCENT_RATIO = 0.07; // 7% electric-blue accent particles

// ─── Vertex shader ────────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  uniform float uSize;
  uniform float uTime;
  uniform float uStretch;
  attribute float aScale;
  attribute vec3 aColor;
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    vec3 pos = position;
    pos *= 1.0 + uStretch * 1.8;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;

    // Size — slightly larger for better visibility on dark bg
    gl_PointSize = uSize * aScale * (6.0 / -mvPos.z);

    // Depth-based alpha — front particles brighter
    float normDepth = clamp((pos.z + 2.6) / (2.6 * 2.0), 0.0, 1.0);
    vAlpha = 0.25 + 0.75 * normDepth;
  }
`;

// ─── Fragment shader ──────────────────────────────────────────────────────────

const fragmentShader = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vec2  uv   = gl_PointCoord - 0.5;
    float dist = length(uv) * 2.0;
    if (dist > 1.0) discard;

    float strength = 1.0 - smoothstep(0.0, 1.0, dist);
    strength = pow(strength, 1.0);

    gl_FragColor = vec4(vColor, strength * vAlpha);
  }
`;

// ─── Particle geometry builder ────────────────────────────────────────────────

function buildParticleGeometry() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const scales    = new Float32Array(PARTICLE_COUNT);
  const colors    = new Float32Array(PARTICLE_COUNT * 3);

  // Light-on-dark particle system: bright whites and blues on deep navy
  const white     = new THREE.Color("#FFFFFF");   // crisp white — surface layer
  const blueWhite = new THREE.Color("#A8C8FF");   // soft blue-white
  const medBlue   = new THREE.Color("#6B9FFF");   // medium electric blue
  const elecBlue  = new THREE.Color("#2563FF");   // electric blue accent

  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const layer = Math.random();

    let r: number;
    if (layer < 0.65) {
      r = SPHERE_RADIUS * (0.92 + Math.random() * 0.12);
    } else if (layer < 0.88) {
      r = SPHERE_RADIUS * (0.40 + Math.random() * 0.52);
    } else {
      r = SPHERE_RADIUS * (1.05 + Math.random() * 0.20);
    }

    const y     = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
    const sinY  = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;

    positions[i * 3]     = Math.cos(theta) * sinY * r;
    positions[i * 3 + 1] = y * r;
    positions[i * 3 + 2] = Math.sin(theta) * sinY * r;

    scales[i] = 0.5 + Math.random() * 0.7;

    const isAccent = Math.random() < ACCENT_RATIO;
    let c: THREE.Color;
    if (isAccent) {
      c = elecBlue;
    } else {
      const rnd = Math.random();
      c = rnd < 0.40 ? white : rnd < 0.72 ? blueWhite : medBlue;
    }
    colors[i * 3]     = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aScale",   new THREE.BufferAttribute(scales, 1));
  geo.setAttribute("aColor",   new THREE.BufferAttribute(colors, 3));
  return geo;
}

// ─── Inner R3F component ──────────────────────────────────────────────────────

function Particles() {
  const meshRef = useRef<THREE.Points>(null!);
  const matRef  = useRef<THREE.ShaderMaterial>(null!);
  const { camera } = useThree();

  const geo = useMemo(buildParticleGeometry, []);

  const uniforms = useMemo(
    () => ({
      uSize:    { value: 6.0 },
      uTime:    { value: 0 },
      uStretch: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      matRef.current.uniforms.uStretch.value =
        arkanaCoreState.phaseProgress * 0.6;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.048;
      meshRef.current.rotation.x = Math.sin(t * 0.012) * 0.08;
    }

    if (arkanaCoreState.phase === 0) {
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        arkanaCoreState.mouseNX * 0.9,
        0.04
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        arkanaCoreState.mouseNY * 0.6,
        0.04
      );
    }

    if (arkanaCoreState.phase === 1) {
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        -2.5 * arkanaCoreState.phaseProgress,
        0.06
      );
    }

    const targetFov = arkanaCoreState.phase >= 2 ? 28 : 42;
    (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(
      (camera as THREE.PerspectiveCamera).fov,
      targetFov,
      0.04
    );
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  });

  return (
    <points ref={meshRef} geometry={geo}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}

// ─── Exported canvas wrapper ──────────────────────────────────────────────────

interface ArkanaCoreProps {
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
}

export function ArkanaCore({ className, style, "aria-hidden": ariaHidden }: ArkanaCoreProps) {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      arkanaCoreState.mouseNX = (e.clientX / window.innerWidth  - 0.5) * 2;
      arkanaCoreState.mouseNY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <Canvas
      className={className}
      style={style}
      aria-hidden={ariaHidden}
      role="presentation"
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
    >
      <Particles />
    </Canvas>
  );
}
