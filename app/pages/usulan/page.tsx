"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const UsulanPage = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-white min-h-screen">
                <div className="bg-[#284C66] py-24 text-center text-white">
                    <h1 className="text-3xl font-semibold tracking-wide mb-3">
                        USULAN
                    </h1>
                    <div className="text-sm text-gray-200">
                        <Link href="/" className="hover:underline">
                            Beranda
                        </Link>{" "}
                        <span className="mx-2">{">"}</span>
                        <span>Usulan</span>
                    </div>
                </div>
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24">
                    <div className="">
                        <div className="flex justify-end mb-6 space-x-3">
                            <button className="bg-[#284C66] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#1f3a4d] transition">
                                Unduh QR
                            </button>
                            {/* <button className="">                   
                            </button> */}
                            <Link
                                href={`/pages/proposal/tambahProposal`}
                                className="bg-[#284C66] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#1f3a4d] transition"
                            >
                                Tambah Usulan
                            </Link>
                        </div>
                        <div className="flex md:flex-row items-center gap-4 mb-6">
                            <button className="flex items-center bg-[#284C66] text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-[#1f3a4d] transition">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2l-6 7v5l-4 3v-8L3 6V4z"
                                    />
                                </svg>
                                Filter
                            </button>
                            <div className="relative flex-1 max-w-xl w-full">
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
                        </div>
                        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f6f0e0] text-gray-700 font-semibold">
                                        <th className="px-4 py-3 border-b">
                                            No
                                        </th>
                                        <th className="px-4 py-3 border-b">
                                            Nama Masyarakat
                                        </th>
                                        <th className="px-4 py-3 border-b">
                                            Judul Pengajuan
                                        </th>
                                        <th className="px-4 py-3 border-b">
                                            Tanggal Pengajuan
                                        </th>
                                        <th className="px-4 py-3 border-b">
                                            Kategori Usulan
                                        </th>
                                        <th className="px-4 py-3 border-b">
                                            Dapil
                                        </th>
                                        <th className="px-4 py-3 border-b">
                                            Partai
                                        </th>
                                        <th className="px-4 py-3 border-b">
                                            Logo Fraksi
                                        </th>
                                        <th className="px-4 py-3 border-b">
                                            Wakil Rakyat
                                        </th>
                                        <th className="px-4 py-3 border-b">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 border-b">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            colSpan={11}
                                            className="text-center py-10 text-gray-500"
                                        >
                                            No results.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-600">
                            <p>0 dari 0 total data</p>
                            <div className="flex items-center gap-2 mt-3 sm:mt-0">
                                <select className="border rounded-md px-2 py-1 focus:ring-[#284C66]">
                                    <option>5</option>
                                    <option>10</option>
                                    <option>20</option>
                                </select>
                                <button className="border rounded-md px-2 py-1">
                                    &lt;
                                </button>
                                <button className="bg-[#F19349] text-white rounded-md px-3 py-1">
                                    1
                                </button>
                                <button className="border rounded-md px-2 py-1">
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UsulanPage;
