"use client";

import useSWR from "swr";
import { useState } from "react";
import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import { WorkOutline } from "@mui/icons-material";
import Input from "@/app/_components/inputs/input";
import Select from "@/app/_components/inputs/select";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { ICommission } from "@/app/_types/commission";
import { useAlert } from "@/app/_providers/AlertProvider";
import { mapRequest, postRequest } from "@/app/_utils/api";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Posisi",
        path: ROUTE_LISTS.get("position"),
    },
    {
        name: "Tambah",
    },
];

const prevRoute: string = ROUTE_LISTS.get("position") ?? "/";

const levelOptions = [
    {
        value: "ketua",
        label: "Ketua",
    },
    {
        value: "wakil",
        label: "Wakil",
    },
    {
        value: "sekretaris",
        label: "Sekretaris",
    },
    {
        value: "anggota",
        label: "Anggota",
    },
];

const categoryOptions = [
    {
        value: "pimpinan",
        label: "Pimpinan",
    },
    {
        value: "komisi",
        label: "Komisi",
    },
];

//
export default function AddPositionPage() {
    const alert = useAlert();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [name, setName] = useState<string>("");
    const [level, setLevel] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [commissionId, setCommissionId] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataCommission,
        // error: errorCommission,
        // isLoading: isLoadingCommission,
    } = useSWR<IResponse<ICommission[]>>(
        `${ROUTE_LISTS.get("api-commission-get")}`
    );

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await postRequest({
            body: mapRequest({ name, level, category, commissionId }, [
                "commissionId",
            ]),
            alert,
            setErrors,
            setLoading,
            setErrorMessage,
            route: "api-position-add",
            errorMessage: "Gagal menambahkan posisi",
            successMessage: "Berhasil menambahkan posisi",
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
                <WorkOutline />
                <h2>Tambah Posisi</h2>
            </div>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3"
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
                <Label text="Grup" error={errors?.get("category")} required>
                    <Select
                        value={category}
                        error={errors?.get("category")}
                        placeholder="Pilih grup"
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setErrors((prev) => {
                                prev?.delete("category");
                                return prev?.size ? prev : null;
                            });
                        }}
                    >
                        {categoryOptions.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </Select>
                </Label>
                <Label text="Tingkat" error={errors?.get("level")} required>
                    <Select
                        value={level}
                        error={errors?.get("level")}
                        placeholder="Pilih tingkat"
                        onChange={(e) => {
                            setLevel(e.target.value);
                            setErrors((prev) => {
                                prev?.delete("level");
                                return prev?.size ? prev : null;
                            });
                        }}
                    >
                        {levelOptions.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </Select>
                </Label>
                <Label
                    text="Komisi"
                    error={errors?.get("commissionId")}
                    required={category === "komisi"}
                >
                    <Select
                        value={commissionId}
                        error={errors?.get("commissionId")}
                        firstOption={category !== "komisi"}
                        placeholder="Pilih komisi"
                        onChange={(e) => {
                            setCommissionId(e.target.value);
                            setErrors((prev) => {
                                prev?.delete("commissionId");
                                return prev?.size ? prev : null;
                            });
                        }}
                    >
                        {dataCommission?.data?.map((item, index) => (
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
