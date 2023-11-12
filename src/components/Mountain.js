import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export default function Mountain({ mountain }) {
  const {
    x,
    y,
    z,
    radius,
    rotation,
    height,
    radialSegments,
    contributionCount,
    date,
  } = mountain;
  return (
    <>
      <mesh
        position={[x, y, z]}
        castShadow={true}
        receiveShadow={true}
        rotation-y={rotation}
      >
        <coneGeometry args={[radius, height, radialSegments]} />
        <meshStandardMaterial color={"violet"} />
      </mesh>
      <Annotation position={[x, height + 0.3, z]}>
        {contributionCount}
      </Annotation>
    </>
  );
}

function Annotation({ position, children }) {
  return (
    <Text color="violet" fontSize={0.4} position={position}>
      {children}
    </Text>
  );
}
