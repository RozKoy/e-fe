"use client";

import {
    IProposal,
    IProposalVote,
    IProposalSelfVote,
    ProposalStatusType,
    IProposalDiscussion,
} from "@/app/_types/proposal";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Label from "@/app/_components/label";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import { ROUTE_LISTS } from "@/app/_constants/route";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useUser } from "@/app/_providers/UserProvider";
import { AutorenewOutlined } from "@mui/icons-material";
import Textarea from "@/app/_components/inputs/textarea";
import { useAlert } from "@/app/_providers/AlertProvider";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { mapRequest, postRequest } from "@/app/_utils/api";

//
interface Param {
    id: string;
}

interface ProposalDetailPageProps {
    params: Promise<Param>;
}

//
function formatTimeAgo(input: Date | string | number): string {
    const now = Date.now();
    const time = new Date(input).getTime();

    const diffMs = now - time;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    }

    if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    }

    if (diffDays < 30) {
        return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }

    return new Date(input).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

//
export default function ProposalDetailPage({
    params,
}: ProposalDetailPageProps) {
    const alert = useAlert();
    const { user } = useUser();
    const { id } = React.use(params);

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [comment, setComment] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataProposal,
        // error: errorProposal,
        // mutate: mutateProposal,
        isLoading: isLoadingProposal,
    } = useSWR<IResponse<IProposal>>(
        `${ROUTE_LISTS.get("api-public-proposal-one")?.replace(":id", id)}`
    );

    const {
        data: dataVote,
        // error: errorVote,
        mutate: mutateVote,
        // isLoading: isLoadingVote,
    } = useSWR<IResponse<IProposalVote>>(
        `${ROUTE_LISTS.get("api-public-proposal-vote-get")?.replace(":id", id)}`
    );

    const {
        data: dataSelfVote,
        // error: errorSelfVote,
        mutate: mutateSelfVote,
        // isLoading: isLoadingSelfVote,
    } = useSWR<IResponse<IProposalSelfVote>>(
        `${ROUTE_LISTS.get("api-proposal-self-vote-get")?.replace(":id", id)}`
    );

    const {
        data: dataDiscussion,
        // error: errorDiscussion,
        mutate: mutateDiscussion,
        // isLoading: isLoadingDiscussion,
    } = useSWR<IResponse<IProposalDiscussion>>(
        `${ROUTE_LISTS.get("api-public-proposal-discussion-get")?.replace(
            ":id",
            id
        )}`
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

    const handleVote = async (agree: boolean) => {
        if (!user) {
            alert.addAlert({
                type: "warning",
                message:
                    "Mohon login terlebih dahulu untuk memberikan komentar",
                options: {
                    autoClose: false,
                },
            });
            return;
        }

        await postRequest({
            body: mapRequest({ agree }),
            alert,
            setErrors,
            setLoading,
            setErrorMessage,
            route: () =>
                ROUTE_LISTS.get("api-public-proposal-vote-add")?.replace(
                    ":id",
                    id
                ) ?? "",
            errorMessage: "Gagal melakukan vote",
            successMessage: "Berhasil melakukan vote",
            successAction: () => {
                mutateVote();
                mutateSelfVote();
                setLoading(false);
            },
        });
    };

    const handleAddDiscussion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            alert.addAlert({
                type: "warning",
                message:
                    "Mohon login terlebih dahulu untuk memberikan komentar",
                options: {
                    autoClose: false,
                },
            });
            return;
        }

        await postRequest({
            body: mapRequest({ message: comment }),
            alert,
            setErrors,
            setLoading,
            setErrorMessage,
            route: () =>
                ROUTE_LISTS.get("api-public-proposal-discussion-add")?.replace(
                    ":id",
                    id
                ) ?? "",
            errorMessage: "Gagal menambahkan komentar",
            successMessage: "Berhasil menambahkan komentar",
            successAction: () => {
                setComment("");
                mutateDiscussion();
                setLoading(false);
            },
        });
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
                    <span>Detail Usulan</span>
                </div>
            </div>

            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                <div className="flex justify-start space-x-4 mb-8">
                    <button
                        className={`${
                            dataSelfVote?.data?.agree === true
                                ? "bg-green-400/50"
                                : "bg-gray-400"
                        } flex items-center space-x-2 hover:bg-green-500/50 text-white py-2 px-4 rounded-full transition duration-150 ease-in-out cursor-pointer`}
                        onClick={() => handleVote(true)}
                    >
                        <ThumbUpIcon fontSize="small" />
                        <span>{dataVote?.data?.agree}</span>
                    </button>
                    <button
                        className={`${
                            dataSelfVote?.data?.agree === false
                                ? "bg-red-400/50"
                                : "bg-gray-400"
                        } flex items-center space-x-2 bg-gray-400 hover:bg-red-500/50 text-white py-2 px-4 rounded-full transition duration-150 ease-in-out cursor-pointer`}
                        onClick={() => handleVote(false)}
                    >
                        <ThumbDownIcon fontSize="small" />
                        <span>{dataVote?.data?.disagree}</span>
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8 p-4">
                    <h2 className="text-xl font-bold text-[#284C66] border-b pb-3 mb-6">
                        Informasi Data Diri
                    </h2>
                    {isLoadingProposal && (
                        <div className="text-center">
                            <AutorenewOutlined
                                className="animate-spin"
                                fontSize="large"
                            />
                        </div>
                    )}
                    {!isLoadingProposal && dataProposal?.data && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">
                                    Nama Lengkap
                                </span>
                                <span className="text-gray-800 font-medium">
                                    {dataProposal.data.user?.profile?.name ??
                                        "-"}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">
                                    Jenis Kelamin
                                </span>
                                <span className="text-gray-800 font-medium">
                                    {dataProposal.data.user?.profile?.gender
                                        ? dataProposal.data.user.profile
                                              .gender === "l"
                                            ? "Laki-laki"
                                            : "Perempuan"
                                        : "-"}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-12 p-4">
                    <h2 className="text-xl font-bold text-[#284C66] border-b pb-3 mb-6">
                        Informasi Usulan
                    </h2>
                    {isLoadingProposal && (
                        <div className="text-center">
                            <AutorenewOutlined
                                className="animate-spin"
                                fontSize="large"
                            />
                        </div>
                    )}
                    {!isLoadingProposal && dataProposal?.data && (
                        <div className="flex flex-col gap-x-12 gap-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm">
                                        Daerah Pilihan
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {dataProposal.data.area?.name ?? "-"}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm">
                                        Kategori
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {dataProposal.data.category?.name ??
                                            dataProposal?.data.customCategory}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm">
                                        Status
                                    </span>
                                    <span
                                        className={`mr-auto px-3 py-1 rounded-full font-bold text-xs lowercase ${getStatusColor(
                                            dataProposal.data.status
                                        )}`}
                                    >
                                        {dataProposal.data.status}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm">
                                        Tanggal
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {new Date(
                                            dataProposal.data.createdAt
                                        ).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">
                                    Judul
                                </span>
                                <span className="text-gray-800 font-medium">
                                    {dataProposal.data.title}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">
                                    Deskripsi
                                </span>
                                <span className="text-gray-800 font-medium">
                                    {dataProposal.data.description}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">
                                    File Pendukung
                                </span>
                                <span className="text-gray-800 font-medium">
                                    {dataProposal.data.fileUrl ? (
                                        <Link
                                            href={dataProposal.data.fileUrl}
                                            target="_blank"
                                            className="font-medium text-primary hover:underline transition-all"
                                        >
                                            Buka
                                        </Link>
                                    ) : (
                                        "-"
                                    )}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 space-y-4">
                    <h2 className="text-xl font-bold text-[#284C66] border-b pb-3">
                        Komentar
                    </h2>
                    <form
                        onSubmit={handleAddDiscussion}
                        className="flex items-center gap-3"
                    >
                        <div className="w-full">
                            <Label text="" error={errors?.get("message")}>
                                <Textarea
                                    value={comment}
                                    error={errors?.get("message")}
                                    placeholder="Berikan komentar"
                                    onChange={(e) => {
                                        setComment(e.target.value);
                                        setErrors((prev) => {
                                            prev?.delete("message");
                                            return prev?.size ? prev : null;
                                        });
                                    }}
                                />
                            </Label>
                        </div>
                        <Button
                            type="submit"
                            rounded="full"
                            size="sm"
                            isLoading={loading}
                        >
                            <SendIcon fontSize="small" />
                        </Button>
                    </form>
                    {user && (
                        <p className="text-xs text-red-500">
                            {errorMessage ?? "Hanya dapat memberikan 5 pesan"}
                        </p>
                    )}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Riwayat Komentar (
                            {dataDiscussion?.data?.data?.length ?? 0})
                        </h3>
                        {dataDiscussion?.data?.data?.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4"
                            >
                                <div className="shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                                    {item.user?.profile?.imageUrl ? (
                                        <Image
                                            src={
                                                item.user.profile.imageUrl ??
                                                "/images/user.png"
                                            }
                                            alt="user"
                                            fill
                                            style={{ objectFit: "cover" }}
                                            unoptimized
                                        />
                                    ) : (
                                        <PersonIcon className="w-5 h-5" />
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center space-x-1.5">
                                        <span className="font-bold text-gray-900">
                                            {item.user?.profile?.name ?? "-"}
                                        </span>
                                        <div className="w-0.5 aspect-square rounded-full bg-gray-500"></div>
                                        <span className="text-xs text-gray-500">
                                            {formatTimeAgo(item.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">
                                        {item.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
