"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { IArea } from "@/app/_types/area";
import Article from "./_components/article";
import { IResponse } from "@/app/_types/api";
import AreaModal from "./_components/modal/area";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { AutorenewOutlined } from "@mui/icons-material";

//
const Map = dynamic(() => import("@/app/(guest)/_components/map"), {
    ssr: false,
});

//
export default function BasePage() {
    const [selectedArea, setSelectedArea] = useState<IArea | null>(null);

    const {
        data: dataArea,
        // error: errorArea,
        // mutate: mutateArea,
        isLoading: isLoadingArea,
    } = useSWR<IResponse<IArea[]>>(`${ROUTE_LISTS.get("api-public-area-get")}`);

    return (
        <>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 order-2 md:order-1">
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
                            <span className="text-[#F19349] tracking-wider">
                                SELAMAT DATANG DI
                            </span>
                            <span className="text-[#284C66] px-4">
                                SISTEM INFORMASI
                            </span>
                            <br />
                            <span className="text-[#284C66]">
                                MANAJEMEN RESES
                            </span>
                            <br />
                            <span className="text-[#284C66]">
                                DPRD PROVINSI LAMPUNG
                            </span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                        <div className="relative w-full h-sm:h-80 md:h-92">
                            <Image
                                src="/images/app-logo-fix.png"
                                alt="hola"
                                layout="fill"
                                objectFit="contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Map data={dataArea?.data} loading={isLoadingArea} />
            <div className="bg-white">
                <section className="bg-gray-50 py-16">
                    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#284C66] mb-12">
                            Berikut Daftar Dapil DPRD Provinsi Lampung
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {isLoadingArea && (
                                <div className="sm:col-span-2">
                                    <AutorenewOutlined
                                        className="animate-spin"
                                        fontSize="large"
                                    />
                                </div>
                            )}
                            {!isLoadingArea &&
                                dataArea?.data &&
                                dataArea?.data?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center justify-between border border-gray-400 hover:bg-[#f5954b] transition"
                                    >
                                        <h3 className="text-[#284C66] font-bold text-lg text-center mb-6 leading-relaxed">
                                            {item.name}
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
                                            <button
                                                className="bg-[#284C66] hover:bg-[#1f3a4d] text-white px-6 py-2 rounded-full text-sm font-semibold transition"
                                                onClick={() =>
                                                    setSelectedArea(item)
                                                }
                                            >
                                                Anggota Dapil
                                            </button>
                                            <Link
                                                href={`${
                                                    ROUTE_LISTS.get(
                                                        "public-proposal"
                                                    ) ?? "/"
                                                }?areaId=${item.id}`}
                                                className="bg-[#F19349] hover:bg-[#e17b2f] text-white px-6 py-2 rounded-full text-sm font-semibold transition"
                                            >
                                                Usulan Dapil
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            {!isLoadingArea && !dataArea?.data && (
                                <p className="sm:col-span-2 text-red-500">
                                    Mohon maaf, terjadi kesalahan sistem
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            {selectedArea && (
                <AreaModal
                    area={selectedArea}
                    onClose={() => setSelectedArea(null)}
                />
            )}
            <Article />
        </>
    );
}
