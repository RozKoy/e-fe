"use client";
import React from "react";
import Link from "next/link";

const Landing = () => {
    const dapilList = [
        {
            id: 1,
            title: "DAPIL 1 : KOTA BANDAR LAMPUNG",
        },
        {
            id: 2,
            title: "DAPIL 2 : KAB. LAMPUNG SELATAN",
        },
        {
            id: 3,
            title: "DAPIL 3 : KAB. PESAWARAN, KAB. PRINGSEWU, KOTA METRO",
        },
        {
            id: 4,
            title: "DAPIL 4 : KAB. TANGGAMUS, KAB. LAMPUNG BARAT, KAB. PESISIR BARAT",
        },
        {
            id: 5,
            title: "DAPIL 5 : KAB. WAY KANAN, KAB. LAMPUNG UTARA",
        },
        {
            id: 6,
            title: "DAPIL 6 : KAB. MESUJI, KAB. TULANG BAWANG, KAB. TULANG BAWANG BARAT",
        },
        {
            id: 7,
            title: "DAPIL 7 : KAB. LAMPUNG TENGAH",
        },
        {
            id: 8,
            title: "DAPIL 8 : KAB. LAMPUNG TIMUR",
        },
    ];

    return (
        <div className="bg-white">
            <section className="bg-gray-50 py-16">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#284C66] mb-12">
                        Berikut Daftar Dapil DPRD Provinsi Lampung
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {dapilList.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center justify-between border border-gray-400 hover:bg-[#f5954b] transition"
                            >
                                <h3 className="text-[#284C66] font-bold text-lg text-center mb-6 leading-relaxed">
                                    {item.title}
                                </h3>
                                <div className="flex items-center justify-center mb-6">
                                    <div className="bg-[#284C66] text-white p-4 rounded-full">
                                        <svg
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                            />
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <Link
                                        href={`/pages/partai`}
                                        className="bg-[#284C66] hover:bg-[#1f3a4d] text-white px-6 py-2 rounded-full text-sm font-semibold transition"
                                    >
                                        Anggota Dapil
                                    </Link>
                                    <Link
                                        href={`/pages/usulan`}
                                        className="bg-[#F19349] hover:bg-[#e17b2f] text-white px-6 py-2 rounded-full text-sm font-semibold transition"
                                    >
                                        Usulan Dapil
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
