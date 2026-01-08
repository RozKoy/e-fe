"use client";

import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//
type LatLng = {
    lat: number;
    lng: number;
};

interface MapPickerProps {
    disabled?: boolean;
    latitude?: number;
    longitude?: number;
}

interface LocationMarkerProps {
    disabled?: boolean;
    position: LatLng;
    onChange: (pos: LatLng) => void;
}

//
const DEFAULT_POSITION: LatLng = {
    lat: -5.408867814426882,
    lng: 105.26011168956758,
};

//
function LocationMarker({ disabled, position, onChange }: LocationMarkerProps) {
    useMapEvents({
        click(e) {
            if (!disabled) {
                onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
            }
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

export default function MapPicker({
    disabled,
    latitude,
    longitude,
}: MapPickerProps) {
    const [position, setPosition] = useState<LatLng>(() => {
        if (typeof latitude === "number" && typeof longitude === "number") {
            return {
                lat: latitude,
                lng: longitude,
            };
        }
        try {
            const saved = localStorage.getItem("selected_location");
            if (!saved) return DEFAULT_POSITION;

            const parsed = JSON.parse(saved);
            if (
                typeof parsed === "object" &&
                parsed !== null &&
                "lat" in parsed &&
                "lng" in parsed
            ) {
                return parsed as LatLng;
            }
        } catch {}

        return DEFAULT_POSITION;
    });

    useEffect(() => {
        localStorage.setItem("selected_location", JSON.stringify(position));
    }, [position]);

    useEffect(() => {
        const proto = L.Icon.Default.prototype;

        if ("_getIconUrl" in proto) {
            delete (proto as Record<string, unknown>)["_getIconUrl"];
        }

        L.Icon.Default.mergeOptions({
            iconRetinaUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            iconUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            shadowUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
    }, []);

    return (
        <div style={{ width: "100%", height: "400px" }}>
            {!disabled && (
                <>
                    <input type="hidden" name="latitude" value={position.lat} />
                    <input
                        type="hidden"
                        name="longitude"
                        value={position.lng}
                    />
                </>
            )}
            <MapContainer
                center={[position.lat, position.lng]}
                zoom={9}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker
                    position={position}
                    onChange={setPosition}
                    disabled={disabled}
                />
            </MapContainer>
        </div>
    );
}
