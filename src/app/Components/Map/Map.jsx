// /Components/Map/Map.jsx
"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToString } from "react-dom/server";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const customIcon = L.divIcon({
    html: renderToString(<FaMapMarkerAlt color="#ff0000" size="24px" />),
    className: "custom-marker-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  return (
    <MapContainer
      center={[23.85971, 90.409706]}
      zoom={15}
      className="h-full w-full rounded-lg shadow-md z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[23.85971, 90.409706]} icon={customIcon}>
        <Popup>Alharf, 20 Udayan School Rd</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
