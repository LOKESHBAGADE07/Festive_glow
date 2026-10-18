import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
 * Hero3D — a stylised floating diya with a flickering flame and an ambient
 * field of gold particles. Reacts to pointer (parallax tilt) and scroll
 * (drifts up & fades). Rendered lazily; the page works without it.
 */

const softDot = () => {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,236,190,1)");
  grd.addColorStop(0.35, "rgba(255,200,110,0.7)");
  grd.addColorStop(1, "rgba(255,180,80,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
};

function Particles({ count = 420 }) {
  const ref = useRef();
  const texture = useMemo(softDot, []);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      speeds[i] = 0.08 + Math.random() * 0.25;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, dt) => {
    const arr = ref.current.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt;
      arr[i * 3] += Math.sin(t * 0.6 + i) * 0.0015;
      if (arr[i * 3 + 1] > 4.6) arr[i * 3 + 1] = -4.6;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.material.opacity = 0.55 + Math.sin(t * 0.8) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="#F2C572"
        size={0.16}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Diya({ scroll, reduce, mobile }) {
  const group = useRef();
  const flame = useRef();
  const glow = useRef();
  const light = useRef();
  const glowTex = useMemo(softDot, []);

  const bowl = useMemo(() => {
    const profile = [
      [0, 0], [0.5, 0.02], [0.85, 0.1], [1.05, 0.26], [1.14, 0.46], [1.16, 0.64], [1.1, 0.72], [0.98, 0.7], [0.88, 0.6], [0.6, 0.5], [0, 0.46],
    ];
    return new THREE.LatheGeometry(profile.map(([x, y]) => new THREE.Vector2(x, y)), 80);
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    const s = scroll ? scroll.get() : 0;
    const px = state.pointer.x;
    const py = state.pointer.y;

    const targetRotX = (reduce ? 0 : -py * 0.18) + 0.12;
    const targetRotY = (reduce ? 0 : px * 0.4) - 0.35 + Math.sin(t * 0.25) * 0.12;
    g.rotation.x += (targetRotX - g.rotation.x) * Math.min(1, dt * 3);
    g.rotation.y += (targetRotY - g.rotation.y) * Math.min(1, dt * 3);
    const baseY = mobile ? 2.05 : -0.35;
    const baseX = mobile ? 0.15 : -0.5;
    g.position.y = (reduce ? 0 : Math.sin(t * 0.9) * 0.1) + baseY + s * 2.2;
    g.position.x = baseX + (reduce ? 0 : px * 0.25);
    const sc = (mobile ? 0.5 : 1) * (1 - s * 0.35);
    g.scale.setScalar(sc);

    const flick = 1 + Math.sin(t * 11) * 0.07 + Math.sin(t * 23.7) * 0.04;
    const sway = Math.sin(t * 7.3) * 0.06;
    flame.current.scale.set(1, flick, 1);
    flame.current.rotation.z = sway;
    glow.current.scale.setScalar(1 + Math.sin(t * 9) * 0.08);
    light.current.intensity = 7 + Math.sin(t * 15) * 1.4;
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      <mesh geometry={bowl} castShadow receiveShadow>
        <meshStandardMaterial color="#B5522C" roughness={0.75} metalness={0.05} />
      </mesh>
      {/* painted rim band */}
      <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.05, 16, 100]} />
        <meshStandardMaterial color="#D6B36A" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* spout */}
      <mesh position={[1.08, 0.66, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <coneGeometry args={[0.22, 0.5, 20, 1, true]} />
        <meshStandardMaterial color="#B5522C" roughness={0.75} side={THREE.DoubleSide} />
      </mesh>
      {/* oil surface */}
      <mesh position={[0, 0.47, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 64]} />
        <meshStandardMaterial color="#4A2410" roughness={0.1} metalness={0.5} />
      </mesh>
      {/* wick */}
      <mesh position={[1.12, 0.74, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.03, 0.035, 0.32, 10]} />
        <meshStandardMaterial color="#E7D7B8" roughness={1} />
      </mesh>
      {/* layered teardrop flame */}
      <group ref={flame} position={[1.16, 0.88, 0]}>
        <mesh position={[0, 0.16, 0]} scale={[0.17, 0.34, 0.17]}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial color="#FF7A1A" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.13, 0]} scale={[0.11, 0.25, 0.11]}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial color="#FFB347" transparent opacity={0.92} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.09, 0]} scale={[0.055, 0.14, 0.055]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshBasicMaterial color="#FFF4D6" />
        </mesh>
      </group>
      <sprite ref={glow} position={[1.16, 1.0, 0.05]} scale={[2.6, 2.6, 1]}>
        <spriteMaterial map={glowTex} color="#FF9A2E" transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      <pointLight ref={light} position={[1.16, 1.25, 0.3]} color="#FFB357" intensity={7} distance={10} decay={2} />
    </group>
  );
}

export default function Hero3D({ scroll, reduce = false, mobile = false }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.1, 7.2], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <ambientLight intensity={0.35} color="#FFE6C7" />
      <directionalLight position={[-4, 5, 3]} intensity={0.9} color="#FFF1DC" />
      <Diya scroll={scroll} reduce={reduce} mobile={mobile} />
      {!reduce && <Particles />}
    </Canvas>
  );
}
