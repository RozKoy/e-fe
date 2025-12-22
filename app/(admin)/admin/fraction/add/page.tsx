"use client";

import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/_components/button";
import File from "@/app/_components/inputs/file";
import Input from "@/app/_components/inputs/input";
import { permissionCheck } from "@/app/_utils/auth";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { useUser } from "@/app/_providers/UserProvider";
import { Diversity2Outlined } from "@mui/icons-material";
import { useAlert } from "@/app/_providers/AlertProvider";
import { badRequestResponseFormat } from "@/app/_utils/api";
import { useLoading } from "@/app/_providers/LoadingProvider";
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
    const { user } = useUser();
    const { setRootLoading } = useLoading();

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

    useEffect(() => {
        setRootLoading(true);

        if (user) {
            if (!permissionCheck(user, ["Buat Fraksi"])) {
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

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
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
