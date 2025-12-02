"use client";

import {
    AddOutlined,
    EditOutlined,
    BadgeOutlined,
    DeleteOutline,
} from "@mui/icons-material";
import useSWR from "swr";
import DefaultLink from "next/link";
import Link from "@/app/_components/link";
import { IResponse } from "@/app/_types/api";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import { IUserAccess } from "@/app/_types/userAccess";
import Table, { Column } from "@/app/_components/table";
import { useAlert } from "@/app/_providers/AlertProvider";
import DeleteModal from "@/app/_components/modals/delete";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

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

    const [selectedUserAccess, setSelectedUserAccess] =
        useState<IUserAccess | null>(null);

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        data: dataUserAccess,
        error: errorUserAccess,
        mutate: mutateUserAccess,
        isLoading: isLoadingUserAccess,
    } = useSWR<IResponse<IUserAccess[]>>(
        `${ROUTE_LISTS.get("api-access-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // search: "",
            // areaId: "",
            // fractionId: "",
        })}`
    );

    const columns: Column<IUserAccess>[] = [
        {
            header: "Email",
            accessor: (item: IUserAccess) => item.user?.email ?? "-",
        },
        {
            header: "Area",
            accessor: (item: IUserAccess) => item.area?.name ?? "-",
        },
        {
            header: "Partai",
            accessor: (item: IUserAccess) => item.fraction?.name ?? "-",
        },
        {
            header: "Visibilitas",
            accessor: (item: IUserAccess) =>
                item.public ? "Publik" : "Privat",
        },
        {
            header: "Aksi",
            accessor: (item: IUserAccess) => (
                <div className="flex items-center justify-center">
                    <div className="p-1 rounded-lg hover:bg-yellow-100 text-yellow-500 cursor-pointer transition-all">
                        <DefaultLink
                            href={
                                ROUTE_LISTS.get("access-edit")?.replace(
                                    ":id",
                                    item.id
                                ) ?? "#"
                            }
                        >
                            <EditOutlined />
                        </DefaultLink>
                    </div>
                    <button
                        className="p-1 rounded-lg hover:bg-red-100 text-red-500 cursor-pointer transition-all"
                        onClick={() => {
                            handleDeleteItem(item);
                        }}
                    >
                        <DeleteOutline />
                    </button>
                </div>
            ),
        },
    ];

    const handleDeleteClose = () => {
        setSelectedUserAccess(null);
        setDeleteModal(false);
    };

    const handleDeleteItem = (item: IUserAccess) => {
        setSelectedUserAccess(item);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        let url = ROUTE_LISTS.get("api-access-delete");

        if (!url || !selectedUserAccess?.id) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        setIsLoading(true);

        url = url.replace(":id", selectedUserAccess.id);

        const res = await fetch(url, { method: "DELETE" });

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menghapus data",
            });
            await mutateUserAccess();
        } else {
            alert.addAlert({
                type: "error",
                message: "Gagal menghapus data",
            });
        }

        setIsLoading(false);
        setDeleteModal(false);
        setSelectedUserAccess(null);
    };

    useEffect(() => {
        if (!hasError.current) {
            if (
                !isLoadingUserAccess &&
                ((!dataUserAccess && errorUserAccess) ||
                    (dataUserAccess && !Array.isArray(dataUserAccess?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorUserAccess?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataUserAccess, errorUserAccess, isLoadingUserAccess]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                    <BadgeOutlined />
                    <h2>Manajemen Akses Pengguna</h2>
                </div>
                <Link
                    href={ROUTE_LISTS.get("access-add") ?? "#"}
                    size="sm"
                    variant="primary"
                    startIcon={<AddOutlined fontSize="small" />}
                    className="ml-auto"
                >
                    Tambah
                </Link>
            </div>
            <Table
                data={dataUserAccess?.data}
                columns={columns}
                isLoading={isLoadingUserAccess}
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
                    totalPages={dataUserAccess?.totalPage || 1}
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
