"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";

interface UserData {
    namaLengkap: string;
    kecamatan: string;
    kabupaten: string;
    kelurahanDesa: string;
}

interface DprdData {
    namaAnggota: string;
    partai: string;
    dapil: string;
    logoPartaiUrl: string;
}

interface UsulanData {
    kategori: string;
    usulan: string;
    uraian: string;
}

interface Komentar {
    nama: string;
    isi: string;
    waktu: string;
}

const UsulanDetail = () => {
    const userData: UserData = {
        namaLengkap: "Nabila",
        kecamatan: "Teluk Betung",
        kabupaten: "Bandar Lampung",
        kelurahanDesa: "Teluk Betung Barat",
    };

    const dprdData: DprdData = {
        namaAnggota: "MULYANTO, S.H, M.H",
        partai: "Partai Gerindra",
        dapil: "Daerah Pemilihan II KECAMATAN TALANG UBI B",
        logoPartaiUrl: "/gerindra.png",
    };

    const usulanData: UsulanData = {
        kategori: "Infrastruktur",
        usulan: "Perbaikan Jalan",
        uraian: "Perbaikan Jalan di Gg Swadaya",
    };

    const totalLikes = 19;
    const totalDislikes = 10;
    const historyKomentar: Komentar[] = [
        {
            nama: "Wahyu",
            isi: "Semoga cepat terealisasi!",
            waktu: "2 jam lalu",
        },
        {
            nama: "Pandu",
            isi: "Ini memang urgent.",
            waktu: "1 hari lalu",
        },
        {
            nama: "Badru",
            isi: "Terima kasih atas infonya.",
            waktu: "3 hari lalu",
        },
    ];

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
                        <span>Detail Usulan</span>
                    </div>
                </div>

                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                    <div className="flex justify-start space-x-4 mb-8 p-4">
                        <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-150 ease-in-out">
                            <ThumbUpIcon className="w-5 h-5" />
                            <span> {totalLikes}</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-gray-400 hover:bg-gray-500 text-gray-800 py-2 px-4 rounded-full transition duration-150 ease-in-out">
                            <ThumbDownIcon className="w-5 h-5" />
                            <span> {totalDislikes}</span>
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8 p-4">
                        <h2 className="text-xl font-bold text-[#284C66] border-b pb-3 mb-6">
                            Informasi Data Diri
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                            <div className="pr-4">
                                <div className="flex flex-col mb-4">
                                    <span className="text-gray-500 text-sm">
                                        Nama Lengkap
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {userData.namaLengkap}
                                    </span>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <span className="text-gray-500 text-sm">
                                        Kecamatan
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {userData.kecamatan}
                                    </span>
                                </div>
                            </div>

                            <div className="pr-4">
                                <div className="flex flex-col mb-4">
                                    <span className="text-gray-500 text-sm">
                                        Kabupaten
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {userData.kabupaten}
                                    </span>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <span className="text-gray-500 text-sm">
                                        Kelurahan / Desa
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {userData.kelurahanDesa}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8 p-4">
                        <h2 className="text-xl font-bold text-[#284C66] border-b pb-3 mb-6">
                            Anggota Dewan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                            <div className="pr-4">
                                <div className="flex flex-col mb-4">
                                    <span className="text-gray-500 text-sm">
                                        Nama Anggota DPRD
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {dprdData.namaAnggota}
                                    </span>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <span className="text-gray-500 text-sm">
                                        Partai
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {dprdData.partai}
                                    </span>
                                </div>
                            </div>

                            <div className="pr-4">
                                <div className="flex flex-col mb-4">
                                    <span className="text-gray-500 text-sm">
                                        Dapil
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {dprdData.dapil}
                                    </span>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <span className="text-gray-500 text-sm">
                                        Logo Partai
                                    </span>
                                    <div className="w-20 h-auto p-1 mt-1">
                                        <Image
                                            src={dprdData.logoPartaiUrl}
                                            alt={`Logo ${dprdData.partai}`}
                                            width={80}
                                            height={80}
                                            className="object-contain"
                                            style={{ border: "1px solid #ccc" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-12 p-4">
                        <h2 className="text-xl font-bold text-[#284C66] border-b pb-3 mb-6">
                            Informasi Usulan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                            <div className="pr-4">
                                <div className="flex flex-col mb-4">
                                    <span className="text-gray-500 text-sm">
                                        Kategori Usulan
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {usulanData.kategori}
                                    </span>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <span className="text-gray-500 text-sm">
                                        Uraian Permasalahan
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {usulanData.uraian}
                                    </span>
                                </div>
                            </div>
                            <div className="pr-4">
                                <div className="flex flex-col mb-4">
                                    <span className="text-gray-500 text-sm">
                                        Usulan
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {usulanData.usulan}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                        <h2 className="text-xl font-bold text-[#284C66] border-b pb-3 mb-6">
                            Komentar
                        </h2>
                        <div className="flex items-center mb-8">
                            <textarea
                                className="w-full p-3 border border-gray-400 rounded-lg mr-4 focus:outline-none focus:ring-2 focus:ring-[#284C66]"
                                placeholder="Tulis komentar Anda..."
                                rows={2}
                            />
                            <button className="bg-[#284C66] hover:bg-[#1f3e53] text-white p-3 rounded-full transition duration-150 ease-in-out shrink-0">
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-700">
                                Riwayat Komentar ({historyKomentar.length})
                            </h3>
                            {historyKomentar.map((komentar, index) => (
                                <div key={index} className="flex space-x-4">
                                    <div className="shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                                        <PersonIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold text-gray-900">
                                                {komentar.nama}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                · {komentar.waktu}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mt-1">
                                            {komentar.isi}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UsulanDetail;
