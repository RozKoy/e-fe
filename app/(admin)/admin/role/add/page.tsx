"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";
import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import Input from "@/app/_components/inputs/input";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { IPermission } from "@/app/_types/permission";
import { WorkspacesOutline } from "@mui/icons-material";
import Checkbox from "@/app/_components/inputs/checkbox";
import { useAlert } from "@/app/_providers/AlertProvider";
import { mapRequest, postRequest } from "@/app/_utils/api";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
interface PermissionGroup {
    group: string;
    items: IPermission[];
}

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Peran",
        path: ROUTE_LISTS.get("role"),
    },
    {
        name: "Tambah",
    },
];

const prevRoute: string = ROUTE_LISTS.get("role") ?? "/";

//
function mapPermissionsByGroup(data: IPermission[]): PermissionGroup[] {
    const groups: Record<string, PermissionGroup> = {};

    data.forEach((item) => {
        if (!groups[item.group]) {
            groups[item.group] = {
                group: item.group,
                items: [],
            };
        }

        groups[item.group].items.push(item);
    });

    return Object.values(groups);
}

//
export default function AddRolePage() {
    const alert = useAlert();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [permissionIds, setPermissionIds] = useState<{ id: string }[]>([]);

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataPermission,
        // error: errorPermission,
        // isLoading: isLoadingPermission,
    } = useSWR<IResponse<IPermission[]>>(ROUTE_LISTS.get("api-permission-get"));

    const permissions: PermissionGroup[] = useMemo(() => {
        if (!dataPermission?.data) {
            return [];
        }
        return mapPermissionsByGroup(dataPermission.data);
    }, [dataPermission]);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await postRequest({
            body: mapRequest({ name, description, permissionIds }),
            alert,
            setErrors,
            setLoading,
            setErrorMessage,
            route: "api-role-add",
            errorMessage: "Gagal menambahkan peran",
            successMessage: "Berhasil menambahkan peran",
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
                <WorkspacesOutline />
                <h2>Tambah Peran</h2>
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
                <Label text="Deskripsi" error={errors?.get("description")}>
                    <Input
                        error={errors?.get("description")}
                        placeholder="Masukkan deskripsi"
                        onInput={() =>
                            setErrors((prev) => {
                                prev?.delete("description");
                                return prev?.size ? prev : null;
                            })
                        }
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Label>
                <Label
                    text="Pilih Hak Akses"
                    error={errors?.get("permissionIds")}
                    required
                />
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {permissions.map((item, index) => (
                        <div
                            key={index}
                            className="p-3 rounded-xl border border-primary/50 hover:bg-gray-100 text-primary space-y-1.5"
                        >
                            <p className="font-semibold">{item.group}</p>
                            <div className="flex flex-col">
                                {item.items.map((item, index) => (
                                    <Checkbox
                                        key={index}
                                        text={item.name}
                                        value={item.id}
                                        checked={permissionIds.some(
                                            (permission) =>
                                                permission.id === item.id
                                        )}
                                        onChange={() => {
                                            setErrors((prev) => {
                                                prev?.delete("permissionIds");
                                                return prev?.size ? prev : null;
                                            });
                                            if (
                                                permissionIds.some(
                                                    (permission) =>
                                                        permission.id ===
                                                        item.id
                                                )
                                            ) {
                                                setPermissionIds((prev) =>
                                                    prev.filter(
                                                        (prevValue) =>
                                                            prevValue.id !==
                                                            item.id
                                                    )
                                                );
                                            } else {
                                                setPermissionIds((prev) => [
                                                    ...prev,
                                                    { id: item.id },
                                                ]);
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
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
