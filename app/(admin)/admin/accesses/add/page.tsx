"use client";

import useSWR from "swr";
import { useState } from "react";
import { IArea } from "@/app/_types/area";
import { IUser } from "@/app/_types/user";
import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import { IFraction } from "@/app/_types/fraction";
import { BadgeOutlined } from "@mui/icons-material";
import Select from "@/app/_components/inputs/select";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { useAlert } from "@/app/_providers/AlertProvider";
import { mapRequest, postRequest } from "@/app/_utils/api";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Akses Pengguna",
        path: ROUTE_LISTS.get("access"),
    },
    {
        name: "Tambah",
    },
];

const prevRoute: string = ROUTE_LISTS.get("access") ?? "/";

//
export default function AddUserAccessPage() {
    const alert = useAlert();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [areaId, setAreaId] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [fractionId, setFractionId] = useState<string>("");
    const [publicUser, setPublicUser] = useState<string>("false");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataArea,
        // error: errorArea,
        // isLoading: isLoadingArea,
    } = useSWR<IResponse<IArea[]>>(`${ROUTE_LISTS.get("api-area-get")}`);

    const {
        data: dataUser,
        // error: errorUser,
        // isLoading: isLoadingUser,
    } = useSWR<IResponse<IUser[]>>(`${ROUTE_LISTS.get("api-user-get")}`);

    const {
        data: dataFraction,
        // error: errorFraction,
        // isLoading: isLoadingFraction,
    } = useSWR<IResponse<IFraction[]>>(
        `${ROUTE_LISTS.get("api-fraction-get")}`
    );

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await postRequest({
            body: mapRequest({
                areaId,
                userId,
                fractionId,
                publicUser: publicUser === "true",
            }),
            alert,
            setErrors,
            setLoading,
            setErrorMessage,
            route: "api-access-add",
            errorMessage: "Gagal menambahkan akses pengguna",
            successMessage: "Berhasil menambahkan akses pengguna",
            successAction: () => {
                setTimeout(() => {
                    router.push(prevRoute);
                }, 1500);
            },
        });
    };

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                <BadgeOutlined />
                <h2>Tambah Akses Pengguna</h2>
            </div>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3"
            >
                <Label text="Pengguna" error={errors?.get("userId")} required>
                    <Select
                        value={userId}
                        error={errors?.get("userId")}
                        placeholder="Pilih pengguna"
                        onChange={(e) => {
                            setUserId(e.target.value);
                            setErrors((prev) => {
                                prev?.delete("userId");
                                return prev?.size ? prev : null;
                            });
                        }}
                    >
                        {dataUser?.data?.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.profile?.name} ({item.email})
                            </option>
                        ))}
                    </Select>
                </Label>
                <Label text="Area" error={errors?.get("areaId")} required>
                    <Select
                        value={areaId}
                        error={errors?.get("areaId")}
                        placeholder="Pilih area"
                        onChange={(e) => {
                            setAreaId(e.target.value);
                            setErrors((prev) => {
                                prev?.delete("areaId");
                                return prev?.size ? prev : null;
                            });
                        }}
                    >
                        {dataArea?.data?.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Label>
                <Label text="Partai" error={errors?.get("fractionId")} required>
                    <Select
                        value={fractionId}
                        error={errors?.get("fractionId")}
                        placeholder="Pilih partai"
                        onChange={(e) => {
                            setFractionId(e.target.value);
                            setErrors((prev) => {
                                prev?.delete("fractionId");
                                return prev?.size ? prev : null;
                            });
                        }}
                    >
                        {dataFraction?.data?.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Label>
                <Label
                    text="Visibilitas"
                    error={errors?.get("publicUser")}
                    required
                >
                    <Select
                        value={publicUser}
                        error={errors?.get("publicUser")}
                        onChange={(e) => {
                            setPublicUser(e.target.value);
                            setErrors((prev) => {
                                prev?.delete("publicUser");
                                return prev?.size ? prev : null;
                            });
                        }}
                    >
                        <option value="false">Privat</option>
                        <option value="true">Publik</option>
                    </Select>
                </Label>
                <p className="md:col-span-2 text-red-500 text-center">
                    {errorMessage && errorMessage}
                </p>
                <div className="md:col-span-2 flex justify-end gap-3">
                    <Link href={prevRoute} size="sm" variant="outline">
                        Kembali
                    </Link>
                    <Button
                        type="submit"
                        size="sm"
                        variant="primary"
                        isLoading={loading}
                    >
                        Simpan
                    </Button>
                </div>
            </form>
        </>
    );
}
