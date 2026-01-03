"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { IUser } from "@/app/_types/user";
import { IResponse } from "@/app/_types/api";
import { ROUTE_LISTS } from "@/app/_constants/route";
import {
    // SearchOutlined,
    AutorenewOutlined,
} from "@mui/icons-material";

//
interface IStructureItem {
    ketua: IUser[];
    wakil: IUser[];
    sekretaris: IUser[];
    anggota: IUser[];
}

interface IUserStructure {
    pimpinan: IStructureItem;
    komisi: {
        [name: string]: IStructureItem;
    };
}

interface ItemRenderProps {
    title: string;
    items: IStructureItem;
}

//
const ItemRender = ({ title, items }: ItemRenderProps) => {
    return (
        <div>
            {items?.ketua?.length > 0 ||
            items?.wakil?.length > 0 ||
            items?.sekretaris?.length > 0 ||
            items?.anggota?.length > 0 ? (
                <>
                    <h3 className="text-lg font-bold text-[#284C66] mb-6">
                        {title}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {Object.keys(items).map((key) => {
                            const data = items[key as keyof IStructureItem];
                            return data.map((value) => (
                                <div key={value.id} className="flex gap-4">
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
                                                : {value.profile?.name ?? "-"}
                                            </span>
                                            <span className="font-semibold">
                                                JABATAN
                                            </span>
                                            <span className="col-span-2">
                                                : {value.position?.name}
                                            </span>
                                        </div>
                                        {value.accesses.length > 0 && (
                                            <div className="mt-3">
                                                <Image
                                                    src={
                                                        value.accesses[0]
                                                            ?.fraction
                                                            ?.imageUrl ??
                                                        "/images/no-image.jpg"
                                                    }
                                                    alt={
                                                        value.accesses[0]
                                                            ?.fraction?.name ??
                                                        "-"
                                                    }
                                                    width={80}
                                                    height={80}
                                                    className="h-16 w-auto"
                                                    unoptimized
                                                />
                                                <p className="mt-1 text-sm font-semibold">
                                                    {value.accesses[0]?.fraction
                                                        ?.name ?? "-"}
                                                </p>
                                            </div>
                                        )}
                                        <hr className="border-t-2 border-[#284C66] mt-3" />
                                    </div>
                                </div>
                            ));
                        })}
                    </div>
                </>
            ) : (
                <p className="sm:col-span-2 lg:col-span-3 text-center">
                    Tidak ada data
                </p>
            )}
        </div>
    );
};

export default function MemberPage() {
    const { data: dataUser, isLoading: isLoadingUser } = useSWR<
        IResponse<IUserStructure>
    >(`${ROUTE_LISTS.get("api-public-user-structural-get")}`);

    return (
        <>
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
                    {/* <h2 className="text-xl font-bold text-[#284C66] mb-2">
                        Cari Anggota DPRD Provinsi Lampung
                    </h2>
                    <div className="relative flex-1 max-w-full w-full">
                        <input
                            type="search"
                            placeholder="Cari"
                            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#284C66]"
                        />
                        <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div> */}

                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
                    </div> */}

                    <div className="mt-12">
                        <h2 className="text-xl font-bold text-[#284C66] mb-2">
                            Semua Anggota DPRD Provinsi Lampung
                        </h2>
                        {isLoadingUser && (
                            <div className="text-center">
                                <AutorenewOutlined
                                    className="animate-spin"
                                    fontSize="large"
                                />
                            </div>
                        )}
                        <div className="space-y-5">
                            {!isLoadingUser && dataUser?.data?.pimpinan && (
                                <ItemRender
                                    title="PIMPINAN"
                                    items={dataUser.data.pimpinan}
                                />
                            )}
                            {!isLoadingUser &&
                                dataUser?.data?.komisi &&
                                Object.keys(dataUser.data.komisi).map(
                                    (key, index) => (
                                        <ItemRender
                                            key={index}
                                            title={key}
                                            items={
                                                dataUser.data?.komisi[key] ??
                                                ({} as IStructureItem)
                                            }
                                        />
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
