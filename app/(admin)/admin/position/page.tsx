"use client";

import {
    AddOutlined,
    WorkOutline,
    EditOutlined,
    DeleteOutline,
} from "@mui/icons-material";
import useSWR from "swr";
import DefaultLink from "next/link";
import Link from "@/app/_components/link";
import { IResponse } from "@/app/_types/api";
import { IPosition } from "@/app/_types/position";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import Table, { Column } from "@/app/_components/table";
import { useAlert } from "@/app/_providers/AlertProvider";
import DeleteModal from "@/app/_components/modals/delete";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Posisi",
    },
];

const limitOptions: number[] = [5, 10, 15, 20, 25, 50];

//
export default function BasePositionPage() {
    const alert = useAlert();

    const hasError = useRef<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedPosition, setSelectedPosition] = useState<IPosition | null>(
        null
    );

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        data: dataPosition,
        error: errorPosition,
        mutate: mutatePosition,
        isLoading: isLoadingPosition,
    } = useSWR<IResponse<IPosition[]>>(
        `${ROUTE_LISTS.get("api-position-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // level: "",
            // search: "",
            // category: "",
            // commissionId: "",
        })}`
    );

    const columns: Column<IPosition>[] = [
        { header: "Nama", accessor: "name" },
        {
            header: "Grup",
            accessor: (item: IPosition) => item?.category?.toUpperCase() ?? "-",
        },
        {
            header: "Tingkat",
            accessor: (item: IPosition) => item?.level?.toUpperCase() ?? "-",
        },
        {
            header: "Komisi",
            accessor: (item: IPosition) => item?.commission?.name ?? "-",
        },
        {
            header: "Aksi",
            accessor: (item: IPosition) => (
                <div className="flex items-center justify-center">
                    <div className="p-1 rounded-lg hover:bg-yellow-100 text-yellow-500 cursor-pointer transition-all">
                        <DefaultLink
                            href={
                                ROUTE_LISTS.get("position-edit")?.replace(
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
        setSelectedPosition(null);
        setDeleteModal(false);
    };

    const handleDeleteItem = (item: IPosition) => {
        setSelectedPosition(item);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        let url = ROUTE_LISTS.get("api-position-delete");

        if (!url || !selectedPosition?.id) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        setIsLoading(true);

        url = url.replace(":id", selectedPosition.id);

        const res = await fetch(url, { method: "DELETE" });

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menghapus data",
            });
            await mutatePosition();
        } else {
            alert.addAlert({
                type: "error",
                message: "Gagal menghapus data",
            });
        }

        setIsLoading(false);
        setDeleteModal(false);
        setSelectedPosition(null);
    };

    useEffect(() => {
        if (!hasError.current) {
            if (
                !isLoadingPosition &&
                ((!dataPosition && errorPosition) ||
                    (dataPosition && !Array.isArray(dataPosition?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorPosition?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataPosition, errorPosition, isLoadingPosition]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                    <WorkOutline />
                    <h2>Manajemen Posisi</h2>
                </div>
                <Link
                    href={ROUTE_LISTS.get("position-add") ?? "#"}
                    size="sm"
                    variant="primary"
                    startIcon={<AddOutlined fontSize="small" />}
                    className="ml-auto"
                >
                    Tambah
                </Link>
            </div>
            <Table
                data={dataPosition?.data}
                columns={columns}
                isLoading={isLoadingPosition}
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
                    totalPages={dataPosition?.totalPage || 1}
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
