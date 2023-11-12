import Mountain from "./Mountain";

const MAX_HEIGHT = 12;
const NORMALISATION_THRESHOLD = 7;
const WIDTH = 0.5;
const X_SPACING = 2.5;
const Z_SPACING = 3;

export default function MountainRange({ gitHubData }) {
  const heights = [];
  gitHubData.forEach((point) => {
    heights.push(point.contributionCount);
  });

  const maxInput = Math.max(...heights);
  const xOffset = Math.floor(heights.length) / 2;

  const mountains = gitHubData.map((point, index) => {
    const normalisedHeight =
      maxInput > NORMALISATION_THRESHOLD
        ? (point.contributionCount / maxInput) * MAX_HEIGHT
        : point.contributionCount;

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
