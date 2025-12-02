"use client";

import { useState } from "react";
import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import Button from "@/app/_components/button";
import Input from "@/app/_components/inputs/input";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { CategoryOutlined } from "@mui/icons-material";
import { useAlert } from "@/app/_providers/AlertProvider";
import { mapRequest, postRequest } from "@/app/_utils/api";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Kategori",
        path: ROUTE_LISTS.get("category"),
    },
    {
        name: "Tambah",
    },
];

const prevRoute: string = ROUTE_LISTS.get("category") ?? "/";

//
export default function AddCategoryPage() {
    const alert = useAlert();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [name, setName] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await postRequest({
            body: mapRequest({ name }),
            alert,
            setErrors,
            setLoading,
            setErrorMessage,
            route: "api-category-add",
            errorMessage: "Gagal menambahkan kategori",
            successMessage: "Berhasil menambahkan kategori",
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
                <CategoryOutlined />
                <h2>Tambah Kategori</h2>
            </div>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 gap-x-5 gap-y-3"
            >
                <Label text="Nama" error={errors?.get("name")} required>
                    <Input
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
