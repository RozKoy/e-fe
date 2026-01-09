"use client";

import {
    IProposal,
    IProposalVote,
    ProposalStatusType,
} from "@/app/_types/proposal";
import useSWR from "swr";
import Image from "next/image";
import dynamic from "next/dynamic";
import DefaultLink from "next/link";
import Link from "@/app/_components/link";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import React, { useRef, useEffect } from "react";
import { permissionCheck } from "@/app/_utils/auth";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { ArticleOutlined } from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useUser } from "@/app/_providers/UserProvider";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useLoading } from "@/app/_providers/LoadingProvider";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
interface Param {
    id: string;
}

interface DetailProposalPageProps {
    params: Promise<Param>;
}

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Usulan",
        path: ROUTE_LISTS.get("proposal"),
    },
    {
        name: "Detail",
    },
];

const prevRoute: string = ROUTE_LISTS.get("proposal") ?? "/";

//
const MapPicker = dynamic(() => import("@/app/(guest)/_components/mapfield"), {
    ssr: false,
});

export default function DetailProposalPage({
    params,
}: DetailProposalPageProps) {
    const { id } = React.use(params);

    const router = useRouter();
    const { user } = useUser();
    const { setRootLoading } = useLoading();

    const hasError = useRef<boolean>(false);

    const {
        data: dataProposal,
        error: errorProposal,
        // mutate: mutateProposal,
        isLoading: isLoadingProposal,
    } = useSWR<IResponse<IProposal>>(
        `${ROUTE_LISTS.get("api-public-proposal-one")?.replace(":id", id)}`
    );

    const {
        data: dataVote,
        // error: errorVote,
        // mutate: mutateVote,
        // isLoading: isLoadingVote,
    } = useSWR<IResponse<IProposalVote>>(
        `${ROUTE_LISTS.get("api-public-proposal-vote-get")?.replace(":id", id)}`
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

    useEffect(() => {
        setRootLoading(true);

        if (user) {
            if (!permissionCheck(user, ["Lihat Disposisi Proposal"])) {
                const timeout = setTimeout(() => {
                    router.push(prevRoute);
                    setRootLoading(false);
                }, 1000);

                return () => clearTimeout(timeout);
            }

            const timeout = setTimeout(() => {
                setRootLoading(false);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [user, router, setRootLoading]);

    useEffect(() => {
        if (!hasError.current) {
            if (!isLoadingProposal && errorProposal) {
                router.push(prevRoute);
                hasError.current = true;
            }
        }
    }, [router, errorProposal, isLoadingProposal]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                <ArticleOutlined />
                <h2>Detail Proposal</h2>
            </div>
            <div className="grid gap-x-5 gap-y-5">
                <p className="font-medium text-primary text-2xl">
                    Informasi Pembuat Usulan
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                    {dataProposal?.data?.user.profile?.imageUrl && (
                        <div className="row-span-2">
                            <p className="font-medium text-primary">Foto</p>
                            <div className="relative max-w-36 max-h-36 aspect-square">
                                <Image
                                    src={
                                        dataProposal?.data?.user.profile
                                            ?.imageUrl
                                    }
                                    alt={dataProposal?.data?.user.profile?.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{ objectFit: "contain" }}
                                    unoptimized
                                />
                            </div>
                        </div>
                    )}
                    <div>
                        <p className="font-medium text-primary">Nama Lengkap</p>
                        <p>{dataProposal?.data?.user?.profile?.name}</p>
                    </div>
                    <div>
                        <p className="font-medium text-primary">
                            Jenis Kelamin
                        </p>
                        <p>
                            {dataProposal?.data?.user?.profile?.gender
                                ? dataProposal?.data?.user?.profile?.gender ===
                                  "l"
                                    ? "Laki-laki"
                                    : "Perempuan"
                                : "-"}
                        </p>
                    </div>
                </div>
                {dataProposal?.data?.peopleInCharges && (
                    <>
                        <p className="font-medium text-primary text-2xl">
                            Informasi Anggota Dewan
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                            <div>
                                <p className="font-medium text-primary">
                                    Nama Lengkap
                                </p>
                                <p>
                                    {
                                        dataProposal?.data?.peopleInCharges
                                            ?.profile?.name
                                    }
                                </p>
                            </div>
                            <div>
                                <p className="font-medium text-primary">
                                    Posisi
                                </p>
                                <p>
                                    {
                                        dataProposal?.data?.peopleInCharges
                                            ?.position?.name
                                    }
                                </p>
                            </div>
                            <div>
                                <p className="font-medium text-primary">
                                    Partai
                                </p>
                                <p>
                                    {
                                        dataProposal?.data?.peopleInCharges
                                            ?.accesses?.[0]?.fraction?.name
                                    }
                                </p>
                            </div>
                        </div>
                    </>
                )}
                <p className="font-medium text-primary text-2xl">
                    Informasi Usulan
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                    <div>
                        <p className="font-medium text-primary">
                            Daerah Pilihan
                        </p>
                        <p>{dataProposal?.data?.area?.name}</p>
                    </div>
                    <div>
                        <p className="font-medium text-primary">Kategori</p>
                        <p>
                            {dataProposal?.data?.category?.name ??
                                dataProposal?.data?.customCategory}
                        </p>
                    </div>
                    <div>
                        <p className="font-medium text-primary">Tanggal</p>
                        <p>
                            {new Date(
                                dataProposal?.data?.createdAt ?? ""
                            ).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <div>
                        <p className="font-medium text-primary">Status</p>
                        <span
                            className={`mr-auto px-3 py-1 rounded-full font-bold text-xs lowercase ${getStatusColor(
                                dataProposal?.data?.status ?? "baru"
                            )}`}
                        >
                            {dataProposal?.data?.status}
                        </span>
                    </div>
                    <div className="col-span-2">
                        <p className="font-medium text-primary">Judul</p>
                        <p>{dataProposal?.data?.title}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="font-medium text-primary">Deskripsi</p>
                        <p>{dataProposal?.data?.description}</p>
                    </div>
                    <div>
                        <p className="font-medium text-primary">
                            File Pendukung
                        </p>
                        <p>
                            {dataProposal?.data?.fileUrl ? (
                                <DefaultLink
                                    href={dataProposal.data.fileUrl}
                                    target="_blank"
                                    className="font-medium text-primary hover:underline transition-all"
                                >
                                    Buka
                                </DefaultLink>
                            ) : (
                                "-"
                            )}
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                            <ThumbUpIcon fontSize="small" />
                            {dataVote?.data?.agree ?? 0}
                        </div>
                        <div className="flex items-center gap-0.5">
                            <ThumbDownIcon fontSize="small" />
                            {dataVote?.data?.disagree ?? 0}
                        </div>
                    </div>
                </div>

                {dataProposal?.data?.latitude &&
                    dataProposal?.data?.longitude && (
                        <div>
                            <MapPicker
                                latitude={parseFloat(
                                    dataProposal.data.latitude
                                )}
                                longitude={parseFloat(
                                    dataProposal.data.longitude
                                )}
                                disabled={true}
                            ></MapPicker>
                        </div>
                    )}

                <div className="flex justify-end gap-3">
                    <Link href={prevRoute} size="sm" variant="outline">
                        Kembali
                    </Link>
                </div>
            </div>
        </>
    );
}
