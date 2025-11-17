import React from "react";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Image from "next/image";

const AnggotaPage = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-white min-h-screen">
                <div className="bg-[#284C66] py-24 text-center text-white">
                    <h1 className="text-3xl font-semibold tracking-wide mb-3">
                        ANGGOTA DPRD
                    </h1>
                    <div className="text-sm text-gray-200">
                        <Link href="/" className="hover:underline">
                            Beranda
                        </Link>{" "}
                        <span className="mx-2">{">"}</span>
                        <span>Usulan</span>
                    </div>
                </div>
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-12">
                    <h2 className="text-xl font-bold text-[#284C66] mb-2">
                        Cari Anggota DPRD Provinsi Lampung
                    </h2>
                    <div className="relative flex-1 max-w-full w-full">
                        <input
                            type="text"
                            placeholder="Cari"
                            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66]"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                            />
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-[#284C66] mb-1">
                                Periode
                            </label>
                            <div className="relative">
                                <select className="w-full border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66] appearance-none">
                                    <option>Pilih Periode</option>
                                    <option>2019 - 2024</option>
                                    <option>2024 - 2029</option>
                                </select>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-4 top-3 h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-[#284C66] mb-1">
                                Dapil
                            </label>
                            <div className="relative">
                                <select className="w-full border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66] appearance-none">
                                    <option>Pilih Dapil</option>
                                    <option>Dapil 1</option>
                                    <option>Dapil 2</option>
                                    <option>Dapil 3</option>
                                </select>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-4 top-3 h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-[#284C66] mb-1">
                                Partai
                            </label>
                            <div className="relative">
                                <select className="w-full border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66] appearance-none">
                                    <option>Pilih Partai</option>
                                    <option>Partai A</option>
                                    <option>Partai B</option>
                                    <option>Partai C</option>
                                </select>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-4 top-3 h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-[#284C66] mb-1">
                                AKD
                            </label>
                            <div className="relative">
                                <select className="w-full border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66] appearance-none">
                                    <option>Pilih AKD</option>
                                    <option>Komisi 1</option>
                                    <option>Komisi 2</option>
                                    <option>Komisi 3</option>
                                </select>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-4 top-3 h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-xl font-bold text-[#284C66] mb-2">
                            Semua Anggota DPRD Provinsi Lampung
                        </h2>
                        <p className="text-sm mb-6">
                            Menampilkan :{" "}
                            <span className="font-semibold">
                                30 Anggota DPRD Provinsi Lampung
                            </span>
                        </p>
                        <h3 className="text-lg font-bold text-[#284C66] mb-6">
                            I. PIMPINAN
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <Link href="/">
                                <div className="flex gap-4">
                                    <div className="relative w-40 h-52">
                                        <span className="absolute -top-2 -left-2 bg-[#C8961F] text-white px-3 py-1 text-sm font-bold rounded-sm">
                                            -
                                        </span>
                                        <Image
                                            src="/anggota-avt.png"
                                            alt="Foto Anggota"
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-1 text-sm">
                                        <div className="grid grid-cols-3 gap-y-1">
                                            <span className="font-semibold">
                                                DAPIL
                                            </span>
                                            <span className="col-span-2">
                                                : Daerah Pemilihan III KAB.
                                                PESAWARAN, KAB. PRINGSEWU, KOTA
                                                METRO
                                            </span>
                                            <span className="font-semibold">
                                                NAMA
                                            </span>
                                            <span className="col-span-2 text-[#284C66] font-bold hover:underline cursor-pointer">
                                                : H. UBAIDILLAH, S.H
                                            </span>
                                            <span className="font-semibold">
                                                JABATAN
                                            </span>
                                            <span className="col-span-2">
                                                : Ketua DPRD
                                            </span>
                                        </div>
                                        <div className="mt-3">
                                            <Image
                                                src="/gerindra.png"
                                                alt="Logo Partai"
                                                width={80}
                                                height={80}
                                                className="h-16 w-auto"
                                            />
                                            <p className="mt-1 text-sm font-semibold">
                                                Partai Amanat Nasional
                                            </p>
                                        </div>
                                        <hr className="border-t-2 border-[#284C66] mt-3" />
                                    </div>
                                </div>
                            </Link>
                            <Link href="/">
                                <div className="flex gap-4">
                                    <div className="relative w-40 h-52">
                                        <span className="absolute -top-2 -left-2 bg-[#C8961F] text-white px-3 py-1 text-sm font-bold rounded-sm">
                                            -
                                        </span>
                                        <Image
                                            src="/anggota-avt.png"
                                            alt="Foto Anggota"
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-1 text-sm">
                                        <div className="grid grid-cols-3 gap-y-1">
                                            <span className="font-semibold">
                                                DAPIL
                                            </span>
                                            <span className="col-span-2">
                                                : Daerah Pemilihan VI KAB.
                                                MESUJI, KAB. TULANG BAWANG, KAB.
                                                TULANG BAWANG BARAT UBI B
                                            </span>
                                            <span className="font-semibold">
                                                NAMA
                                            </span>
                                            <span className="col-span-2 text-[#284C66] font-bold hover:underline cursor-pointer">
                                                : H. KRISTIAN, S.M
                                            </span>
                                            <span className="font-semibold">
                                                JABATAN
                                            </span>
                                            <span className="col-span-2">
                                                : Wakil Ketua DPRD I
                                            </span>
                                        </div>
                                        <div className="mt-3">
                                            <Image
                                                src="/gerindra.png"
                                                alt="Logo Partai"
                                                width={80}
                                                height={80}
                                                className="h-16 w-auto"
                                            />
                                            <p className="mt-1 text-sm font-semibold">
                                                Partai Demokrasi Indonesia
                                                Perjuangan
                                            </p>
                                        </div>
                                        <hr className="border-t-2 border-[#284C66] mt-3" />
                                    </div>
                                </div>
                            </Link>
                            <Link href="/">
                                <div className="flex gap-4">
                                    <div className="relative w-40 h-52">
                                        <span className="absolute -top-2 -left-2 bg-[#C8961F] text-white px-3 py-1 text-sm font-bold rounded-sm">
                                            -
                                        </span>
                                        <Image
                                            src="/anggota-avt.png"
                                            alt="Foto Anggota"
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-1 text-sm">
                                        <div className="grid grid-cols-3 gap-y-1">
                                            <span className="font-semibold">
                                                DAPIL
                                            </span>
                                            <span className="col-span-2">
                                                : Daerah Pemilihan I KOTA BANDAR
                                                LAMPUNG
                                            </span>
                                            <span className="font-semibold">
                                                NAMA
                                            </span>
                                            <span className="col-span-2 text-[#284C66] font-bold hover:underline cursor-pointer">
                                                : FIRDAUS HASBULLAH, S.H., M.H
                                            </span>
                                            <span className="font-semibold">
                                                JABATAN
                                            </span>
                                            <span className="col-span-2">
                                                : Wakil Ketua DPRD II
                                            </span>
                                        </div>
                                        <div className="mt-3">
                                            <Image
                                                src="/gerindra.png"
                                                alt="Logo Partai"
                                                width={80}
                                                height={80}
                                                className="h-16 w-auto"
                                            />
                                            <p className="mt-1 text-sm font-semibold">
                                                Partai Demokrat
                                            </p>
                                        </div>
                                        <hr className="border-t-2 border-[#284C66] mt-3" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AnggotaPage;
