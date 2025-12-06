"use client";

import useSWR from "swr";
import Image from "next/image";
import { IArea } from "@/app/_types/area";
import { IUser } from "@/app/_types/user";
import { IResponse } from "@/app/_types/api";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { AutorenewOutlined } from "@mui/icons-material";

//
interface AreaModalProps {
    area: IArea;
    onClose: () => void;
}

//
export default function AreaModal({ area, onClose }: AreaModalProps) {
    const {
        data: dataUser,
        // error: errorUser,
        // mutate: mutateUser,
        isLoading: isLoadingUser,
    } = useSWR<IResponse<IUser[]>>(
        `${ROUTE_LISTS.get("api-public-user-get")}?${new URLSearchParams({
            // page: "",
            // limit: "",
            // search: "",
            // roleId: "",
            areaId: area.id,
            // fractionId: "",
        })}`
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg relative p-6 max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-center text-xl font-semibold mb-4">
                    Daftar Anggota {area.name}
                </h2>

                {/* List Anggota */}
                <div className="space-y-6">
                    {isLoadingUser && (
                        <div className="text-center">
                            <AutorenewOutlined
                                className="animate-spin"
                                fontSize="large"
                            />
                        </div>
                    )}
                    {!isLoadingUser &&
                        dataUser?.data &&
                        dataUser.data.length !== 0 &&
                        dataUser.data.map((item, index) => (
                            <div
                                key={index}
                                className="border-b pb-6 flex flex-col md:flex-row items-start md:items-center gap-4"
                            >
                                <div>
                                    <Image
                                        src={
                                            item.profile?.imageUrl ??
                                            "/images/user.png"
                                        }
                                        alt={item.profile?.name ?? "-"}
                                        width={180}
                                        height={260}
                                        className="rounded-md object-cover"
                                        unoptimized
                                    />
                                </div>

                                {/* Info Anggota */}
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">
                                        {item.profile?.name ?? "-"}{" "}
                                        <span className="text-[#C2883C]">
                                            •{" "}
                                            {item.accesses?.[0]?.fraction
                                                ?.name ?? "-"}
                                        </span>
                                    </h3>

                                    <div className="grid grid-cols-2 gap-y-1 mt-3 text-sm">
                                        <span>AKD</span>
                                        <span>
                                            : {item.position?.name ?? "-"}
                                        </span>

                                        <span>Usia</span>
                                        <span>
                                            : {item.profile?.age ?? "-"}
                                        </span>

                                        <span>Jenis Kelamin</span>
                                        <span>
                                            :{" "}
                                            {item.profile?.gender
                                                ? item.profile.gender === "l"
                                                    ? "Laki-laki"
                                                    : "Perempuan"
                                                : "-"}
                                        </span>
                                    </div>
                                </div>

                                {/* Logo Partai */}
                                <div className="ml-auto">
                                    <Image
                                        src={
                                            item.accesses?.[0]?.fraction
                                                ?.imageUrl ??
                                            "/images/no-image.jpg"
                                        }
                                        alt={
                                            item.accesses?.[0]?.fraction
                                                ?.name ?? "-"
                                        }
                                        width={80}
                                        height={80}
                                        unoptimized
                                    />
                                </div>
                            </div>
                        ))}
                    {!isLoadingUser && dataUser?.data?.length === 0 && (
                        <p className="text-center">Tidak ada data</p>
                    )}
                    {!isLoadingUser && !dataUser?.data && (
                        <p className="text-red-500 text-center">
                            Mohon maaf, terjadi kesalahan sistem
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
