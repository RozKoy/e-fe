"use client";

import Link from "@/app/_components/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Label from "@/app/_components/label";
import Button from "@/app/_components/button";
import Input from "@/app/_components/inputs/input";
import { permissionCheck } from "@/app/_utils/auth";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { useUser } from "@/app/_providers/UserProvider";
import { useAlert } from "@/app/_providers/AlertProvider";
import { FilterFramesOutlined } from "@mui/icons-material";
import { mapRequest, postRequest } from "@/app/_utils/api";
import { useLoading } from "@/app/_providers/LoadingProvider";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Komisi",
        path: ROUTE_LISTS.get("commission"),
    },
    {
        name: "Tambah",
    },
];

const prevRoute: string = ROUTE_LISTS.get("commission") ?? "/";

//
export default function AddCommissionPage() {
    const alert = useAlert();
    const router = useRouter();
    const { user } = useUser();
    const { setRootLoading } = useLoading();

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
            route: "api-commission-add",
            errorMessage: "Gagal menambahkan komisi",
            successMessage: "Berhasil menambahkan komisi",
            successAction: () => {
                setTimeout(() => {
                    router.push(prevRoute);
                }, 1500);
            },
        });
    };

    useEffect(() => {
        setRootLoading(true);

        if (user) {
            if (!permissionCheck(user, ["Buat Komisi"])) {
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
                <FilterFramesOutlined />
                <h2>Tambah Komisi</h2>
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
