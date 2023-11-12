"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

const MAX_HEIGHT = 12;
const WIDTH = 0.5;
const X_SPACING = 2.5;
const Z_SPACING = 3;
const HORIZON = 150;

export default function MountainCanvas({ gitHubData }) {
  return (
    <Canvas shadows={true} camera={{ position: [0, 0.1, 45] }}>
      <fog attach="fog" args={["lavender", 30, 80]} />
      <ambientLight intensity={0.3} />
      <directionalLight
        intensity={2}
        color="white"
        position={[24, 6, 6]}
        castShadow={true}
      />

      <MountainRange gitHubData={gitHubData} />

      <mesh receiveShadow={true} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[HORIZON, HORIZON]} />
        <meshStandardMaterial
          color={"white"}
          emissive={"lavender"}
          roughness={0.5}
        />
      </mesh>

      <OrbitControls
        maxPolarAngle={Math.PI / 2 - 0.01}
        panSpeed={1.5}
        minDistance={10}
        maxDistance={45}
        zoomSpeed={0.25}
        rotateSpeed={0.5}
        enableDamping={true}
      />
    </Canvas>
  );
}

function MountainRange({ gitHubData }) {
  const heights = [];
  gitHubData.forEach((point) => {
    heights.push(point.contributionCount);
  });

  const maxInput = Math.max(...heights);
  const xOffset = Math.floor(heights.length) / 2;

  const mountains = gitHubData.map((point, index) => {
    const normalisedHeight = (point.contributionCount / maxInput) * MAX_HEIGHT;

    return {
      height: normalisedHeight,
      radius: normalisedHeight * WIDTH,
      radialSegments: Math.max(Math.floor(Math.cos(index) * 7), 5),
      x: (index - xOffset) * X_SPACING,
      y: normalisedHeight / 2,
      z: Math.sin(index) * Z_SPACING + (MAX_HEIGHT - normalisedHeight),
      rotation: (index % 2) * (Math.PI / 5),
      contributionCount: point.contributionCount,
      date: point.date,
    };
  });

  return (
    <>
      {mountains.map((mountain, index) => {
        if (mountain.height === 0) return null;
        return (
          <Mountain
            key={index}
            radius={mountain.radius}
            height={mountain.height}
            radialSegments={mountain.radialSegments}
            x={mountain.x}
            y={mountain.y}
            z={mountain.z}
            rotation={mountain.rotation}
          />
        );
      })}
    </>
  );
}

function Mountain({ x, y, z, radius, height, radialSegments, rotation }) {
  return (
    <mesh
      position={[x, y, z]}
      castShadow={true}
      receiveShadow={true}
      rotation-y={rotation}
    >
      <coneGeometry args={[radius, height, radialSegments]} />
      <meshStandardMaterial color={"violet"} />
    </mesh>
  );
}
