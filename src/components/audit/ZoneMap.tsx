'use client';

import { MapContainer, TileLayer, Circle, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

interface ZoneMapProps {
  centerLat: number;
  centerLng: number;
  radiusKm: number;
}

function MapUpdater({ center, radiusKm }: { center: [number, number]; radiusKm: number }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLng(center[0], center[1]).toBounds(radiusKm * 2 * 1000);
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, center, radiusKm]);
  return null;
}

export default function ZoneMap({ centerLat, centerLng, radiusKm }: ZoneMapProps) {
  const center: [number, number] = [centerLat, centerLng];

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
      <Circle
        center={center}
        radius={radiusKm * 1000}
        pathOptions={{
          color: '#1B5E3B',
          fillColor: '#1B5E3B',
          fillOpacity: 0.08,
          weight: 2,
          dashArray: '8 4',
        }}
      />
      <CircleMarker
        center={center}
        radius={7}
        pathOptions={{
          color: '#1B5E3B',
          fillColor: '#1B5E3B',
          fillOpacity: 1,
          weight: 3,
        }}
      />
      <MapUpdater center={center} radiusKm={radiusKm} />
    </MapContainer>
  );
}
