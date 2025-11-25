"use client";

import useSWR from "swr";
import { useState } from "react";
import { IRole } from "@/app/_types/role";
import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import { postRequest } from "@/app/_utils/api";
import { BadgeOutlined } from "@mui/icons-material";
import Select from "@/app/_components/inputs/select";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { useAlert } from "@/app/_providers/AlertProvider";
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
    const [email] = useState<string>("");
    const [roleId] = useState<string>("");
    const [password] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataRole,
        // error: errorRole,
        // isLoading: isLoadingRole,
    } = useSWR<IResponse<IRole[]>>(`${ROUTE_LISTS.get("api-role-get")}`);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await postRequest({
            body: { email, roleId, password },
            alert,
            setErrors,
            setLoading,
            setErrorMessage,
            route: "api-user-add",
            errorMessage: "Gagal menambahkan pengguna",
            successMessage: "Berhasil menambahkan pengguna",
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
            <div className="flex items-center gap-1.5">
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
                        {dataRole?.data?.map((role, index) => (
                            <option key={index} value={role.id}>
                                {role.name}
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
                        {dataRole?.data?.map((role, index) => (
                            <option key={index} value={role.id}>
                                {role.name}
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
                        {dataRole?.data?.map((role, index) => (
                            <option key={index} value={role.id}>
                                {role.name}
                            </option>
                        ))}
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
                        variant="outline"
                        isLoading={loading}
                    >
                        Simpan
                    </Button>
                </div>
            </form>
        </>
    );
}
