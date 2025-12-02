"use client";

import useSWR from "swr";
import DefaultLink from "next/link";
import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import { IArticle } from "@/app/_types/article";
import File from "@/app/_components/inputs/file";
import { ICategory } from "@/app/_types/category";
import Input from "@/app/_components/inputs/input";
import Select from "@/app/_components/inputs/select";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { NewspaperOutlined } from "@mui/icons-material";
import Textarea from "@/app/_components/inputs/textarea";
import { useAlert } from "@/app/_providers/AlertProvider";
import React, { useEffect, useRef, useState } from "react";
import { badRequestResponseFormat } from "@/app/_utils/api";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
interface Param {
    id: string;
}

interface EditArticlePageProps {
    params: Promise<Param>;
}

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Berita",
        path: ROUTE_LISTS.get("article"),
    },
    {
        name: "Ubah",
    },
];

const prevRoute: string = ROUTE_LISTS.get("article") ?? "/";

//
export default function EditArticlePage({ params }: EditArticlePageProps) {
    const { id } = React.use(params);

    const alert = useAlert();
    const router = useRouter();

    const hasError = useRef<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataArticle,
        error: errorArticle,
        isLoading: isLoadingArticle,
    } = useSWR<IResponse<IArticle>>(
        `${ROUTE_LISTS.get("api-article-one")?.replace(":id", id)}`
    );

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

        const url = ROUTE_LISTS.get("api-article-update")?.replace(":id", id);

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
            method: "PUT",
            body: formData,
        });

        const response = await res.json();

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil mengubah berita",
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
                    message: "Gagal mengubah berita",
                });
            }

            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasError.current) {
            if (!isLoadingArticle && errorArticle) {
                router.push(prevRoute);
                hasError.current = true;
            }
        }
    }, [router, errorArticle, isLoadingArticle]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                <NewspaperOutlined />
                <h2>Ubah Berita</h2>
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
                        defaultValue={dataArticle?.data?.title}
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
                        defaultValue={dataArticle?.data?.categoryId}
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
                            defaultValue={dataArticle?.data?.content}
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
                        {dataArticle?.data?.imageUrl && (
                            <p className="text-sm">
                                Gambar sebelumnya :{" "}
                                <DefaultLink
                                    href={dataArticle.data.imageUrl}
                                    target="_blank"
                                    className="font-medium text-primary hover:text-primary/90"
                                >
                                    Buka
                                </DefaultLink>
                            </p>
                        )}
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
