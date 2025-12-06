"use client";

import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";
import { IResponse } from "@/app/_types/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useUser } from "@/app/_providers/UserProvider";
import { AutorenewOutlined } from "@mui/icons-material";
// import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IProposal, ProposalStatusType } from "@/app/_types/proposal";

const limitOptions: number[] = [5, 10, 15, 20, 25, 50];

export default function ProposalPage() {
    const { user } = useUser();

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const {
        data: dataProposal,
        // error: errorProposal,
        // mutate: mutateProposal,
        isLoading: isLoadingProposal,
    } = useSWR<IResponse<IProposal[]>>(
        `${ROUTE_LISTS.get("api-public-proposal-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // areaId: "",
            // search: "",
            // status: "",
            // categoryId: "",
        })}`
    );

    const getStatusColor = (status: ProposalStatusType) => {
        switch (status) {
            case "baru":
                return "bg-blue-100 text-blue-800";
            case "diproses":
                return "bg-yellow-100 text-yellow-800";
            case "selesai":
                return "bg-green-100 text-green-800";
        }
    };

    return (
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
                <div className="p-4 space-y-6">
                    <div className="flex justify-end space-x-3">
                        {user && (
                            <Link
                                href={
                                    ROUTE_LISTS.get("public-proposal-add") ??
                                    "/"
                                }
                                className="bg-[#284C66] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#1f3a4d] transition"
                            >
                                Tambah Usulan
                            </Link>
                        )}
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
                                    <th className="px-4 py-3 border-b">No</th>
                                    <th className="px-4 py-3 border-b">
                                        Nama Masyarakat
                                    </th>
                                    <th className="px-4 py-3 border-b">
                                        Judul Pengajuan
                                    </th>
                                    <th className="px-4 py-3 border-b text-right">
                                        Tanggal Pengajuan
                                    </th>
                                    <th className="px-4 py-3 border-b">
                                        Kategori Usulan
                                    </th>
                                    <th className="px-4 py-3 border-b">
                                        Dapil
                                    </th>
                                    <th className="px-4 py-3 border-b text-center">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 border-b text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoadingProposal && (
                                    <tr>
                                        <td
                                            colSpan={11}
                                            className="p-3 text-center text-gray-500"
                                        >
                                            <AutorenewOutlined
                                                className="animate-spin"
                                                fontSize="large"
                                            />
                                        </td>
                                    </tr>
                                )}
                                {!isLoadingProposal &&
                                    dataProposal?.data?.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-3">
                                                {(page - 1) * limit +
                                                    (index + 1)}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.user?.profile?.name ??
                                                    "-"}
                                            </td>
                                            <td className="px-4 py-3 overflow-hidden">
                                                <p className="line-clamp-2">
                                                    {item.title}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-right">
                                                {new Date(
                                                    item.createdAt
                                                ).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.category?.name ??
                                                    item.customCategory}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.area?.name}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span
                                                    className={`px-3 py-1 rounded-full font-bold text-xs lowercase ${getStatusColor(
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
                                                    {user &&
                                                        user.id ===
                                                            item.user.id && (
                                                            <>
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
                                                            </>
                                                        )}
                                                    {/* <button
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
                                                    </button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                        <p>
                            {dataProposal?.data?.length ?? 0} dari{" "}
                            {dataProposal?.totalData ?? 0} total data
                        </p>
                        <div className="flex gap-2 mt-3 sm:mt-0">
                            <Select
                                value={limit}
                                onChange={(e) => {
                                    setPage(1);
                                    setLimit(parseInt(e.target.value));
                                }}
                            >
                                {limitOptions.map((value, index) => (
                                    <option key={index} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </Select>
                            <Pagination
                                page={page}
                                setPage={setPage}
                                totalPages={dataProposal?.totalPage || 1}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
