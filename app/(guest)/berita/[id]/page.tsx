"use client";

import useSWR from "swr";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IResponse } from "@/app/_types/api";
import { IArticle } from "@/app/_types/article";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { AutorenewOutlined, CalendarTodayOutlined } from "@mui/icons-material";

//
interface Param {
    id: string;
}

interface ArticleDetailPageProps {
    params: Promise<Param>;
}

//
export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
    const { id } = React.use(params);

    const { data: dataArticle, isLoading: isLoadingArticle } = useSWR<
        IResponse<IArticle>
    >(`${ROUTE_LISTS.get("api-article-one")?.replace(":id", id)}`);

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-[#284C66] py-24 text-center text-white">
                <h1 className="text-3xl font-semibold tracking-wide mb-3">
                    DETAIL BERITA
                </h1>
                <div className="text-sm text-gray-200">
                    <Link href="/" className="hover:underline">
                        Beranda
                    </Link>{" "}
                    <span className="mx-2">{">"}</span>
                    <span>Detail Berita</span>
                </div>
            </div>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-12">
                {isLoadingArticle && (
                    <div className="py-5 text-center">
                        <AutorenewOutlined
                            className="animate-spin"
                            fontSize="large"
                        />
                    </div>
                )}
                {!isLoadingArticle && dataArticle?.data && (
                    <>
                        <Image
                            src={
                                dataArticle.data.imageUrl ??
                                "/images/no-image.jpg"
                            }
                            alt={dataArticle.data.title}
                            width={1920}
                            height={1080}
                            className="object-contain"
                            unoptimized
                        />
                        <div className="pt-12">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="bg-[#284C66] text-white text-sm px-4 py-1 rounded-full">
                                    {dataArticle.data.category?.name ?? "-"}
                                </span>
                                <div className="flex items-center text-gray-600 text-sm gap-1">
                                    <CalendarTodayOutlined
                                        sx={{ fontSize: 14 }}
                                    />
                                    <span>
                                        {new Date(
                                            dataArticle.data.date
                                        ).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 leading-snug mb-6">
                                {dataArticle.data.title}
                            </h1>
                            <div className="text-gray-700 leading-relaxed space-y-6">
                                <p>{dataArticle.data.content}</p>
                            </div>
                        </div>
                    </>
                )}
                {!isLoadingArticle && !dataArticle?.data && (
                    <div className="py-5 text-center">
                        Mohon maaf, terjadi kesalahan sistem
                    </div>
                )}
                <div className="border-b mt-12 mb-8"></div>
                <h2 className="text-2xl font-bold text-[#284C66] mb-6">
                    Berita Lainnya
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            </div>
        </div>
    );
}
