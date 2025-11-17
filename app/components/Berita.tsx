"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Berita = () => {
    const beritaList = [
        {
            id: 1,
            kategori: "Rapat Paripurna",
            tanggal: "10 Nov 2025",
            judul: "Sekdaprov Lampung Ikuti Rapat Paripurna DPRD Provinsi Lampung Terkait Laporan Panitia Khusus BAPEMPERDA",
            gambar: "/berita.jpeg", 
        },
        {
            id: 2,
            kategori: "Pengawasan & Kunjungan Kerja",
            tanggal: "10 Nov 2025",
            judul: "Sekdaprov Lampung Ikuti Rapat Paripurna DPRD Provinsi Lampung Terkait Laporan Panitia Khusus BAPEMPERDA",
            gambar: "/berita.jpeg",
        },
        {
            id: 3,
            kategori: "Reses",
            tanggal: "10 Nov 2025",
            judul: "Sekdaprov Lampung Ikuti Rapat Paripurna DPRD Provinsi Lampung Terkait Laporan Panitia Khusus BAPEMPERDA",
            gambar: "/berita.jpeg",
        },
    ];

    return (
        <div className="bg-[#e9eef2] min-h-screen py-8 px-6 lg:px-20">
            <div className="mb-10 border-b border-gray-400 pb-2">
                <h2 className="text-3xl font-bold text-[#284C66]">
                    Berita Terkini
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {beritaList.map((berita) => (
                    <div
                        key={berita.id}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition relative"
                    >
                        <div className="relative h-56">
                            <Image
                                src={berita.gambar}
                                alt={berita.judul}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-xl"
                            />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-5 text-white rounded-b-xl">
                            {berita.kategori && (
                                <div className="absolute top-4 left-4 bg-[#284C66] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    {berita.kategori}
                                </div>
                            )}

                            <div className="flex items-center text-sm mb-2 mt-8">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10m-11 8h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                {berita.tanggal}
                            </div>

                            <h3 className="font-semibold text-base leading-snug mb-3">
                                {berita.judul}
                            </h3>

                            <Link
                                href={`/berita/${berita.id}`}
                                className="bg-white text-[#284C66] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#f4f4f4] transition"
                            >
                                Lihat Selengkapnya
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Berita;
