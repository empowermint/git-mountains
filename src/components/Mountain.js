export default function Mountain({
  x,
  y,
  z,
  radius,
  height,
  radialSegments,
  rotation,
}) {
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
