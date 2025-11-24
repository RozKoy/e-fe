"use client";

import { useState } from "react";
import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import Button from "@/app/_components/button";
import File from "@/app/_components/inputs/file";
import Input from "@/app/_components/inputs/input";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { Diversity2Outlined } from "@mui/icons-material";
import { useAlert } from "@/app/_providers/AlertProvider";
import { badRequestResponseFormat } from "@/app/_utils/api";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Partai",
        path: ROUTE_LISTS.get("fraction"),
    },
    {
        name: "Tambah",
    },
];

const prevRoute: string = ROUTE_LISTS.get("fraction") ?? "/";

//
export default function AddFractionPage() {
    const alert = useAlert();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        setErrors(null);
        setErrorMessage(null);

        const url = ROUTE_LISTS.get("api-fraction-add");

        if (!url) {
            setLoading(false);

            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        const formData = new FormData(e.currentTarget);

        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const response = await res.json();

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menambahkan partai",
            });

            setTimeout(() => {
                router.push(prevRoute);
            }, 1500);
        } else {
            if (Array.isArray(response.message)) {
                setErrors(badRequestResponseFormat(response.message));
            } else {
                setErrorMessage(response.message);

                alert.addAlert({
                    type: "error",
                    message: "Gagal menambahkan partai",
                });
            }

            setLoading(false);
        }
    };

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5">
                <Diversity2Outlined />
                <h2>Tambah Partai</h2>
            </div>
            <form onSubmit={submit} className="flex flex-col gap-x-5 gap-y-3">
                <Label text="Nama" error={errors?.get("name")} required>
                    <Input
                        name="name"
                        error={errors?.get("name")}
                        placeholder="Masukkan nama"
                        onInput={() =>
                            setErrors((prev) => {
                                prev?.delete("name");
                                return prev?.size ? prev : null;
                            })
                        }
                    />
                </Label>
                <Label text="Gambar" error={errors?.get("image")}>
                    <File
                        name="image"
                        note="PNG, JPG, dll"
                        error={errors?.get("image")}
                        onChange={() =>
                            setErrors((prev) => {
                                prev?.delete("image");
                                return prev?.size ? prev : null;
                            })
                        }
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
