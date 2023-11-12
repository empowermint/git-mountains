"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

const MAX_HEIGHT = 12;
const WIDTH = 0.5;
const X_SPACING = 2.5;
const Z_SPACING = 3;

export default function MountainCanvas({ gitHubData }) {
  return (
    <Canvas shadows={true}>
      <fog attach="fog" args={["lavender", 5, 40]} />
      <ambientLight intensity={0.2} />
      <directionalLight
        intensity={2}
        color="white"
        position={[24, 6, 6]}
        castShadow={true}
      />

      <MountainRange heights={[1, 2, 3, 1, 2, 3, 0, 4, 5, 6, 2, 1]} />

      <mesh receiveShadow={true} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"lavender"} />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
}

function MountainRange({ heights }) {
  const maxInput = Math.max(...heights);
  const xOffset = Math.floor(heights.length) / 2;

  const mountains = heights.map((height, index) => {
    const normalisedHeight = (height / maxInput) * MAX_HEIGHT;

    return {
      height: normalisedHeight,
      radius: normalisedHeight * WIDTH,
      radialSegments: Math.max(Math.floor(Math.cos(index) * 7), 5),
      x: (index - xOffset) * X_SPACING,
      y: normalisedHeight / 2,
      z: Math.sin(index) * Z_SPACING + (MAX_HEIGHT - normalisedHeight),
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
          />
        );
      })}
    </>
  );
}

function Mountain({ x, y, z, radius, height, radialSegments }) {
  return (
    <mesh position={[x, y, z]} castShadow={true} receiveShadow={true}>
      <coneGeometry args={[radius, height, radialSegments]} />
      <meshStandardMaterial color={"violet"} />
    </mesh>
  );
}
