"use client";
import React, { useRef, useState } from "react";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    GeoJSONProps,
    // useMap,
} from "react-leaflet";
import L, { LeafletMouseEvent, GeoJSON as LeafletGeoJSON } from "leaflet";
import "leaflet/dist/leaflet.css";
import lampung_dapil from "./lampung_dapil.json";
import { Feature, Geometry } from "geojson";
import Dapil from "./Dapil";

interface RegionProperties {
    region_code: number;
    region_name?: string;
}
type RegionFeature = Feature<Geometry, RegionProperties>;

function getColor(d: number): string {
    return d == 1
        ? "#000036"
        : d == 2
        ? "#BD0027"
        : d == 3
        ? "#E31B41"
        : d == 4
        ? "#FC4E2A"
        : d == 5
        ? "#FD8D3C"
        : d == 6
        ? "#FEB24C"
        : d == 7
        ? "#FED976"
        : "#FFEDA0";
}

const defaultStyle = (feature: RegionFeature) => {
    const code = feature.properties?.region_code ?? 0;
    return {
        fillColor: getColor(code),
        weight: 1,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
    };
};

const InteractiveGeoJSON = ({ onClickDapil }: { onClickDapil: () => void }) => {
    const geoJsonRef = useRef<LeafletGeoJSON>(null);
    const highlight = (e: LeafletMouseEvent) => {
        const layer = e.target as L.Path;
        layer.setStyle({
            weight: 3,
            color: "#666",
            dashArray: "",
            fillOpacity: 0.9,
        });
        layer.bringToFront();
    };

    const resetHighlight = (e: LeafletMouseEvent) => {
        geoJsonRef.current?.resetStyle(e.target);
    };

    const handleClick = () => {
        onClickDapil();
    };

    const onEachFeature = (feature: RegionFeature, layer: L.Layer) => {
        layer.on({
            mouseover: highlight,
            mouseout: resetHighlight,
            click: handleClick, // buka modal
        });
    };

    return (
        <GeoJSON
            ref={geoJsonRef}
            data={lampung_dapil as GeoJSONProps["data"]}
            style={defaultStyle as GeoJSONProps["style"]}
            onEachFeature={onEachFeature}
        />
    );
};

export default function MapPage() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="px-12 pt-12">
            <h2 className="text-center text-3xl md:text-4xl font-bold text-[#284C66] mb-12">
                Anggota Dewan Perwakilan Rakyat Daerah Provinsi Lampung
            </h2>

            <MapContainer
                center={[-5.2697, 105.1061]}
                zoom={8}
                scrollWheelZoom={true}
                style={{ height: "600px", borderRadius: "12px" }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <InteractiveGeoJSON onClickDapil={() => setModalOpen(true)} />
            </MapContainer>

            <Dapil open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}
