"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ICoordinate {
  lat: number;
  lng: number;
}

export default function MyMap({ lat, lng }: ICoordinate) {
  const position: LatLngExpression = [lat, lng];

  // This must run on client
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, "_blank");
  };

  return (
    <MapContainer center={position} zoom={15} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position}>
        <Popup>
          <div>
            My Location <br /> Lat: {lat} <br /> Lng: {lng} <br />
            <button
              onClick={openGoogleMaps}
              style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
            >
              Get Directions
            </button>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
