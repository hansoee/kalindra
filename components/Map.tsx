"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L, { LatLngTuple, DivIcon } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Papa from "papaparse";

interface MapProps {
  positions: LatLngTuple[];
  zoom?: number;
}

const defaults = {
  zoom: 19,
};

const createCustomIcon = (number: number): DivIcon => {
  return L.divIcon({
    html: `<div style="background-color: blue; border: 2px solid white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 16px; color: white;">${number}</div>`,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

const Map: React.FC<MapProps> = ({ zoom = defaults.zoom, positions }) => {
  const [coordinates, setCoordinates] = useState<LatLngTuple[]>([]);

  useEffect(() => {
    const fetchCSVData = async () => {
      const response = await fetch("/track_points.csv");
      const csvData = await response.text();

      Papa.parse(csvData, {
        header: true,
        complete: (result) => {
          console.log(result.data); // Log the parsed data for debugging

          // Assert the type of the parsed data
          const data = result.data as { Latitude: string; Longitude: string }[];

          const coords = data.map((row) => {
            const lat = parseFloat(row.Latitude);
            const lon = parseFloat(row.Longitude);
            
            // Log the values being parsed to check for NaN issues
            console.log(`Parsed lat: ${lat}, lon: ${lon}`);
            
            // Handle cases where parsing might fail
            if (isNaN(lat) || isNaN(lon)) {
              console.error(`Invalid coordinates: ${row.Latitude}, ${row.Longitude}`);
              return null;
            }
            
            return [lat, lon] as LatLngTuple;
          }).filter(coord => coord !== null) as LatLngTuple[]; // Filter out any invalid coordinates

          setCoordinates(coords);
        },
      });
    };

    fetchCSVData();
  }, []);

  return (
    <MapContainer
      center={positions[0]}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {positions.map((pos, idx) => {
        console.log(`Position ${idx + 1}: `, pos);
        return (
          <Marker key={idx} position={pos} icon={createCustomIcon(idx + 1)}>
            <Popup>Titik {idx + 1} di koordinat Lat {pos[0]} dan Long {pos[1]}</Popup>
          </Marker>
        );
      })}

      {coordinates.length > 0 && <Polyline positions={coordinates} />}
    </MapContainer>
  );
};

export default Map;
