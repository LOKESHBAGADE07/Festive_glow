import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Procedural 3D stand-ins for the five hero products. Each model is built from
   primitives so it ships with the theme (no GLB downloads) and can later be
   swapped for real scans/GLBs in Shopify without touching the stage. */

const GOLD = "#D6B36A";
const BRASS = "#B8893F";
const TERRACOTTA = "#B5522C";
const MAROON = "#5A1E24";

function Flame({ position, scale = 1 }) {
  const ref = useRef();
  const light = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const f = 1 + Math.sin(t * 11 + position[0]) * 0.07 + Math.sin(t * 23.7) * 0.04;
    ref.current.scale.set(scale, scale * f, scale);
    ref.current.rotation.z = Math.sin(t * 7.3) * 0.06;
    if (light.current) light.current.intensity = (5 + Math.sin(t * 15) * 1) * scale;
  });
  return (
    <group position={position}>
      <group ref={ref}>
        <mesh position={[0, 0.16, 0]} scale={[0.17, 0.34, 0.17]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshBasicMaterial color="#FF7A1A" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.13, 0]} scale={[0.11, 0.25, 0.11]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshBasicMaterial color="#FFB347" transparent opacity={0.92} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.09, 0]} scale={[0.055, 0.14, 0.055]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#FFF4D6" />
        </mesh>
      </group>
      <pointLight ref={light} position={[0, 0.35, 0.2]} color="#FFB357" intensity={5} distance={9} decay={2} />
    </group>
  );
}

export function Diya() {
  const bowl = useMemo(() => {
    const profile = [[0, 0], [0.5, 0.02], [0.85, 0.1], [1.05, 0.26], [1.14, 0.46], [1.16, 0.64], [1.1, 0.72], [0.98, 0.7], [0.88, 0.6], [0.6, 0.5], [0, 0.46]];
    return new THREE.LatheGeometry(profile.map(([x, y]) => new THREE.Vector2(x, y)), 72);
  }, []);
  return (
    <group rotation={[0.12, -0.35, 0]} position={[0, -0.3, 0]}>
      <mesh geometry={bowl}><meshStandardMaterial color={TERRACOTTA} roughness={0.75} /></mesh>
      <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.12, 0.05, 16, 96]} /><meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.9} /></mesh>
      <mesh position={[1.08, 0.66, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}><coneGeometry args={[0.22, 0.5, 20, 1, true]} /><meshStandardMaterial color={TERRACOTTA} roughness={0.75} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 0.47, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.9, 48]} /><meshStandardMaterial color="#4A2410" roughness={0.1} metalness={0.5} /></mesh>
      <mesh position={[1.12, 0.74, 0]} rotation={[0, 0, -0.35]}><cylinderGeometry args={[0.03, 0.035, 0.32, 8]} /><meshStandardMaterial color="#E7D7B8" /></mesh>
      <Flame position={[1.16, 0.88, 0]} />
    </group>
  );
}

const jaaliTexture = () => {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  g.fillStyle = "#fff";
  g.fillRect(0, 0, 256, 256);
  g.fillStyle = "#000";
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    const cx = x * 32 + 16, cy = y * 32 + 16;
    g.beginPath(); g.arc(cx, cy, (x + y) % 2 ? 7 : 5, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.moveTo(cx, cy - 13); g.lineTo(cx + 4, cy - 9); g.lineTo(cx, cy - 5); g.lineTo(cx - 4, cy - 9); g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
};

export function Lantern() {
  const alpha = useMemo(jaaliTexture, []);
  const panel = (rot, pos) => (
    <mesh rotation={rot} position={pos}>
      <planeGeometry args={[0.9, 1.5]} />
      <meshStandardMaterial color={BRASS} alphaMap={alpha} transparent alphaTest={0.5} side={THREE.DoubleSide} metalness={0.8} roughness={0.35} />
    </mesh>
  );
  return (
    <group position={[0, -0.9, 0]} rotation={[0.08, 0.6, 0]}>
      <mesh position={[0, -0.05, 0]}><boxGeometry args={[1.1, 0.1, 1.1]} /><meshStandardMaterial color={BRASS} metalness={0.9} roughness={0.3} /></mesh>
      {[[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.75, z]}><boxGeometry args={[0.07, 1.6, 0.07]} /><meshStandardMaterial color={BRASS} metalness={0.9} roughness={0.3} /></mesh>
      ))}
      {panel([0, 0, 0], [0, 0.75, 0.5])}
      {panel([0, Math.PI, 0], [0, 0.75, -0.5])}
      {panel([0, Math.PI / 2, 0], [0.5, 0.75, 0])}
      {panel([0, -Math.PI / 2, 0], [-0.5, 0.75, 0])}
      <mesh position={[0, 1.6, 0]}><boxGeometry args={[1.15, 0.08, 1.15]} /><meshStandardMaterial color={BRASS} metalness={0.9} roughness={0.3} /></mesh>
      <mesh position={[0, 1.95, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[0.8, 0.6, 4]} /><meshStandardMaterial color={BRASS} metalness={0.9} roughness={0.3} /></mesh>
      <mesh position={[0, 2.45, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.18, 0.03, 10, 32]} /><meshStandardMaterial color={BRASS} metalness={0.9} roughness={0.3} /></mesh>
      <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.16, 0.16, 0.5, 20]} /><meshStandardMaterial color="#F3E3C3" /></mesh>
      <Flame position={[0, 0.5, 0]} scale={1.1} />
    </group>
  );
}

