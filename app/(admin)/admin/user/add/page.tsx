"use client";

import useSWR from "swr";
import { useState } from "react";
import { IRole } from "@/app/_types/role";
import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import { postRequest } from "@/app/_utils/api";
import Input from "@/app/_components/inputs/input";
import Select from "@/app/_components/inputs/select";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { PeopleAltOutlined } from "@mui/icons-material";
import Password from "@/app/_components/inputs/password";
import { useAlert } from "@/app/_providers/AlertProvider";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Pengguna",
        path: ROUTE_LISTS.get("user"),
    },
    {
        name: "Tambah",
    },
];

const prevRoute: string = ROUTE_LISTS.get("user") ?? "/";

//
export default function AddUserPage() {
    const alert = useAlert();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [roleId, setRoleId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataRole,
        // error: errorRole,
        // isLoading: isLoadingRole,
    } = useSWR<IResponse<IRole[]>>(`${ROUTE_LISTS.get("api-role-get")}`);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await postRequest({
            body: { name, email, roleId, password },
            alert,
            setErrors,
            setLoading,
            setErrorMessage,
            route: "api-user-add",
            errorMessage: "Gagal menambahkan pengguna",
            successMessage: "Berhasil menambahkan pengguna",
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
            <div className="flex items-center gap-1.5">
                <PeopleAltOutlined />
                <h2>Tambah Pengguna</h2>
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
                <Label text="Email" error={errors?.get("email")} required>
                    <Input
                        error={errors?.get("email")}
                        placeholder="email@example.com"
                        onInput={() =>
                            setErrors((prev) => {
                                prev?.delete("email");
                                return prev?.size ? prev : null;
                            })
                        }
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Label>
                <Label
                    text="Kata Sandi"
                    error={errors?.get("password")}
                    required
                >
                    <Password
                        error={errors?.get("password")}
                        onInput={() =>
                            setErrors((prev) => {
                                prev?.delete("password");
                                return prev?.size ? prev : null;
                            })
                        }
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Label>
                <Label text="Peran" error={errors?.get("roleId")} required>
                    <Select
                        value={roleId}
                        error={errors?.get("roleId")}
                        placeholder="Pilih peran"
                        onChange={(e) => {
                            setRoleId(e.target.value);
                            setErrors((prev) => {
                                prev?.delete("roleId");
                                return prev?.size ? prev : null;
                            });
                        }}
                    >
                        {dataRole?.data?.map((role, index) => (
                            <option key={index} value={role.id}>
                                {role.name}
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
