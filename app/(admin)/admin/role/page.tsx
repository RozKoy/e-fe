"use client";

import {
    AddOutlined,
    DeleteOutline,
    WorkspacesOutline,
} from "@mui/icons-material";
import useSWR from "swr";
import Link from "@/app/_components/link";
import { IRole } from "@/app/_types/role";
import { IResponse } from "@/app/_types/api";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import Table, { Column } from "@/app/_components/table";
import DeleteModal from "@/app/_components/modals/delete";
import { useAlert } from "@/app/_providers/AlertProvider";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Peran",
    },
];

const limitOptions: number[] = [5, 10, 15, 20, 25, 50];

//
export default function BaseRolePage() {
    const alert = useAlert();

    const hasError = useRef<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedRole, setSelectedRole] = useState<IRole | null>(null);

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        data: dataRole,
        error: errorRole,
        mutate: mutateRole,
        isLoading: isLoadingRole,
    } = useSWR<IResponse<IRole[]>>(
        `${ROUTE_LISTS.get("api-role-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // search: "",
        })}`
    );

    const columns: Column<IRole>[] = [
        { header: "Name", accessor: "name" },
        { header: "Deskripsi", accessor: "description" },
        {
            header: "Aksi",
            accessor: (item: IRole) => (
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
        setSelectedRole(null);
        setDeleteModal(false);
    };

    const handleDeleteItem = (role: IRole) => {
        setSelectedRole(role);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        let url = ROUTE_LISTS.get("api-role-delete");

        if (!url || !selectedRole?.id) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        setIsLoading(true);

        url = url.replace(":id", selectedRole.id);

        const res = await fetch(url, { method: "DELETE" });

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menghapus data",
            });
            await mutateRole();
        } else {
            alert.addAlert({
                type: "error",
                message: "Gagal menghapus data",
            });
        }

        setIsLoading(false);
        setDeleteModal(false);
        setSelectedRole(null);
    };

    useEffect(() => {
        if (!hasError.current) {
            if (
                !isLoadingRole &&
                ((!dataRole && errorRole) ||
                    (dataRole && !Array.isArray(dataRole?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorRole?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataRole, errorRole, isLoadingRole]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5">
                    <WorkspacesOutline />
                    <h2>Manajemen Peran</h2>
                </div>
                <Link
                    href={ROUTE_LISTS.get("role-add") ?? "#"}
                    size="sm"
                    variant="outline"
                    startIcon={<AddOutlined className="w-5" />}
                    className="ml-auto"
                >
                    Tambah
                </Link>
            </div>
            <Table
                data={dataRole?.data}
                columns={columns}
                isLoading={isLoadingRole}
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
                    totalPages={dataRole?.totalPage ?? 1}
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
