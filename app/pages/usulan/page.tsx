"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

interface UsulanItem {
    no: number;
    namaMasyarakat: string;
    judulPengajuan: string;
    tanggalPengajuan: string;
    kategoriUsulan: string;
    dapil: string;
    partai: string;
    logoPartaiUrl: string;
    wakilRakyat: string;
    status: "Disetujui" | "Menunggu" | "Ditolak";
    id: number;
}

const UsulanPage = () => {
    const usulanData: UsulanItem[] = [
        {
            no: 1,
            namaMasyarakat: "Nabila P.",
            judulPengajuan: "Perbaikan Jalan Gg Swadaya",
            tanggalPengajuan: "01/11/2025",
            kategoriUsulan: "Infrastruktur",
            dapil: "Dapil II",
            partai: "Gerindra",
            logoPartaiUrl: "/gerindra.png",
            wakilRakyat: "MULYANTO, S.H, M.H",
            status: "Disetujui",
            id: 101,
        },
        {
            no: 2,
            namaMasyarakat: "Wawan S.",
            judulPengajuan: "Bantuan Pupuk untuk Petani",
            tanggalPengajuan: "25/10/2025",
            kategoriUsulan: "Pertanian",
            dapil: "Dapil I",
            partai: "PDIP",
            logoPartaiUrl: "/gerindra.png",
            wakilRakyat: "WAHYU, S.E",
            status: "Menunggu",
            id: 102,
        },
        {
            no: 3,
            namaMasyarakat: "Badru T.",
            judulPengajuan: "Pengadaan Alat Kesehatan Posyandu",
            tanggalPengajuan: "15/10/2025",
            kategoriUsulan: "Kesehatan",
            dapil: "Dapil III",
            partai: "Demokrat",
            logoPartaiUrl: "/gerindra.png",
            wakilRakyat: "FIRDAUS H.",
            status: "Ditolak",
            id: 103,
        },
    ];

    const getStatusColor = (status: UsulanItem["status"]) => {
        switch (status) {
            case "Disetujui":
                return "bg-green-100 text-green-800";
            case "Menunggu":
                return "bg-yellow-100 text-yellow-800";
            case "Ditolak":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

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
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="p-4">
                        <div className="flex justify-end mb-6 space-x-3">
                            <button className="bg-[#284C66] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#1f3a4d] transition">
                                Unduh QR
                            </button>
                            <Link
                                href={`/pages/proposal/tambahProposal`}
                                className="bg-[#284C66] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#1f3a4d] transition"
                            >
                                Tambah Usulan
                            </Link>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4 order-2">
                            <button className="flex items-center bg-[#284C66] text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-[#1f3a4d] transition w-full md:w-auto">
                                <FilterListIcon
                                    className="h-4 w-4 mr-2"
                                    style={{ fontSize: "18px" }}
                                />
                                Filter
                            </button>
                            <div className="relative flex-1 max-w-full w-full">
                                <input
                                    type="text"
                                    placeholder="Cari..."
                                    className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66]"
                                />
                                <SearchIcon
                                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                    style={{ fontSize: "20px" }}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
                            <table className="min-w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f6f0e0] text-gray-700 font-semibold sticky top-0">
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
                                        <th className="px-4 py-3 border-b text-center">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usulanData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-3">
                                                {item.no}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.namaMasyarakat}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.judulPengajuan}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {item.tanggalPengajuan}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.kategoriUsulan}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.dapil}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.partai}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="w-8 h-8 relative">
                                                    <Image
                                                        src={item.logoPartaiUrl}
                                                        alt={`Logo ${item.partai}`}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {item.wakilRakyat}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <Link
                                                        href={`/usulan/${item.id}`}
                                                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition"
                                                        title="Lihat Detail"
                                                    >
                                                        <VisibilityIcon
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                            }}
                                                        />
                                                    </Link>
                                                    <button
                                                        className="text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-50 transition"
                                                        title="Edit"
                                                    >
                                                        <EditIcon
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                            }}
                                                        />
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition"
                                                        title="Hapus"
                                                    >
                                                        <DeleteIcon
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                            }}
                                                        />
                                                    </button>
                                                    <button
                                                        className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50 transition"
                                                        title="Suka"
                                                    >
                                                        <ThumbUpIcon
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                            }}
                                                        />
                                                    </button>
                                                    <button
                                                        className="text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition"
                                                        title="Tidak Suka"
                                                    >
                                                        <ThumbDownIcon
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                            }}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {usulanData.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={11}
                                                className="text-center py-10 text-gray-500"
                                            >
                                                No results.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-600">
                            <p>
                                {usulanData.length} dari {usulanData.length}{" "}
                                total data
                            </p>
                            <div className="flex items-center gap-2 mt-3 sm:mt-0">
                                <select className="border rounded-md px-2 py-1 focus:ring-[#284C66] focus:border-[#284C66]">
                                    <option>5</option>
                                    <option>10</option>
                                    <option>20</option>
                                </select>
                                <button className="border rounded-md px-2 py-1 hover:bg-gray-50 transition">
                                    &lt;
                                </button>
                                <button className="bg-[#F19349] text-white rounded-md px-3 py-1 font-semibold">
                                    1
                                </button>
                                <button className="border rounded-md px-2 py-1 hover:bg-gray-50 transition">
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
