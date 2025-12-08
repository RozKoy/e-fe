"use client";

import useSWR from "swr";
import { useState } from "react";
import { IArea } from "@/app/_types/area";
import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import File from "@/app/_components/inputs/file";
import { ICategory } from "@/app/_types/category";
import Input from "@/app/_components/inputs/input";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import { useUser } from "@/app/_providers/UserProvider";
import { AutorenewOutlined } from "@mui/icons-material";
import Textarea from "@/app/_components/inputs/textarea";
import { useAlert } from "@/app/_providers/AlertProvider";
import { badRequestResponseFormat } from "@/app/_utils/api";

//
export default function AddProposalPage() {
    const alert = useAlert();
    const router = useRouter();
    const { user } = useUser();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [tempCategory, setTempCategory] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataArea,
        // error: errorArea,
        // isLoading: isLoadingArea,
    } = useSWR<IResponse<IArea[]>>(`${ROUTE_LISTS.get("api-public-area-get")}`);

    const {
        data: dataCategory,
        // error: errorCategory,
        // isLoading: isLoadingCategory,
    } = useSWR<IResponse<ICategory[]>>(
        `${ROUTE_LISTS.get("api-public-category-get")}`
    );

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        setErrors(null);
        setErrorMessage(null);

        const url = ROUTE_LISTS.get("api-proposal-add");

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
                message: "Berhasil menambahkan usulan",
            });

            setTimeout(() => {
                router.push(ROUTE_LISTS.get("public-proposal") ?? "/");
            }, 1500);
        } else {
            if (Array.isArray(response.message)) {
                setErrors(badRequestResponseFormat(response.message));
            } else {
                setErrorMessage(response.message);

                alert.addAlert({
                    type: "error",
                    message: "Gagal menambahkan usulan",
                });
            }

            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-[#284C66] py-24 text-center text-white">
                <h1 className="text-3xl font-semibold tracking-wide mb-3">
                    PROPOSAL
                </h1>
                <div className="w-full text-sm text-gray-200">
                    <Link href="/" className="hover:underline">
                        Beranda
                    </Link>
                    <span className="mx-2">{">"}</span>
                    <span>Tambah Proposal</span>
                </div>
            </div>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">
                {!user && (
                    <AutorenewOutlined
                        className="animate-spin"
                        fontSize="large"
                    />
                )}
                {user && (
                    <form
                        onSubmit={submit}
                        className="w-full max-w-6xl bg-white shadow-md rounded-2xl p-6 space-y-8"
                    >
                        <h1 className="text-xl font-semibold text-[#284C66]">
                            Tambah Proposal
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-medium text-primary">
                            <Label
                                text="Dapil"
                                error={errors?.get("areaId")}
                                required
                            >
                                <Select
                                    name="areaId"
                                    error={errors?.get("areaId")}
                                    placeholder="Pilih dapil"
                                    defaultValue={""}
                                    onChange={() =>
                                        setErrors((prev) => {
                                            prev?.delete("areaId");
                                            return prev?.size ? prev : null;
                                        })
                                    }
                                >
                                    {dataArea?.data?.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Select>
                            </Label>
                            <Label
                                text="Kategori"
                                error={errors?.get("categoryId")}
                                required
                            >
                                <Select
                                    name="categoryId"
                                    error={errors?.get("categoryId")}
                                    value={tempCategory}
                                    firstOption={true}
                                    placeholder="Buat kategori"
                                    onChange={(e) => {
                                        setTempCategory(e.target.value);
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
                            <div className="md:col-span-2 flex flex-col-reverse md:flex-row gap-6 *:w-full">
                                <Label
                                    text="Judul"
                                    error={errors?.get("title")}
                                    required
                                >
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
                                {!tempCategory && (
                                    <Label
                                        text="Buat Kategori"
                                        error={errors?.get("customCategory")}
                                        required
                                    >
                                        <Input
                                            name="customCategory"
                                            error={errors?.get(
                                                "customCategory"
                                            )}
                                            placeholder="Masukkan kategori"
                                            onInput={() =>
                                                setErrors((prev) => {
                                                    prev?.delete(
                                                        "customCategory"
                                                    );
                                                    return prev?.size
                                                        ? prev
                                                        : null;
                                                })
                                            }
                                        />
                                    </Label>
                                )}
                            </div>
                            <div className="md:col-span-2 space-y-6">
                                <Label
                                    text="Deskripsi"
                                    error={errors?.get("description")}
                                    required
                                >
                                    <Textarea
                                        name="description"
                                        error={errors?.get("description")}
                                        placeholder="Masukkan deskripsi"
                                        onInput={() =>
                                            setErrors((prev) => {
                                                prev?.delete("description");
                                                return prev?.size ? prev : null;
                                            })
                                        }
                                    />
                                </Label>
                                <Label
                                    text="Gambar"
                                    // error={errors?.get("image")}
                                >
                                    <File
                                        name="image"
                                        // error={errors?.get("image")}
                                        // onChange={() =>
                                        //     setErrors((prev) => {
                                        //         prev?.delete("image");
                                        //         return prev?.size ? prev : null;
                                        //     })
                                        // }
                                    />
                                </Label>
                            </div>
                            <p className="md:col-span-2 text-red-500 text-center">
                                {errorMessage && errorMessage}
                            </p>
                        </div>
                        <Button
                            type="submit"
                            size="sm"
                            rounded="full"
                            variant="primary"
                            isLoading={loading}
                            className="w-full"
                        >
                            Simpan
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
