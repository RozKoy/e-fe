"use client";

import React, { startTransition, useEffect, useRef, useState } from "react";
import Link from "@/app/_components/link";
import { useRouter } from "next/navigation";
import Label from "@/app/_components/label";
import Button from "@/app/_components/button";
import { mapRequest, postRequest } from "@/app/_utils/api";
import { MapOutlined } from "@mui/icons-material";
import Input from "@/app/_components/inputs/input";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { useAlert } from "@/app/_providers/AlertProvider";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";
import useSWR from "swr";
import { IResponse } from "@/app/_types/api";
import { IArea } from "@/app/_types/area";

//
interface Param {
    id: string;
}

interface EditAreaPageProps {
    params: Promise<Param>;
}

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Area",
        path: ROUTE_LISTS.get("area"),
    },
    {
        name: "Ubah",
    },
];

const prevRoute: string = ROUTE_LISTS.get("area") ?? "/";

//
export default function EditAreaPage({ params }: EditAreaPageProps) {
    const { id } = React.use(params);

    const alert = useAlert();
    const router = useRouter();

    const hasError = useRef<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [name, setName] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataArea,
        error: errorArea,
        isLoading: isLoadingArea,
    } = useSWR<IResponse<IArea>>(
        `${ROUTE_LISTS.get("api-area-one")?.replace(":id", id)}`
    );

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await postRequest({
            body: mapRequest({ name }),
            alert,
            setErrors,
            setLoading,
            setErrorMessage,
            route: () =>
                ROUTE_LISTS.get("api-area-update")?.replace(":id", id) ?? "",
            method: "PUT",
            errorMessage: "Gagal mengubah area",
            successMessage: "Berhasil mengubah area",
            successAction: () => {
                setTimeout(() => {
                    router.push(prevRoute);
                }, 1500);
            },
        });
    };

    useEffect(() => {
        if (!hasError.current) {
            if (!isLoadingArea && errorArea) {
                router.push(prevRoute);
                hasError.current = true;
            }
        }
    }, [router, errorArea, isLoadingArea]);

    useEffect(() => {
        if (dataArea?.data) {
            startTransition(() => {
                setName(dataArea.data?.name ?? "");
            });
        }
    }, [dataArea?.data]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                <MapOutlined />
                <h2>Ubah Area</h2>
            </div>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 gap-x-5 gap-y-3"
            >
                <Label text="Nama" error={errors?.get("name")} required>
                    <Input
                        value={name}
                        error={errors?.get("name")}
                        placeholder="Masukkan nama"
                        onInput={() =>
                            setErrors((prev) => {
                                prev?.delete("name");
                                return prev?.size ? prev : null;
                            })
                        }
                        onChange={(e) => setName(e.target.value)}
                    />
                </Label>
                <p className="text-red-500 text-center">
                    {errorMessage && errorMessage}
                </p>
                <div className="flex justify-end gap-3">
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
