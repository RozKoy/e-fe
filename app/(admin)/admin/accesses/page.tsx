"use client";

import useSWR from "swr";
import Link from "@/app/_components/link";
import { IUser } from "@/app/_types/user";
import { IResponse } from "@/app/_types/api";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import Table, { Column } from "@/app/_components/table";
import { useAlert } from "@/app/_providers/AlertProvider";
import DeleteModal from "@/app/_components/modals/delete";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";
import { AddOutlined, BadgeOutlined, DeleteOutline } from "@mui/icons-material";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Akses Pengguna",
    },
];

const limitOptions: number[] = [5, 10, 15, 20, 25, 50];

//
export default function BaseUserAccessPage() {
    const alert = useAlert();

    const hasError = useRef<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        data: dataUser,
        error: errorUser,
        mutate: mutateUser,
        isLoading: isLoadingUser,
    } = useSWR<IResponse<IUser[]>>(
        `${ROUTE_LISTS.get("api-user-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // search: "",
            // roleId: "",
            // areaId: "",
            // fractionId: "",
        })}`
    );

    const columns: Column<IUser>[] = [
        { header: "Email", accessor: "email" },
        {
            header: "Nama",
            accessor: (item: IUser) => item.profile?.name ?? "-",
        },
        { header: "Peran", accessor: (item: IUser) => item.role?.name ?? "-" },
        {
            header: "Aksi",
            accessor: (item: IUser) => (
                <button
                    className="text-red-400"
                    onClick={() => {
                        handleDeleteItem(item);
                    }}
                >
                    <DeleteOutline />
                </button>
            ),
        },
    ];

    const handleDeleteClose = () => {
        setSelectedUser(null);
        setDeleteModal(false);
    };

    const handleDeleteItem = (item: IUser) => {
        setSelectedUser(item);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        let url = ROUTE_LISTS.get("api-user-delete");

        if (!url || !selectedUser?.id) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        setIsLoading(true);

        url = url.replace(":id", selectedUser.id);

        const res = await fetch(url, { method: "DELETE" });

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menghapus data",
            });
            await mutateUser();
        } else {
            alert.addAlert({
                type: "error",
                message: "Gagal menghapus data",
            });
        }

        setIsLoading(false);
        setDeleteModal(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        if (!hasError.current) {
            if (
                !isLoadingUser &&
                ((!dataUser && errorUser) ||
                    (dataUser && !Array.isArray(dataUser?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorUser?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataUser, errorUser, isLoadingUser]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5">
                    <BadgeOutlined />
                    <h2>Manajemen Akses Pengguna</h2>
                </div>
                <Link
                    href={ROUTE_LISTS.get("access-add") ?? "#"}
                    size="sm"
                    variant="outline"
                    startIcon={<AddOutlined />}
                    className="ml-auto"
                >
                    Tambah
                </Link>
            </div>
            <Table
                data={dataUser?.data}
                columns={columns}
                isLoading={isLoadingUser}
            />
            <div className="flex items-center justify-between">
                <div>
                    <Select
                        value={limit}
                        onChange={(e) => setLimit(parseInt(e.target.value))}
                    >
                        {limitOptions.map((value, index) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </Select>
                </div>
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={dataUser?.totalPage ?? 1}
                />
            </div>
            <DeleteModal
                show={deleteModal}
                onClose={handleDeleteClose}
                onConfirm={handleDelete}
                isLoading={isLoading}
            />
        </>
    );
}
