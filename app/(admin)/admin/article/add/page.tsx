"use client";

import useSWR from "swr";
import { useState } from "react";
import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import File from "@/app/_components/inputs/file";
import { ICategory } from "@/app/_types/category";
import Input from "@/app/_components/inputs/input";
import Select from "@/app/_components/inputs/select";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { NewspaperOutlined } from "@mui/icons-material";
import Textarea from "@/app/_components/inputs/textarea";
import { useAlert } from "@/app/_providers/AlertProvider";
import { badRequestResponseFormat } from "@/app/_utils/api";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Berita",
        path: ROUTE_LISTS.get("article"),
    },
    {
        name: "Tambah",
    },
];

const prevRoute: string = ROUTE_LISTS.get("article") ?? "/";

//
export default function AddArticlePage() {
    const alert = useAlert();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataCategory,
        // error: errorCategory,
        // isLoading: isLoadingCategory,
    } = useSWR<IResponse<ICategory[]>>(
        `${ROUTE_LISTS.get("api-category-get")}`
    );

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        setErrors(null);
        setErrorMessage(null);

        const url = ROUTE_LISTS.get("api-article-add");

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
                message: "Berhasil menambahkan berita",
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
                    message: "Gagal menambahkan berita",
                });
            }

            setLoading(false);
        }
    };

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                <NewspaperOutlined />
                <h2>Tambah Berita</h2>
            </div>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3"
            >
                <Label text="Judul" error={errors?.get("title")} required>
                    <Input
                        name="title"
                        error={errors?.get("title")}
                        placeholder="Masukkan judul"
                        onInput={() =>
                            setErrors((prev) => {
                                prev?.delete("title");
                                return prev?.size ? prev : null;
                            })
                        }
                    />
                </Label>
                <Label
                    text="Kategori"
                    error={errors?.get("categoryId")}
                    required
                >
                    <Select
                        name="categoryId"
                        error={errors?.get("categoryId")}
                        placeholder="Pilih kategori"
                        defaultValue={""}
                        onChange={() => {
                            setErrors((prev) => {
                                prev?.delete("categoryId");
                                return prev?.size ? prev : null;
                            });
                        }}
                    >
                        {dataCategory?.data?.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Label>
                <div className="md:col-span-2">
                    <Label
                        text="Konten"
                        error={errors?.get("content")}
                        required
                    >
                        <Textarea
                            name="content"
                            error={errors?.get("content")}
                            placeholder="Masukkan konten"
                            onInput={() =>
                                setErrors((prev) => {
                                    prev?.delete("content");
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
                </div>
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