export function FairyLights() {
  const { tube, bulbs } = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const u = i / 24;
      const x = -2.6 + u * 5.2;
      const y = 1.1 - Math.sin(u * Math.PI) * 1.6 + Math.sin(u * Math.PI * 3) * 0.12;
      const z = Math.cos(u * Math.PI * 2) * 0.35;
      pts.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const bulbs = Array.from({ length: 46 }, (_, i) => curve.getPoint(i / 45));
    return { tube: new THREE.TubeGeometry(curve, 160, 0.012, 6, false), bulbs };
  }, []);
  const refs = useRef([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((m, i) => { if (m) m.material.opacity = 0.65 + Math.sin(t * 3 + i * 0.9) * 0.3; });
  });
  return (
    <group position={[0, -0.2, 0]} rotation={[0.1, 0, 0]}>
      <mesh geometry={tube}><meshStandardMaterial color="#B87333" metalness={0.9} roughness={0.35} /></mesh>
      {bulbs.map((p, i) => (
        <group key={i} position={p}>
          <mesh><sphereGeometry args={[0.045, 10, 10]} /><meshBasicMaterial color="#FFF1C8" /></mesh>
          <mesh ref={(el) => (refs.current[i] = el)} scale={2.6}><sphereGeometry args={[0.045, 10, 10]} /><meshBasicMaterial color="#FFB347" transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
        </group>
      ))}
      <pointLight position={[0, 0, 1.5]} color="#FFC07A" intensity={3} distance={8} />
    </group>
  );
}

export function GiftBox() {
  const ribbon = <meshStandardMaterial color="#E9D4B0" roughness={0.45} metalness={0.15} />;
  const box = <meshStandardMaterial color={MAROON} roughness={0.6} />;
  return (
    <group position={[0, -0.6, 0]} rotation={[0.15, -0.6, 0]}>
      <mesh position={[0, 0.5, 0]}><boxGeometry args={[2, 1, 1.5]} />{box}</mesh>
      <mesh position={[0, 1.08, 0]}><boxGeometry args={[2.08, 0.16, 1.58]} />{box}</mesh>
      <mesh position={[0, 1.165, 0]}><boxGeometry args={[2.1, 0.012, 1.6]} /><meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.3} /></mesh>
      <mesh position={[0, 0.6, 0]}><boxGeometry args={[0.28, 1.2, 1.53]} />{ribbon}</mesh>
      <mesh position={[0, 0.6, 0]}><boxGeometry args={[2.03, 1.2, 0.28]} />{ribbon}</mesh>
      <mesh position={[-0.28, 1.3, 0]} rotation={[Math.PI / 2, 0, 0.25]}><torusGeometry args={[0.22, 0.07, 10, 24]} />{ribbon}</mesh>
      <mesh position={[0.28, 1.3, 0]} rotation={[Math.PI / 2, 0, -0.25]}><torusGeometry args={[0.22, 0.07, 10, 24]} />{ribbon}</mesh>
      <mesh position={[0, 1.3, 0]}><sphereGeometry args={[0.1, 12, 12]} />{ribbon}</mesh>
    </group>
  );
}

export function Toran() {
  const blooms = useMemo(() => {
    const out = [];
    for (let i = 0; i <= 16; i++) {
      const u = i / 16;
      const x = -2.4 + u * 4.8;
      const y = 0.9 - Math.sin(u * Math.PI) * 0.7;
      out.push({ pos: [x, y, 0], c: i % 3 === 0 ? "#F2A516" : "#E8701A", s: 0.2 + (i % 2) * 0.03 });
    }
    return out;
  }, []);
  const strand = (x, y) => (
    <group key={x} position={[x, y, 0]}>
      <mesh position={[0, -0.35, 0]}><cylinderGeometry args={[0.008, 0.008, 0.7, 6]} /><meshStandardMaterial color="#6B5B3E" /></mesh>
      {[-0.2, -0.45, -0.7].map((yy, i) => (
        <mesh key={i} position={[0, yy, 0]}><icosahedronGeometry args={[0.1, 1]} /><meshStandardMaterial color={i % 2 ? "#F2A516" : "#E8701A"} roughness={0.9} flatShading /></mesh>
      ))}
      <mesh position={[0, -0.85, 0]}><coneGeometry args={[0.06, 0.16, 8]} /><meshStandardMaterial color="#C8A24A" metalness={0.8} roughness={0.3} /></mesh>
    </group>
  );
  return (
    <group position={[0, 0.1, 0]} rotation={[0.05, 0, 0]}>
      <mesh position={[0, 1.05, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.02, 0.02, 5.2, 8]} /><meshStandardMaterial color="#8A6B2E" metalness={0.7} roughness={0.4} /></mesh>
      {blooms.map((b, i) => (
        <group key={i} position={b.pos}>
          <mesh><icosahedronGeometry args={[b.s, 1]} /><meshStandardMaterial color={b.c} roughness={0.95} flatShading /></mesh>
          <mesh position={[0.1, 0.12, 0.05]} scale={[1, 0.4, 0.6]}><sphereGeometry args={[0.1, 8, 8]} /><meshStandardMaterial color="#3E6B2E" roughness={1} /></mesh>
        </group>
      ))}
      {[-1.8, -0.6, 0.6, 1.8].map((x) => strand(x, 0.9 - Math.sin(((x + 2.4) / 4.8) * Math.PI) * 0.7))}
    </group>
  );
}

export const MODELS = { diya: Diya, lantern: Lantern, lights: FairyLights, giftbox: GiftBox, toran: Toran };
