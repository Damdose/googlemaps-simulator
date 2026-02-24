import { HeatmapCell } from './types';

export function generateGrid(
  centerLat: number,
  centerLng: number,
  radiusKm: number,
  gridSize: number = 7,
): { lat: number; lng: number; row: number; col: number }[] {
  const points: { lat: number; lng: number; row: number; col: number }[] = [];
  const step = (radiusKm * 2) / (gridSize - 1);

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const lat = centerLat + ((i - Math.floor(gridSize / 2)) * step) / 111.32;
      const lng =
        centerLng +
        ((j - Math.floor(gridSize / 2)) * step) /
          (111.32 * Math.cos((centerLat * Math.PI) / 180));
      points.push({ lat, lng, row: i, col: j });
    }
  }
  return points;
}

export function getPositionColor(position: number | null): string {
  if (position === null) return '#EF4444'; // red — not ranked
  if (position <= 3) return '#15803D';     // dark green
  if (position <= 7) return '#4ADE80';     // light green
  if (position <= 13) return '#EAB308';    // yellow
  if (position <= 20) return '#F97316';    // orange
  return '#EF4444';                        // red
}

export function getPositionLabel(position: number | null): string {
  if (position === null) return 'Non classé';
  return `#${position}`;
}

export function generateMockHeatmapData(
  centerLat: number,
  centerLng: number,
  radiusKm: number,
  keyword: string,
  gridSize: number = 7,
): HeatmapCell[] {
  const grid = generateGrid(centerLat, centerLng, radiusKm, gridSize);
  const centerRow = Math.floor(gridSize / 2);
  const centerCol = Math.floor(gridSize / 2);

  return grid.map(point => {
    const distFromCenter = Math.sqrt(
      Math.pow(point.row - centerRow, 2) + Math.pow(point.col - centerCol, 2),
    );
    const maxDist = Math.sqrt(2) * Math.floor(gridSize / 2);
    const normalizedDist = distFromCenter / maxDist;

    // Closer to center = better ranking on average, with some randomness
    const basePosition = Math.round(1 + normalizedDist * 18 + (Math.random() * 8 - 4));
    const position = Math.max(1, Math.min(25, basePosition));

    return {
      ...point,
      position: Math.random() > 0.1 ? position : null,
      keyword,
    };
  });
}
