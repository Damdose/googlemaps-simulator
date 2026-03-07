'use client';

import { MapContainer, TileLayer, Rectangle, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { HeatmapCell } from '@/lib/types';
import { getPositionColor, getPositionLabel } from '@/lib/heatmap-grid';
import { useEffect } from 'react';

interface HeatmapMapViewProps {
  cells: HeatmapCell[];
  centerLat: number;
  centerLng: number;
  radiusKm: number;
  gridSize: number;
}

function MapFitter({ center, radiusKm }: { center: [number, number]; radiusKm: number }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLng(center[0], center[1]).toBounds(radiusKm * 2.3 * 1000);
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [map, center, radiusKm]);
  return null;
}

export default function HeatmapMapView({
  cells,
  centerLat,
  centerLng,
  radiusKm,
  gridSize,
}: HeatmapMapViewProps) {
  const center: [number, number] = [centerLat, centerLng];
  const step = (radiusKm * 2) / (gridSize - 1);
  const halfStepLat = step / 111.32 / 2;
  const halfStepLng = step / (111.32 * Math.cos((centerLat * Math.PI) / 180)) / 2;

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
      scrollWheelZoom={false}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cells.map((cell, i) => {
        const color = getPositionColor(cell.position);
        const bounds: L.LatLngBoundsExpression = [
          [cell.lat - halfStepLat, cell.lng - halfStepLng],
          [cell.lat + halfStepLat, cell.lng + halfStepLng],
        ];

        return (
          <Rectangle
            key={i}
            bounds={bounds}
            pathOptions={{
              color: '#fff',
              fillColor: color,
              fillOpacity: 0.65,
              weight: 1,
              opacity: 0.6,
            }}
          >
            <Tooltip direction="top" sticky>
              <span style={{ fontWeight: 600 }}>
                {getPositionLabel(cell.position)}
              </span>
              <br />
              <span style={{ fontSize: '0.75rem', color: '#666' }}>
                {cell.lat.toFixed(4)}, {cell.lng.toFixed(4)}
              </span>
            </Tooltip>
          </Rectangle>
        );
      })}

      <CircleMarker
        center={center}
        radius={6}
        pathOptions={{
          color: '#1a1a1a',
          fillColor: '#ffffff',
          fillOpacity: 1,
          weight: 3,
        }}
      >
        <Tooltip direction="top" permanent>
          <span style={{ fontWeight: 600, fontSize: '0.7rem' }}>Votre business</span>
        </Tooltip>
      </CircleMarker>

      <MapFitter center={center} radiusKm={radiusKm} />
    </MapContainer>
  );
}
