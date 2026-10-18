import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MODELS } from "@/components/three/Models";

/* ProductStage — one canvas that holds all five models and cross-animates
   between them as `active` changes. Pointer parallax + ambient particles. */

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

const PARTICLE = { diya: "#F2C572", lantern: "#E9C98A", lights: "#FFD9A0", giftbox: "#E7C9CF", toran: "#F6B45A" };

function Particles({ count = 320, color }) {
  const ref = useRef();
  const texture = useMemo(softDot, []);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
      speeds[i] = 0.06 + Math.random() * 0.22;
    }
    return { positions, speeds };
  }, [count]);
  const target = useMemo(() => new THREE.Color(color), [color]);
  useFrame((state, dt) => {
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt;
      if (arr[i * 3 + 1] > 4.6) arr[i * 3 + 1] = -4.6;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.material.color.lerp(target, dt * 2);
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial map={texture} color={color} size={0.14} sizeAttenuation transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Slot({ name, active, reduce }) {
  const ref = useRef();
  const Model = MODELS[name];
  useFrame((state, dt) => {
    const g = ref.current;
    const on = active === name;
    const k = Math.min(1, dt * 4);
    const ts = on ? 1 : 0.001;
    g.scale.x += (ts - g.scale.x) * k;
    g.scale.y += (ts - g.scale.y) * k;
    g.scale.z += (ts - g.scale.z) * k;
    g.position.y += ((on ? 0 : -1.2) - g.position.y) * k;
    g.visible = g.scale.x > 0.01;
    if (on && !reduce) g.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.18;
  });
  return (
    <group ref={ref} scale={0.001} position={[0, -1.2, 0]}>
      <Model />
    </group>
  );
}

function Rig({ children, reduce, offset }) {
  const ref = useRef();
  useFrame((state, dt) => {
    const g = ref.current;
    const k = Math.min(1, dt * 3);
    const tx = offset[0] + (reduce ? 0 : state.pointer.x * 0.25);
    const ty = offset[1] + (reduce ? 0 : Math.sin(state.clock.elapsedTime * 0.9) * 0.08);
    g.position.x += (tx - g.position.x) * k;
    g.position.y += (ty - g.position.y) * k;
    g.rotation.x += ((reduce ? 0 : -state.pointer.y * 0.12) - g.rotation.x) * k;
    g.rotation.y += ((reduce ? 0 : state.pointer.x * 0.25) - g.rotation.y) * k;
  });
  return <group ref={ref}>{children}</group>;
}

export default function ProductStage({ active = "diya", reduce = false, offset = [0, 0], scale = 1, particles = true, className = "" }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.9, 7.4], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <ambientLight intensity={0.45} color="#FFE6C7" />
      <directionalLight position={[-4, 5, 3]} intensity={1} color="#FFF1DC" />
      <directionalLight position={[4, 2, -2]} intensity={0.35} color="#D6B36A" />
      <Rig reduce={reduce} offset={offset}>
        <group scale={scale}>
          {Object.keys(MODELS).map((name) => (
            <Slot key={name} name={name} active={active} reduce={reduce} />
          ))}
        </group>
      </Rig>
      {particles && !reduce && <Particles color={PARTICLE[active] || PARTICLE.diya} />}
    </Canvas>
  );
}
