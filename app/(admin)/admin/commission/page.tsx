"use client";

import useSWR from "swr";
import Link from "@/app/_components/link";
import { IArea } from "@/app/_types/area";
import { IResponse } from "@/app/_types/api";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import Table, { Column } from "@/app/_components/table";
import { useAlert } from "@/app/_providers/AlertProvider";
import DeleteModal from "@/app/_components/modals/delete";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";
import { AddOutlined, DeleteOutline, FilterFramesOutlined } from "@mui/icons-material";

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

    const [selectedArea, setSelectedArea] = useState<IArea | null>(null);

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        data: dataArea,
        error: errorArea,
        mutate: mutateArea,
        isLoading: isLoadingArea,
    } = useSWR<IResponse<IArea[]>>(
        `${ROUTE_LISTS.get("api-area-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // search: "",
        })}`
    );

    const columns: Column<IArea>[] = [
        { header: "Nama", accessor: "name" },
        {
            header: "Aksi",
            accessor: (item: IArea) => (
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
        setSelectedArea(null);
        setDeleteModal(false);
    };

    const handleDeleteItem = (item: IArea) => {
        setSelectedArea(item);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        let url = ROUTE_LISTS.get("api-area-delete");

        if (!url || !selectedArea?.id) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        setIsLoading(true);

        url = url.replace(":id", selectedArea.id);

        const res = await fetch(url, { method: "DELETE" });

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menghapus data",
            });
            await mutateArea();
        } else {
            alert.addAlert({
                type: "error",
                message: "Gagal menghapus data",
            });
        }

        setIsLoading(false);
        setDeleteModal(false);
        setSelectedArea(null);
    };

    useEffect(() => {
        if (!hasError.current) {
            if (
                !isLoadingArea &&
                ((!dataArea && errorArea) ||
                    (dataArea && !Array.isArray(dataArea?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorArea?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataArea, errorArea, isLoadingArea]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5">
                    <FilterFramesOutlined />
                    <h2>Manajemen Komisi</h2>
                </div>
                <Link
                    href={"#"}
                    size="sm"
                    variant="outline"
                    startIcon={<AddOutlined />}
                    className="ml-auto"
                >
                    Tambah
                </Link>
            </div>
            <Table
                data={dataArea?.data}
                columns={columns}
                isLoading={isLoadingArea}
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
                    totalPages={dataArea?.totalPage ?? 1}
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
