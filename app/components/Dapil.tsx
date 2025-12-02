"use client";

import React from "react";
import Image from "next/image";

const dataAnggota = [
    {
        id: 1,
        nama: "Khabib, S.M",
        partai: "Partai Golongan Karya",
        usia: "49 Tahun",
        jenisKelamin: "Laki-laki",
        akd: "Sekretaris Komisi I",
        foto: "/anggota-avt.png",
        logoPartai: "/gerindra.png",
    },
    {
        id: 2,
        nama: "Nurmagomedov, S.H",
        partai: "Partai Bulan Bintang",
        usia: "55 Tahun",
        jenisKelamin: "Laki-laki",
        akd: "Sekretaris Komisi II",
        foto: "/anggota-avt.png",
        logoPartai: "/gerindra.png",
    },
    {
        id: 3,
        nama: "Makhacev, S.H",
        partai: "Partai Bulan Bintang",
        usia: "55 Tahun",
        jenisKelamin: "Laki-laki",
        akd: "Sekretaris Komisi II",
        foto: "/anggota-avt.png",
        logoPartai: "/gerindra.png",
    },
];

interface ModalProps {
    open: boolean;
    onClose: () => void;
}

const Dapil: React.FC<ModalProps> = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg relative p-6 max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-center text-xl font-semibold mb-4">
                    Daftar Anggota Dapil I Bandar Lampung
                </h2>

                {/* List Anggota */}
                <div className="space-y-6">
                    {dataAnggota.map((item) => (
                        <div
                            key={item.id}
                            className="border-b pb-6 flex flex-col md:flex-row items-start md:items-center gap-4"
                        >
                            {/* Foto Anggota */}
                            <div>
                                <Image
                                    src={item.foto}
                                    alt={item.nama}
                                    width={180}
                                    height={260}
                                    className="rounded-md object-cover"
                                />
                            </div>

                            {/* Info Anggota */}
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">
                                    {item.nama}{" "}
                                    <span className="text-[#C2883C]">
                                        • {item.partai}
                                    </span>
                                </h3>

                                <div className="grid grid-cols-2 gap-y-1 mt-3 text-sm">
                                    <span>AKD</span>
                                    <span>: {item.akd}</span>

                                    <span>Usia</span>
                                    <span>: {item.usia}</span>

                                    <span>Jenis Kelamin</span>
                                    <span>: {item.jenisKelamin}</span>
                                </div>

                                <button className="mt-3 bg-[#1E3A4E] text-white px-4 py-2 rounded-lg text-sm">
                                    Detail Profil
                                </button>
                            </div>

                            {/* Logo Partai */}
                            <div className="ml-auto">
                                <Image
                                    src={item.logoPartai}
                                    alt={item.partai}
                                    width={80}
                                    height={80}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dapil;
