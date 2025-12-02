"use client";

import useSWR from "swr";
import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import { ICategory } from "@/app/_types/category";
import Input from "@/app/_components/inputs/input";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { CategoryOutlined } from "@mui/icons-material";
import { useAlert } from "@/app/_providers/AlertProvider";
import { mapRequest, postRequest } from "@/app/_utils/api";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";
import React, { startTransition, useEffect, useRef, useState } from "react";

//
interface Param {
    id: string;
}

interface EditCategoryPageProps {
    params: Promise<Param>;
}

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Kategori",
        path: ROUTE_LISTS.get("category"),
    },
    {
        name: "Ubah",
    },
];

const prevRoute: string = ROUTE_LISTS.get("category") ?? "/";

//
export default function EditCategoryPage({ params }: EditCategoryPageProps) {
    const { id } = React.use(params);

    const alert = useAlert();
    const router = useRouter();

    const hasError = useRef<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [name, setName] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataCategory,
        error: errorCategory,
        isLoading: isLoadingCategory,
    } = useSWR<IResponse<ICategory>>(
        `${ROUTE_LISTS.get("api-category-one")?.replace(":id", id)}`
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
                ROUTE_LISTS.get("api-category-update")?.replace(":id", id) ??
                "",
            method: "PUT",
            errorMessage: "Gagal mengubah kategori",
            successMessage: "Berhasil mengubah kategori",
            successAction: () => {
                setTimeout(() => {
                    router.push(prevRoute);
                }, 1500);
            },
        });
    };

    useEffect(() => {
        if (!hasError.current) {
            if (!isLoadingCategory && errorCategory) {
                router.push(prevRoute);
                hasError.current = true;
            }
        }
    }, [router, errorCategory, isLoadingCategory]);

    useEffect(() => {
        if (dataCategory?.data) {
            startTransition(() => {
                setName(dataCategory.data?.name ?? "");
            });
        }
    }, [dataCategory?.data]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                <CategoryOutlined />
                <h2>Ubah Kategori</h2>
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
