"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { IResponse } from "../_types/api";
import { IArticle } from "../_types/article";
import { ROUTE_LISTS } from "../_constants/route";
import { AutorenewOutlined } from "@mui/icons-material";

const Berita = () => {
    const {
        data: dataArticle,
        // error: errorArticle,
        // mutate: mutateArticle,
        isLoading: isLoadingArticle,
    } = useSWR<IResponse<IArticle[]>>(
        `${ROUTE_LISTS.get("api-article-get")}?${new URLSearchParams({
            page: "1",
            limit: "9",
            // search: "",
            // categoryId: "",
        })}`
    );

    return (
        <div className="bg-[#e9eef2] min-h-96 py-8 px-6 lg:px-20">
            <div className="mb-10 border-b border-gray-400 pb-2">
                <h2 className="text-3xl font-bold text-[#284C66]">
                    Berita Terkini
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoadingArticle && (
                    <div className="sm:col-span-2 lg:col-span-3 text-center">
                        <AutorenewOutlined
                            className="animate-spin"
                            fontSize="large"
                        />
                    </div>
                )}
                {!isLoadingArticle &&
                    dataArticle?.data &&
                    dataArticle.data.length !== 0 &&
                    dataArticle.data.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition relative"
                        >
                            <div className="relative h-56">
                                <Image
                                    src={
                                        item.imageUrl ?? "/images/no-image.jpg"
                                    }
                                    alt={item.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-xl"
                                    unoptimized
                                />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-5 text-white rounded-b-xl">
                                {item.category && (
                                    <div className="absolute top-4 left-4 bg-[#284C66] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        {item.category.name}
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
                                    {new Date(
                                        item.createdAt
                                    ).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </div>

                                <h3 className="font-semibold text-base leading-snug mb-3">
                                    {item.title}
                                </h3>

                                <Link
                                    href={`/pages/berita-detail`}
                                    className="bg-white text-[#284C66] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#f4f4f4] transition"
                                >
                                    Lihat Selengkapnya
                                </Link>
                            </div>
                        </div>
                    ))}
                {!isLoadingArticle && dataArticle?.data?.length === 0 && (
                    <p className="sm:col-span-2 lg:col-span-3 text-center">
                        Tidak ada data
                    </p>
                )}
                {!isLoadingArticle && !dataArticle?.data && (
                    <p className="sm:col-span-2 lg:col-span-3 text-center text-red-500">
                        Mohon maaf, terjadi kesalahan sistem
                    </p>
                )}
            </div>
        </div>
    );
};

export default Berita;
