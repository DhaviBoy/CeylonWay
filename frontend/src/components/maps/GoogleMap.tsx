import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  destinationName: string;
  height?: string;
  zoom?: number;
}

// Create a custom marker icon
const markerIcon = icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function GoogleMap({
  latitude,
  longitude,
  destinationName,
  height = "400px",
  zoom = 13,
}: GoogleMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const validLat = typeof latitude === 'number' ? latitude : 0;
  const validLng = typeof longitude === 'number' ? longitude : 0;
  const position: LatLngExpression = [validLat, validLng];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        style={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3f4f6",
          borderRadius: "12px"
        }}
      >
        <p style={{ color: "#9ca3af", fontSize: "14px" }}>Loading map...</p>
      </div>
    );
  }

  // If coordinates are invalid/zero (and not intended to be 0,0), show fallback
  if (validLat === 0 && validLng === 0) {
    return (
      <div className="w-full rounded-xl overflow-hidden border border-border flex items-center justify-center bg-secondary" style={{ height }}>
        <p className="text-muted-foreground text-sm">Map location unavailable</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border" style={{ height }}>
      <MapContainer
        key={`${validLat}-${validLng}`}
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>
            <div style={{ textAlign: "center", whiteSpace: "nowrap", padding: "4px 8px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "6px" }}>
                <span style={{ fontSize: "14px" }}>📍</span>
                <span style={{ fontWeight: "600", fontSize: "13px" }}>{destinationName}</span>
              </div>
              <p style={{ fontSize: "11px", color: "#555", margin: "0" }}>
                {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
