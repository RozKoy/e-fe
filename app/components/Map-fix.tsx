import React from "react";
import { MapContainer, Marker, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import leaflet from "leaflet";
import { Feature, Geometry } from "geojson";
import lampung from "./lampung.json";

// === Fungsi Warna ===
function getColor(d: number): string {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

// === Style GeoJSON ===
// Sesuaikan tipe properties dengan lampung.json
function geoStyle(
    feature: Feature<Geometry, { value?: number }>
) {
    const value = feature.properties?.value ?? 0;

    return {
        fillColor: getColor(value),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
    };
}

const markerIcon = leaflet.divIcon({
    html: `<?xml version="1.0"?><svg height="24" ... ></svg>`,
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    className: "foo",
});

const Map = () => {
    return (
        <div className="px-12 pt-12">
            <h2 className="text-center text-3xl md:text-4xl font-bold text-[#284C66] mb-12">
                Anggota Dewan Perwakilan Rakyat Daerah Provinsi Lampung
            </h2>

            <MapContainer
                center={[-5.2697581547047045, 105.1061972683746]}
                zoom={9}
                scrollWheelZoom={false}
                style={{ height: "600px" }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* GeoJSON + style */}
                <GeoJSON data={lampung as any} style={geoStyle} />

                <Marker 
                    position={[-5.2697581547047045, 105.1061972683746]} 
                    icon={markerIcon} 
                />
            </MapContainer>
        </div>
    );
};

export default Map;
