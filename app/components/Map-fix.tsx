


// import React from "react";
// import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import leaflet from "leaflet";

// // --- START: Perbaikan Ikon Default Leaflet (pertahankan ini) ---
// delete leaflet.Icon.Default.prototype._getIconUrl;

// leaflet.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//     iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//     shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// const lampungKabupatenGeoJSON = {
//     "type": "FeatureCollection",
//     "features": [
//         {
//             "type": "Feature",
//             "properties": {
//                 "name": "Bandar Lampung",
//                 "population": 1200000, // Contoh data tambahan
//                 "color": "#FF5733" // Warna khusus jika ingin
//             },
//             "geometry": {
//                 "type": "Polygon",
//                 "coordinates": [
//                     [
//                         [105.25, -5.44],
//                         [105.28, -5.44],
//                         [105.28, -5.46],
//                         [105.25, -5.46],
//                         [105.25, -5.44]
//                     ]
//                 ]
//             }
//         },
//         // Contoh lain (misal, Metro)
//         {
//             "type": "Feature",
//             "properties": {
//                 "name": "Metro",
//                 "population": 200000,
//                 "color": "#33FF57"
//             },
//             "geometry": {
//                 "type": "Polygon",
//                 "coordinates": [
//                     [
//                         [105.29, -5.10],
//                         [105.32, -5.10],
//                         [105.32, -5.12],
//                         [105.29, -5.12],
//                         [105.29, -5.10]
//                     ]
//                 ]
//             }
//         },
//         // ... Tambahkan feature GeoJSON untuk kabupaten/kota lainnya di sini
//         // Pastikan koordinat poligon Anda membentuk wilayah yang sebenarnya.
//     ]
// };

// const Map = () => {
//     // Koordinat pusat Lampung untuk tampilan awal
//     const initialCenter: [number, number] = [-5.2697581547047045, 105.1061972683746]; 

//     // Fungsi untuk styling setiap feature (kabupaten)
//     const geoJSONStyle  = (feature: any) => {
//         return {
//             fillColor: feature.properties.color || getRandomColor(), // Gunakan warna dari properti atau warna acak
//             weight: 2,
//             opacity: 1,
//             color: 'white',
//             dashArray: '3',
//             fillOpacity: 0.7
//         };
//     };

//     // Fungsi untuk menghasilkan warna acak (jika tidak ada warna di properti GeoJSON)
//     const getRandomColor = () => {
//         const letters = '0123456789ABCDEF';
//         let color = '#';
//         for (let i = 0; i < 6; i++) {
//             color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     }

//     // Fungsi yang akan dijalankan untuk setiap feature GeoJSON
//     // Ini akan mengikat popup ke setiap poligon
//     const onEachFeature = (feature: any, layer: leaflet.Layer) => {
//         if (feature.properties && feature.properties.name) {
//             layer.bindPopup(`
//                 <h3>${feature.properties.name}</h3>
//                 ${feature.properties.population ? `<p>Populasi: ${feature.properties.population}</p>` : ''}
//                 <p>Informasi lainnya...</p>
//             `);
//         }
//     };

//     return (
//         <div className="px-12">
//             <h1 className="flex text-1xl sm:text-2xl lg:text-3xl font-semibold leading-tight mb-6 justify-center items-center">
//                 <span className="text-[#284C66] tracking-wider">
//                     Anggota Dewan Perwakilan Rakyat Daerah Lampung
//                 </span>
//             </h1>
//             <MapContainer
//                 center={initialCenter}
//                 zoom={8} // Sesuaikan zoom agar seluruh Lampung terlihat
//                 scrollWheelZoom={true} 
//                 style={{ height: "600px" }}
//             >
//                 <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />

//                 {/* Komponen GeoJSON untuk menampilkan batas kabupaten */}
//                 <GeoJSON 
//                     data={lampungKabupatenGeoJSON as any} // Gunakan 'as any' jika TypeScript complain tentang tipe GeoJSON
//                     style={geoJSONStyle}
//                     onEachFeature={onEachFeature}
//                 />

//             </MapContainer>
//             <h1 className="flex text-1xl sm:text-2xl lg:text-3xl font-semibold leading-tight mb-6 mt-6 justify-center items-center">
//                 <span className="text-[#284C66] tracking-wider">
//                     Berikut Daftar Dapil DPRD Lampung
//                 </span>
//             </h1>
//         </div>
//     );
// };

// export default Map;