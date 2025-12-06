"use client";

import { useState } from "react";
import Link from "@/app/_components/link";

//
export default function AddProposalPage() {
    const [kategori, setKategori] = useState("");
    const [kategoriCustom, setKategoriCustom] = useState("");

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-[#284C66] py-24 text-center text-white">
                <h1 className="text-3xl font-semibold tracking-wide mb-3">
                    PROPOSAL
                </h1>
                <div className="w-full text-sm text-gray-200">
                    <Link href="/" className="hover:underline">
                        Beranda
                    </Link>
                    <span className="mx-2">{">"}</span>
                    <span>Tambah Proposal</span>
                </div>
            </div>
            <div className="min-h-screen bg-gray-100 flex justify-center items-start">
                <div className="w-full max-w-6xl bg-white shadow-md rounded-2xl p-6">
                    <h1 className="text-xl font-semibold mb-6 text-[#284C66]">
                        Tambah Proposal
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-2">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Dapil
                            </label>
                            <select className="w-full border border-gray-400 rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66]">
                                <option value="">Pilih Dapil</option>
                                <option value="1">Dapil 1</option>
                                <option value="2">Dapil 2</option>
                                <option value="3">Dapil 3</option>
                            </select>
                        </div>

                        <div className="mb-2">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Kategori
                            </label>
                            <select
                                value={kategori}
                                onChange={(e) => setKategori(e.target.value)}
                                className="w-full border border-gray-400 rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66] mb-2"
                            >
                                <option value="">Pilih Kategori</option>
                                <option value="Fisik">Fisik</option>
                                <option value="Non Fisik">Non Fisik</option>
                                <option value="custom">Ketik Manual...</option>
                            </select>

                            {kategori === "custom" && (
                                <input
                                    type="text"
                                    value={kategoriCustom}
                                    onChange={(e) =>
                                        setKategoriCustom(e.target.value)
                                    }
                                    placeholder="Isi kategori sendiri"
                                    className="w-full border border-gray-400 rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66]"
                                />
                            )}
                        </div>

                        <div className="mb-2">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Judul
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-400 rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66]"
                                placeholder="Masukkan judul..."
                            />
                        </div>

                        <div className="mb-2 ">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Upload File
                            </label>
                            <input
                                type="file"
                                accept="image/*,.pdf,.doc,.docx"
                                className="w-full border border-gray-400 rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66]"
                            />
                        </div>

                        <div className="mb-2 md:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Deskripsi
                            </label>
                            <textarea
                                rows={4}
                                className="w-full border border-gray-400 rounded-2xl py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66] resize-none"
                                placeholder="Masukkan proposal..."
                            ></textarea>
                        </div>
                    </div>

                    <button className="w-full bg-[#284C66] text-white py-2 rounded-full text-sm font-medium hover:bg-[#1f3b50] transition">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
