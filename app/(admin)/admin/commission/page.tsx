"use client";

import {
    AddOutlined,
    EditOutlined,
    DeleteOutline,
    FilterFramesOutlined,
} from "@mui/icons-material";
import useSWR from "swr";
import DefaultLink from "next/link";
import Link from "@/app/_components/link";
import { IResponse } from "@/app/_types/api";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import { ICommission } from "@/app/_types/commission";
import Table, { Column } from "@/app/_components/table";
import { useAlert } from "@/app/_providers/AlertProvider";
import DeleteModal from "@/app/_components/modals/delete";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Komisi",
    },
];

const limitOptions: number[] = [5, 10, 15, 20, 25, 50];

//
export default function BaseCommissionPage() {
    const alert = useAlert();

    const hasError = useRef<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedCommission, setSelectedCommission] =
        useState<ICommission | null>(null);

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        data: dataCommission,
        error: errorCommission,
        mutate: mutateCommission,
        isLoading: isLoadingCommission,
    } = useSWR<IResponse<ICommission[]>>(
        `${ROUTE_LISTS.get("api-commission-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // search: "",
        })}`
    );

    const columns: Column<ICommission>[] = [
        { header: "Nama", accessor: "name" },
        {
            header: "Aksi",
            accessor: (item: ICommission) => (
                <div className="flex items-center justify-center">
                    <div className="p-1 rounded-lg hover:bg-yellow-100 text-yellow-500 cursor-pointer transition-all">
                        <DefaultLink
                            href={
                                ROUTE_LISTS.get("commission-edit")?.replace(
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
        setSelectedCommission(null);
        setDeleteModal(false);
    };

    const handleDeleteItem = (item: ICommission) => {
        setSelectedCommission(item);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        let url = ROUTE_LISTS.get("api-commission-delete");

        if (!url || !selectedCommission?.id) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        setIsLoading(true);

        url = url.replace(":id", selectedCommission.id);

        const res = await fetch(url, { method: "DELETE" });

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menghapus data",
            });
            await mutateCommission();
        } else {
            alert.addAlert({
                type: "error",
                message: "Gagal menghapus data",
            });
        }

        setIsLoading(false);
        setDeleteModal(false);
        setSelectedCommission(null);
    };

    useEffect(() => {
        if (!hasError.current) {
            if (
                !isLoadingCommission &&
                ((!dataCommission && errorCommission) ||
                    (dataCommission && !Array.isArray(dataCommission?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorCommission?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataCommission, errorCommission, isLoadingCommission]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                    <FilterFramesOutlined />
                    <h2>Manajemen Komisi</h2>
                </div>
                <Link
                    href={ROUTE_LISTS.get("commission-add") ?? "#"}
                    size="sm"
                    variant="primary"
                    startIcon={<AddOutlined fontSize="small" />}
                    className="ml-auto"
                >
                    Tambah
                </Link>
            </div>
            <Table
                data={dataCommission?.data}
                columns={columns}
                isLoading={isLoadingCommission}
            />
            <div className="flex items-center justify-between">
                <div>
                    <Select
                        value={limit}
                        onChange={(e) => {
                            setPage(1);
                            setLimit(parseInt(e.target.value));
                        }}
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
                    totalPages={dataCommission?.totalPage || 1}
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
