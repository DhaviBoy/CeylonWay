import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapDestination {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  propertyCount: number;
  rating: number;
}

interface DestinationsMapProps {
  destinations: MapDestination[];
  onDestinationClick?: (destination: MapDestination) => void;
}

// Create custom marker icon
const createCustomMarker = () => {
  return L.divIcon({
    html: `
      <div class="flex items-center justify-center">
        <div class="relative">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-coral via-sunset to-golden shadow-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-coral animate-pulse"></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "custom-marker",
  });
};

export function DestinationsMap({ destinations, onDestinationClick }: DestinationsMapProps) {
  // Default center (world center)
  const center: [number, number] = [20, 0];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            position={[destination.lat, destination.lng]}
            icon={createCustomMarker()}
            eventHandlers={{
              click: () => onDestinationClick?.(destination),
            }}
          >
            <Popup className="custom-popup">
              <div className="text-sm">
                <h3 className="font-bold text-foreground">{destination.name}</h3>
                <p className="text-xs text-muted-foreground">{destination.country}</p>
                <div className="mt-2 space-y-1 text-xs">
                  <p>
                    <span className="font-semibold">Properties:</span> {destination.propertyCount}
                  </p>
                  <p>
                    <span className="font-semibold">Rating:</span> ⭐ {destination.rating}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
