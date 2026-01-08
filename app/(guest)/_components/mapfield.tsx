"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type LatLng = {
    lat: number;
    lng: number;
};

const DEFAULT_POSITION: LatLng = {
    lat: -5.2697,
    lng: 105.1061,
};

// Fix leaflet icon
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LocationMarkerProps {
    position: LatLng;
    onChange: (pos: LatLng) => void;
}

function LocationMarker({ position, onChange }: LocationMarkerProps) {
    useMapEvents({
        click(e) {
            onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });

    return (
        <Marker
            position={[position.lat, position.lng]}
            draggable
            eventHandlers={{
                dragend: (event) => {
                    const marker = event.target as L.Marker;
                    const pos = marker.getLatLng();
                    onChange({ lat: pos.lat, lng: pos.lng });
                },
            }}
        />
    );
}

export default function MapPicker() {
    const [position, setPosition] = useState<LatLng>(() => {
        if (typeof window === "undefined") return DEFAULT_POSITION;

        const saved = localStorage.getItem("selected_location");
        if (!saved) return DEFAULT_POSITION;

        try {
            const parsed: unknown = JSON.parse(saved);

            if (
                typeof parsed === "object" &&
                parsed !== null &&
                "lat" in parsed &&
                "lng" in parsed
            ) {
                const data = parsed as LatLng;
                return {
                    lat: data.lat,
                    lng: data.lng,
                };
            }
        } catch {
            return DEFAULT_POSITION;
        }

        return DEFAULT_POSITION;
    });

    useEffect(() => {
        localStorage.setItem("selected_location", JSON.stringify(position));
    }, [position]);

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <MapContainer
                center={[position.lat, position.lng]}
                zoom={9}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker position={position} onChange={setPosition} />
            </MapContainer>

            {/* <div style={{ marginTop: 12 }}>
                <strong>Latitude:</strong> {position.lat}
                <br />
                <strong>Longitude:</strong> {position.lng}
            </div> */}
        </div>
    );
}
