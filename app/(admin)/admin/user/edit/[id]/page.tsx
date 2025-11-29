"use client";

import useSWR from "swr";
import { IRole } from "@/app/_types/role";
import { IUser } from "@/app/_types/user";
import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import { postRequest } from "@/app/_utils/api";
import { IPosition } from "@/app/_types/position";
import Input from "@/app/_components/inputs/input";
import Select from "@/app/_components/inputs/select";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { PeopleAltOutlined } from "@mui/icons-material";
import { useAlert } from "@/app/_providers/AlertProvider";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";
import React, { startTransition, useEffect, useRef, useState } from "react";

//
interface Param {
    id: string;
}

interface EditUserPageProps {
    params: Promise<Param>;
}

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Pengguna",
        path: ROUTE_LISTS.get("user"),
    },
    {
        name: "Ubah",
    },
];

const prevRoute: string = ROUTE_LISTS.get("user") ?? "/";

//
export default function EditUserPage({ params }: EditUserPageProps) {
    const { id } = React.use(params);

    const alert = useAlert();
    const router = useRouter();

    const hasError = useRef<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [email, setEmail] = useState<string>("");
    const [roleId, setRoleId] = useState<string>("");
    const [positionId, setPositionId] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataUser,
        error: errorUser,
        isLoading: isLoadingUser,
    } = useSWR<IResponse<IUser>>(
        `${ROUTE_LISTS.get("api-user-one")?.replace(":id", id)}`
    );

    const {
        data: dataRole,
        // error: errorRole,
        // isLoading: isLoadingRole,
    } = useSWR<IResponse<IRole[]>>(`${ROUTE_LISTS.get("api-role-get")}`);

    const {
        data: dataPosition,
        // error: errorPosition,
        // isLoading: isLoadingPosition,
    } = useSWR<IResponse<IPosition[]>>(
        `${ROUTE_LISTS.get("api-position-get")}`
    );

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await postRequest({
            body: { email, roleId, positionId },
            alert,
            setErrors,
            setLoading,
            setErrorMessage,
            route: () =>
                ROUTE_LISTS.get("api-user-update")?.replace(":id", id) ?? "",
            method: "PUT",
            errorMessage: "Gagal menambahkan pengguna",
            successMessage: "Berhasil menambahkan pengguna",
            successAction: () => {
                setTimeout(() => {
                    router.push(prevRoute);
                }, 1500);
            },
        });
    };

    useEffect(() => {
        if (!hasError.current) {
            if (!isLoadingUser && errorUser) {
                router.push(prevRoute);
                hasError.current = true;
            }
        }
    }, [router, errorUser, isLoadingUser]);

    useEffect(() => {
        if (dataUser?.data) {
            startTransition(() => {
                setEmail(dataUser?.data?.email ?? "");
                setRoleId(dataUser?.data?.role?.id ?? "");
                setPositionId(dataUser?.data?.position?.id ?? "");
            });
        }
    }, [dataUser?.data]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                <PeopleAltOutlined />
                <h2>Ubah Pengguna</h2>
            </div>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3"
            >
                <Label text="Nama" error={errors?.get("name")} required>
                    <Input
                        placeholder="Masukkan nama"
                        defaultValue={dataUser?.data?.profile?.name ?? ""}
                        disabled={true}
                    />
                </Label>
                <Label text="Email" error={errors?.get("email")} required>
                    <Input
                        value={email}
                        error={errors?.get("email")}
                        placeholder="email@example.com"
                        onInput={() =>
                            setErrors((prev) => {
                                prev?.delete("email");
                                return prev?.size ? prev : null;
                            })
                        }
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Label>
                <Label text="Peran" error={errors?.get("roleId")} required>
                    <Select
                        value={roleId}
                        error={errors?.get("roleId")}
                        placeholder="Pilih peran"
                        onChange={(e) => {
                            setRoleId(e.target.value);
                            setErrors((prev) => {
                                prev?.delete("roleId");
                                return prev?.size ? prev : null;
                            });
                        }}
                    >
                        {dataRole?.data?.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Label>
                <Label text="Posisi" error={errors?.get("positionId")} required>
                    <Select
                        value={positionId}
                        error={errors?.get("positionId")}
                        placeholder="Pilih posisi"
                        onChange={(e) => {
                            setPositionId(e.target.value);
                            setErrors((prev) => {
                                prev?.delete("positionId");
                                return prev?.size ? prev : null;
                            });
                        }}
                    >
                        {dataPosition?.data?.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name}
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
