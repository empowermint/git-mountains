"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MountainRange from "./MountainRange";

const HORIZON = 150;

export default function MountainCanvas({ gitHubData }) {
  return (
    <Canvas shadows={true} camera={{ position: [0, 0.1, 45] }}>
      <Atmos />
      <MountainRange gitHubData={gitHubData} />
      <Floor />
      <Controls />
    </Canvas>
  );
}

function Atmos() {
  return (
    <>
      <fog attach="fog" args={["lavender", 30, 80]} />
      <ambientLight intensity={0.3} />
      <directionalLight
        intensity={2}
        color="white"
        position={[24, 6, 6]}
        castShadow={true}
      />
    </>
  );
}

function Floor() {
  return (
    <mesh receiveShadow={true} rotation-x={-Math.PI / 2}>
      <circleGeometry args={[HORIZON, HORIZON]} />
      <meshStandardMaterial
        color={"white"}
        emissive={"lavender"}
        roughness={0.5}
      />
    </mesh>
  );
}

function Controls() {
  return (
    <OrbitControls
      maxPolarAngle={Math.PI / 2 - 0.01}
      panSpeed={1.5}
      minDistance={10}
      maxDistance={45}
      zoomSpeed={0.25}
      rotateSpeed={0.5}
      enableDamping={true}
    />
  );
}
